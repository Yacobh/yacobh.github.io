goog.provide('devtools.format');

/**
 * @interface
 */
devtools.format.IDevtoolsFormat = function(){};

var devtools$format$IDevtoolsFormat$_header$dyn_12712 = (function (value){
var x__5350__auto__ = (((value == null))?null:value);
var m__5351__auto__ = (devtools.format._header[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__5351__auto__.call(null,value));
} else {
var m__5349__auto__ = (devtools.format._header["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__5349__auto__.call(null,value));
} else {
throw cljs.core.missing_protocol("IDevtoolsFormat.-header",value);
}
}
});
devtools.format._header = (function devtools$format$_header(value){
if((((!((value == null)))) && ((!((value.devtools$format$IDevtoolsFormat$_header$arity$1 == null)))))){
return value.devtools$format$IDevtoolsFormat$_header$arity$1(value);
} else {
return devtools$format$IDevtoolsFormat$_header$dyn_12712(value);
}
});

var devtools$format$IDevtoolsFormat$_has_body$dyn_12713 = (function (value){
var x__5350__auto__ = (((value == null))?null:value);
var m__5351__auto__ = (devtools.format._has_body[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__5351__auto__.call(null,value));
} else {
var m__5349__auto__ = (devtools.format._has_body["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__5349__auto__.call(null,value));
} else {
throw cljs.core.missing_protocol("IDevtoolsFormat.-has-body",value);
}
}
});
devtools.format._has_body = (function devtools$format$_has_body(value){
if((((!((value == null)))) && ((!((value.devtools$format$IDevtoolsFormat$_has_body$arity$1 == null)))))){
return value.devtools$format$IDevtoolsFormat$_has_body$arity$1(value);
} else {
return devtools$format$IDevtoolsFormat$_has_body$dyn_12713(value);
}
});

var devtools$format$IDevtoolsFormat$_body$dyn_12714 = (function (value){
var x__5350__auto__ = (((value == null))?null:value);
var m__5351__auto__ = (devtools.format._body[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__5351__auto__.call(null,value));
} else {
var m__5349__auto__ = (devtools.format._body["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__5349__auto__.call(null,value));
} else {
throw cljs.core.missing_protocol("IDevtoolsFormat.-body",value);
}
}
});
devtools.format._body = (function devtools$format$_body(value){
if((((!((value == null)))) && ((!((value.devtools$format$IDevtoolsFormat$_body$arity$1 == null)))))){
return value.devtools$format$IDevtoolsFormat$_body$arity$1(value);
} else {
return devtools$format$IDevtoolsFormat$_body$dyn_12714(value);
}
});

devtools.format.setup_BANG_ = (function devtools$format$setup_BANG_(){
if(cljs.core.truth_(devtools.format._STAR_setup_done_STAR_)){
return null;
} else {
(devtools.format._STAR_setup_done_STAR_ = true);

devtools.format.make_template_fn = (function (){var temp__5802__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5802__auto__)){
var o12552 = temp__5802__auto__;
var temp__5802__auto____$1 = (o12552["formatters"]);
if(cljs.core.truth_(temp__5802__auto____$1)){
var o12556 = temp__5802__auto____$1;
var temp__5802__auto____$2 = (o12556["templating"]);
if(cljs.core.truth_(temp__5802__auto____$2)){
var o12557 = temp__5802__auto____$2;
return (o12557["make_template"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format.make_group_fn = (function (){var temp__5802__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5802__auto__)){
var o12558 = temp__5802__auto__;
var temp__5802__auto____$1 = (o12558["formatters"]);
if(cljs.core.truth_(temp__5802__auto____$1)){
var o12559 = temp__5802__auto____$1;
var temp__5802__auto____$2 = (o12559["templating"]);
if(cljs.core.truth_(temp__5802__auto____$2)){
var o12560 = temp__5802__auto____$2;
return (o12560["make_group"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format.make_reference_fn = (function (){var temp__5802__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5802__auto__)){
var o12578 = temp__5802__auto__;
var temp__5802__auto____$1 = (o12578["formatters"]);
if(cljs.core.truth_(temp__5802__auto____$1)){
var o12579 = temp__5802__auto____$1;
var temp__5802__auto____$2 = (o12579["templating"]);
if(cljs.core.truth_(temp__5802__auto____$2)){
var o12580 = temp__5802__auto____$2;
return (o12580["make_reference"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format.make_surrogate_fn = (function (){var temp__5802__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5802__auto__)){
var o12585 = temp__5802__auto__;
var temp__5802__auto____$1 = (o12585["formatters"]);
if(cljs.core.truth_(temp__5802__auto____$1)){
var o12586 = temp__5802__auto____$1;
var temp__5802__auto____$2 = (o12586["templating"]);
if(cljs.core.truth_(temp__5802__auto____$2)){
var o12587 = temp__5802__auto____$2;
return (o12587["make_surrogate"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format.render_markup_fn = (function (){var temp__5802__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5802__auto__)){
var o12601 = temp__5802__auto__;
var temp__5802__auto____$1 = (o12601["formatters"]);
if(cljs.core.truth_(temp__5802__auto____$1)){
var o12602 = temp__5802__auto____$1;
var temp__5802__auto____$2 = (o12602["templating"]);
if(cljs.core.truth_(temp__5802__auto____$2)){
var o12603 = temp__5802__auto____$2;
return (o12603["render_markup"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format._LT_header_GT__fn = (function (){var temp__5802__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5802__auto__)){
var o12604 = temp__5802__auto__;
var temp__5802__auto____$1 = (o12604["formatters"]);
if(cljs.core.truth_(temp__5802__auto____$1)){
var o12605 = temp__5802__auto____$1;
var temp__5802__auto____$2 = (o12605["markup"]);
if(cljs.core.truth_(temp__5802__auto____$2)){
var o12606 = temp__5802__auto____$2;
return (o12606["_LT_header_GT_"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format._LT_standard_body_GT__fn = (function (){var temp__5802__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5802__auto__)){
var o12607 = temp__5802__auto__;
var temp__5802__auto____$1 = (o12607["formatters"]);
if(cljs.core.truth_(temp__5802__auto____$1)){
var o12608 = temp__5802__auto____$1;
var temp__5802__auto____$2 = (o12608["markup"]);
if(cljs.core.truth_(temp__5802__auto____$2)){
var o12609 = temp__5802__auto____$2;
return (o12609["_LT_standard_body_GT_"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

if(cljs.core.truth_(devtools.format.make_template_fn)){
} else {
throw (new Error("Assert failed: make-template-fn"));
}

if(cljs.core.truth_(devtools.format.make_group_fn)){
} else {
throw (new Error("Assert failed: make-group-fn"));
}

if(cljs.core.truth_(devtools.format.make_reference_fn)){
} else {
throw (new Error("Assert failed: make-reference-fn"));
}

if(cljs.core.truth_(devtools.format.make_surrogate_fn)){
} else {
throw (new Error("Assert failed: make-surrogate-fn"));
}

if(cljs.core.truth_(devtools.format.render_markup_fn)){
} else {
throw (new Error("Assert failed: render-markup-fn"));
}

if(cljs.core.truth_(devtools.format._LT_header_GT__fn)){
} else {
throw (new Error("Assert failed: <header>-fn"));
}

if(cljs.core.truth_(devtools.format._LT_standard_body_GT__fn)){
return null;
} else {
throw (new Error("Assert failed: <standard-body>-fn"));
}
}
});
devtools.format.render_markup = (function devtools$format$render_markup(var_args){
var args__5732__auto__ = [];
var len__5726__auto___12762 = arguments.length;
var i__5727__auto___12763 = (0);
while(true){
if((i__5727__auto___12763 < len__5726__auto___12762)){
args__5732__auto__.push((arguments[i__5727__auto___12763]));

var G__12764 = (i__5727__auto___12763 + (1));
i__5727__auto___12763 = G__12764;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.render_markup_fn,args);
}));

(devtools.format.render_markup.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.render_markup.cljs$lang$applyTo = (function (seq12616){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq12616));
}));

devtools.format.make_template = (function devtools$format$make_template(var_args){
var args__5732__auto__ = [];
var len__5726__auto___12765 = arguments.length;
var i__5727__auto___12766 = (0);
while(true){
if((i__5727__auto___12766 < len__5726__auto___12765)){
args__5732__auto__.push((arguments[i__5727__auto___12766]));

var G__12767 = (i__5727__auto___12766 + (1));
i__5727__auto___12766 = G__12767;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return devtools.format.make_template.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(devtools.format.make_template.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_template_fn,args);
}));

(devtools.format.make_template.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.make_template.cljs$lang$applyTo = (function (seq12620){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq12620));
}));

devtools.format.make_group = (function devtools$format$make_group(var_args){
var args__5732__auto__ = [];
var len__5726__auto___12772 = arguments.length;
var i__5727__auto___12773 = (0);
while(true){
if((i__5727__auto___12773 < len__5726__auto___12772)){
args__5732__auto__.push((arguments[i__5727__auto___12773]));

var G__12774 = (i__5727__auto___12773 + (1));
i__5727__auto___12773 = G__12774;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return devtools.format.make_group.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(devtools.format.make_group.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_group_fn,args);
}));

(devtools.format.make_group.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.make_group.cljs$lang$applyTo = (function (seq12624){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq12624));
}));

devtools.format.make_surrogate = (function devtools$format$make_surrogate(var_args){
var args__5732__auto__ = [];
var len__5726__auto___12784 = arguments.length;
var i__5727__auto___12785 = (0);
while(true){
if((i__5727__auto___12785 < len__5726__auto___12784)){
args__5732__auto__.push((arguments[i__5727__auto___12785]));

var G__12786 = (i__5727__auto___12785 + (1));
i__5727__auto___12785 = G__12786;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return devtools.format.make_surrogate.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(devtools.format.make_surrogate.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_surrogate_fn,args);
}));

(devtools.format.make_surrogate.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.make_surrogate.cljs$lang$applyTo = (function (seq12631){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq12631));
}));

devtools.format.template = (function devtools$format$template(var_args){
var args__5732__auto__ = [];
var len__5726__auto___12792 = arguments.length;
var i__5727__auto___12793 = (0);
while(true){
if((i__5727__auto___12793 < len__5726__auto___12792)){
args__5732__auto__.push((arguments[i__5727__auto___12793]));

var G__12794 = (i__5727__auto___12793 + (1));
i__5727__auto___12793 = G__12794;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return devtools.format.template.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(devtools.format.template.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_template_fn,args);
}));

(devtools.format.template.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.template.cljs$lang$applyTo = (function (seq12640){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq12640));
}));

devtools.format.group = (function devtools$format$group(var_args){
var args__5732__auto__ = [];
var len__5726__auto___12795 = arguments.length;
var i__5727__auto___12796 = (0);
while(true){
if((i__5727__auto___12796 < len__5726__auto___12795)){
args__5732__auto__.push((arguments[i__5727__auto___12796]));

var G__12798 = (i__5727__auto___12796 + (1));
i__5727__auto___12796 = G__12798;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return devtools.format.group.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(devtools.format.group.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_group_fn,args);
}));

(devtools.format.group.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.group.cljs$lang$applyTo = (function (seq12653){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq12653));
}));

devtools.format.surrogate = (function devtools$format$surrogate(var_args){
var args__5732__auto__ = [];
var len__5726__auto___12800 = arguments.length;
var i__5727__auto___12801 = (0);
while(true){
if((i__5727__auto___12801 < len__5726__auto___12800)){
args__5732__auto__.push((arguments[i__5727__auto___12801]));

var G__12802 = (i__5727__auto___12801 + (1));
i__5727__auto___12801 = G__12802;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return devtools.format.surrogate.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(devtools.format.surrogate.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_surrogate_fn,args);
}));

(devtools.format.surrogate.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.surrogate.cljs$lang$applyTo = (function (seq12662){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq12662));
}));

devtools.format.reference = (function devtools$format$reference(var_args){
var args__5732__auto__ = [];
var len__5726__auto___12803 = arguments.length;
var i__5727__auto___12804 = (0);
while(true){
if((i__5727__auto___12804 < len__5726__auto___12803)){
args__5732__auto__.push((arguments[i__5727__auto___12804]));

var G__12805 = (i__5727__auto___12804 + (1));
i__5727__auto___12804 = G__12805;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return devtools.format.reference.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(devtools.format.reference.cljs$core$IFn$_invoke$arity$variadic = (function (object,p__12696){
var vec__12697 = p__12696;
var state_override = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12697,(0),null);
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_reference_fn,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [object,(function (p1__12675_SHARP_){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([p1__12675_SHARP_,state_override], 0));
})], null));
}));

(devtools.format.reference.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(devtools.format.reference.cljs$lang$applyTo = (function (seq12694){
var G__12695 = cljs.core.first(seq12694);
var seq12694__$1 = cljs.core.next(seq12694);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12695,seq12694__$1);
}));

devtools.format.standard_reference = (function devtools$format$standard_reference(target){
devtools.format.setup_BANG_();

var G__12701 = new cljs.core.Keyword(null,"ol","ol",932524051);
var G__12702 = new cljs.core.Keyword(null,"standard-ol-style","standard-ol-style",2143825615);
var G__12703 = (function (){var G__12704 = new cljs.core.Keyword(null,"li","li",723558921);
var G__12705 = new cljs.core.Keyword(null,"standard-li-style","standard-li-style",413442955);
var G__12706 = (devtools.format.make_reference_fn.cljs$core$IFn$_invoke$arity$1 ? devtools.format.make_reference_fn.cljs$core$IFn$_invoke$arity$1(target) : devtools.format.make_reference_fn.call(null,target));
return (devtools.format.make_template_fn.cljs$core$IFn$_invoke$arity$3 ? devtools.format.make_template_fn.cljs$core$IFn$_invoke$arity$3(G__12704,G__12705,G__12706) : devtools.format.make_template_fn.call(null,G__12704,G__12705,G__12706));
})();
return (devtools.format.make_template_fn.cljs$core$IFn$_invoke$arity$3 ? devtools.format.make_template_fn.cljs$core$IFn$_invoke$arity$3(G__12701,G__12702,G__12703) : devtools.format.make_template_fn.call(null,G__12701,G__12702,G__12703));
});
devtools.format.build_header = (function devtools$format$build_header(var_args){
var args__5732__auto__ = [];
var len__5726__auto___12811 = arguments.length;
var i__5727__auto___12812 = (0);
while(true){
if((i__5727__auto___12812 < len__5726__auto___12811)){
args__5732__auto__.push((arguments[i__5727__auto___12812]));

var G__12814 = (i__5727__auto___12812 + (1));
i__5727__auto___12812 = G__12814;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return devtools.format.build_header.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(devtools.format.build_header.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format._LT_header_GT__fn,args)], 0));
}));

(devtools.format.build_header.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.build_header.cljs$lang$applyTo = (function (seq12707){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq12707));
}));

devtools.format.standard_body_template = (function devtools$format$standard_body_template(var_args){
var args__5732__auto__ = [];
var len__5726__auto___12818 = arguments.length;
var i__5727__auto___12819 = (0);
while(true){
if((i__5727__auto___12819 < len__5726__auto___12818)){
args__5732__auto__.push((arguments[i__5727__auto___12819]));

var G__12820 = (i__5727__auto___12819 + (1));
i__5727__auto___12819 = G__12820;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return devtools.format.standard_body_template.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(devtools.format.standard_body_template.cljs$core$IFn$_invoke$arity$variadic = (function (lines,rest){
devtools.format.setup_BANG_();

var args = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (x){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null);
}),lines)], null),rest);
return devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format._LT_standard_body_GT__fn,args)], 0));
}));

(devtools.format.standard_body_template.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(devtools.format.standard_body_template.cljs$lang$applyTo = (function (seq12709){
var G__12710 = cljs.core.first(seq12709);
var seq12709__$1 = cljs.core.next(seq12709);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12710,seq12709__$1);
}));


//# sourceMappingURL=devtools.format.js.map
