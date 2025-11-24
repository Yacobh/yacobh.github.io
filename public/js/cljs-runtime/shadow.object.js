goog.provide('shadow.object');
shadow.object.console_friendly = shadow.util.console_friendly;
shadow.object.log = shadow.util.log;
shadow.object.debug = shadow.util.log;
shadow.object.info = shadow.util.log;
shadow.object.warn = shadow.util.log;
shadow.object.error = shadow.util.log;
shadow.object.obj_id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
shadow.object.next_id = (function shadow$object$next_id(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(shadow.object.obj_id,cljs.core.inc);
});
shadow.object.object_defs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
shadow.object.behavior_fns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
shadow.object.instances = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
shadow.object.instance_parent = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
shadow.object.instance_children = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
shadow.object.events = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
shadow.object.define_event = (function shadow$object$define_event(event_name,desc,args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(shadow.object.events,cljs.core.assoc,event_name,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),event_name,new cljs.core.Keyword(null,"description","description",-1428560544),desc,new cljs.core.Keyword(null,"args","args",1315556576),args], null));
});
shadow.object.unmunge = (function shadow$object$unmunge(s){
return clojure.string.replace(clojure.string.replace(s,/_DOT_/,"."),/_/,"-");
});
shadow.object.define_event(new cljs.core.Keyword(null,"init","init",-1875481434),"object initialization",cljs.core.PersistentVector.EMPTY);
shadow.object.define_event(new cljs.core.Keyword(null,"destroy","destroy",-843660405),"object descruction",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cause","cause",231901252),"cause of destruction, :parent means the parent was destroyed, :direct is default"], null)], null));
shadow.object.define_event(new cljs.core.Keyword("dom","init","dom/init",-1875647652),"called after the dom was created but has not entered the document yet",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dom","dom",-1236537922),"the dom that was created"], null)], null));
shadow.object.define_event(new cljs.core.Keyword("dom","entered","dom/entered",506699596),"should be called whenever a dom node is added to the document, since that\n   is not in control of this library its up to you to call this\n   use (so/notify-tree! your-obj :dom/entered) to notify the node and every child you created",cljs.core.PersistentVector.EMPTY);
shadow.object.define_event(new cljs.core.Keyword(null,"bind-children-update","bind-children-update",-1610690160),"need to rethink this",cljs.core.PersistentVector.EMPTY);

/**
 * @interface
 */
shadow.object.IObject = function(){};

var shadow$object$IObject$_id$dyn_21423 = (function (this$){
var x__5350__auto__ = (((this$ == null))?null:this$);
var m__5351__auto__ = (shadow.object._id[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5351__auto__.call(null,this$));
} else {
var m__5349__auto__ = (shadow.object._id["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5349__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IObject.-id",this$);
}
}
});
shadow.object._id = (function shadow$object$_id(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$object$IObject$_id$arity$1 == null)))))){
return this$.shadow$object$IObject$_id$arity$1(this$);
} else {
return shadow$object$IObject$_id$dyn_21423(this$);
}
});

var shadow$object$IObject$_type$dyn_21435 = (function (this$){
var x__5350__auto__ = (((this$ == null))?null:this$);
var m__5351__auto__ = (shadow.object._type[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5351__auto__.call(null,this$));
} else {
var m__5349__auto__ = (shadow.object._type["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5349__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IObject.-type",this$);
}
}
});
shadow.object._type = (function shadow$object$_type(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$object$IObject$_type$arity$1 == null)))))){
return this$.shadow$object$IObject$_type$arity$1(this$);
} else {
return shadow$object$IObject$_type$dyn_21435(this$);
}
});

var shadow$object$IObject$_data$dyn_21436 = (function (this$){
var x__5350__auto__ = (((this$ == null))?null:this$);
var m__5351__auto__ = (shadow.object._data[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5351__auto__.call(null,this$));
} else {
var m__5349__auto__ = (shadow.object._data["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5349__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IObject.-data",this$);
}
}
});
shadow.object._data = (function shadow$object$_data(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$object$IObject$_data$arity$1 == null)))))){
return this$.shadow$object$IObject$_data$arity$1(this$);
} else {
return shadow$object$IObject$_data$dyn_21436(this$);
}
});

var shadow$object$IObject$_update$dyn_21441 = (function (this$,update_fn){
var x__5350__auto__ = (((this$ == null))?null:this$);
var m__5351__auto__ = (shadow.object._update[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(this$,update_fn) : m__5351__auto__.call(null,this$,update_fn));
} else {
var m__5349__auto__ = (shadow.object._update["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(this$,update_fn) : m__5349__auto__.call(null,this$,update_fn));
} else {
throw cljs.core.missing_protocol("IObject.-update",this$);
}
}
});
/**
 * update and notify watches
 */
shadow.object._update = (function shadow$object$_update(this$,update_fn){
if((((!((this$ == null)))) && ((!((this$.shadow$object$IObject$_update$arity$2 == null)))))){
return this$.shadow$object$IObject$_update$arity$2(this$,update_fn);
} else {
return shadow$object$IObject$_update$dyn_21441(this$,update_fn);
}
});

var shadow$object$IObject$_destroy_BANG_$dyn_21451 = (function (this$,cause){
var x__5350__auto__ = (((this$ == null))?null:this$);
var m__5351__auto__ = (shadow.object._destroy_BANG_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(this$,cause) : m__5351__auto__.call(null,this$,cause));
} else {
var m__5349__auto__ = (shadow.object._destroy_BANG_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(this$,cause) : m__5349__auto__.call(null,this$,cause));
} else {
throw cljs.core.missing_protocol("IObject.-destroy!",this$);
}
}
});
shadow.object._destroy_BANG_ = (function shadow$object$_destroy_BANG_(this$,cause){
if((((!((this$ == null)))) && ((!((this$.shadow$object$IObject$_destroy_BANG_$arity$2 == null)))))){
return this$.shadow$object$IObject$_destroy_BANG_$arity$2(this$,cause);
} else {
return shadow$object$IObject$_destroy_BANG_$dyn_21451(this$,cause);
}
});

shadow.object.get_type = (function shadow$object$get_type(this$){
return shadow.object._type(this$);
});
shadow.object.get_type_attr = (function shadow$object$get_type_attr(var_args){
var G__20551 = arguments.length;
switch (G__20551) {
case 2:
return shadow.object.get_type_attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.object.get_type_attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.object.get_type_attr.cljs$core$IFn$_invoke$arity$2 = (function (oref,key){
if((oref == null)){
return null;
} else {
var type_id = (((oref instanceof cljs.core.Keyword))?oref:shadow.object._type(oref));
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.object.object_defs),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type_id,key], null));
}
}));

(shadow.object.get_type_attr.cljs$core$IFn$_invoke$arity$3 = (function (oref,key,default$){
if((oref == null)){
return default$;
} else {
var type_id = (((oref instanceof cljs.core.Keyword))?oref:shadow.object._type(oref));
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(shadow.object.object_defs),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type_id,key], null),default$);
}
}));

(shadow.object.get_type_attr.cljs$lang$maxFixedArity = 3);

shadow.object.get_dom = (function shadow$object$get_dom(oref){
return new cljs.core.Keyword("shadow.object","dom","shadow.object/dom",-1238263311).cljs$core$IFn$_invoke$arity$1(oref);
});
goog.exportSymbol('shadow.object.get_dom', shadow.object.get_dom);
shadow.object.get_by_id = (function shadow$object$get_by_id(id){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.object.instances),id);
});
goog.exportSymbol('shadow.object.get_by_id', shadow.object.get_by_id);
shadow.object.get_from_dom = (function shadow$object$get_from_dom(dom){
var oid = shadow.dom.data(dom,new cljs.core.Keyword(null,"oid","oid",-768692334));
if(cljs.core.truth_(oid)){
return shadow.object.get_by_id(parseInt(oid,(10)));
} else {
return null;
}
});
goog.exportSymbol('shadow.object.get_from_dom', shadow.object.get_from_dom);
shadow.object.is_object_QMARK_ = (function shadow$object$is_object_QMARK_(obj_or_dom){
var or__5002__auto__ = (((!((obj_or_dom == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === obj_or_dom.shadow$object$IObject$))))?true:(((!obj_or_dom.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(shadow.object.IObject,obj_or_dom):false)):cljs.core.native_satisfies_QMARK_(shadow.object.IObject,obj_or_dom));
if(or__5002__auto__){
return or__5002__auto__;
} else {
return shadow.object.get_from_dom(obj_or_dom);
}
});
shadow.object.equal_QMARK_ = (function shadow$object$equal_QMARK_(obj,obj_or_dom){
if((((!((obj == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === obj.shadow$object$IObject$))))?true:(((!obj.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(shadow.object.IObject,obj):false)):cljs.core.native_satisfies_QMARK_(shadow.object.IObject,obj))){
} else {
throw (new Error(["Assert failed: ","can only test objects","\n","(satisfies? IObject obj)"].join('')));
}

if((((!((obj_or_dom == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === obj_or_dom.shadow$object$IObject$))))?true:(((!obj_or_dom.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(shadow.object.IObject,obj_or_dom):false)):cljs.core.native_satisfies_QMARK_(shadow.object.IObject,obj_or_dom))){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(shadow.object._id(obj),shadow.object._id(obj_or_dom));
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(shadow.object._id(obj),(function (){var temp__5804__auto__ = shadow.dom.data(obj_or_dom,new cljs.core.Keyword(null,"oid","oid",-768692334));
if(cljs.core.truth_(temp__5804__auto__)){
var oid = temp__5804__auto__;
return parseInt(oid,(10));
} else {
return null;
}
})());
}
});
shadow.object.get_parent = (function shadow$object$get_parent(oref){
var temp__5804__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.object.instance_parent),shadow.object._id(oref));
if(cljs.core.truth_(temp__5804__auto__)){
var parent_id = temp__5804__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.object.instances),parent_id);
} else {
return null;
}
});
goog.exportSymbol('shadow.object.get_parent', shadow.object.get_parent);
shadow.object.get_parent_of_type = (function shadow$object$get_parent_of_type(oref,parent_type){
var parent = new cljs.core.Keyword(null,"parent","parent",-878878779).cljs$core$IFn$_invoke$arity$1(oref);
while(true){
if(cljs.core.truth_(parent)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(shadow.object._type(parent),parent_type)){
return parent;
} else {
var G__21481 = new cljs.core.Keyword(null,"parent","parent",-878878779).cljs$core$IFn$_invoke$arity$1(parent);
parent = G__21481;
continue;
}
} else {
return null;
}
break;
}
});
goog.exportSymbol('shadow.object.get_parent_of_type', shadow.object.get_parent_of_type);
shadow.object.get_children = (function shadow$object$get_children(parent){
var parent_id = shadow.object._id(parent);
var child_ids = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(shadow.object.instance_children),parent_id,cljs.core.PersistentVector.EMPTY);
var instances = cljs.core.deref(shadow.object.instances);
return cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__20596_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(instances,p1__20596_SHARP_);
}),child_ids));
});
goog.exportSymbol('shadow.object.get_children', shadow.object.get_children);
shadow.object.tree_seq = (function shadow$object$tree_seq(var_args){
var G__20603 = arguments.length;
switch (G__20603) {
case 1:
return shadow.object.tree_seq.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.object.tree_seq.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('shadow.object.tree_seq', shadow.object.tree_seq);

(shadow.object.tree_seq.cljs$core$IFn$_invoke$arity$1 = (function (root){
return shadow.object.tree_seq.cljs$core$IFn$_invoke$arity$2(root,(function (node){
return true;
}));
}));

(shadow.object.tree_seq.cljs$core$IFn$_invoke$arity$2 = (function (root,branch_QMARK_){
return cljs.core.tree_seq(branch_QMARK_,shadow.object.get_children,root);
}));

(shadow.object.tree_seq.cljs$lang$maxFixedArity = 2);

shadow.object.get_children_of_type = (function shadow$object$get_children_of_type(oref,type){
var type_kw = (((type instanceof cljs.core.Keyword))?type:shadow.object._type(type));
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__20622_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(type_kw,shadow.object._type(p1__20622_SHARP_));
}),shadow.object.get_children(oref));
});
/**
 * basically (get-children (:parent this))
 */
shadow.object.get_siblings = (function shadow$object$get_siblings(p__20626){
var map__20627 = p__20626;
var map__20627__$1 = cljs.core.__destructure_map(map__20627);
var oref = map__20627__$1;
var parent = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20627__$1,new cljs.core.Keyword(null,"parent","parent",-878878779));
if(cljs.core.truth_(parent)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("object has no parent, thus has no siblings",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"oref","oref",-1547494840),oref], null));
}

return shadow.object.get_children(parent);
});
/**
 * returns set of all siblings of a common type
 */
shadow.object.get_siblings_of_type = (function shadow$object$get_siblings_of_type(var_args){
var G__20636 = arguments.length;
switch (G__20636) {
case 1:
return shadow.object.get_siblings_of_type.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.object.get_siblings_of_type.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.object.get_siblings_of_type.cljs$core$IFn$_invoke$arity$1 = (function (oref){
return shadow.object.get_siblings_of_type.cljs$core$IFn$_invoke$arity$2(oref,oref);
}));

(shadow.object.get_siblings_of_type.cljs$core$IFn$_invoke$arity$2 = (function (oref,type){
var type_kw = (((type instanceof cljs.core.Keyword))?type:shadow.object._type(type));
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__20631_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(type_kw,shadow.object._type(p1__20631_SHARP_));
}),shadow.object.get_siblings(oref));
}));

(shadow.object.get_siblings_of_type.cljs$lang$maxFixedArity = 2);

shadow.object.get_collection_item = (function shadow$object$get_collection_item(oref){
var item_key = new cljs.core.Keyword("shadow.object","coll-item-key","shadow.object/coll-item-key",1888444366).cljs$core$IFn$_invoke$arity$1(oref);
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(oref,item_key);
});
/**
 * find the object that contains this dom node
 */
shadow.object.find_containing_object = (function shadow$object$find_containing_object(dom){
while(true){
var temp__5802__auto__ = shadow.object.get_from_dom(dom);
if(cljs.core.truth_(temp__5802__auto__)){
var obj = temp__5802__auto__;
return obj;
} else {
var temp__5804__auto__ = dom.parentElement;
if(cljs.core.truth_(temp__5804__auto__)){
var parent = temp__5804__auto__;
var G__21539 = parent;
dom = G__21539;
continue;
} else {
return null;
}
}
break;
}
});
shadow.object.notify_BANG_ = (function shadow$object$notify_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___21541 = arguments.length;
var i__5727__auto___21546 = (0);
while(true){
if((i__5727__auto___21546 < len__5726__auto___21541)){
args__5732__auto__.push((arguments[i__5727__auto___21546]));

var G__21548 = (i__5727__auto___21546 + (1));
i__5727__auto___21546 = G__21548;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return shadow.object.notify_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(shadow.object.notify_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (oref,ev,args){
var temp__5804__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(oref,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("shadow.object","reactions","shadow.object/reactions",1966199633),ev], null));
if(cljs.core.truth_(temp__5804__auto__)){
var reactions_to_trigger = temp__5804__auto__;
var seq__20665 = cljs.core.seq(reactions_to_trigger);
var chunk__20666 = null;
var count__20667 = (0);
var i__20668 = (0);
while(true){
if((i__20668 < count__20667)){
var rfn = chunk__20666.cljs$core$IIndexed$_nth$arity$2(null,i__20668);
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(rfn,cljs.core.cons(oref,args));


var G__21571 = seq__20665;
var G__21572 = chunk__20666;
var G__21573 = count__20667;
var G__21574 = (i__20668 + (1));
seq__20665 = G__21571;
chunk__20666 = G__21572;
count__20667 = G__21573;
i__20668 = G__21574;
continue;
} else {
var temp__5804__auto____$1 = cljs.core.seq(seq__20665);
if(temp__5804__auto____$1){
var seq__20665__$1 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__20665__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__20665__$1);
var G__21589 = cljs.core.chunk_rest(seq__20665__$1);
var G__21590 = c__5525__auto__;
var G__21591 = cljs.core.count(c__5525__auto__);
var G__21592 = (0);
seq__20665 = G__21589;
chunk__20666 = G__21590;
count__20667 = G__21591;
i__20668 = G__21592;
continue;
} else {
var rfn = cljs.core.first(seq__20665__$1);
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(rfn,cljs.core.cons(oref,args));


var G__21602 = cljs.core.next(seq__20665__$1);
var G__21603 = null;
var G__21604 = (0);
var G__21605 = (0);
seq__20665 = G__21602;
chunk__20666 = G__21603;
count__20667 = G__21604;
i__20668 = G__21605;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}));

(shadow.object.notify_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.object.notify_BANG_.cljs$lang$applyTo = (function (seq20654){
var G__20655 = cljs.core.first(seq20654);
var seq20654__$1 = cljs.core.next(seq20654);
var G__20656 = cljs.core.first(seq20654__$1);
var seq20654__$2 = cljs.core.next(seq20654__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__20655,G__20656,seq20654__$2);
}));

shadow.object.do_notify_tree = (function shadow$object$do_notify_tree(current_obj,ev,notify_fn){
var seq__20692_21634 = cljs.core.seq(shadow.object.get_children(current_obj));
var chunk__20693_21635 = null;
var count__20694_21636 = (0);
var i__20695_21637 = (0);
while(true){
if((i__20695_21637 < count__20694_21636)){
var child_21638 = chunk__20693_21635.cljs$core$IIndexed$_nth$arity$2(null,i__20695_21637);
(shadow.object.do_notify_tree.cljs$core$IFn$_invoke$arity$3 ? shadow.object.do_notify_tree.cljs$core$IFn$_invoke$arity$3(child_21638,ev,notify_fn) : shadow.object.do_notify_tree.call(null,child_21638,ev,notify_fn));


var G__21639 = seq__20692_21634;
var G__21640 = chunk__20693_21635;
var G__21641 = count__20694_21636;
var G__21642 = (i__20695_21637 + (1));
seq__20692_21634 = G__21639;
chunk__20693_21635 = G__21640;
count__20694_21636 = G__21641;
i__20695_21637 = G__21642;
continue;
} else {
var temp__5804__auto___21643 = cljs.core.seq(seq__20692_21634);
if(temp__5804__auto___21643){
var seq__20692_21644__$1 = temp__5804__auto___21643;
if(cljs.core.chunked_seq_QMARK_(seq__20692_21644__$1)){
var c__5525__auto___21645 = cljs.core.chunk_first(seq__20692_21644__$1);
var G__21646 = cljs.core.chunk_rest(seq__20692_21644__$1);
var G__21647 = c__5525__auto___21645;
var G__21648 = cljs.core.count(c__5525__auto___21645);
var G__21649 = (0);
seq__20692_21634 = G__21646;
chunk__20693_21635 = G__21647;
count__20694_21636 = G__21648;
i__20695_21637 = G__21649;
continue;
} else {
var child_21650 = cljs.core.first(seq__20692_21644__$1);
(shadow.object.do_notify_tree.cljs$core$IFn$_invoke$arity$3 ? shadow.object.do_notify_tree.cljs$core$IFn$_invoke$arity$3(child_21650,ev,notify_fn) : shadow.object.do_notify_tree.call(null,child_21650,ev,notify_fn));


var G__21651 = cljs.core.next(seq__20692_21644__$1);
var G__21652 = null;
var G__21653 = (0);
var G__21654 = (0);
seq__20692_21634 = G__21651;
chunk__20693_21635 = G__21652;
count__20694_21636 = G__21653;
i__20695_21637 = G__21654;
continue;
}
} else {
}
}
break;
}

return (notify_fn.cljs$core$IFn$_invoke$arity$1 ? notify_fn.cljs$core$IFn$_invoke$arity$1(current_obj) : notify_fn.call(null,current_obj));
});
shadow.object.notify_tree_BANG_ = (function shadow$object$notify_tree_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___21663 = arguments.length;
var i__5727__auto___21664 = (0);
while(true){
if((i__5727__auto___21664 < len__5726__auto___21663)){
args__5732__auto__.push((arguments[i__5727__auto___21664]));

var G__21665 = (i__5727__auto___21664 + (1));
i__5727__auto___21664 = G__21665;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return shadow.object.notify_tree_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(shadow.object.notify_tree_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (oref,ev,args){
var notify_fn = (function (obj){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(shadow.object.notify_BANG_,obj,ev,args);
});
return shadow.object.do_notify_tree(oref,ev,notify_fn);
}));

(shadow.object.notify_tree_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.object.notify_tree_BANG_.cljs$lang$applyTo = (function (seq20728){
var G__20729 = cljs.core.first(seq20728);
var seq20728__$1 = cljs.core.next(seq20728);
var G__20730 = cljs.core.first(seq20728__$1);
var seq20728__$2 = cljs.core.next(seq20728__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__20729,G__20730,seq20728__$2);
}));

shadow.object.notify_down_BANG_ = shadow.object.notify_tree_BANG_;
shadow.object.notify_up_BANG_ = (function shadow$object$notify_up_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___21682 = arguments.length;
var i__5727__auto___21683 = (0);
while(true){
if((i__5727__auto___21683 < len__5726__auto___21682)){
args__5732__auto__.push((arguments[i__5727__auto___21683]));

var G__21684 = (i__5727__auto___21683 + (1));
i__5727__auto___21683 = G__21684;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return shadow.object.notify_up_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(shadow.object.notify_up_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (oref,ev,args){
var current = shadow.object.get_parent(oref);
while(true){
if(cljs.core.truth_(current)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$4(shadow.object.notify_BANG_,current,ev,args);

var G__21687 = shadow.object.get_parent(current);
current = G__21687;
continue;
} else {
return null;
}
break;
}
}));

(shadow.object.notify_up_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.object.notify_up_BANG_.cljs$lang$applyTo = (function (seq20740){
var G__20741 = cljs.core.first(seq20740);
var seq20740__$1 = cljs.core.next(seq20740);
var G__20742 = cljs.core.first(seq20740__$1);
var seq20740__$2 = cljs.core.next(seq20740__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__20741,G__20742,seq20740__$2);
}));

shadow.object.update_BANG_ = (function shadow$object$update_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___21696 = arguments.length;
var i__5727__auto___21697 = (0);
while(true){
if((i__5727__auto___21697 < len__5726__auto___21696)){
args__5732__auto__.push((arguments[i__5727__auto___21697]));

var G__21698 = (i__5727__auto___21697 + (1));
i__5727__auto___21697 = G__21698;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return shadow.object.update_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(shadow.object.update_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (oref,update_fn,args){
if(cljs.core.fn_QMARK_(update_fn)){
} else {
throw ["update! expects a fn as second arg, not ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([update_fn], 0))].join('');
}

var id = shadow.object._id(oref);
var data = shadow.object._data(oref);
var work_fn = (function (data__$1){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(update_fn,data__$1,args);
});
return shadow.object._update(oref,work_fn);
}));

(shadow.object.update_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.object.update_BANG_.cljs$lang$applyTo = (function (seq20763){
var G__20765 = cljs.core.first(seq20763);
var seq20763__$1 = cljs.core.next(seq20763);
var G__20766 = cljs.core.first(seq20763__$1);
var seq20763__$2 = cljs.core.next(seq20763__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__20765,G__20766,seq20763__$2);
}));

shadow.object.return_value = (function shadow$object$return_value(oref,return_value){
return shadow.object.update_BANG_.cljs$core$IFn$_invoke$arity$variadic(oref,cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("shadow.object","return-value","shadow.object/return-value",1397593360),return_value], 0));
});
shadow.object.set_parent_BANG_ = (function shadow$object$set_parent_BANG_(child,parent){
var child_id = shadow.object._id(child);
var parent_id = shadow.object._id(parent);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(shadow.object.instance_parent,cljs.core.assoc,child_id,parent_id);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(shadow.object.instance_children,(function (x){
var current = cljs.core.get.cljs$core$IFn$_invoke$arity$3(x,parent_id,cljs.core.PersistentHashSet.EMPTY);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(x,parent_id,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(current,child_id));
}));

return true;
});
shadow.object.dom_destroy = (function shadow$object$dom_destroy(this$,cause){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cause,new cljs.core.Keyword(null,"parent","parent",-878878779))){
return shadow.dom.remove(new cljs.core.Keyword("shadow.object","dom","shadow.object/dom",-1238263311).cljs$core$IFn$_invoke$arity$1(this$));
} else {
var temp__5802__auto__ = shadow.object.get_type_attr.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.Keyword("dom","remove","dom/remove",-131527420));
if(cljs.core.truth_(temp__5802__auto__)){
var custom_remove = temp__5802__auto__;
var G__20791 = this$;
var G__20792 = new cljs.core.Keyword("shadow.object","dom","shadow.object/dom",-1238263311).cljs$core$IFn$_invoke$arity$1(this$);
return (custom_remove.cljs$core$IFn$_invoke$arity$2 ? custom_remove.cljs$core$IFn$_invoke$arity$2(G__20791,G__20792) : custom_remove.call(null,G__20791,G__20792));
} else {
return shadow.dom.remove(new cljs.core.Keyword("shadow.object","dom","shadow.object/dom",-1238263311).cljs$core$IFn$_invoke$arity$1(this$));
}
}
});
shadow.object.destroy_BANG_ = (function shadow$object$destroy_BANG_(var_args){
var G__20796 = arguments.length;
switch (G__20796) {
case 1:
return shadow.object.destroy_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.object.destroy_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.object.destroy_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (oref){
return shadow.object.destroy_BANG_.cljs$core$IFn$_invoke$arity$2(oref,new cljs.core.Keyword(null,"direct","direct",-1775717856));
}));

(shadow.object.destroy_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (oref,cause){
return shadow.object._destroy_BANG_(oref,cause);
}));

(shadow.object.destroy_BANG_.cljs$lang$maxFixedArity = 2);

shadow.object.bind_dom_events = (function shadow$object$bind_dom_events(oref,dom,dom_events){
if((cljs.core.rem(cljs.core.count(dom_events),(2)) === (0))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("object defined invalid event",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"object-type","object-type",-1889869015),shadow.object._type(oref),new cljs.core.Keyword("dom","events","dom/events",1793437527),dom_events], null));
}

var seq__20809 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),dom_events));
var chunk__20810 = null;
var count__20811 = (0);
var i__20812 = (0);
while(true){
if((i__20812 < count__20811)){
var vec__20839 = chunk__20810.cljs$core$IIndexed$_nth$arity$2(null,i__20812);
var ev = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20839,(0),null);
var handler = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20839,(1),null);
var ev_def = vec__20839;
if((handler == null)){
throw ["ev with nil handler ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([ev], 0))].join('');
} else {
}

var handler_21727__$1 = (((handler instanceof cljs.core.Keyword))?((function (seq__20809,chunk__20810,count__20811,i__20812,vec__20839,ev,handler,ev_def){
return (function (this$,e,el){
return shadow.object.notify_BANG_.cljs$core$IFn$_invoke$arity$variadic(this$,handler,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([e,el], 0));
});})(seq__20809,chunk__20810,count__20811,i__20812,vec__20839,ev,handler,ev_def))
:handler);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(dom,ev,((function (seq__20809,chunk__20810,count__20811,i__20812,handler_21727__$1,vec__20839,ev,handler,ev_def){
return (function shadow$object$bind_dom_events_$_dom_event_handler(e,el){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",el.tagName)){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);
} else {
}

return (handler_21727__$1.cljs$core$IFn$_invoke$arity$3 ? handler_21727__$1.cljs$core$IFn$_invoke$arity$3(oref,e,el) : handler_21727__$1.call(null,oref,e,el));
});})(seq__20809,chunk__20810,count__20811,i__20812,handler_21727__$1,vec__20839,ev,handler,ev_def))
);


var G__21731 = seq__20809;
var G__21732 = chunk__20810;
var G__21733 = count__20811;
var G__21734 = (i__20812 + (1));
seq__20809 = G__21731;
chunk__20810 = G__21732;
count__20811 = G__21733;
i__20812 = G__21734;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__20809);
if(temp__5804__auto__){
var seq__20809__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20809__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__20809__$1);
var G__21742 = cljs.core.chunk_rest(seq__20809__$1);
var G__21743 = c__5525__auto__;
var G__21744 = cljs.core.count(c__5525__auto__);
var G__21745 = (0);
seq__20809 = G__21742;
chunk__20810 = G__21743;
count__20811 = G__21744;
i__20812 = G__21745;
continue;
} else {
var vec__20862 = cljs.core.first(seq__20809__$1);
var ev = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20862,(0),null);
var handler = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20862,(1),null);
var ev_def = vec__20862;
if((handler == null)){
throw ["ev with nil handler ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([ev], 0))].join('');
} else {
}

var handler_21747__$1 = (((handler instanceof cljs.core.Keyword))?((function (seq__20809,chunk__20810,count__20811,i__20812,vec__20862,ev,handler,ev_def,seq__20809__$1,temp__5804__auto__){
return (function (this$,e,el){
return shadow.object.notify_BANG_.cljs$core$IFn$_invoke$arity$variadic(this$,handler,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([e,el], 0));
});})(seq__20809,chunk__20810,count__20811,i__20812,vec__20862,ev,handler,ev_def,seq__20809__$1,temp__5804__auto__))
:handler);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(dom,ev,((function (seq__20809,chunk__20810,count__20811,i__20812,handler_21747__$1,vec__20862,ev,handler,ev_def,seq__20809__$1,temp__5804__auto__){
return (function shadow$object$bind_dom_events_$_dom_event_handler(e,el){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("A",el.tagName)){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);
} else {
}

return (handler_21747__$1.cljs$core$IFn$_invoke$arity$3 ? handler_21747__$1.cljs$core$IFn$_invoke$arity$3(oref,e,el) : handler_21747__$1.call(null,oref,e,el));
});})(seq__20809,chunk__20810,count__20811,i__20812,handler_21747__$1,vec__20862,ev,handler,ev_def,seq__20809__$1,temp__5804__auto__))
);


var G__21751 = cljs.core.next(seq__20809__$1);
var G__21752 = null;
var G__21753 = (0);
var G__21754 = (0);
seq__20809 = G__21751;
chunk__20810 = G__21752;
count__20811 = G__21753;
i__20812 = G__21754;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.object.reaction_merge = (function shadow$object$reaction_merge(result,p__20879){
var vec__20888 = p__20879;
var event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20888,(0),null);
var handler = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20888,(1),null);
if(cljs.core.truth_((function (){var and__5000__auto__ = event;
if(cljs.core.truth_(and__5000__auto__)){
return handler;
} else {
return and__5000__auto__;
}
})())){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid reaction",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"event","event",301435442),event,new cljs.core.Keyword(null,"handler","handler",-195596612),handler], null));
}

var current = cljs.core.get.cljs$core$IFn$_invoke$arity$3(result,event,cljs.core.List.EMPTY);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(result,event,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(current,handler));
});
shadow.object.merge_reactions = (function shadow$object$merge_reactions(result,behavior){
if(cljs.core.sequential_QMARK_(behavior)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("behaviors must be vectors",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"behavior","behavior",1202392908),behavior], null));
}

if(cljs.core.even_QMARK_(cljs.core.count(behavior))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid behavior",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"behavior","behavior",1202392908),behavior], null));
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(shadow.object.reaction_merge,result,cljs.core.reverse(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),behavior)));
});
shadow.object.merge_behaviors = (function shadow$object$merge_behaviors(result,behavior){
if(cljs.core.sequential_QMARK_(behavior)){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("shadow.object","reactions","shadow.object/reactions",1966199633)], null),shadow.object.merge_reactions,behavior);
} else {
if(cljs.core.map_QMARK_(behavior)){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("shadow.object","reactions","shadow.object/reactions",1966199633)], null),shadow.object.merge_reactions,new cljs.core.Keyword(null,"on","on",173873944).cljs$core$IFn$_invoke$arity$2(behavior,cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"watch","watch",380988277)], null),(function (watches){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(watches,new cljs.core.Keyword(null,"watch","watch",380988277).cljs$core$IFn$_invoke$arity$2(behavior,cljs.core.PersistentVector.EMPTY));
})),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("dom","events","dom/events",1793437527)], null),(function (default$){
return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(default$,new cljs.core.Keyword("dom","events","dom/events",1793437527).cljs$core$IFn$_invoke$arity$2(behavior,cljs.core.PersistentVector.EMPTY)));
}));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("behavior not understood",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"behavior","behavior",1202392908),behavior], null));

}
}
});
shadow.object.define = (function shadow$object$define(var_args){
var args__5732__auto__ = [];
var len__5726__auto___21769 = arguments.length;
var i__5727__auto___21770 = (0);
while(true){
if((i__5727__auto___21770 < len__5726__auto___21769)){
args__5732__auto__.push((arguments[i__5727__auto___21770]));

var G__21771 = (i__5727__auto___21770 + (1));
i__5727__auto___21770 = G__21771;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return shadow.object.define.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(shadow.object.define.cljs$core$IFn$_invoke$arity$variadic = (function (id,args){
if((id instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("object id needs to be a keyword",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"args","args",1315556576),args], null));
}

if(cljs.core.even_QMARK_(cljs.core.count(args))){
} else {
throw ["invalid object definition ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(id)," args: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([args], 0))].join('');
}

if(cljs.core.contains_QMARK_(cljs.core.deref(shadow.object.object_defs),id)){
console.warn(["object already defined ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(id)].join(''));
} else {
}

try{var odef = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,args);
var reactions = shadow.object.merge_reactions(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"on","on",173873944).cljs$core$IFn$_invoke$arity$2(odef,cljs.core.PersistentVector.EMPTY));
var odef__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(odef,new cljs.core.Keyword("shadow.object","id","shadow.object/id",-647954841),id,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("shadow.object","reactions","shadow.object/reactions",1966199633),reactions], 0));
var odef__$2 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(shadow.object.merge_behaviors,odef__$1,cljs.core.reverse(new cljs.core.Keyword(null,"behaviors","behaviors",120724909).cljs$core$IFn$_invoke$arity$2(odef__$1,cljs.core.PersistentVector.EMPTY)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(shadow.object.object_defs,cljs.core.assoc,id,odef__$2);

return odef__$2;
}catch (e20929){if((e20929 instanceof Object)){
var e = e20929;
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("failed to define object",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"args","args",1315556576),args], null));
} else {
throw e20929;

}
}}));

(shadow.object.define.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.object.define.cljs$lang$applyTo = (function (seq20914){
var G__20915 = cljs.core.first(seq20914);
var seq20914__$1 = cljs.core.next(seq20914);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__20915,seq20914__$1);
}));

shadow.object.merge_defaults = (function shadow$object$merge_defaults(data,type){
var defaults = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.object.object_defs),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,new cljs.core.Keyword(null,"defaults","defaults",976027214)], null));
if((defaults == null)){
return data;
} else {
if(cljs.core.map_QMARK_(defaults)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([defaults,data], 0));
} else {
if(cljs.core.fn_QMARK_(defaults)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(defaults.cljs$core$IFn$_invoke$arity$0 ? defaults.cljs$core$IFn$_invoke$arity$0() : defaults.call(null)),data], 0));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid object defaults",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"defaults","defaults",976027214),defaults,new cljs.core.Keyword(null,"type","type",1174270348),type], null));

}
}
}
});
shadow.object.make_dom = (function shadow$object$make_dom(var_args){
var G__20944 = arguments.length;
switch (G__20944) {
case 3:
return shadow.object.make_dom.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.object.make_dom.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.object.make_dom.cljs$core$IFn$_invoke$arity$3 = (function (oref,dom_key,events_key){
return shadow.object.make_dom.cljs$core$IFn$_invoke$arity$4(oref,dom_key,events_key,null);
}));

(shadow.object.make_dom.cljs$core$IFn$_invoke$arity$4 = (function (oref,dom_key,events_key,value){
var dom_fn = (((dom_key instanceof cljs.core.Keyword))?shadow.object.get_type_attr.cljs$core$IFn$_invoke$arity$2(oref,dom_key):dom_key);
var events = (((events_key instanceof cljs.core.Keyword))?shadow.object.get_type_attr.cljs$core$IFn$_invoke$arity$3(oref,events_key,cljs.core.PersistentVector.EMPTY):events_key);
var dom = (function (){var G__20945 = (dom_fn.cljs$core$IFn$_invoke$arity$2 ? dom_fn.cljs$core$IFn$_invoke$arity$2(oref,value) : dom_fn.call(null,oref,value));
return (shadow.dom.build.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.build.cljs$core$IFn$_invoke$arity$1(G__20945) : shadow.dom.build.call(null,G__20945));
})();
shadow.object.bind_dom_events(oref,dom,events);

return dom;
}));

(shadow.object.make_dom.cljs$lang$maxFixedArity = 4);

shadow.object.alive_QMARK_ = (function shadow$object$alive_QMARK_(obj){
return cljs.core.contains_QMARK_(cljs.core.deref(shadow.object.instances),shadow.object._id(obj));
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
shadow.object.Watch = (function (key,handler,__meta,__extmap,__hash){
this.key = key;
this.handler = handler;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.object.Watch.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5300__auto__,k__5301__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return this__5300__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5301__auto__,null);
}));

(shadow.object.Watch.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5302__auto__,k20951,else__5303__auto__){
var self__ = this;
var this__5302__auto____$1 = this;
var G__20965 = k20951;
var G__20965__$1 = (((G__20965 instanceof cljs.core.Keyword))?G__20965.fqn:null);
switch (G__20965__$1) {
case "key":
return self__.key;

break;
case "handler":
return self__.handler;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k20951,else__5303__auto__);

}
}));

(shadow.object.Watch.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5320__auto__,f__5321__auto__,init__5322__auto__){
var self__ = this;
var this__5320__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5323__auto__,p__20976){
var vec__20978 = p__20976;
var k__5324__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20978,(0),null);
var v__5325__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20978,(1),null);
return (f__5321__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5321__auto__.cljs$core$IFn$_invoke$arity$3(ret__5323__auto__,k__5324__auto__,v__5325__auto__) : f__5321__auto__.call(null,ret__5323__auto__,k__5324__auto__,v__5325__auto__));
}),init__5322__auto__,this__5320__auto____$1);
}));

(shadow.object.Watch.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5315__auto__,writer__5316__auto__,opts__5317__auto__){
var self__ = this;
var this__5315__auto____$1 = this;
var pr_pair__5318__auto__ = (function (keyval__5319__auto__){
return cljs.core.pr_sequential_writer(writer__5316__auto__,cljs.core.pr_writer,""," ","",opts__5317__auto__,keyval__5319__auto__);
});
return cljs.core.pr_sequential_writer(writer__5316__auto__,pr_pair__5318__auto__,"#shadow.object.Watch{",", ","}",opts__5317__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"key","key",-1516042587),self__.key],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"handler","handler",-195596612),self__.handler],null))], null),self__.__extmap));
}));

(shadow.object.Watch.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__20950){
var self__ = this;
var G__20950__$1 = this;
return (new cljs.core.RecordIter((0),G__20950__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"handler","handler",-195596612)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.object.Watch.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5298__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
return self__.__meta;
}));

(shadow.object.Watch.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5295__auto__){
var self__ = this;
var this__5295__auto____$1 = this;
return (new shadow.object.Watch(self__.key,self__.handler,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.object.Watch.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5304__auto__){
var self__ = this;
var this__5304__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.object.Watch.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5296__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
var h__5111__auto__ = self__.__hash;
if((!((h__5111__auto__ == null)))){
return h__5111__auto__;
} else {
var h__5111__auto____$1 = (function (coll__5297__auto__){
return (-17677043 ^ cljs.core.hash_unordered_coll(coll__5297__auto__));
})(this__5296__auto____$1);
(self__.__hash = h__5111__auto____$1);

return h__5111__auto____$1;
}
}));

(shadow.object.Watch.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this20952,other20953){
var self__ = this;
var this20952__$1 = this;
return (((!((other20953 == null)))) && ((((this20952__$1.constructor === other20953.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this20952__$1.key,other20953.key)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this20952__$1.handler,other20953.handler)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this20952__$1.__extmap,other20953.__extmap)))))))));
}));

(shadow.object.Watch.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5310__auto__,k__5311__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),null,new cljs.core.Keyword(null,"handler","handler",-195596612),null], null), null),k__5311__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5310__auto____$1),self__.__meta),k__5311__auto__);
} else {
return (new shadow.object.Watch(self__.key,self__.handler,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5311__auto__)),null));
}
}));

(shadow.object.Watch.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5307__auto__,k20951){
var self__ = this;
var this__5307__auto____$1 = this;
var G__21008 = k20951;
var G__21008__$1 = (((G__21008 instanceof cljs.core.Keyword))?G__21008.fqn:null);
switch (G__21008__$1) {
case "key":
case "handler":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k20951);

}
}));

(shadow.object.Watch.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5308__auto__,k__5309__auto__,G__20950){
var self__ = this;
var this__5308__auto____$1 = this;
var pred__21010 = cljs.core.keyword_identical_QMARK_;
var expr__21011 = k__5309__auto__;
if(cljs.core.truth_((pred__21010.cljs$core$IFn$_invoke$arity$2 ? pred__21010.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"key","key",-1516042587),expr__21011) : pred__21010.call(null,new cljs.core.Keyword(null,"key","key",-1516042587),expr__21011)))){
return (new shadow.object.Watch(G__20950,self__.handler,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__21010.cljs$core$IFn$_invoke$arity$2 ? pred__21010.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"handler","handler",-195596612),expr__21011) : pred__21010.call(null,new cljs.core.Keyword(null,"handler","handler",-195596612),expr__21011)))){
return (new shadow.object.Watch(self__.key,G__20950,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.object.Watch(self__.key,self__.handler,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5309__auto__,G__20950),null));
}
}
}));

(shadow.object.Watch.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5313__auto__){
var self__ = this;
var this__5313__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"key","key",-1516042587),self__.key,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"handler","handler",-195596612),self__.handler,null))], null),self__.__extmap));
}));

(shadow.object.Watch.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5299__auto__,G__20950){
var self__ = this;
var this__5299__auto____$1 = this;
return (new shadow.object.Watch(self__.key,self__.handler,G__20950,self__.__extmap,self__.__hash));
}));

(shadow.object.Watch.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5305__auto__,entry__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5306__auto__)){
return this__5305__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5306__auto__,(0)),cljs.core._nth(entry__5306__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5305__auto____$1,entry__5306__auto__);
}
}));

(shadow.object.Watch.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"key","key",124488940,null),new cljs.core.Symbol(null,"handler","handler",1444934915,null)], null);
}));

(shadow.object.Watch.cljs$lang$type = true);

(shadow.object.Watch.cljs$lang$ctorPrSeq = (function (this__5346__auto__){
return (new cljs.core.List(null,"shadow.object/Watch",null,(1),null));
}));

(shadow.object.Watch.cljs$lang$ctorPrWriter = (function (this__5346__auto__,writer__5347__auto__){
return cljs.core._write(writer__5347__auto__,"shadow.object/Watch");
}));

/**
 * Positional factory function for shadow.object/Watch.
 */
shadow.object.__GT_Watch = (function shadow$object$__GT_Watch(key,handler){
return (new shadow.object.Watch(key,handler,null,null,null));
});

/**
 * Factory function for shadow.object/Watch, taking a map of keywords to field values.
 */
shadow.object.map__GT_Watch = (function shadow$object$map__GT_Watch(G__20958){
var extmap__5342__auto__ = (function (){var G__21017 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__20958,new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"handler","handler",-195596612)], 0));
if(cljs.core.record_QMARK_(G__20958)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__21017);
} else {
return G__21017;
}
})();
return (new shadow.object.Watch(new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(G__20958),new cljs.core.Keyword(null,"handler","handler",-195596612).cljs$core$IFn$_invoke$arity$1(G__20958),null,cljs.core.not_empty(extmap__5342__auto__),null));
});


/**
* @constructor
 * @implements {cljs.core.IWatchable}
 * @implements {cljs.core.IEquiv}
 * @implements {shadow.object.IObject}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IDeref}
 * @implements {shadow.dom.IElement}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {shadow.dom.SVGElement}
 * @implements {cljs.core.ILookup}
*/
shadow.object.ObjectRef = (function (id,type,data,watches,result_chan){
this.id = id;
this.type = type;
this.data = data;
this.watches = watches;
this.result_chan = result_chan;
this.cljs$lang$protocol_mask$partition0$ = 2149613824;
this.cljs$lang$protocol_mask$partition1$ = 2;
});
(shadow.object.ObjectRef.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.object.ObjectRef.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (this$,handler){
var self__ = this;
var this$__$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.result_chan,handler);
}));

(shadow.object.ObjectRef.prototype.toString = (function (){
var self__ = this;
var this$ = this;
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([this$], 0));
}));

(shadow.object.ObjectRef.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this$,k){
var self__ = this;
var this$__$1 = this;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"parent","parent",-878878779),k)){
return shadow.object.get_parent(this$__$1);
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.data,k);
}
}));

(shadow.object.ObjectRef.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this$,k,d){
var self__ = this;
var this$__$1 = this;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"parent","parent",-878878779),k)){
return shadow.object.get_parent(this$__$1);
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.data,k,d);
}
}));

(shadow.object.ObjectRef.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){
var self__ = this;
var this$__$1 = this;
return cljs.core._write(writer,["#<ObjectRef {:id ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.id),", :type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.type),"}>"].join(''));
}));

(shadow.object.ObjectRef.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.object.ObjectRef.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return new cljs.core.Keyword("shadow.object","dom","shadow.object/dom",-1238263311).cljs$core$IFn$_invoke$arity$1(self__.data);
}));

(shadow.object.ObjectRef.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var self__ = this;
var this$__$1 = this;
return (((other instanceof shadow.object.ObjectRef)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this$__$1.shadow$object$IObject$_id$arity$1(null),shadow.object._id(other))));
}));

(shadow.object.ObjectRef.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.object.ObjectRef.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return new cljs.core.Keyword("shadow.object","dom","shadow.object/dom",-1238263311).cljs$core$IFn$_invoke$arity$1(self__.data);
}));

(shadow.object.ObjectRef.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,oldval,newval){
var self__ = this;
var this$__$1 = this;
throw (new Error("who be calling?"));
}));

(shadow.object.ObjectRef.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){
var self__ = this;
var this$__$1 = this;
return (self__.watches = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(self__.watches,(new shadow.object.Watch(key,f,null,null,null))));
}));

(shadow.object.ObjectRef.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
return (self__.watches = cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__21025_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(p1__21025_SHARP_));
}),self__.watches));
}));

(shadow.object.ObjectRef.prototype.shadow$object$IObject$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.object.ObjectRef.prototype.shadow$object$IObject$_id$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.id;
}));

(shadow.object.ObjectRef.prototype.shadow$object$IObject$_type$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.type;
}));

(shadow.object.ObjectRef.prototype.shadow$object$IObject$_data$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.data;
}));

(shadow.object.ObjectRef.prototype.shadow$object$IObject$_update$arity$2 = (function (this$,update_fn){
var self__ = this;
var this$__$1 = this;
var old = self__.data;
var new$ = (update_fn.cljs$core$IFn$_invoke$arity$1 ? update_fn.cljs$core$IFn$_invoke$arity$1(self__.data) : update_fn.call(null,self__.data));
(self__.data = new$);

var seq__21058 = cljs.core.seq(self__.watches);
var chunk__21059 = null;
var count__21060 = (0);
var i__21061 = (0);
while(true){
if((i__21061 < count__21060)){
var map__21068 = chunk__21059.cljs$core$IIndexed$_nth$arity$2(null,i__21061);
var map__21068__$1 = cljs.core.__destructure_map(map__21068);
var watch = map__21068__$1;
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21068__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var handler = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21068__$1,new cljs.core.Keyword(null,"handler","handler",-195596612));
if(shadow.object.alive_QMARK_(this$__$1)){
(handler.cljs$core$IFn$_invoke$arity$4 ? handler.cljs$core$IFn$_invoke$arity$4(key,this$__$1,old,new$) : handler.call(null,key,this$__$1,old,new$));
} else {
}


var G__21831 = seq__21058;
var G__21832 = chunk__21059;
var G__21833 = count__21060;
var G__21834 = (i__21061 + (1));
seq__21058 = G__21831;
chunk__21059 = G__21832;
count__21060 = G__21833;
i__21061 = G__21834;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__21058);
if(temp__5804__auto__){
var seq__21058__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21058__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21058__$1);
var G__21836 = cljs.core.chunk_rest(seq__21058__$1);
var G__21837 = c__5525__auto__;
var G__21838 = cljs.core.count(c__5525__auto__);
var G__21839 = (0);
seq__21058 = G__21836;
chunk__21059 = G__21837;
count__21060 = G__21838;
i__21061 = G__21839;
continue;
} else {
var map__21074 = cljs.core.first(seq__21058__$1);
var map__21074__$1 = cljs.core.__destructure_map(map__21074);
var watch = map__21074__$1;
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21074__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var handler = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21074__$1,new cljs.core.Keyword(null,"handler","handler",-195596612));
if(shadow.object.alive_QMARK_(this$__$1)){
(handler.cljs$core$IFn$_invoke$arity$4 ? handler.cljs$core$IFn$_invoke$arity$4(key,this$__$1,old,new$) : handler.call(null,key,this$__$1,old,new$));
} else {
}


var G__21840 = cljs.core.next(seq__21058__$1);
var G__21841 = null;
var G__21842 = (0);
var G__21843 = (0);
seq__21058 = G__21840;
chunk__21059 = G__21841;
count__21060 = G__21842;
i__21061 = G__21843;
continue;
}
} else {
return null;
}
}
break;
}
}));

(shadow.object.ObjectRef.prototype.shadow$object$IObject$_destroy_BANG_$arity$2 = (function (this$,cause){
var self__ = this;
var this$__$1 = this;
var parent_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.object.instance_parent),self__.id);
var seq__21089_21844 = cljs.core.seq(shadow.object.get_children(this$__$1));
var chunk__21090_21845 = null;
var count__21091_21846 = (0);
var i__21092_21847 = (0);
while(true){
if((i__21092_21847 < count__21091_21846)){
var child_21852 = chunk__21090_21845.cljs$core$IIndexed$_nth$arity$2(null,i__21092_21847);
shadow.object._destroy_BANG_(child_21852,new cljs.core.Keyword(null,"parent","parent",-878878779));


var G__21854 = seq__21089_21844;
var G__21855 = chunk__21090_21845;
var G__21856 = count__21091_21846;
var G__21857 = (i__21092_21847 + (1));
seq__21089_21844 = G__21854;
chunk__21090_21845 = G__21855;
count__21091_21846 = G__21856;
i__21092_21847 = G__21857;
continue;
} else {
var temp__5804__auto___21858 = cljs.core.seq(seq__21089_21844);
if(temp__5804__auto___21858){
var seq__21089_21859__$1 = temp__5804__auto___21858;
if(cljs.core.chunked_seq_QMARK_(seq__21089_21859__$1)){
var c__5525__auto___21860 = cljs.core.chunk_first(seq__21089_21859__$1);
var G__21861 = cljs.core.chunk_rest(seq__21089_21859__$1);
var G__21862 = c__5525__auto___21860;
var G__21863 = cljs.core.count(c__5525__auto___21860);
var G__21864 = (0);
seq__21089_21844 = G__21861;
chunk__21090_21845 = G__21862;
count__21091_21846 = G__21863;
i__21092_21847 = G__21864;
continue;
} else {
var child_21865 = cljs.core.first(seq__21089_21859__$1);
shadow.object._destroy_BANG_(child_21865,new cljs.core.Keyword(null,"parent","parent",-878878779));


var G__21866 = cljs.core.next(seq__21089_21859__$1);
var G__21867 = null;
var G__21868 = (0);
var G__21869 = (0);
seq__21089_21844 = G__21866;
chunk__21090_21845 = G__21867;
count__21091_21846 = G__21868;
i__21092_21847 = G__21869;
continue;
}
} else {
}
}
break;
}

shadow.object.notify_BANG_.cljs$core$IFn$_invoke$arity$variadic(this$__$1,new cljs.core.Keyword(null,"destroy","destroy",-843660405),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cause], 0));

shadow.object.dom_destroy(this$__$1,cause);

var return_value_21870 = new cljs.core.Keyword("shadow.object","return-value","shadow.object/return-value",1397593360).cljs$core$IFn$_invoke$arity$1(this$__$1);
if((return_value_21870 == null)){
} else {
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(self__.result_chan,return_value_21870);
}

cljs.core.async.close_BANG_(self__.result_chan);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(shadow.object.instances,cljs.core.dissoc,self__.id);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(shadow.object.instance_parent,cljs.core.dissoc,self__.id);

if(cljs.core.truth_(parent_id)){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(shadow.object.instance_children,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [parent_id], null),cljs.core.disj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([self__.id], 0));
} else {
return null;
}
}));

(shadow.object.ObjectRef.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.data;
}));

(shadow.object.ObjectRef.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"id","id",252129435,null),new cljs.core.Symbol(null,"type","type",-1480165421,null),cljs.core.with_meta(new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"watches","watches",1367433992,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),new cljs.core.Symbol(null,"result-chan","result-chan",3070926,null)], null);
}));

(shadow.object.ObjectRef.cljs$lang$type = true);

(shadow.object.ObjectRef.cljs$lang$ctorStr = "shadow.object/ObjectRef");

(shadow.object.ObjectRef.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"shadow.object/ObjectRef");
}));

/**
 * Positional factory function for shadow.object/ObjectRef.
 */
shadow.object.__GT_ObjectRef = (function shadow$object$__GT_ObjectRef(id,type,data,watches,result_chan){
return (new shadow.object.ObjectRef(id,type,data,watches,result_chan));
});

shadow.object.add_reaction_BANG_ = (function shadow$object$add_reaction_BANG_(var_args){
var G__21114 = arguments.length;
switch (G__21114) {
case 3:
return shadow.object.add_reaction_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return shadow.object.add_reaction_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.object.add_reaction_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (oref,ev,handler_fn){
return shadow.object.add_reaction_BANG_.cljs$core$IFn$_invoke$arity$2(oref,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ev,handler_fn], null));
}));

(shadow.object.add_reaction_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (oref,list){
return shadow.object.update_BANG_.cljs$core$IFn$_invoke$arity$variadic(oref,cljs.core.update_in,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("shadow.object","reactions","shadow.object/reactions",1966199633)], null),shadow.object.merge_reactions,list], 0));
}));

(shadow.object.add_reaction_BANG_.cljs$lang$maxFixedArity = 3);

shadow.object.bind_change = (function shadow$object$bind_change(var_args){
var G__21122 = arguments.length;
switch (G__21122) {
case 3:
return shadow.object.bind_change.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.object.bind_change.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.object.bind_change.cljs$core$IFn$_invoke$arity$3 = (function (oref,attr,callback){
return shadow.object.bind_change.cljs$core$IFn$_invoke$arity$4(oref,attr,callback,cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("bind-change"));
}));

(shadow.object.bind_change.cljs$core$IFn$_invoke$arity$4 = (function (oref,attr,callback,watch_key){
if((((!((oref == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === oref.shadow$object$IObject$))))?true:(((!oref.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(shadow.object.IObject,oref):false)):cljs.core.native_satisfies_QMARK_(shadow.object.IObject,oref))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("binding currently only supports shadow objects, other atoms might leak, may add later",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"oref","oref",-1547494840),oref,new cljs.core.Keyword(null,"attr","attr",-604132353),attr], null));
}

var attr__$1 = ((cljs.core.sequential_QMARK_(attr))?attr:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attr], null));
return cljs.core.add_watch(oref,watch_key,(function shadow$object$bind_change_watch(_,___$1,old,new$){
var ov = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(old,attr__$1);
var nv = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(new$,attr__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ov,nv)){
return null;
} else {
return (callback.cljs$core$IFn$_invoke$arity$2 ? callback.cljs$core$IFn$_invoke$arity$2(ov,nv) : callback.call(null,ov,nv));
}
}));
}));

(shadow.object.bind_change.cljs$lang$maxFixedArity = 4);

shadow.object.dom_enter = (function shadow$object$dom_enter(parent,child){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(parent,child);

if(cljs.core.truth_(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1(parent))){
return shadow.object.notify_tree_BANG_(child,new cljs.core.Keyword("dom","entered","dom/entered",506699596));
} else {
return null;
}
});
shadow.object.create = (function shadow$object$create(var_args){
var args__5732__auto__ = [];
var len__5726__auto___21879 = arguments.length;
var i__5727__auto___21880 = (0);
while(true){
if((i__5727__auto___21880 < len__5726__auto___21879)){
args__5732__auto__.push((arguments[i__5727__auto___21880]));

var G__21881 = (i__5727__auto___21880 + (1));
i__5727__auto___21880 = G__21881;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return shadow.object.create.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(shadow.object.create.cljs$core$IFn$_invoke$arity$variadic = (function (type,args,node_children){
if(cljs.core.contains_QMARK_(cljs.core.deref(shadow.object.object_defs),type)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["cannot create unknown child type: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(type)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),type,new cljs.core.Keyword(null,"args","args",1315556576),args], null));
}

if(cljs.core.map_QMARK_(args)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("so/create second arg must be a map",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"args","args",1315556576),args], null));
}

var oid = shadow.object.next_id();
var parent = new cljs.core.Keyword(null,"parent","parent",-878878779).cljs$core$IFn$_invoke$arity$1(args);
var result_chan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var odef = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.object.object_defs),type);
var obj = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(shadow.object.merge_defaults(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword("shadow.object","object-id","shadow.object/object-id",-685993804),oid,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("shadow.object","reactions","shadow.object/reactions",1966199633),cljs.core.get.cljs$core$IFn$_invoke$arity$3(odef,new cljs.core.Keyword("shadow.object","reactions","shadow.object/reactions",1966199633),cljs.core.PersistentArrayMap.EMPTY)], 0)),type),new cljs.core.Keyword(null,"parent","parent",-878878779),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"dom","dom",-1236537922)], 0));
var oref = (new shadow.object.ObjectRef(oid,type,obj,cljs.core.PersistentVector.EMPTY,result_chan));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(shadow.object.instances,cljs.core.assoc,oid,oref);

if(cljs.core.truth_(parent)){
shadow.object.set_parent_BANG_(oref,parent);
} else {
}

shadow.object.notify_BANG_(oref,new cljs.core.Keyword(null,"init","init",-1875481434));

var dom_events_21883 = new cljs.core.Keyword("dom","events","dom/events",1793437527).cljs$core$IFn$_invoke$arity$2(odef,cljs.core.PersistentVector.EMPTY);
var temp__5802__auto___21887 = new cljs.core.Keyword(null,"dom","dom",-1236537922).cljs$core$IFn$_invoke$arity$1(args);
if(cljs.core.truth_(temp__5802__auto___21887)){
var dom_21888 = temp__5802__auto___21887;
shadow.dom.set_data(dom_21888,new cljs.core.Keyword(null,"oid","oid",-768692334),oid);

shadow.object.bind_dom_events(oref,dom_21888,dom_events_21883);

shadow.object.update_BANG_.cljs$core$IFn$_invoke$arity$variadic(oref,cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("shadow.object","dom","shadow.object/dom",-1238263311),dom_21888], 0));

shadow.object.notify_BANG_.cljs$core$IFn$_invoke$arity$variadic(oref,new cljs.core.Keyword("dom","init","dom/init",-1875647652),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([dom_21888], 0));
} else {
var temp__5804__auto___21892 = new cljs.core.Keyword(null,"dom","dom",-1236537922).cljs$core$IFn$_invoke$arity$1(odef);
if(cljs.core.truth_(temp__5804__auto___21892)){
var dom_fn_21893 = temp__5804__auto___21892;
var dom_21894 = (function (){var G__21151 = (dom_fn_21893.cljs$core$IFn$_invoke$arity$2 ? dom_fn_21893.cljs$core$IFn$_invoke$arity$2(oref,node_children) : dom_fn_21893.call(null,oref,node_children));
return (shadow.dom.build.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.build.cljs$core$IFn$_invoke$arity$1(G__21151) : shadow.dom.build.call(null,G__21151));
})();
shadow.dom.set_data(dom_21894,new cljs.core.Keyword(null,"oid","oid",-768692334),oid);

shadow.object.update_BANG_.cljs$core$IFn$_invoke$arity$variadic(oref,cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("shadow.object","dom","shadow.object/dom",-1238263311),dom_21894], 0));

shadow.object.bind_dom_events(oref,dom_21894,dom_events_21883);

shadow.object.notify_BANG_.cljs$core$IFn$_invoke$arity$variadic(oref,new cljs.core.Keyword("dom","init","dom/init",-1875647652),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([dom_21894], 0));
} else {
}
}

var temp__5804__auto___21897 = new cljs.core.Keyword(null,"watch","watch",380988277).cljs$core$IFn$_invoke$arity$1(odef);
if(cljs.core.truth_(temp__5804__auto___21897)){
var watches_21898 = temp__5804__auto___21897;
var seq__21152_21899 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),watches_21898));
var chunk__21153_21900 = null;
var count__21154_21901 = (0);
var i__21155_21902 = (0);
while(true){
if((i__21155_21902 < count__21154_21901)){
var vec__21177_21905 = chunk__21153_21900.cljs$core$IIndexed$_nth$arity$2(null,i__21155_21902);
var attr_21906 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21177_21905,(0),null);
var handler_21907 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21177_21905,(1),null);
shadow.object.bind_change.cljs$core$IFn$_invoke$arity$3(oref,attr_21906,((function (seq__21152_21899,chunk__21153_21900,count__21154_21901,i__21155_21902,vec__21177_21905,attr_21906,handler_21907,watches_21898,temp__5804__auto___21897,oid,parent,result_chan,odef,obj,oref){
return (function (old,new$){
return (handler_21907.cljs$core$IFn$_invoke$arity$3 ? handler_21907.cljs$core$IFn$_invoke$arity$3(oref,old,new$) : handler_21907.call(null,oref,old,new$));
});})(seq__21152_21899,chunk__21153_21900,count__21154_21901,i__21155_21902,vec__21177_21905,attr_21906,handler_21907,watches_21898,temp__5804__auto___21897,oid,parent,result_chan,odef,obj,oref))
);


var G__21911 = seq__21152_21899;
var G__21912 = chunk__21153_21900;
var G__21913 = count__21154_21901;
var G__21914 = (i__21155_21902 + (1));
seq__21152_21899 = G__21911;
chunk__21153_21900 = G__21912;
count__21154_21901 = G__21913;
i__21155_21902 = G__21914;
continue;
} else {
var temp__5804__auto___21915__$1 = cljs.core.seq(seq__21152_21899);
if(temp__5804__auto___21915__$1){
var seq__21152_21916__$1 = temp__5804__auto___21915__$1;
if(cljs.core.chunked_seq_QMARK_(seq__21152_21916__$1)){
var c__5525__auto___21917 = cljs.core.chunk_first(seq__21152_21916__$1);
var G__21918 = cljs.core.chunk_rest(seq__21152_21916__$1);
var G__21919 = c__5525__auto___21917;
var G__21920 = cljs.core.count(c__5525__auto___21917);
var G__21921 = (0);
seq__21152_21899 = G__21918;
chunk__21153_21900 = G__21919;
count__21154_21901 = G__21920;
i__21155_21902 = G__21921;
continue;
} else {
var vec__21184_21922 = cljs.core.first(seq__21152_21916__$1);
var attr_21923 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21184_21922,(0),null);
var handler_21924 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21184_21922,(1),null);
shadow.object.bind_change.cljs$core$IFn$_invoke$arity$3(oref,attr_21923,((function (seq__21152_21899,chunk__21153_21900,count__21154_21901,i__21155_21902,vec__21184_21922,attr_21923,handler_21924,seq__21152_21916__$1,temp__5804__auto___21915__$1,watches_21898,temp__5804__auto___21897,oid,parent,result_chan,odef,obj,oref){
return (function (old,new$){
return (handler_21924.cljs$core$IFn$_invoke$arity$3 ? handler_21924.cljs$core$IFn$_invoke$arity$3(oref,old,new$) : handler_21924.call(null,oref,old,new$));
});})(seq__21152_21899,chunk__21153_21900,count__21154_21901,i__21155_21902,vec__21184_21922,attr_21923,handler_21924,seq__21152_21916__$1,temp__5804__auto___21915__$1,watches_21898,temp__5804__auto___21897,oid,parent,result_chan,odef,obj,oref))
);


var G__21925 = cljs.core.next(seq__21152_21916__$1);
var G__21926 = null;
var G__21927 = (0);
var G__21928 = (0);
seq__21152_21899 = G__21925;
chunk__21153_21900 = G__21926;
count__21154_21901 = G__21927;
i__21155_21902 = G__21928;
continue;
}
} else {
}
}
break;
}
} else {
}

return oref;
}));

(shadow.object.create.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.object.create.cljs$lang$applyTo = (function (seq21147){
var G__21148 = cljs.core.first(seq21147);
var seq21147__$1 = cljs.core.next(seq21147);
var G__21149 = cljs.core.first(seq21147__$1);
var seq21147__$2 = cljs.core.next(seq21147__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21148,G__21149,seq21147__$2);
}));

/**
 * [oref attr node-gen] produces a node via (node-gen new-value)
 * watches obj for changes and replaces the generated node on change (node-gen defaults to str)
 * 
 *   only use if the node has no attached behavior like clicks, use bind with an extra object for those
 */
shadow.object.bind_simple = (function shadow$object$bind_simple(var_args){
var G__21197 = arguments.length;
switch (G__21197) {
case 2:
return shadow.object.bind_simple.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.object.bind_simple.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.object.bind_simple.cljs$core$IFn$_invoke$arity$2 = (function (oref,attr){
return shadow.object.bind_simple.cljs$core$IFn$_invoke$arity$3(oref,attr,cljs.core.str);
}));

(shadow.object.bind_simple.cljs$core$IFn$_invoke$arity$3 = (function (oref,attr,node_gen){
var attr__$1 = ((cljs.core.sequential_QMARK_(attr))?attr:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attr], null));
var node_get = (function (p1__21195_SHARP_){
var G__21201 = (node_gen.cljs$core$IFn$_invoke$arity$1 ? node_gen.cljs$core$IFn$_invoke$arity$1(p1__21195_SHARP_) : node_gen.call(null,p1__21195_SHARP_));
return (shadow.dom.build.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.build.cljs$core$IFn$_invoke$arity$1(G__21201) : shadow.dom.build.call(null,G__21201));
});
var node = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(node_get(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(oref,attr__$1)));
var bind_key = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("bind");
shadow.object.bind_change.cljs$core$IFn$_invoke$arity$3(oref,attr__$1,(function (old,new$){
var new_node = node_get(new$);
var current_node = cljs.core.deref(node);
shadow.dom.replace_node(current_node,new_node);

return cljs.core.reset_BANG_(node,new_node);
}));

return cljs.core.deref(node);
}));

(shadow.object.bind_simple.cljs$lang$maxFixedArity = 3);

/**
 * bind the given attribute a child item
 *   the item will be recreated whenever the value changes (old one will be destroyed)
 */
shadow.object.bind = (function shadow$object$bind(oref,attr,item_type,item_key,item_attrs){
var attr__$1 = ((cljs.core.sequential_QMARK_(attr))?attr:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attr], null));
var curval = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(oref,attr__$1);
var make_child_fn = (function (value){
return shadow.object.create(item_type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([item_attrs,cljs.core.PersistentArrayMap.createAsIfByAssoc([new cljs.core.Keyword(null,"parent","parent",-878878779),oref,item_key,value])], 0)));
});
var child = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(make_child_fn(curval));
shadow.object.bind_change.cljs$core$IFn$_invoke$arity$3(oref,attr__$1,(function (old,new$){
var new_child = make_child_fn(new$);
var current_node = cljs.core.deref(child);
shadow.dom.replace_node(current_node,new_child);

shadow.object.destroy_BANG_.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(child));

cljs.core.reset_BANG_(child,new_child);

return (shadow.object.notify_down_BANG_.cljs$core$IFn$_invoke$arity$2 ? shadow.object.notify_down_BANG_.cljs$core$IFn$_invoke$arity$2(new_child,new cljs.core.Keyword("dom","entered","dom/entered",506699596)) : shadow.object.notify_down_BANG_.call(null,new_child,new cljs.core.Keyword("dom","entered","dom/entered",506699596)));
}));

return cljs.core.deref(child);
});
shadow.object.coll_destroy_children = (function shadow$object$coll_destroy_children(children,c,diff){
var seq__21220_21931 = cljs.core.seq(cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(children,(c + diff),c));
var chunk__21221_21932 = null;
var count__21222_21933 = (0);
var i__21223_21934 = (0);
while(true){
if((i__21223_21934 < count__21222_21933)){
var obj_21935 = chunk__21221_21932.cljs$core$IIndexed$_nth$arity$2(null,i__21223_21934);
var obj_21936__$1 = shadow.object.get_from_dom(obj_21935);
shadow.object.destroy_BANG_.cljs$core$IFn$_invoke$arity$1(obj_21936__$1);


var G__21937 = seq__21220_21931;
var G__21938 = chunk__21221_21932;
var G__21939 = count__21222_21933;
var G__21940 = (i__21223_21934 + (1));
seq__21220_21931 = G__21937;
chunk__21221_21932 = G__21938;
count__21222_21933 = G__21939;
i__21223_21934 = G__21940;
continue;
} else {
var temp__5804__auto___21941 = cljs.core.seq(seq__21220_21931);
if(temp__5804__auto___21941){
var seq__21220_21942__$1 = temp__5804__auto___21941;
if(cljs.core.chunked_seq_QMARK_(seq__21220_21942__$1)){
var c__5525__auto___21943 = cljs.core.chunk_first(seq__21220_21942__$1);
var G__21944 = cljs.core.chunk_rest(seq__21220_21942__$1);
var G__21945 = c__5525__auto___21943;
var G__21946 = cljs.core.count(c__5525__auto___21943);
var G__21947 = (0);
seq__21220_21931 = G__21944;
chunk__21221_21932 = G__21945;
count__21222_21933 = G__21946;
i__21223_21934 = G__21947;
continue;
} else {
var obj_21948 = cljs.core.first(seq__21220_21942__$1);
var obj_21949__$1 = shadow.object.get_from_dom(obj_21948);
shadow.object.destroy_BANG_.cljs$core$IFn$_invoke$arity$1(obj_21949__$1);


var G__21950 = cljs.core.next(seq__21220_21942__$1);
var G__21951 = null;
var G__21952 = (0);
var G__21953 = (0);
seq__21220_21931 = G__21950;
chunk__21221_21932 = G__21951;
count__21222_21933 = G__21952;
i__21223_21934 = G__21953;
continue;
}
} else {
}
}
break;
}

return cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(children,(0),(c + diff));
});
shadow.object.bind_children = (function shadow$object$bind_children(var_args){
var G__21240 = arguments.length;
switch (G__21240) {
case 5:
return shadow.object.bind_children.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return shadow.object.bind_children.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.object.bind_children.cljs$core$IFn$_invoke$arity$5 = (function (node,parent,attr,item_type,item_key){
return shadow.object.bind_children.cljs$core$IFn$_invoke$arity$6(node,parent,attr,item_type,item_key,(function (p1__21234_SHARP_){
return cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,p1__21234_SHARP_);
}));
}));

(shadow.object.bind_children.cljs$core$IFn$_invoke$arity$6 = (function (node,parent,attr,item_type,item_key,coll_transform){
var attr__$1 = ((cljs.core.sequential_QMARK_(attr))?attr:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attr], null));
var update_children = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
var coll_dom = (shadow.dom.build.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.build.cljs$core$IFn$_invoke$arity$1(node) : shadow.dom.build.call(null,node));
var make_item_fn = (function (p__21246){
var vec__21247 = p__21246;
var key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21247,(0),null);
var val = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21247,(1),null);
var obj = shadow.object.create(item_type,cljs.core.PersistentArrayMap.createAsIfByAssoc([new cljs.core.Keyword(null,"parent","parent",-878878779),parent,new cljs.core.Keyword("shadow.object","coll-path","shadow.object/coll-path",1583850048),attr__$1,new cljs.core.Keyword("shadow.object","coll-key","shadow.object/coll-key",827543616),key,new cljs.core.Keyword("shadow.object","coll-item-key","shadow.object/coll-item-key",1888444366),item_key,item_key,val]));
shadow.object.bind_change.cljs$core$IFn$_invoke$arity$3(obj,item_key,(function (old,new$){
var parent_key = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(attr__$1,new cljs.core.Keyword("shadow.object","coll-key","shadow.object/coll-key",827543616).cljs$core$IFn$_invoke$arity$1(obj));
(shadow.object.log.cljs$core$IFn$_invoke$arity$6 ? shadow.object.log.cljs$core$IFn$_invoke$arity$6("direct child update",parent,obj,key,parent_key,new$) : shadow.object.log.call(null,"direct child update",parent,obj,key,parent_key,new$));

cljs.core.reset_BANG_(update_children,false);

shadow.object.update_BANG_.cljs$core$IFn$_invoke$arity$variadic(parent,cljs.core.assoc_in,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([parent_key,new$], 0));

return cljs.core.reset_BANG_(update_children,true);
}));

return obj;
});
var seq__21250_21969 = cljs.core.seq((function (){var G__21255 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(parent,attr__$1);
return (coll_transform.cljs$core$IFn$_invoke$arity$1 ? coll_transform.cljs$core$IFn$_invoke$arity$1(G__21255) : coll_transform.call(null,G__21255));
})());
var chunk__21251_21970 = null;
var count__21252_21971 = (0);
var i__21253_21972 = (0);
while(true){
if((i__21253_21972 < count__21252_21971)){
var item_21975 = chunk__21251_21970.cljs$core$IIndexed$_nth$arity$2(null,i__21253_21972);
shadow.object.dom_enter(coll_dom,make_item_fn(item_21975));


var G__21976 = seq__21250_21969;
var G__21977 = chunk__21251_21970;
var G__21978 = count__21252_21971;
var G__21979 = (i__21253_21972 + (1));
seq__21250_21969 = G__21976;
chunk__21251_21970 = G__21977;
count__21252_21971 = G__21978;
i__21253_21972 = G__21979;
continue;
} else {
var temp__5804__auto___21980 = cljs.core.seq(seq__21250_21969);
if(temp__5804__auto___21980){
var seq__21250_21982__$1 = temp__5804__auto___21980;
if(cljs.core.chunked_seq_QMARK_(seq__21250_21982__$1)){
var c__5525__auto___21983 = cljs.core.chunk_first(seq__21250_21982__$1);
var G__21984 = cljs.core.chunk_rest(seq__21250_21982__$1);
var G__21985 = c__5525__auto___21983;
var G__21986 = cljs.core.count(c__5525__auto___21983);
var G__21987 = (0);
seq__21250_21969 = G__21984;
chunk__21251_21970 = G__21985;
count__21252_21971 = G__21986;
i__21253_21972 = G__21987;
continue;
} else {
var item_21988 = cljs.core.first(seq__21250_21982__$1);
shadow.object.dom_enter(coll_dom,make_item_fn(item_21988));


var G__21989 = cljs.core.next(seq__21250_21982__$1);
var G__21990 = null;
var G__21991 = (0);
var G__21992 = (0);
seq__21250_21969 = G__21989;
chunk__21251_21970 = G__21990;
count__21252_21971 = G__21991;
i__21253_21972 = G__21992;
continue;
}
} else {
}
}
break;
}

shadow.object.bind_change.cljs$core$IFn$_invoke$arity$3(parent,attr__$1,(function shadow$object$bind_children_watch(old,new$){
if(cljs.core.truth_(cljs.core.deref(update_children))){
var children = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,shadow.dom.children(coll_dom));
var new_coll = cljs.core.vec((coll_transform.cljs$core$IFn$_invoke$arity$1 ? coll_transform.cljs$core$IFn$_invoke$arity$1(new$) : coll_transform.call(null,new$)));
var count_children = cljs.core.count(children);
var count_new = cljs.core.count(new$);
var diff = (count_new - count_children);
var children__$1 = (((diff < (0)))?shadow.object.coll_destroy_children(children,count_children,diff):children);
var count_children__$1 = (function (){var x__5090__auto__ = count_new;
var y__5091__auto__ = count_children;
return ((x__5090__auto__ < y__5091__auto__) ? x__5090__auto__ : y__5091__auto__);
})();
var n__5593__auto___21996 = count_children__$1;
var idx_21997 = (0);
while(true){
if((idx_21997 < n__5593__auto___21996)){
var cn_21998 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(children__$1,idx_21997);
var cc_21999 = shadow.object.get_from_dom(cn_21998);
var ckey_22000 = new cljs.core.Keyword("shadow.object","coll-key","shadow.object/coll-key",827543616).cljs$core$IFn$_invoke$arity$1(cc_21999);
var cval_22001 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cc_21999,item_key);
var vec__21269_22002 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(new_coll,idx_21997);
var nkey_22003 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21269_22002,(0),null);
var nval_22004 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21269_22002,(1),null);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ckey_22000,nkey_22003)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cval_22001,nval_22004)))){
} else {
var new_obj_22005 = make_item_fn(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [nkey_22003,nval_22004], null));
shadow.dom.replace_node(cn_21998,new_obj_22005);

shadow.object.destroy_BANG_.cljs$core$IFn$_invoke$arity$1(cc_21999);

shadow.object.notify_tree_BANG_(new_obj_22005,new cljs.core.Keyword("dom","entered","dom/entered",506699596));
}

var G__22006 = (idx_21997 + (1));
idx_21997 = G__22006;
continue;
} else {
}
break;
}

if((diff > (0))){
var seq__21273_22010 = cljs.core.seq(cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(new_coll,count_children__$1,count_new));
var chunk__21274_22011 = null;
var count__21275_22012 = (0);
var i__21276_22013 = (0);
while(true){
if((i__21276_22013 < count__21275_22012)){
var item_22015 = chunk__21274_22011.cljs$core$IIndexed$_nth$arity$2(null,i__21276_22013);
shadow.object.dom_enter(coll_dom,make_item_fn(item_22015));


var G__22017 = seq__21273_22010;
var G__22018 = chunk__21274_22011;
var G__22019 = count__21275_22012;
var G__22020 = (i__21276_22013 + (1));
seq__21273_22010 = G__22017;
chunk__21274_22011 = G__22018;
count__21275_22012 = G__22019;
i__21276_22013 = G__22020;
continue;
} else {
var temp__5804__auto___22021 = cljs.core.seq(seq__21273_22010);
if(temp__5804__auto___22021){
var seq__21273_22022__$1 = temp__5804__auto___22021;
if(cljs.core.chunked_seq_QMARK_(seq__21273_22022__$1)){
var c__5525__auto___22023 = cljs.core.chunk_first(seq__21273_22022__$1);
var G__22024 = cljs.core.chunk_rest(seq__21273_22022__$1);
var G__22025 = c__5525__auto___22023;
var G__22026 = cljs.core.count(c__5525__auto___22023);
var G__22027 = (0);
seq__21273_22010 = G__22024;
chunk__21274_22011 = G__22025;
count__21275_22012 = G__22026;
i__21276_22013 = G__22027;
continue;
} else {
var item_22028 = cljs.core.first(seq__21273_22022__$1);
shadow.object.dom_enter(coll_dom,make_item_fn(item_22028));


var G__22029 = cljs.core.next(seq__21273_22022__$1);
var G__22030 = null;
var G__22031 = (0);
var G__22032 = (0);
seq__21273_22010 = G__22029;
chunk__21274_22011 = G__22030;
count__21275_22012 = G__22031;
i__21276_22013 = G__22032;
continue;
}
} else {
}
}
break;
}
} else {
}

return shadow.object.notify_BANG_(parent,new cljs.core.Keyword(null,"bind-children-update","bind-children-update",-1610690160));
} else {
return null;
}
}));

return coll_dom;
}));

(shadow.object.bind_children.cljs$lang$maxFixedArity = 6);

shadow.object.remove_in_parent_BANG_ = (function shadow$object$remove_in_parent_BANG_(oref){
var parent = shadow.object.get_parent(oref);
var key = new cljs.core.Keyword("shadow.object","coll-key","shadow.object/coll-key",827543616).cljs$core$IFn$_invoke$arity$1(oref);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(oref,new cljs.core.Keyword("shadow.object","coll-item-key","shadow.object/coll-item-key",1888444366).cljs$core$IFn$_invoke$arity$1(oref));
var path = new cljs.core.Keyword("shadow.object","coll-path","shadow.object/coll-path",1583850048).cljs$core$IFn$_invoke$arity$1(oref);
if(cljs.core.truth_((function (){var and__5000__auto__ = key;
if(cljs.core.truth_(and__5000__auto__)){
return path;
} else {
return and__5000__auto__;
}
})())){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("remove-in-parent! should only be called from items created via so/bind-children",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"oref","oref",-1547494840),oref], null));
}

var coll = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(parent,path);
var new_coll = shadow.util.remove_item_from_coll(coll,key,value);
return shadow.object.notify_BANG_.cljs$core$IFn$_invoke$arity$variadic(parent,new cljs.core.Keyword("bind","update","bind/update",1048601733),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path,new_coll], 0));
});
shadow.object.inspect_BANG_ = (function shadow$object$inspect_BANG_(oref){
var G__21308 = "inspect!";
var G__21309 = shadow.object._id(oref);
var G__21310 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(shadow.object._type(oref));
var G__21311 = cljs.core.clj__GT_js(cljs.core.deref(shadow.object._data(oref)));
return (shadow.object.info.cljs$core$IFn$_invoke$arity$4 ? shadow.object.info.cljs$core$IFn$_invoke$arity$4(G__21308,G__21309,G__21310,G__21311) : shadow.object.info.call(null,G__21308,G__21309,G__21310,G__21311));
});
shadow.object.dump_BANG_ = (function shadow$object$dump_BANG_(){
(shadow.object.info.cljs$core$IFn$_invoke$arity$1 ? shadow.object.info.cljs$core$IFn$_invoke$arity$1("--------------- LIVE OBJECTS ------------") : shadow.object.info.call(null,"--------------- LIVE OBJECTS ------------"));

var seq__21318_22033 = cljs.core.seq(cljs.core.seq(cljs.core.deref(shadow.object.instances)));
var chunk__21320_22034 = null;
var count__21321_22035 = (0);
var i__21322_22036 = (0);
while(true){
if((i__21322_22036 < count__21321_22035)){
var vec__21361_22037 = chunk__21320_22034.cljs$core$IIndexed$_nth$arity$2(null,i__21322_22036);
var id_22038 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21361_22037,(0),null);
var oref_22039 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21361_22037,(1),null);
var G__21372_22040 = "dump";
var G__21373_22041 = id_22038;
var G__21374_22042 = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.object._type(oref_22039)], 0));
var G__21375_22043 = cljs.core.deref(shadow.object._data(oref_22039));
(shadow.object.info.cljs$core$IFn$_invoke$arity$4 ? shadow.object.info.cljs$core$IFn$_invoke$arity$4(G__21372_22040,G__21373_22041,G__21374_22042,G__21375_22043) : shadow.object.info.call(null,G__21372_22040,G__21373_22041,G__21374_22042,G__21375_22043));


var G__22044 = seq__21318_22033;
var G__22045 = chunk__21320_22034;
var G__22046 = count__21321_22035;
var G__22047 = (i__21322_22036 + (1));
seq__21318_22033 = G__22044;
chunk__21320_22034 = G__22045;
count__21321_22035 = G__22046;
i__21322_22036 = G__22047;
continue;
} else {
var temp__5804__auto___22048 = cljs.core.seq(seq__21318_22033);
if(temp__5804__auto___22048){
var seq__21318_22051__$1 = temp__5804__auto___22048;
if(cljs.core.chunked_seq_QMARK_(seq__21318_22051__$1)){
var c__5525__auto___22055 = cljs.core.chunk_first(seq__21318_22051__$1);
var G__22056 = cljs.core.chunk_rest(seq__21318_22051__$1);
var G__22057 = c__5525__auto___22055;
var G__22058 = cljs.core.count(c__5525__auto___22055);
var G__22059 = (0);
seq__21318_22033 = G__22056;
chunk__21320_22034 = G__22057;
count__21321_22035 = G__22058;
i__21322_22036 = G__22059;
continue;
} else {
var vec__21377_22061 = cljs.core.first(seq__21318_22051__$1);
var id_22062 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21377_22061,(0),null);
var oref_22063 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21377_22061,(1),null);
var G__21381_22064 = "dump";
var G__21382_22065 = id_22062;
var G__21383_22066 = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.object._type(oref_22063)], 0));
var G__21384_22067 = cljs.core.deref(shadow.object._data(oref_22063));
(shadow.object.info.cljs$core$IFn$_invoke$arity$4 ? shadow.object.info.cljs$core$IFn$_invoke$arity$4(G__21381_22064,G__21382_22065,G__21383_22066,G__21384_22067) : shadow.object.info.call(null,G__21381_22064,G__21382_22065,G__21383_22066,G__21384_22067));


var G__22069 = cljs.core.next(seq__21318_22051__$1);
var G__22070 = null;
var G__22071 = (0);
var G__22072 = (0);
seq__21318_22033 = G__22069;
chunk__21320_22034 = G__22070;
count__21321_22035 = G__22071;
i__21322_22036 = G__22072;
continue;
}
} else {
}
}
break;
}

return (shadow.object.info.cljs$core$IFn$_invoke$arity$1 ? shadow.object.info.cljs$core$IFn$_invoke$arity$1("--------------- //LIVE OBJECTS ------------") : shadow.object.info.call(null,"--------------- //LIVE OBJECTS ------------"));
});
goog.exportSymbol('shadow.object.dump_BANG_', shadow.object.dump_BANG_);

//# sourceMappingURL=shadow.object.js.map
