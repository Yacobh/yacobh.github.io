goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5755__auto__ = [];
var len__5749__auto___39213 = arguments.length;
var i__5750__auto___39214 = (0);
while(true){
if((i__5750__auto___39214 < len__5749__auto___39213)){
args__5755__auto__.push((arguments[i__5750__auto___39214]));

var G__39215 = (i__5750__auto___39214 + (1));
i__5750__auto___39214 = G__39215;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
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
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq38780){
var G__38781 = cljs.core.first(seq38780);
var seq38780__$1 = cljs.core.next(seq38780);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__38781,seq38780__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__38782 = cljs.core.seq(sources);
var chunk__38783 = null;
var count__38784 = (0);
var i__38785 = (0);
while(true){
if((i__38785 < count__38784)){
var map__38794 = chunk__38783.cljs$core$IIndexed$_nth$arity$2(null,i__38785);
var map__38794__$1 = cljs.core.__destructure_map(map__38794);
var src = map__38794__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38794__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38794__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38794__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38794__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e38795){var e_39217 = e38795;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_39217);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_39217.message)].join('')));
}

var G__39218 = seq__38782;
var G__39219 = chunk__38783;
var G__39220 = count__38784;
var G__39221 = (i__38785 + (1));
seq__38782 = G__39218;
chunk__38783 = G__39219;
count__38784 = G__39220;
i__38785 = G__39221;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__38782);
if(temp__5823__auto__){
var seq__38782__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38782__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__38782__$1);
var G__39222 = cljs.core.chunk_rest(seq__38782__$1);
var G__39223 = c__5548__auto__;
var G__39224 = cljs.core.count(c__5548__auto__);
var G__39225 = (0);
seq__38782 = G__39222;
chunk__38783 = G__39223;
count__38784 = G__39224;
i__38785 = G__39225;
continue;
} else {
var map__38798 = cljs.core.first(seq__38782__$1);
var map__38798__$1 = cljs.core.__destructure_map(map__38798);
var src = map__38798__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38798__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38798__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38798__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38798__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e38799){var e_39226 = e38799;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_39226);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_39226.message)].join('')));
}

var G__39227 = cljs.core.next(seq__38782__$1);
var G__39228 = null;
var G__39229 = (0);
var G__39230 = (0);
seq__38782 = G__39227;
chunk__38783 = G__39228;
count__38784 = G__39229;
i__38785 = G__39230;
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
var seq__38802 = cljs.core.seq(js_requires);
var chunk__38803 = null;
var count__38804 = (0);
var i__38805 = (0);
while(true){
if((i__38805 < count__38804)){
var js_ns = chunk__38803.cljs$core$IIndexed$_nth$arity$2(null,i__38805);
var require_str_39231 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_39231);


var G__39232 = seq__38802;
var G__39234 = chunk__38803;
var G__39235 = count__38804;
var G__39236 = (i__38805 + (1));
seq__38802 = G__39232;
chunk__38803 = G__39234;
count__38804 = G__39235;
i__38805 = G__39236;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__38802);
if(temp__5823__auto__){
var seq__38802__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38802__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__38802__$1);
var G__39237 = cljs.core.chunk_rest(seq__38802__$1);
var G__39238 = c__5548__auto__;
var G__39239 = cljs.core.count(c__5548__auto__);
var G__39240 = (0);
seq__38802 = G__39237;
chunk__38803 = G__39238;
count__38804 = G__39239;
i__38805 = G__39240;
continue;
} else {
var js_ns = cljs.core.first(seq__38802__$1);
var require_str_39241 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_39241);


var G__39242 = cljs.core.next(seq__38802__$1);
var G__39243 = null;
var G__39244 = (0);
var G__39245 = (0);
seq__38802 = G__39242;
chunk__38803 = G__39243;
count__38804 = G__39244;
i__38805 = G__39245;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__38816){
var map__38817 = p__38816;
var map__38817__$1 = cljs.core.__destructure_map(map__38817);
var msg = map__38817__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38817__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38817__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5503__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__38818(s__38819){
return (new cljs.core.LazySeq(null,(function (){
var s__38819__$1 = s__38819;
while(true){
var temp__5823__auto__ = cljs.core.seq(s__38819__$1);
if(temp__5823__auto__){
var xs__6383__auto__ = temp__5823__auto__;
var map__38824 = cljs.core.first(xs__6383__auto__);
var map__38824__$1 = cljs.core.__destructure_map(map__38824);
var src = map__38824__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38824__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38824__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5499__auto__ = ((function (s__38819__$1,map__38824,map__38824__$1,src,resource_name,warnings,xs__6383__auto__,temp__5823__auto__,map__38817,map__38817__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__38818_$_iter__38820(s__38821){
return (new cljs.core.LazySeq(null,((function (s__38819__$1,map__38824,map__38824__$1,src,resource_name,warnings,xs__6383__auto__,temp__5823__auto__,map__38817,map__38817__$1,msg,info,reload_info){
return (function (){
var s__38821__$1 = s__38821;
while(true){
var temp__5823__auto____$1 = cljs.core.seq(s__38821__$1);
if(temp__5823__auto____$1){
var s__38821__$2 = temp__5823__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__38821__$2)){
var c__5501__auto__ = cljs.core.chunk_first(s__38821__$2);
var size__5502__auto__ = cljs.core.count(c__5501__auto__);
var b__38823 = cljs.core.chunk_buffer(size__5502__auto__);
if((function (){var i__38822 = (0);
while(true){
if((i__38822 < size__5502__auto__)){
var warning = cljs.core._nth(c__5501__auto__,i__38822);
cljs.core.chunk_append(b__38823,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__39246 = (i__38822 + (1));
i__38822 = G__39246;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__38823),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__38818_$_iter__38820(cljs.core.chunk_rest(s__38821__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__38823),null);
}
} else {
var warning = cljs.core.first(s__38821__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__38818_$_iter__38820(cljs.core.rest(s__38821__$2)));
}
} else {
return null;
}
break;
}
});})(s__38819__$1,map__38824,map__38824__$1,src,resource_name,warnings,xs__6383__auto__,temp__5823__auto__,map__38817,map__38817__$1,msg,info,reload_info))
,null,null));
});})(s__38819__$1,map__38824,map__38824__$1,src,resource_name,warnings,xs__6383__auto__,temp__5823__auto__,map__38817,map__38817__$1,msg,info,reload_info))
;
var fs__5500__auto__ = cljs.core.seq(iterys__5499__auto__(warnings));
if(fs__5500__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5500__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__38818(cljs.core.rest(s__38819__$1)));
} else {
var G__39247 = cljs.core.rest(s__38819__$1);
s__38819__$1 = G__39247;
continue;
}
} else {
var G__39248 = cljs.core.rest(s__38819__$1);
s__38819__$1 = G__39248;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5503__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
if(shadow.cljs.devtools.client.env.log){
var seq__38828_39249 = cljs.core.seq(warnings);
var chunk__38829_39250 = null;
var count__38830_39251 = (0);
var i__38831_39252 = (0);
while(true){
if((i__38831_39252 < count__38830_39251)){
var map__38835_39253 = chunk__38829_39250.cljs$core$IIndexed$_nth$arity$2(null,i__38831_39252);
var map__38835_39254__$1 = cljs.core.__destructure_map(map__38835_39253);
var w_39255 = map__38835_39254__$1;
var msg_39256__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38835_39254__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_39257 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38835_39254__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_39258 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38835_39254__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_39259 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38835_39254__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_39259)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_39257),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_39258),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_39256__$1)].join(''));


var G__39260 = seq__38828_39249;
var G__39261 = chunk__38829_39250;
var G__39262 = count__38830_39251;
var G__39263 = (i__38831_39252 + (1));
seq__38828_39249 = G__39260;
chunk__38829_39250 = G__39261;
count__38830_39251 = G__39262;
i__38831_39252 = G__39263;
continue;
} else {
var temp__5823__auto___39264 = cljs.core.seq(seq__38828_39249);
if(temp__5823__auto___39264){
var seq__38828_39265__$1 = temp__5823__auto___39264;
if(cljs.core.chunked_seq_QMARK_(seq__38828_39265__$1)){
var c__5548__auto___39266 = cljs.core.chunk_first(seq__38828_39265__$1);
var G__39267 = cljs.core.chunk_rest(seq__38828_39265__$1);
var G__39268 = c__5548__auto___39266;
var G__39269 = cljs.core.count(c__5548__auto___39266);
var G__39270 = (0);
seq__38828_39249 = G__39267;
chunk__38829_39250 = G__39268;
count__38830_39251 = G__39269;
i__38831_39252 = G__39270;
continue;
} else {
var map__38836_39271 = cljs.core.first(seq__38828_39265__$1);
var map__38836_39272__$1 = cljs.core.__destructure_map(map__38836_39271);
var w_39273 = map__38836_39272__$1;
var msg_39274__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38836_39272__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_39275 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38836_39272__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_39276 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38836_39272__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_39277 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38836_39272__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_39277)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_39275),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_39276),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_39274__$1)].join(''));


var G__39278 = cljs.core.next(seq__38828_39265__$1);
var G__39279 = null;
var G__39280 = (0);
var G__39281 = (0);
seq__38828_39249 = G__39278;
chunk__38829_39250 = G__39279;
count__38830_39251 = G__39280;
i__38831_39252 = G__39281;
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

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__38812_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__38812_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
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
var and__5023__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__5023__auto__){
var and__5023__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__5023__auto____$1){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__38838 = node_uri;
G__38838.setQuery(null);

G__38838.setPath(new$);

return G__38838;
})());
} else {
return and__5023__auto____$1;
}
} else {
return and__5023__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__38839){
var map__38840 = p__38839;
var map__38840__$1 = cljs.core.__destructure_map(map__38840);
var msg = map__38840__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38840__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38840__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__38841 = cljs.core.seq(updates);
var chunk__38843 = null;
var count__38844 = (0);
var i__38845 = (0);
while(true){
if((i__38845 < count__38844)){
var path = chunk__38843.cljs$core$IIndexed$_nth$arity$2(null,i__38845);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__38998_39282 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__39002_39283 = null;
var count__39003_39284 = (0);
var i__39004_39285 = (0);
while(true){
if((i__39004_39285 < count__39003_39284)){
var node_39286 = chunk__39002_39283.cljs$core$IIndexed$_nth$arity$2(null,i__39004_39285);
if(cljs.core.not(node_39286.shadow$old)){
var path_match_39287 = shadow.cljs.devtools.client.browser.match_paths(node_39286.getAttribute("href"),path);
if(cljs.core.truth_(path_match_39287)){
var new_link_39288 = (function (){var G__39057 = node_39286.cloneNode(true);
G__39057.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_39287),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__39057;
})();
(node_39286.shadow$old = true);

(new_link_39288.onload = ((function (seq__38998_39282,chunk__39002_39283,count__39003_39284,i__39004_39285,seq__38841,chunk__38843,count__38844,i__38845,new_link_39288,path_match_39287,node_39286,path,map__38840,map__38840__$1,msg,updates,reload_info){
return (function (e){
var seq__39059_39289 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__39061_39290 = null;
var count__39062_39291 = (0);
var i__39063_39292 = (0);
while(true){
if((i__39063_39292 < count__39062_39291)){
var map__39067_39293 = chunk__39061_39290.cljs$core$IIndexed$_nth$arity$2(null,i__39063_39292);
var map__39067_39294__$1 = cljs.core.__destructure_map(map__39067_39293);
var task_39295 = map__39067_39294__$1;
var fn_str_39296 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39067_39294__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39297 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39067_39294__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39298 = goog.getObjectByName(fn_str_39296,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39297)].join(''));

(fn_obj_39298.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39298.cljs$core$IFn$_invoke$arity$2(path,new_link_39288) : fn_obj_39298.call(null,path,new_link_39288));


var G__39299 = seq__39059_39289;
var G__39300 = chunk__39061_39290;
var G__39301 = count__39062_39291;
var G__39302 = (i__39063_39292 + (1));
seq__39059_39289 = G__39299;
chunk__39061_39290 = G__39300;
count__39062_39291 = G__39301;
i__39063_39292 = G__39302;
continue;
} else {
var temp__5823__auto___39303 = cljs.core.seq(seq__39059_39289);
if(temp__5823__auto___39303){
var seq__39059_39304__$1 = temp__5823__auto___39303;
if(cljs.core.chunked_seq_QMARK_(seq__39059_39304__$1)){
var c__5548__auto___39305 = cljs.core.chunk_first(seq__39059_39304__$1);
var G__39306 = cljs.core.chunk_rest(seq__39059_39304__$1);
var G__39307 = c__5548__auto___39305;
var G__39308 = cljs.core.count(c__5548__auto___39305);
var G__39309 = (0);
seq__39059_39289 = G__39306;
chunk__39061_39290 = G__39307;
count__39062_39291 = G__39308;
i__39063_39292 = G__39309;
continue;
} else {
var map__39069_39310 = cljs.core.first(seq__39059_39304__$1);
var map__39069_39311__$1 = cljs.core.__destructure_map(map__39069_39310);
var task_39312 = map__39069_39311__$1;
var fn_str_39313 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39069_39311__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39314 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39069_39311__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39315 = goog.getObjectByName(fn_str_39313,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39314)].join(''));

(fn_obj_39315.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39315.cljs$core$IFn$_invoke$arity$2(path,new_link_39288) : fn_obj_39315.call(null,path,new_link_39288));


var G__39316 = cljs.core.next(seq__39059_39304__$1);
var G__39317 = null;
var G__39318 = (0);
var G__39319 = (0);
seq__39059_39289 = G__39316;
chunk__39061_39290 = G__39317;
count__39062_39291 = G__39318;
i__39063_39292 = G__39319;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_39286);
});})(seq__38998_39282,chunk__39002_39283,count__39003_39284,i__39004_39285,seq__38841,chunk__38843,count__38844,i__38845,new_link_39288,path_match_39287,node_39286,path,map__38840,map__38840__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_39287], 0));

goog.dom.insertSiblingAfter(new_link_39288,node_39286);


var G__39320 = seq__38998_39282;
var G__39321 = chunk__39002_39283;
var G__39322 = count__39003_39284;
var G__39323 = (i__39004_39285 + (1));
seq__38998_39282 = G__39320;
chunk__39002_39283 = G__39321;
count__39003_39284 = G__39322;
i__39004_39285 = G__39323;
continue;
} else {
var G__39324 = seq__38998_39282;
var G__39325 = chunk__39002_39283;
var G__39326 = count__39003_39284;
var G__39327 = (i__39004_39285 + (1));
seq__38998_39282 = G__39324;
chunk__39002_39283 = G__39325;
count__39003_39284 = G__39326;
i__39004_39285 = G__39327;
continue;
}
} else {
var G__39328 = seq__38998_39282;
var G__39329 = chunk__39002_39283;
var G__39330 = count__39003_39284;
var G__39331 = (i__39004_39285 + (1));
seq__38998_39282 = G__39328;
chunk__39002_39283 = G__39329;
count__39003_39284 = G__39330;
i__39004_39285 = G__39331;
continue;
}
} else {
var temp__5823__auto___39332 = cljs.core.seq(seq__38998_39282);
if(temp__5823__auto___39332){
var seq__38998_39333__$1 = temp__5823__auto___39332;
if(cljs.core.chunked_seq_QMARK_(seq__38998_39333__$1)){
var c__5548__auto___39334 = cljs.core.chunk_first(seq__38998_39333__$1);
var G__39335 = cljs.core.chunk_rest(seq__38998_39333__$1);
var G__39336 = c__5548__auto___39334;
var G__39337 = cljs.core.count(c__5548__auto___39334);
var G__39338 = (0);
seq__38998_39282 = G__39335;
chunk__39002_39283 = G__39336;
count__39003_39284 = G__39337;
i__39004_39285 = G__39338;
continue;
} else {
var node_39339 = cljs.core.first(seq__38998_39333__$1);
if(cljs.core.not(node_39339.shadow$old)){
var path_match_39340 = shadow.cljs.devtools.client.browser.match_paths(node_39339.getAttribute("href"),path);
if(cljs.core.truth_(path_match_39340)){
var new_link_39341 = (function (){var G__39087 = node_39339.cloneNode(true);
G__39087.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_39340),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__39087;
})();
(node_39339.shadow$old = true);

(new_link_39341.onload = ((function (seq__38998_39282,chunk__39002_39283,count__39003_39284,i__39004_39285,seq__38841,chunk__38843,count__38844,i__38845,new_link_39341,path_match_39340,node_39339,seq__38998_39333__$1,temp__5823__auto___39332,path,map__38840,map__38840__$1,msg,updates,reload_info){
return (function (e){
var seq__39094_39342 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__39096_39343 = null;
var count__39097_39344 = (0);
var i__39098_39345 = (0);
while(true){
if((i__39098_39345 < count__39097_39344)){
var map__39102_39346 = chunk__39096_39343.cljs$core$IIndexed$_nth$arity$2(null,i__39098_39345);
var map__39102_39347__$1 = cljs.core.__destructure_map(map__39102_39346);
var task_39348 = map__39102_39347__$1;
var fn_str_39349 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39102_39347__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39350 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39102_39347__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39351 = goog.getObjectByName(fn_str_39349,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39350)].join(''));

(fn_obj_39351.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39351.cljs$core$IFn$_invoke$arity$2(path,new_link_39341) : fn_obj_39351.call(null,path,new_link_39341));


var G__39354 = seq__39094_39342;
var G__39355 = chunk__39096_39343;
var G__39356 = count__39097_39344;
var G__39357 = (i__39098_39345 + (1));
seq__39094_39342 = G__39354;
chunk__39096_39343 = G__39355;
count__39097_39344 = G__39356;
i__39098_39345 = G__39357;
continue;
} else {
var temp__5823__auto___39358__$1 = cljs.core.seq(seq__39094_39342);
if(temp__5823__auto___39358__$1){
var seq__39094_39359__$1 = temp__5823__auto___39358__$1;
if(cljs.core.chunked_seq_QMARK_(seq__39094_39359__$1)){
var c__5548__auto___39360 = cljs.core.chunk_first(seq__39094_39359__$1);
var G__39361 = cljs.core.chunk_rest(seq__39094_39359__$1);
var G__39362 = c__5548__auto___39360;
var G__39363 = cljs.core.count(c__5548__auto___39360);
var G__39364 = (0);
seq__39094_39342 = G__39361;
chunk__39096_39343 = G__39362;
count__39097_39344 = G__39363;
i__39098_39345 = G__39364;
continue;
} else {
var map__39105_39365 = cljs.core.first(seq__39094_39359__$1);
var map__39105_39366__$1 = cljs.core.__destructure_map(map__39105_39365);
var task_39367 = map__39105_39366__$1;
var fn_str_39368 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39105_39366__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39369 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39105_39366__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39370 = goog.getObjectByName(fn_str_39368,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39369)].join(''));

(fn_obj_39370.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39370.cljs$core$IFn$_invoke$arity$2(path,new_link_39341) : fn_obj_39370.call(null,path,new_link_39341));


var G__39371 = cljs.core.next(seq__39094_39359__$1);
var G__39372 = null;
var G__39373 = (0);
var G__39374 = (0);
seq__39094_39342 = G__39371;
chunk__39096_39343 = G__39372;
count__39097_39344 = G__39373;
i__39098_39345 = G__39374;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_39339);
});})(seq__38998_39282,chunk__39002_39283,count__39003_39284,i__39004_39285,seq__38841,chunk__38843,count__38844,i__38845,new_link_39341,path_match_39340,node_39339,seq__38998_39333__$1,temp__5823__auto___39332,path,map__38840,map__38840__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_39340], 0));

goog.dom.insertSiblingAfter(new_link_39341,node_39339);


var G__39375 = cljs.core.next(seq__38998_39333__$1);
var G__39376 = null;
var G__39377 = (0);
var G__39378 = (0);
seq__38998_39282 = G__39375;
chunk__39002_39283 = G__39376;
count__39003_39284 = G__39377;
i__39004_39285 = G__39378;
continue;
} else {
var G__39379 = cljs.core.next(seq__38998_39333__$1);
var G__39380 = null;
var G__39381 = (0);
var G__39382 = (0);
seq__38998_39282 = G__39379;
chunk__39002_39283 = G__39380;
count__39003_39284 = G__39381;
i__39004_39285 = G__39382;
continue;
}
} else {
var G__39387 = cljs.core.next(seq__38998_39333__$1);
var G__39388 = null;
var G__39389 = (0);
var G__39390 = (0);
seq__38998_39282 = G__39387;
chunk__39002_39283 = G__39388;
count__39003_39284 = G__39389;
i__39004_39285 = G__39390;
continue;
}
}
} else {
}
}
break;
}


var G__39391 = seq__38841;
var G__39392 = chunk__38843;
var G__39393 = count__38844;
var G__39394 = (i__38845 + (1));
seq__38841 = G__39391;
chunk__38843 = G__39392;
count__38844 = G__39393;
i__38845 = G__39394;
continue;
} else {
var G__39395 = seq__38841;
var G__39396 = chunk__38843;
var G__39397 = count__38844;
var G__39398 = (i__38845 + (1));
seq__38841 = G__39395;
chunk__38843 = G__39396;
count__38844 = G__39397;
i__38845 = G__39398;
continue;
}
} else {
var temp__5823__auto__ = cljs.core.seq(seq__38841);
if(temp__5823__auto__){
var seq__38841__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38841__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__38841__$1);
var G__39399 = cljs.core.chunk_rest(seq__38841__$1);
var G__39400 = c__5548__auto__;
var G__39401 = cljs.core.count(c__5548__auto__);
var G__39402 = (0);
seq__38841 = G__39399;
chunk__38843 = G__39400;
count__38844 = G__39401;
i__38845 = G__39402;
continue;
} else {
var path = cljs.core.first(seq__38841__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__39106_39403 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__39110_39404 = null;
var count__39111_39405 = (0);
var i__39112_39406 = (0);
while(true){
if((i__39112_39406 < count__39111_39405)){
var node_39407 = chunk__39110_39404.cljs$core$IIndexed$_nth$arity$2(null,i__39112_39406);
if(cljs.core.not(node_39407.shadow$old)){
var path_match_39408 = shadow.cljs.devtools.client.browser.match_paths(node_39407.getAttribute("href"),path);
if(cljs.core.truth_(path_match_39408)){
var new_link_39409 = (function (){var G__39144 = node_39407.cloneNode(true);
G__39144.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_39408),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__39144;
})();
(node_39407.shadow$old = true);

(new_link_39409.onload = ((function (seq__39106_39403,chunk__39110_39404,count__39111_39405,i__39112_39406,seq__38841,chunk__38843,count__38844,i__38845,new_link_39409,path_match_39408,node_39407,path,seq__38841__$1,temp__5823__auto__,map__38840,map__38840__$1,msg,updates,reload_info){
return (function (e){
var seq__39145_39410 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__39147_39411 = null;
var count__39148_39412 = (0);
var i__39149_39413 = (0);
while(true){
if((i__39149_39413 < count__39148_39412)){
var map__39153_39418 = chunk__39147_39411.cljs$core$IIndexed$_nth$arity$2(null,i__39149_39413);
var map__39153_39419__$1 = cljs.core.__destructure_map(map__39153_39418);
var task_39420 = map__39153_39419__$1;
var fn_str_39421 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39153_39419__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39422 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39153_39419__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39423 = goog.getObjectByName(fn_str_39421,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39422)].join(''));

(fn_obj_39423.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39423.cljs$core$IFn$_invoke$arity$2(path,new_link_39409) : fn_obj_39423.call(null,path,new_link_39409));


var G__39424 = seq__39145_39410;
var G__39425 = chunk__39147_39411;
var G__39426 = count__39148_39412;
var G__39427 = (i__39149_39413 + (1));
seq__39145_39410 = G__39424;
chunk__39147_39411 = G__39425;
count__39148_39412 = G__39426;
i__39149_39413 = G__39427;
continue;
} else {
var temp__5823__auto___39428__$1 = cljs.core.seq(seq__39145_39410);
if(temp__5823__auto___39428__$1){
var seq__39145_39429__$1 = temp__5823__auto___39428__$1;
if(cljs.core.chunked_seq_QMARK_(seq__39145_39429__$1)){
var c__5548__auto___39430 = cljs.core.chunk_first(seq__39145_39429__$1);
var G__39431 = cljs.core.chunk_rest(seq__39145_39429__$1);
var G__39432 = c__5548__auto___39430;
var G__39433 = cljs.core.count(c__5548__auto___39430);
var G__39434 = (0);
seq__39145_39410 = G__39431;
chunk__39147_39411 = G__39432;
count__39148_39412 = G__39433;
i__39149_39413 = G__39434;
continue;
} else {
var map__39154_39435 = cljs.core.first(seq__39145_39429__$1);
var map__39154_39436__$1 = cljs.core.__destructure_map(map__39154_39435);
var task_39437 = map__39154_39436__$1;
var fn_str_39438 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39154_39436__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39439 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39154_39436__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39440 = goog.getObjectByName(fn_str_39438,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39439)].join(''));

(fn_obj_39440.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39440.cljs$core$IFn$_invoke$arity$2(path,new_link_39409) : fn_obj_39440.call(null,path,new_link_39409));


var G__39441 = cljs.core.next(seq__39145_39429__$1);
var G__39442 = null;
var G__39443 = (0);
var G__39444 = (0);
seq__39145_39410 = G__39441;
chunk__39147_39411 = G__39442;
count__39148_39412 = G__39443;
i__39149_39413 = G__39444;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_39407);
});})(seq__39106_39403,chunk__39110_39404,count__39111_39405,i__39112_39406,seq__38841,chunk__38843,count__38844,i__38845,new_link_39409,path_match_39408,node_39407,path,seq__38841__$1,temp__5823__auto__,map__38840,map__38840__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_39408], 0));

goog.dom.insertSiblingAfter(new_link_39409,node_39407);


var G__39445 = seq__39106_39403;
var G__39446 = chunk__39110_39404;
var G__39447 = count__39111_39405;
var G__39448 = (i__39112_39406 + (1));
seq__39106_39403 = G__39445;
chunk__39110_39404 = G__39446;
count__39111_39405 = G__39447;
i__39112_39406 = G__39448;
continue;
} else {
var G__39449 = seq__39106_39403;
var G__39450 = chunk__39110_39404;
var G__39451 = count__39111_39405;
var G__39452 = (i__39112_39406 + (1));
seq__39106_39403 = G__39449;
chunk__39110_39404 = G__39450;
count__39111_39405 = G__39451;
i__39112_39406 = G__39452;
continue;
}
} else {
var G__39453 = seq__39106_39403;
var G__39454 = chunk__39110_39404;
var G__39455 = count__39111_39405;
var G__39456 = (i__39112_39406 + (1));
seq__39106_39403 = G__39453;
chunk__39110_39404 = G__39454;
count__39111_39405 = G__39455;
i__39112_39406 = G__39456;
continue;
}
} else {
var temp__5823__auto___39457__$1 = cljs.core.seq(seq__39106_39403);
if(temp__5823__auto___39457__$1){
var seq__39106_39458__$1 = temp__5823__auto___39457__$1;
if(cljs.core.chunked_seq_QMARK_(seq__39106_39458__$1)){
var c__5548__auto___39459 = cljs.core.chunk_first(seq__39106_39458__$1);
var G__39460 = cljs.core.chunk_rest(seq__39106_39458__$1);
var G__39461 = c__5548__auto___39459;
var G__39462 = cljs.core.count(c__5548__auto___39459);
var G__39463 = (0);
seq__39106_39403 = G__39460;
chunk__39110_39404 = G__39461;
count__39111_39405 = G__39462;
i__39112_39406 = G__39463;
continue;
} else {
var node_39464 = cljs.core.first(seq__39106_39458__$1);
if(cljs.core.not(node_39464.shadow$old)){
var path_match_39466 = shadow.cljs.devtools.client.browser.match_paths(node_39464.getAttribute("href"),path);
if(cljs.core.truth_(path_match_39466)){
var new_link_39467 = (function (){var G__39159 = node_39464.cloneNode(true);
G__39159.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_39466),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__39159;
})();
(node_39464.shadow$old = true);

(new_link_39467.onload = ((function (seq__39106_39403,chunk__39110_39404,count__39111_39405,i__39112_39406,seq__38841,chunk__38843,count__38844,i__38845,new_link_39467,path_match_39466,node_39464,seq__39106_39458__$1,temp__5823__auto___39457__$1,path,seq__38841__$1,temp__5823__auto__,map__38840,map__38840__$1,msg,updates,reload_info){
return (function (e){
var seq__39160_39468 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__39162_39469 = null;
var count__39163_39470 = (0);
var i__39164_39471 = (0);
while(true){
if((i__39164_39471 < count__39163_39470)){
var map__39170_39472 = chunk__39162_39469.cljs$core$IIndexed$_nth$arity$2(null,i__39164_39471);
var map__39170_39473__$1 = cljs.core.__destructure_map(map__39170_39472);
var task_39474 = map__39170_39473__$1;
var fn_str_39475 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39170_39473__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39476 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39170_39473__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39477 = goog.getObjectByName(fn_str_39475,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39476)].join(''));

(fn_obj_39477.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39477.cljs$core$IFn$_invoke$arity$2(path,new_link_39467) : fn_obj_39477.call(null,path,new_link_39467));


var G__39479 = seq__39160_39468;
var G__39480 = chunk__39162_39469;
var G__39481 = count__39163_39470;
var G__39482 = (i__39164_39471 + (1));
seq__39160_39468 = G__39479;
chunk__39162_39469 = G__39480;
count__39163_39470 = G__39481;
i__39164_39471 = G__39482;
continue;
} else {
var temp__5823__auto___39484__$2 = cljs.core.seq(seq__39160_39468);
if(temp__5823__auto___39484__$2){
var seq__39160_39485__$1 = temp__5823__auto___39484__$2;
if(cljs.core.chunked_seq_QMARK_(seq__39160_39485__$1)){
var c__5548__auto___39486 = cljs.core.chunk_first(seq__39160_39485__$1);
var G__39487 = cljs.core.chunk_rest(seq__39160_39485__$1);
var G__39488 = c__5548__auto___39486;
var G__39489 = cljs.core.count(c__5548__auto___39486);
var G__39490 = (0);
seq__39160_39468 = G__39487;
chunk__39162_39469 = G__39488;
count__39163_39470 = G__39489;
i__39164_39471 = G__39490;
continue;
} else {
var map__39174_39491 = cljs.core.first(seq__39160_39485__$1);
var map__39174_39492__$1 = cljs.core.__destructure_map(map__39174_39491);
var task_39493 = map__39174_39492__$1;
var fn_str_39494 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39174_39492__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39495 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39174_39492__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39496 = goog.getObjectByName(fn_str_39494,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39495)].join(''));

(fn_obj_39496.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39496.cljs$core$IFn$_invoke$arity$2(path,new_link_39467) : fn_obj_39496.call(null,path,new_link_39467));


var G__39497 = cljs.core.next(seq__39160_39485__$1);
var G__39498 = null;
var G__39499 = (0);
var G__39500 = (0);
seq__39160_39468 = G__39497;
chunk__39162_39469 = G__39498;
count__39163_39470 = G__39499;
i__39164_39471 = G__39500;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_39464);
});})(seq__39106_39403,chunk__39110_39404,count__39111_39405,i__39112_39406,seq__38841,chunk__38843,count__38844,i__38845,new_link_39467,path_match_39466,node_39464,seq__39106_39458__$1,temp__5823__auto___39457__$1,path,seq__38841__$1,temp__5823__auto__,map__38840,map__38840__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_39466], 0));

goog.dom.insertSiblingAfter(new_link_39467,node_39464);


var G__39501 = cljs.core.next(seq__39106_39458__$1);
var G__39502 = null;
var G__39503 = (0);
var G__39504 = (0);
seq__39106_39403 = G__39501;
chunk__39110_39404 = G__39502;
count__39111_39405 = G__39503;
i__39112_39406 = G__39504;
continue;
} else {
var G__39505 = cljs.core.next(seq__39106_39458__$1);
var G__39506 = null;
var G__39507 = (0);
var G__39508 = (0);
seq__39106_39403 = G__39505;
chunk__39110_39404 = G__39506;
count__39111_39405 = G__39507;
i__39112_39406 = G__39508;
continue;
}
} else {
var G__39509 = cljs.core.next(seq__39106_39458__$1);
var G__39510 = null;
var G__39511 = (0);
var G__39512 = (0);
seq__39106_39403 = G__39509;
chunk__39110_39404 = G__39510;
count__39111_39405 = G__39511;
i__39112_39406 = G__39512;
continue;
}
}
} else {
}
}
break;
}


var G__39513 = cljs.core.next(seq__38841__$1);
var G__39514 = null;
var G__39515 = (0);
var G__39516 = (0);
seq__38841 = G__39513;
chunk__38843 = G__39514;
count__38844 = G__39515;
i__38845 = G__39516;
continue;
} else {
var G__39517 = cljs.core.next(seq__38841__$1);
var G__39518 = null;
var G__39519 = (0);
var G__39520 = (0);
seq__38841 = G__39517;
chunk__38843 = G__39518;
count__38844 = G__39519;
i__38845 = G__39520;
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
try{var G__39179 = shadow.cljs.devtools.client.browser.global_eval(code);
return (success.cljs$core$IFn$_invoke$arity$1 ? success.cljs$core$IFn$_invoke$arity$1(G__39179) : success.call(null,G__39179));
}catch (e39178){var e = e39178;
return (fail.cljs$core$IFn$_invoke$arity$1 ? fail.cljs$core$IFn$_invoke$arity$1(e) : fail.call(null,e));
}}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$5 = (function (this$,ns,p__39182,success,fail){
var map__39183 = p__39182;
var map__39183__$1 = cljs.core.__destructure_map(map__39183);
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39183__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
try{var G__39185 = shadow.cljs.devtools.client.browser.global_eval(js);
return (success.cljs$core$IFn$_invoke$arity$1 ? success.cljs$core$IFn$_invoke$arity$1(G__39185) : success.call(null,G__39185));
}catch (e39184){var e = e39184;
return (fail.cljs$core$IFn$_invoke$arity$1 ? fail.cljs$core$IFn$_invoke$arity$1(e) : fail.call(null,e));
}}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__39186,done,error){
var map__39187 = p__39186;
var map__39187__$1 = cljs.core.__destructure_map(map__39187);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39187__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__39188,done,error){
var map__39190 = p__39188;
var map__39190__$1 = cljs.core.__destructure_map(map__39190);
var msg = map__39190__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39190__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39190__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39190__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__39192){
var map__39193 = p__39192;
var map__39193__$1 = cljs.core.__destructure_map(map__39193);
var src = map__39193__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39193__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5023__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5023__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5023__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__39194 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__39194) : done.call(null,G__39194));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__39195){
var map__39196 = p__39195;
var map__39196__$1 = cljs.core.__destructure_map(map__39196);
var msg__$1 = map__39196__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39196__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e39197){var ex = e39197;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__39198){
var map__39199 = p__39198;
var map__39199__$1 = cljs.core.__destructure_map(map__39199);
var env = map__39199__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39199__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
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
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__39202){
var map__39203 = p__39202;
var map__39203__$1 = cljs.core.__destructure_map(map__39203);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39203__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39203__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
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
}),(function (p__39204){
var map__39205 = p__39204;
var map__39205__$1 = cljs.core.__destructure_map(map__39205);
var svc = map__39205__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39205__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
