// Edge Function: drena email_outbox (pending) vía Resend.
// Secrets: RESEND_API_KEY, optional EMAIL_FROM (default onboarding@resend.dev)
// Invoke: supabase functions invoke send-enrollment-emails
// o cron/schedule en Dashboard → Edge Functions.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const RESEND_URL = "https://api.resend.com/emails";

Deno.serve(async (_req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("EMAIL_FROM") ?? "Academia Integral <onboarding@resend.dev>";

  if (!supabaseUrl || !serviceKey) {
    return new Response(JSON.stringify({ error: "Missing Supabase env" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!resendKey) {
    return new Response(
      JSON.stringify({
        error: "RESEND_API_KEY not set; outbox left pending",
        hint: "supabase secrets set RESEND_API_KEY=re_...",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const sb = createClient(supabaseUrl, serviceKey);
  const { data: rows, error } = await sb
    .from("email_outbox")
    .select("id,to_email,subject,body,attempts")
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(25);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const results: Array<{ id: string; ok: boolean; detail?: string }> = [];

  for (const row of rows ?? []) {
    try {
      const res = await fetch(RESEND_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [row.to_email],
          subject: row.subject,
          text: row.body,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        await sb
          .from("email_outbox")
          .update({
            status: "failed",
            attempts: (row.attempts ?? 0) + 1,
            last_error: JSON.stringify(payload).slice(0, 500),
          })
          .eq("id", row.id);
        results.push({ id: row.id, ok: false, detail: String(payload?.message ?? res.status) });
        continue;
      }
      await sb
        .from("email_outbox")
        .update({
          status: "sent",
          attempts: (row.attempts ?? 0) + 1,
          sent_at: new Date().toISOString(),
          last_error: null,
        })
        .eq("id", row.id);
      results.push({ id: row.id, ok: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      await sb
        .from("email_outbox")
        .update({
          status: "failed",
          attempts: (row.attempts ?? 0) + 1,
          last_error: msg.slice(0, 500),
        })
        .eq("id", row.id);
      results.push({ id: row.id, ok: false, detail: msg });
    }
  }

  return new Response(JSON.stringify({ processed: results.length, results }), {
    headers: { "Content-Type": "application/json" },
  });
});
