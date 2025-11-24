goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = true;

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_16913 = (function (this$){
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
return shadow$dom$IElement$_to_dom$dyn_16913(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_16916 = (function (this$){
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
return shadow$dom$SVGElement$_to_svg$dyn_16916(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__15748 = coll;
var G__15749 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__15748,G__15749) : shadow.dom.lazy_native_coll_seq.call(null,G__15748,G__15749));
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
var G__15787 = arguments.length;
switch (G__15787) {
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
var G__15789 = arguments.length;
switch (G__15789) {
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
var G__15796 = arguments.length;
switch (G__15796) {
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
var G__15810 = arguments.length;
switch (G__15810) {
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
var G__15822 = arguments.length;
switch (G__15822) {
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
var G__15871 = arguments.length;
switch (G__15871) {
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
}catch (e15890){if((e15890 instanceof Object)){
var e = e15890;
return console.log("didnt support attachEvent",el,e);
} else {
throw e15890;

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
var seq__15900 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__15901 = null;
var count__15902 = (0);
var i__15903 = (0);
while(true){
if((i__15903 < count__15902)){
var el = chunk__15901.cljs$core$IIndexed$_nth$arity$2(null,i__15903);
var handler_16953__$1 = ((function (seq__15900,chunk__15901,count__15902,i__15903,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__15900,chunk__15901,count__15902,i__15903,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_16953__$1);


var G__16957 = seq__15900;
var G__16958 = chunk__15901;
var G__16959 = count__15902;
var G__16960 = (i__15903 + (1));
seq__15900 = G__16957;
chunk__15901 = G__16958;
count__15902 = G__16959;
i__15903 = G__16960;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__15900);
if(temp__5804__auto__){
var seq__15900__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15900__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__15900__$1);
var G__16962 = cljs.core.chunk_rest(seq__15900__$1);
var G__16963 = c__5525__auto__;
var G__16964 = cljs.core.count(c__5525__auto__);
var G__16965 = (0);
seq__15900 = G__16962;
chunk__15901 = G__16963;
count__15902 = G__16964;
i__15903 = G__16965;
continue;
} else {
var el = cljs.core.first(seq__15900__$1);
var handler_16967__$1 = ((function (seq__15900,chunk__15901,count__15902,i__15903,el,seq__15900__$1,temp__5804__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__15900,chunk__15901,count__15902,i__15903,el,seq__15900__$1,temp__5804__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_16967__$1);


var G__16968 = cljs.core.next(seq__15900__$1);
var G__16969 = null;
var G__16970 = (0);
var G__16971 = (0);
seq__15900 = G__16968;
chunk__15901 = G__16969;
count__15902 = G__16970;
i__15903 = G__16971;
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
var G__15918 = arguments.length;
switch (G__15918) {
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
var seq__15978 = cljs.core.seq(events);
var chunk__15979 = null;
var count__15980 = (0);
var i__15981 = (0);
while(true){
if((i__15981 < count__15980)){
var vec__15996 = chunk__15979.cljs$core$IIndexed$_nth$arity$2(null,i__15981);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15996,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15996,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__16980 = seq__15978;
var G__16981 = chunk__15979;
var G__16982 = count__15980;
var G__16983 = (i__15981 + (1));
seq__15978 = G__16980;
chunk__15979 = G__16981;
count__15980 = G__16982;
i__15981 = G__16983;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__15978);
if(temp__5804__auto__){
var seq__15978__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15978__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__15978__$1);
var G__16989 = cljs.core.chunk_rest(seq__15978__$1);
var G__16990 = c__5525__auto__;
var G__16991 = cljs.core.count(c__5525__auto__);
var G__16992 = (0);
seq__15978 = G__16989;
chunk__15979 = G__16990;
count__15980 = G__16991;
i__15981 = G__16992;
continue;
} else {
var vec__16001 = cljs.core.first(seq__15978__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16001,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16001,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__16994 = cljs.core.next(seq__15978__$1);
var G__16995 = null;
var G__16996 = (0);
var G__16997 = (0);
seq__15978 = G__16994;
chunk__15979 = G__16995;
count__15980 = G__16996;
i__15981 = G__16997;
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
var seq__16010 = cljs.core.seq(styles);
var chunk__16011 = null;
var count__16012 = (0);
var i__16013 = (0);
while(true){
if((i__16013 < count__16012)){
var vec__16025 = chunk__16011.cljs$core$IIndexed$_nth$arity$2(null,i__16013);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16025,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16025,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__16999 = seq__16010;
var G__17000 = chunk__16011;
var G__17001 = count__16012;
var G__17002 = (i__16013 + (1));
seq__16010 = G__16999;
chunk__16011 = G__17000;
count__16012 = G__17001;
i__16013 = G__17002;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__16010);
if(temp__5804__auto__){
var seq__16010__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__16010__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__16010__$1);
var G__17008 = cljs.core.chunk_rest(seq__16010__$1);
var G__17009 = c__5525__auto__;
var G__17010 = cljs.core.count(c__5525__auto__);
var G__17011 = (0);
seq__16010 = G__17008;
chunk__16011 = G__17009;
count__16012 = G__17010;
i__16013 = G__17011;
continue;
} else {
var vec__16032 = cljs.core.first(seq__16010__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16032,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16032,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__17012 = cljs.core.next(seq__16010__$1);
var G__17013 = null;
var G__17014 = (0);
var G__17015 = (0);
seq__16010 = G__17012;
chunk__16011 = G__17013;
count__16012 = G__17014;
i__16013 = G__17015;
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
var G__16037_17019 = key;
var G__16037_17020__$1 = (((G__16037_17019 instanceof cljs.core.Keyword))?G__16037_17019.fqn:null);
switch (G__16037_17020__$1) {
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
var ks_17022 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5002__auto__ = goog.string.startsWith(ks_17022,"data-");
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return goog.string.startsWith(ks_17022,"aria-");
}
})())){
el.setAttribute(ks_17022,value);
} else {
(el[ks_17022] = value);
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
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__16050){
var map__16051 = p__16050;
var map__16051__$1 = cljs.core.__destructure_map(map__16051);
var props = map__16051__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16051__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__16052 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16052,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16052,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16052,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__16063 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__16063,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__16063;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__16069 = arguments.length;
switch (G__16069) {
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

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__16076){
var vec__16077 = p__16076;
var seq__16078 = cljs.core.seq(vec__16077);
var first__16079 = cljs.core.first(seq__16078);
var seq__16078__$1 = cljs.core.next(seq__16078);
var nn = first__16079;
var first__16079__$1 = cljs.core.first(seq__16078__$1);
var seq__16078__$2 = cljs.core.next(seq__16078__$1);
var np = first__16079__$1;
var nc = seq__16078__$2;
var node = vec__16077;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__16080 = nn;
var G__16081 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__16080,G__16081) : create_fn.call(null,G__16080,G__16081));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__16082 = nn;
var G__16083 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__16082,G__16083) : create_fn.call(null,G__16082,G__16083));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__16084 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16084,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16084,(1),null);
var seq__16087_17036 = cljs.core.seq(node_children);
var chunk__16088_17037 = null;
var count__16089_17038 = (0);
var i__16090_17039 = (0);
while(true){
if((i__16090_17039 < count__16089_17038)){
var child_struct_17040 = chunk__16088_17037.cljs$core$IIndexed$_nth$arity$2(null,i__16090_17039);
var children_17041 = shadow.dom.dom_node(child_struct_17040);
if(cljs.core.seq_QMARK_(children_17041)){
var seq__16116_17042 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_17041));
var chunk__16118_17043 = null;
var count__16119_17044 = (0);
var i__16120_17045 = (0);
while(true){
if((i__16120_17045 < count__16119_17044)){
var child_17046 = chunk__16118_17043.cljs$core$IIndexed$_nth$arity$2(null,i__16120_17045);
if(cljs.core.truth_(child_17046)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_17046);


var G__17047 = seq__16116_17042;
var G__17048 = chunk__16118_17043;
var G__17049 = count__16119_17044;
var G__17050 = (i__16120_17045 + (1));
seq__16116_17042 = G__17047;
chunk__16118_17043 = G__17048;
count__16119_17044 = G__17049;
i__16120_17045 = G__17050;
continue;
} else {
var G__17051 = seq__16116_17042;
var G__17052 = chunk__16118_17043;
var G__17053 = count__16119_17044;
var G__17054 = (i__16120_17045 + (1));
seq__16116_17042 = G__17051;
chunk__16118_17043 = G__17052;
count__16119_17044 = G__17053;
i__16120_17045 = G__17054;
continue;
}
} else {
var temp__5804__auto___17055 = cljs.core.seq(seq__16116_17042);
if(temp__5804__auto___17055){
var seq__16116_17057__$1 = temp__5804__auto___17055;
if(cljs.core.chunked_seq_QMARK_(seq__16116_17057__$1)){
var c__5525__auto___17058 = cljs.core.chunk_first(seq__16116_17057__$1);
var G__17059 = cljs.core.chunk_rest(seq__16116_17057__$1);
var G__17060 = c__5525__auto___17058;
var G__17061 = cljs.core.count(c__5525__auto___17058);
var G__17062 = (0);
seq__16116_17042 = G__17059;
chunk__16118_17043 = G__17060;
count__16119_17044 = G__17061;
i__16120_17045 = G__17062;
continue;
} else {
var child_17065 = cljs.core.first(seq__16116_17057__$1);
if(cljs.core.truth_(child_17065)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_17065);


var G__17068 = cljs.core.next(seq__16116_17057__$1);
var G__17069 = null;
var G__17070 = (0);
var G__17071 = (0);
seq__16116_17042 = G__17068;
chunk__16118_17043 = G__17069;
count__16119_17044 = G__17070;
i__16120_17045 = G__17071;
continue;
} else {
var G__17072 = cljs.core.next(seq__16116_17057__$1);
var G__17073 = null;
var G__17074 = (0);
var G__17075 = (0);
seq__16116_17042 = G__17072;
chunk__16118_17043 = G__17073;
count__16119_17044 = G__17074;
i__16120_17045 = G__17075;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_17041);
}


var G__17077 = seq__16087_17036;
var G__17078 = chunk__16088_17037;
var G__17079 = count__16089_17038;
var G__17080 = (i__16090_17039 + (1));
seq__16087_17036 = G__17077;
chunk__16088_17037 = G__17078;
count__16089_17038 = G__17079;
i__16090_17039 = G__17080;
continue;
} else {
var temp__5804__auto___17082 = cljs.core.seq(seq__16087_17036);
if(temp__5804__auto___17082){
var seq__16087_17083__$1 = temp__5804__auto___17082;
if(cljs.core.chunked_seq_QMARK_(seq__16087_17083__$1)){
var c__5525__auto___17084 = cljs.core.chunk_first(seq__16087_17083__$1);
var G__17085 = cljs.core.chunk_rest(seq__16087_17083__$1);
var G__17086 = c__5525__auto___17084;
var G__17087 = cljs.core.count(c__5525__auto___17084);
var G__17088 = (0);
seq__16087_17036 = G__17085;
chunk__16088_17037 = G__17086;
count__16089_17038 = G__17087;
i__16090_17039 = G__17088;
continue;
} else {
var child_struct_17089 = cljs.core.first(seq__16087_17083__$1);
var children_17090 = shadow.dom.dom_node(child_struct_17089);
if(cljs.core.seq_QMARK_(children_17090)){
var seq__16138_17091 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_17090));
var chunk__16140_17092 = null;
var count__16141_17093 = (0);
var i__16142_17094 = (0);
while(true){
if((i__16142_17094 < count__16141_17093)){
var child_17096 = chunk__16140_17092.cljs$core$IIndexed$_nth$arity$2(null,i__16142_17094);
if(cljs.core.truth_(child_17096)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_17096);


var G__17098 = seq__16138_17091;
var G__17099 = chunk__16140_17092;
var G__17100 = count__16141_17093;
var G__17101 = (i__16142_17094 + (1));
seq__16138_17091 = G__17098;
chunk__16140_17092 = G__17099;
count__16141_17093 = G__17100;
i__16142_17094 = G__17101;
continue;
} else {
var G__17102 = seq__16138_17091;
var G__17103 = chunk__16140_17092;
var G__17104 = count__16141_17093;
var G__17105 = (i__16142_17094 + (1));
seq__16138_17091 = G__17102;
chunk__16140_17092 = G__17103;
count__16141_17093 = G__17104;
i__16142_17094 = G__17105;
continue;
}
} else {
var temp__5804__auto___17106__$1 = cljs.core.seq(seq__16138_17091);
if(temp__5804__auto___17106__$1){
var seq__16138_17107__$1 = temp__5804__auto___17106__$1;
if(cljs.core.chunked_seq_QMARK_(seq__16138_17107__$1)){
var c__5525__auto___17108 = cljs.core.chunk_first(seq__16138_17107__$1);
var G__17110 = cljs.core.chunk_rest(seq__16138_17107__$1);
var G__17111 = c__5525__auto___17108;
var G__17112 = cljs.core.count(c__5525__auto___17108);
var G__17113 = (0);
seq__16138_17091 = G__17110;
chunk__16140_17092 = G__17111;
count__16141_17093 = G__17112;
i__16142_17094 = G__17113;
continue;
} else {
var child_17114 = cljs.core.first(seq__16138_17107__$1);
if(cljs.core.truth_(child_17114)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_17114);


var G__17116 = cljs.core.next(seq__16138_17107__$1);
var G__17117 = null;
var G__17118 = (0);
var G__17119 = (0);
seq__16138_17091 = G__17116;
chunk__16140_17092 = G__17117;
count__16141_17093 = G__17118;
i__16142_17094 = G__17119;
continue;
} else {
var G__17120 = cljs.core.next(seq__16138_17107__$1);
var G__17121 = null;
var G__17122 = (0);
var G__17123 = (0);
seq__16138_17091 = G__17120;
chunk__16140_17092 = G__17121;
count__16141_17093 = G__17122;
i__16142_17094 = G__17123;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_17090);
}


var G__17125 = cljs.core.next(seq__16087_17083__$1);
var G__17126 = null;
var G__17127 = (0);
var G__17128 = (0);
seq__16087_17036 = G__17125;
chunk__16088_17037 = G__17126;
count__16089_17038 = G__17127;
i__16090_17039 = G__17128;
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
var seq__16202 = cljs.core.seq(node);
var chunk__16203 = null;
var count__16204 = (0);
var i__16205 = (0);
while(true){
if((i__16205 < count__16204)){
var n = chunk__16203.cljs$core$IIndexed$_nth$arity$2(null,i__16205);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__17132 = seq__16202;
var G__17133 = chunk__16203;
var G__17134 = count__16204;
var G__17135 = (i__16205 + (1));
seq__16202 = G__17132;
chunk__16203 = G__17133;
count__16204 = G__17134;
i__16205 = G__17135;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__16202);
if(temp__5804__auto__){
var seq__16202__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__16202__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__16202__$1);
var G__17137 = cljs.core.chunk_rest(seq__16202__$1);
var G__17138 = c__5525__auto__;
var G__17139 = cljs.core.count(c__5525__auto__);
var G__17140 = (0);
seq__16202 = G__17137;
chunk__16203 = G__17138;
count__16204 = G__17139;
i__16205 = G__17140;
continue;
} else {
var n = cljs.core.first(seq__16202__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__17143 = cljs.core.next(seq__16202__$1);
var G__17144 = null;
var G__17145 = (0);
var G__17146 = (0);
seq__16202 = G__17143;
chunk__16203 = G__17144;
count__16204 = G__17145;
i__16205 = G__17146;
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
var G__16241 = arguments.length;
switch (G__16241) {
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
var G__16272 = arguments.length;
switch (G__16272) {
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
var G__16303 = arguments.length;
switch (G__16303) {
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
var len__5726__auto___17161 = arguments.length;
var i__5727__auto___17162 = (0);
while(true){
if((i__5727__auto___17162 < len__5726__auto___17161)){
args__5732__auto__.push((arguments[i__5727__auto___17162]));

var G__17163 = (i__5727__auto___17162 + (1));
i__5727__auto___17162 = G__17163;
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
var seq__16416_17165 = cljs.core.seq(nodes);
var chunk__16417_17166 = null;
var count__16418_17167 = (0);
var i__16419_17168 = (0);
while(true){
if((i__16419_17168 < count__16418_17167)){
var node_17169 = chunk__16417_17166.cljs$core$IIndexed$_nth$arity$2(null,i__16419_17168);
fragment.appendChild(shadow.dom._to_dom(node_17169));


var G__17170 = seq__16416_17165;
var G__17171 = chunk__16417_17166;
var G__17172 = count__16418_17167;
var G__17173 = (i__16419_17168 + (1));
seq__16416_17165 = G__17170;
chunk__16417_17166 = G__17171;
count__16418_17167 = G__17172;
i__16419_17168 = G__17173;
continue;
} else {
var temp__5804__auto___17175 = cljs.core.seq(seq__16416_17165);
if(temp__5804__auto___17175){
var seq__16416_17177__$1 = temp__5804__auto___17175;
if(cljs.core.chunked_seq_QMARK_(seq__16416_17177__$1)){
var c__5525__auto___17178 = cljs.core.chunk_first(seq__16416_17177__$1);
var G__17179 = cljs.core.chunk_rest(seq__16416_17177__$1);
var G__17180 = c__5525__auto___17178;
var G__17181 = cljs.core.count(c__5525__auto___17178);
var G__17182 = (0);
seq__16416_17165 = G__17179;
chunk__16417_17166 = G__17180;
count__16418_17167 = G__17181;
i__16419_17168 = G__17182;
continue;
} else {
var node_17189 = cljs.core.first(seq__16416_17177__$1);
fragment.appendChild(shadow.dom._to_dom(node_17189));


var G__17190 = cljs.core.next(seq__16416_17177__$1);
var G__17191 = null;
var G__17192 = (0);
var G__17193 = (0);
seq__16416_17165 = G__17190;
chunk__16417_17166 = G__17191;
count__16418_17167 = G__17192;
i__16419_17168 = G__17193;
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
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq16409){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq16409));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__16437_17196 = cljs.core.seq(scripts);
var chunk__16438_17197 = null;
var count__16439_17198 = (0);
var i__16440_17199 = (0);
while(true){
if((i__16440_17199 < count__16439_17198)){
var vec__16494_17200 = chunk__16438_17197.cljs$core$IIndexed$_nth$arity$2(null,i__16440_17199);
var script_tag_17201 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16494_17200,(0),null);
var script_body_17202 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16494_17200,(1),null);
eval(script_body_17202);


var G__17205 = seq__16437_17196;
var G__17206 = chunk__16438_17197;
var G__17207 = count__16439_17198;
var G__17208 = (i__16440_17199 + (1));
seq__16437_17196 = G__17205;
chunk__16438_17197 = G__17206;
count__16439_17198 = G__17207;
i__16440_17199 = G__17208;
continue;
} else {
var temp__5804__auto___17215 = cljs.core.seq(seq__16437_17196);
if(temp__5804__auto___17215){
var seq__16437_17216__$1 = temp__5804__auto___17215;
if(cljs.core.chunked_seq_QMARK_(seq__16437_17216__$1)){
var c__5525__auto___17217 = cljs.core.chunk_first(seq__16437_17216__$1);
var G__17218 = cljs.core.chunk_rest(seq__16437_17216__$1);
var G__17219 = c__5525__auto___17217;
var G__17220 = cljs.core.count(c__5525__auto___17217);
var G__17221 = (0);
seq__16437_17196 = G__17218;
chunk__16438_17197 = G__17219;
count__16439_17198 = G__17220;
i__16440_17199 = G__17221;
continue;
} else {
var vec__16498_17224 = cljs.core.first(seq__16437_17216__$1);
var script_tag_17225 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16498_17224,(0),null);
var script_body_17226 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16498_17224,(1),null);
eval(script_body_17226);


var G__17227 = cljs.core.next(seq__16437_17216__$1);
var G__17228 = null;
var G__17229 = (0);
var G__17230 = (0);
seq__16437_17196 = G__17227;
chunk__16438_17197 = G__17228;
count__16439_17198 = G__17229;
i__16440_17199 = G__17230;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__16503){
var vec__16505 = p__16503;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16505,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16505,(1),null);
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
var G__16517 = arguments.length;
switch (G__16517) {
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
var seq__16523 = cljs.core.seq(style_keys);
var chunk__16524 = null;
var count__16525 = (0);
var i__16526 = (0);
while(true){
if((i__16526 < count__16525)){
var it = chunk__16524.cljs$core$IIndexed$_nth$arity$2(null,i__16526);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__17247 = seq__16523;
var G__17248 = chunk__16524;
var G__17249 = count__16525;
var G__17250 = (i__16526 + (1));
seq__16523 = G__17247;
chunk__16524 = G__17248;
count__16525 = G__17249;
i__16526 = G__17250;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__16523);
if(temp__5804__auto__){
var seq__16523__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__16523__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__16523__$1);
var G__17252 = cljs.core.chunk_rest(seq__16523__$1);
var G__17253 = c__5525__auto__;
var G__17254 = cljs.core.count(c__5525__auto__);
var G__17255 = (0);
seq__16523 = G__17252;
chunk__16524 = G__17253;
count__16525 = G__17254;
i__16526 = G__17255;
continue;
} else {
var it = cljs.core.first(seq__16523__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__17257 = cljs.core.next(seq__16523__$1);
var G__17258 = null;
var G__17259 = (0);
var G__17260 = (0);
seq__16523 = G__17257;
chunk__16524 = G__17258;
count__16525 = G__17259;
i__16526 = G__17260;
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

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5302__auto__,k16532,else__5303__auto__){
var self__ = this;
var this__5302__auto____$1 = this;
var G__16556 = k16532;
var G__16556__$1 = (((G__16556 instanceof cljs.core.Keyword))?G__16556.fqn:null);
switch (G__16556__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k16532,else__5303__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5320__auto__,f__5321__auto__,init__5322__auto__){
var self__ = this;
var this__5320__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5323__auto__,p__16560){
var vec__16561 = p__16560;
var k__5324__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16561,(0),null);
var v__5325__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16561,(1),null);
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

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__16531){
var self__ = this;
var G__16531__$1 = this;
return (new cljs.core.RecordIter((0),G__16531__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this16533,other16534){
var self__ = this;
var this16533__$1 = this;
return (((!((other16534 == null)))) && ((((this16533__$1.constructor === other16534.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16533__$1.x,other16534.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16533__$1.y,other16534.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16533__$1.__extmap,other16534.__extmap)))))))));
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

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5307__auto__,k16532){
var self__ = this;
var this__5307__auto____$1 = this;
var G__16578 = k16532;
var G__16578__$1 = (((G__16578 instanceof cljs.core.Keyword))?G__16578.fqn:null);
switch (G__16578__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k16532);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5308__auto__,k__5309__auto__,G__16531){
var self__ = this;
var this__5308__auto____$1 = this;
var pred__16590 = cljs.core.keyword_identical_QMARK_;
var expr__16591 = k__5309__auto__;
if(cljs.core.truth_((pred__16590.cljs$core$IFn$_invoke$arity$2 ? pred__16590.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__16591) : pred__16590.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__16591)))){
return (new shadow.dom.Coordinate(G__16531,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__16590.cljs$core$IFn$_invoke$arity$2 ? pred__16590.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__16591) : pred__16590.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__16591)))){
return (new shadow.dom.Coordinate(self__.x,G__16531,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5309__auto__,G__16531),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5313__auto__){
var self__ = this;
var this__5313__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5299__auto__,G__16531){
var self__ = this;
var this__5299__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__16531,self__.__extmap,self__.__hash));
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
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__16535){
var extmap__5342__auto__ = (function (){var G__16607 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__16535,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__16535)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__16607);
} else {
return G__16607;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__16535),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__16535),null,cljs.core.not_empty(extmap__5342__auto__),null));
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

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5302__auto__,k16625,else__5303__auto__){
var self__ = this;
var this__5302__auto____$1 = this;
var G__16629 = k16625;
var G__16629__$1 = (((G__16629 instanceof cljs.core.Keyword))?G__16629.fqn:null);
switch (G__16629__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k16625,else__5303__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5320__auto__,f__5321__auto__,init__5322__auto__){
var self__ = this;
var this__5320__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5323__auto__,p__16630){
var vec__16631 = p__16630;
var k__5324__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16631,(0),null);
var v__5325__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16631,(1),null);
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

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__16624){
var self__ = this;
var G__16624__$1 = this;
return (new cljs.core.RecordIter((0),G__16624__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this16626,other16627){
var self__ = this;
var this16626__$1 = this;
return (((!((other16627 == null)))) && ((((this16626__$1.constructor === other16627.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16626__$1.w,other16627.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16626__$1.h,other16627.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16626__$1.__extmap,other16627.__extmap)))))))));
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

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5307__auto__,k16625){
var self__ = this;
var this__5307__auto____$1 = this;
var G__16650 = k16625;
var G__16650__$1 = (((G__16650 instanceof cljs.core.Keyword))?G__16650.fqn:null);
switch (G__16650__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k16625);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5308__auto__,k__5309__auto__,G__16624){
var self__ = this;
var this__5308__auto____$1 = this;
var pred__16662 = cljs.core.keyword_identical_QMARK_;
var expr__16663 = k__5309__auto__;
if(cljs.core.truth_((pred__16662.cljs$core$IFn$_invoke$arity$2 ? pred__16662.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__16663) : pred__16662.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__16663)))){
return (new shadow.dom.Size(G__16624,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__16662.cljs$core$IFn$_invoke$arity$2 ? pred__16662.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__16663) : pred__16662.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__16663)))){
return (new shadow.dom.Size(self__.w,G__16624,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5309__auto__,G__16624),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5313__auto__){
var self__ = this;
var this__5313__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5299__auto__,G__16624){
var self__ = this;
var this__5299__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__16624,self__.__extmap,self__.__hash));
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
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__16628){
var extmap__5342__auto__ = (function (){var G__16678 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__16628,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__16628)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__16678);
} else {
return G__16678;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__16628),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__16628),null,cljs.core.not_empty(extmap__5342__auto__),null));
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
var G__17393 = (i + (1));
var G__17394 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__17393;
ret = G__17394;
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
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__16704){
var vec__16705 = p__16704;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16705,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16705,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__16712 = arguments.length;
switch (G__16712) {
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
var G__17405 = ps;
var G__17406 = (i + (1));
el__$1 = G__17405;
i = G__17406;
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
var vec__16754 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16754,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16754,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16754,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__16764_17419 = cljs.core.seq(props);
var chunk__16765_17420 = null;
var count__16766_17421 = (0);
var i__16767_17422 = (0);
while(true){
if((i__16767_17422 < count__16766_17421)){
var vec__16777_17423 = chunk__16765_17420.cljs$core$IIndexed$_nth$arity$2(null,i__16767_17422);
var k_17424 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16777_17423,(0),null);
var v_17425 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16777_17423,(1),null);
el.setAttributeNS((function (){var temp__5804__auto__ = cljs.core.namespace(k_17424);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_17424),v_17425);


var G__17432 = seq__16764_17419;
var G__17433 = chunk__16765_17420;
var G__17434 = count__16766_17421;
var G__17435 = (i__16767_17422 + (1));
seq__16764_17419 = G__17432;
chunk__16765_17420 = G__17433;
count__16766_17421 = G__17434;
i__16767_17422 = G__17435;
continue;
} else {
var temp__5804__auto___17437 = cljs.core.seq(seq__16764_17419);
if(temp__5804__auto___17437){
var seq__16764_17438__$1 = temp__5804__auto___17437;
if(cljs.core.chunked_seq_QMARK_(seq__16764_17438__$1)){
var c__5525__auto___17439 = cljs.core.chunk_first(seq__16764_17438__$1);
var G__17440 = cljs.core.chunk_rest(seq__16764_17438__$1);
var G__17441 = c__5525__auto___17439;
var G__17442 = cljs.core.count(c__5525__auto___17439);
var G__17443 = (0);
seq__16764_17419 = G__17440;
chunk__16765_17420 = G__17441;
count__16766_17421 = G__17442;
i__16767_17422 = G__17443;
continue;
} else {
var vec__16783_17444 = cljs.core.first(seq__16764_17438__$1);
var k_17445 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16783_17444,(0),null);
var v_17446 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16783_17444,(1),null);
el.setAttributeNS((function (){var temp__5804__auto____$1 = cljs.core.namespace(k_17445);
if(cljs.core.truth_(temp__5804__auto____$1)){
var ns = temp__5804__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_17445),v_17446);


var G__17475 = cljs.core.next(seq__16764_17438__$1);
var G__17476 = null;
var G__17477 = (0);
var G__17478 = (0);
seq__16764_17419 = G__17475;
chunk__16765_17420 = G__17476;
count__16766_17421 = G__17477;
i__16767_17422 = G__17478;
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
var vec__16799 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16799,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16799,(1),null);
var seq__16804_17493 = cljs.core.seq(node_children);
var chunk__16806_17494 = null;
var count__16807_17495 = (0);
var i__16808_17496 = (0);
while(true){
if((i__16808_17496 < count__16807_17495)){
var child_struct_17497 = chunk__16806_17494.cljs$core$IIndexed$_nth$arity$2(null,i__16808_17496);
if((!((child_struct_17497 == null)))){
if(typeof child_struct_17497 === 'string'){
var text_17499 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_17499),child_struct_17497].join(''));
} else {
var children_17500 = shadow.dom.svg_node(child_struct_17497);
if(cljs.core.seq_QMARK_(children_17500)){
var seq__16850_17501 = cljs.core.seq(children_17500);
var chunk__16852_17502 = null;
var count__16853_17503 = (0);
var i__16854_17504 = (0);
while(true){
if((i__16854_17504 < count__16853_17503)){
var child_17506 = chunk__16852_17502.cljs$core$IIndexed$_nth$arity$2(null,i__16854_17504);
if(cljs.core.truth_(child_17506)){
node.appendChild(child_17506);


var G__17507 = seq__16850_17501;
var G__17508 = chunk__16852_17502;
var G__17509 = count__16853_17503;
var G__17510 = (i__16854_17504 + (1));
seq__16850_17501 = G__17507;
chunk__16852_17502 = G__17508;
count__16853_17503 = G__17509;
i__16854_17504 = G__17510;
continue;
} else {
var G__17512 = seq__16850_17501;
var G__17513 = chunk__16852_17502;
var G__17514 = count__16853_17503;
var G__17515 = (i__16854_17504 + (1));
seq__16850_17501 = G__17512;
chunk__16852_17502 = G__17513;
count__16853_17503 = G__17514;
i__16854_17504 = G__17515;
continue;
}
} else {
var temp__5804__auto___17517 = cljs.core.seq(seq__16850_17501);
if(temp__5804__auto___17517){
var seq__16850_17518__$1 = temp__5804__auto___17517;
if(cljs.core.chunked_seq_QMARK_(seq__16850_17518__$1)){
var c__5525__auto___17519 = cljs.core.chunk_first(seq__16850_17518__$1);
var G__17520 = cljs.core.chunk_rest(seq__16850_17518__$1);
var G__17521 = c__5525__auto___17519;
var G__17522 = cljs.core.count(c__5525__auto___17519);
var G__17523 = (0);
seq__16850_17501 = G__17520;
chunk__16852_17502 = G__17521;
count__16853_17503 = G__17522;
i__16854_17504 = G__17523;
continue;
} else {
var child_17536 = cljs.core.first(seq__16850_17518__$1);
if(cljs.core.truth_(child_17536)){
node.appendChild(child_17536);


var G__17537 = cljs.core.next(seq__16850_17518__$1);
var G__17538 = null;
var G__17539 = (0);
var G__17540 = (0);
seq__16850_17501 = G__17537;
chunk__16852_17502 = G__17538;
count__16853_17503 = G__17539;
i__16854_17504 = G__17540;
continue;
} else {
var G__17541 = cljs.core.next(seq__16850_17518__$1);
var G__17542 = null;
var G__17543 = (0);
var G__17544 = (0);
seq__16850_17501 = G__17541;
chunk__16852_17502 = G__17542;
count__16853_17503 = G__17543;
i__16854_17504 = G__17544;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_17500);
}
}


var G__17545 = seq__16804_17493;
var G__17546 = chunk__16806_17494;
var G__17547 = count__16807_17495;
var G__17548 = (i__16808_17496 + (1));
seq__16804_17493 = G__17545;
chunk__16806_17494 = G__17546;
count__16807_17495 = G__17547;
i__16808_17496 = G__17548;
continue;
} else {
var G__17550 = seq__16804_17493;
var G__17551 = chunk__16806_17494;
var G__17552 = count__16807_17495;
var G__17553 = (i__16808_17496 + (1));
seq__16804_17493 = G__17550;
chunk__16806_17494 = G__17551;
count__16807_17495 = G__17552;
i__16808_17496 = G__17553;
continue;
}
} else {
var temp__5804__auto___17554 = cljs.core.seq(seq__16804_17493);
if(temp__5804__auto___17554){
var seq__16804_17555__$1 = temp__5804__auto___17554;
if(cljs.core.chunked_seq_QMARK_(seq__16804_17555__$1)){
var c__5525__auto___17556 = cljs.core.chunk_first(seq__16804_17555__$1);
var G__17557 = cljs.core.chunk_rest(seq__16804_17555__$1);
var G__17558 = c__5525__auto___17556;
var G__17559 = cljs.core.count(c__5525__auto___17556);
var G__17560 = (0);
seq__16804_17493 = G__17557;
chunk__16806_17494 = G__17558;
count__16807_17495 = G__17559;
i__16808_17496 = G__17560;
continue;
} else {
var child_struct_17562 = cljs.core.first(seq__16804_17555__$1);
if((!((child_struct_17562 == null)))){
if(typeof child_struct_17562 === 'string'){
var text_17563 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_17563),child_struct_17562].join(''));
} else {
var children_17564 = shadow.dom.svg_node(child_struct_17562);
if(cljs.core.seq_QMARK_(children_17564)){
var seq__16867_17565 = cljs.core.seq(children_17564);
var chunk__16869_17566 = null;
var count__16870_17567 = (0);
var i__16871_17568 = (0);
while(true){
if((i__16871_17568 < count__16870_17567)){
var child_17570 = chunk__16869_17566.cljs$core$IIndexed$_nth$arity$2(null,i__16871_17568);
if(cljs.core.truth_(child_17570)){
node.appendChild(child_17570);


var G__17571 = seq__16867_17565;
var G__17572 = chunk__16869_17566;
var G__17573 = count__16870_17567;
var G__17574 = (i__16871_17568 + (1));
seq__16867_17565 = G__17571;
chunk__16869_17566 = G__17572;
count__16870_17567 = G__17573;
i__16871_17568 = G__17574;
continue;
} else {
var G__17576 = seq__16867_17565;
var G__17577 = chunk__16869_17566;
var G__17578 = count__16870_17567;
var G__17579 = (i__16871_17568 + (1));
seq__16867_17565 = G__17576;
chunk__16869_17566 = G__17577;
count__16870_17567 = G__17578;
i__16871_17568 = G__17579;
continue;
}
} else {
var temp__5804__auto___17580__$1 = cljs.core.seq(seq__16867_17565);
if(temp__5804__auto___17580__$1){
var seq__16867_17581__$1 = temp__5804__auto___17580__$1;
if(cljs.core.chunked_seq_QMARK_(seq__16867_17581__$1)){
var c__5525__auto___17582 = cljs.core.chunk_first(seq__16867_17581__$1);
var G__17583 = cljs.core.chunk_rest(seq__16867_17581__$1);
var G__17584 = c__5525__auto___17582;
var G__17585 = cljs.core.count(c__5525__auto___17582);
var G__17586 = (0);
seq__16867_17565 = G__17583;
chunk__16869_17566 = G__17584;
count__16870_17567 = G__17585;
i__16871_17568 = G__17586;
continue;
} else {
var child_17588 = cljs.core.first(seq__16867_17581__$1);
if(cljs.core.truth_(child_17588)){
node.appendChild(child_17588);


var G__17589 = cljs.core.next(seq__16867_17581__$1);
var G__17590 = null;
var G__17591 = (0);
var G__17592 = (0);
seq__16867_17565 = G__17589;
chunk__16869_17566 = G__17590;
count__16870_17567 = G__17591;
i__16871_17568 = G__17592;
continue;
} else {
var G__17593 = cljs.core.next(seq__16867_17581__$1);
var G__17594 = null;
var G__17595 = (0);
var G__17596 = (0);
seq__16867_17565 = G__17593;
chunk__16869_17566 = G__17594;
count__16870_17567 = G__17595;
i__16871_17568 = G__17596;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_17564);
}
}


var G__17600 = cljs.core.next(seq__16804_17555__$1);
var G__17601 = null;
var G__17602 = (0);
var G__17603 = (0);
seq__16804_17493 = G__17600;
chunk__16806_17494 = G__17601;
count__16807_17495 = G__17602;
i__16808_17496 = G__17603;
continue;
} else {
var G__17607 = cljs.core.next(seq__16804_17555__$1);
var G__17608 = null;
var G__17609 = (0);
var G__17610 = (0);
seq__16804_17493 = G__17607;
chunk__16806_17494 = G__17608;
count__16807_17495 = G__17609;
i__16808_17496 = G__17610;
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
var len__5726__auto___17614 = arguments.length;
var i__5727__auto___17615 = (0);
while(true){
if((i__5727__auto___17615 < len__5726__auto___17614)){
args__5732__auto__.push((arguments[i__5727__auto___17615]));

var G__17616 = (i__5727__auto___17615 + (1));
i__5727__auto___17615 = G__17616;
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
(shadow.dom.svg.cljs$lang$applyTo = (function (seq16896){
var G__16897 = cljs.core.first(seq16896);
var seq16896__$1 = cljs.core.next(seq16896);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__16897,seq16896__$1);
}));


//# sourceMappingURL=shadow.dom.js.map
