goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = true;

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_16516 = (function (this$){
var x__5350__auto__ = (((this$ == null))?null:this$);
var m__5351__auto__ = (shadow.dom._to_dom[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5351__auto__.call(null,this$));
} else {
var m__5349__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5349__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_16516(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_16518 = (function (this$){
var x__5350__auto__ = (((this$ == null))?null:this$);
var m__5351__auto__ = (shadow.dom._to_svg[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5351__auto__.call(null,this$));
} else {
var m__5349__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5349__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_16518(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__15321 = coll;
var G__15322 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__15321,G__15322) : shadow.dom.lazy_native_coll_seq.call(null,G__15321,G__15322));
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
var or__5002__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
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

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"shadow.dom/NativeColl");
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
var G__15362 = arguments.length;
switch (G__15362) {
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
var G__15388 = arguments.length;
switch (G__15388) {
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
var G__15433 = arguments.length;
switch (G__15433) {
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
var G__15464 = arguments.length;
switch (G__15464) {
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
var G__15476 = arguments.length;
switch (G__15476) {
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
var G__15511 = arguments.length;
switch (G__15511) {
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

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__5002__auto__ = (!((typeof document !== 'undefined')));
if(or__5002__auto__){
return or__5002__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
}));
}catch (e15527){if((e15527 instanceof Object)){
var e = e15527;
return console.log("didnt support attachEvent",el,e);
} else {
throw e15527;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__5002__auto__ = (!((typeof document !== 'undefined')));
if(or__5002__auto__){
return or__5002__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__15543 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__15544 = null;
var count__15545 = (0);
var i__15546 = (0);
while(true){
if((i__15546 < count__15545)){
var el = chunk__15544.cljs$core$IIndexed$_nth$arity$2(null,i__15546);
var handler_16546__$1 = ((function (seq__15543,chunk__15544,count__15545,i__15546,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__15543,chunk__15544,count__15545,i__15546,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_16546__$1);


var G__16547 = seq__15543;
var G__16548 = chunk__15544;
var G__16549 = count__15545;
var G__16550 = (i__15546 + (1));
seq__15543 = G__16547;
chunk__15544 = G__16548;
count__15545 = G__16549;
i__15546 = G__16550;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__15543);
if(temp__5804__auto__){
var seq__15543__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15543__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__15543__$1);
var G__16551 = cljs.core.chunk_rest(seq__15543__$1);
var G__16552 = c__5525__auto__;
var G__16553 = cljs.core.count(c__5525__auto__);
var G__16554 = (0);
seq__15543 = G__16551;
chunk__15544 = G__16552;
count__15545 = G__16553;
i__15546 = G__16554;
continue;
} else {
var el = cljs.core.first(seq__15543__$1);
var handler_16555__$1 = ((function (seq__15543,chunk__15544,count__15545,i__15546,el,seq__15543__$1,temp__5804__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__15543,chunk__15544,count__15545,i__15546,el,seq__15543__$1,temp__5804__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_16555__$1);


var G__16556 = cljs.core.next(seq__15543__$1);
var G__16557 = null;
var G__16558 = (0);
var G__16559 = (0);
seq__15543 = G__16556;
chunk__15544 = G__16557;
count__15545 = G__16558;
i__15546 = G__16559;
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
var G__15579 = arguments.length;
switch (G__15579) {
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
var seq__15657 = cljs.core.seq(events);
var chunk__15658 = null;
var count__15659 = (0);
var i__15660 = (0);
while(true){
if((i__15660 < count__15659)){
var vec__15679 = chunk__15658.cljs$core$IIndexed$_nth$arity$2(null,i__15660);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15679,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15679,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__16561 = seq__15657;
var G__16562 = chunk__15658;
var G__16563 = count__15659;
var G__16564 = (i__15660 + (1));
seq__15657 = G__16561;
chunk__15658 = G__16562;
count__15659 = G__16563;
i__15660 = G__16564;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__15657);
if(temp__5804__auto__){
var seq__15657__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15657__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__15657__$1);
var G__16565 = cljs.core.chunk_rest(seq__15657__$1);
var G__16566 = c__5525__auto__;
var G__16567 = cljs.core.count(c__5525__auto__);
var G__16568 = (0);
seq__15657 = G__16565;
chunk__15658 = G__16566;
count__15659 = G__16567;
i__15660 = G__16568;
continue;
} else {
var vec__15693 = cljs.core.first(seq__15657__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15693,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15693,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__16569 = cljs.core.next(seq__15657__$1);
var G__16570 = null;
var G__16571 = (0);
var G__16572 = (0);
seq__15657 = G__16569;
chunk__15658 = G__16570;
count__15659 = G__16571;
i__15660 = G__16572;
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
var seq__15701 = cljs.core.seq(styles);
var chunk__15702 = null;
var count__15703 = (0);
var i__15704 = (0);
while(true){
if((i__15704 < count__15703)){
var vec__15728 = chunk__15702.cljs$core$IIndexed$_nth$arity$2(null,i__15704);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15728,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15728,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__16575 = seq__15701;
var G__16576 = chunk__15702;
var G__16577 = count__15703;
var G__16578 = (i__15704 + (1));
seq__15701 = G__16575;
chunk__15702 = G__16576;
count__15703 = G__16577;
i__15704 = G__16578;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__15701);
if(temp__5804__auto__){
var seq__15701__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15701__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__15701__$1);
var G__16579 = cljs.core.chunk_rest(seq__15701__$1);
var G__16580 = c__5525__auto__;
var G__16581 = cljs.core.count(c__5525__auto__);
var G__16582 = (0);
seq__15701 = G__16579;
chunk__15702 = G__16580;
count__15703 = G__16581;
i__15704 = G__16582;
continue;
} else {
var vec__15735 = cljs.core.first(seq__15701__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15735,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15735,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__16583 = cljs.core.next(seq__15701__$1);
var G__16584 = null;
var G__16585 = (0);
var G__16586 = (0);
seq__15701 = G__16583;
chunk__15702 = G__16584;
count__15703 = G__16585;
i__15704 = G__16586;
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
var G__15753_16587 = key;
var G__15753_16588__$1 = (((G__15753_16587 instanceof cljs.core.Keyword))?G__15753_16587.fqn:null);
switch (G__15753_16588__$1) {
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
var ks_16599 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5002__auto__ = goog.string.startsWith(ks_16599,"data-");
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return goog.string.startsWith(ks_16599,"aria-");
}
})())){
el.setAttribute(ks_16599,value);
} else {
(el[ks_16599] = value);
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
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__15764){
var map__15765 = p__15764;
var map__15765__$1 = cljs.core.__destructure_map(map__15765);
var props = map__15765__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15765__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__15766 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15766,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15766,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15766,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__15769 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__15769,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__15769;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__15771 = arguments.length;
switch (G__15771) {
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
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
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
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
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

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__15774){
var vec__15777 = p__15774;
var seq__15778 = cljs.core.seq(vec__15777);
var first__15779 = cljs.core.first(seq__15778);
var seq__15778__$1 = cljs.core.next(seq__15778);
var nn = first__15779;
var first__15779__$1 = cljs.core.first(seq__15778__$1);
var seq__15778__$2 = cljs.core.next(seq__15778__$1);
var np = first__15779__$1;
var nc = seq__15778__$2;
var node = vec__15777;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__15782 = nn;
var G__15783 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__15782,G__15783) : create_fn.call(null,G__15782,G__15783));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__15784 = nn;
var G__15785 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__15784,G__15785) : create_fn.call(null,G__15784,G__15785));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__15786 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15786,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15786,(1),null);
var seq__15792_16610 = cljs.core.seq(node_children);
var chunk__15793_16611 = null;
var count__15794_16612 = (0);
var i__15795_16613 = (0);
while(true){
if((i__15795_16613 < count__15794_16612)){
var child_struct_16614 = chunk__15793_16611.cljs$core$IIndexed$_nth$arity$2(null,i__15795_16613);
var children_16615 = shadow.dom.dom_node(child_struct_16614);
if(cljs.core.seq_QMARK_(children_16615)){
var seq__15848_16616 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_16615));
var chunk__15850_16617 = null;
var count__15851_16618 = (0);
var i__15852_16619 = (0);
while(true){
if((i__15852_16619 < count__15851_16618)){
var child_16620 = chunk__15850_16617.cljs$core$IIndexed$_nth$arity$2(null,i__15852_16619);
if(cljs.core.truth_(child_16620)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_16620);


var G__16622 = seq__15848_16616;
var G__16623 = chunk__15850_16617;
var G__16624 = count__15851_16618;
var G__16625 = (i__15852_16619 + (1));
seq__15848_16616 = G__16622;
chunk__15850_16617 = G__16623;
count__15851_16618 = G__16624;
i__15852_16619 = G__16625;
continue;
} else {
var G__16627 = seq__15848_16616;
var G__16628 = chunk__15850_16617;
var G__16629 = count__15851_16618;
var G__16630 = (i__15852_16619 + (1));
seq__15848_16616 = G__16627;
chunk__15850_16617 = G__16628;
count__15851_16618 = G__16629;
i__15852_16619 = G__16630;
continue;
}
} else {
var temp__5804__auto___16631 = cljs.core.seq(seq__15848_16616);
if(temp__5804__auto___16631){
var seq__15848_16632__$1 = temp__5804__auto___16631;
if(cljs.core.chunked_seq_QMARK_(seq__15848_16632__$1)){
var c__5525__auto___16633 = cljs.core.chunk_first(seq__15848_16632__$1);
var G__16634 = cljs.core.chunk_rest(seq__15848_16632__$1);
var G__16635 = c__5525__auto___16633;
var G__16636 = cljs.core.count(c__5525__auto___16633);
var G__16637 = (0);
seq__15848_16616 = G__16634;
chunk__15850_16617 = G__16635;
count__15851_16618 = G__16636;
i__15852_16619 = G__16637;
continue;
} else {
var child_16639 = cljs.core.first(seq__15848_16632__$1);
if(cljs.core.truth_(child_16639)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_16639);


var G__16640 = cljs.core.next(seq__15848_16632__$1);
var G__16641 = null;
var G__16642 = (0);
var G__16643 = (0);
seq__15848_16616 = G__16640;
chunk__15850_16617 = G__16641;
count__15851_16618 = G__16642;
i__15852_16619 = G__16643;
continue;
} else {
var G__16644 = cljs.core.next(seq__15848_16632__$1);
var G__16645 = null;
var G__16646 = (0);
var G__16647 = (0);
seq__15848_16616 = G__16644;
chunk__15850_16617 = G__16645;
count__15851_16618 = G__16646;
i__15852_16619 = G__16647;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_16615);
}


var G__16648 = seq__15792_16610;
var G__16650 = chunk__15793_16611;
var G__16651 = count__15794_16612;
var G__16652 = (i__15795_16613 + (1));
seq__15792_16610 = G__16648;
chunk__15793_16611 = G__16650;
count__15794_16612 = G__16651;
i__15795_16613 = G__16652;
continue;
} else {
var temp__5804__auto___16653 = cljs.core.seq(seq__15792_16610);
if(temp__5804__auto___16653){
var seq__15792_16654__$1 = temp__5804__auto___16653;
if(cljs.core.chunked_seq_QMARK_(seq__15792_16654__$1)){
var c__5525__auto___16655 = cljs.core.chunk_first(seq__15792_16654__$1);
var G__16656 = cljs.core.chunk_rest(seq__15792_16654__$1);
var G__16657 = c__5525__auto___16655;
var G__16658 = cljs.core.count(c__5525__auto___16655);
var G__16659 = (0);
seq__15792_16610 = G__16656;
chunk__15793_16611 = G__16657;
count__15794_16612 = G__16658;
i__15795_16613 = G__16659;
continue;
} else {
var child_struct_16660 = cljs.core.first(seq__15792_16654__$1);
var children_16661 = shadow.dom.dom_node(child_struct_16660);
if(cljs.core.seq_QMARK_(children_16661)){
var seq__15879_16662 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_16661));
var chunk__15881_16663 = null;
var count__15882_16664 = (0);
var i__15883_16665 = (0);
while(true){
if((i__15883_16665 < count__15882_16664)){
var child_16666 = chunk__15881_16663.cljs$core$IIndexed$_nth$arity$2(null,i__15883_16665);
if(cljs.core.truth_(child_16666)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_16666);


var G__16667 = seq__15879_16662;
var G__16668 = chunk__15881_16663;
var G__16669 = count__15882_16664;
var G__16670 = (i__15883_16665 + (1));
seq__15879_16662 = G__16667;
chunk__15881_16663 = G__16668;
count__15882_16664 = G__16669;
i__15883_16665 = G__16670;
continue;
} else {
var G__16671 = seq__15879_16662;
var G__16672 = chunk__15881_16663;
var G__16673 = count__15882_16664;
var G__16674 = (i__15883_16665 + (1));
seq__15879_16662 = G__16671;
chunk__15881_16663 = G__16672;
count__15882_16664 = G__16673;
i__15883_16665 = G__16674;
continue;
}
} else {
var temp__5804__auto___16675__$1 = cljs.core.seq(seq__15879_16662);
if(temp__5804__auto___16675__$1){
var seq__15879_16676__$1 = temp__5804__auto___16675__$1;
if(cljs.core.chunked_seq_QMARK_(seq__15879_16676__$1)){
var c__5525__auto___16677 = cljs.core.chunk_first(seq__15879_16676__$1);
var G__16680 = cljs.core.chunk_rest(seq__15879_16676__$1);
var G__16681 = c__5525__auto___16677;
var G__16683 = cljs.core.count(c__5525__auto___16677);
var G__16685 = (0);
seq__15879_16662 = G__16680;
chunk__15881_16663 = G__16681;
count__15882_16664 = G__16683;
i__15883_16665 = G__16685;
continue;
} else {
var child_16688 = cljs.core.first(seq__15879_16676__$1);
if(cljs.core.truth_(child_16688)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_16688);


var G__16691 = cljs.core.next(seq__15879_16676__$1);
var G__16692 = null;
var G__16693 = (0);
var G__16694 = (0);
seq__15879_16662 = G__16691;
chunk__15881_16663 = G__16692;
count__15882_16664 = G__16693;
i__15883_16665 = G__16694;
continue;
} else {
var G__16695 = cljs.core.next(seq__15879_16676__$1);
var G__16696 = null;
var G__16697 = (0);
var G__16698 = (0);
seq__15879_16662 = G__16695;
chunk__15881_16663 = G__16696;
count__15882_16664 = G__16697;
i__15883_16665 = G__16698;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_16661);
}


var G__16702 = cljs.core.next(seq__15792_16654__$1);
var G__16703 = null;
var G__16704 = (0);
var G__16705 = (0);
seq__15792_16610 = G__16702;
chunk__15793_16611 = G__16703;
count__15794_16612 = G__16704;
i__15795_16613 = G__16705;
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
var seq__15950 = cljs.core.seq(node);
var chunk__15951 = null;
var count__15952 = (0);
var i__15953 = (0);
while(true){
if((i__15953 < count__15952)){
var n = chunk__15951.cljs$core$IIndexed$_nth$arity$2(null,i__15953);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__16710 = seq__15950;
var G__16711 = chunk__15951;
var G__16712 = count__15952;
var G__16713 = (i__15953 + (1));
seq__15950 = G__16710;
chunk__15951 = G__16711;
count__15952 = G__16712;
i__15953 = G__16713;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__15950);
if(temp__5804__auto__){
var seq__15950__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15950__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__15950__$1);
var G__16715 = cljs.core.chunk_rest(seq__15950__$1);
var G__16716 = c__5525__auto__;
var G__16717 = cljs.core.count(c__5525__auto__);
var G__16718 = (0);
seq__15950 = G__16715;
chunk__15951 = G__16716;
count__15952 = G__16717;
i__15953 = G__16718;
continue;
} else {
var n = cljs.core.first(seq__15950__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__16723 = cljs.core.next(seq__15950__$1);
var G__16724 = null;
var G__16725 = (0);
var G__16726 = (0);
seq__15950 = G__16723;
chunk__15951 = G__16724;
count__15952 = G__16725;
i__15953 = G__16726;
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
var G__16000 = arguments.length;
switch (G__16000) {
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
var G__16021 = arguments.length;
switch (G__16021) {
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
var G__16065 = arguments.length;
switch (G__16065) {
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
var or__5002__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
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
var args__5732__auto__ = [];
var len__5726__auto___16750 = arguments.length;
var i__5727__auto___16751 = (0);
while(true){
if((i__5727__auto___16751 < len__5726__auto___16750)){
args__5732__auto__.push((arguments[i__5727__auto___16751]));

var G__16752 = (i__5727__auto___16751 + (1));
i__5727__auto___16751 = G__16752;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__16085_16754 = cljs.core.seq(nodes);
var chunk__16086_16755 = null;
var count__16087_16756 = (0);
var i__16088_16757 = (0);
while(true){
if((i__16088_16757 < count__16087_16756)){
var node_16759 = chunk__16086_16755.cljs$core$IIndexed$_nth$arity$2(null,i__16088_16757);
fragment.appendChild(shadow.dom._to_dom(node_16759));


var G__16760 = seq__16085_16754;
var G__16761 = chunk__16086_16755;
var G__16762 = count__16087_16756;
var G__16763 = (i__16088_16757 + (1));
seq__16085_16754 = G__16760;
chunk__16086_16755 = G__16761;
count__16087_16756 = G__16762;
i__16088_16757 = G__16763;
continue;
} else {
var temp__5804__auto___16765 = cljs.core.seq(seq__16085_16754);
if(temp__5804__auto___16765){
var seq__16085_16766__$1 = temp__5804__auto___16765;
if(cljs.core.chunked_seq_QMARK_(seq__16085_16766__$1)){
var c__5525__auto___16767 = cljs.core.chunk_first(seq__16085_16766__$1);
var G__16768 = cljs.core.chunk_rest(seq__16085_16766__$1);
var G__16769 = c__5525__auto___16767;
var G__16770 = cljs.core.count(c__5525__auto___16767);
var G__16771 = (0);
seq__16085_16754 = G__16768;
chunk__16086_16755 = G__16769;
count__16087_16756 = G__16770;
i__16088_16757 = G__16771;
continue;
} else {
var node_16772 = cljs.core.first(seq__16085_16766__$1);
fragment.appendChild(shadow.dom._to_dom(node_16772));


var G__16773 = cljs.core.next(seq__16085_16766__$1);
var G__16774 = null;
var G__16775 = (0);
var G__16776 = (0);
seq__16085_16754 = G__16773;
chunk__16086_16755 = G__16774;
count__16087_16756 = G__16775;
i__16088_16757 = G__16776;
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
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq16081){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq16081));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__16107_16777 = cljs.core.seq(scripts);
var chunk__16108_16778 = null;
var count__16109_16779 = (0);
var i__16110_16780 = (0);
while(true){
if((i__16110_16780 < count__16109_16779)){
var vec__16128_16783 = chunk__16108_16778.cljs$core$IIndexed$_nth$arity$2(null,i__16110_16780);
var script_tag_16784 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16128_16783,(0),null);
var script_body_16785 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16128_16783,(1),null);
eval(script_body_16785);


var G__16786 = seq__16107_16777;
var G__16787 = chunk__16108_16778;
var G__16788 = count__16109_16779;
var G__16789 = (i__16110_16780 + (1));
seq__16107_16777 = G__16786;
chunk__16108_16778 = G__16787;
count__16109_16779 = G__16788;
i__16110_16780 = G__16789;
continue;
} else {
var temp__5804__auto___16790 = cljs.core.seq(seq__16107_16777);
if(temp__5804__auto___16790){
var seq__16107_16791__$1 = temp__5804__auto___16790;
if(cljs.core.chunked_seq_QMARK_(seq__16107_16791__$1)){
var c__5525__auto___16792 = cljs.core.chunk_first(seq__16107_16791__$1);
var G__16793 = cljs.core.chunk_rest(seq__16107_16791__$1);
var G__16794 = c__5525__auto___16792;
var G__16795 = cljs.core.count(c__5525__auto___16792);
var G__16796 = (0);
seq__16107_16777 = G__16793;
chunk__16108_16778 = G__16794;
count__16109_16779 = G__16795;
i__16110_16780 = G__16796;
continue;
} else {
var vec__16138_16797 = cljs.core.first(seq__16107_16791__$1);
var script_tag_16798 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16138_16797,(0),null);
var script_body_16799 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16138_16797,(1),null);
eval(script_body_16799);


var G__16802 = cljs.core.next(seq__16107_16791__$1);
var G__16803 = null;
var G__16804 = (0);
var G__16805 = (0);
seq__16107_16777 = G__16802;
chunk__16108_16778 = G__16803;
count__16109_16779 = G__16804;
i__16110_16780 = G__16805;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__16141){
var vec__16143 = p__16141;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16143,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16143,(1),null);
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
var G__16166 = arguments.length;
switch (G__16166) {
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
var seq__16183 = cljs.core.seq(style_keys);
var chunk__16184 = null;
var count__16185 = (0);
var i__16186 = (0);
while(true){
if((i__16186 < count__16185)){
var it = chunk__16184.cljs$core$IIndexed$_nth$arity$2(null,i__16186);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__16814 = seq__16183;
var G__16815 = chunk__16184;
var G__16816 = count__16185;
var G__16817 = (i__16186 + (1));
seq__16183 = G__16814;
chunk__16184 = G__16815;
count__16185 = G__16816;
i__16186 = G__16817;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__16183);
if(temp__5804__auto__){
var seq__16183__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__16183__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__16183__$1);
var G__16819 = cljs.core.chunk_rest(seq__16183__$1);
var G__16820 = c__5525__auto__;
var G__16821 = cljs.core.count(c__5525__auto__);
var G__16822 = (0);
seq__16183 = G__16819;
chunk__16184 = G__16820;
count__16185 = G__16821;
i__16186 = G__16822;
continue;
} else {
var it = cljs.core.first(seq__16183__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__16824 = cljs.core.next(seq__16183__$1);
var G__16825 = null;
var G__16826 = (0);
var G__16827 = (0);
seq__16183 = G__16824;
chunk__16184 = G__16825;
count__16185 = G__16826;
i__16186 = G__16827;
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
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5300__auto__,k__5301__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return this__5300__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5301__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5302__auto__,k16197,else__5303__auto__){
var self__ = this;
var this__5302__auto____$1 = this;
var G__16213 = k16197;
var G__16213__$1 = (((G__16213 instanceof cljs.core.Keyword))?G__16213.fqn:null);
switch (G__16213__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k16197,else__5303__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5320__auto__,f__5321__auto__,init__5322__auto__){
var self__ = this;
var this__5320__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5323__auto__,p__16218){
var vec__16219 = p__16218;
var k__5324__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16219,(0),null);
var v__5325__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16219,(1),null);
return (f__5321__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5321__auto__.cljs$core$IFn$_invoke$arity$3(ret__5323__auto__,k__5324__auto__,v__5325__auto__) : f__5321__auto__.call(null,ret__5323__auto__,k__5324__auto__,v__5325__auto__));
}),init__5322__auto__,this__5320__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5315__auto__,writer__5316__auto__,opts__5317__auto__){
var self__ = this;
var this__5315__auto____$1 = this;
var pr_pair__5318__auto__ = (function (keyval__5319__auto__){
return cljs.core.pr_sequential_writer(writer__5316__auto__,cljs.core.pr_writer,""," ","",opts__5317__auto__,keyval__5319__auto__);
});
return cljs.core.pr_sequential_writer(writer__5316__auto__,pr_pair__5318__auto__,"#shadow.dom.Coordinate{",", ","}",opts__5317__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__16196){
var self__ = this;
var G__16196__$1 = this;
return (new cljs.core.RecordIter((0),G__16196__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5298__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5295__auto__){
var self__ = this;
var this__5295__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5304__auto__){
var self__ = this;
var this__5304__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5296__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
var h__5111__auto__ = self__.__hash;
if((!((h__5111__auto__ == null)))){
return h__5111__auto__;
} else {
var h__5111__auto____$1 = (function (coll__5297__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__5297__auto__));
})(this__5296__auto____$1);
(self__.__hash = h__5111__auto____$1);

return h__5111__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this16198,other16199){
var self__ = this;
var this16198__$1 = this;
return (((!((other16199 == null)))) && ((((this16198__$1.constructor === other16199.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16198__$1.x,other16199.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16198__$1.y,other16199.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16198__$1.__extmap,other16199.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5310__auto__,k__5311__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__5311__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5310__auto____$1),self__.__meta),k__5311__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5311__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5307__auto__,k16197){
var self__ = this;
var this__5307__auto____$1 = this;
var G__16241 = k16197;
var G__16241__$1 = (((G__16241 instanceof cljs.core.Keyword))?G__16241.fqn:null);
switch (G__16241__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k16197);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5308__auto__,k__5309__auto__,G__16196){
var self__ = this;
var this__5308__auto____$1 = this;
var pred__16245 = cljs.core.keyword_identical_QMARK_;
var expr__16246 = k__5309__auto__;
if(cljs.core.truth_((pred__16245.cljs$core$IFn$_invoke$arity$2 ? pred__16245.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__16246) : pred__16245.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__16246)))){
return (new shadow.dom.Coordinate(G__16196,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__16245.cljs$core$IFn$_invoke$arity$2 ? pred__16245.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__16246) : pred__16245.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__16246)))){
return (new shadow.dom.Coordinate(self__.x,G__16196,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5309__auto__,G__16196),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5313__auto__){
var self__ = this;
var this__5313__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5299__auto__,G__16196){
var self__ = this;
var this__5299__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__16196,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5305__auto__,entry__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5306__auto__)){
return this__5305__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5306__auto__,(0)),cljs.core._nth(entry__5306__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5305__auto____$1,entry__5306__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__5346__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__5346__auto__,writer__5347__auto__){
return cljs.core._write(writer__5347__auto__,"shadow.dom/Coordinate");
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
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__16201){
var extmap__5342__auto__ = (function (){var G__16252 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__16201,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__16201)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__16252);
} else {
return G__16252;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__16201),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__16201),null,cljs.core.not_empty(extmap__5342__auto__),null));
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
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5300__auto__,k__5301__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return this__5300__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5301__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5302__auto__,k16267,else__5303__auto__){
var self__ = this;
var this__5302__auto____$1 = this;
var G__16285 = k16267;
var G__16285__$1 = (((G__16285 instanceof cljs.core.Keyword))?G__16285.fqn:null);
switch (G__16285__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k16267,else__5303__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5320__auto__,f__5321__auto__,init__5322__auto__){
var self__ = this;
var this__5320__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5323__auto__,p__16289){
var vec__16290 = p__16289;
var k__5324__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16290,(0),null);
var v__5325__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16290,(1),null);
return (f__5321__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5321__auto__.cljs$core$IFn$_invoke$arity$3(ret__5323__auto__,k__5324__auto__,v__5325__auto__) : f__5321__auto__.call(null,ret__5323__auto__,k__5324__auto__,v__5325__auto__));
}),init__5322__auto__,this__5320__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5315__auto__,writer__5316__auto__,opts__5317__auto__){
var self__ = this;
var this__5315__auto____$1 = this;
var pr_pair__5318__auto__ = (function (keyval__5319__auto__){
return cljs.core.pr_sequential_writer(writer__5316__auto__,cljs.core.pr_writer,""," ","",opts__5317__auto__,keyval__5319__auto__);
});
return cljs.core.pr_sequential_writer(writer__5316__auto__,pr_pair__5318__auto__,"#shadow.dom.Size{",", ","}",opts__5317__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__16266){
var self__ = this;
var G__16266__$1 = this;
return (new cljs.core.RecordIter((0),G__16266__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5298__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5295__auto__){
var self__ = this;
var this__5295__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5304__auto__){
var self__ = this;
var this__5304__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5296__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
var h__5111__auto__ = self__.__hash;
if((!((h__5111__auto__ == null)))){
return h__5111__auto__;
} else {
var h__5111__auto____$1 = (function (coll__5297__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__5297__auto__));
})(this__5296__auto____$1);
(self__.__hash = h__5111__auto____$1);

return h__5111__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this16268,other16269){
var self__ = this;
var this16268__$1 = this;
return (((!((other16269 == null)))) && ((((this16268__$1.constructor === other16269.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16268__$1.w,other16269.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16268__$1.h,other16269.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16268__$1.__extmap,other16269.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5310__auto__,k__5311__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__5311__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5310__auto____$1),self__.__meta),k__5311__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5311__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5307__auto__,k16267){
var self__ = this;
var this__5307__auto____$1 = this;
var G__16317 = k16267;
var G__16317__$1 = (((G__16317 instanceof cljs.core.Keyword))?G__16317.fqn:null);
switch (G__16317__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k16267);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5308__auto__,k__5309__auto__,G__16266){
var self__ = this;
var this__5308__auto____$1 = this;
var pred__16319 = cljs.core.keyword_identical_QMARK_;
var expr__16320 = k__5309__auto__;
if(cljs.core.truth_((pred__16319.cljs$core$IFn$_invoke$arity$2 ? pred__16319.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__16320) : pred__16319.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__16320)))){
return (new shadow.dom.Size(G__16266,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__16319.cljs$core$IFn$_invoke$arity$2 ? pred__16319.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__16320) : pred__16319.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__16320)))){
return (new shadow.dom.Size(self__.w,G__16266,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5309__auto__,G__16266),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5313__auto__){
var self__ = this;
var this__5313__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5299__auto__,G__16266){
var self__ = this;
var this__5299__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__16266,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5305__auto__,entry__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5306__auto__)){
return this__5305__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5306__auto__,(0)),cljs.core._nth(entry__5306__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5305__auto____$1,entry__5306__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__5346__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__5346__auto__,writer__5347__auto__){
return cljs.core._write(writer__5347__auto__,"shadow.dom/Size");
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
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__16280){
var extmap__5342__auto__ = (function (){var G__16327 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__16280,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__16280)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__16327);
} else {
return G__16327;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__16280),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__16280),null,cljs.core.not_empty(extmap__5342__auto__),null));
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
var a__5590__auto__ = opts;
var l__5591__auto__ = a__5590__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__5591__auto__)){
var G__16989 = (i + (1));
var G__16990 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__16989;
ret = G__16990;
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
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__16354){
var vec__16355 = p__16354;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16355,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16355,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__16361 = arguments.length;
switch (G__16361) {
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
var temp__5802__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5802__auto__)){
var child = temp__5802__auto__;
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
var G__16999 = ps;
var G__17000 = (i + (1));
el__$1 = G__16999;
i = G__17000;
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
var vec__16393 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16393,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16393,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16393,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__16404_17004 = cljs.core.seq(props);
var chunk__16405_17005 = null;
var count__16406_17006 = (0);
var i__16407_17007 = (0);
while(true){
if((i__16407_17007 < count__16406_17006)){
var vec__16420_17010 = chunk__16405_17005.cljs$core$IIndexed$_nth$arity$2(null,i__16407_17007);
var k_17011 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16420_17010,(0),null);
var v_17012 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16420_17010,(1),null);
el.setAttributeNS((function (){var temp__5804__auto__ = cljs.core.namespace(k_17011);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_17011),v_17012);


var G__17016 = seq__16404_17004;
var G__17017 = chunk__16405_17005;
var G__17018 = count__16406_17006;
var G__17019 = (i__16407_17007 + (1));
seq__16404_17004 = G__17016;
chunk__16405_17005 = G__17017;
count__16406_17006 = G__17018;
i__16407_17007 = G__17019;
continue;
} else {
var temp__5804__auto___17020 = cljs.core.seq(seq__16404_17004);
if(temp__5804__auto___17020){
var seq__16404_17021__$1 = temp__5804__auto___17020;
if(cljs.core.chunked_seq_QMARK_(seq__16404_17021__$1)){
var c__5525__auto___17023 = cljs.core.chunk_first(seq__16404_17021__$1);
var G__17024 = cljs.core.chunk_rest(seq__16404_17021__$1);
var G__17025 = c__5525__auto___17023;
var G__17026 = cljs.core.count(c__5525__auto___17023);
var G__17027 = (0);
seq__16404_17004 = G__17024;
chunk__16405_17005 = G__17025;
count__16406_17006 = G__17026;
i__16407_17007 = G__17027;
continue;
} else {
var vec__16426_17029 = cljs.core.first(seq__16404_17021__$1);
var k_17030 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16426_17029,(0),null);
var v_17031 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16426_17029,(1),null);
el.setAttributeNS((function (){var temp__5804__auto____$1 = cljs.core.namespace(k_17030);
if(cljs.core.truth_(temp__5804__auto____$1)){
var ns = temp__5804__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_17030),v_17031);


var G__17044 = cljs.core.next(seq__16404_17021__$1);
var G__17045 = null;
var G__17046 = (0);
var G__17047 = (0);
seq__16404_17004 = G__17044;
chunk__16405_17005 = G__17045;
count__16406_17006 = G__17046;
i__16407_17007 = G__17047;
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
var vec__16438 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16438,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16438,(1),null);
var seq__16442_17050 = cljs.core.seq(node_children);
var chunk__16444_17051 = null;
var count__16445_17052 = (0);
var i__16446_17053 = (0);
while(true){
if((i__16446_17053 < count__16445_17052)){
var child_struct_17055 = chunk__16444_17051.cljs$core$IIndexed$_nth$arity$2(null,i__16446_17053);
if((!((child_struct_17055 == null)))){
if(typeof child_struct_17055 === 'string'){
var text_17056 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_17056),child_struct_17055].join(''));
} else {
var children_17058 = shadow.dom.svg_node(child_struct_17055);
if(cljs.core.seq_QMARK_(children_17058)){
var seq__16469_17060 = cljs.core.seq(children_17058);
var chunk__16471_17061 = null;
var count__16472_17062 = (0);
var i__16473_17063 = (0);
while(true){
if((i__16473_17063 < count__16472_17062)){
var child_17065 = chunk__16471_17061.cljs$core$IIndexed$_nth$arity$2(null,i__16473_17063);
if(cljs.core.truth_(child_17065)){
node.appendChild(child_17065);


var G__17066 = seq__16469_17060;
var G__17067 = chunk__16471_17061;
var G__17068 = count__16472_17062;
var G__17069 = (i__16473_17063 + (1));
seq__16469_17060 = G__17066;
chunk__16471_17061 = G__17067;
count__16472_17062 = G__17068;
i__16473_17063 = G__17069;
continue;
} else {
var G__17070 = seq__16469_17060;
var G__17071 = chunk__16471_17061;
var G__17072 = count__16472_17062;
var G__17073 = (i__16473_17063 + (1));
seq__16469_17060 = G__17070;
chunk__16471_17061 = G__17071;
count__16472_17062 = G__17072;
i__16473_17063 = G__17073;
continue;
}
} else {
var temp__5804__auto___17074 = cljs.core.seq(seq__16469_17060);
if(temp__5804__auto___17074){
var seq__16469_17075__$1 = temp__5804__auto___17074;
if(cljs.core.chunked_seq_QMARK_(seq__16469_17075__$1)){
var c__5525__auto___17077 = cljs.core.chunk_first(seq__16469_17075__$1);
var G__17078 = cljs.core.chunk_rest(seq__16469_17075__$1);
var G__17079 = c__5525__auto___17077;
var G__17080 = cljs.core.count(c__5525__auto___17077);
var G__17081 = (0);
seq__16469_17060 = G__17078;
chunk__16471_17061 = G__17079;
count__16472_17062 = G__17080;
i__16473_17063 = G__17081;
continue;
} else {
var child_17082 = cljs.core.first(seq__16469_17075__$1);
if(cljs.core.truth_(child_17082)){
node.appendChild(child_17082);


var G__17083 = cljs.core.next(seq__16469_17075__$1);
var G__17084 = null;
var G__17085 = (0);
var G__17086 = (0);
seq__16469_17060 = G__17083;
chunk__16471_17061 = G__17084;
count__16472_17062 = G__17085;
i__16473_17063 = G__17086;
continue;
} else {
var G__17087 = cljs.core.next(seq__16469_17075__$1);
var G__17088 = null;
var G__17089 = (0);
var G__17090 = (0);
seq__16469_17060 = G__17087;
chunk__16471_17061 = G__17088;
count__16472_17062 = G__17089;
i__16473_17063 = G__17090;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_17058);
}
}


var G__17093 = seq__16442_17050;
var G__17094 = chunk__16444_17051;
var G__17095 = count__16445_17052;
var G__17096 = (i__16446_17053 + (1));
seq__16442_17050 = G__17093;
chunk__16444_17051 = G__17094;
count__16445_17052 = G__17095;
i__16446_17053 = G__17096;
continue;
} else {
var G__17100 = seq__16442_17050;
var G__17101 = chunk__16444_17051;
var G__17102 = count__16445_17052;
var G__17103 = (i__16446_17053 + (1));
seq__16442_17050 = G__17100;
chunk__16444_17051 = G__17101;
count__16445_17052 = G__17102;
i__16446_17053 = G__17103;
continue;
}
} else {
var temp__5804__auto___17105 = cljs.core.seq(seq__16442_17050);
if(temp__5804__auto___17105){
var seq__16442_17106__$1 = temp__5804__auto___17105;
if(cljs.core.chunked_seq_QMARK_(seq__16442_17106__$1)){
var c__5525__auto___17108 = cljs.core.chunk_first(seq__16442_17106__$1);
var G__17109 = cljs.core.chunk_rest(seq__16442_17106__$1);
var G__17110 = c__5525__auto___17108;
var G__17111 = cljs.core.count(c__5525__auto___17108);
var G__17112 = (0);
seq__16442_17050 = G__17109;
chunk__16444_17051 = G__17110;
count__16445_17052 = G__17111;
i__16446_17053 = G__17112;
continue;
} else {
var child_struct_17116 = cljs.core.first(seq__16442_17106__$1);
if((!((child_struct_17116 == null)))){
if(typeof child_struct_17116 === 'string'){
var text_17118 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_17118),child_struct_17116].join(''));
} else {
var children_17119 = shadow.dom.svg_node(child_struct_17116);
if(cljs.core.seq_QMARK_(children_17119)){
var seq__16475_17121 = cljs.core.seq(children_17119);
var chunk__16477_17122 = null;
var count__16478_17123 = (0);
var i__16479_17124 = (0);
while(true){
if((i__16479_17124 < count__16478_17123)){
var child_17126 = chunk__16477_17122.cljs$core$IIndexed$_nth$arity$2(null,i__16479_17124);
if(cljs.core.truth_(child_17126)){
node.appendChild(child_17126);


var G__17127 = seq__16475_17121;
var G__17128 = chunk__16477_17122;
var G__17129 = count__16478_17123;
var G__17130 = (i__16479_17124 + (1));
seq__16475_17121 = G__17127;
chunk__16477_17122 = G__17128;
count__16478_17123 = G__17129;
i__16479_17124 = G__17130;
continue;
} else {
var G__17131 = seq__16475_17121;
var G__17132 = chunk__16477_17122;
var G__17133 = count__16478_17123;
var G__17134 = (i__16479_17124 + (1));
seq__16475_17121 = G__17131;
chunk__16477_17122 = G__17132;
count__16478_17123 = G__17133;
i__16479_17124 = G__17134;
continue;
}
} else {
var temp__5804__auto___17135__$1 = cljs.core.seq(seq__16475_17121);
if(temp__5804__auto___17135__$1){
var seq__16475_17136__$1 = temp__5804__auto___17135__$1;
if(cljs.core.chunked_seq_QMARK_(seq__16475_17136__$1)){
var c__5525__auto___17137 = cljs.core.chunk_first(seq__16475_17136__$1);
var G__17138 = cljs.core.chunk_rest(seq__16475_17136__$1);
var G__17139 = c__5525__auto___17137;
var G__17140 = cljs.core.count(c__5525__auto___17137);
var G__17141 = (0);
seq__16475_17121 = G__17138;
chunk__16477_17122 = G__17139;
count__16478_17123 = G__17140;
i__16479_17124 = G__17141;
continue;
} else {
var child_17143 = cljs.core.first(seq__16475_17136__$1);
if(cljs.core.truth_(child_17143)){
node.appendChild(child_17143);


var G__17144 = cljs.core.next(seq__16475_17136__$1);
var G__17145 = null;
var G__17146 = (0);
var G__17147 = (0);
seq__16475_17121 = G__17144;
chunk__16477_17122 = G__17145;
count__16478_17123 = G__17146;
i__16479_17124 = G__17147;
continue;
} else {
var G__17148 = cljs.core.next(seq__16475_17136__$1);
var G__17149 = null;
var G__17150 = (0);
var G__17151 = (0);
seq__16475_17121 = G__17148;
chunk__16477_17122 = G__17149;
count__16478_17123 = G__17150;
i__16479_17124 = G__17151;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_17119);
}
}


var G__17152 = cljs.core.next(seq__16442_17106__$1);
var G__17153 = null;
var G__17154 = (0);
var G__17155 = (0);
seq__16442_17050 = G__17152;
chunk__16444_17051 = G__17153;
count__16445_17052 = G__17154;
i__16446_17053 = G__17155;
continue;
} else {
var G__17158 = cljs.core.next(seq__16442_17106__$1);
var G__17159 = null;
var G__17160 = (0);
var G__17161 = (0);
seq__16442_17050 = G__17158;
chunk__16444_17051 = G__17159;
count__16445_17052 = G__17160;
i__16446_17053 = G__17161;
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
var args__5732__auto__ = [];
var len__5726__auto___17167 = arguments.length;
var i__5727__auto___17183 = (0);
while(true){
if((i__5727__auto___17183 < len__5726__auto___17167)){
args__5732__auto__.push((arguments[i__5727__auto___17183]));

var G__17196 = (i__5727__auto___17183 + (1));
i__5727__auto___17183 = G__17196;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq16493){
var G__16494 = cljs.core.first(seq16493);
var seq16493__$1 = cljs.core.next(seq16493);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__16494,seq16493__$1);
}));


//# sourceMappingURL=shadow.dom.js.map
