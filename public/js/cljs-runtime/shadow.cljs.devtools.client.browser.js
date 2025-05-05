goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5732__auto__ = [];
var len__5726__auto___22816 = arguments.length;
var i__5727__auto___22817 = (0);
while(true){
if((i__5727__auto___22817 < len__5726__auto___22816)){
args__5732__auto__.push((arguments[i__5727__auto___22817]));

var G__22818 = (i__5727__auto___22817 + (1));
i__5727__auto___22817 = G__22818;
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
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq22368){
var G__22369 = cljs.core.first(seq22368);
var seq22368__$1 = cljs.core.next(seq22368);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__22369,seq22368__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__22370 = cljs.core.seq(sources);
var chunk__22371 = null;
var count__22372 = (0);
var i__22373 = (0);
while(true){
if((i__22373 < count__22372)){
var map__22382 = chunk__22371.cljs$core$IIndexed$_nth$arity$2(null,i__22373);
var map__22382__$1 = cljs.core.__destructure_map(map__22382);
var src = map__22382__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22382__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22382__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22382__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22382__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e22383){var e_22819 = e22383;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_22819);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_22819.message)].join('')));
}

var G__22820 = seq__22370;
var G__22821 = chunk__22371;
var G__22822 = count__22372;
var G__22823 = (i__22373 + (1));
seq__22370 = G__22820;
chunk__22371 = G__22821;
count__22372 = G__22822;
i__22373 = G__22823;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__22370);
if(temp__5804__auto__){
var seq__22370__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__22370__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__22370__$1);
var G__22824 = cljs.core.chunk_rest(seq__22370__$1);
var G__22825 = c__5525__auto__;
var G__22826 = cljs.core.count(c__5525__auto__);
var G__22827 = (0);
seq__22370 = G__22824;
chunk__22371 = G__22825;
count__22372 = G__22826;
i__22373 = G__22827;
continue;
} else {
var map__22384 = cljs.core.first(seq__22370__$1);
var map__22384__$1 = cljs.core.__destructure_map(map__22384);
var src = map__22384__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22384__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22384__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22384__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22384__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e22385){var e_22828 = e22385;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_22828);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_22828.message)].join('')));
}

var G__22829 = cljs.core.next(seq__22370__$1);
var G__22830 = null;
var G__22831 = (0);
var G__22832 = (0);
seq__22370 = G__22829;
chunk__22371 = G__22830;
count__22372 = G__22831;
i__22373 = G__22832;
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
var seq__22389 = cljs.core.seq(js_requires);
var chunk__22390 = null;
var count__22391 = (0);
var i__22392 = (0);
while(true){
if((i__22392 < count__22391)){
var js_ns = chunk__22390.cljs$core$IIndexed$_nth$arity$2(null,i__22392);
var require_str_22833 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_22833);


var G__22834 = seq__22389;
var G__22835 = chunk__22390;
var G__22836 = count__22391;
var G__22837 = (i__22392 + (1));
seq__22389 = G__22834;
chunk__22390 = G__22835;
count__22391 = G__22836;
i__22392 = G__22837;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__22389);
if(temp__5804__auto__){
var seq__22389__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__22389__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__22389__$1);
var G__22838 = cljs.core.chunk_rest(seq__22389__$1);
var G__22839 = c__5525__auto__;
var G__22840 = cljs.core.count(c__5525__auto__);
var G__22841 = (0);
seq__22389 = G__22838;
chunk__22390 = G__22839;
count__22391 = G__22840;
i__22392 = G__22841;
continue;
} else {
var js_ns = cljs.core.first(seq__22389__$1);
var require_str_22842 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_22842);


var G__22843 = cljs.core.next(seq__22389__$1);
var G__22844 = null;
var G__22845 = (0);
var G__22846 = (0);
seq__22389 = G__22843;
chunk__22390 = G__22844;
count__22391 = G__22845;
i__22392 = G__22846;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__22397){
var map__22398 = p__22397;
var map__22398__$1 = cljs.core.__destructure_map(map__22398);
var msg = map__22398__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22398__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22398__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5480__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22399(s__22400){
return (new cljs.core.LazySeq(null,(function (){
var s__22400__$1 = s__22400;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__22400__$1);
if(temp__5804__auto__){
var xs__6360__auto__ = temp__5804__auto__;
var map__22405 = cljs.core.first(xs__6360__auto__);
var map__22405__$1 = cljs.core.__destructure_map(map__22405);
var src = map__22405__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22405__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22405__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5476__auto__ = ((function (s__22400__$1,map__22405,map__22405__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__22398,map__22398__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22399_$_iter__22401(s__22402){
return (new cljs.core.LazySeq(null,((function (s__22400__$1,map__22405,map__22405__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__22398,map__22398__$1,msg,info,reload_info){
return (function (){
var s__22402__$1 = s__22402;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__22402__$1);
if(temp__5804__auto____$1){
var s__22402__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__22402__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22402__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22404 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22403 = (0);
while(true){
if((i__22403 < size__5479__auto__)){
var warning = cljs.core._nth(c__5478__auto__,i__22403);
cljs.core.chunk_append(b__22404,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__22847 = (i__22403 + (1));
i__22403 = G__22847;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22404),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22399_$_iter__22401(cljs.core.chunk_rest(s__22402__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22404),null);
}
} else {
var warning = cljs.core.first(s__22402__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22399_$_iter__22401(cljs.core.rest(s__22402__$2)));
}
} else {
return null;
}
break;
}
});})(s__22400__$1,map__22405,map__22405__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__22398,map__22398__$1,msg,info,reload_info))
,null,null));
});})(s__22400__$1,map__22405,map__22405__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__22398,map__22398__$1,msg,info,reload_info))
;
var fs__5477__auto__ = cljs.core.seq(iterys__5476__auto__(warnings));
if(fs__5477__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5477__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__22399(cljs.core.rest(s__22400__$1)));
} else {
var G__22848 = cljs.core.rest(s__22400__$1);
s__22400__$1 = G__22848;
continue;
}
} else {
var G__22849 = cljs.core.rest(s__22400__$1);
s__22400__$1 = G__22849;
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
var seq__22406_22850 = cljs.core.seq(warnings);
var chunk__22407_22851 = null;
var count__22408_22852 = (0);
var i__22409_22853 = (0);
while(true){
if((i__22409_22853 < count__22408_22852)){
var map__22412_22854 = chunk__22407_22851.cljs$core$IIndexed$_nth$arity$2(null,i__22409_22853);
var map__22412_22855__$1 = cljs.core.__destructure_map(map__22412_22854);
var w_22856 = map__22412_22855__$1;
var msg_22857__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22412_22855__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_22858 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22412_22855__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_22859 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22412_22855__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_22860 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22412_22855__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_22860)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_22858),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_22859),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_22857__$1)].join(''));


var G__22861 = seq__22406_22850;
var G__22862 = chunk__22407_22851;
var G__22863 = count__22408_22852;
var G__22864 = (i__22409_22853 + (1));
seq__22406_22850 = G__22861;
chunk__22407_22851 = G__22862;
count__22408_22852 = G__22863;
i__22409_22853 = G__22864;
continue;
} else {
var temp__5804__auto___22865 = cljs.core.seq(seq__22406_22850);
if(temp__5804__auto___22865){
var seq__22406_22866__$1 = temp__5804__auto___22865;
if(cljs.core.chunked_seq_QMARK_(seq__22406_22866__$1)){
var c__5525__auto___22867 = cljs.core.chunk_first(seq__22406_22866__$1);
var G__22868 = cljs.core.chunk_rest(seq__22406_22866__$1);
var G__22869 = c__5525__auto___22867;
var G__22870 = cljs.core.count(c__5525__auto___22867);
var G__22871 = (0);
seq__22406_22850 = G__22868;
chunk__22407_22851 = G__22869;
count__22408_22852 = G__22870;
i__22409_22853 = G__22871;
continue;
} else {
var map__22413_22872 = cljs.core.first(seq__22406_22866__$1);
var map__22413_22873__$1 = cljs.core.__destructure_map(map__22413_22872);
var w_22874 = map__22413_22873__$1;
var msg_22875__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22413_22873__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_22876 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22413_22873__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_22877 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22413_22873__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_22878 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22413_22873__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_22878)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_22876),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_22877),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_22875__$1)].join(''));


var G__22879 = cljs.core.next(seq__22406_22866__$1);
var G__22880 = null;
var G__22881 = (0);
var G__22882 = (0);
seq__22406_22850 = G__22879;
chunk__22407_22851 = G__22880;
count__22408_22852 = G__22881;
i__22409_22853 = G__22882;
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

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__22396_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__22396_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
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
return cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__22419 = node_uri;
G__22419.setQuery(null);

G__22419.setPath(new$);

return G__22419;
})());
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__22422){
var map__22423 = p__22422;
var map__22423__$1 = cljs.core.__destructure_map(map__22423);
var msg = map__22423__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22423__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22423__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__22424 = cljs.core.seq(updates);
var chunk__22426 = null;
var count__22427 = (0);
var i__22428 = (0);
while(true){
if((i__22428 < count__22427)){
var path = chunk__22426.cljs$core$IIndexed$_nth$arity$2(null,i__22428);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__22576_22883 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__22580_22884 = null;
var count__22581_22885 = (0);
var i__22582_22886 = (0);
while(true){
if((i__22582_22886 < count__22581_22885)){
var node_22887 = chunk__22580_22884.cljs$core$IIndexed$_nth$arity$2(null,i__22582_22886);
if(cljs.core.not(node_22887.shadow$old)){
var path_match_22888 = shadow.cljs.devtools.client.browser.match_paths(node_22887.getAttribute("href"),path);
if(cljs.core.truth_(path_match_22888)){
var new_link_22889 = (function (){var G__22615 = node_22887.cloneNode(true);
G__22615.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_22888),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__22615;
})();
(node_22887.shadow$old = true);

(new_link_22889.onload = ((function (seq__22576_22883,chunk__22580_22884,count__22581_22885,i__22582_22886,seq__22424,chunk__22426,count__22427,i__22428,new_link_22889,path_match_22888,node_22887,path,map__22423,map__22423__$1,msg,updates,reload_info){
return (function (e){
var seq__22618_22890 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__22620_22891 = null;
var count__22621_22892 = (0);
var i__22622_22893 = (0);
while(true){
if((i__22622_22893 < count__22621_22892)){
var map__22628_22894 = chunk__22620_22891.cljs$core$IIndexed$_nth$arity$2(null,i__22622_22893);
var map__22628_22895__$1 = cljs.core.__destructure_map(map__22628_22894);
var task_22896 = map__22628_22895__$1;
var fn_str_22897 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22628_22895__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_22898 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22628_22895__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_22899 = goog.getObjectByName(fn_str_22897,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_22898)].join(''));

(fn_obj_22899.cljs$core$IFn$_invoke$arity$2 ? fn_obj_22899.cljs$core$IFn$_invoke$arity$2(path,new_link_22889) : fn_obj_22899.call(null,path,new_link_22889));


var G__22900 = seq__22618_22890;
var G__22901 = chunk__22620_22891;
var G__22902 = count__22621_22892;
var G__22903 = (i__22622_22893 + (1));
seq__22618_22890 = G__22900;
chunk__22620_22891 = G__22901;
count__22621_22892 = G__22902;
i__22622_22893 = G__22903;
continue;
} else {
var temp__5804__auto___22904 = cljs.core.seq(seq__22618_22890);
if(temp__5804__auto___22904){
var seq__22618_22905__$1 = temp__5804__auto___22904;
if(cljs.core.chunked_seq_QMARK_(seq__22618_22905__$1)){
var c__5525__auto___22906 = cljs.core.chunk_first(seq__22618_22905__$1);
var G__22907 = cljs.core.chunk_rest(seq__22618_22905__$1);
var G__22908 = c__5525__auto___22906;
var G__22909 = cljs.core.count(c__5525__auto___22906);
var G__22910 = (0);
seq__22618_22890 = G__22907;
chunk__22620_22891 = G__22908;
count__22621_22892 = G__22909;
i__22622_22893 = G__22910;
continue;
} else {
var map__22629_22911 = cljs.core.first(seq__22618_22905__$1);
var map__22629_22912__$1 = cljs.core.__destructure_map(map__22629_22911);
var task_22913 = map__22629_22912__$1;
var fn_str_22914 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22629_22912__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_22915 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22629_22912__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_22916 = goog.getObjectByName(fn_str_22914,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_22915)].join(''));

(fn_obj_22916.cljs$core$IFn$_invoke$arity$2 ? fn_obj_22916.cljs$core$IFn$_invoke$arity$2(path,new_link_22889) : fn_obj_22916.call(null,path,new_link_22889));


var G__22917 = cljs.core.next(seq__22618_22905__$1);
var G__22918 = null;
var G__22919 = (0);
var G__22920 = (0);
seq__22618_22890 = G__22917;
chunk__22620_22891 = G__22918;
count__22621_22892 = G__22919;
i__22622_22893 = G__22920;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_22887);
});})(seq__22576_22883,chunk__22580_22884,count__22581_22885,i__22582_22886,seq__22424,chunk__22426,count__22427,i__22428,new_link_22889,path_match_22888,node_22887,path,map__22423,map__22423__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_22888], 0));

goog.dom.insertSiblingAfter(new_link_22889,node_22887);


var G__22921 = seq__22576_22883;
var G__22922 = chunk__22580_22884;
var G__22923 = count__22581_22885;
var G__22924 = (i__22582_22886 + (1));
seq__22576_22883 = G__22921;
chunk__22580_22884 = G__22922;
count__22581_22885 = G__22923;
i__22582_22886 = G__22924;
continue;
} else {
var G__22925 = seq__22576_22883;
var G__22926 = chunk__22580_22884;
var G__22927 = count__22581_22885;
var G__22928 = (i__22582_22886 + (1));
seq__22576_22883 = G__22925;
chunk__22580_22884 = G__22926;
count__22581_22885 = G__22927;
i__22582_22886 = G__22928;
continue;
}
} else {
var G__22929 = seq__22576_22883;
var G__22930 = chunk__22580_22884;
var G__22931 = count__22581_22885;
var G__22932 = (i__22582_22886 + (1));
seq__22576_22883 = G__22929;
chunk__22580_22884 = G__22930;
count__22581_22885 = G__22931;
i__22582_22886 = G__22932;
continue;
}
} else {
var temp__5804__auto___22935 = cljs.core.seq(seq__22576_22883);
if(temp__5804__auto___22935){
var seq__22576_22936__$1 = temp__5804__auto___22935;
if(cljs.core.chunked_seq_QMARK_(seq__22576_22936__$1)){
var c__5525__auto___22937 = cljs.core.chunk_first(seq__22576_22936__$1);
var G__22938 = cljs.core.chunk_rest(seq__22576_22936__$1);
var G__22939 = c__5525__auto___22937;
var G__22940 = cljs.core.count(c__5525__auto___22937);
var G__22941 = (0);
seq__22576_22883 = G__22938;
chunk__22580_22884 = G__22939;
count__22581_22885 = G__22940;
i__22582_22886 = G__22941;
continue;
} else {
var node_22942 = cljs.core.first(seq__22576_22936__$1);
if(cljs.core.not(node_22942.shadow$old)){
var path_match_22943 = shadow.cljs.devtools.client.browser.match_paths(node_22942.getAttribute("href"),path);
if(cljs.core.truth_(path_match_22943)){
var new_link_22944 = (function (){var G__22632 = node_22942.cloneNode(true);
G__22632.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_22943),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__22632;
})();
(node_22942.shadow$old = true);

(new_link_22944.onload = ((function (seq__22576_22883,chunk__22580_22884,count__22581_22885,i__22582_22886,seq__22424,chunk__22426,count__22427,i__22428,new_link_22944,path_match_22943,node_22942,seq__22576_22936__$1,temp__5804__auto___22935,path,map__22423,map__22423__$1,msg,updates,reload_info){
return (function (e){
var seq__22633_22945 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__22635_22946 = null;
var count__22636_22947 = (0);
var i__22637_22948 = (0);
while(true){
if((i__22637_22948 < count__22636_22947)){
var map__22641_22949 = chunk__22635_22946.cljs$core$IIndexed$_nth$arity$2(null,i__22637_22948);
var map__22641_22950__$1 = cljs.core.__destructure_map(map__22641_22949);
var task_22951 = map__22641_22950__$1;
var fn_str_22952 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22641_22950__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_22953 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22641_22950__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_22954 = goog.getObjectByName(fn_str_22952,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_22953)].join(''));

(fn_obj_22954.cljs$core$IFn$_invoke$arity$2 ? fn_obj_22954.cljs$core$IFn$_invoke$arity$2(path,new_link_22944) : fn_obj_22954.call(null,path,new_link_22944));


var G__22955 = seq__22633_22945;
var G__22956 = chunk__22635_22946;
var G__22957 = count__22636_22947;
var G__22958 = (i__22637_22948 + (1));
seq__22633_22945 = G__22955;
chunk__22635_22946 = G__22956;
count__22636_22947 = G__22957;
i__22637_22948 = G__22958;
continue;
} else {
var temp__5804__auto___22959__$1 = cljs.core.seq(seq__22633_22945);
if(temp__5804__auto___22959__$1){
var seq__22633_22960__$1 = temp__5804__auto___22959__$1;
if(cljs.core.chunked_seq_QMARK_(seq__22633_22960__$1)){
var c__5525__auto___22961 = cljs.core.chunk_first(seq__22633_22960__$1);
var G__22962 = cljs.core.chunk_rest(seq__22633_22960__$1);
var G__22963 = c__5525__auto___22961;
var G__22964 = cljs.core.count(c__5525__auto___22961);
var G__22965 = (0);
seq__22633_22945 = G__22962;
chunk__22635_22946 = G__22963;
count__22636_22947 = G__22964;
i__22637_22948 = G__22965;
continue;
} else {
var map__22642_22966 = cljs.core.first(seq__22633_22960__$1);
var map__22642_22967__$1 = cljs.core.__destructure_map(map__22642_22966);
var task_22968 = map__22642_22967__$1;
var fn_str_22969 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22642_22967__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_22970 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22642_22967__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_22971 = goog.getObjectByName(fn_str_22969,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_22970)].join(''));

(fn_obj_22971.cljs$core$IFn$_invoke$arity$2 ? fn_obj_22971.cljs$core$IFn$_invoke$arity$2(path,new_link_22944) : fn_obj_22971.call(null,path,new_link_22944));


var G__22975 = cljs.core.next(seq__22633_22960__$1);
var G__22976 = null;
var G__22977 = (0);
var G__22978 = (0);
seq__22633_22945 = G__22975;
chunk__22635_22946 = G__22976;
count__22636_22947 = G__22977;
i__22637_22948 = G__22978;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_22942);
});})(seq__22576_22883,chunk__22580_22884,count__22581_22885,i__22582_22886,seq__22424,chunk__22426,count__22427,i__22428,new_link_22944,path_match_22943,node_22942,seq__22576_22936__$1,temp__5804__auto___22935,path,map__22423,map__22423__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_22943], 0));

goog.dom.insertSiblingAfter(new_link_22944,node_22942);


var G__22979 = cljs.core.next(seq__22576_22936__$1);
var G__22980 = null;
var G__22981 = (0);
var G__22982 = (0);
seq__22576_22883 = G__22979;
chunk__22580_22884 = G__22980;
count__22581_22885 = G__22981;
i__22582_22886 = G__22982;
continue;
} else {
var G__22983 = cljs.core.next(seq__22576_22936__$1);
var G__22984 = null;
var G__22985 = (0);
var G__22986 = (0);
seq__22576_22883 = G__22983;
chunk__22580_22884 = G__22984;
count__22581_22885 = G__22985;
i__22582_22886 = G__22986;
continue;
}
} else {
var G__22987 = cljs.core.next(seq__22576_22936__$1);
var G__22988 = null;
var G__22989 = (0);
var G__22990 = (0);
seq__22576_22883 = G__22987;
chunk__22580_22884 = G__22988;
count__22581_22885 = G__22989;
i__22582_22886 = G__22990;
continue;
}
}
} else {
}
}
break;
}


var G__22991 = seq__22424;
var G__22992 = chunk__22426;
var G__22993 = count__22427;
var G__22994 = (i__22428 + (1));
seq__22424 = G__22991;
chunk__22426 = G__22992;
count__22427 = G__22993;
i__22428 = G__22994;
continue;
} else {
var G__22995 = seq__22424;
var G__22996 = chunk__22426;
var G__22997 = count__22427;
var G__22998 = (i__22428 + (1));
seq__22424 = G__22995;
chunk__22426 = G__22996;
count__22427 = G__22997;
i__22428 = G__22998;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__22424);
if(temp__5804__auto__){
var seq__22424__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__22424__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__22424__$1);
var G__22999 = cljs.core.chunk_rest(seq__22424__$1);
var G__23000 = c__5525__auto__;
var G__23001 = cljs.core.count(c__5525__auto__);
var G__23002 = (0);
seq__22424 = G__22999;
chunk__22426 = G__23000;
count__22427 = G__23001;
i__22428 = G__23002;
continue;
} else {
var path = cljs.core.first(seq__22424__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__22643_23003 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__22647_23004 = null;
var count__22648_23005 = (0);
var i__22649_23006 = (0);
while(true){
if((i__22649_23006 < count__22648_23005)){
var node_23007 = chunk__22647_23004.cljs$core$IIndexed$_nth$arity$2(null,i__22649_23006);
if(cljs.core.not(node_23007.shadow$old)){
var path_match_23009 = shadow.cljs.devtools.client.browser.match_paths(node_23007.getAttribute("href"),path);
if(cljs.core.truth_(path_match_23009)){
var new_link_23010 = (function (){var G__22679 = node_23007.cloneNode(true);
G__22679.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_23009),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__22679;
})();
(node_23007.shadow$old = true);

(new_link_23010.onload = ((function (seq__22643_23003,chunk__22647_23004,count__22648_23005,i__22649_23006,seq__22424,chunk__22426,count__22427,i__22428,new_link_23010,path_match_23009,node_23007,path,seq__22424__$1,temp__5804__auto__,map__22423,map__22423__$1,msg,updates,reload_info){
return (function (e){
var seq__22680_23011 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__22682_23012 = null;
var count__22683_23013 = (0);
var i__22684_23014 = (0);
while(true){
if((i__22684_23014 < count__22683_23013)){
var map__22692_23015 = chunk__22682_23012.cljs$core$IIndexed$_nth$arity$2(null,i__22684_23014);
var map__22692_23016__$1 = cljs.core.__destructure_map(map__22692_23015);
var task_23017 = map__22692_23016__$1;
var fn_str_23018 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22692_23016__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_23019 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22692_23016__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23020 = goog.getObjectByName(fn_str_23018,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_23019)].join(''));

(fn_obj_23020.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23020.cljs$core$IFn$_invoke$arity$2(path,new_link_23010) : fn_obj_23020.call(null,path,new_link_23010));


var G__23021 = seq__22680_23011;
var G__23022 = chunk__22682_23012;
var G__23023 = count__22683_23013;
var G__23024 = (i__22684_23014 + (1));
seq__22680_23011 = G__23021;
chunk__22682_23012 = G__23022;
count__22683_23013 = G__23023;
i__22684_23014 = G__23024;
continue;
} else {
var temp__5804__auto___23025__$1 = cljs.core.seq(seq__22680_23011);
if(temp__5804__auto___23025__$1){
var seq__22680_23026__$1 = temp__5804__auto___23025__$1;
if(cljs.core.chunked_seq_QMARK_(seq__22680_23026__$1)){
var c__5525__auto___23027 = cljs.core.chunk_first(seq__22680_23026__$1);
var G__23028 = cljs.core.chunk_rest(seq__22680_23026__$1);
var G__23029 = c__5525__auto___23027;
var G__23030 = cljs.core.count(c__5525__auto___23027);
var G__23031 = (0);
seq__22680_23011 = G__23028;
chunk__22682_23012 = G__23029;
count__22683_23013 = G__23030;
i__22684_23014 = G__23031;
continue;
} else {
var map__22695_23033 = cljs.core.first(seq__22680_23026__$1);
var map__22695_23034__$1 = cljs.core.__destructure_map(map__22695_23033);
var task_23035 = map__22695_23034__$1;
var fn_str_23036 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22695_23034__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_23037 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22695_23034__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23038 = goog.getObjectByName(fn_str_23036,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_23037)].join(''));

(fn_obj_23038.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23038.cljs$core$IFn$_invoke$arity$2(path,new_link_23010) : fn_obj_23038.call(null,path,new_link_23010));


var G__23039 = cljs.core.next(seq__22680_23026__$1);
var G__23040 = null;
var G__23041 = (0);
var G__23042 = (0);
seq__22680_23011 = G__23039;
chunk__22682_23012 = G__23040;
count__22683_23013 = G__23041;
i__22684_23014 = G__23042;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_23007);
});})(seq__22643_23003,chunk__22647_23004,count__22648_23005,i__22649_23006,seq__22424,chunk__22426,count__22427,i__22428,new_link_23010,path_match_23009,node_23007,path,seq__22424__$1,temp__5804__auto__,map__22423,map__22423__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_23009], 0));

goog.dom.insertSiblingAfter(new_link_23010,node_23007);


var G__23043 = seq__22643_23003;
var G__23044 = chunk__22647_23004;
var G__23045 = count__22648_23005;
var G__23046 = (i__22649_23006 + (1));
seq__22643_23003 = G__23043;
chunk__22647_23004 = G__23044;
count__22648_23005 = G__23045;
i__22649_23006 = G__23046;
continue;
} else {
var G__23047 = seq__22643_23003;
var G__23048 = chunk__22647_23004;
var G__23049 = count__22648_23005;
var G__23050 = (i__22649_23006 + (1));
seq__22643_23003 = G__23047;
chunk__22647_23004 = G__23048;
count__22648_23005 = G__23049;
i__22649_23006 = G__23050;
continue;
}
} else {
var G__23051 = seq__22643_23003;
var G__23052 = chunk__22647_23004;
var G__23053 = count__22648_23005;
var G__23054 = (i__22649_23006 + (1));
seq__22643_23003 = G__23051;
chunk__22647_23004 = G__23052;
count__22648_23005 = G__23053;
i__22649_23006 = G__23054;
continue;
}
} else {
var temp__5804__auto___23055__$1 = cljs.core.seq(seq__22643_23003);
if(temp__5804__auto___23055__$1){
var seq__22643_23056__$1 = temp__5804__auto___23055__$1;
if(cljs.core.chunked_seq_QMARK_(seq__22643_23056__$1)){
var c__5525__auto___23057 = cljs.core.chunk_first(seq__22643_23056__$1);
var G__23058 = cljs.core.chunk_rest(seq__22643_23056__$1);
var G__23059 = c__5525__auto___23057;
var G__23060 = cljs.core.count(c__5525__auto___23057);
var G__23061 = (0);
seq__22643_23003 = G__23058;
chunk__22647_23004 = G__23059;
count__22648_23005 = G__23060;
i__22649_23006 = G__23061;
continue;
} else {
var node_23062 = cljs.core.first(seq__22643_23056__$1);
if(cljs.core.not(node_23062.shadow$old)){
var path_match_23063 = shadow.cljs.devtools.client.browser.match_paths(node_23062.getAttribute("href"),path);
if(cljs.core.truth_(path_match_23063)){
var new_link_23064 = (function (){var G__22696 = node_23062.cloneNode(true);
G__22696.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_23063),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__22696;
})();
(node_23062.shadow$old = true);

(new_link_23064.onload = ((function (seq__22643_23003,chunk__22647_23004,count__22648_23005,i__22649_23006,seq__22424,chunk__22426,count__22427,i__22428,new_link_23064,path_match_23063,node_23062,seq__22643_23056__$1,temp__5804__auto___23055__$1,path,seq__22424__$1,temp__5804__auto__,map__22423,map__22423__$1,msg,updates,reload_info){
return (function (e){
var seq__22700_23065 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__22702_23066 = null;
var count__22703_23067 = (0);
var i__22704_23068 = (0);
while(true){
if((i__22704_23068 < count__22703_23067)){
var map__22713_23069 = chunk__22702_23066.cljs$core$IIndexed$_nth$arity$2(null,i__22704_23068);
var map__22713_23070__$1 = cljs.core.__destructure_map(map__22713_23069);
var task_23071 = map__22713_23070__$1;
var fn_str_23072 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22713_23070__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_23073 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22713_23070__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23074 = goog.getObjectByName(fn_str_23072,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_23073)].join(''));

(fn_obj_23074.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23074.cljs$core$IFn$_invoke$arity$2(path,new_link_23064) : fn_obj_23074.call(null,path,new_link_23064));


var G__23075 = seq__22700_23065;
var G__23076 = chunk__22702_23066;
var G__23077 = count__22703_23067;
var G__23078 = (i__22704_23068 + (1));
seq__22700_23065 = G__23075;
chunk__22702_23066 = G__23076;
count__22703_23067 = G__23077;
i__22704_23068 = G__23078;
continue;
} else {
var temp__5804__auto___23079__$2 = cljs.core.seq(seq__22700_23065);
if(temp__5804__auto___23079__$2){
var seq__22700_23080__$1 = temp__5804__auto___23079__$2;
if(cljs.core.chunked_seq_QMARK_(seq__22700_23080__$1)){
var c__5525__auto___23081 = cljs.core.chunk_first(seq__22700_23080__$1);
var G__23082 = cljs.core.chunk_rest(seq__22700_23080__$1);
var G__23083 = c__5525__auto___23081;
var G__23084 = cljs.core.count(c__5525__auto___23081);
var G__23085 = (0);
seq__22700_23065 = G__23082;
chunk__22702_23066 = G__23083;
count__22703_23067 = G__23084;
i__22704_23068 = G__23085;
continue;
} else {
var map__22714_23086 = cljs.core.first(seq__22700_23080__$1);
var map__22714_23087__$1 = cljs.core.__destructure_map(map__22714_23086);
var task_23088 = map__22714_23087__$1;
var fn_str_23089 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22714_23087__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_23090 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22714_23087__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_23091 = goog.getObjectByName(fn_str_23089,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_23090)].join(''));

(fn_obj_23091.cljs$core$IFn$_invoke$arity$2 ? fn_obj_23091.cljs$core$IFn$_invoke$arity$2(path,new_link_23064) : fn_obj_23091.call(null,path,new_link_23064));


var G__23092 = cljs.core.next(seq__22700_23080__$1);
var G__23093 = null;
var G__23094 = (0);
var G__23095 = (0);
seq__22700_23065 = G__23092;
chunk__22702_23066 = G__23093;
count__22703_23067 = G__23094;
i__22704_23068 = G__23095;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_23062);
});})(seq__22643_23003,chunk__22647_23004,count__22648_23005,i__22649_23006,seq__22424,chunk__22426,count__22427,i__22428,new_link_23064,path_match_23063,node_23062,seq__22643_23056__$1,temp__5804__auto___23055__$1,path,seq__22424__$1,temp__5804__auto__,map__22423,map__22423__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_23063], 0));

goog.dom.insertSiblingAfter(new_link_23064,node_23062);


var G__23096 = cljs.core.next(seq__22643_23056__$1);
var G__23097 = null;
var G__23098 = (0);
var G__23099 = (0);
seq__22643_23003 = G__23096;
chunk__22647_23004 = G__23097;
count__22648_23005 = G__23098;
i__22649_23006 = G__23099;
continue;
} else {
var G__23100 = cljs.core.next(seq__22643_23056__$1);
var G__23101 = null;
var G__23102 = (0);
var G__23103 = (0);
seq__22643_23003 = G__23100;
chunk__22647_23004 = G__23101;
count__22648_23005 = G__23102;
i__22649_23006 = G__23103;
continue;
}
} else {
var G__23104 = cljs.core.next(seq__22643_23056__$1);
var G__23105 = null;
var G__23106 = (0);
var G__23107 = (0);
seq__22643_23003 = G__23104;
chunk__22647_23004 = G__23105;
count__22648_23005 = G__23106;
i__22649_23006 = G__23107;
continue;
}
}
} else {
}
}
break;
}


var G__23108 = cljs.core.next(seq__22424__$1);
var G__23109 = null;
var G__23110 = (0);
var G__23111 = (0);
seq__22424 = G__23108;
chunk__22426 = G__23109;
count__22427 = G__23110;
i__22428 = G__23111;
continue;
} else {
var G__23112 = cljs.core.next(seq__22424__$1);
var G__23113 = null;
var G__23114 = (0);
var G__23115 = (0);
seq__22424 = G__23112;
chunk__22426 = G__23113;
count__22427 = G__23114;
i__22428 = G__23115;
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
try{var G__22781 = shadow.cljs.devtools.client.browser.global_eval(code);
return (success.cljs$core$IFn$_invoke$arity$1 ? success.cljs$core$IFn$_invoke$arity$1(G__22781) : success.call(null,G__22781));
}catch (e22780){var e = e22780;
return (fail.cljs$core$IFn$_invoke$arity$1 ? fail.cljs$core$IFn$_invoke$arity$1(e) : fail.call(null,e));
}}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$5 = (function (this$,ns,p__22782,success,fail){
var map__22783 = p__22782;
var map__22783__$1 = cljs.core.__destructure_map(map__22783);
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22783__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
try{var G__22785 = shadow.cljs.devtools.client.browser.global_eval(js);
return (success.cljs$core$IFn$_invoke$arity$1 ? success.cljs$core$IFn$_invoke$arity$1(G__22785) : success.call(null,G__22785));
}catch (e22784){var e = e22784;
return (fail.cljs$core$IFn$_invoke$arity$1 ? fail.cljs$core$IFn$_invoke$arity$1(e) : fail.call(null,e));
}}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__22786,done,error){
var map__22788 = p__22786;
var map__22788__$1 = cljs.core.__destructure_map(map__22788);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22788__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__22793,done,error){
var map__22794 = p__22793;
var map__22794__$1 = cljs.core.__destructure_map(map__22794);
var msg = map__22794__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22794__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22794__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22794__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__22799){
var map__22800 = p__22799;
var map__22800__$1 = cljs.core.__destructure_map(map__22800);
var src = map__22800__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22800__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5000__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5000__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__22804 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__22804) : done.call(null,G__22804));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__22805){
var map__22806 = p__22805;
var map__22806__$1 = cljs.core.__destructure_map(map__22806);
var msg__$1 = map__22806__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22806__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e22807){var ex = e22807;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__22809){
var map__22810 = p__22809;
var map__22810__$1 = cljs.core.__destructure_map(map__22810);
var env = map__22810__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22810__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
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
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__22811){
var map__22812 = p__22811;
var map__22812__$1 = cljs.core.__destructure_map(map__22812);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22812__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22812__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
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
}),(function (p__22813){
var map__22814 = p__22813;
var map__22814__$1 = cljs.core.__destructure_map(map__22814);
var svc = map__22814__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22814__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
