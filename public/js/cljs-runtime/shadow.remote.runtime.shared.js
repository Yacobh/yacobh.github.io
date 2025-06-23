goog.provide('shadow.remote.runtime.shared');
shadow.remote.runtime.shared.init_state = (function shadow$remote$runtime$shared$init_state(client_info){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),(0),new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.PersistentArrayMap.EMPTY], null);
});
shadow.remote.runtime.shared.now = (function shadow$remote$runtime$shared$now(){
return Date.now();
});
shadow.remote.runtime.shared.get_client_id = (function shadow$remote$runtime$shared$get_client_id(p__34378){
var map__34379 = p__34378;
var map__34379__$1 = cljs.core.__destructure_map(map__34379);
var runtime = map__34379__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34379__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var or__5025__auto__ = new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("runtime has no assigned runtime-id",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null));
}
});
shadow.remote.runtime.shared.relay_msg = (function shadow$remote$runtime$shared$relay_msg(runtime,msg){
var self_id_34573 = shadow.remote.runtime.shared.get_client_id(runtime);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"to","to",192099007).cljs$core$IFn$_invoke$arity$1(msg),self_id_34573)){
shadow.remote.runtime.api.relay_msg(runtime,msg);
} else {
Promise.resolve((1)).then((function (){
var G__34386 = runtime;
var G__34387 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"from","from",1815293044),self_id_34573);
return (shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2 ? shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2(G__34386,G__34387) : shadow.remote.runtime.shared.process.call(null,G__34386,G__34387));
}));
}

return msg;
});
shadow.remote.runtime.shared.reply = (function shadow$remote$runtime$shared$reply(runtime,p__34389,res){
var map__34390 = p__34389;
var map__34390__$1 = cljs.core.__destructure_map(map__34390);
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34390__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34390__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var res__$1 = (function (){var G__34396 = res;
var G__34396__$1 = (cljs.core.truth_(call_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__34396,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id):G__34396);
if(cljs.core.truth_(from)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__34396__$1,new cljs.core.Keyword(null,"to","to",192099007),from);
} else {
return G__34396__$1;
}
})();
return shadow.remote.runtime.api.relay_msg(runtime,res__$1);
});
shadow.remote.runtime.shared.call = (function shadow$remote$runtime$shared$call(var_args){
var G__34399 = arguments.length;
switch (G__34399) {
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

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4 = (function (p__34401,msg,handlers,timeout_after_ms){
var map__34402 = p__34401;
var map__34402__$1 = cljs.core.__destructure_map(map__34402);
var runtime = map__34402__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34402__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
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
var args__5755__auto__ = [];
var len__5749__auto___34596 = arguments.length;
var i__5750__auto___34598 = (0);
while(true){
if((i__5750__auto___34598 < len__5749__auto___34596)){
args__5755__auto__.push((arguments[i__5750__auto___34598]));

var G__34599 = (i__5750__auto___34598 + (1));
i__5750__auto___34598 = G__34599;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((2) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((2)),(0),null)):null);
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5756__auto__);
});

(shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (p__34406,ev,args){
var map__34407 = p__34406;
var map__34407__$1 = cljs.core.__destructure_map(map__34407);
var runtime = map__34407__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34407__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var seq__34408 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__34411 = null;
var count__34412 = (0);
var i__34413 = (0);
while(true){
if((i__34413 < count__34412)){
var ext = chunk__34411.cljs$core$IIndexed$_nth$arity$2(null,i__34413);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__34601 = seq__34408;
var G__34602 = chunk__34411;
var G__34603 = count__34412;
var G__34604 = (i__34413 + (1));
seq__34408 = G__34601;
chunk__34411 = G__34602;
count__34412 = G__34603;
i__34413 = G__34604;
continue;
} else {
var G__34605 = seq__34408;
var G__34606 = chunk__34411;
var G__34607 = count__34412;
var G__34608 = (i__34413 + (1));
seq__34408 = G__34605;
chunk__34411 = G__34606;
count__34412 = G__34607;
i__34413 = G__34608;
continue;
}
} else {
var temp__5823__auto__ = cljs.core.seq(seq__34408);
if(temp__5823__auto__){
var seq__34408__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__34408__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__34408__$1);
var G__34609 = cljs.core.chunk_rest(seq__34408__$1);
var G__34610 = c__5548__auto__;
var G__34611 = cljs.core.count(c__5548__auto__);
var G__34612 = (0);
seq__34408 = G__34609;
chunk__34411 = G__34610;
count__34412 = G__34611;
i__34413 = G__34612;
continue;
} else {
var ext = cljs.core.first(seq__34408__$1);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__34616 = cljs.core.next(seq__34408__$1);
var G__34617 = null;
var G__34618 = (0);
var G__34619 = (0);
seq__34408 = G__34616;
chunk__34411 = G__34617;
count__34412 = G__34618;
i__34413 = G__34619;
continue;
} else {
var G__34621 = cljs.core.next(seq__34408__$1);
var G__34622 = null;
var G__34623 = (0);
var G__34624 = (0);
seq__34408 = G__34621;
chunk__34411 = G__34622;
count__34412 = G__34623;
i__34413 = G__34624;
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
(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$applyTo = (function (seq34403){
var G__34404 = cljs.core.first(seq34403);
var seq34403__$1 = cljs.core.next(seq34403);
var G__34405 = cljs.core.first(seq34403__$1);
var seq34403__$2 = cljs.core.next(seq34403__$1);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__34404,G__34405,seq34403__$2);
}));

shadow.remote.runtime.shared.welcome = (function shadow$remote$runtime$shared$welcome(p__34420,p__34421){
var map__34422 = p__34420;
var map__34422__$1 = cljs.core.__destructure_map(map__34422);
var runtime = map__34422__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34422__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__34423 = p__34421;
var map__34423__$1 = cljs.core.__destructure_map(map__34423);
var msg = map__34423__$1;
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34423__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.assoc,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"welcome","welcome",-578152123),true], 0));

var map__34424 = cljs.core.deref(state_ref);
var map__34424__$1 = cljs.core.__destructure_map(map__34424);
var client_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34424__$1,new cljs.core.Keyword(null,"client-info","client-info",1958982504));
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34424__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
shadow.remote.runtime.shared.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"hello","hello",-245025397),new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info], null));

return shadow.remote.runtime.shared.trigger_BANG_(runtime,new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125));
});
shadow.remote.runtime.shared.ping = (function shadow$remote$runtime$shared$ping(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"pong","pong",-172484958)], null));
});
shadow.remote.runtime.shared.request_supported_ops = (function shadow$remote$runtime$shared$request_supported_ops(p__34429,msg){
var map__34430 = p__34429;
var map__34430__$1 = cljs.core.__destructure_map(map__34430);
var runtime = map__34430__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34430__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"supported-ops","supported-ops",337914702),new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.disj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.set(cljs.core.keys(new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))),new cljs.core.Keyword(null,"welcome","welcome",-578152123),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),new cljs.core.Keyword(null,"tool-disconnect","tool-disconnect",189103996)], 0))], null));
});
shadow.remote.runtime.shared.unknown_relay_op = (function shadow$remote$runtime$shared$unknown_relay_op(msg){
return console.warn("unknown-relay-op",msg);
});
shadow.remote.runtime.shared.unknown_op = (function shadow$remote$runtime$shared$unknown_op(msg){
return console.warn("unknown-op",msg);
});
shadow.remote.runtime.shared.add_extension_STAR_ = (function shadow$remote$runtime$shared$add_extension_STAR_(p__34431,key,p__34432){
var map__34433 = p__34431;
var map__34433__$1 = cljs.core.__destructure_map(map__34433);
var state = map__34433__$1;
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34433__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
var map__34434 = p__34432;
var map__34434__$1 = cljs.core.__destructure_map(map__34434);
var spec = map__34434__$1;
var ops = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34434__$1,new cljs.core.Keyword(null,"ops","ops",1237330063));
var transit_write_handlers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34434__$1,new cljs.core.Keyword(null,"transit-write-handlers","transit-write-handlers",1886308716));
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
shadow.remote.runtime.shared.add_extension = (function shadow$remote$runtime$shared$add_extension(p__34435,key,spec){
var map__34436 = p__34435;
var map__34436__$1 = cljs.core.__destructure_map(map__34436);
var runtime = map__34436__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34436__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,shadow.remote.runtime.shared.add_extension_STAR_,key,spec);

var temp__5827__auto___34641 = new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125).cljs$core$IFn$_invoke$arity$1(spec);
if((temp__5827__auto___34641 == null)){
} else {
var on_welcome_34642 = temp__5827__auto___34641;
if(cljs.core.truth_(new cljs.core.Keyword(null,"welcome","welcome",-578152123).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))){
(on_welcome_34642.cljs$core$IFn$_invoke$arity$0 ? on_welcome_34642.cljs$core$IFn$_invoke$arity$0() : on_welcome_34642.call(null));
} else {
}
}

return runtime;
});
shadow.remote.runtime.shared.add_defaults = (function shadow$remote$runtime$shared$add_defaults(runtime){
return shadow.remote.runtime.shared.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.shared","defaults","shadow.remote.runtime.shared/defaults",-1821257543),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"welcome","welcome",-578152123),(function (p1__34437_SHARP_){
return shadow.remote.runtime.shared.welcome(runtime,p1__34437_SHARP_);
}),new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),(function (p1__34439_SHARP_){
return shadow.remote.runtime.shared.unknown_relay_op(p1__34439_SHARP_);
}),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),(function (p1__34440_SHARP_){
return shadow.remote.runtime.shared.unknown_op(p1__34440_SHARP_);
}),new cljs.core.Keyword(null,"ping","ping",-1670114784),(function (p1__34441_SHARP_){
return shadow.remote.runtime.shared.ping(runtime,p1__34441_SHARP_);
}),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),(function (p1__34442_SHARP_){
return shadow.remote.runtime.shared.request_supported_ops(runtime,p1__34442_SHARP_);
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
shadow.remote.runtime.shared.del_extension = (function shadow$remote$runtime$shared$del_extension(p__34453,key){
var map__34455 = p__34453;
var map__34455__$1 = cljs.core.__destructure_map(map__34455);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34455__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state_ref,shadow.remote.runtime.shared.del_extension_STAR_,key);
});
shadow.remote.runtime.shared.unhandled_call_result = (function shadow$remote$runtime$shared$unhandled_call_result(call_config,msg){
return console.warn("unhandled call result",msg,call_config);
});
shadow.remote.runtime.shared.unhandled_client_not_found = (function shadow$remote$runtime$shared$unhandled_client_not_found(p__34459,msg){
var map__34462 = p__34459;
var map__34462__$1 = cljs.core.__destructure_map(map__34462);
var runtime = map__34462__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34462__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic(runtime,new cljs.core.Keyword(null,"on-client-not-found","on-client-not-found",-642452849),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([msg], 0));
});
shadow.remote.runtime.shared.reply_unknown_op = (function shadow$remote$runtime$shared$reply_unknown_op(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg], null));
});
shadow.remote.runtime.shared.process = (function shadow$remote$runtime$shared$process(p__34481,p__34482){
var map__34483 = p__34481;
var map__34483__$1 = cljs.core.__destructure_map(map__34483);
var runtime = map__34483__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34483__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__34484 = p__34482;
var map__34484__$1 = cljs.core.__destructure_map(map__34484);
var msg = map__34484__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34484__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34484__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
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
var seq__34511 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__34513 = null;
var count__34514 = (0);
var i__34515 = (0);
while(true){
if((i__34515 < count__34514)){
var map__34536 = chunk__34513.cljs$core$IIndexed$_nth$arity$2(null,i__34515);
var map__34536__$1 = cljs.core.__destructure_map(map__34536);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34536__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__34653 = seq__34511;
var G__34654 = chunk__34513;
var G__34655 = count__34514;
var G__34656 = (i__34515 + (1));
seq__34511 = G__34653;
chunk__34513 = G__34654;
count__34514 = G__34655;
i__34515 = G__34656;
continue;
} else {
var G__34657 = seq__34511;
var G__34658 = chunk__34513;
var G__34659 = count__34514;
var G__34660 = (i__34515 + (1));
seq__34511 = G__34657;
chunk__34513 = G__34658;
count__34514 = G__34659;
i__34515 = G__34660;
continue;
}
} else {
var temp__5823__auto__ = cljs.core.seq(seq__34511);
if(temp__5823__auto__){
var seq__34511__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__34511__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__34511__$1);
var G__34663 = cljs.core.chunk_rest(seq__34511__$1);
var G__34664 = c__5548__auto__;
var G__34665 = cljs.core.count(c__5548__auto__);
var G__34666 = (0);
seq__34511 = G__34663;
chunk__34513 = G__34664;
count__34514 = G__34665;
i__34515 = G__34666;
continue;
} else {
var map__34546 = cljs.core.first(seq__34511__$1);
var map__34546__$1 = cljs.core.__destructure_map(map__34546);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34546__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__34667 = cljs.core.next(seq__34511__$1);
var G__34668 = null;
var G__34669 = (0);
var G__34670 = (0);
seq__34511 = G__34667;
chunk__34513 = G__34668;
count__34514 = G__34669;
i__34515 = G__34670;
continue;
} else {
var G__34671 = cljs.core.next(seq__34511__$1);
var G__34672 = null;
var G__34673 = (0);
var G__34674 = (0);
seq__34511 = G__34671;
chunk__34513 = G__34672;
count__34514 = G__34673;
i__34515 = G__34674;
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
