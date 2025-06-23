goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = true;

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_32487 = (function (this$){
var x__5373__auto__ = (((this$ == null))?null:this$);
var m__5374__auto__ = (shadow.dom._to_dom[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5374__auto__.call(null,this$));
} else {
var m__5372__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5372__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_32487(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_32492 = (function (this$){
var x__5373__auto__ = (((this$ == null))?null:this$);
var m__5374__auto__ = (shadow.dom._to_svg[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5374__auto__.call(null,this$));
} else {
var m__5372__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5372__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_32492(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__31493 = coll;
var G__31494 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__31493,G__31494) : shadow.dom.lazy_native_coll_seq.call(null,G__31493,G__31494));
})());
}),null,null));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IDeref}
 * @implements {shadow.dom.IElement}
*/
shadow.dom.NativeColl = (function (coll){
this.coll = coll;
this.cljs$lang$protocol_mask$partition0$ = 8421394;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.dom.NativeColl.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var self__ = this;
var this$__$1 = this;
return (self__.coll[n]);
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var self__ = this;
var this$__$1 = this;
var or__5025__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return not_found;
}
}));

(shadow.dom.NativeColl.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll.length;
}));

(shadow.dom.NativeColl.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.dom.lazy_native_coll_seq(self__.coll,(0));
}));

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null)], null);
}));

(shadow.dom.NativeColl.cljs$lang$type = true);

(shadow.dom.NativeColl.cljs$lang$ctorStr = "shadow.dom/NativeColl");

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"shadow.dom/NativeColl");
}));

/**
 * Positional factory function for shadow.dom/NativeColl.
 */
shadow.dom.__GT_NativeColl = (function shadow$dom$__GT_NativeColl(coll){
return (new shadow.dom.NativeColl(coll));
});

shadow.dom.native_coll = (function shadow$dom$native_coll(coll){
return (new shadow.dom.NativeColl(coll));
});
shadow.dom.dom_node = (function shadow$dom$dom_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$IElement$))))?true:false):false)){
return el.shadow$dom$IElement$_to_dom$arity$1(null);
} else {
if(typeof el === 'string'){
return document.createTextNode(el);
} else {
if(typeof el === 'number'){
return document.createTextNode(cljs.core.str.cljs$core$IFn$_invoke$arity$1(el));
} else {
return el;

}
}
}
}
});
shadow.dom.query_one = (function shadow$dom$query_one(var_args){
var G__31506 = arguments.length;
switch (G__31506) {
case 1:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return document.querySelector(sel);
}));

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return shadow.dom.dom_node(root).querySelector(sel);
}));

(shadow.dom.query_one.cljs$lang$maxFixedArity = 2);

shadow.dom.query = (function shadow$dom$query(var_args){
var G__31509 = arguments.length;
switch (G__31509) {
case 1:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return (new shadow.dom.NativeColl(document.querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(root).querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$lang$maxFixedArity = 2);

shadow.dom.by_id = (function shadow$dom$by_id(var_args){
var G__31511 = arguments.length;
switch (G__31511) {
case 2:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2 = (function (id,el){
return shadow.dom.dom_node(el).getElementById(id);
}));

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1 = (function (id){
return document.getElementById(id);
}));

(shadow.dom.by_id.cljs$lang$maxFixedArity = 2);

shadow.dom.build = shadow.dom.dom_node;
shadow.dom.ev_stop = (function shadow$dom$ev_stop(var_args){
var G__31514 = arguments.length;
switch (G__31514) {
case 1:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1 = (function (e){
if(cljs.core.truth_(e.stopPropagation)){
e.stopPropagation();

e.preventDefault();
} else {
(e.cancelBubble = true);

(e.returnValue = false);
}

return e;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2 = (function (e,el){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4 = (function (e,el,scope,owner){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$lang$maxFixedArity = 4);

/**
 * check wether a parent node (or the document) contains the child
 */
shadow.dom.contains_QMARK_ = (function shadow$dom$contains_QMARK_(var_args){
var G__31531 = arguments.length;
switch (G__31531) {
case 1:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (el){
return goog.dom.contains(document,shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (parent,el){
return goog.dom.contains(shadow.dom.dom_node(parent),shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$lang$maxFixedArity = 2);

shadow.dom.add_class = (function shadow$dom$add_class(el,cls){
return goog.dom.classlist.add(shadow.dom.dom_node(el),cls);
});
shadow.dom.remove_class = (function shadow$dom$remove_class(el,cls){
return goog.dom.classlist.remove(shadow.dom.dom_node(el),cls);
});
shadow.dom.toggle_class = (function shadow$dom$toggle_class(var_args){
var G__31538 = arguments.length;
switch (G__31538) {
case 2:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function (el,cls){
return goog.dom.classlist.toggle(shadow.dom.dom_node(el),cls);
}));

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function (el,cls,v){
if(cljs.core.truth_(v)){
return shadow.dom.add_class(el,cls);
} else {
return shadow.dom.remove_class(el,cls);
}
}));

(shadow.dom.toggle_class.cljs$lang$maxFixedArity = 3);

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__5025__auto__ = (!((typeof document !== 'undefined')));
if(or__5025__auto__){
return or__5025__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
}));
}catch (e31541){if((e31541 instanceof Object)){
var e = e31541;
return console.log("didnt support attachEvent",el,e);
} else {
throw e31541;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__5025__auto__ = (!((typeof document !== 'undefined')));
if(or__5025__auto__){
return or__5025__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__31570 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__31571 = null;
var count__31572 = (0);
var i__31573 = (0);
while(true){
if((i__31573 < count__31572)){
var el = chunk__31571.cljs$core$IIndexed$_nth$arity$2(null,i__31573);
var handler_32579__$1 = ((function (seq__31570,chunk__31571,count__31572,i__31573,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__31570,chunk__31571,count__31572,i__31573,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_32579__$1);


var G__32582 = seq__31570;
var G__32583 = chunk__31571;
var G__32584 = count__31572;
var G__32585 = (i__31573 + (1));
seq__31570 = G__32582;
chunk__31571 = G__32583;
count__31572 = G__32584;
i__31573 = G__32585;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__31570);
if(temp__5823__auto__){
var seq__31570__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__31570__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__31570__$1);
var G__32589 = cljs.core.chunk_rest(seq__31570__$1);
var G__32590 = c__5548__auto__;
var G__32591 = cljs.core.count(c__5548__auto__);
var G__32592 = (0);
seq__31570 = G__32589;
chunk__31571 = G__32590;
count__31572 = G__32591;
i__31573 = G__32592;
continue;
} else {
var el = cljs.core.first(seq__31570__$1);
var handler_32594__$1 = ((function (seq__31570,chunk__31571,count__31572,i__31573,el,seq__31570__$1,temp__5823__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__31570,chunk__31571,count__31572,i__31573,el,seq__31570__$1,temp__5823__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_32594__$1);


var G__32595 = cljs.core.next(seq__31570__$1);
var G__32596 = null;
var G__32597 = (0);
var G__32598 = (0);
seq__31570 = G__32595;
chunk__31571 = G__32596;
count__31572 = G__32597;
i__31573 = G__32598;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.on = (function shadow$dom$on(var_args){
var G__31582 = arguments.length;
switch (G__31582) {
case 3:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.on.cljs$core$IFn$_invoke$arity$3 = (function (el,ev,handler){
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4(el,ev,handler,false);
}));

(shadow.dom.on.cljs$core$IFn$_invoke$arity$4 = (function (el,ev,handler,capture){
if(cljs.core.vector_QMARK_(ev)){
return shadow.dom.on_query(el,cljs.core.first(ev),cljs.core.second(ev),handler);
} else {
var handler__$1 = (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});
return shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(ev),handler__$1);
}
}));

(shadow.dom.on.cljs$lang$maxFixedArity = 4);

shadow.dom.remove_event_handler = (function shadow$dom$remove_event_handler(el,ev,handler){
return shadow.dom.dom_listen_remove(shadow.dom.dom_node(el),cljs.core.name(ev),handler);
});
shadow.dom.add_event_listeners = (function shadow$dom$add_event_listeners(el,events){
var seq__31583 = cljs.core.seq(events);
var chunk__31584 = null;
var count__31585 = (0);
var i__31586 = (0);
while(true){
if((i__31586 < count__31585)){
var vec__31593 = chunk__31584.cljs$core$IIndexed$_nth$arity$2(null,i__31586);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31593,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31593,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__32616 = seq__31583;
var G__32617 = chunk__31584;
var G__32618 = count__31585;
var G__32619 = (i__31586 + (1));
seq__31583 = G__32616;
chunk__31584 = G__32617;
count__31585 = G__32618;
i__31586 = G__32619;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__31583);
if(temp__5823__auto__){
var seq__31583__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__31583__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__31583__$1);
var G__32623 = cljs.core.chunk_rest(seq__31583__$1);
var G__32624 = c__5548__auto__;
var G__32625 = cljs.core.count(c__5548__auto__);
var G__32626 = (0);
seq__31583 = G__32623;
chunk__31584 = G__32624;
count__31585 = G__32625;
i__31586 = G__32626;
continue;
} else {
var vec__31596 = cljs.core.first(seq__31583__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31596,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31596,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__32637 = cljs.core.next(seq__31583__$1);
var G__32638 = null;
var G__32639 = (0);
var G__32640 = (0);
seq__31583 = G__32637;
chunk__31584 = G__32638;
count__31585 = G__32639;
i__31586 = G__32640;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_style = (function shadow$dom$set_style(el,styles){
var dom = shadow.dom.dom_node(el);
var seq__31603 = cljs.core.seq(styles);
var chunk__31604 = null;
var count__31605 = (0);
var i__31606 = (0);
while(true){
if((i__31606 < count__31605)){
var vec__31626 = chunk__31604.cljs$core$IIndexed$_nth$arity$2(null,i__31606);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31626,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31626,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__32641 = seq__31603;
var G__32642 = chunk__31604;
var G__32643 = count__31605;
var G__32644 = (i__31606 + (1));
seq__31603 = G__32641;
chunk__31604 = G__32642;
count__31605 = G__32643;
i__31606 = G__32644;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__31603);
if(temp__5823__auto__){
var seq__31603__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__31603__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__31603__$1);
var G__32646 = cljs.core.chunk_rest(seq__31603__$1);
var G__32647 = c__5548__auto__;
var G__32648 = cljs.core.count(c__5548__auto__);
var G__32649 = (0);
seq__31603 = G__32646;
chunk__31604 = G__32647;
count__31605 = G__32648;
i__31606 = G__32649;
continue;
} else {
var vec__31637 = cljs.core.first(seq__31603__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31637,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31637,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__32653 = cljs.core.next(seq__31603__$1);
var G__32654 = null;
var G__32655 = (0);
var G__32656 = (0);
seq__31603 = G__32653;
chunk__31604 = G__32654;
count__31605 = G__32655;
i__31606 = G__32656;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_attr_STAR_ = (function shadow$dom$set_attr_STAR_(el,key,value){
var G__31640_32659 = key;
var G__31640_32660__$1 = (((G__31640_32659 instanceof cljs.core.Keyword))?G__31640_32659.fqn:null);
switch (G__31640_32660__$1) {
case "id":
(el.id = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "class":
(el.className = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "for":
(el.htmlFor = value);

break;
case "cellpadding":
el.setAttribute("cellPadding",value);

break;
case "cellspacing":
el.setAttribute("cellSpacing",value);

break;
case "colspan":
el.setAttribute("colSpan",value);

break;
case "frameborder":
el.setAttribute("frameBorder",value);

break;
case "height":
el.setAttribute("height",value);

break;
case "maxlength":
el.setAttribute("maxLength",value);

break;
case "role":
el.setAttribute("role",value);

break;
case "rowspan":
el.setAttribute("rowSpan",value);

break;
case "type":
el.setAttribute("type",value);

break;
case "usemap":
el.setAttribute("useMap",value);

break;
case "valign":
el.setAttribute("vAlign",value);

break;
case "width":
el.setAttribute("width",value);

break;
case "on":
shadow.dom.add_event_listeners(el,value);

break;
case "style":
if((value == null)){
} else {
if(typeof value === 'string'){
el.setAttribute("style",value);
} else {
if(cljs.core.map_QMARK_(value)){
shadow.dom.set_style(el,value);
} else {
goog.style.setStyle(el,value);

}
}
}

break;
default:
var ks_32667 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5025__auto__ = goog.string.startsWith(ks_32667,"data-");
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return goog.string.startsWith(ks_32667,"aria-");
}
})())){
el.setAttribute(ks_32667,value);
} else {
(el[ks_32667] = value);
}

}

return el;
});
shadow.dom.set_attrs = (function shadow$dom$set_attrs(el,attrs){
return cljs.core.reduce_kv((function (el__$1,key,value){
shadow.dom.set_attr_STAR_(el__$1,key,value);

return el__$1;
}),shadow.dom.dom_node(el),attrs);
});
shadow.dom.set_attr = (function shadow$dom$set_attr(el,key,value){
return shadow.dom.set_attr_STAR_(shadow.dom.dom_node(el),key,value);
});
shadow.dom.has_class_QMARK_ = (function shadow$dom$has_class_QMARK_(el,cls){
return goog.dom.classlist.contains(shadow.dom.dom_node(el),cls);
});
shadow.dom.merge_class_string = (function shadow$dom$merge_class_string(current,extra_class){
if(cljs.core.seq(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(extra_class)].join('');
} else {
return extra_class;
}
});
shadow.dom.parse_tag = (function shadow$dom$parse_tag(spec){
var spec__$1 = cljs.core.name(spec);
var fdot = spec__$1.indexOf(".");
var fhash = spec__$1.indexOf("#");
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1,null,null], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fdot),null,clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1))),null], null);
} else {
if((fhash > fdot)){
throw ["cant have id after class?",spec__$1].join('');
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1)),fdot),clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);

}
}
}
}
});
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__31663){
var map__31664 = p__31663;
var map__31664__$1 = cljs.core.__destructure_map(map__31664);
var props = map__31664__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31664__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__31665 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31665,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31665,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31665,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__31668 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__31668,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__31668;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__31670 = arguments.length;
switch (G__31670) {
case 1:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.append.cljs$core$IFn$_invoke$arity$1 = (function (node){
if(cljs.core.truth_(node)){
var temp__5823__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5823__auto__)){
var n = temp__5823__auto__;
document.body.appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$core$IFn$_invoke$arity$2 = (function (el,node){
if(cljs.core.truth_(node)){
var temp__5823__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5823__auto__)){
var n = temp__5823__auto__;
shadow.dom.dom_node(el).appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$lang$maxFixedArity = 2);

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__31671){
var vec__31672 = p__31671;
var seq__31673 = cljs.core.seq(vec__31672);
var first__31674 = cljs.core.first(seq__31673);
var seq__31673__$1 = cljs.core.next(seq__31673);
var nn = first__31674;
var first__31674__$1 = cljs.core.first(seq__31673__$1);
var seq__31673__$2 = cljs.core.next(seq__31673__$1);
var np = first__31674__$1;
var nc = seq__31673__$2;
var node = vec__31672;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__31675 = nn;
var G__31676 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__31675,G__31676) : create_fn.call(null,G__31675,G__31676));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__31677 = nn;
var G__31678 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__31677,G__31678) : create_fn.call(null,G__31677,G__31678));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__31681 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31681,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31681,(1),null);
var seq__31684_32700 = cljs.core.seq(node_children);
var chunk__31685_32701 = null;
var count__31686_32702 = (0);
var i__31687_32703 = (0);
while(true){
if((i__31687_32703 < count__31686_32702)){
var child_struct_32704 = chunk__31685_32701.cljs$core$IIndexed$_nth$arity$2(null,i__31687_32703);
var children_32705 = shadow.dom.dom_node(child_struct_32704);
if(cljs.core.seq_QMARK_(children_32705)){
var seq__31720_32707 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_32705));
var chunk__31722_32708 = null;
var count__31723_32709 = (0);
var i__31724_32710 = (0);
while(true){
if((i__31724_32710 < count__31723_32709)){
var child_32711 = chunk__31722_32708.cljs$core$IIndexed$_nth$arity$2(null,i__31724_32710);
if(cljs.core.truth_(child_32711)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_32711);


var G__32713 = seq__31720_32707;
var G__32714 = chunk__31722_32708;
var G__32715 = count__31723_32709;
var G__32716 = (i__31724_32710 + (1));
seq__31720_32707 = G__32713;
chunk__31722_32708 = G__32714;
count__31723_32709 = G__32715;
i__31724_32710 = G__32716;
continue;
} else {
var G__32718 = seq__31720_32707;
var G__32719 = chunk__31722_32708;
var G__32720 = count__31723_32709;
var G__32721 = (i__31724_32710 + (1));
seq__31720_32707 = G__32718;
chunk__31722_32708 = G__32719;
count__31723_32709 = G__32720;
i__31724_32710 = G__32721;
continue;
}
} else {
var temp__5823__auto___32723 = cljs.core.seq(seq__31720_32707);
if(temp__5823__auto___32723){
var seq__31720_32725__$1 = temp__5823__auto___32723;
if(cljs.core.chunked_seq_QMARK_(seq__31720_32725__$1)){
var c__5548__auto___32726 = cljs.core.chunk_first(seq__31720_32725__$1);
var G__32728 = cljs.core.chunk_rest(seq__31720_32725__$1);
var G__32729 = c__5548__auto___32726;
var G__32730 = cljs.core.count(c__5548__auto___32726);
var G__32731 = (0);
seq__31720_32707 = G__32728;
chunk__31722_32708 = G__32729;
count__31723_32709 = G__32730;
i__31724_32710 = G__32731;
continue;
} else {
var child_32733 = cljs.core.first(seq__31720_32725__$1);
if(cljs.core.truth_(child_32733)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_32733);


var G__32735 = cljs.core.next(seq__31720_32725__$1);
var G__32736 = null;
var G__32737 = (0);
var G__32738 = (0);
seq__31720_32707 = G__32735;
chunk__31722_32708 = G__32736;
count__31723_32709 = G__32737;
i__31724_32710 = G__32738;
continue;
} else {
var G__32740 = cljs.core.next(seq__31720_32725__$1);
var G__32741 = null;
var G__32742 = (0);
var G__32743 = (0);
seq__31720_32707 = G__32740;
chunk__31722_32708 = G__32741;
count__31723_32709 = G__32742;
i__31724_32710 = G__32743;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_32705);
}


var G__32744 = seq__31684_32700;
var G__32745 = chunk__31685_32701;
var G__32746 = count__31686_32702;
var G__32747 = (i__31687_32703 + (1));
seq__31684_32700 = G__32744;
chunk__31685_32701 = G__32745;
count__31686_32702 = G__32746;
i__31687_32703 = G__32747;
continue;
} else {
var temp__5823__auto___32748 = cljs.core.seq(seq__31684_32700);
if(temp__5823__auto___32748){
var seq__31684_32749__$1 = temp__5823__auto___32748;
if(cljs.core.chunked_seq_QMARK_(seq__31684_32749__$1)){
var c__5548__auto___32750 = cljs.core.chunk_first(seq__31684_32749__$1);
var G__32751 = cljs.core.chunk_rest(seq__31684_32749__$1);
var G__32752 = c__5548__auto___32750;
var G__32753 = cljs.core.count(c__5548__auto___32750);
var G__32754 = (0);
seq__31684_32700 = G__32751;
chunk__31685_32701 = G__32752;
count__31686_32702 = G__32753;
i__31687_32703 = G__32754;
continue;
} else {
var child_struct_32755 = cljs.core.first(seq__31684_32749__$1);
var children_32756 = shadow.dom.dom_node(child_struct_32755);
if(cljs.core.seq_QMARK_(children_32756)){
var seq__31726_32757 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_32756));
var chunk__31728_32758 = null;
var count__31729_32759 = (0);
var i__31730_32760 = (0);
while(true){
if((i__31730_32760 < count__31729_32759)){
var child_32762 = chunk__31728_32758.cljs$core$IIndexed$_nth$arity$2(null,i__31730_32760);
if(cljs.core.truth_(child_32762)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_32762);


var G__32765 = seq__31726_32757;
var G__32766 = chunk__31728_32758;
var G__32767 = count__31729_32759;
var G__32768 = (i__31730_32760 + (1));
seq__31726_32757 = G__32765;
chunk__31728_32758 = G__32766;
count__31729_32759 = G__32767;
i__31730_32760 = G__32768;
continue;
} else {
var G__32771 = seq__31726_32757;
var G__32772 = chunk__31728_32758;
var G__32773 = count__31729_32759;
var G__32774 = (i__31730_32760 + (1));
seq__31726_32757 = G__32771;
chunk__31728_32758 = G__32772;
count__31729_32759 = G__32773;
i__31730_32760 = G__32774;
continue;
}
} else {
var temp__5823__auto___32775__$1 = cljs.core.seq(seq__31726_32757);
if(temp__5823__auto___32775__$1){
var seq__31726_32780__$1 = temp__5823__auto___32775__$1;
if(cljs.core.chunked_seq_QMARK_(seq__31726_32780__$1)){
var c__5548__auto___32783 = cljs.core.chunk_first(seq__31726_32780__$1);
var G__32784 = cljs.core.chunk_rest(seq__31726_32780__$1);
var G__32785 = c__5548__auto___32783;
var G__32786 = cljs.core.count(c__5548__auto___32783);
var G__32787 = (0);
seq__31726_32757 = G__32784;
chunk__31728_32758 = G__32785;
count__31729_32759 = G__32786;
i__31730_32760 = G__32787;
continue;
} else {
var child_32788 = cljs.core.first(seq__31726_32780__$1);
if(cljs.core.truth_(child_32788)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_32788);


var G__32789 = cljs.core.next(seq__31726_32780__$1);
var G__32790 = null;
var G__32791 = (0);
var G__32792 = (0);
seq__31726_32757 = G__32789;
chunk__31728_32758 = G__32790;
count__31729_32759 = G__32791;
i__31730_32760 = G__32792;
continue;
} else {
var G__32793 = cljs.core.next(seq__31726_32780__$1);
var G__32794 = null;
var G__32795 = (0);
var G__32796 = (0);
seq__31726_32757 = G__32793;
chunk__31728_32758 = G__32794;
count__31729_32759 = G__32795;
i__31730_32760 = G__32796;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_32756);
}


var G__32797 = cljs.core.next(seq__31684_32749__$1);
var G__32798 = null;
var G__32799 = (0);
var G__32800 = (0);
seq__31684_32700 = G__32797;
chunk__31685_32701 = G__32798;
count__31686_32702 = G__32799;
i__31687_32703 = G__32800;
continue;
}
} else {
}
}
break;
}

return node;
});
(cljs.core.Keyword.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1], null));
}));

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_dom,this$__$1);
}));
if(cljs.core.truth_(((typeof HTMLElement) != 'undefined'))){
(HTMLElement.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(HTMLElement.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
if(cljs.core.truth_(((typeof DocumentFragment) != 'undefined'))){
(DocumentFragment.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(DocumentFragment.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
/**
 * clear node children
 */
shadow.dom.reset = (function shadow$dom$reset(node){
return goog.dom.removeChildren(shadow.dom.dom_node(node));
});
shadow.dom.remove = (function shadow$dom$remove(node){
if((((!((node == null))))?(((((node.cljs$lang$protocol_mask$partition0$ & (8388608))) || ((cljs.core.PROTOCOL_SENTINEL === node.cljs$core$ISeqable$))))?true:false):false)){
var seq__31738 = cljs.core.seq(node);
var chunk__31739 = null;
var count__31740 = (0);
var i__31741 = (0);
while(true){
if((i__31741 < count__31740)){
var n = chunk__31739.cljs$core$IIndexed$_nth$arity$2(null,i__31741);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__32806 = seq__31738;
var G__32807 = chunk__31739;
var G__32808 = count__31740;
var G__32809 = (i__31741 + (1));
seq__31738 = G__32806;
chunk__31739 = G__32807;
count__31740 = G__32808;
i__31741 = G__32809;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__31738);
if(temp__5823__auto__){
var seq__31738__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__31738__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__31738__$1);
var G__32810 = cljs.core.chunk_rest(seq__31738__$1);
var G__32811 = c__5548__auto__;
var G__32812 = cljs.core.count(c__5548__auto__);
var G__32813 = (0);
seq__31738 = G__32810;
chunk__31739 = G__32811;
count__31740 = G__32812;
i__31741 = G__32813;
continue;
} else {
var n = cljs.core.first(seq__31738__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__32814 = cljs.core.next(seq__31738__$1);
var G__32815 = null;
var G__32816 = (0);
var G__32817 = (0);
seq__31738 = G__32814;
chunk__31739 = G__32815;
count__31740 = G__32816;
i__31741 = G__32817;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return goog.dom.removeNode(node);
}
});
shadow.dom.replace_node = (function shadow$dom$replace_node(old,new$){
return goog.dom.replaceNode(shadow.dom.dom_node(new$),shadow.dom.dom_node(old));
});
shadow.dom.text = (function shadow$dom$text(var_args){
var G__31743 = arguments.length;
switch (G__31743) {
case 2:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.text.cljs$core$IFn$_invoke$arity$2 = (function (el,new_text){
return (shadow.dom.dom_node(el).innerText = new_text);
}));

(shadow.dom.text.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.dom_node(el).innerText;
}));

(shadow.dom.text.cljs$lang$maxFixedArity = 2);

shadow.dom.check = (function shadow$dom$check(var_args){
var G__31745 = arguments.length;
switch (G__31745) {
case 1:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.check.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2(el,true);
}));

(shadow.dom.check.cljs$core$IFn$_invoke$arity$2 = (function (el,checked){
return (shadow.dom.dom_node(el).checked = checked);
}));

(shadow.dom.check.cljs$lang$maxFixedArity = 2);

shadow.dom.checked_QMARK_ = (function shadow$dom$checked_QMARK_(el){
return shadow.dom.dom_node(el).checked;
});
shadow.dom.form_elements = (function shadow$dom$form_elements(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).elements));
});
shadow.dom.children = (function shadow$dom$children(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).children));
});
shadow.dom.child_nodes = (function shadow$dom$child_nodes(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).childNodes));
});
shadow.dom.attr = (function shadow$dom$attr(var_args){
var G__31753 = arguments.length;
switch (G__31753) {
case 2:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$2 = (function (el,key){
return shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
}));

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$3 = (function (el,key,default$){
var or__5025__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return default$;
}
}));

(shadow.dom.attr.cljs$lang$maxFixedArity = 3);

shadow.dom.del_attr = (function shadow$dom$del_attr(el,key){
return shadow.dom.dom_node(el).removeAttribute(cljs.core.name(key));
});
shadow.dom.data = (function shadow$dom$data(el,key){
return shadow.dom.dom_node(el).getAttribute(["data-",cljs.core.name(key)].join(''));
});
shadow.dom.set_data = (function shadow$dom$set_data(el,key,value){
return shadow.dom.dom_node(el).setAttribute(["data-",cljs.core.name(key)].join(''),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});
shadow.dom.set_html = (function shadow$dom$set_html(node,text){
return (shadow.dom.dom_node(node).innerHTML = text);
});
shadow.dom.get_html = (function shadow$dom$get_html(node){
return shadow.dom.dom_node(node).innerHTML;
});
shadow.dom.fragment = (function shadow$dom$fragment(var_args){
var args__5755__auto__ = [];
var len__5749__auto___32832 = arguments.length;
var i__5750__auto___32833 = (0);
while(true){
if((i__5750__auto___32833 < len__5749__auto___32832)){
args__5755__auto__.push((arguments[i__5750__auto___32833]));

var G__32834 = (i__5750__auto___32833 + (1));
i__5750__auto___32833 = G__32834;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((0) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__5756__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__31760_32841 = cljs.core.seq(nodes);
var chunk__31761_32842 = null;
var count__31762_32843 = (0);
var i__31763_32844 = (0);
while(true){
if((i__31763_32844 < count__31762_32843)){
var node_32845 = chunk__31761_32842.cljs$core$IIndexed$_nth$arity$2(null,i__31763_32844);
fragment.appendChild(shadow.dom._to_dom(node_32845));


var G__32850 = seq__31760_32841;
var G__32851 = chunk__31761_32842;
var G__32852 = count__31762_32843;
var G__32853 = (i__31763_32844 + (1));
seq__31760_32841 = G__32850;
chunk__31761_32842 = G__32851;
count__31762_32843 = G__32852;
i__31763_32844 = G__32853;
continue;
} else {
var temp__5823__auto___32854 = cljs.core.seq(seq__31760_32841);
if(temp__5823__auto___32854){
var seq__31760_32855__$1 = temp__5823__auto___32854;
if(cljs.core.chunked_seq_QMARK_(seq__31760_32855__$1)){
var c__5548__auto___32856 = cljs.core.chunk_first(seq__31760_32855__$1);
var G__32857 = cljs.core.chunk_rest(seq__31760_32855__$1);
var G__32858 = c__5548__auto___32856;
var G__32859 = cljs.core.count(c__5548__auto___32856);
var G__32860 = (0);
seq__31760_32841 = G__32857;
chunk__31761_32842 = G__32858;
count__31762_32843 = G__32859;
i__31763_32844 = G__32860;
continue;
} else {
var node_32861 = cljs.core.first(seq__31760_32855__$1);
fragment.appendChild(shadow.dom._to_dom(node_32861));


var G__32862 = cljs.core.next(seq__31760_32855__$1);
var G__32863 = null;
var G__32864 = (0);
var G__32865 = (0);
seq__31760_32841 = G__32862;
chunk__31761_32842 = G__32863;
count__31762_32843 = G__32864;
i__31763_32844 = G__32865;
continue;
}
} else {
}
}
break;
}

return (new shadow.dom.NativeColl(fragment));
}));

(shadow.dom.fragment.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq31758){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq31758));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__31773_32869 = cljs.core.seq(scripts);
var chunk__31774_32871 = null;
var count__31775_32872 = (0);
var i__31776_32873 = (0);
while(true){
if((i__31776_32873 < count__31775_32872)){
var vec__31784_32875 = chunk__31774_32871.cljs$core$IIndexed$_nth$arity$2(null,i__31776_32873);
var script_tag_32876 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31784_32875,(0),null);
var script_body_32877 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31784_32875,(1),null);
eval(script_body_32877);


var G__32878 = seq__31773_32869;
var G__32879 = chunk__31774_32871;
var G__32880 = count__31775_32872;
var G__32881 = (i__31776_32873 + (1));
seq__31773_32869 = G__32878;
chunk__31774_32871 = G__32879;
count__31775_32872 = G__32880;
i__31776_32873 = G__32881;
continue;
} else {
var temp__5823__auto___32883 = cljs.core.seq(seq__31773_32869);
if(temp__5823__auto___32883){
var seq__31773_32884__$1 = temp__5823__auto___32883;
if(cljs.core.chunked_seq_QMARK_(seq__31773_32884__$1)){
var c__5548__auto___32886 = cljs.core.chunk_first(seq__31773_32884__$1);
var G__32887 = cljs.core.chunk_rest(seq__31773_32884__$1);
var G__32888 = c__5548__auto___32886;
var G__32889 = cljs.core.count(c__5548__auto___32886);
var G__32890 = (0);
seq__31773_32869 = G__32887;
chunk__31774_32871 = G__32888;
count__31775_32872 = G__32889;
i__31776_32873 = G__32890;
continue;
} else {
var vec__31787_32891 = cljs.core.first(seq__31773_32884__$1);
var script_tag_32892 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31787_32891,(0),null);
var script_body_32893 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31787_32891,(1),null);
eval(script_body_32893);


var G__32894 = cljs.core.next(seq__31773_32884__$1);
var G__32895 = null;
var G__32896 = (0);
var G__32897 = (0);
seq__31773_32869 = G__32894;
chunk__31774_32871 = G__32895;
count__31775_32872 = G__32896;
i__31776_32873 = G__32897;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__31792){
var vec__31793 = p__31792;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31793,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31793,(1),null);
return clojure.string.replace(s__$1,script_tag,"");
}),s,scripts);
});
shadow.dom.str__GT_fragment = (function shadow$dom$str__GT_fragment(s){
var el = document.createElement("div");
(el.innerHTML = s);

return (new shadow.dom.NativeColl(goog.dom.childrenToNode_(document,el)));
});
shadow.dom.node_name = (function shadow$dom$node_name(el){
return shadow.dom.dom_node(el).nodeName;
});
shadow.dom.ancestor_by_class = (function shadow$dom$ancestor_by_class(el,cls){
return goog.dom.getAncestorByClass(shadow.dom.dom_node(el),cls);
});
shadow.dom.ancestor_by_tag = (function shadow$dom$ancestor_by_tag(var_args){
var G__31803 = arguments.length;
switch (G__31803) {
case 2:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2 = (function (el,tag){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag));
}));

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3 = (function (el,tag,cls){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag),cljs.core.name(cls));
}));

(shadow.dom.ancestor_by_tag.cljs$lang$maxFixedArity = 3);

shadow.dom.get_value = (function shadow$dom$get_value(dom){
return goog.dom.forms.getValue(shadow.dom.dom_node(dom));
});
shadow.dom.set_value = (function shadow$dom$set_value(dom,value){
return goog.dom.forms.setValue(shadow.dom.dom_node(dom),value);
});
shadow.dom.px = (function shadow$dom$px(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((value | (0))),"px"].join('');
});
shadow.dom.pct = (function shadow$dom$pct(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"%"].join('');
});
shadow.dom.remove_style_STAR_ = (function shadow$dom$remove_style_STAR_(el,style){
return el.style.removeProperty(cljs.core.name(style));
});
shadow.dom.remove_style = (function shadow$dom$remove_style(el,style){
var el__$1 = shadow.dom.dom_node(el);
return shadow.dom.remove_style_STAR_(el__$1,style);
});
shadow.dom.remove_styles = (function shadow$dom$remove_styles(el,style_keys){
var el__$1 = shadow.dom.dom_node(el);
var seq__31811 = cljs.core.seq(style_keys);
var chunk__31812 = null;
var count__31813 = (0);
var i__31814 = (0);
while(true){
if((i__31814 < count__31813)){
var it = chunk__31812.cljs$core$IIndexed$_nth$arity$2(null,i__31814);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__32921 = seq__31811;
var G__32922 = chunk__31812;
var G__32923 = count__31813;
var G__32924 = (i__31814 + (1));
seq__31811 = G__32921;
chunk__31812 = G__32922;
count__31813 = G__32923;
i__31814 = G__32924;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__31811);
if(temp__5823__auto__){
var seq__31811__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__31811__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__31811__$1);
var G__32927 = cljs.core.chunk_rest(seq__31811__$1);
var G__32928 = c__5548__auto__;
var G__32929 = cljs.core.count(c__5548__auto__);
var G__32930 = (0);
seq__31811 = G__32927;
chunk__31812 = G__32928;
count__31813 = G__32929;
i__31814 = G__32930;
continue;
} else {
var it = cljs.core.first(seq__31811__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__32931 = cljs.core.next(seq__31811__$1);
var G__32932 = null;
var G__32933 = (0);
var G__32934 = (0);
seq__31811 = G__32931;
chunk__31812 = G__32932;
count__31813 = G__32933;
i__31814 = G__32934;
continue;
}
} else {
return null;
}
}
break;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Coordinate = (function (x,y,__meta,__extmap,__hash){
this.x = x;
this.y = y;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5323__auto__,k__5324__auto__){
var self__ = this;
var this__5323__auto____$1 = this;
return this__5323__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5324__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5325__auto__,k31816,else__5326__auto__){
var self__ = this;
var this__5325__auto____$1 = this;
var G__31833 = k31816;
var G__31833__$1 = (((G__31833 instanceof cljs.core.Keyword))?G__31833.fqn:null);
switch (G__31833__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k31816,else__5326__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5343__auto__,f__5344__auto__,init__5345__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5346__auto__,p__31845){
var vec__31850 = p__31845;
var k__5347__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31850,(0),null);
var v__5348__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31850,(1),null);
return (f__5344__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5344__auto__.cljs$core$IFn$_invoke$arity$3(ret__5346__auto__,k__5347__auto__,v__5348__auto__) : f__5344__auto__.call(null,ret__5346__auto__,k__5347__auto__,v__5348__auto__));
}),init__5345__auto__,this__5343__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5338__auto__,writer__5339__auto__,opts__5340__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
var pr_pair__5341__auto__ = (function (keyval__5342__auto__){
return cljs.core.pr_sequential_writer(writer__5339__auto__,cljs.core.pr_writer,""," ","",opts__5340__auto__,keyval__5342__auto__);
});
return cljs.core.pr_sequential_writer(writer__5339__auto__,pr_pair__5341__auto__,"#shadow.dom.Coordinate{",", ","}",opts__5340__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__31815){
var self__ = this;
var G__31815__$1 = this;
return (new cljs.core.RecordIter((0),G__31815__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5321__auto__){
var self__ = this;
var this__5321__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5318__auto__){
var self__ = this;
var this__5318__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5327__auto__){
var self__ = this;
var this__5327__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5319__auto__){
var self__ = this;
var this__5319__auto____$1 = this;
var h__5134__auto__ = self__.__hash;
if((!((h__5134__auto__ == null)))){
return h__5134__auto__;
} else {
var h__5134__auto____$1 = (function (coll__5320__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__5320__auto__));
})(this__5319__auto____$1);
(self__.__hash = h__5134__auto____$1);

return h__5134__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this31817,other31818){
var self__ = this;
var this31817__$1 = this;
return (((!((other31818 == null)))) && ((((this31817__$1.constructor === other31818.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this31817__$1.x,other31818.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this31817__$1.y,other31818.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this31817__$1.__extmap,other31818.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5333__auto__,k__5334__auto__){
var self__ = this;
var this__5333__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__5334__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5333__auto____$1),self__.__meta),k__5334__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5334__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5330__auto__,k31816){
var self__ = this;
var this__5330__auto____$1 = this;
var G__31900 = k31816;
var G__31900__$1 = (((G__31900 instanceof cljs.core.Keyword))?G__31900.fqn:null);
switch (G__31900__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k31816);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5331__auto__,k__5332__auto__,G__31815){
var self__ = this;
var this__5331__auto____$1 = this;
var pred__31904 = cljs.core.keyword_identical_QMARK_;
var expr__31905 = k__5332__auto__;
if(cljs.core.truth_((pred__31904.cljs$core$IFn$_invoke$arity$2 ? pred__31904.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__31905) : pred__31904.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__31905)))){
return (new shadow.dom.Coordinate(G__31815,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__31904.cljs$core$IFn$_invoke$arity$2 ? pred__31904.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__31905) : pred__31904.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__31905)))){
return (new shadow.dom.Coordinate(self__.x,G__31815,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5332__auto__,G__31815),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5336__auto__){
var self__ = this;
var this__5336__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5322__auto__,G__31815){
var self__ = this;
var this__5322__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__31815,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5328__auto__,entry__5329__auto__){
var self__ = this;
var this__5328__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5329__auto__)){
return this__5328__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5329__auto__,(0)),cljs.core._nth(entry__5329__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5328__auto____$1,entry__5329__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__5369__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__5369__auto__,writer__5370__auto__){
return cljs.core._write(writer__5370__auto__,"shadow.dom/Coordinate");
}));

/**
 * Positional factory function for shadow.dom/Coordinate.
 */
shadow.dom.__GT_Coordinate = (function shadow$dom$__GT_Coordinate(x,y){
return (new shadow.dom.Coordinate(x,y,null,null,null));
});

/**
 * Factory function for shadow.dom/Coordinate, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__31825){
var extmap__5365__auto__ = (function (){var G__31923 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__31825,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__31825)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__31923);
} else {
return G__31923;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__31825),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__31825),null,cljs.core.not_empty(extmap__5365__auto__),null));
});

shadow.dom.get_position = (function shadow$dom$get_position(el){
var pos = goog.style.getPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_client_position = (function shadow$dom$get_client_position(el){
var pos = goog.style.getClientPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_page_offset = (function shadow$dom$get_page_offset(el){
var pos = goog.style.getPageOffset(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Size = (function (w,h,__meta,__extmap,__hash){
this.w = w;
this.h = h;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5323__auto__,k__5324__auto__){
var self__ = this;
var this__5323__auto____$1 = this;
return this__5323__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5324__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5325__auto__,k31946,else__5326__auto__){
var self__ = this;
var this__5325__auto____$1 = this;
var G__31964 = k31946;
var G__31964__$1 = (((G__31964 instanceof cljs.core.Keyword))?G__31964.fqn:null);
switch (G__31964__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k31946,else__5326__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5343__auto__,f__5344__auto__,init__5345__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5346__auto__,p__31970){
var vec__31971 = p__31970;
var k__5347__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31971,(0),null);
var v__5348__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31971,(1),null);
return (f__5344__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5344__auto__.cljs$core$IFn$_invoke$arity$3(ret__5346__auto__,k__5347__auto__,v__5348__auto__) : f__5344__auto__.call(null,ret__5346__auto__,k__5347__auto__,v__5348__auto__));
}),init__5345__auto__,this__5343__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5338__auto__,writer__5339__auto__,opts__5340__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
var pr_pair__5341__auto__ = (function (keyval__5342__auto__){
return cljs.core.pr_sequential_writer(writer__5339__auto__,cljs.core.pr_writer,""," ","",opts__5340__auto__,keyval__5342__auto__);
});
return cljs.core.pr_sequential_writer(writer__5339__auto__,pr_pair__5341__auto__,"#shadow.dom.Size{",", ","}",opts__5340__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__31945){
var self__ = this;
var G__31945__$1 = this;
return (new cljs.core.RecordIter((0),G__31945__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5321__auto__){
var self__ = this;
var this__5321__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5318__auto__){
var self__ = this;
var this__5318__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5327__auto__){
var self__ = this;
var this__5327__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5319__auto__){
var self__ = this;
var this__5319__auto____$1 = this;
var h__5134__auto__ = self__.__hash;
if((!((h__5134__auto__ == null)))){
return h__5134__auto__;
} else {
var h__5134__auto____$1 = (function (coll__5320__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__5320__auto__));
})(this__5319__auto____$1);
(self__.__hash = h__5134__auto____$1);

return h__5134__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this31947,other31948){
var self__ = this;
var this31947__$1 = this;
return (((!((other31948 == null)))) && ((((this31947__$1.constructor === other31948.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this31947__$1.w,other31948.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this31947__$1.h,other31948.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this31947__$1.__extmap,other31948.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5333__auto__,k__5334__auto__){
var self__ = this;
var this__5333__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__5334__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5333__auto____$1),self__.__meta),k__5334__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5334__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5330__auto__,k31946){
var self__ = this;
var this__5330__auto____$1 = this;
var G__32003 = k31946;
var G__32003__$1 = (((G__32003 instanceof cljs.core.Keyword))?G__32003.fqn:null);
switch (G__32003__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k31946);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5331__auto__,k__5332__auto__,G__31945){
var self__ = this;
var this__5331__auto____$1 = this;
var pred__32008 = cljs.core.keyword_identical_QMARK_;
var expr__32009 = k__5332__auto__;
if(cljs.core.truth_((pred__32008.cljs$core$IFn$_invoke$arity$2 ? pred__32008.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__32009) : pred__32008.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__32009)))){
return (new shadow.dom.Size(G__31945,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__32008.cljs$core$IFn$_invoke$arity$2 ? pred__32008.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__32009) : pred__32008.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__32009)))){
return (new shadow.dom.Size(self__.w,G__31945,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5332__auto__,G__31945),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5336__auto__){
var self__ = this;
var this__5336__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5322__auto__,G__31945){
var self__ = this;
var this__5322__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__31945,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5328__auto__,entry__5329__auto__){
var self__ = this;
var this__5328__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5329__auto__)){
return this__5328__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5329__auto__,(0)),cljs.core._nth(entry__5329__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5328__auto____$1,entry__5329__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__5369__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__5369__auto__,writer__5370__auto__){
return cljs.core._write(writer__5370__auto__,"shadow.dom/Size");
}));

/**
 * Positional factory function for shadow.dom/Size.
 */
shadow.dom.__GT_Size = (function shadow$dom$__GT_Size(w,h){
return (new shadow.dom.Size(w,h,null,null,null));
});

/**
 * Factory function for shadow.dom/Size, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__31954){
var extmap__5365__auto__ = (function (){var G__32063 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__31954,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__31954)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__32063);
} else {
return G__32063;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__31954),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__31954),null,cljs.core.not_empty(extmap__5365__auto__),null));
});

shadow.dom.size__GT_clj = (function shadow$dom$size__GT_clj(size){
return (new shadow.dom.Size(size.width,size.height,null,null,null));
});
shadow.dom.get_size = (function shadow$dom$get_size(el){
return shadow.dom.size__GT_clj(goog.style.getSize(shadow.dom.dom_node(el)));
});
shadow.dom.get_height = (function shadow$dom$get_height(el){
return shadow.dom.get_size(el).h;
});
shadow.dom.get_viewport_size = (function shadow$dom$get_viewport_size(){
return shadow.dom.size__GT_clj(goog.dom.getViewportSize());
});
shadow.dom.first_child = (function shadow$dom$first_child(el){
return (shadow.dom.dom_node(el).children[(0)]);
});
shadow.dom.select_option_values = (function shadow$dom$select_option_values(el){
var native$ = shadow.dom.dom_node(el);
var opts = (native$["options"]);
var a__5613__auto__ = opts;
var l__5614__auto__ = a__5613__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__5614__auto__)){
var G__33018 = (i + (1));
var G__33019 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__33018;
ret = G__33019;
continue;
} else {
return ret;
}
break;
}
});
shadow.dom.build_url = (function shadow$dom$build_url(path,query_params){
if(cljs.core.empty_QMARK_(query_params)){
return path;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__32173){
var vec__32175 = p__32173;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__32175,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__32175,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__32189 = arguments.length;
switch (G__32189) {
case 1:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1 = (function (path){
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2(path,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2 = (function (path,query_params){
return (document["location"]["href"] = shadow.dom.build_url(path,query_params));
}));

(shadow.dom.redirect.cljs$lang$maxFixedArity = 2);

shadow.dom.reload_BANG_ = (function shadow$dom$reload_BANG_(){
return (document.location.href = document.location.href);
});
shadow.dom.tag_name = (function shadow$dom$tag_name(el){
var dom = shadow.dom.dom_node(el);
return dom.tagName;
});
shadow.dom.insert_after = (function shadow$dom$insert_after(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingAfter(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_before = (function shadow$dom$insert_before(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingBefore(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_first = (function shadow$dom$insert_first(ref,new$){
var temp__5821__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5821__auto__)){
var child = temp__5821__auto__;
return shadow.dom.insert_before(child,new$);
} else {
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2(ref,new$);
}
});
shadow.dom.index_of = (function shadow$dom$index_of(el){
var el__$1 = shadow.dom.dom_node(el);
var i = (0);
while(true){
var ps = el__$1.previousSibling;
if((ps == null)){
return i;
} else {
var G__33029 = ps;
var G__33030 = (i + (1));
el__$1 = G__33029;
i = G__33030;
continue;
}
break;
}
});
shadow.dom.get_parent = (function shadow$dom$get_parent(el){
return goog.dom.getParentElement(shadow.dom.dom_node(el));
});
shadow.dom.parents = (function shadow$dom$parents(el){
var parent = shadow.dom.get_parent(el);
if(cljs.core.truth_(parent)){
return cljs.core.cons(parent,(new cljs.core.LazySeq(null,(function (){
return (shadow.dom.parents.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.parents.cljs$core$IFn$_invoke$arity$1(parent) : shadow.dom.parents.call(null,parent));
}),null,null)));
} else {
return null;
}
});
shadow.dom.matches = (function shadow$dom$matches(el,sel){
return shadow.dom.dom_node(el).matches(sel);
});
shadow.dom.get_next_sibling = (function shadow$dom$get_next_sibling(el){
return goog.dom.getNextElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.get_previous_sibling = (function shadow$dom$get_previous_sibling(el){
return goog.dom.getPreviousElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.xmlns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, ["svg","http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink"], null));
shadow.dom.create_svg_node = (function shadow$dom$create_svg_node(tag_def,props){
var vec__32294 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__32294,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__32294,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__32294,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__32301_33040 = cljs.core.seq(props);
var chunk__32302_33041 = null;
var count__32303_33042 = (0);
var i__32304_33043 = (0);
while(true){
if((i__32304_33043 < count__32303_33042)){
var vec__32318_33048 = chunk__32302_33041.cljs$core$IIndexed$_nth$arity$2(null,i__32304_33043);
var k_33049 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__32318_33048,(0),null);
var v_33051 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__32318_33048,(1),null);
el.setAttributeNS((function (){var temp__5823__auto__ = cljs.core.namespace(k_33049);
if(cljs.core.truth_(temp__5823__auto__)){
var ns = temp__5823__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_33049),v_33051);


var G__33054 = seq__32301_33040;
var G__33055 = chunk__32302_33041;
var G__33056 = count__32303_33042;
var G__33057 = (i__32304_33043 + (1));
seq__32301_33040 = G__33054;
chunk__32302_33041 = G__33055;
count__32303_33042 = G__33056;
i__32304_33043 = G__33057;
continue;
} else {
var temp__5823__auto___33058 = cljs.core.seq(seq__32301_33040);
if(temp__5823__auto___33058){
var seq__32301_33059__$1 = temp__5823__auto___33058;
if(cljs.core.chunked_seq_QMARK_(seq__32301_33059__$1)){
var c__5548__auto___33061 = cljs.core.chunk_first(seq__32301_33059__$1);
var G__33063 = cljs.core.chunk_rest(seq__32301_33059__$1);
var G__33064 = c__5548__auto___33061;
var G__33065 = cljs.core.count(c__5548__auto___33061);
var G__33066 = (0);
seq__32301_33040 = G__33063;
chunk__32302_33041 = G__33064;
count__32303_33042 = G__33065;
i__32304_33043 = G__33066;
continue;
} else {
var vec__32327_33069 = cljs.core.first(seq__32301_33059__$1);
var k_33070 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__32327_33069,(0),null);
var v_33071 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__32327_33069,(1),null);
el.setAttributeNS((function (){var temp__5823__auto____$1 = cljs.core.namespace(k_33070);
if(cljs.core.truth_(temp__5823__auto____$1)){
var ns = temp__5823__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_33070),v_33071);


var G__33076 = cljs.core.next(seq__32301_33059__$1);
var G__33077 = null;
var G__33078 = (0);
var G__33079 = (0);
seq__32301_33040 = G__33076;
chunk__32302_33041 = G__33077;
count__32303_33042 = G__33078;
i__32304_33043 = G__33079;
continue;
}
} else {
}
}
break;
}

return el;
});
shadow.dom.svg_node = (function shadow$dom$svg_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$SVGElement$))))?true:false):false)){
return el.shadow$dom$SVGElement$_to_svg$arity$1(null);
} else {
return el;

}
}
});
shadow.dom.make_svg_node = (function shadow$dom$make_svg_node(structure){
var vec__32344 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__32344,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__32344,(1),null);
var seq__32350_33082 = cljs.core.seq(node_children);
var chunk__32352_33083 = null;
var count__32353_33084 = (0);
var i__32354_33085 = (0);
while(true){
if((i__32354_33085 < count__32353_33084)){
var child_struct_33086 = chunk__32352_33083.cljs$core$IIndexed$_nth$arity$2(null,i__32354_33085);
if((!((child_struct_33086 == null)))){
if(typeof child_struct_33086 === 'string'){
var text_33087 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_33087),child_struct_33086].join(''));
} else {
var children_33089 = shadow.dom.svg_node(child_struct_33086);
if(cljs.core.seq_QMARK_(children_33089)){
var seq__32408_33090 = cljs.core.seq(children_33089);
var chunk__32410_33091 = null;
var count__32411_33092 = (0);
var i__32412_33093 = (0);
while(true){
if((i__32412_33093 < count__32411_33092)){
var child_33094 = chunk__32410_33091.cljs$core$IIndexed$_nth$arity$2(null,i__32412_33093);
if(cljs.core.truth_(child_33094)){
node.appendChild(child_33094);


var G__33096 = seq__32408_33090;
var G__33097 = chunk__32410_33091;
var G__33098 = count__32411_33092;
var G__33099 = (i__32412_33093 + (1));
seq__32408_33090 = G__33096;
chunk__32410_33091 = G__33097;
count__32411_33092 = G__33098;
i__32412_33093 = G__33099;
continue;
} else {
var G__33100 = seq__32408_33090;
var G__33101 = chunk__32410_33091;
var G__33102 = count__32411_33092;
var G__33103 = (i__32412_33093 + (1));
seq__32408_33090 = G__33100;
chunk__32410_33091 = G__33101;
count__32411_33092 = G__33102;
i__32412_33093 = G__33103;
continue;
}
} else {
var temp__5823__auto___33104 = cljs.core.seq(seq__32408_33090);
if(temp__5823__auto___33104){
var seq__32408_33105__$1 = temp__5823__auto___33104;
if(cljs.core.chunked_seq_QMARK_(seq__32408_33105__$1)){
var c__5548__auto___33106 = cljs.core.chunk_first(seq__32408_33105__$1);
var G__33107 = cljs.core.chunk_rest(seq__32408_33105__$1);
var G__33108 = c__5548__auto___33106;
var G__33109 = cljs.core.count(c__5548__auto___33106);
var G__33110 = (0);
seq__32408_33090 = G__33107;
chunk__32410_33091 = G__33108;
count__32411_33092 = G__33109;
i__32412_33093 = G__33110;
continue;
} else {
var child_33111 = cljs.core.first(seq__32408_33105__$1);
if(cljs.core.truth_(child_33111)){
node.appendChild(child_33111);


var G__33112 = cljs.core.next(seq__32408_33105__$1);
var G__33113 = null;
var G__33114 = (0);
var G__33115 = (0);
seq__32408_33090 = G__33112;
chunk__32410_33091 = G__33113;
count__32411_33092 = G__33114;
i__32412_33093 = G__33115;
continue;
} else {
var G__33116 = cljs.core.next(seq__32408_33105__$1);
var G__33117 = null;
var G__33118 = (0);
var G__33119 = (0);
seq__32408_33090 = G__33116;
chunk__32410_33091 = G__33117;
count__32411_33092 = G__33118;
i__32412_33093 = G__33119;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_33089);
}
}


var G__33120 = seq__32350_33082;
var G__33121 = chunk__32352_33083;
var G__33122 = count__32353_33084;
var G__33123 = (i__32354_33085 + (1));
seq__32350_33082 = G__33120;
chunk__32352_33083 = G__33121;
count__32353_33084 = G__33122;
i__32354_33085 = G__33123;
continue;
} else {
var G__33124 = seq__32350_33082;
var G__33125 = chunk__32352_33083;
var G__33126 = count__32353_33084;
var G__33127 = (i__32354_33085 + (1));
seq__32350_33082 = G__33124;
chunk__32352_33083 = G__33125;
count__32353_33084 = G__33126;
i__32354_33085 = G__33127;
continue;
}
} else {
var temp__5823__auto___33129 = cljs.core.seq(seq__32350_33082);
if(temp__5823__auto___33129){
var seq__32350_33130__$1 = temp__5823__auto___33129;
if(cljs.core.chunked_seq_QMARK_(seq__32350_33130__$1)){
var c__5548__auto___33131 = cljs.core.chunk_first(seq__32350_33130__$1);
var G__33132 = cljs.core.chunk_rest(seq__32350_33130__$1);
var G__33133 = c__5548__auto___33131;
var G__33134 = cljs.core.count(c__5548__auto___33131);
var G__33135 = (0);
seq__32350_33082 = G__33132;
chunk__32352_33083 = G__33133;
count__32353_33084 = G__33134;
i__32354_33085 = G__33135;
continue;
} else {
var child_struct_33136 = cljs.core.first(seq__32350_33130__$1);
if((!((child_struct_33136 == null)))){
if(typeof child_struct_33136 === 'string'){
var text_33137 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_33137),child_struct_33136].join(''));
} else {
var children_33140 = shadow.dom.svg_node(child_struct_33136);
if(cljs.core.seq_QMARK_(children_33140)){
var seq__32424_33141 = cljs.core.seq(children_33140);
var chunk__32426_33142 = null;
var count__32427_33143 = (0);
var i__32428_33144 = (0);
while(true){
if((i__32428_33144 < count__32427_33143)){
var child_33145 = chunk__32426_33142.cljs$core$IIndexed$_nth$arity$2(null,i__32428_33144);
if(cljs.core.truth_(child_33145)){
node.appendChild(child_33145);


var G__33146 = seq__32424_33141;
var G__33147 = chunk__32426_33142;
var G__33148 = count__32427_33143;
var G__33149 = (i__32428_33144 + (1));
seq__32424_33141 = G__33146;
chunk__32426_33142 = G__33147;
count__32427_33143 = G__33148;
i__32428_33144 = G__33149;
continue;
} else {
var G__33152 = seq__32424_33141;
var G__33153 = chunk__32426_33142;
var G__33154 = count__32427_33143;
var G__33155 = (i__32428_33144 + (1));
seq__32424_33141 = G__33152;
chunk__32426_33142 = G__33153;
count__32427_33143 = G__33154;
i__32428_33144 = G__33155;
continue;
}
} else {
var temp__5823__auto___33157__$1 = cljs.core.seq(seq__32424_33141);
if(temp__5823__auto___33157__$1){
var seq__32424_33159__$1 = temp__5823__auto___33157__$1;
if(cljs.core.chunked_seq_QMARK_(seq__32424_33159__$1)){
var c__5548__auto___33160 = cljs.core.chunk_first(seq__32424_33159__$1);
var G__33162 = cljs.core.chunk_rest(seq__32424_33159__$1);
var G__33163 = c__5548__auto___33160;
var G__33164 = cljs.core.count(c__5548__auto___33160);
var G__33165 = (0);
seq__32424_33141 = G__33162;
chunk__32426_33142 = G__33163;
count__32427_33143 = G__33164;
i__32428_33144 = G__33165;
continue;
} else {
var child_33168 = cljs.core.first(seq__32424_33159__$1);
if(cljs.core.truth_(child_33168)){
node.appendChild(child_33168);


var G__33169 = cljs.core.next(seq__32424_33159__$1);
var G__33170 = null;
var G__33171 = (0);
var G__33172 = (0);
seq__32424_33141 = G__33169;
chunk__32426_33142 = G__33170;
count__32427_33143 = G__33171;
i__32428_33144 = G__33172;
continue;
} else {
var G__33173 = cljs.core.next(seq__32424_33159__$1);
var G__33174 = null;
var G__33175 = (0);
var G__33176 = (0);
seq__32424_33141 = G__33173;
chunk__32426_33142 = G__33174;
count__32427_33143 = G__33175;
i__32428_33144 = G__33176;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_33140);
}
}


var G__33185 = cljs.core.next(seq__32350_33130__$1);
var G__33186 = null;
var G__33187 = (0);
var G__33188 = (0);
seq__32350_33082 = G__33185;
chunk__32352_33083 = G__33186;
count__32353_33084 = G__33187;
i__32354_33085 = G__33188;
continue;
} else {
var G__33191 = cljs.core.next(seq__32350_33130__$1);
var G__33192 = null;
var G__33193 = (0);
var G__33194 = (0);
seq__32350_33082 = G__33191;
chunk__32352_33083 = G__33192;
count__32353_33084 = G__33193;
i__32354_33085 = G__33194;
continue;
}
}
} else {
}
}
break;
}

return node;
});
(shadow.dom.SVGElement["string"] = true);

(shadow.dom._to_svg["string"] = (function (this$){
if((this$ instanceof cljs.core.Keyword)){
return shadow.dom.make_svg_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$], null));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("strings cannot be in svgs",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"this","this",-611633625),this$], null));
}
}));

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_svg_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_svg,this$__$1);
}));

(shadow.dom.SVGElement["null"] = true);

(shadow.dom._to_svg["null"] = (function (_){
return null;
}));
shadow.dom.svg = (function shadow$dom$svg(var_args){
var args__5755__auto__ = [];
var len__5749__auto___33204 = arguments.length;
var i__5750__auto___33208 = (0);
while(true){
if((i__5750__auto___33208 < len__5749__auto___33204)){
args__5755__auto__.push((arguments[i__5750__auto___33208]));

var G__33210 = (i__5750__auto___33208 + (1));
i__5750__auto___33208 = G__33210;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq32464){
var G__32465 = cljs.core.first(seq32464);
var seq32464__$1 = cljs.core.next(seq32464);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__32465,seq32464__$1);
}));


//# sourceMappingURL=shadow.dom.js.map
