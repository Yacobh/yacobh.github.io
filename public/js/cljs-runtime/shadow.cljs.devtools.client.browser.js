goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5732__auto__ = [];
var len__5726__auto___23005 = arguments.length;
var i__5727__auto___23006 = (0);
while(true){
if((i__5727__auto___23006 < len__5726__auto___23005)){
args__5732__auto__.push((arguments[i__5727__auto___23006]));

var G__23007 = (i__5727__auto___23006 + (1));
i__5727__auto___23006 = G__23007;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic = (function (msg,args){
if(shadow.cljs.devtools.client.env.log){
if(cljs.core.seq(shadow.cljs.devtools.client.env.log_style)){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [["%cshadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join(''),shadow.cljs.devtools.client.env.log_style], null),args)));
} else {
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["shadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join('')], null),args)));
}
} else {
return null;
}
}));

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq22571){
var G__22572 = cljs.core.first(seq22571);
var seq22571__$1 = cljs.core.next(seq22571);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__22572,seq22571__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__22576 = cljs.core.seq(sources);
var chunk__22577 = null;
var count__22578 = (0);
var i__22579 = (0);
while(true){
if((i__22579 < count__22578)){
var map__22586 = chunk__22577.cljs$core$IIndexed$_nth$arity$2(null,i__22579);
var map__22586__$1 = cljs.core.__destructure_map(map__22586);
var src = map__22586__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22586__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22586__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22586__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22586__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e22587){var e_23008 = e22587;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_23008);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_23008.message)].join('')));
}

var G__23009 = seq__22576;
var G__23010 = chunk__22577;
var G__23011 = count__22578;
var G__23012 = (i__22579 + (1));
seq__22576 = G__23009;
chunk__22577 = G__23010;
count__22578 = G__23011;
i__22579 = G__23012;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__22576);
if(temp__5804__auto__){
var seq__22576__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__22576__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__22576__$1);
var G__23014 = cljs.core.chunk_rest(seq__22576__$1);
var G__23015 = c__5525__auto__;
var G__23016 = cljs.core.count(c__5525__auto__);
var G__23017 = (0);
seq__22576 = G__23014;
chunk__22577 = G__23015;
count__22578 = G__23016;
i__22579 = G__23017;
continue;
} else {
var map__22589 = cljs.core.first(seq__22576__$1);
var map__22589__$1 = cljs.core.__destructure_map(map__22589);
var src = map__22589__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22589__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22589__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22589__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22589__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e22590){var e_23018 = e22590;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_23018);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_23018.message)].join('')));
}

var G__23021 = cljs.core.next(seq__22576__$1);
var G__23022 = null;
var G__23023 = (0);
var G__23024 = (0);
seq__22576 = G__23021;
chunk__22577 = G__23022;
count__22578 = G__23023;
i__22579 = G__23024;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.do_js_reload = (function shadow$cljs$devtools$client$browser$do_js_reload(msg,sources,complete_fn,failure_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(msg,new cljs.core.Keyword(null,"log-missing-fn","log-missing-fn",732676765),(function (fn_sym){
return null;
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"log-call-async","log-call-async",183826192),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call async ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
}),new cljs.core.Keyword(null,"log-call","log-call",412404391),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
})], 0)),(function (next){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (next.cljs$core$IFn$_invoke$arity$0 ? next.cljs$core$IFn$_invoke$arity$0() : next.call(null));
}),complete_fn,failure_fn);
});
/**
 * when (require '["some-str" :as x]) is done at the REPL we need to manually call the shadow.js.require for it
 * since the file only adds the shadow$provide. only need to do this for shadow-js.
 */
shadow.cljs.devtools.client.browser.do_js_requires = (function shadow$cljs$devtools$client$browser$do_js_requires(js_requires){
var seq__22597 = cljs.core.seq(js_requires);
var chunk__22598 = null;
var count__22599 = (0);
var i__22600 = (0);
while(true){
if((i__22600 < count__22599)){
var js_ns = chunk__22598.cljs$core$IIndexed$_nth$arity$2(null,i__22600);
var require_str_23028 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_23028);


var G__23029 = seq__22597;
var G__23030 = chunk__22598;
var G__23031 = count__22599;
var G__23032 = (i__22600 + (1));
seq__22597 = G__23029;
chunk__22598 = G__23030;
count__22599 = G__23031;
i__22600 = G__23032;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__22597);
if(temp__5804__auto__){
var seq__22597__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__22597__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__22597__$1);
var G__23033 = cljs.core.chunk_rest(seq__22597__$1);
var G__23034 = c__5525__auto__;
var G__23035 = cljs.core.count(c__5525__auto__);
var G__23036 = (0);
seq__22597 = G__23033;
chunk__22598 = G__23034;
count__22599 = G__23035;
i__22600 = G__23036;
continue;
} else {
var js_ns = cljs.core.first(seq__22597__$1);
var require_str_23037 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_23037);


var G__23038 = cljs.core.next(seq__22597__$1);
var G__23039 = null;
var G__23040 = (0);
var G__23041 = (0);
seq__22597 = G__23038;
chunk__22598 = G__23039;
count__22599 = G__23040;
i__22600 = G__23041;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__22602){
var map__22603 = p__22602;
var map__22603__$1 = cljs.core.__destructure_map(map__22603);
var msg = map__22603__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22603__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22603__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5480__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22604(s__22605){
return (new cljs.core.LazySeq(null,(function (){
var s__22605__$1 = s__22605;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__22605__$1);
if(temp__5804__auto__){
var xs__6360__auto__ = temp__5804__auto__;
var map__22612 = cljs.core.first(xs__6360__auto__);
var map__22612__$1 = cljs.core.__destructure_map(map__22612);
var src = map__22612__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22612__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22612__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5476__auto__ = ((function (s__22605__$1,map__22612,map__22612__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__22603,map__22603__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22604_$_iter__22608(s__22609){
return (new cljs.core.LazySeq(null,((function (s__22605__$1,map__22612,map__22612__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__22603,map__22603__$1,msg,info,reload_info){
return (function (){
var s__22609__$1 = s__22609;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__22609__$1);
if(temp__5804__auto____$1){
var s__22609__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__22609__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22609__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22611 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22610 = (0);
while(true){
if((i__22610 < size__5479__auto__)){
var warning = cljs.core._nth(c__5478__auto__,i__22610);
cljs.core.chunk_append(b__22611,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__23042 = (i__22610 + (1));
i__22610 = G__23042;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22611),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22604_$_iter__22608(cljs.core.chunk_rest(s__22609__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22611),null);
}
} else {
var warning = cljs.core.first(s__22609__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22604_$_iter__22608(cljs.core.rest(s__22609__$2)));
}
} else {
return null;
}
break;
}
});})(s__22605__$1,map__22612,map__22612__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__22603,map__22603__$1,msg,info,reload_info))
,null,null));
});})(s__22605__$1,map__22612,map__22612__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__22603,map__22603__$1,msg,info,reload_info))
;
var fs__5477__auto__ = cljs.core.seq(iterys__5476__auto__(warnings));
if(fs__5477__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5477__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22604(cljs.core.rest(s__22605__$1)));
} else {
var G__23043 = cljs.core.rest(s__22605__$1);
s__22605__$1 = G__23043;
continue;
}
} else {
var G__23044 = cljs.core.rest(s__22605__$1);
s__22605__$1 = G__23044;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
if(shadow.cljs.devtools.client.env.log){
var seq__22613_23045 = cljs.core.seq(warnings);
var chunk__22614_23046 = null;
var count__22615_23047 = (0);
var i__22616_23048 = (0);
while(true){
if((i__22616_23048 < count__22615_23047)){
var map__22620_23049 = chunk__22614_23046.cljs$core$IIndexed$_nth$arity$2(null,i__22616_23048);
var map__22620_23050__$1 = cljs.core.__destructure_map(map__22620_23049);
var w_23051 = map__22620_23050__$1;
var msg_23052__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22620_23050__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_23053 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22620_23050__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_23054 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22620_23050__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_23055 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22620_23050__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_23055)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_23053),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_23054),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_23052__$1)].join(''));


var G__23056 = seq__22613_23045;
var G__23057 = chunk__22614_23046;
var G__23058 = count__22615_23047;
var G__23059 = (i__22616_23048 + (1));
seq__22613_23045 = G__23056;
chunk__22614_23046 = G__23057;
count__22615_23047 = G__23058;
i__22616_23048 = G__23059;
continue;
} else {
var temp__5804__auto___23060 = cljs.core.seq(seq__22613_23045);
if(temp__5804__auto___23060){
var seq__22613_23061__$1 = temp__5804__auto___23060;
if(cljs.core.chunked_seq_QMARK_(seq__22613_23061__$1)){
var c__5525__auto___23062 = cljs.core.chunk_first(seq__22613_23061__$1);
var G__23063 = cljs.core.chunk_rest(seq__22613_23061__$1);
var G__23064 = c__5525__auto___23062;
var G__23065 = cljs.core.count(c__5525__auto___23062);
var G__23066 = (0);
seq__22613_23045 = G__23063;
chunk__22614_23046 = G__23064;
count__22615_23047 = G__23065;
i__22616_23048 = G__23066;
continue;
} else {
var map__22621_23067 = cljs.core.first(seq__22613_23061__$1);
var map__22621_23068__$1 = cljs.core.__destructure_map(map__22621_23067);
var w_23069 = map__22621_23068__$1;
var msg_23070__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22621_23068__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_23071 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22621_23068__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_23072 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22621_23068__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_23073 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22621_23068__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_23073)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_23071),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_23072),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_23070__$1)].join(''));


var G__23074 = cljs.core.next(seq__22613_23061__$1);
var G__23075 = null;
var G__23076 = (0);
var G__23077 = (0);
seq__22613_23045 = G__23074;
chunk__22614_23046 = G__23075;
count__22615_23047 = G__23076;
i__22616_23048 = G__23077;
continue;
}
} else {
}
}
break;
}
} else {
}

if((!(shadow.cljs.devtools.client.env.autoload))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(((cljs.core.empty_QMARK_(warnings)) || (shadow.cljs.devtools.client.env.ignore_warnings))){
var sources_to_get = shadow.cljs.devtools.client.env.filter_reload_sources(info,reload_info);
if(cljs.core.not(cljs.core.seq(sources_to_get))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"after-load","after-load",-1278503285)], null)))){
} else {
shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("reloading code but no :after-load hooks are configured!",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["https://shadow-cljs.github.io/docs/UsersGuide.html#_lifecycle_hooks"], 0));
}

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__22601_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__22601_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
}));
}
} else {
return null;
}
}
});
shadow.cljs.devtools.client.browser.page_load_uri = (cljs.core.truth_(goog.global.document)?goog.Uri.parse(document.location.href):null);
shadow.cljs.devtools.client.browser.match_paths = (function shadow$cljs$devtools$client$browser$match_paths(old,new$){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("file",shadow.cljs.devtools.client.browser.page_load_uri.getScheme())){
var rel_new = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(new$,(1));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old,rel_new)) || (clojure.string.starts_with_QMARK_(old,[rel_new,"?"].join(''))))){
return rel_new;
} else {
return null;
}
} else {
var node_uri = goog.Uri.parse(old);
var node_uri_resolved = shadow.cljs.devtools.client.browser.page_load_uri.resolve(node_uri);
var node_abs = node_uri_resolved.getPath();
var and__5000__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__5000__auto__){
var and__5000__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__5000__auto____$1){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__22625 = node_uri;
G__22625.setQuery(null);

G__22625.setPath(new$);

return G__22625;
})());
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__22626){
var map__22627 = p__22626;
var map__22627__$1 = cljs.core.__destructure_map(map__22627);
var msg = map__22627__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22627__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22627__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__22628 = cljs.core.seq(updates);
var chunk__22631 = null;
var count__22632 = (0);
var i__22633 = (0);
while(true){
if((i__22633 < count__22632)){
var path = chunk__22631.cljs$core$IIndexed$_nth$arity$2(null,i__22633);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__22830_23078 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__22834_23079 = null;
var count__22835_23080 = (0);
var i__22836_23081 = (0);
while(true){
if((i__22836_23081 < count__22835_23080)){
var node_23082 = chunk__22834_23079.cljs$core$IIndexed$_nth$arity$2(null,i__22836_23081);
if(cljs.core.not(node_23082.shadow$old)){
var path_match_23083 = shadow.cljs.devtools.client.browser.match_paths(node_23082.getAttribute("href"),path);
if(cljs.core.truth_(path_match_23083)){
var new_link_23084 = (function (){var G__22868 = node_23082.cloneNode(true);
G__22868.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_23083),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__22868;
})();
(node_23082.shadow$old = true);

(new_link_23084.onload = ((function (seq__22830_23078,chunk__22834_23079,count__22835_23080,i__22836_23081,seq__22628,chunk__22631,count__22632,i__22633,new_link_23084,path_match_23083,node_23082,path,map__22627,map__22627__$1,msg,updates,reload_info){
return (function (e){
var seq__22869_23085 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__22871_23086 = null;
var count__22872_23087 = (0);
var i__22873_23088 = (0);
while(true){
if((i__22873_23088 < count__22872_23087)){
var map__22880_23089 = chunk__22871_23086.cljs$core$IIndexed$_nth$arity$2(null,i__22873_23088);
var map__22880_23090__$1 = cljs.core.__destructure_map(map__22880_23089);
var task_23091 = map__22880_23090__$1;
var fn_str_23092 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22880_23090__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_23093 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22880_23090__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23094 = goog.getObjectByName(fn_str_23092,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_23093)].join(''));

(fn_obj_23094.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23094.cljs$core$IFn$_invoke$arity$2(path,new_link_23084) : fn_obj_23094.call(null,path,new_link_23084));


var G__23095 = seq__22869_23085;
var G__23096 = chunk__22871_23086;
var G__23097 = count__22872_23087;
var G__23098 = (i__22873_23088 + (1));
seq__22869_23085 = G__23095;
chunk__22871_23086 = G__23096;
count__22872_23087 = G__23097;
i__22873_23088 = G__23098;
continue;
} else {
var temp__5804__auto___23099 = cljs.core.seq(seq__22869_23085);
if(temp__5804__auto___23099){
var seq__22869_23100__$1 = temp__5804__auto___23099;
if(cljs.core.chunked_seq_QMARK_(seq__22869_23100__$1)){
var c__5525__auto___23101 = cljs.core.chunk_first(seq__22869_23100__$1);
var G__23102 = cljs.core.chunk_rest(seq__22869_23100__$1);
var G__23103 = c__5525__auto___23101;
var G__23104 = cljs.core.count(c__5525__auto___23101);
var G__23105 = (0);
seq__22869_23085 = G__23102;
chunk__22871_23086 = G__23103;
count__22872_23087 = G__23104;
i__22873_23088 = G__23105;
continue;
} else {
var map__22881_23106 = cljs.core.first(seq__22869_23100__$1);
var map__22881_23107__$1 = cljs.core.__destructure_map(map__22881_23106);
var task_23108 = map__22881_23107__$1;
var fn_str_23109 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22881_23107__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_23110 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22881_23107__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23111 = goog.getObjectByName(fn_str_23109,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_23110)].join(''));

(fn_obj_23111.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23111.cljs$core$IFn$_invoke$arity$2(path,new_link_23084) : fn_obj_23111.call(null,path,new_link_23084));


var G__23112 = cljs.core.next(seq__22869_23100__$1);
var G__23113 = null;
var G__23114 = (0);
var G__23115 = (0);
seq__22869_23085 = G__23112;
chunk__22871_23086 = G__23113;
count__22872_23087 = G__23114;
i__22873_23088 = G__23115;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_23082);
});})(seq__22830_23078,chunk__22834_23079,count__22835_23080,i__22836_23081,seq__22628,chunk__22631,count__22632,i__22633,new_link_23084,path_match_23083,node_23082,path,map__22627,map__22627__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_23083], 0));

goog.dom.insertSiblingAfter(new_link_23084,node_23082);


var G__23118 = seq__22830_23078;
var G__23119 = chunk__22834_23079;
var G__23120 = count__22835_23080;
var G__23121 = (i__22836_23081 + (1));
seq__22830_23078 = G__23118;
chunk__22834_23079 = G__23119;
count__22835_23080 = G__23120;
i__22836_23081 = G__23121;
continue;
} else {
var G__23122 = seq__22830_23078;
var G__23123 = chunk__22834_23079;
var G__23124 = count__22835_23080;
var G__23125 = (i__22836_23081 + (1));
seq__22830_23078 = G__23122;
chunk__22834_23079 = G__23123;
count__22835_23080 = G__23124;
i__22836_23081 = G__23125;
continue;
}
} else {
var G__23126 = seq__22830_23078;
var G__23127 = chunk__22834_23079;
var G__23128 = count__22835_23080;
var G__23129 = (i__22836_23081 + (1));
seq__22830_23078 = G__23126;
chunk__22834_23079 = G__23127;
count__22835_23080 = G__23128;
i__22836_23081 = G__23129;
continue;
}
} else {
var temp__5804__auto___23130 = cljs.core.seq(seq__22830_23078);
if(temp__5804__auto___23130){
var seq__22830_23131__$1 = temp__5804__auto___23130;
if(cljs.core.chunked_seq_QMARK_(seq__22830_23131__$1)){
var c__5525__auto___23132 = cljs.core.chunk_first(seq__22830_23131__$1);
var G__23133 = cljs.core.chunk_rest(seq__22830_23131__$1);
var G__23134 = c__5525__auto___23132;
var G__23135 = cljs.core.count(c__5525__auto___23132);
var G__23136 = (0);
seq__22830_23078 = G__23133;
chunk__22834_23079 = G__23134;
count__22835_23080 = G__23135;
i__22836_23081 = G__23136;
continue;
} else {
var node_23137 = cljs.core.first(seq__22830_23131__$1);
if(cljs.core.not(node_23137.shadow$old)){
var path_match_23138 = shadow.cljs.devtools.client.browser.match_paths(node_23137.getAttribute("href"),path);
if(cljs.core.truth_(path_match_23138)){
var new_link_23139 = (function (){var G__22882 = node_23137.cloneNode(true);
G__22882.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_23138),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__22882;
})();
(node_23137.shadow$old = true);

(new_link_23139.onload = ((function (seq__22830_23078,chunk__22834_23079,count__22835_23080,i__22836_23081,seq__22628,chunk__22631,count__22632,i__22633,new_link_23139,path_match_23138,node_23137,seq__22830_23131__$1,temp__5804__auto___23130,path,map__22627,map__22627__$1,msg,updates,reload_info){
return (function (e){
var seq__22883_23140 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__22885_23141 = null;
var count__22886_23142 = (0);
var i__22887_23143 = (0);
while(true){
if((i__22887_23143 < count__22886_23142)){
var map__22896_23145 = chunk__22885_23141.cljs$core$IIndexed$_nth$arity$2(null,i__22887_23143);
var map__22896_23146__$1 = cljs.core.__destructure_map(map__22896_23145);
var task_23147 = map__22896_23146__$1;
var fn_str_23148 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22896_23146__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_23149 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22896_23146__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23151 = goog.getObjectByName(fn_str_23148,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_23149)].join(''));

(fn_obj_23151.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23151.cljs$core$IFn$_invoke$arity$2(path,new_link_23139) : fn_obj_23151.call(null,path,new_link_23139));


var G__23152 = seq__22883_23140;
var G__23153 = chunk__22885_23141;
var G__23154 = count__22886_23142;
var G__23155 = (i__22887_23143 + (1));
seq__22883_23140 = G__23152;
chunk__22885_23141 = G__23153;
count__22886_23142 = G__23154;
i__22887_23143 = G__23155;
continue;
} else {
var temp__5804__auto___23156__$1 = cljs.core.seq(seq__22883_23140);
if(temp__5804__auto___23156__$1){
var seq__22883_23157__$1 = temp__5804__auto___23156__$1;
if(cljs.core.chunked_seq_QMARK_(seq__22883_23157__$1)){
var c__5525__auto___23158 = cljs.core.chunk_first(seq__22883_23157__$1);
var G__23159 = cljs.core.chunk_rest(seq__22883_23157__$1);
var G__23160 = c__5525__auto___23158;
var G__23161 = cljs.core.count(c__5525__auto___23158);
var G__23162 = (0);
seq__22883_23140 = G__23159;
chunk__22885_23141 = G__23160;
count__22886_23142 = G__23161;
i__22887_23143 = G__23162;
continue;
} else {
var map__22897_23163 = cljs.core.first(seq__22883_23157__$1);
var map__22897_23164__$1 = cljs.core.__destructure_map(map__22897_23163);
var task_23165 = map__22897_23164__$1;
var fn_str_23166 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22897_23164__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_23167 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22897_23164__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23168 = goog.getObjectByName(fn_str_23166,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_23167)].join(''));

(fn_obj_23168.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23168.cljs$core$IFn$_invoke$arity$2(path,new_link_23139) : fn_obj_23168.call(null,path,new_link_23139));


var G__23169 = cljs.core.next(seq__22883_23157__$1);
var G__23170 = null;
var G__23171 = (0);
var G__23172 = (0);
seq__22883_23140 = G__23169;
chunk__22885_23141 = G__23170;
count__22886_23142 = G__23171;
i__22887_23143 = G__23172;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_23137);
});})(seq__22830_23078,chunk__22834_23079,count__22835_23080,i__22836_23081,seq__22628,chunk__22631,count__22632,i__22633,new_link_23139,path_match_23138,node_23137,seq__22830_23131__$1,temp__5804__auto___23130,path,map__22627,map__22627__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_23138], 0));

goog.dom.insertSiblingAfter(new_link_23139,node_23137);


var G__23173 = cljs.core.next(seq__22830_23131__$1);
var G__23174 = null;
var G__23175 = (0);
var G__23176 = (0);
seq__22830_23078 = G__23173;
chunk__22834_23079 = G__23174;
count__22835_23080 = G__23175;
i__22836_23081 = G__23176;
continue;
} else {
var G__23177 = cljs.core.next(seq__22830_23131__$1);
var G__23178 = null;
var G__23179 = (0);
var G__23180 = (0);
seq__22830_23078 = G__23177;
chunk__22834_23079 = G__23178;
count__22835_23080 = G__23179;
i__22836_23081 = G__23180;
continue;
}
} else {
var G__23181 = cljs.core.next(seq__22830_23131__$1);
var G__23182 = null;
var G__23183 = (0);
var G__23184 = (0);
seq__22830_23078 = G__23181;
chunk__22834_23079 = G__23182;
count__22835_23080 = G__23183;
i__22836_23081 = G__23184;
continue;
}
}
} else {
}
}
break;
}


var G__23185 = seq__22628;
var G__23186 = chunk__22631;
var G__23187 = count__22632;
var G__23188 = (i__22633 + (1));
seq__22628 = G__23185;
chunk__22631 = G__23186;
count__22632 = G__23187;
i__22633 = G__23188;
continue;
} else {
var G__23189 = seq__22628;
var G__23190 = chunk__22631;
var G__23191 = count__22632;
var G__23192 = (i__22633 + (1));
seq__22628 = G__23189;
chunk__22631 = G__23190;
count__22632 = G__23191;
i__22633 = G__23192;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__22628);
if(temp__5804__auto__){
var seq__22628__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__22628__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__22628__$1);
var G__23193 = cljs.core.chunk_rest(seq__22628__$1);
var G__23194 = c__5525__auto__;
var G__23195 = cljs.core.count(c__5525__auto__);
var G__23196 = (0);
seq__22628 = G__23193;
chunk__22631 = G__23194;
count__22632 = G__23195;
i__22633 = G__23196;
continue;
} else {
var path = cljs.core.first(seq__22628__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__22900_23197 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__22904_23198 = null;
var count__22905_23199 = (0);
var i__22906_23200 = (0);
while(true){
if((i__22906_23200 < count__22905_23199)){
var node_23201 = chunk__22904_23198.cljs$core$IIndexed$_nth$arity$2(null,i__22906_23200);
if(cljs.core.not(node_23201.shadow$old)){
var path_match_23202 = shadow.cljs.devtools.client.browser.match_paths(node_23201.getAttribute("href"),path);
if(cljs.core.truth_(path_match_23202)){
var new_link_23203 = (function (){var G__22942 = node_23201.cloneNode(true);
G__22942.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_23202),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__22942;
})();
(node_23201.shadow$old = true);

(new_link_23203.onload = ((function (seq__22900_23197,chunk__22904_23198,count__22905_23199,i__22906_23200,seq__22628,chunk__22631,count__22632,i__22633,new_link_23203,path_match_23202,node_23201,path,seq__22628__$1,temp__5804__auto__,map__22627,map__22627__$1,msg,updates,reload_info){
return (function (e){
var seq__22943_23204 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__22945_23205 = null;
var count__22946_23206 = (0);
var i__22947_23207 = (0);
while(true){
if((i__22947_23207 < count__22946_23206)){
var map__22952_23208 = chunk__22945_23205.cljs$core$IIndexed$_nth$arity$2(null,i__22947_23207);
var map__22952_23209__$1 = cljs.core.__destructure_map(map__22952_23208);
var task_23210 = map__22952_23209__$1;
var fn_str_23211 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22952_23209__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_23212 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22952_23209__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23213 = goog.getObjectByName(fn_str_23211,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_23212)].join(''));

(fn_obj_23213.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23213.cljs$core$IFn$_invoke$arity$2(path,new_link_23203) : fn_obj_23213.call(null,path,new_link_23203));


var G__23214 = seq__22943_23204;
var G__23215 = chunk__22945_23205;
var G__23216 = count__22946_23206;
var G__23217 = (i__22947_23207 + (1));
seq__22943_23204 = G__23214;
chunk__22945_23205 = G__23215;
count__22946_23206 = G__23216;
i__22947_23207 = G__23217;
continue;
} else {
var temp__5804__auto___23218__$1 = cljs.core.seq(seq__22943_23204);
if(temp__5804__auto___23218__$1){
var seq__22943_23219__$1 = temp__5804__auto___23218__$1;
if(cljs.core.chunked_seq_QMARK_(seq__22943_23219__$1)){
var c__5525__auto___23222 = cljs.core.chunk_first(seq__22943_23219__$1);
var G__23223 = cljs.core.chunk_rest(seq__22943_23219__$1);
var G__23224 = c__5525__auto___23222;
var G__23225 = cljs.core.count(c__5525__auto___23222);
var G__23226 = (0);
seq__22943_23204 = G__23223;
chunk__22945_23205 = G__23224;
count__22946_23206 = G__23225;
i__22947_23207 = G__23226;
continue;
} else {
var map__22953_23227 = cljs.core.first(seq__22943_23219__$1);
var map__22953_23228__$1 = cljs.core.__destructure_map(map__22953_23227);
var task_23229 = map__22953_23228__$1;
var fn_str_23230 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22953_23228__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_23231 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22953_23228__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23232 = goog.getObjectByName(fn_str_23230,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_23231)].join(''));

(fn_obj_23232.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23232.cljs$core$IFn$_invoke$arity$2(path,new_link_23203) : fn_obj_23232.call(null,path,new_link_23203));


var G__23233 = cljs.core.next(seq__22943_23219__$1);
var G__23234 = null;
var G__23235 = (0);
var G__23236 = (0);
seq__22943_23204 = G__23233;
chunk__22945_23205 = G__23234;
count__22946_23206 = G__23235;
i__22947_23207 = G__23236;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_23201);
});})(seq__22900_23197,chunk__22904_23198,count__22905_23199,i__22906_23200,seq__22628,chunk__22631,count__22632,i__22633,new_link_23203,path_match_23202,node_23201,path,seq__22628__$1,temp__5804__auto__,map__22627,map__22627__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_23202], 0));

goog.dom.insertSiblingAfter(new_link_23203,node_23201);


var G__23237 = seq__22900_23197;
var G__23238 = chunk__22904_23198;
var G__23239 = count__22905_23199;
var G__23240 = (i__22906_23200 + (1));
seq__22900_23197 = G__23237;
chunk__22904_23198 = G__23238;
count__22905_23199 = G__23239;
i__22906_23200 = G__23240;
continue;
} else {
var G__23241 = seq__22900_23197;
var G__23242 = chunk__22904_23198;
var G__23243 = count__22905_23199;
var G__23244 = (i__22906_23200 + (1));
seq__22900_23197 = G__23241;
chunk__22904_23198 = G__23242;
count__22905_23199 = G__23243;
i__22906_23200 = G__23244;
continue;
}
} else {
var G__23245 = seq__22900_23197;
var G__23246 = chunk__22904_23198;
var G__23247 = count__22905_23199;
var G__23248 = (i__22906_23200 + (1));
seq__22900_23197 = G__23245;
chunk__22904_23198 = G__23246;
count__22905_23199 = G__23247;
i__22906_23200 = G__23248;
continue;
}
} else {
var temp__5804__auto___23249__$1 = cljs.core.seq(seq__22900_23197);
if(temp__5804__auto___23249__$1){
var seq__22900_23250__$1 = temp__5804__auto___23249__$1;
if(cljs.core.chunked_seq_QMARK_(seq__22900_23250__$1)){
var c__5525__auto___23251 = cljs.core.chunk_first(seq__22900_23250__$1);
var G__23252 = cljs.core.chunk_rest(seq__22900_23250__$1);
var G__23253 = c__5525__auto___23251;
var G__23254 = cljs.core.count(c__5525__auto___23251);
var G__23255 = (0);
seq__22900_23197 = G__23252;
chunk__22904_23198 = G__23253;
count__22905_23199 = G__23254;
i__22906_23200 = G__23255;
continue;
} else {
var node_23256 = cljs.core.first(seq__22900_23250__$1);
if(cljs.core.not(node_23256.shadow$old)){
var path_match_23257 = shadow.cljs.devtools.client.browser.match_paths(node_23256.getAttribute("href"),path);
if(cljs.core.truth_(path_match_23257)){
var new_link_23258 = (function (){var G__22954 = node_23256.cloneNode(true);
G__22954.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_23257),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__22954;
})();
(node_23256.shadow$old = true);

(new_link_23258.onload = ((function (seq__22900_23197,chunk__22904_23198,count__22905_23199,i__22906_23200,seq__22628,chunk__22631,count__22632,i__22633,new_link_23258,path_match_23257,node_23256,seq__22900_23250__$1,temp__5804__auto___23249__$1,path,seq__22628__$1,temp__5804__auto__,map__22627,map__22627__$1,msg,updates,reload_info){
return (function (e){
var seq__22955_23259 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__22957_23260 = null;
var count__22958_23261 = (0);
var i__22959_23262 = (0);
while(true){
if((i__22959_23262 < count__22958_23261)){
var map__22963_23263 = chunk__22957_23260.cljs$core$IIndexed$_nth$arity$2(null,i__22959_23262);
var map__22963_23264__$1 = cljs.core.__destructure_map(map__22963_23263);
var task_23265 = map__22963_23264__$1;
var fn_str_23266 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22963_23264__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_23267 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22963_23264__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23268 = goog.getObjectByName(fn_str_23266,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_23267)].join(''));

(fn_obj_23268.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23268.cljs$core$IFn$_invoke$arity$2(path,new_link_23258) : fn_obj_23268.call(null,path,new_link_23258));


var G__23269 = seq__22955_23259;
var G__23270 = chunk__22957_23260;
var G__23271 = count__22958_23261;
var G__23272 = (i__22959_23262 + (1));
seq__22955_23259 = G__23269;
chunk__22957_23260 = G__23270;
count__22958_23261 = G__23271;
i__22959_23262 = G__23272;
continue;
} else {
var temp__5804__auto___23273__$2 = cljs.core.seq(seq__22955_23259);
if(temp__5804__auto___23273__$2){
var seq__22955_23274__$1 = temp__5804__auto___23273__$2;
if(cljs.core.chunked_seq_QMARK_(seq__22955_23274__$1)){
var c__5525__auto___23275 = cljs.core.chunk_first(seq__22955_23274__$1);
var G__23276 = cljs.core.chunk_rest(seq__22955_23274__$1);
var G__23277 = c__5525__auto___23275;
var G__23278 = cljs.core.count(c__5525__auto___23275);
var G__23279 = (0);
seq__22955_23259 = G__23276;
chunk__22957_23260 = G__23277;
count__22958_23261 = G__23278;
i__22959_23262 = G__23279;
continue;
} else {
var map__22964_23280 = cljs.core.first(seq__22955_23274__$1);
var map__22964_23281__$1 = cljs.core.__destructure_map(map__22964_23280);
var task_23282 = map__22964_23281__$1;
var fn_str_23283 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22964_23281__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_23284 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22964_23281__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23285 = goog.getObjectByName(fn_str_23283,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_23284)].join(''));

(fn_obj_23285.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23285.cljs$core$IFn$_invoke$arity$2(path,new_link_23258) : fn_obj_23285.call(null,path,new_link_23258));


var G__23286 = cljs.core.next(seq__22955_23274__$1);
var G__23287 = null;
var G__23288 = (0);
var G__23289 = (0);
seq__22955_23259 = G__23286;
chunk__22957_23260 = G__23287;
count__22958_23261 = G__23288;
i__22959_23262 = G__23289;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_23256);
});})(seq__22900_23197,chunk__22904_23198,count__22905_23199,i__22906_23200,seq__22628,chunk__22631,count__22632,i__22633,new_link_23258,path_match_23257,node_23256,seq__22900_23250__$1,temp__5804__auto___23249__$1,path,seq__22628__$1,temp__5804__auto__,map__22627,map__22627__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_23257], 0));

goog.dom.insertSiblingAfter(new_link_23258,node_23256);


var G__23290 = cljs.core.next(seq__22900_23250__$1);
var G__23291 = null;
var G__23292 = (0);
var G__23293 = (0);
seq__22900_23197 = G__23290;
chunk__22904_23198 = G__23291;
count__22905_23199 = G__23292;
i__22906_23200 = G__23293;
continue;
} else {
var G__23294 = cljs.core.next(seq__22900_23250__$1);
var G__23295 = null;
var G__23296 = (0);
var G__23297 = (0);
seq__22900_23197 = G__23294;
chunk__22904_23198 = G__23295;
count__22905_23199 = G__23296;
i__22906_23200 = G__23297;
continue;
}
} else {
var G__23298 = cljs.core.next(seq__22900_23250__$1);
var G__23299 = null;
var G__23300 = (0);
var G__23301 = (0);
seq__22900_23197 = G__23298;
chunk__22904_23198 = G__23299;
count__22905_23199 = G__23300;
i__22906_23200 = G__23301;
continue;
}
}
} else {
}
}
break;
}


var G__23302 = cljs.core.next(seq__22628__$1);
var G__23303 = null;
var G__23304 = (0);
var G__23305 = (0);
seq__22628 = G__23302;
chunk__22631 = G__23303;
count__22632 = G__23304;
i__22633 = G__23305;
continue;
} else {
var G__23306 = cljs.core.next(seq__22628__$1);
var G__23307 = null;
var G__23308 = (0);
var G__23309 = (0);
seq__22628 = G__23306;
chunk__22631 = G__23307;
count__22632 = G__23308;
i__22633 = G__23309;
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
shadow.cljs.devtools.client.browser.global_eval = (function shadow$cljs$devtools$client$browser$global_eval(js){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("undefined",typeof(module))){
return eval(js);
} else {
return (0,eval)(js);;
}
});
shadow.cljs.devtools.client.browser.runtime_info = (((typeof SHADOW_CONFIG !== 'undefined'))?shadow.json.to_clj.cljs$core$IFn$_invoke$arity$1(SHADOW_CONFIG):null);
shadow.cljs.devtools.client.browser.client_info = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.cljs.devtools.client.browser.runtime_info,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"host","host",-1558485167),(cljs.core.truth_(goog.global.document)?new cljs.core.Keyword(null,"browser","browser",828191719):new cljs.core.Keyword(null,"browser-worker","browser-worker",1638998282)),new cljs.core.Keyword(null,"user-agent","user-agent",1220426212),[(cljs.core.truth_(goog.userAgent.OPERA)?"Opera":(cljs.core.truth_(goog.userAgent.product.CHROME)?"Chrome":(cljs.core.truth_(goog.userAgent.IE)?"MSIE":(cljs.core.truth_(goog.userAgent.EDGE)?"Edge":(cljs.core.truth_(goog.userAgent.GECKO)?"Firefox":(cljs.core.truth_(goog.userAgent.SAFARI)?"Safari":(cljs.core.truth_(goog.userAgent.WEBKIT)?"Webkit":null)))))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.VERSION)," [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.PLATFORM),"]"].join(''),new cljs.core.Keyword(null,"dom","dom",-1236537922),(!((goog.global.document == null)))], null)], 0));
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.browser !== 'undefined') && (typeof shadow.cljs.devtools.client.browser.ws_was_welcome_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.browser.ws_was_welcome_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if(((shadow.cljs.devtools.client.env.enabled) && ((shadow.cljs.devtools.client.env.worker_client_id > (0))))){
(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$_js_eval$arity$4 = (function (this$,code,success,fail){
var this$__$1 = this;
try{var G__22972 = shadow.cljs.devtools.client.browser.global_eval(code);
return (success.cljs$core$IFn$_invoke$arity$1 ? success.cljs$core$IFn$_invoke$arity$1(G__22972) : success.call(null,G__22972));
}catch (e22971){var e = e22971;
return (fail.cljs$core$IFn$_invoke$arity$1 ? fail.cljs$core$IFn$_invoke$arity$1(e) : fail.call(null,e));
}}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$5 = (function (this$,ns,p__22973,success,fail){
var map__22974 = p__22973;
var map__22974__$1 = cljs.core.__destructure_map(map__22974);
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22974__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
try{var G__22976 = shadow.cljs.devtools.client.browser.global_eval(js);
return (success.cljs$core$IFn$_invoke$arity$1 ? success.cljs$core$IFn$_invoke$arity$1(G__22976) : success.call(null,G__22976));
}catch (e22975){var e = e22975;
return (fail.cljs$core$IFn$_invoke$arity$1 ? fail.cljs$core$IFn$_invoke$arity$1(e) : fail.call(null,e));
}}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__22977,done,error){
var map__22978 = p__22977;
var map__22978__$1 = cljs.core.__destructure_map(map__22978);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22978__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__22983,done,error){
var map__22984 = p__22983;
var map__22984__$1 = cljs.core.__destructure_map(map__22984);
var msg = map__22984__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22984__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22984__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22984__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__22985){
var map__22986 = p__22985;
var map__22986__$1 = cljs.core.__destructure_map(map__22986);
var src = map__22986__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22986__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5000__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5000__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__22987 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__22987) : done.call(null,G__22987));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__22988){
var map__22989 = p__22988;
var map__22989__$1 = cljs.core.__destructure_map(map__22989);
var msg__$1 = map__22989__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22989__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e22990){var ex = e22990;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__22991){
var map__22992 = p__22991;
var map__22992__$1 = cljs.core.__destructure_map(map__22992);
var env = map__22992__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22992__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var svc = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125),(function (){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,true);

shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.env.patch_goog_BANG_();

return shadow.cljs.devtools.client.browser.devtools_msg(["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword(null,"state-ref","state-ref",2127874952).cljs$core$IFn$_invoke$arity$1(runtime))))," ready!"].join(''));
}),new cljs.core.Keyword(null,"on-disconnect","on-disconnect",-809021814),(function (e){
if(cljs.core.truth_(cljs.core.deref(shadow.cljs.devtools.client.browser.ws_was_welcome_ref))){
shadow.cljs.devtools.client.hud.connection_error("The Websocket connection was closed!");

return cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-reconnect","on-reconnect",1239988702),(function (e){
return shadow.cljs.devtools.client.hud.connection_error("Reconnecting ...");
}),new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"access-denied","access-denied",959449406),(function (msg){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);

return shadow.cljs.devtools.client.hud.connection_error(["Stale Output! Your loaded JS was not produced by the running shadow-cljs instance."," Is the watch for this build running?"].join(''));
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (msg){
return shadow.cljs.devtools.client.browser.handle_asset_update(msg);
}),new cljs.core.Keyword(null,"cljs-build-configure","cljs-build-configure",-2089891268),(function (msg){
return null;
}),new cljs.core.Keyword(null,"cljs-build-start","cljs-build-start",-725781241),(function (msg){
shadow.cljs.devtools.client.hud.hud_hide();

shadow.cljs.devtools.client.hud.load_start();

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-start","build-start",-959649480)));
}),new cljs.core.Keyword(null,"cljs-build-complete","cljs-build-complete",273626153),(function (msg){
var msg__$1 = shadow.cljs.devtools.client.env.add_warnings_to_info(msg);
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.hud.hud_warnings(msg__$1);

shadow.cljs.devtools.client.browser.handle_build_complete(runtime,msg__$1);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-complete","build-complete",-501868472)));
}),new cljs.core.Keyword(null,"cljs-build-failure","cljs-build-failure",1718154990),(function (msg){
shadow.cljs.devtools.client.hud.load_end();

shadow.cljs.devtools.client.hud.hud_error(msg);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466)));
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__22996){
var map__22997 = p__22996;
var map__22997__$1 = cljs.core.__destructure_map(map__22997);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22997__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22997__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-disconnect","client-disconnect",640227957),event_op)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,shadow.cljs.devtools.client.env.worker_client_id)))){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was stopped!");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-connect","client-connect",-1113973888),event_op)){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was restarted. Reload required!");
} else {
return null;
}
}
})], null)], null));

return svc;
}),(function (p__23002){
var map__23003 = p__23002;
var map__23003__$1 = cljs.core.__destructure_map(map__23003);
var svc = map__23003__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23003__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
