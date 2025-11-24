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
var _STAR_always_update_STAR__orig_val__24409 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__24410 = true;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__24410);

try{return module$node_modules$react_dom$index.render((comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null)),container,(function (){
var _STAR_always_update_STAR__orig_val__24413 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__24414 = false;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__24414);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reagent.dom.roots,cljs.core.assoc,container,comp);

reagent.impl.batching.flush_after_render();

if((!((callback == null)))){
return (callback.cljs$core$IFn$_invoke$arity$0 ? callback.cljs$core$IFn$_invoke$arity$0() : callback.call(null));
} else {
return null;
}
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__24413);
}}));
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__24409);
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
var G__24424 = arguments.length;
switch (G__24424) {
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

var vec__24432 = ((cljs.core.map_QMARK_(callback_or_compiler))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compiler","compiler",-267926731).cljs$core$IFn$_invoke$arity$1(callback_or_compiler),new cljs.core.Keyword(null,"callback","callback",-705136228).cljs$core$IFn$_invoke$arity$1(callback_or_compiler)], null):((cljs.core.fn_QMARK_(callback_or_compiler))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent.impl.template._STAR_current_default_compiler_STAR_,callback_or_compiler], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [callback_or_compiler,null], null)
));
var compiler = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24432,(0),null);
var callback = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24432,(1),null);
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

var seq__24443_24482 = cljs.core.seq(cljs.core.deref(reagent.dom.roots));
var chunk__24444_24483 = null;
var count__24445_24484 = (0);
var i__24446_24485 = (0);
while(true){
if((i__24446_24485 < count__24445_24484)){
var vec__24458_24486 = chunk__24444_24483.cljs$core$IIndexed$_nth$arity$2(null,i__24446_24485);
var container_24487 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24458_24486,(0),null);
var comp_24488 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24458_24486,(1),null);
reagent.dom.re_render_component(comp_24488,container_24487);


var G__24489 = seq__24443_24482;
var G__24490 = chunk__24444_24483;
var G__24491 = count__24445_24484;
var G__24492 = (i__24446_24485 + (1));
seq__24443_24482 = G__24489;
chunk__24444_24483 = G__24490;
count__24445_24484 = G__24491;
i__24446_24485 = G__24492;
continue;
} else {
var temp__5804__auto___24495 = cljs.core.seq(seq__24443_24482);
if(temp__5804__auto___24495){
var seq__24443_24497__$1 = temp__5804__auto___24495;
if(cljs.core.chunked_seq_QMARK_(seq__24443_24497__$1)){
var c__5525__auto___24498 = cljs.core.chunk_first(seq__24443_24497__$1);
var G__24499 = cljs.core.chunk_rest(seq__24443_24497__$1);
var G__24500 = c__5525__auto___24498;
var G__24501 = cljs.core.count(c__5525__auto___24498);
var G__24502 = (0);
seq__24443_24482 = G__24499;
chunk__24444_24483 = G__24500;
count__24445_24484 = G__24501;
i__24446_24485 = G__24502;
continue;
} else {
var vec__24466_24503 = cljs.core.first(seq__24443_24497__$1);
var container_24504 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24466_24503,(0),null);
var comp_24505 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24466_24503,(1),null);
reagent.dom.re_render_component(comp_24505,container_24504);


var G__24506 = cljs.core.next(seq__24443_24497__$1);
var G__24507 = null;
var G__24508 = (0);
var G__24509 = (0);
seq__24443_24482 = G__24506;
chunk__24444_24483 = G__24507;
count__24445_24484 = G__24508;
i__24446_24485 = G__24509;
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
