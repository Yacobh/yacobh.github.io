goog.provide('universo.db.supabase');
universo.db.supabase.add_guestbook_entry = (function universo$db$supabase$add_guestbook_entry(entry_data){
return universo.supabase.supabase_client.from("guestbook").insert(cljs.core.clj__GT_js(entry_data)).select("*").single().then((function (p1__11892_SHARP_){
return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(p1__11892_SHARP_.data,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
}));
});
universo.db.supabase.get_guestbook_entries = (function universo$db$supabase$get_guestbook_entries(){
return universo.supabase.supabase_client.from("guestbook").select("*").order("created_at",({"ascending": false})).limit((50)).then((function (p1__11893_SHARP_){
return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(p1__11893_SHARP_.data,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
}));
});

//# sourceMappingURL=universo.db.supabase.js.map
