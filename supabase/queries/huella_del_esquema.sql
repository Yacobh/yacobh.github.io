-- Huella normalizada del esquema public: una línea por hecho, ordenada. La usa
-- scripts/reconstruir_esquema.sh (T-48) para comparar una base reconstruida
-- contra producción. Solo lee el catálogo: corre con claude_ro.
with rel as (select c.oid, c.relname, c.relkind, c.relrowsecurity, c.relacl from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public')
select linea from (
 select 'col '||r.relname||'.'||a.attname||' '||format_type(a.atttypid,a.atttypmod)||case when a.attnotnull then ' not null' else '' end||coalesce(' default '||pg_get_expr(d.adbin,d.adrelid),'')||case when a.attidentity<>'' then ' identity '||a.attidentity::text else '' end
   from rel r join pg_attribute a on a.attrelid=r.oid left join pg_attrdef d on d.adrelid=a.attrelid and d.adnum=a.attnum
  where r.relkind in ('r','v') and a.attnum>0 and not a.attisdropped
 union all select 'rls '||relname||' '||relrowsecurity::text from rel where relkind='r'
 union all select 'con '||r.relname||' '||co.conname||' '||pg_get_constraintdef(co.oid) from rel r join pg_constraint co on co.conrelid=r.oid
 union all select 'idx '||indexdef from pg_indexes where schemaname='public'
 union all select 'pol '||tablename||' '||policyname||' '||cmd||' '||array_to_string(roles,',')||' using('||coalesce(qual,'')||') check('||coalesce(with_check,'')||')' from pg_policies where schemaname='public' and not (roles && array['claude_ro','claude_ddl']::name[])
 union all select 'trg '||pg_get_triggerdef(t.oid) from pg_trigger t join rel r on r.oid=t.tgrelid where not t.tgisinternal
 union all select 'fun '||p.proname||'('||pg_get_function_identity_arguments(p.oid)||') '||md5(pg_get_functiondef(p.oid)) from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.prokind='f'
 union all select 'viw '||relname||' '||md5(pg_get_viewdef(oid)) from rel where relkind='v'
) h(linea0), lateral (select regexp_replace(linea0, '\s+', ' ', 'g') as linea) x order by linea;
