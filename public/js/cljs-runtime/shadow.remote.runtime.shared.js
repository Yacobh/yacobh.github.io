goog.provide('shadow.remote.runtime.shared');
shadow.remote.runtime.shared.init_state = (function shadow$remote$runtime$shared$init_state(client_info){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),(0),new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.PersistentArrayMap.EMPTY], null);
});
shadow.remote.runtime.shared.now = (function shadow$remote$runtime$shared$now(){
return Date.now();
});
shadow.remote.runtime.shared.get_client_id = (function shadow$remote$runtime$shared$get_client_id(p__17894){
var map__17895 = p__17894;
var map__17895__$1 = cljs.core.__destructure_map(map__17895);
var runtime = map__17895__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17895__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var or__5002__auto__ = new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("runtime has no assigned runtime-id",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null));
}
});
shadow.remote.runtime.shared.relay_msg = (function shadow$remote$runtime$shared$relay_msg(runtime,msg){
var self_id_18071 = shadow.remote.runtime.shared.get_client_id(runtime);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"to","to",192099007).cljs$core$IFn$_invoke$arity$1(msg),self_id_18071)){
shadow.remote.runtime.api.relay_msg(runtime,msg);
} else {
Promise.resolve((1)).then((function (){
var G__17897 = runtime;
var G__17898 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"from","from",1815293044),self_id_18071);
return (shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2 ? shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2(G__17897,G__17898) : shadow.remote.runtime.shared.process.call(null,G__17897,G__17898));
}));
}

return msg;
});
shadow.remote.runtime.shared.reply = (function shadow$remote$runtime$shared$reply(runtime,p__17901,res){
var map__17902 = p__17901;
var map__17902__$1 = cljs.core.__destructure_map(map__17902);
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17902__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17902__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var res__$1 = (function (){var G__17904 = res;
var G__17904__$1 = (cljs.core.truth_(call_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__17904,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id):G__17904);
if(cljs.core.truth_(from)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__17904__$1,new cljs.core.Keyword(null,"to","to",192099007),from);
} else {
return G__17904__$1;
}
})();
return shadow.remote.runtime.api.relay_msg(runtime,res__$1);
});
shadow.remote.runtime.shared.call = (function shadow$remote$runtime$shared$call(var_args){
var G__17906 = arguments.length;
switch (G__17906) {
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

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4 = (function (p__17907,msg,handlers,timeout_after_ms){
var map__17908 = p__17907;
var map__17908__$1 = cljs.core.__destructure_map(map__17908);
var runtime = map__17908__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17908__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
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
var len__5726__auto___18090 = arguments.length;
var i__5727__auto___18091 = (0);
while(true){
if((i__5727__auto___18091 < len__5726__auto___18090)){
args__5732__auto__.push((arguments[i__5727__auto___18091]));

var G__18092 = (i__5727__auto___18091 + (1));
i__5727__auto___18091 = G__18092;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (p__17916,ev,args){
var map__17917 = p__17916;
var map__17917__$1 = cljs.core.__destructure_map(map__17917);
var runtime = map__17917__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17917__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var seq__17918 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__17921 = null;
var count__17922 = (0);
var i__17923 = (0);
while(true){
if((i__17923 < count__17922)){
var ext = chunk__17921.cljs$core$IIndexed$_nth$arity$2(null,i__17923);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__18099 = seq__17918;
var G__18100 = chunk__17921;
var G__18101 = count__17922;
var G__18102 = (i__17923 + (1));
seq__17918 = G__18099;
chunk__17921 = G__18100;
count__17922 = G__18101;
i__17923 = G__18102;
continue;
} else {
var G__18106 = seq__17918;
var G__18107 = chunk__17921;
var G__18108 = count__17922;
var G__18109 = (i__17923 + (1));
seq__17918 = G__18106;
chunk__17921 = G__18107;
count__17922 = G__18108;
i__17923 = G__18109;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__17918);
if(temp__5804__auto__){
var seq__17918__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__17918__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__17918__$1);
var G__18110 = cljs.core.chunk_rest(seq__17918__$1);
var G__18111 = c__5525__auto__;
var G__18112 = cljs.core.count(c__5525__auto__);
var G__18113 = (0);
seq__17918 = G__18110;
chunk__17921 = G__18111;
count__17922 = G__18112;
i__17923 = G__18113;
continue;
} else {
var ext = cljs.core.first(seq__17918__$1);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__18114 = cljs.core.next(seq__17918__$1);
var G__18115 = null;
var G__18116 = (0);
var G__18117 = (0);
seq__17918 = G__18114;
chunk__17921 = G__18115;
count__17922 = G__18116;
i__17923 = G__18117;
continue;
} else {
var G__18118 = cljs.core.next(seq__17918__$1);
var G__18119 = null;
var G__18120 = (0);
var G__18121 = (0);
seq__17918 = G__18118;
chunk__17921 = G__18119;
count__17922 = G__18120;
i__17923 = G__18121;
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
(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$applyTo = (function (seq17913){
var G__17914 = cljs.core.first(seq17913);
var seq17913__$1 = cljs.core.next(seq17913);
var G__17915 = cljs.core.first(seq17913__$1);
var seq17913__$2 = cljs.core.next(seq17913__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__17914,G__17915,seq17913__$2);
}));

shadow.remote.runtime.shared.welcome = (function shadow$remote$runtime$shared$welcome(p__17927,p__17928){
var map__17933 = p__17927;
var map__17933__$1 = cljs.core.__destructure_map(map__17933);
var runtime = map__17933__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17933__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__17934 = p__17928;
var map__17934__$1 = cljs.core.__destructure_map(map__17934);
var msg = map__17934__$1;
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17934__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.assoc,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"welcome","welcome",-578152123),true], 0));

var map__17935 = cljs.core.deref(state_ref);
var map__17935__$1 = cljs.core.__destructure_map(map__17935);
var client_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17935__$1,new cljs.core.Keyword(null,"client-info","client-info",1958982504));
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17935__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
shadow.remote.runtime.shared.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"hello","hello",-245025397),new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info], null));

return shadow.remote.runtime.shared.trigger_BANG_(runtime,new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125));
});
shadow.remote.runtime.shared.ping = (function shadow$remote$runtime$shared$ping(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"pong","pong",-172484958)], null));
});
shadow.remote.runtime.shared.request_supported_ops = (function shadow$remote$runtime$shared$request_supported_ops(p__17936,msg){
var map__17937 = p__17936;
var map__17937__$1 = cljs.core.__destructure_map(map__17937);
var runtime = map__17937__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17937__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"supported-ops","supported-ops",337914702),new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.disj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.set(cljs.core.keys(new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))),new cljs.core.Keyword(null,"welcome","welcome",-578152123),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),new cljs.core.Keyword(null,"tool-disconnect","tool-disconnect",189103996)], 0))], null));
});
shadow.remote.runtime.shared.unknown_relay_op = (function shadow$remote$runtime$shared$unknown_relay_op(msg){
return console.warn("unknown-relay-op",msg);
});
shadow.remote.runtime.shared.unknown_op = (function shadow$remote$runtime$shared$unknown_op(msg){
return console.warn("unknown-op",msg);
});
shadow.remote.runtime.shared.add_extension_STAR_ = (function shadow$remote$runtime$shared$add_extension_STAR_(p__17938,key,p__17939){
var map__17940 = p__17938;
var map__17940__$1 = cljs.core.__destructure_map(map__17940);
var state = map__17940__$1;
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17940__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
var map__17941 = p__17939;
var map__17941__$1 = cljs.core.__destructure_map(map__17941);
var spec = map__17941__$1;
var ops = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17941__$1,new cljs.core.Keyword(null,"ops","ops",1237330063));
var transit_write_handlers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17941__$1,new cljs.core.Keyword(null,"transit-write-handlers","transit-write-handlers",1886308716));
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
shadow.remote.runtime.shared.add_extension = (function shadow$remote$runtime$shared$add_extension(p__17946,key,spec){
var map__17947 = p__17946;
var map__17947__$1 = cljs.core.__destructure_map(map__17947);
var runtime = map__17947__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17947__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,shadow.remote.runtime.shared.add_extension_STAR_,key,spec);

var temp__5808__auto___18127 = new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125).cljs$core$IFn$_invoke$arity$1(spec);
if((temp__5808__auto___18127 == null)){
} else {
var on_welcome_18128 = temp__5808__auto___18127;
if(cljs.core.truth_(new cljs.core.Keyword(null,"welcome","welcome",-578152123).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))){
(on_welcome_18128.cljs$core$IFn$_invoke$arity$0 ? on_welcome_18128.cljs$core$IFn$_invoke$arity$0() : on_welcome_18128.call(null));
} else {
}
}

return runtime;
});
shadow.remote.runtime.shared.add_defaults = (function shadow$remote$runtime$shared$add_defaults(runtime){
return shadow.remote.runtime.shared.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.shared","defaults","shadow.remote.runtime.shared/defaults",-1821257543),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"welcome","welcome",-578152123),(function (p1__17948_SHARP_){
return shadow.remote.runtime.shared.welcome(runtime,p1__17948_SHARP_);
}),new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),(function (p1__17949_SHARP_){
return shadow.remote.runtime.shared.unknown_relay_op(p1__17949_SHARP_);
}),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),(function (p1__17950_SHARP_){
return shadow.remote.runtime.shared.unknown_op(p1__17950_SHARP_);
}),new cljs.core.Keyword(null,"ping","ping",-1670114784),(function (p1__17951_SHARP_){
return shadow.remote.runtime.shared.ping(runtime,p1__17951_SHARP_);
}),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),(function (p1__17952_SHARP_){
return shadow.remote.runtime.shared.request_supported_ops(runtime,p1__17952_SHARP_);
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
shadow.remote.runtime.shared.del_extension = (function shadow$remote$runtime$shared$del_extension(p__17959,key){
var map__17961 = p__17959;
var map__17961__$1 = cljs.core.__destructure_map(map__17961);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17961__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state_ref,shadow.remote.runtime.shared.del_extension_STAR_,key);
});
shadow.remote.runtime.shared.unhandled_call_result = (function shadow$remote$runtime$shared$unhandled_call_result(call_config,msg){
return console.warn("unhandled call result",msg,call_config);
});
shadow.remote.runtime.shared.unhandled_client_not_found = (function shadow$remote$runtime$shared$unhandled_client_not_found(p__17967,msg){
var map__17969 = p__17967;
var map__17969__$1 = cljs.core.__destructure_map(map__17969);
var runtime = map__17969__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17969__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic(runtime,new cljs.core.Keyword(null,"on-client-not-found","on-client-not-found",-642452849),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([msg], 0));
});
shadow.remote.runtime.shared.reply_unknown_op = (function shadow$remote$runtime$shared$reply_unknown_op(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg], null));
});
shadow.remote.runtime.shared.process = (function shadow$remote$runtime$shared$process(p__17984,p__17985){
var map__17987 = p__17984;
var map__17987__$1 = cljs.core.__destructure_map(map__17987);
var runtime = map__17987__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17987__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__17988 = p__17985;
var map__17988__$1 = cljs.core.__destructure_map(map__17988);
var msg = map__17988__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17988__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17988__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
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
var seq__18012 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__18014 = null;
var count__18015 = (0);
var i__18016 = (0);
while(true){
if((i__18016 < count__18015)){
var map__18047 = chunk__18014.cljs$core$IIndexed$_nth$arity$2(null,i__18016);
var map__18047__$1 = cljs.core.__destructure_map(map__18047);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18047__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__18139 = seq__18012;
var G__18140 = chunk__18014;
var G__18141 = count__18015;
var G__18142 = (i__18016 + (1));
seq__18012 = G__18139;
chunk__18014 = G__18140;
count__18015 = G__18141;
i__18016 = G__18142;
continue;
} else {
var G__18143 = seq__18012;
var G__18144 = chunk__18014;
var G__18145 = count__18015;
var G__18146 = (i__18016 + (1));
seq__18012 = G__18143;
chunk__18014 = G__18144;
count__18015 = G__18145;
i__18016 = G__18146;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__18012);
if(temp__5804__auto__){
var seq__18012__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18012__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__18012__$1);
var G__18147 = cljs.core.chunk_rest(seq__18012__$1);
var G__18148 = c__5525__auto__;
var G__18149 = cljs.core.count(c__5525__auto__);
var G__18150 = (0);
seq__18012 = G__18147;
chunk__18014 = G__18148;
count__18015 = G__18149;
i__18016 = G__18150;
continue;
} else {
var map__18057 = cljs.core.first(seq__18012__$1);
var map__18057__$1 = cljs.core.__destructure_map(map__18057);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18057__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__18151 = cljs.core.next(seq__18012__$1);
var G__18152 = null;
var G__18153 = (0);
var G__18154 = (0);
seq__18012 = G__18151;
chunk__18014 = G__18152;
count__18015 = G__18153;
i__18016 = G__18154;
continue;
} else {
var G__18155 = cljs.core.next(seq__18012__$1);
var G__18156 = null;
var G__18157 = (0);
var G__18158 = (0);
seq__18012 = G__18155;
chunk__18014 = G__18156;
count__18015 = G__18157;
i__18016 = G__18158;
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
