goog.provide('shadow.remote.runtime.shared');
shadow.remote.runtime.shared.init_state = (function shadow$remote$runtime$shared$init_state(client_info){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),(0),new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.PersistentArrayMap.EMPTY], null);
});
shadow.remote.runtime.shared.now = (function shadow$remote$runtime$shared$now(){
return Date.now();
});
shadow.remote.runtime.shared.get_client_id = (function shadow$remote$runtime$shared$get_client_id(p__18309){
var map__18310 = p__18309;
var map__18310__$1 = cljs.core.__destructure_map(map__18310);
var runtime = map__18310__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18310__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var or__5002__auto__ = new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("runtime has no assigned runtime-id",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null));
}
});
shadow.remote.runtime.shared.relay_msg = (function shadow$remote$runtime$shared$relay_msg(runtime,msg){
var self_id_18451 = shadow.remote.runtime.shared.get_client_id(runtime);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"to","to",192099007).cljs$core$IFn$_invoke$arity$1(msg),self_id_18451)){
shadow.remote.runtime.api.relay_msg(runtime,msg);
} else {
Promise.resolve((1)).then((function (){
var G__18316 = runtime;
var G__18317 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"from","from",1815293044),self_id_18451);
return (shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2 ? shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2(G__18316,G__18317) : shadow.remote.runtime.shared.process.call(null,G__18316,G__18317));
}));
}

return msg;
});
shadow.remote.runtime.shared.reply = (function shadow$remote$runtime$shared$reply(runtime,p__18318,res){
var map__18319 = p__18318;
var map__18319__$1 = cljs.core.__destructure_map(map__18319);
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18319__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18319__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var res__$1 = (function (){var G__18320 = res;
var G__18320__$1 = (cljs.core.truth_(call_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18320,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id):G__18320);
if(cljs.core.truth_(from)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18320__$1,new cljs.core.Keyword(null,"to","to",192099007),from);
} else {
return G__18320__$1;
}
})();
return shadow.remote.runtime.api.relay_msg(runtime,res__$1);
});
shadow.remote.runtime.shared.call = (function shadow$remote$runtime$shared$call(var_args){
var G__18324 = arguments.length;
switch (G__18324) {
case 3:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3 = (function (runtime,msg,handlers){
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4(runtime,msg,handlers,(0));
}));

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4 = (function (p__18325,msg,handlers,timeout_after_ms){
var map__18326 = p__18325;
var map__18326__$1 = cljs.core.__destructure_map(map__18326);
var runtime = map__18326__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18326__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
if(cljs.core.map_QMARK_(msg)){
} else {
throw (new Error("Assert failed: (map? msg)"));
}

if(cljs.core.map_QMARK_(handlers)){
} else {
throw (new Error("Assert failed: (map? handlers)"));
}

if(cljs.core.nat_int_QMARK_(timeout_after_ms)){
} else {
throw (new Error("Assert failed: (nat-int? timeout-after-ms)"));
}

var call_id = new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"handlers","handlers",79528781),handlers,new cljs.core.Keyword(null,"called-at","called-at",607081160),shadow.remote.runtime.shared.now(),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg,new cljs.core.Keyword(null,"timeout","timeout",-318625318),timeout_after_ms], null));

return shadow.remote.runtime.api.relay_msg(runtime,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id));
}));

(shadow.remote.runtime.shared.call.cljs$lang$maxFixedArity = 4);

shadow.remote.runtime.shared.trigger_BANG_ = (function shadow$remote$runtime$shared$trigger_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___18455 = arguments.length;
var i__5727__auto___18456 = (0);
while(true){
if((i__5727__auto___18456 < len__5726__auto___18455)){
args__5732__auto__.push((arguments[i__5727__auto___18456]));

var G__18457 = (i__5727__auto___18456 + (1));
i__5727__auto___18456 = G__18457;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (p__18336,ev,args){
var map__18337 = p__18336;
var map__18337__$1 = cljs.core.__destructure_map(map__18337);
var runtime = map__18337__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18337__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var seq__18338 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__18341 = null;
var count__18342 = (0);
var i__18343 = (0);
while(true){
if((i__18343 < count__18342)){
var ext = chunk__18341.cljs$core$IIndexed$_nth$arity$2(null,i__18343);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__18460 = seq__18338;
var G__18461 = chunk__18341;
var G__18462 = count__18342;
var G__18463 = (i__18343 + (1));
seq__18338 = G__18460;
chunk__18341 = G__18461;
count__18342 = G__18462;
i__18343 = G__18463;
continue;
} else {
var G__18472 = seq__18338;
var G__18473 = chunk__18341;
var G__18474 = count__18342;
var G__18475 = (i__18343 + (1));
seq__18338 = G__18472;
chunk__18341 = G__18473;
count__18342 = G__18474;
i__18343 = G__18475;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__18338);
if(temp__5804__auto__){
var seq__18338__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18338__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__18338__$1);
var G__18476 = cljs.core.chunk_rest(seq__18338__$1);
var G__18477 = c__5525__auto__;
var G__18478 = cljs.core.count(c__5525__auto__);
var G__18479 = (0);
seq__18338 = G__18476;
chunk__18341 = G__18477;
count__18342 = G__18478;
i__18343 = G__18479;
continue;
} else {
var ext = cljs.core.first(seq__18338__$1);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__18480 = cljs.core.next(seq__18338__$1);
var G__18481 = null;
var G__18482 = (0);
var G__18483 = (0);
seq__18338 = G__18480;
chunk__18341 = G__18481;
count__18342 = G__18482;
i__18343 = G__18483;
continue;
} else {
var G__18484 = cljs.core.next(seq__18338__$1);
var G__18485 = null;
var G__18486 = (0);
var G__18487 = (0);
seq__18338 = G__18484;
chunk__18341 = G__18485;
count__18342 = G__18486;
i__18343 = G__18487;
continue;
}
}
} else {
return null;
}
}
break;
}
}));

(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$applyTo = (function (seq18331){
var G__18332 = cljs.core.first(seq18331);
var seq18331__$1 = cljs.core.next(seq18331);
var G__18333 = cljs.core.first(seq18331__$1);
var seq18331__$2 = cljs.core.next(seq18331__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__18332,G__18333,seq18331__$2);
}));

shadow.remote.runtime.shared.welcome = (function shadow$remote$runtime$shared$welcome(p__18350,p__18351){
var map__18352 = p__18350;
var map__18352__$1 = cljs.core.__destructure_map(map__18352);
var runtime = map__18352__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18352__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__18353 = p__18351;
var map__18353__$1 = cljs.core.__destructure_map(map__18353);
var msg = map__18353__$1;
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18353__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.assoc,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"welcome","welcome",-578152123),true], 0));

var map__18354 = cljs.core.deref(state_ref);
var map__18354__$1 = cljs.core.__destructure_map(map__18354);
var client_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18354__$1,new cljs.core.Keyword(null,"client-info","client-info",1958982504));
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18354__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
shadow.remote.runtime.shared.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"hello","hello",-245025397),new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info], null));

return shadow.remote.runtime.shared.trigger_BANG_(runtime,new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125));
});
shadow.remote.runtime.shared.ping = (function shadow$remote$runtime$shared$ping(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"pong","pong",-172484958)], null));
});
shadow.remote.runtime.shared.request_supported_ops = (function shadow$remote$runtime$shared$request_supported_ops(p__18355,msg){
var map__18356 = p__18355;
var map__18356__$1 = cljs.core.__destructure_map(map__18356);
var runtime = map__18356__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18356__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"supported-ops","supported-ops",337914702),new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.disj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.set(cljs.core.keys(new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))),new cljs.core.Keyword(null,"welcome","welcome",-578152123),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),new cljs.core.Keyword(null,"tool-disconnect","tool-disconnect",189103996)], 0))], null));
});
shadow.remote.runtime.shared.unknown_relay_op = (function shadow$remote$runtime$shared$unknown_relay_op(msg){
return console.warn("unknown-relay-op",msg);
});
shadow.remote.runtime.shared.unknown_op = (function shadow$remote$runtime$shared$unknown_op(msg){
return console.warn("unknown-op",msg);
});
shadow.remote.runtime.shared.add_extension_STAR_ = (function shadow$remote$runtime$shared$add_extension_STAR_(p__18361,key,p__18362){
var map__18363 = p__18361;
var map__18363__$1 = cljs.core.__destructure_map(map__18363);
var state = map__18363__$1;
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18363__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
var map__18364 = p__18362;
var map__18364__$1 = cljs.core.__destructure_map(map__18364);
var spec = map__18364__$1;
var ops = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18364__$1,new cljs.core.Keyword(null,"ops","ops",1237330063));
var transit_write_handlers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18364__$1,new cljs.core.Keyword(null,"transit-write-handlers","transit-write-handlers",1886308716));
if(cljs.core.contains_QMARK_(extensions,key)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("extension already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"spec","spec",347520401),spec], null));
} else {
}

return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("op already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"op","op",-1882987955),op_kw], null));
} else {
}

return cljs.core.assoc_in(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null),op_handler);
}),cljs.core.assoc_in(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null),spec),ops);
});
shadow.remote.runtime.shared.add_extension = (function shadow$remote$runtime$shared$add_extension(p__18371,key,spec){
var map__18374 = p__18371;
var map__18374__$1 = cljs.core.__destructure_map(map__18374);
var runtime = map__18374__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18374__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,shadow.remote.runtime.shared.add_extension_STAR_,key,spec);

var temp__5808__auto___18503 = new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125).cljs$core$IFn$_invoke$arity$1(spec);
if((temp__5808__auto___18503 == null)){
} else {
var on_welcome_18504 = temp__5808__auto___18503;
if(cljs.core.truth_(new cljs.core.Keyword(null,"welcome","welcome",-578152123).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))){
(on_welcome_18504.cljs$core$IFn$_invoke$arity$0 ? on_welcome_18504.cljs$core$IFn$_invoke$arity$0() : on_welcome_18504.call(null));
} else {
}
}

return runtime;
});
shadow.remote.runtime.shared.add_defaults = (function shadow$remote$runtime$shared$add_defaults(runtime){
return shadow.remote.runtime.shared.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.shared","defaults","shadow.remote.runtime.shared/defaults",-1821257543),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"welcome","welcome",-578152123),(function (p1__18390_SHARP_){
return shadow.remote.runtime.shared.welcome(runtime,p1__18390_SHARP_);
}),new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),(function (p1__18391_SHARP_){
return shadow.remote.runtime.shared.unknown_relay_op(p1__18391_SHARP_);
}),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),(function (p1__18392_SHARP_){
return shadow.remote.runtime.shared.unknown_op(p1__18392_SHARP_);
}),new cljs.core.Keyword(null,"ping","ping",-1670114784),(function (p1__18393_SHARP_){
return shadow.remote.runtime.shared.ping(runtime,p1__18393_SHARP_);
}),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),(function (p1__18394_SHARP_){
return shadow.remote.runtime.shared.request_supported_ops(runtime,p1__18394_SHARP_);
})], null)], null));
});
shadow.remote.runtime.shared.del_extension_STAR_ = (function shadow$remote$runtime$shared$del_extension_STAR_(state,key){
var ext = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null));
if(cljs.core.not(ext)){
return state;
} else {
return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063)], null),cljs.core.dissoc,op_kw);
}),cljs.core.update.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.dissoc,key),new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(ext));
}
});
shadow.remote.runtime.shared.del_extension = (function shadow$remote$runtime$shared$del_extension(p__18402,key){
var map__18403 = p__18402;
var map__18403__$1 = cljs.core.__destructure_map(map__18403);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18403__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state_ref,shadow.remote.runtime.shared.del_extension_STAR_,key);
});
shadow.remote.runtime.shared.unhandled_call_result = (function shadow$remote$runtime$shared$unhandled_call_result(call_config,msg){
return console.warn("unhandled call result",msg,call_config);
});
shadow.remote.runtime.shared.unhandled_client_not_found = (function shadow$remote$runtime$shared$unhandled_client_not_found(p__18409,msg){
var map__18410 = p__18409;
var map__18410__$1 = cljs.core.__destructure_map(map__18410);
var runtime = map__18410__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18410__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic(runtime,new cljs.core.Keyword(null,"on-client-not-found","on-client-not-found",-642452849),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([msg], 0));
});
shadow.remote.runtime.shared.reply_unknown_op = (function shadow$remote$runtime$shared$reply_unknown_op(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg], null));
});
shadow.remote.runtime.shared.process = (function shadow$remote$runtime$shared$process(p__18412,p__18413){
var map__18414 = p__18412;
var map__18414__$1 = cljs.core.__destructure_map(map__18414);
var runtime = map__18414__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18414__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__18415 = p__18413;
var map__18415__$1 = cljs.core.__destructure_map(map__18415);
var msg = map__18415__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18415__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18415__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var state = cljs.core.deref(state_ref);
var op_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op], null));
if(cljs.core.truth_(call_id)){
var cfg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null));
var call_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cfg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"handlers","handlers",79528781),op], null));
if(cljs.core.truth_(call_handler)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([call_id], 0));

return (call_handler.cljs$core$IFn$_invoke$arity$1 ? call_handler.cljs$core$IFn$_invoke$arity$1(msg) : call_handler.call(null,msg));
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
return shadow.remote.runtime.shared.unhandled_call_result(cfg,msg);

}
}
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-not-found","client-not-found",-1754042614),op)){
return shadow.remote.runtime.shared.unhandled_client_not_found(runtime,msg);
} else {
return shadow.remote.runtime.shared.reply_unknown_op(runtime,msg);

}
}
}
});
shadow.remote.runtime.shared.run_on_idle = (function shadow$remote$runtime$shared$run_on_idle(state_ref){
var seq__18418 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__18420 = null;
var count__18421 = (0);
var i__18422 = (0);
while(true){
if((i__18422 < count__18421)){
var map__18432 = chunk__18420.cljs$core$IIndexed$_nth$arity$2(null,i__18422);
var map__18432__$1 = cljs.core.__destructure_map(map__18432);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18432__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__18526 = seq__18418;
var G__18527 = chunk__18420;
var G__18528 = count__18421;
var G__18529 = (i__18422 + (1));
seq__18418 = G__18526;
chunk__18420 = G__18527;
count__18421 = G__18528;
i__18422 = G__18529;
continue;
} else {
var G__18530 = seq__18418;
var G__18531 = chunk__18420;
var G__18532 = count__18421;
var G__18533 = (i__18422 + (1));
seq__18418 = G__18530;
chunk__18420 = G__18531;
count__18421 = G__18532;
i__18422 = G__18533;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__18418);
if(temp__5804__auto__){
var seq__18418__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18418__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__18418__$1);
var G__18535 = cljs.core.chunk_rest(seq__18418__$1);
var G__18536 = c__5525__auto__;
var G__18537 = cljs.core.count(c__5525__auto__);
var G__18538 = (0);
seq__18418 = G__18535;
chunk__18420 = G__18536;
count__18421 = G__18537;
i__18422 = G__18538;
continue;
} else {
var map__18440 = cljs.core.first(seq__18418__$1);
var map__18440__$1 = cljs.core.__destructure_map(map__18440);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18440__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__18539 = cljs.core.next(seq__18418__$1);
var G__18540 = null;
var G__18541 = (0);
var G__18542 = (0);
seq__18418 = G__18539;
chunk__18420 = G__18540;
count__18421 = G__18541;
i__18422 = G__18542;
continue;
} else {
var G__18543 = cljs.core.next(seq__18418__$1);
var G__18544 = null;
var G__18545 = (0);
var G__18546 = (0);
seq__18418 = G__18543;
chunk__18420 = G__18544;
count__18421 = G__18545;
i__18422 = G__18546;
continue;
}
}
} else {
return null;
}
}
break;
}
});

//# sourceMappingURL=shadow.remote.runtime.shared.js.map
