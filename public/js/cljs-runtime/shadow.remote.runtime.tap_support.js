goog.provide('shadow.remote.runtime.tap_support');
shadow.remote.runtime.tap_support.tap_subscribe = (function shadow$remote$runtime$tap_support$tap_subscribe(p__38146,p__38147){
var map__38149 = p__38146;
var map__38149__$1 = cljs.core.__destructure_map(map__38149);
var svc = map__38149__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38149__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38149__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38149__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__38150 = p__38147;
var map__38150__$1 = cljs.core.__destructure_map(map__38150);
var msg = map__38150__$1;
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38150__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var summary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38150__$1,new cljs.core.Keyword(null,"summary","summary",380847952));
var history__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38150__$1,new cljs.core.Keyword(null,"history","history",-247395220));
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__38150__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(subs_ref,cljs.core.assoc,from,msg);

if(cljs.core.truth_(history__$1)){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-subscribed","tap-subscribed",-1882247432),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (oid){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"oid","oid",-768692334),oid,new cljs.core.Keyword(null,"summary","summary",380847952),shadow.remote.runtime.obj_support.obj_describe_STAR_(obj_support,oid)], null);
}),shadow.remote.runtime.obj_support.get_tap_history(obj_support,num)))], null));
} else {
return null;
}
});
shadow.remote.runtime.tap_support.tap_unsubscribe = (function shadow$remote$runtime$tap_support$tap_unsubscribe(p__38164,p__38165){
var map__38167 = p__38164;
var map__38167__$1 = cljs.core.__destructure_map(map__38167);
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38167__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var map__38168 = p__38165;
var map__38168__$1 = cljs.core.__destructure_map(map__38168);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38168__$1,new cljs.core.Keyword(null,"from","from",1815293044));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,from);
});
shadow.remote.runtime.tap_support.request_tap_history = (function shadow$remote$runtime$tap_support$request_tap_history(p__38175,p__38176){
var map__38178 = p__38175;
var map__38178__$1 = cljs.core.__destructure_map(map__38178);
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38178__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38178__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__38179 = p__38176;
var map__38179__$1 = cljs.core.__destructure_map(map__38179);
var msg = map__38179__$1;
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__38179__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
var tap_ids = shadow.remote.runtime.obj_support.get_tap_history(obj_support,num);
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-history","tap-history",-282803347),new cljs.core.Keyword(null,"oids","oids",-1580877688),tap_ids], null));
});
shadow.remote.runtime.tap_support.tool_disconnect = (function shadow$remote$runtime$tap_support$tool_disconnect(p__38184,tid){
var map__38185 = p__38184;
var map__38185__$1 = cljs.core.__destructure_map(map__38185);
var svc = map__38185__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38185__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,tid);
});
shadow.remote.runtime.tap_support.start = (function shadow$remote$runtime$tap_support$start(runtime,obj_support){
var subs_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var tap_fn = (function shadow$remote$runtime$tap_support$start_$_runtime_tap(obj){
if((!((obj == null)))){
var oid = shadow.remote.runtime.obj_support.register(obj_support,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"tap","tap",-1086702463)], null));
var seq__38200 = cljs.core.seq(cljs.core.deref(subs_ref));
var chunk__38201 = null;
var count__38202 = (0);
var i__38203 = (0);
while(true){
if((i__38203 < count__38202)){
var vec__38219 = chunk__38201.cljs$core$IIndexed$_nth$arity$2(null,i__38203);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38219,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38219,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__38292 = seq__38200;
var G__38293 = chunk__38201;
var G__38294 = count__38202;
var G__38295 = (i__38203 + (1));
seq__38200 = G__38292;
chunk__38201 = G__38293;
count__38202 = G__38294;
i__38203 = G__38295;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__38200);
if(temp__5823__auto__){
var seq__38200__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38200__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__38200__$1);
var G__38297 = cljs.core.chunk_rest(seq__38200__$1);
var G__38298 = c__5548__auto__;
var G__38299 = cljs.core.count(c__5548__auto__);
var G__38300 = (0);
seq__38200 = G__38297;
chunk__38201 = G__38298;
count__38202 = G__38299;
i__38203 = G__38300;
continue;
} else {
var vec__38227 = cljs.core.first(seq__38200__$1);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38227,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38227,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__38303 = cljs.core.next(seq__38200__$1);
var G__38304 = null;
var G__38305 = (0);
var G__38306 = (0);
seq__38200 = G__38303;
chunk__38201 = G__38304;
count__38202 = G__38305;
i__38203 = G__38306;
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
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tap-subscribe","tap-subscribe",411179050),(function (p1__38189_SHARP_){
return shadow.remote.runtime.tap_support.tap_subscribe(svc,p1__38189_SHARP_);
}),new cljs.core.Keyword(null,"tap-unsubscribe","tap-unsubscribe",1183890755),(function (p1__38190_SHARP_){
return shadow.remote.runtime.tap_support.tap_unsubscribe(svc,p1__38190_SHARP_);
}),new cljs.core.Keyword(null,"request-tap-history","request-tap-history",-670837812),(function (p1__38191_SHARP_){
return shadow.remote.runtime.tap_support.request_tap_history(svc,p1__38191_SHARP_);
})], null),new cljs.core.Keyword(null,"on-tool-disconnect","on-tool-disconnect",693464366),(function (p1__38193_SHARP_){
return shadow.remote.runtime.tap_support.tool_disconnect(svc,p1__38193_SHARP_);
})], null));

cljs.core.add_tap(tap_fn);

return svc;
});
shadow.remote.runtime.tap_support.stop = (function shadow$remote$runtime$tap_support$stop(p__38236){
var map__38237 = p__38236;
var map__38237__$1 = cljs.core.__destructure_map(map__38237);
var svc = map__38237__$1;
var tap_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38237__$1,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38237__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
cljs.core.remove_tap(tap_fn);

return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674));
});

//# sourceMappingURL=shadow.remote.runtime.tap_support.js.map
