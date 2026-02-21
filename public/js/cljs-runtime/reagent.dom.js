goog.provide('reagent.dom');
var module$node_modules$react_dom$index=shadow.js.require("module$node_modules$react_dom$index", {});
if((typeof reagent !== 'undefined') && (typeof reagent.dom !== 'undefined') && (typeof reagent.dom.roots !== 'undefined')){
} else {
reagent.dom.roots = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
reagent.dom.unmount_comp = (function reagent$dom$unmount_comp(container){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(reagent.dom.roots,cljs.core.dissoc,container);

return module$node_modules$react_dom$index.unmountComponentAtNode(container);
});
reagent.dom.render_comp = (function reagent$dom$render_comp(comp,container,callback){
var _STAR_always_update_STAR__orig_val__39700 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__39701 = true;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__39701);

try{return module$node_modules$react_dom$index.render((comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null)),container,(function (){
var _STAR_always_update_STAR__orig_val__39705 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__39706 = false;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__39706);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reagent.dom.roots,cljs.core.assoc,container,comp);

reagent.impl.batching.flush_after_render();

if((!((callback == null)))){
return (callback.cljs$core$IFn$_invoke$arity$0 ? callback.cljs$core$IFn$_invoke$arity$0() : callback.call(null));
} else {
return null;
}
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__39705);
}}));
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__39700);
}});
reagent.dom.re_render_component = (function reagent$dom$re_render_component(comp,container){
return reagent.dom.render_comp(comp,container,null);
});
/**
 * Render a Reagent component into the DOM. The first argument may be
 *   either a vector (using Reagent's Hiccup syntax), or a React element.
 *   The second argument should be a DOM node.
 * 
 *   Optionally takes a callback that is called when the component is in place.
 * 
 *   Returns the mounted component instance.
 */
reagent.dom.render = (function reagent$dom$render(var_args){
var G__39715 = arguments.length;
switch (G__39715) {
case 2:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(reagent.dom.render.cljs$core$IFn$_invoke$arity$2 = (function (comp,container){
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3(comp,container,reagent.impl.template._STAR_current_default_compiler_STAR_);
}));

(reagent.dom.render.cljs$core$IFn$_invoke$arity$3 = (function (comp,container,callback_or_compiler){
reagent.ratom.flush_BANG_();

var vec__39723 = ((cljs.core.map_QMARK_(callback_or_compiler))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compiler","compiler",-267926731).cljs$core$IFn$_invoke$arity$1(callback_or_compiler),new cljs.core.Keyword(null,"callback","callback",-705136228).cljs$core$IFn$_invoke$arity$1(callback_or_compiler)], null):((cljs.core.fn_QMARK_(callback_or_compiler))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent.impl.template._STAR_current_default_compiler_STAR_,callback_or_compiler], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [callback_or_compiler,null], null)
));
var compiler = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39723,(0),null);
var callback = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39723,(1),null);
var f = (function (){
return reagent.impl.protocols.as_element(compiler,((cljs.core.fn_QMARK_(comp))?(comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null)):comp));
});
return reagent.dom.render_comp(f,container,callback);
}));

(reagent.dom.render.cljs$lang$maxFixedArity = 3);

/**
 * Remove a component from the given DOM node.
 */
reagent.dom.unmount_component_at_node = (function reagent$dom$unmount_component_at_node(container){
return reagent.dom.unmount_comp(container);
});
/**
 * Returns the root DOM node of a mounted component.
 */
reagent.dom.dom_node = (function reagent$dom$dom_node(this$){
return module$node_modules$react_dom$index.findDOMNode(this$);
});
/**
 * Force re-rendering of all mounted Reagent components. This is
 *   probably only useful in a development environment, when you want to
 *   update components in response to some dynamic changes to code.
 * 
 *   Note that force-update-all may not update root components. This
 *   happens if a component 'foo' is mounted with `(render [foo])` (since
 *   functions are passed by value, and not by reference, in
 *   ClojureScript). To get around this you'll have to introduce a layer
 *   of indirection, for example by using `(render [#'foo])` instead.
 */
reagent.dom.force_update_all = (function reagent$dom$force_update_all(){
reagent.ratom.flush_BANG_();

var seq__39736_39760 = cljs.core.seq(cljs.core.deref(reagent.dom.roots));
var chunk__39737_39761 = null;
var count__39738_39762 = (0);
var i__39739_39763 = (0);
while(true){
if((i__39739_39763 < count__39738_39762)){
var vec__39753_39764 = chunk__39737_39761.cljs$core$IIndexed$_nth$arity$2(null,i__39739_39763);
var container_39765 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39753_39764,(0),null);
var comp_39766 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39753_39764,(1),null);
reagent.dom.re_render_component(comp_39766,container_39765);


var G__39767 = seq__39736_39760;
var G__39768 = chunk__39737_39761;
var G__39769 = count__39738_39762;
var G__39770 = (i__39739_39763 + (1));
seq__39736_39760 = G__39767;
chunk__39737_39761 = G__39768;
count__39738_39762 = G__39769;
i__39739_39763 = G__39770;
continue;
} else {
var temp__5823__auto___39771 = cljs.core.seq(seq__39736_39760);
if(temp__5823__auto___39771){
var seq__39736_39772__$1 = temp__5823__auto___39771;
if(cljs.core.chunked_seq_QMARK_(seq__39736_39772__$1)){
var c__5548__auto___39774 = cljs.core.chunk_first(seq__39736_39772__$1);
var G__39775 = cljs.core.chunk_rest(seq__39736_39772__$1);
var G__39776 = c__5548__auto___39774;
var G__39777 = cljs.core.count(c__5548__auto___39774);
var G__39778 = (0);
seq__39736_39760 = G__39775;
chunk__39737_39761 = G__39776;
count__39738_39762 = G__39777;
i__39739_39763 = G__39778;
continue;
} else {
var vec__39756_39780 = cljs.core.first(seq__39736_39772__$1);
var container_39781 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39756_39780,(0),null);
var comp_39782 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39756_39780,(1),null);
reagent.dom.re_render_component(comp_39782,container_39781);


var G__39783 = cljs.core.next(seq__39736_39772__$1);
var G__39784 = null;
var G__39785 = (0);
var G__39786 = (0);
seq__39736_39760 = G__39783;
chunk__39737_39761 = G__39784;
count__39738_39762 = G__39785;
i__39739_39763 = G__39786;
continue;
}
} else {
}
}
break;
}

return reagent.impl.batching.flush_after_render();
});

//# sourceMappingURL=reagent.dom.js.map
