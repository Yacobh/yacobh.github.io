goog.provide('shadow.remote.runtime.tap_support');
shadow.remote.runtime.tap_support.tap_subscribe = (function shadow$remote$runtime$tap_support$tap_subscribe(p__22139,p__22140){
var map__22141 = p__22139;
var map__22141__$1 = cljs.core.__destructure_map(map__22141);
var svc = map__22141__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22141__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22141__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22141__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__22143 = p__22140;
var map__22143__$1 = cljs.core.__destructure_map(map__22143);
var msg = map__22143__$1;
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22143__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var summary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22143__$1,new cljs.core.Keyword(null,"summary","summary",380847952));
var history__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22143__$1,new cljs.core.Keyword(null,"history","history",-247395220));
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__22143__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(subs_ref,cljs.core.assoc,from,msg);

if(cljs.core.truth_(history__$1)){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-subscribed","tap-subscribed",-1882247432),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (oid){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"oid","oid",-768692334),oid,new cljs.core.Keyword(null,"summary","summary",380847952),shadow.remote.runtime.obj_support.obj_describe_STAR_(obj_support,oid)], null);
}),shadow.remote.runtime.obj_support.get_tap_history(obj_support,num)))], null));
} else {
return null;
}
});
shadow.remote.runtime.tap_support.tap_unsubscribe = (function shadow$remote$runtime$tap_support$tap_unsubscribe(p__22147,p__22148){
var map__22151 = p__22147;
var map__22151__$1 = cljs.core.__destructure_map(map__22151);
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22151__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var map__22152 = p__22148;
var map__22152__$1 = cljs.core.__destructure_map(map__22152);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22152__$1,new cljs.core.Keyword(null,"from","from",1815293044));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,from);
});
shadow.remote.runtime.tap_support.request_tap_history = (function shadow$remote$runtime$tap_support$request_tap_history(p__22156,p__22157){
var map__22158 = p__22156;
var map__22158__$1 = cljs.core.__destructure_map(map__22158);
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22158__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22158__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__22159 = p__22157;
var map__22159__$1 = cljs.core.__destructure_map(map__22159);
var msg = map__22159__$1;
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__22159__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
var tap_ids = shadow.remote.runtime.obj_support.get_tap_history(obj_support,num);
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-history","tap-history",-282803347),new cljs.core.Keyword(null,"oids","oids",-1580877688),tap_ids], null));
});
shadow.remote.runtime.tap_support.tool_disconnect = (function shadow$remote$runtime$tap_support$tool_disconnect(p__22162,tid){
var map__22163 = p__22162;
var map__22163__$1 = cljs.core.__destructure_map(map__22163);
var svc = map__22163__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22163__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,tid);
});
shadow.remote.runtime.tap_support.start = (function shadow$remote$runtime$tap_support$start(runtime,obj_support){
var subs_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var tap_fn = (function shadow$remote$runtime$tap_support$start_$_runtime_tap(obj){
if((!((obj == null)))){
var oid = shadow.remote.runtime.obj_support.register(obj_support,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"tap","tap",-1086702463)], null));
var seq__22173 = cljs.core.seq(cljs.core.deref(subs_ref));
var chunk__22174 = null;
var count__22175 = (0);
var i__22176 = (0);
while(true){
if((i__22176 < count__22175)){
var vec__22191 = chunk__22174.cljs$core$IIndexed$_nth$arity$2(null,i__22176);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22191,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22191,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__22209 = seq__22173;
var G__22210 = chunk__22174;
var G__22211 = count__22175;
var G__22212 = (i__22176 + (1));
seq__22173 = G__22209;
chunk__22174 = G__22210;
count__22175 = G__22211;
i__22176 = G__22212;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__22173);
if(temp__5804__auto__){
var seq__22173__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__22173__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__22173__$1);
var G__22213 = cljs.core.chunk_rest(seq__22173__$1);
var G__22214 = c__5525__auto__;
var G__22215 = cljs.core.count(c__5525__auto__);
var G__22216 = (0);
seq__22173 = G__22213;
chunk__22174 = G__22214;
count__22175 = G__22215;
i__22176 = G__22216;
continue;
} else {
var vec__22197 = cljs.core.first(seq__22173__$1);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22197,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22197,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__22217 = cljs.core.next(seq__22173__$1);
var G__22218 = null;
var G__22219 = (0);
var G__22220 = (0);
seq__22173 = G__22217;
chunk__22174 = G__22218;
count__22175 = G__22219;
i__22176 = G__22220;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
var svc = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229),obj_support,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461),tap_fn,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911),subs_ref], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tap-subscribe","tap-subscribe",411179050),(function (p1__22165_SHARP_){
return shadow.remote.runtime.tap_support.tap_subscribe(svc,p1__22165_SHARP_);
}),new cljs.core.Keyword(null,"tap-unsubscribe","tap-unsubscribe",1183890755),(function (p1__22166_SHARP_){
return shadow.remote.runtime.tap_support.tap_unsubscribe(svc,p1__22166_SHARP_);
}),new cljs.core.Keyword(null,"request-tap-history","request-tap-history",-670837812),(function (p1__22167_SHARP_){
return shadow.remote.runtime.tap_support.request_tap_history(svc,p1__22167_SHARP_);
})], null),new cljs.core.Keyword(null,"on-tool-disconnect","on-tool-disconnect",693464366),(function (p1__22168_SHARP_){
return shadow.remote.runtime.tap_support.tool_disconnect(svc,p1__22168_SHARP_);
})], null));

cljs.core.add_tap(tap_fn);

return svc;
});
shadow.remote.runtime.tap_support.stop = (function shadow$remote$runtime$tap_support$stop(p__22201){
var map__22204 = p__22201;
var map__22204__$1 = cljs.core.__destructure_map(map__22204);
var svc = map__22204__$1;
var tap_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22204__$1,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22204__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
cljs.core.remove_tap(tap_fn);

return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674));
});

//# sourceMappingURL=shadow.remote.runtime.tap_support.js.map
