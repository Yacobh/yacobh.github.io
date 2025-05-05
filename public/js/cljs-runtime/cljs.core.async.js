goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18096 = (function (f,blockable,meta18097){
this.f = f;
this.blockable = blockable;
this.meta18097 = meta18097;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async18096.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18098,meta18097__$1){
var self__ = this;
var _18098__$1 = this;
return (new cljs.core.async.t_cljs$core$async18096(self__.f,self__.blockable,meta18097__$1));
}));

(cljs.core.async.t_cljs$core$async18096.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18098){
var self__ = this;
var _18098__$1 = this;
return self__.meta18097;
}));

(cljs.core.async.t_cljs$core$async18096.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18096.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async18096.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async18096.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async18096.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta18097","meta18097",989950676,null)], null);
}));

(cljs.core.async.t_cljs$core$async18096.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async18096.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18096");

(cljs.core.async.t_cljs$core$async18096.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async18096");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18096.
 */
cljs.core.async.__GT_t_cljs$core$async18096 = (function cljs$core$async$__GT_t_cljs$core$async18096(f,blockable,meta18097){
return (new cljs.core.async.t_cljs$core$async18096(f,blockable,meta18097));
});


cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__18088 = arguments.length;
switch (G__18088) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
return (new cljs.core.async.t_cljs$core$async18096(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__18138 = arguments.length;
switch (G__18138) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__18161 = arguments.length;
switch (G__18161) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__18164 = arguments.length;
switch (G__18164) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_20381 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_20381) : fn1.call(null,val_20381));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_20381) : fn1.call(null,val_20381));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__18168 = arguments.length;
switch (G__18168) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5802__auto__)){
var ret = temp__5802__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5802__auto__)){
var retb = temp__5802__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5593__auto___20386 = n;
var x_20387 = (0);
while(true){
if((x_20387 < n__5593__auto___20386)){
(a[x_20387] = x_20387);

var G__20388 = (x_20387 + (1));
x_20387 = G__20388;
continue;
} else {
}
break;
}

cljs.core.async.goog$module$goog$array.shuffle(a);

return a;
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18170 = (function (flag,meta18171){
this.flag = flag;
this.meta18171 = meta18171;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async18170.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18172,meta18171__$1){
var self__ = this;
var _18172__$1 = this;
return (new cljs.core.async.t_cljs$core$async18170(self__.flag,meta18171__$1));
}));

(cljs.core.async.t_cljs$core$async18170.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18172){
var self__ = this;
var _18172__$1 = this;
return self__.meta18171;
}));

(cljs.core.async.t_cljs$core$async18170.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18170.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async18170.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async18170.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async18170.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta18171","meta18171",814407497,null)], null);
}));

(cljs.core.async.t_cljs$core$async18170.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async18170.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18170");

(cljs.core.async.t_cljs$core$async18170.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async18170");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18170.
 */
cljs.core.async.__GT_t_cljs$core$async18170 = (function cljs$core$async$__GT_t_cljs$core$async18170(flag,meta18171){
return (new cljs.core.async.t_cljs$core$async18170(flag,meta18171));
});


cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
return (new cljs.core.async.t_cljs$core$async18170(flag,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18175 = (function (flag,cb,meta18176){
this.flag = flag;
this.cb = cb;
this.meta18176 = meta18176;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async18175.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18177,meta18176__$1){
var self__ = this;
var _18177__$1 = this;
return (new cljs.core.async.t_cljs$core$async18175(self__.flag,self__.cb,meta18176__$1));
}));

(cljs.core.async.t_cljs$core$async18175.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18177){
var self__ = this;
var _18177__$1 = this;
return self__.meta18176;
}));

(cljs.core.async.t_cljs$core$async18175.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18175.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async18175.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async18175.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async18175.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta18176","meta18176",-576449676,null)], null);
}));

(cljs.core.async.t_cljs$core$async18175.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async18175.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18175");

(cljs.core.async.t_cljs$core$async18175.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async18175");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18175.
 */
cljs.core.async.__GT_t_cljs$core$async18175 = (function cljs$core$async$__GT_t_cljs$core$async18175(flag,cb,meta18176){
return (new cljs.core.async.t_cljs$core$async18175(flag,cb,meta18176));
});


cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
return (new cljs.core.async.t_cljs$core$async18175(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var n = cljs.core.count(ports);
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__18179_SHARP_){
var G__18183 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__18179_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__18183) : fret.call(null,G__18183));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__18180_SHARP_){
var G__18184 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__18180_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__18184) : fret.call(null,G__18184));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__5002__auto__ = wport;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return port;
}
})()], null));
} else {
var G__20392 = (i + (1));
i = G__20392;
continue;
}
} else {
return null;
}
break;
}
})();
var or__5002__auto__ = ret;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5804__auto__ = (function (){var and__5000__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__5000__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__5000__auto__;
}
})();
if(cljs.core.truth_(temp__5804__auto__)){
var got = temp__5804__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___20393 = arguments.length;
var i__5727__auto___20394 = (0);
while(true){
if((i__5727__auto___20394 < len__5726__auto___20393)){
args__5732__auto__.push((arguments[i__5727__auto___20394]));

var G__20395 = (i__5727__auto___20394 + (1));
i__5727__auto___20394 = G__20395;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__18189){
var map__18190 = p__18189;
var map__18190__$1 = cljs.core.__destructure_map(map__18190);
var opts = map__18190__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq18186){
var G__18187 = cljs.core.first(seq18186);
var seq18186__$1 = cljs.core.next(seq18186);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__18187,seq18186__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__18219 = arguments.length;
switch (G__18219) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__18002__auto___20397 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_18299){
var state_val_18301 = (state_18299[(1)]);
if((state_val_18301 === (7))){
var inst_18283 = (state_18299[(2)]);
var state_18299__$1 = state_18299;
var statearr_18312_20398 = state_18299__$1;
(statearr_18312_20398[(2)] = inst_18283);

(statearr_18312_20398[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18301 === (1))){
var state_18299__$1 = state_18299;
var statearr_18314_20399 = state_18299__$1;
(statearr_18314_20399[(2)] = null);

(statearr_18314_20399[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18301 === (4))){
var inst_18250 = (state_18299[(7)]);
var inst_18250__$1 = (state_18299[(2)]);
var inst_18258 = (inst_18250__$1 == null);
var state_18299__$1 = (function (){var statearr_18315 = state_18299;
(statearr_18315[(7)] = inst_18250__$1);

return statearr_18315;
})();
if(cljs.core.truth_(inst_18258)){
var statearr_18316_20401 = state_18299__$1;
(statearr_18316_20401[(1)] = (5));

} else {
var statearr_18317_20402 = state_18299__$1;
(statearr_18317_20402[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18301 === (13))){
var state_18299__$1 = state_18299;
var statearr_18318_20403 = state_18299__$1;
(statearr_18318_20403[(2)] = null);

(statearr_18318_20403[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18301 === (6))){
var inst_18250 = (state_18299[(7)]);
var state_18299__$1 = state_18299;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18299__$1,(11),to,inst_18250);
} else {
if((state_val_18301 === (3))){
var inst_18285 = (state_18299[(2)]);
var state_18299__$1 = state_18299;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18299__$1,inst_18285);
} else {
if((state_val_18301 === (12))){
var state_18299__$1 = state_18299;
var statearr_18332_20404 = state_18299__$1;
(statearr_18332_20404[(2)] = null);

(statearr_18332_20404[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18301 === (2))){
var state_18299__$1 = state_18299;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18299__$1,(4),from);
} else {
if((state_val_18301 === (11))){
var inst_18276 = (state_18299[(2)]);
var state_18299__$1 = state_18299;
if(cljs.core.truth_(inst_18276)){
var statearr_18333_20405 = state_18299__$1;
(statearr_18333_20405[(1)] = (12));

} else {
var statearr_18334_20406 = state_18299__$1;
(statearr_18334_20406[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18301 === (9))){
var state_18299__$1 = state_18299;
var statearr_18335_20407 = state_18299__$1;
(statearr_18335_20407[(2)] = null);

(statearr_18335_20407[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18301 === (5))){
var state_18299__$1 = state_18299;
if(cljs.core.truth_(close_QMARK_)){
var statearr_18336_20408 = state_18299__$1;
(statearr_18336_20408[(1)] = (8));

} else {
var statearr_18337_20409 = state_18299__$1;
(statearr_18337_20409[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18301 === (14))){
var inst_18281 = (state_18299[(2)]);
var state_18299__$1 = state_18299;
var statearr_18340_20410 = state_18299__$1;
(statearr_18340_20410[(2)] = inst_18281);

(statearr_18340_20410[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18301 === (10))){
var inst_18273 = (state_18299[(2)]);
var state_18299__$1 = state_18299;
var statearr_18341_20411 = state_18299__$1;
(statearr_18341_20411[(2)] = inst_18273);

(statearr_18341_20411[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18301 === (8))){
var inst_18270 = cljs.core.async.close_BANG_(to);
var state_18299__$1 = state_18299;
var statearr_18342_20412 = state_18299__$1;
(statearr_18342_20412[(2)] = inst_18270);

(statearr_18342_20412[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__17706__auto__ = null;
var cljs$core$async$state_machine__17706__auto____0 = (function (){
var statearr_18343 = [null,null,null,null,null,null,null,null];
(statearr_18343[(0)] = cljs$core$async$state_machine__17706__auto__);

(statearr_18343[(1)] = (1));

return statearr_18343;
});
var cljs$core$async$state_machine__17706__auto____1 = (function (state_18299){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_18299);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e18344){var ex__17709__auto__ = e18344;
var statearr_18345_20414 = state_18299;
(statearr_18345_20414[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_18299[(4)]))){
var statearr_18346_20418 = state_18299;
(statearr_18346_20418[(1)] = cljs.core.first((state_18299[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20419 = state_18299;
state_18299 = G__20419;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$state_machine__17706__auto__ = function(state_18299){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__17706__auto____1.call(this,state_18299);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__17706__auto____0;
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__17706__auto____1;
return cljs$core$async$state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_18348 = f__18003__auto__();
(statearr_18348[(6)] = c__18002__auto___20397);

return statearr_18348;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process__$1 = (function (p__18350){
var vec__18351 = p__18350;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18351,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18351,(1),null);
var job = vec__18351;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__18002__auto___20424 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_18358){
var state_val_18359 = (state_18358[(1)]);
if((state_val_18359 === (1))){
var state_18358__$1 = state_18358;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18358__$1,(2),res,v);
} else {
if((state_val_18359 === (2))){
var inst_18355 = (state_18358[(2)]);
var inst_18356 = cljs.core.async.close_BANG_(res);
var state_18358__$1 = (function (){var statearr_18361 = state_18358;
(statearr_18361[(7)] = inst_18355);

return statearr_18361;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_18358__$1,inst_18356);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0 = (function (){
var statearr_18362 = [null,null,null,null,null,null,null,null];
(statearr_18362[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__);

(statearr_18362[(1)] = (1));

return statearr_18362;
});
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1 = (function (state_18358){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_18358);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e18363){var ex__17709__auto__ = e18363;
var statearr_18364_20425 = state_18358;
(statearr_18364_20425[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_18358[(4)]))){
var statearr_18365_20426 = state_18358;
(statearr_18365_20426[(1)] = cljs.core.first((state_18358[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20427 = state_18358;
state_18358 = G__20427;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__ = function(state_18358){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1.call(this,state_18358);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_18367 = f__18003__auto__();
(statearr_18367[(6)] = c__18002__auto___20424);

return statearr_18367;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__18368){
var vec__18369 = p__18368;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18369,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18369,(1),null);
var job = vec__18369;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__5593__auto___20428 = n;
var __20429 = (0);
while(true){
if((__20429 < n__5593__auto___20428)){
var G__18372_20430 = type;
var G__18372_20431__$1 = (((G__18372_20430 instanceof cljs.core.Keyword))?G__18372_20430.fqn:null);
switch (G__18372_20431__$1) {
case "compute":
var c__18002__auto___20433 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__20429,c__18002__auto___20433,G__18372_20430,G__18372_20431__$1,n__5593__auto___20428,jobs,results,process__$1,async){
return (function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = ((function (__20429,c__18002__auto___20433,G__18372_20430,G__18372_20431__$1,n__5593__auto___20428,jobs,results,process__$1,async){
return (function (state_18386){
var state_val_18387 = (state_18386[(1)]);
if((state_val_18387 === (1))){
var state_18386__$1 = state_18386;
var statearr_18388_20434 = state_18386__$1;
(statearr_18388_20434[(2)] = null);

(statearr_18388_20434[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18387 === (2))){
var state_18386__$1 = state_18386;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18386__$1,(4),jobs);
} else {
if((state_val_18387 === (3))){
var inst_18384 = (state_18386[(2)]);
var state_18386__$1 = state_18386;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18386__$1,inst_18384);
} else {
if((state_val_18387 === (4))){
var inst_18376 = (state_18386[(2)]);
var inst_18377 = process__$1(inst_18376);
var state_18386__$1 = state_18386;
if(cljs.core.truth_(inst_18377)){
var statearr_18389_20435 = state_18386__$1;
(statearr_18389_20435[(1)] = (5));

} else {
var statearr_18390_20436 = state_18386__$1;
(statearr_18390_20436[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18387 === (5))){
var state_18386__$1 = state_18386;
var statearr_18392_20437 = state_18386__$1;
(statearr_18392_20437[(2)] = null);

(statearr_18392_20437[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18387 === (6))){
var state_18386__$1 = state_18386;
var statearr_18393_20438 = state_18386__$1;
(statearr_18393_20438[(2)] = null);

(statearr_18393_20438[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18387 === (7))){
var inst_18382 = (state_18386[(2)]);
var state_18386__$1 = state_18386;
var statearr_18394_20439 = state_18386__$1;
(statearr_18394_20439[(2)] = inst_18382);

(statearr_18394_20439[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__20429,c__18002__auto___20433,G__18372_20430,G__18372_20431__$1,n__5593__auto___20428,jobs,results,process__$1,async))
;
return ((function (__20429,switch__17705__auto__,c__18002__auto___20433,G__18372_20430,G__18372_20431__$1,n__5593__auto___20428,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0 = (function (){
var statearr_18395 = [null,null,null,null,null,null,null];
(statearr_18395[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__);

(statearr_18395[(1)] = (1));

return statearr_18395;
});
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1 = (function (state_18386){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_18386);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e18396){var ex__17709__auto__ = e18396;
var statearr_18397_20442 = state_18386;
(statearr_18397_20442[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_18386[(4)]))){
var statearr_18398_20444 = state_18386;
(statearr_18398_20444[(1)] = cljs.core.first((state_18386[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20446 = state_18386;
state_18386 = G__20446;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__ = function(state_18386){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1.call(this,state_18386);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__;
})()
;})(__20429,switch__17705__auto__,c__18002__auto___20433,G__18372_20430,G__18372_20431__$1,n__5593__auto___20428,jobs,results,process__$1,async))
})();
var state__18004__auto__ = (function (){var statearr_18400 = f__18003__auto__();
(statearr_18400[(6)] = c__18002__auto___20433);

return statearr_18400;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
});})(__20429,c__18002__auto___20433,G__18372_20430,G__18372_20431__$1,n__5593__auto___20428,jobs,results,process__$1,async))
);


break;
case "async":
var c__18002__auto___20447 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__20429,c__18002__auto___20447,G__18372_20430,G__18372_20431__$1,n__5593__auto___20428,jobs,results,process__$1,async){
return (function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = ((function (__20429,c__18002__auto___20447,G__18372_20430,G__18372_20431__$1,n__5593__auto___20428,jobs,results,process__$1,async){
return (function (state_18413){
var state_val_18414 = (state_18413[(1)]);
if((state_val_18414 === (1))){
var state_18413__$1 = state_18413;
var statearr_18415_20448 = state_18413__$1;
(statearr_18415_20448[(2)] = null);

(statearr_18415_20448[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18414 === (2))){
var state_18413__$1 = state_18413;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18413__$1,(4),jobs);
} else {
if((state_val_18414 === (3))){
var inst_18411 = (state_18413[(2)]);
var state_18413__$1 = state_18413;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18413__$1,inst_18411);
} else {
if((state_val_18414 === (4))){
var inst_18403 = (state_18413[(2)]);
var inst_18404 = async(inst_18403);
var state_18413__$1 = state_18413;
if(cljs.core.truth_(inst_18404)){
var statearr_18417_20449 = state_18413__$1;
(statearr_18417_20449[(1)] = (5));

} else {
var statearr_18418_20450 = state_18413__$1;
(statearr_18418_20450[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18414 === (5))){
var state_18413__$1 = state_18413;
var statearr_18419_20451 = state_18413__$1;
(statearr_18419_20451[(2)] = null);

(statearr_18419_20451[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18414 === (6))){
var state_18413__$1 = state_18413;
var statearr_18420_20452 = state_18413__$1;
(statearr_18420_20452[(2)] = null);

(statearr_18420_20452[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18414 === (7))){
var inst_18409 = (state_18413[(2)]);
var state_18413__$1 = state_18413;
var statearr_18421_20453 = state_18413__$1;
(statearr_18421_20453[(2)] = inst_18409);

(statearr_18421_20453[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__20429,c__18002__auto___20447,G__18372_20430,G__18372_20431__$1,n__5593__auto___20428,jobs,results,process__$1,async))
;
return ((function (__20429,switch__17705__auto__,c__18002__auto___20447,G__18372_20430,G__18372_20431__$1,n__5593__auto___20428,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0 = (function (){
var statearr_18423 = [null,null,null,null,null,null,null];
(statearr_18423[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__);

(statearr_18423[(1)] = (1));

return statearr_18423;
});
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1 = (function (state_18413){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_18413);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e18424){var ex__17709__auto__ = e18424;
var statearr_18425_20454 = state_18413;
(statearr_18425_20454[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_18413[(4)]))){
var statearr_18426_20455 = state_18413;
(statearr_18426_20455[(1)] = cljs.core.first((state_18413[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20456 = state_18413;
state_18413 = G__20456;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__ = function(state_18413){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1.call(this,state_18413);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__;
})()
;})(__20429,switch__17705__auto__,c__18002__auto___20447,G__18372_20430,G__18372_20431__$1,n__5593__auto___20428,jobs,results,process__$1,async))
})();
var state__18004__auto__ = (function (){var statearr_18427 = f__18003__auto__();
(statearr_18427[(6)] = c__18002__auto___20447);

return statearr_18427;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
});})(__20429,c__18002__auto___20447,G__18372_20430,G__18372_20431__$1,n__5593__auto___20428,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18372_20431__$1)].join('')));

}

var G__20457 = (__20429 + (1));
__20429 = G__20457;
continue;
} else {
}
break;
}

var c__18002__auto___20458 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_18450){
var state_val_18451 = (state_18450[(1)]);
if((state_val_18451 === (7))){
var inst_18446 = (state_18450[(2)]);
var state_18450__$1 = state_18450;
var statearr_18453_20459 = state_18450__$1;
(statearr_18453_20459[(2)] = inst_18446);

(statearr_18453_20459[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18451 === (1))){
var state_18450__$1 = state_18450;
var statearr_18454_20460 = state_18450__$1;
(statearr_18454_20460[(2)] = null);

(statearr_18454_20460[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18451 === (4))){
var inst_18430 = (state_18450[(7)]);
var inst_18430__$1 = (state_18450[(2)]);
var inst_18431 = (inst_18430__$1 == null);
var state_18450__$1 = (function (){var statearr_18455 = state_18450;
(statearr_18455[(7)] = inst_18430__$1);

return statearr_18455;
})();
if(cljs.core.truth_(inst_18431)){
var statearr_18456_20461 = state_18450__$1;
(statearr_18456_20461[(1)] = (5));

} else {
var statearr_18457_20462 = state_18450__$1;
(statearr_18457_20462[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18451 === (6))){
var inst_18430 = (state_18450[(7)]);
var inst_18435 = (state_18450[(8)]);
var inst_18435__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_18437 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_18438 = [inst_18430,inst_18435__$1];
var inst_18439 = (new cljs.core.PersistentVector(null,2,(5),inst_18437,inst_18438,null));
var state_18450__$1 = (function (){var statearr_18458 = state_18450;
(statearr_18458[(8)] = inst_18435__$1);

return statearr_18458;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18450__$1,(8),jobs,inst_18439);
} else {
if((state_val_18451 === (3))){
var inst_18448 = (state_18450[(2)]);
var state_18450__$1 = state_18450;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18450__$1,inst_18448);
} else {
if((state_val_18451 === (2))){
var state_18450__$1 = state_18450;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18450__$1,(4),from);
} else {
if((state_val_18451 === (9))){
var inst_18443 = (state_18450[(2)]);
var state_18450__$1 = (function (){var statearr_18460 = state_18450;
(statearr_18460[(9)] = inst_18443);

return statearr_18460;
})();
var statearr_18461_20464 = state_18450__$1;
(statearr_18461_20464[(2)] = null);

(statearr_18461_20464[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18451 === (5))){
var inst_18433 = cljs.core.async.close_BANG_(jobs);
var state_18450__$1 = state_18450;
var statearr_18462_20469 = state_18450__$1;
(statearr_18462_20469[(2)] = inst_18433);

(statearr_18462_20469[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18451 === (8))){
var inst_18435 = (state_18450[(8)]);
var inst_18441 = (state_18450[(2)]);
var state_18450__$1 = (function (){var statearr_18463 = state_18450;
(statearr_18463[(10)] = inst_18441);

return statearr_18463;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18450__$1,(9),results,inst_18435);
} else {
return null;
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0 = (function (){
var statearr_18464 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_18464[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__);

(statearr_18464[(1)] = (1));

return statearr_18464;
});
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1 = (function (state_18450){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_18450);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e18465){var ex__17709__auto__ = e18465;
var statearr_18466_20470 = state_18450;
(statearr_18466_20470[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_18450[(4)]))){
var statearr_18468_20471 = state_18450;
(statearr_18468_20471[(1)] = cljs.core.first((state_18450[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20472 = state_18450;
state_18450 = G__20472;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__ = function(state_18450){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1.call(this,state_18450);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_18469 = f__18003__auto__();
(statearr_18469[(6)] = c__18002__auto___20458);

return statearr_18469;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));


var c__18002__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_18508){
var state_val_18509 = (state_18508[(1)]);
if((state_val_18509 === (7))){
var inst_18503 = (state_18508[(2)]);
var state_18508__$1 = state_18508;
var statearr_18510_20474 = state_18508__$1;
(statearr_18510_20474[(2)] = inst_18503);

(statearr_18510_20474[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (20))){
var state_18508__$1 = state_18508;
var statearr_18511_20475 = state_18508__$1;
(statearr_18511_20475[(2)] = null);

(statearr_18511_20475[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (1))){
var state_18508__$1 = state_18508;
var statearr_18512_20479 = state_18508__$1;
(statearr_18512_20479[(2)] = null);

(statearr_18512_20479[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (4))){
var inst_18472 = (state_18508[(7)]);
var inst_18472__$1 = (state_18508[(2)]);
var inst_18473 = (inst_18472__$1 == null);
var state_18508__$1 = (function (){var statearr_18513 = state_18508;
(statearr_18513[(7)] = inst_18472__$1);

return statearr_18513;
})();
if(cljs.core.truth_(inst_18473)){
var statearr_18515_20481 = state_18508__$1;
(statearr_18515_20481[(1)] = (5));

} else {
var statearr_18516_20482 = state_18508__$1;
(statearr_18516_20482[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (15))){
var inst_18485 = (state_18508[(8)]);
var state_18508__$1 = state_18508;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18508__$1,(18),to,inst_18485);
} else {
if((state_val_18509 === (21))){
var inst_18498 = (state_18508[(2)]);
var state_18508__$1 = state_18508;
var statearr_18517_20483 = state_18508__$1;
(statearr_18517_20483[(2)] = inst_18498);

(statearr_18517_20483[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (13))){
var inst_18500 = (state_18508[(2)]);
var state_18508__$1 = (function (){var statearr_18518 = state_18508;
(statearr_18518[(9)] = inst_18500);

return statearr_18518;
})();
var statearr_18519_20484 = state_18508__$1;
(statearr_18519_20484[(2)] = null);

(statearr_18519_20484[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (6))){
var inst_18472 = (state_18508[(7)]);
var state_18508__$1 = state_18508;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18508__$1,(11),inst_18472);
} else {
if((state_val_18509 === (17))){
var inst_18493 = (state_18508[(2)]);
var state_18508__$1 = state_18508;
if(cljs.core.truth_(inst_18493)){
var statearr_18520_20485 = state_18508__$1;
(statearr_18520_20485[(1)] = (19));

} else {
var statearr_18521_20486 = state_18508__$1;
(statearr_18521_20486[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (3))){
var inst_18506 = (state_18508[(2)]);
var state_18508__$1 = state_18508;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18508__$1,inst_18506);
} else {
if((state_val_18509 === (12))){
var inst_18482 = (state_18508[(10)]);
var state_18508__$1 = state_18508;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18508__$1,(14),inst_18482);
} else {
if((state_val_18509 === (2))){
var state_18508__$1 = state_18508;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18508__$1,(4),results);
} else {
if((state_val_18509 === (19))){
var state_18508__$1 = state_18508;
var statearr_18523_20487 = state_18508__$1;
(statearr_18523_20487[(2)] = null);

(statearr_18523_20487[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (11))){
var inst_18482 = (state_18508[(2)]);
var state_18508__$1 = (function (){var statearr_18524 = state_18508;
(statearr_18524[(10)] = inst_18482);

return statearr_18524;
})();
var statearr_18525_20488 = state_18508__$1;
(statearr_18525_20488[(2)] = null);

(statearr_18525_20488[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (9))){
var state_18508__$1 = state_18508;
var statearr_18526_20489 = state_18508__$1;
(statearr_18526_20489[(2)] = null);

(statearr_18526_20489[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (5))){
var state_18508__$1 = state_18508;
if(cljs.core.truth_(close_QMARK_)){
var statearr_18527_20490 = state_18508__$1;
(statearr_18527_20490[(1)] = (8));

} else {
var statearr_18528_20491 = state_18508__$1;
(statearr_18528_20491[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (14))){
var inst_18487 = (state_18508[(11)]);
var inst_18485 = (state_18508[(8)]);
var inst_18485__$1 = (state_18508[(2)]);
var inst_18486 = (inst_18485__$1 == null);
var inst_18487__$1 = cljs.core.not(inst_18486);
var state_18508__$1 = (function (){var statearr_18530 = state_18508;
(statearr_18530[(11)] = inst_18487__$1);

(statearr_18530[(8)] = inst_18485__$1);

return statearr_18530;
})();
if(inst_18487__$1){
var statearr_18531_20492 = state_18508__$1;
(statearr_18531_20492[(1)] = (15));

} else {
var statearr_18532_20493 = state_18508__$1;
(statearr_18532_20493[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (16))){
var inst_18487 = (state_18508[(11)]);
var state_18508__$1 = state_18508;
var statearr_18533_20494 = state_18508__$1;
(statearr_18533_20494[(2)] = inst_18487);

(statearr_18533_20494[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (10))){
var inst_18479 = (state_18508[(2)]);
var state_18508__$1 = state_18508;
var statearr_18534_20495 = state_18508__$1;
(statearr_18534_20495[(2)] = inst_18479);

(statearr_18534_20495[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (18))){
var inst_18490 = (state_18508[(2)]);
var state_18508__$1 = state_18508;
var statearr_18535_20496 = state_18508__$1;
(statearr_18535_20496[(2)] = inst_18490);

(statearr_18535_20496[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18509 === (8))){
var inst_18476 = cljs.core.async.close_BANG_(to);
var state_18508__$1 = state_18508;
var statearr_18536_20497 = state_18508__$1;
(statearr_18536_20497[(2)] = inst_18476);

(statearr_18536_20497[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0 = (function (){
var statearr_18538 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18538[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__);

(statearr_18538[(1)] = (1));

return statearr_18538;
});
var cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1 = (function (state_18508){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_18508);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e18539){var ex__17709__auto__ = e18539;
var statearr_18540_20500 = state_18508;
(statearr_18540_20500[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_18508[(4)]))){
var statearr_18541_20501 = state_18508;
(statearr_18541_20501[(1)] = cljs.core.first((state_18508[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20502 = state_18508;
state_18508 = G__20502;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__ = function(state_18508){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1.call(this,state_18508);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__17706__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_18542 = f__18003__auto__();
(statearr_18542[(6)] = c__18002__auto__);

return statearr_18542;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));

return c__18002__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). The
 *   presumption is that af will return immediately, having launched some
 *   asynchronous operation whose completion/callback will put results on
 *   the channel, then close! it. Outputs will be returned in order
 *   relative to the inputs. By default, the to channel will be closed
 *   when the from channel closes, but can be determined by the close?
 *   parameter. Will stop consuming the from channel if the to channel
 *   closes. See also pipeline, pipeline-blocking.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__18545 = arguments.length;
switch (G__18545) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__18549 = arguments.length;
switch (G__18549) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__18553 = arguments.length;
switch (G__18553) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__18002__auto___20508 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_18579){
var state_val_18580 = (state_18579[(1)]);
if((state_val_18580 === (7))){
var inst_18575 = (state_18579[(2)]);
var state_18579__$1 = state_18579;
var statearr_18581_20510 = state_18579__$1;
(statearr_18581_20510[(2)] = inst_18575);

(statearr_18581_20510[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18580 === (1))){
var state_18579__$1 = state_18579;
var statearr_18582_20514 = state_18579__$1;
(statearr_18582_20514[(2)] = null);

(statearr_18582_20514[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18580 === (4))){
var inst_18556 = (state_18579[(7)]);
var inst_18556__$1 = (state_18579[(2)]);
var inst_18557 = (inst_18556__$1 == null);
var state_18579__$1 = (function (){var statearr_18585 = state_18579;
(statearr_18585[(7)] = inst_18556__$1);

return statearr_18585;
})();
if(cljs.core.truth_(inst_18557)){
var statearr_18586_20515 = state_18579__$1;
(statearr_18586_20515[(1)] = (5));

} else {
var statearr_18587_20516 = state_18579__$1;
(statearr_18587_20516[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18580 === (13))){
var state_18579__$1 = state_18579;
var statearr_18588_20517 = state_18579__$1;
(statearr_18588_20517[(2)] = null);

(statearr_18588_20517[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18580 === (6))){
var inst_18556 = (state_18579[(7)]);
var inst_18562 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_18556) : p.call(null,inst_18556));
var state_18579__$1 = state_18579;
if(cljs.core.truth_(inst_18562)){
var statearr_18589_20518 = state_18579__$1;
(statearr_18589_20518[(1)] = (9));

} else {
var statearr_18590_20519 = state_18579__$1;
(statearr_18590_20519[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18580 === (3))){
var inst_18577 = (state_18579[(2)]);
var state_18579__$1 = state_18579;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18579__$1,inst_18577);
} else {
if((state_val_18580 === (12))){
var state_18579__$1 = state_18579;
var statearr_18591_20520 = state_18579__$1;
(statearr_18591_20520[(2)] = null);

(statearr_18591_20520[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18580 === (2))){
var state_18579__$1 = state_18579;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18579__$1,(4),ch);
} else {
if((state_val_18580 === (11))){
var inst_18556 = (state_18579[(7)]);
var inst_18566 = (state_18579[(2)]);
var state_18579__$1 = state_18579;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18579__$1,(8),inst_18566,inst_18556);
} else {
if((state_val_18580 === (9))){
var state_18579__$1 = state_18579;
var statearr_18592_20523 = state_18579__$1;
(statearr_18592_20523[(2)] = tc);

(statearr_18592_20523[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18580 === (5))){
var inst_18559 = cljs.core.async.close_BANG_(tc);
var inst_18560 = cljs.core.async.close_BANG_(fc);
var state_18579__$1 = (function (){var statearr_18593 = state_18579;
(statearr_18593[(8)] = inst_18559);

return statearr_18593;
})();
var statearr_18594_20524 = state_18579__$1;
(statearr_18594_20524[(2)] = inst_18560);

(statearr_18594_20524[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18580 === (14))){
var inst_18573 = (state_18579[(2)]);
var state_18579__$1 = state_18579;
var statearr_18595_20525 = state_18579__$1;
(statearr_18595_20525[(2)] = inst_18573);

(statearr_18595_20525[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18580 === (10))){
var state_18579__$1 = state_18579;
var statearr_18596_20527 = state_18579__$1;
(statearr_18596_20527[(2)] = fc);

(statearr_18596_20527[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18580 === (8))){
var inst_18568 = (state_18579[(2)]);
var state_18579__$1 = state_18579;
if(cljs.core.truth_(inst_18568)){
var statearr_18597_20529 = state_18579__$1;
(statearr_18597_20529[(1)] = (12));

} else {
var statearr_18598_20530 = state_18579__$1;
(statearr_18598_20530[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__17706__auto__ = null;
var cljs$core$async$state_machine__17706__auto____0 = (function (){
var statearr_18599 = [null,null,null,null,null,null,null,null,null];
(statearr_18599[(0)] = cljs$core$async$state_machine__17706__auto__);

(statearr_18599[(1)] = (1));

return statearr_18599;
});
var cljs$core$async$state_machine__17706__auto____1 = (function (state_18579){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_18579);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e18600){var ex__17709__auto__ = e18600;
var statearr_18601_20532 = state_18579;
(statearr_18601_20532[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_18579[(4)]))){
var statearr_18602_20533 = state_18579;
(statearr_18602_20533[(1)] = cljs.core.first((state_18579[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20534 = state_18579;
state_18579 = G__20534;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$state_machine__17706__auto__ = function(state_18579){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__17706__auto____1.call(this,state_18579);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__17706__auto____0;
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__17706__auto____1;
return cljs$core$async$state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_18604 = f__18003__auto__();
(statearr_18604[(6)] = c__18002__auto___20508);

return statearr_18604;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__18002__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_18634){
var state_val_18635 = (state_18634[(1)]);
if((state_val_18635 === (7))){
var inst_18630 = (state_18634[(2)]);
var state_18634__$1 = state_18634;
var statearr_18636_20535 = state_18634__$1;
(statearr_18636_20535[(2)] = inst_18630);

(statearr_18636_20535[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18635 === (1))){
var inst_18610 = init;
var inst_18611 = inst_18610;
var state_18634__$1 = (function (){var statearr_18637 = state_18634;
(statearr_18637[(7)] = inst_18611);

return statearr_18637;
})();
var statearr_18639_20536 = state_18634__$1;
(statearr_18639_20536[(2)] = null);

(statearr_18639_20536[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18635 === (4))){
var inst_18614 = (state_18634[(8)]);
var inst_18614__$1 = (state_18634[(2)]);
var inst_18615 = (inst_18614__$1 == null);
var state_18634__$1 = (function (){var statearr_18643 = state_18634;
(statearr_18643[(8)] = inst_18614__$1);

return statearr_18643;
})();
if(cljs.core.truth_(inst_18615)){
var statearr_18644_20537 = state_18634__$1;
(statearr_18644_20537[(1)] = (5));

} else {
var statearr_18646_20538 = state_18634__$1;
(statearr_18646_20538[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18635 === (6))){
var inst_18621 = (state_18634[(9)]);
var inst_18611 = (state_18634[(7)]);
var inst_18614 = (state_18634[(8)]);
var inst_18621__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_18611,inst_18614) : f.call(null,inst_18611,inst_18614));
var inst_18622 = cljs.core.reduced_QMARK_(inst_18621__$1);
var state_18634__$1 = (function (){var statearr_18650 = state_18634;
(statearr_18650[(9)] = inst_18621__$1);

return statearr_18650;
})();
if(inst_18622){
var statearr_18651_20539 = state_18634__$1;
(statearr_18651_20539[(1)] = (8));

} else {
var statearr_18653_20540 = state_18634__$1;
(statearr_18653_20540[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18635 === (3))){
var inst_18632 = (state_18634[(2)]);
var state_18634__$1 = state_18634;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18634__$1,inst_18632);
} else {
if((state_val_18635 === (2))){
var state_18634__$1 = state_18634;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18634__$1,(4),ch);
} else {
if((state_val_18635 === (9))){
var inst_18621 = (state_18634[(9)]);
var inst_18611 = inst_18621;
var state_18634__$1 = (function (){var statearr_18658 = state_18634;
(statearr_18658[(7)] = inst_18611);

return statearr_18658;
})();
var statearr_18659_20541 = state_18634__$1;
(statearr_18659_20541[(2)] = null);

(statearr_18659_20541[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18635 === (5))){
var inst_18611 = (state_18634[(7)]);
var state_18634__$1 = state_18634;
var statearr_18663_20542 = state_18634__$1;
(statearr_18663_20542[(2)] = inst_18611);

(statearr_18663_20542[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18635 === (10))){
var inst_18628 = (state_18634[(2)]);
var state_18634__$1 = state_18634;
var statearr_18665_20543 = state_18634__$1;
(statearr_18665_20543[(2)] = inst_18628);

(statearr_18665_20543[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18635 === (8))){
var inst_18621 = (state_18634[(9)]);
var inst_18624 = cljs.core.deref(inst_18621);
var state_18634__$1 = state_18634;
var statearr_18669_20547 = state_18634__$1;
(statearr_18669_20547[(2)] = inst_18624);

(statearr_18669_20547[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$reduce_$_state_machine__17706__auto__ = null;
var cljs$core$async$reduce_$_state_machine__17706__auto____0 = (function (){
var statearr_18671 = [null,null,null,null,null,null,null,null,null,null];
(statearr_18671[(0)] = cljs$core$async$reduce_$_state_machine__17706__auto__);

(statearr_18671[(1)] = (1));

return statearr_18671;
});
var cljs$core$async$reduce_$_state_machine__17706__auto____1 = (function (state_18634){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_18634);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e18675){var ex__17709__auto__ = e18675;
var statearr_18676_20548 = state_18634;
(statearr_18676_20548[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_18634[(4)]))){
var statearr_18677_20549 = state_18634;
(statearr_18677_20549[(1)] = cljs.core.first((state_18634[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20550 = state_18634;
state_18634 = G__20550;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__17706__auto__ = function(state_18634){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__17706__auto____1.call(this,state_18634);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__17706__auto____0;
cljs$core$async$reduce_$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__17706__auto____1;
return cljs$core$async$reduce_$_state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_18679 = f__18003__auto__();
(statearr_18679[(6)] = c__18002__auto__);

return statearr_18679;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));

return c__18002__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__18002__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_18689){
var state_val_18690 = (state_18689[(1)]);
if((state_val_18690 === (1))){
var inst_18684 = cljs.core.async.reduce(f__$1,init,ch);
var state_18689__$1 = state_18689;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18689__$1,(2),inst_18684);
} else {
if((state_val_18690 === (2))){
var inst_18686 = (state_18689[(2)]);
var inst_18687 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_18686) : f__$1.call(null,inst_18686));
var state_18689__$1 = state_18689;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18689__$1,inst_18687);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__17706__auto__ = null;
var cljs$core$async$transduce_$_state_machine__17706__auto____0 = (function (){
var statearr_18695 = [null,null,null,null,null,null,null];
(statearr_18695[(0)] = cljs$core$async$transduce_$_state_machine__17706__auto__);

(statearr_18695[(1)] = (1));

return statearr_18695;
});
var cljs$core$async$transduce_$_state_machine__17706__auto____1 = (function (state_18689){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_18689);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e18697){var ex__17709__auto__ = e18697;
var statearr_18699_20555 = state_18689;
(statearr_18699_20555[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_18689[(4)]))){
var statearr_18701_20556 = state_18689;
(statearr_18701_20556[(1)] = cljs.core.first((state_18689[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20557 = state_18689;
state_18689 = G__20557;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__17706__auto__ = function(state_18689){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__17706__auto____1.call(this,state_18689);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__17706__auto____0;
cljs$core$async$transduce_$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__17706__auto____1;
return cljs$core$async$transduce_$_state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_18703 = f__18003__auto__();
(statearr_18703[(6)] = c__18002__auto__);

return statearr_18703;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));

return c__18002__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__18708 = arguments.length;
switch (G__18708) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__18002__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_18742){
var state_val_18743 = (state_18742[(1)]);
if((state_val_18743 === (7))){
var inst_18721 = (state_18742[(2)]);
var state_18742__$1 = state_18742;
var statearr_18748_20560 = state_18742__$1;
(statearr_18748_20560[(2)] = inst_18721);

(statearr_18748_20560[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18743 === (1))){
var inst_18713 = cljs.core.seq(coll);
var inst_18714 = inst_18713;
var state_18742__$1 = (function (){var statearr_18749 = state_18742;
(statearr_18749[(7)] = inst_18714);

return statearr_18749;
})();
var statearr_18751_20563 = state_18742__$1;
(statearr_18751_20563[(2)] = null);

(statearr_18751_20563[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18743 === (4))){
var inst_18714 = (state_18742[(7)]);
var inst_18718 = cljs.core.first(inst_18714);
var state_18742__$1 = state_18742;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18742__$1,(7),ch,inst_18718);
} else {
if((state_val_18743 === (13))){
var inst_18735 = (state_18742[(2)]);
var state_18742__$1 = state_18742;
var statearr_18756_20564 = state_18742__$1;
(statearr_18756_20564[(2)] = inst_18735);

(statearr_18756_20564[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18743 === (6))){
var inst_18724 = (state_18742[(2)]);
var state_18742__$1 = state_18742;
if(cljs.core.truth_(inst_18724)){
var statearr_18758_20565 = state_18742__$1;
(statearr_18758_20565[(1)] = (8));

} else {
var statearr_18759_20566 = state_18742__$1;
(statearr_18759_20566[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18743 === (3))){
var inst_18740 = (state_18742[(2)]);
var state_18742__$1 = state_18742;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18742__$1,inst_18740);
} else {
if((state_val_18743 === (12))){
var state_18742__$1 = state_18742;
var statearr_18764_20567 = state_18742__$1;
(statearr_18764_20567[(2)] = null);

(statearr_18764_20567[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18743 === (2))){
var inst_18714 = (state_18742[(7)]);
var state_18742__$1 = state_18742;
if(cljs.core.truth_(inst_18714)){
var statearr_18766_20568 = state_18742__$1;
(statearr_18766_20568[(1)] = (4));

} else {
var statearr_18767_20569 = state_18742__$1;
(statearr_18767_20569[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18743 === (11))){
var inst_18732 = cljs.core.async.close_BANG_(ch);
var state_18742__$1 = state_18742;
var statearr_18771_20570 = state_18742__$1;
(statearr_18771_20570[(2)] = inst_18732);

(statearr_18771_20570[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18743 === (9))){
var state_18742__$1 = state_18742;
if(cljs.core.truth_(close_QMARK_)){
var statearr_18773_20571 = state_18742__$1;
(statearr_18773_20571[(1)] = (11));

} else {
var statearr_18774_20572 = state_18742__$1;
(statearr_18774_20572[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18743 === (5))){
var inst_18714 = (state_18742[(7)]);
var state_18742__$1 = state_18742;
var statearr_18777_20573 = state_18742__$1;
(statearr_18777_20573[(2)] = inst_18714);

(statearr_18777_20573[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18743 === (10))){
var inst_18737 = (state_18742[(2)]);
var state_18742__$1 = state_18742;
var statearr_18779_20578 = state_18742__$1;
(statearr_18779_20578[(2)] = inst_18737);

(statearr_18779_20578[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18743 === (8))){
var inst_18714 = (state_18742[(7)]);
var inst_18726 = cljs.core.next(inst_18714);
var inst_18714__$1 = inst_18726;
var state_18742__$1 = (function (){var statearr_18781 = state_18742;
(statearr_18781[(7)] = inst_18714__$1);

return statearr_18781;
})();
var statearr_18782_20579 = state_18742__$1;
(statearr_18782_20579[(2)] = null);

(statearr_18782_20579[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__17706__auto__ = null;
var cljs$core$async$state_machine__17706__auto____0 = (function (){
var statearr_18786 = [null,null,null,null,null,null,null,null];
(statearr_18786[(0)] = cljs$core$async$state_machine__17706__auto__);

(statearr_18786[(1)] = (1));

return statearr_18786;
});
var cljs$core$async$state_machine__17706__auto____1 = (function (state_18742){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_18742);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e18788){var ex__17709__auto__ = e18788;
var statearr_18789_20580 = state_18742;
(statearr_18789_20580[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_18742[(4)]))){
var statearr_18794_20581 = state_18742;
(statearr_18794_20581[(1)] = cljs.core.first((state_18742[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20582 = state_18742;
state_18742 = G__20582;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$state_machine__17706__auto__ = function(state_18742){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__17706__auto____1.call(this,state_18742);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__17706__auto____0;
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__17706__auto____1;
return cljs$core$async$state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_18796 = f__18003__auto__();
(statearr_18796[(6)] = c__18002__auto__);

return statearr_18796;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));

return c__18002__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__18808 = arguments.length;
switch (G__18808) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_20584 = (function (_){
var x__5350__auto__ = (((_ == null))?null:_);
var m__5351__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5351__auto__.call(null,_));
} else {
var m__5349__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5349__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_20584(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_20588 = (function (m,ch,close_QMARK_){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5351__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__5349__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5349__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_20588(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_20589 = (function (m,ch){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5351__auto__.call(null,m,ch));
} else {
var m__5349__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5349__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_20589(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_20590 = (function (m){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5351__auto__.call(null,m));
} else {
var m__5349__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5349__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_20590(m);
}
});


/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18856 = (function (ch,cs,meta18857){
this.ch = ch;
this.cs = cs;
this.meta18857 = meta18857;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async18856.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18858,meta18857__$1){
var self__ = this;
var _18858__$1 = this;
return (new cljs.core.async.t_cljs$core$async18856(self__.ch,self__.cs,meta18857__$1));
}));

(cljs.core.async.t_cljs$core$async18856.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18858){
var self__ = this;
var _18858__$1 = this;
return self__.meta18857;
}));

(cljs.core.async.t_cljs$core$async18856.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18856.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async18856.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18856.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async18856.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async18856.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async18856.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta18857","meta18857",-2074447975,null)], null);
}));

(cljs.core.async.t_cljs$core$async18856.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async18856.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18856");

(cljs.core.async.t_cljs$core$async18856.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async18856");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18856.
 */
cljs.core.async.__GT_t_cljs$core$async18856 = (function cljs$core$async$__GT_t_cljs$core$async18856(ch,cs,meta18857){
return (new cljs.core.async.t_cljs$core$async18856(ch,cs,meta18857));
});


/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (new cljs.core.async.t_cljs$core$async18856(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__18002__auto___20598 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_19035){
var state_val_19037 = (state_19035[(1)]);
if((state_val_19037 === (7))){
var inst_19025 = (state_19035[(2)]);
var state_19035__$1 = state_19035;
var statearr_19044_20599 = state_19035__$1;
(statearr_19044_20599[(2)] = inst_19025);

(statearr_19044_20599[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (20))){
var inst_18914 = (state_19035[(7)]);
var inst_18929 = cljs.core.first(inst_18914);
var inst_18930 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_18929,(0),null);
var inst_18931 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_18929,(1),null);
var state_19035__$1 = (function (){var statearr_19045 = state_19035;
(statearr_19045[(8)] = inst_18930);

return statearr_19045;
})();
if(cljs.core.truth_(inst_18931)){
var statearr_19046_20604 = state_19035__$1;
(statearr_19046_20604[(1)] = (22));

} else {
var statearr_19047_20605 = state_19035__$1;
(statearr_19047_20605[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (27))){
var inst_18970 = (state_19035[(9)]);
var inst_18879 = (state_19035[(10)]);
var inst_18963 = (state_19035[(11)]);
var inst_18961 = (state_19035[(12)]);
var inst_18970__$1 = cljs.core._nth(inst_18961,inst_18963);
var inst_18971 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_18970__$1,inst_18879,done);
var state_19035__$1 = (function (){var statearr_19055 = state_19035;
(statearr_19055[(9)] = inst_18970__$1);

return statearr_19055;
})();
if(cljs.core.truth_(inst_18971)){
var statearr_19056_20606 = state_19035__$1;
(statearr_19056_20606[(1)] = (30));

} else {
var statearr_19058_20607 = state_19035__$1;
(statearr_19058_20607[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (1))){
var state_19035__$1 = state_19035;
var statearr_19059_20608 = state_19035__$1;
(statearr_19059_20608[(2)] = null);

(statearr_19059_20608[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (24))){
var inst_18914 = (state_19035[(7)]);
var inst_18936 = (state_19035[(2)]);
var inst_18938 = cljs.core.next(inst_18914);
var inst_18888 = inst_18938;
var inst_18889 = null;
var inst_18890 = (0);
var inst_18891 = (0);
var state_19035__$1 = (function (){var statearr_19060 = state_19035;
(statearr_19060[(13)] = inst_18890);

(statearr_19060[(14)] = inst_18936);

(statearr_19060[(15)] = inst_18888);

(statearr_19060[(16)] = inst_18889);

(statearr_19060[(17)] = inst_18891);

return statearr_19060;
})();
var statearr_19064_20609 = state_19035__$1;
(statearr_19064_20609[(2)] = null);

(statearr_19064_20609[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (39))){
var state_19035__$1 = state_19035;
var statearr_19069_20610 = state_19035__$1;
(statearr_19069_20610[(2)] = null);

(statearr_19069_20610[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (4))){
var inst_18879 = (state_19035[(10)]);
var inst_18879__$1 = (state_19035[(2)]);
var inst_18880 = (inst_18879__$1 == null);
var state_19035__$1 = (function (){var statearr_19074 = state_19035;
(statearr_19074[(10)] = inst_18879__$1);

return statearr_19074;
})();
if(cljs.core.truth_(inst_18880)){
var statearr_19075_20612 = state_19035__$1;
(statearr_19075_20612[(1)] = (5));

} else {
var statearr_19076_20615 = state_19035__$1;
(statearr_19076_20615[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (15))){
var inst_18890 = (state_19035[(13)]);
var inst_18888 = (state_19035[(15)]);
var inst_18889 = (state_19035[(16)]);
var inst_18891 = (state_19035[(17)]);
var inst_18909 = (state_19035[(2)]);
var inst_18911 = (inst_18891 + (1));
var tmp19066 = inst_18890;
var tmp19067 = inst_18888;
var tmp19068 = inst_18889;
var inst_18888__$1 = tmp19067;
var inst_18889__$1 = tmp19068;
var inst_18890__$1 = tmp19066;
var inst_18891__$1 = inst_18911;
var state_19035__$1 = (function (){var statearr_19077 = state_19035;
(statearr_19077[(13)] = inst_18890__$1);

(statearr_19077[(18)] = inst_18909);

(statearr_19077[(15)] = inst_18888__$1);

(statearr_19077[(16)] = inst_18889__$1);

(statearr_19077[(17)] = inst_18891__$1);

return statearr_19077;
})();
var statearr_19081_20616 = state_19035__$1;
(statearr_19081_20616[(2)] = null);

(statearr_19081_20616[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (21))){
var inst_18941 = (state_19035[(2)]);
var state_19035__$1 = state_19035;
var statearr_19086_20617 = state_19035__$1;
(statearr_19086_20617[(2)] = inst_18941);

(statearr_19086_20617[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (31))){
var inst_18970 = (state_19035[(9)]);
var inst_18974 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_18970);
var state_19035__$1 = state_19035;
var statearr_19087_20618 = state_19035__$1;
(statearr_19087_20618[(2)] = inst_18974);

(statearr_19087_20618[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (32))){
var inst_18960 = (state_19035[(19)]);
var inst_18963 = (state_19035[(11)]);
var inst_18961 = (state_19035[(12)]);
var inst_18962 = (state_19035[(20)]);
var inst_18976 = (state_19035[(2)]);
var inst_18977 = (inst_18963 + (1));
var tmp19083 = inst_18960;
var tmp19084 = inst_18961;
var tmp19085 = inst_18962;
var inst_18960__$1 = tmp19083;
var inst_18961__$1 = tmp19084;
var inst_18962__$1 = tmp19085;
var inst_18963__$1 = inst_18977;
var state_19035__$1 = (function (){var statearr_19089 = state_19035;
(statearr_19089[(21)] = inst_18976);

(statearr_19089[(19)] = inst_18960__$1);

(statearr_19089[(11)] = inst_18963__$1);

(statearr_19089[(12)] = inst_18961__$1);

(statearr_19089[(20)] = inst_18962__$1);

return statearr_19089;
})();
var statearr_19097_20619 = state_19035__$1;
(statearr_19097_20619[(2)] = null);

(statearr_19097_20619[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (40))){
var inst_18995 = (state_19035[(22)]);
var inst_19000 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_18995);
var state_19035__$1 = state_19035;
var statearr_19099_20620 = state_19035__$1;
(statearr_19099_20620[(2)] = inst_19000);

(statearr_19099_20620[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (33))){
var inst_18981 = (state_19035[(23)]);
var inst_18983 = cljs.core.chunked_seq_QMARK_(inst_18981);
var state_19035__$1 = state_19035;
if(inst_18983){
var statearr_19100_20621 = state_19035__$1;
(statearr_19100_20621[(1)] = (36));

} else {
var statearr_19104_20622 = state_19035__$1;
(statearr_19104_20622[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (13))){
var inst_18903 = (state_19035[(24)]);
var inst_18906 = cljs.core.async.close_BANG_(inst_18903);
var state_19035__$1 = state_19035;
var statearr_19106_20623 = state_19035__$1;
(statearr_19106_20623[(2)] = inst_18906);

(statearr_19106_20623[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (22))){
var inst_18930 = (state_19035[(8)]);
var inst_18933 = cljs.core.async.close_BANG_(inst_18930);
var state_19035__$1 = state_19035;
var statearr_19110_20624 = state_19035__$1;
(statearr_19110_20624[(2)] = inst_18933);

(statearr_19110_20624[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (36))){
var inst_18981 = (state_19035[(23)]);
var inst_18990 = cljs.core.chunk_first(inst_18981);
var inst_18991 = cljs.core.chunk_rest(inst_18981);
var inst_18992 = cljs.core.count(inst_18990);
var inst_18960 = inst_18991;
var inst_18961 = inst_18990;
var inst_18962 = inst_18992;
var inst_18963 = (0);
var state_19035__$1 = (function (){var statearr_19112 = state_19035;
(statearr_19112[(19)] = inst_18960);

(statearr_19112[(11)] = inst_18963);

(statearr_19112[(12)] = inst_18961);

(statearr_19112[(20)] = inst_18962);

return statearr_19112;
})();
var statearr_19113_20625 = state_19035__$1;
(statearr_19113_20625[(2)] = null);

(statearr_19113_20625[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (41))){
var inst_18981 = (state_19035[(23)]);
var inst_19002 = (state_19035[(2)]);
var inst_19003 = cljs.core.next(inst_18981);
var inst_18960 = inst_19003;
var inst_18961 = null;
var inst_18962 = (0);
var inst_18963 = (0);
var state_19035__$1 = (function (){var statearr_19118 = state_19035;
(statearr_19118[(19)] = inst_18960);

(statearr_19118[(11)] = inst_18963);

(statearr_19118[(12)] = inst_18961);

(statearr_19118[(25)] = inst_19002);

(statearr_19118[(20)] = inst_18962);

return statearr_19118;
})();
var statearr_19119_20626 = state_19035__$1;
(statearr_19119_20626[(2)] = null);

(statearr_19119_20626[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (43))){
var state_19035__$1 = state_19035;
var statearr_19121_20627 = state_19035__$1;
(statearr_19121_20627[(2)] = null);

(statearr_19121_20627[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (29))){
var inst_19011 = (state_19035[(2)]);
var state_19035__$1 = state_19035;
var statearr_19122_20628 = state_19035__$1;
(statearr_19122_20628[(2)] = inst_19011);

(statearr_19122_20628[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (44))){
var inst_19021 = (state_19035[(2)]);
var state_19035__$1 = (function (){var statearr_19123 = state_19035;
(statearr_19123[(26)] = inst_19021);

return statearr_19123;
})();
var statearr_19124_20629 = state_19035__$1;
(statearr_19124_20629[(2)] = null);

(statearr_19124_20629[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (6))){
var inst_18951 = (state_19035[(27)]);
var inst_18950 = cljs.core.deref(cs);
var inst_18951__$1 = cljs.core.keys(inst_18950);
var inst_18952 = cljs.core.count(inst_18951__$1);
var inst_18953 = cljs.core.reset_BANG_(dctr,inst_18952);
var inst_18958 = cljs.core.seq(inst_18951__$1);
var inst_18960 = inst_18958;
var inst_18961 = null;
var inst_18962 = (0);
var inst_18963 = (0);
var state_19035__$1 = (function (){var statearr_19125 = state_19035;
(statearr_19125[(27)] = inst_18951__$1);

(statearr_19125[(28)] = inst_18953);

(statearr_19125[(19)] = inst_18960);

(statearr_19125[(11)] = inst_18963);

(statearr_19125[(12)] = inst_18961);

(statearr_19125[(20)] = inst_18962);

return statearr_19125;
})();
var statearr_19130_20630 = state_19035__$1;
(statearr_19130_20630[(2)] = null);

(statearr_19130_20630[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (28))){
var inst_18981 = (state_19035[(23)]);
var inst_18960 = (state_19035[(19)]);
var inst_18981__$1 = cljs.core.seq(inst_18960);
var state_19035__$1 = (function (){var statearr_19135 = state_19035;
(statearr_19135[(23)] = inst_18981__$1);

return statearr_19135;
})();
if(inst_18981__$1){
var statearr_19136_20633 = state_19035__$1;
(statearr_19136_20633[(1)] = (33));

} else {
var statearr_19137_20634 = state_19035__$1;
(statearr_19137_20634[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (25))){
var inst_18963 = (state_19035[(11)]);
var inst_18962 = (state_19035[(20)]);
var inst_18967 = (inst_18963 < inst_18962);
var inst_18968 = inst_18967;
var state_19035__$1 = state_19035;
if(cljs.core.truth_(inst_18968)){
var statearr_19138_20635 = state_19035__$1;
(statearr_19138_20635[(1)] = (27));

} else {
var statearr_19142_20636 = state_19035__$1;
(statearr_19142_20636[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (34))){
var state_19035__$1 = state_19035;
var statearr_19144_20638 = state_19035__$1;
(statearr_19144_20638[(2)] = null);

(statearr_19144_20638[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (17))){
var state_19035__$1 = state_19035;
var statearr_19145_20640 = state_19035__$1;
(statearr_19145_20640[(2)] = null);

(statearr_19145_20640[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (3))){
var inst_19027 = (state_19035[(2)]);
var state_19035__$1 = state_19035;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19035__$1,inst_19027);
} else {
if((state_val_19037 === (12))){
var inst_18946 = (state_19035[(2)]);
var state_19035__$1 = state_19035;
var statearr_19150_20641 = state_19035__$1;
(statearr_19150_20641[(2)] = inst_18946);

(statearr_19150_20641[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (2))){
var state_19035__$1 = state_19035;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19035__$1,(4),ch);
} else {
if((state_val_19037 === (23))){
var state_19035__$1 = state_19035;
var statearr_19151_20642 = state_19035__$1;
(statearr_19151_20642[(2)] = null);

(statearr_19151_20642[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (35))){
var inst_19009 = (state_19035[(2)]);
var state_19035__$1 = state_19035;
var statearr_19155_20643 = state_19035__$1;
(statearr_19155_20643[(2)] = inst_19009);

(statearr_19155_20643[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (19))){
var inst_18914 = (state_19035[(7)]);
var inst_18920 = cljs.core.chunk_first(inst_18914);
var inst_18921 = cljs.core.chunk_rest(inst_18914);
var inst_18922 = cljs.core.count(inst_18920);
var inst_18888 = inst_18921;
var inst_18889 = inst_18920;
var inst_18890 = inst_18922;
var inst_18891 = (0);
var state_19035__$1 = (function (){var statearr_19157 = state_19035;
(statearr_19157[(13)] = inst_18890);

(statearr_19157[(15)] = inst_18888);

(statearr_19157[(16)] = inst_18889);

(statearr_19157[(17)] = inst_18891);

return statearr_19157;
})();
var statearr_19158_20644 = state_19035__$1;
(statearr_19158_20644[(2)] = null);

(statearr_19158_20644[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (11))){
var inst_18914 = (state_19035[(7)]);
var inst_18888 = (state_19035[(15)]);
var inst_18914__$1 = cljs.core.seq(inst_18888);
var state_19035__$1 = (function (){var statearr_19160 = state_19035;
(statearr_19160[(7)] = inst_18914__$1);

return statearr_19160;
})();
if(inst_18914__$1){
var statearr_19161_20645 = state_19035__$1;
(statearr_19161_20645[(1)] = (16));

} else {
var statearr_19162_20646 = state_19035__$1;
(statearr_19162_20646[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (9))){
var inst_18948 = (state_19035[(2)]);
var state_19035__$1 = state_19035;
var statearr_19163_20647 = state_19035__$1;
(statearr_19163_20647[(2)] = inst_18948);

(statearr_19163_20647[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (5))){
var inst_18886 = cljs.core.deref(cs);
var inst_18887 = cljs.core.seq(inst_18886);
var inst_18888 = inst_18887;
var inst_18889 = null;
var inst_18890 = (0);
var inst_18891 = (0);
var state_19035__$1 = (function (){var statearr_19164 = state_19035;
(statearr_19164[(13)] = inst_18890);

(statearr_19164[(15)] = inst_18888);

(statearr_19164[(16)] = inst_18889);

(statearr_19164[(17)] = inst_18891);

return statearr_19164;
})();
var statearr_19169_20648 = state_19035__$1;
(statearr_19169_20648[(2)] = null);

(statearr_19169_20648[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (14))){
var state_19035__$1 = state_19035;
var statearr_19173_20649 = state_19035__$1;
(statearr_19173_20649[(2)] = null);

(statearr_19173_20649[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (45))){
var inst_19017 = (state_19035[(2)]);
var state_19035__$1 = state_19035;
var statearr_19175_20652 = state_19035__$1;
(statearr_19175_20652[(2)] = inst_19017);

(statearr_19175_20652[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (26))){
var inst_18951 = (state_19035[(27)]);
var inst_19013 = (state_19035[(2)]);
var inst_19014 = cljs.core.seq(inst_18951);
var state_19035__$1 = (function (){var statearr_19176 = state_19035;
(statearr_19176[(29)] = inst_19013);

return statearr_19176;
})();
if(inst_19014){
var statearr_19177_20657 = state_19035__$1;
(statearr_19177_20657[(1)] = (42));

} else {
var statearr_19181_20661 = state_19035__$1;
(statearr_19181_20661[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (16))){
var inst_18914 = (state_19035[(7)]);
var inst_18916 = cljs.core.chunked_seq_QMARK_(inst_18914);
var state_19035__$1 = state_19035;
if(inst_18916){
var statearr_19183_20662 = state_19035__$1;
(statearr_19183_20662[(1)] = (19));

} else {
var statearr_19184_20663 = state_19035__$1;
(statearr_19184_20663[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (38))){
var inst_19006 = (state_19035[(2)]);
var state_19035__$1 = state_19035;
var statearr_19185_20664 = state_19035__$1;
(statearr_19185_20664[(2)] = inst_19006);

(statearr_19185_20664[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (30))){
var state_19035__$1 = state_19035;
var statearr_19189_20665 = state_19035__$1;
(statearr_19189_20665[(2)] = null);

(statearr_19189_20665[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (10))){
var inst_18889 = (state_19035[(16)]);
var inst_18891 = (state_19035[(17)]);
var inst_18902 = cljs.core._nth(inst_18889,inst_18891);
var inst_18903 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_18902,(0),null);
var inst_18904 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_18902,(1),null);
var state_19035__$1 = (function (){var statearr_19191 = state_19035;
(statearr_19191[(24)] = inst_18903);

return statearr_19191;
})();
if(cljs.core.truth_(inst_18904)){
var statearr_19192_20671 = state_19035__$1;
(statearr_19192_20671[(1)] = (13));

} else {
var statearr_19193_20672 = state_19035__$1;
(statearr_19193_20672[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (18))){
var inst_18944 = (state_19035[(2)]);
var state_19035__$1 = state_19035;
var statearr_19197_20674 = state_19035__$1;
(statearr_19197_20674[(2)] = inst_18944);

(statearr_19197_20674[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (42))){
var state_19035__$1 = state_19035;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19035__$1,(45),dchan);
} else {
if((state_val_19037 === (37))){
var inst_18981 = (state_19035[(23)]);
var inst_18995 = (state_19035[(22)]);
var inst_18879 = (state_19035[(10)]);
var inst_18995__$1 = cljs.core.first(inst_18981);
var inst_18996 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_18995__$1,inst_18879,done);
var state_19035__$1 = (function (){var statearr_19199 = state_19035;
(statearr_19199[(22)] = inst_18995__$1);

return statearr_19199;
})();
if(cljs.core.truth_(inst_18996)){
var statearr_19200_20678 = state_19035__$1;
(statearr_19200_20678[(1)] = (39));

} else {
var statearr_19201_20679 = state_19035__$1;
(statearr_19201_20679[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19037 === (8))){
var inst_18890 = (state_19035[(13)]);
var inst_18891 = (state_19035[(17)]);
var inst_18895 = (inst_18891 < inst_18890);
var inst_18896 = inst_18895;
var state_19035__$1 = state_19035;
if(cljs.core.truth_(inst_18896)){
var statearr_19202_20681 = state_19035__$1;
(statearr_19202_20681[(1)] = (10));

} else {
var statearr_19203_20682 = state_19035__$1;
(statearr_19203_20682[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__17706__auto__ = null;
var cljs$core$async$mult_$_state_machine__17706__auto____0 = (function (){
var statearr_19204 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19204[(0)] = cljs$core$async$mult_$_state_machine__17706__auto__);

(statearr_19204[(1)] = (1));

return statearr_19204;
});
var cljs$core$async$mult_$_state_machine__17706__auto____1 = (function (state_19035){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_19035);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e19205){var ex__17709__auto__ = e19205;
var statearr_19206_20684 = state_19035;
(statearr_19206_20684[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_19035[(4)]))){
var statearr_19211_20685 = state_19035;
(statearr_19211_20685[(1)] = cljs.core.first((state_19035[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20686 = state_19035;
state_19035 = G__20686;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__17706__auto__ = function(state_19035){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__17706__auto____1.call(this,state_19035);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__17706__auto____0;
cljs$core$async$mult_$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__17706__auto____1;
return cljs$core$async$mult_$_state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_19212 = f__18003__auto__();
(statearr_19212[(6)] = c__18002__auto___20598);

return statearr_19212;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__19215 = arguments.length;
switch (G__19215) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_20693 = (function (m,ch){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5351__auto__.call(null,m,ch));
} else {
var m__5349__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5349__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_20693(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_20703 = (function (m,ch){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5351__auto__.call(null,m,ch));
} else {
var m__5349__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5349__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_20703(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_20704 = (function (m){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5351__auto__.call(null,m));
} else {
var m__5349__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5349__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_20704(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_20705 = (function (m,state_map){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5351__auto__.call(null,m,state_map));
} else {
var m__5349__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5349__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_20705(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_20713 = (function (m,mode){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5351__auto__.call(null,m,mode));
} else {
var m__5349__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5349__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_20713(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___20718 = arguments.length;
var i__5727__auto___20719 = (0);
while(true){
if((i__5727__auto___20719 < len__5726__auto___20718)){
args__5732__auto__.push((arguments[i__5727__auto___20719]));

var G__20720 = (i__5727__auto___20719 + (1));
i__5727__auto___20719 = G__20720;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((3) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5733__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__19223){
var map__19224 = p__19223;
var map__19224__$1 = cljs.core.__destructure_map(map__19224);
var opts = map__19224__$1;
var statearr_19226_20723 = state;
(statearr_19226_20723[(1)] = cont_block);


var temp__5804__auto__ = cljs.core.async.do_alts((function (val){
var statearr_19227_20724 = state;
(statearr_19227_20724[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5804__auto__)){
var cb = temp__5804__auto__;
var statearr_19228_20725 = state;
(statearr_19228_20725[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq19218){
var G__19219 = cljs.core.first(seq19218);
var seq19218__$1 = cljs.core.next(seq19218);
var G__19220 = cljs.core.first(seq19218__$1);
var seq19218__$2 = cljs.core.next(seq19218__$1);
var G__19221 = cljs.core.first(seq19218__$2);
var seq19218__$3 = cljs.core.next(seq19218__$2);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__19219,G__19220,G__19221,seq19218__$3);
}));


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async19233 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta19234){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta19234 = meta19234;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async19233.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_19235,meta19234__$1){
var self__ = this;
var _19235__$1 = this;
return (new cljs.core.async.t_cljs$core$async19233(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta19234__$1));
}));

(cljs.core.async.t_cljs$core$async19233.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_19235){
var self__ = this;
var _19235__$1 = this;
return self__.meta19234;
}));

(cljs.core.async.t_cljs$core$async19233.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19233.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async19233.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19233.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async19233.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async19233.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async19233.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async19233.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async19233.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta19234","meta19234",-1866220278,null)], null);
}));

(cljs.core.async.t_cljs$core$async19233.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async19233.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19233");

(cljs.core.async.t_cljs$core$async19233.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async19233");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19233.
 */
cljs.core.async.__GT_t_cljs$core$async19233 = (function cljs$core$async$__GT_t_cljs$core$async19233(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta19234){
return (new cljs.core.async.t_cljs$core$async19233(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta19234));
});


/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_(solos))))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (new cljs.core.async.t_cljs$core$async19233(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
var c__18002__auto___20741 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_19310){
var state_val_19311 = (state_19310[(1)]);
if((state_val_19311 === (7))){
var inst_19269 = (state_19310[(2)]);
var state_19310__$1 = state_19310;
if(cljs.core.truth_(inst_19269)){
var statearr_19313_20742 = state_19310__$1;
(statearr_19313_20742[(1)] = (8));

} else {
var statearr_19315_20743 = state_19310__$1;
(statearr_19315_20743[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (20))){
var inst_19262 = (state_19310[(7)]);
var state_19310__$1 = state_19310;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_19310__$1,(23),out,inst_19262);
} else {
if((state_val_19311 === (1))){
var inst_19241 = calc_state();
var inst_19242 = cljs.core.__destructure_map(inst_19241);
var inst_19243 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19242,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_19244 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19242,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_19246 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19242,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_19247 = inst_19241;
var state_19310__$1 = (function (){var statearr_19318 = state_19310;
(statearr_19318[(8)] = inst_19243);

(statearr_19318[(9)] = inst_19244);

(statearr_19318[(10)] = inst_19246);

(statearr_19318[(11)] = inst_19247);

return statearr_19318;
})();
var statearr_19319_20744 = state_19310__$1;
(statearr_19319_20744[(2)] = null);

(statearr_19319_20744[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (24))){
var inst_19253 = (state_19310[(12)]);
var inst_19247 = inst_19253;
var state_19310__$1 = (function (){var statearr_19320 = state_19310;
(statearr_19320[(11)] = inst_19247);

return statearr_19320;
})();
var statearr_19321_20745 = state_19310__$1;
(statearr_19321_20745[(2)] = null);

(statearr_19321_20745[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (4))){
var inst_19264 = (state_19310[(13)]);
var inst_19262 = (state_19310[(7)]);
var inst_19261 = (state_19310[(2)]);
var inst_19262__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_19261,(0),null);
var inst_19263 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_19261,(1),null);
var inst_19264__$1 = (inst_19262__$1 == null);
var state_19310__$1 = (function (){var statearr_19322 = state_19310;
(statearr_19322[(13)] = inst_19264__$1);

(statearr_19322[(14)] = inst_19263);

(statearr_19322[(7)] = inst_19262__$1);

return statearr_19322;
})();
if(cljs.core.truth_(inst_19264__$1)){
var statearr_19326_20754 = state_19310__$1;
(statearr_19326_20754[(1)] = (5));

} else {
var statearr_19327_20755 = state_19310__$1;
(statearr_19327_20755[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (15))){
var inst_19254 = (state_19310[(15)]);
var inst_19283 = (state_19310[(16)]);
var inst_19283__$1 = cljs.core.empty_QMARK_(inst_19254);
var state_19310__$1 = (function (){var statearr_19328 = state_19310;
(statearr_19328[(16)] = inst_19283__$1);

return statearr_19328;
})();
if(inst_19283__$1){
var statearr_19329_20765 = state_19310__$1;
(statearr_19329_20765[(1)] = (17));

} else {
var statearr_19330_20766 = state_19310__$1;
(statearr_19330_20766[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (21))){
var inst_19253 = (state_19310[(12)]);
var inst_19247 = inst_19253;
var state_19310__$1 = (function (){var statearr_19331 = state_19310;
(statearr_19331[(11)] = inst_19247);

return statearr_19331;
})();
var statearr_19332_20769 = state_19310__$1;
(statearr_19332_20769[(2)] = null);

(statearr_19332_20769[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (13))){
var inst_19276 = (state_19310[(2)]);
var inst_19277 = calc_state();
var inst_19247 = inst_19277;
var state_19310__$1 = (function (){var statearr_19333 = state_19310;
(statearr_19333[(17)] = inst_19276);

(statearr_19333[(11)] = inst_19247);

return statearr_19333;
})();
var statearr_19334_20774 = state_19310__$1;
(statearr_19334_20774[(2)] = null);

(statearr_19334_20774[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (22))){
var inst_19304 = (state_19310[(2)]);
var state_19310__$1 = state_19310;
var statearr_19335_20778 = state_19310__$1;
(statearr_19335_20778[(2)] = inst_19304);

(statearr_19335_20778[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (6))){
var inst_19263 = (state_19310[(14)]);
var inst_19267 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_19263,change);
var state_19310__$1 = state_19310;
var statearr_19349_20779 = state_19310__$1;
(statearr_19349_20779[(2)] = inst_19267);

(statearr_19349_20779[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (25))){
var state_19310__$1 = state_19310;
var statearr_19350_20782 = state_19310__$1;
(statearr_19350_20782[(2)] = null);

(statearr_19350_20782[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (17))){
var inst_19255 = (state_19310[(18)]);
var inst_19263 = (state_19310[(14)]);
var inst_19286 = (inst_19255.cljs$core$IFn$_invoke$arity$1 ? inst_19255.cljs$core$IFn$_invoke$arity$1(inst_19263) : inst_19255.call(null,inst_19263));
var inst_19287 = cljs.core.not(inst_19286);
var state_19310__$1 = state_19310;
var statearr_19357_20787 = state_19310__$1;
(statearr_19357_20787[(2)] = inst_19287);

(statearr_19357_20787[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (3))){
var inst_19308 = (state_19310[(2)]);
var state_19310__$1 = state_19310;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19310__$1,inst_19308);
} else {
if((state_val_19311 === (12))){
var state_19310__$1 = state_19310;
var statearr_19358_20795 = state_19310__$1;
(statearr_19358_20795[(2)] = null);

(statearr_19358_20795[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (2))){
var inst_19253 = (state_19310[(12)]);
var inst_19247 = (state_19310[(11)]);
var inst_19253__$1 = cljs.core.__destructure_map(inst_19247);
var inst_19254 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19253__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_19255 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19253__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_19256 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19253__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_19310__$1 = (function (){var statearr_19359 = state_19310;
(statearr_19359[(15)] = inst_19254);

(statearr_19359[(12)] = inst_19253__$1);

(statearr_19359[(18)] = inst_19255);

return statearr_19359;
})();
return cljs.core.async.ioc_alts_BANG_(state_19310__$1,(4),inst_19256);
} else {
if((state_val_19311 === (23))){
var inst_19295 = (state_19310[(2)]);
var state_19310__$1 = state_19310;
if(cljs.core.truth_(inst_19295)){
var statearr_19367_20807 = state_19310__$1;
(statearr_19367_20807[(1)] = (24));

} else {
var statearr_19371_20813 = state_19310__$1;
(statearr_19371_20813[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (19))){
var inst_19290 = (state_19310[(2)]);
var state_19310__$1 = state_19310;
var statearr_19372_20816 = state_19310__$1;
(statearr_19372_20816[(2)] = inst_19290);

(statearr_19372_20816[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (11))){
var inst_19263 = (state_19310[(14)]);
var inst_19273 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_19263);
var state_19310__$1 = state_19310;
var statearr_19376_20832 = state_19310__$1;
(statearr_19376_20832[(2)] = inst_19273);

(statearr_19376_20832[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (9))){
var inst_19254 = (state_19310[(15)]);
var inst_19263 = (state_19310[(14)]);
var inst_19280 = (state_19310[(19)]);
var inst_19280__$1 = (inst_19254.cljs$core$IFn$_invoke$arity$1 ? inst_19254.cljs$core$IFn$_invoke$arity$1(inst_19263) : inst_19254.call(null,inst_19263));
var state_19310__$1 = (function (){var statearr_19377 = state_19310;
(statearr_19377[(19)] = inst_19280__$1);

return statearr_19377;
})();
if(cljs.core.truth_(inst_19280__$1)){
var statearr_19378_20834 = state_19310__$1;
(statearr_19378_20834[(1)] = (14));

} else {
var statearr_19379_20835 = state_19310__$1;
(statearr_19379_20835[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (5))){
var inst_19264 = (state_19310[(13)]);
var state_19310__$1 = state_19310;
var statearr_19380_20837 = state_19310__$1;
(statearr_19380_20837[(2)] = inst_19264);

(statearr_19380_20837[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (14))){
var inst_19280 = (state_19310[(19)]);
var state_19310__$1 = state_19310;
var statearr_19381_20842 = state_19310__$1;
(statearr_19381_20842[(2)] = inst_19280);

(statearr_19381_20842[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (26))){
var inst_19300 = (state_19310[(2)]);
var state_19310__$1 = state_19310;
var statearr_19382_20847 = state_19310__$1;
(statearr_19382_20847[(2)] = inst_19300);

(statearr_19382_20847[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (16))){
var inst_19292 = (state_19310[(2)]);
var state_19310__$1 = state_19310;
if(cljs.core.truth_(inst_19292)){
var statearr_19387_20848 = state_19310__$1;
(statearr_19387_20848[(1)] = (20));

} else {
var statearr_19388_20851 = state_19310__$1;
(statearr_19388_20851[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (10))){
var inst_19306 = (state_19310[(2)]);
var state_19310__$1 = state_19310;
var statearr_19389_20852 = state_19310__$1;
(statearr_19389_20852[(2)] = inst_19306);

(statearr_19389_20852[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (18))){
var inst_19283 = (state_19310[(16)]);
var state_19310__$1 = state_19310;
var statearr_19390_20859 = state_19310__$1;
(statearr_19390_20859[(2)] = inst_19283);

(statearr_19390_20859[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19311 === (8))){
var inst_19262 = (state_19310[(7)]);
var inst_19271 = (inst_19262 == null);
var state_19310__$1 = state_19310;
if(cljs.core.truth_(inst_19271)){
var statearr_19391_20868 = state_19310__$1;
(statearr_19391_20868[(1)] = (11));

} else {
var statearr_19392_20872 = state_19310__$1;
(statearr_19392_20872[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__17706__auto__ = null;
var cljs$core$async$mix_$_state_machine__17706__auto____0 = (function (){
var statearr_19393 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19393[(0)] = cljs$core$async$mix_$_state_machine__17706__auto__);

(statearr_19393[(1)] = (1));

return statearr_19393;
});
var cljs$core$async$mix_$_state_machine__17706__auto____1 = (function (state_19310){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_19310);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e19394){var ex__17709__auto__ = e19394;
var statearr_19395_20882 = state_19310;
(statearr_19395_20882[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_19310[(4)]))){
var statearr_19396_20883 = state_19310;
(statearr_19396_20883[(1)] = cljs.core.first((state_19310[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20884 = state_19310;
state_19310 = G__20884;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__17706__auto__ = function(state_19310){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__17706__auto____1.call(this,state_19310);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__17706__auto____0;
cljs$core$async$mix_$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__17706__auto____1;
return cljs$core$async$mix_$_state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_19401 = f__18003__auto__();
(statearr_19401[(6)] = c__18002__auto___20741);

return statearr_19401;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_20892 = (function (p,v,ch,close_QMARK_){
var x__5350__auto__ = (((p == null))?null:p);
var m__5351__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5351__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__5349__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5349__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_20892(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_20896 = (function (p,v,ch){
var x__5350__auto__ = (((p == null))?null:p);
var m__5351__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5351__auto__.call(null,p,v,ch));
} else {
var m__5349__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5349__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_20896(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_20898 = (function() {
var G__20899 = null;
var G__20899__1 = (function (p){
var x__5350__auto__ = (((p == null))?null:p);
var m__5351__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5351__auto__.call(null,p));
} else {
var m__5349__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5349__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__20899__2 = (function (p,v){
var x__5350__auto__ = (((p == null))?null:p);
var m__5351__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5351__auto__.call(null,p,v));
} else {
var m__5349__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5349__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__20899 = function(p,v){
switch(arguments.length){
case 1:
return G__20899__1.call(this,p);
case 2:
return G__20899__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__20899.cljs$core$IFn$_invoke$arity$1 = G__20899__1;
G__20899.cljs$core$IFn$_invoke$arity$2 = G__20899__2;
return G__20899;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__19414 = arguments.length;
switch (G__19414) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_20898(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_20898(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);



/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async19422 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta19423){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta19423 = meta19423;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async19422.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_19424,meta19423__$1){
var self__ = this;
var _19424__$1 = this;
return (new cljs.core.async.t_cljs$core$async19422(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta19423__$1));
}));

(cljs.core.async.t_cljs$core$async19422.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_19424){
var self__ = this;
var _19424__$1 = this;
return self__.meta19423;
}));

(cljs.core.async.t_cljs$core$async19422.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19422.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async19422.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19422.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async19422.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5804__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5804__auto__)){
var m = temp__5804__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async19422.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async19422.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async19422.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta19423","meta19423",-1218875770,null)], null);
}));

(cljs.core.async.t_cljs$core$async19422.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async19422.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19422");

(cljs.core.async.t_cljs$core$async19422.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async19422");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19422.
 */
cljs.core.async.__GT_t_cljs$core$async19422 = (function cljs$core$async$__GT_t_cljs$core$async19422(ch,topic_fn,buf_fn,mults,ensure_mult,meta19423){
return (new cljs.core.async.t_cljs$core$async19422(ch,topic_fn,buf_fn,mults,ensure_mult,meta19423));
});


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__19417 = arguments.length;
switch (G__19417) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__5002__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__19415_SHARP_){
if(cljs.core.truth_((p1__19415_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__19415_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__19415_SHARP_.call(null,topic)))){
return p1__19415_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__19415_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (new cljs.core.async.t_cljs$core$async19422(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
var c__18002__auto___20912 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_19504){
var state_val_19505 = (state_19504[(1)]);
if((state_val_19505 === (7))){
var inst_19500 = (state_19504[(2)]);
var state_19504__$1 = state_19504;
var statearr_19506_20914 = state_19504__$1;
(statearr_19506_20914[(2)] = inst_19500);

(statearr_19506_20914[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (20))){
var state_19504__$1 = state_19504;
var statearr_19508_20915 = state_19504__$1;
(statearr_19508_20915[(2)] = null);

(statearr_19508_20915[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (1))){
var state_19504__$1 = state_19504;
var statearr_19512_20924 = state_19504__$1;
(statearr_19512_20924[(2)] = null);

(statearr_19512_20924[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (24))){
var inst_19483 = (state_19504[(7)]);
var inst_19492 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_19483);
var state_19504__$1 = state_19504;
var statearr_19513_20925 = state_19504__$1;
(statearr_19513_20925[(2)] = inst_19492);

(statearr_19513_20925[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (4))){
var inst_19435 = (state_19504[(8)]);
var inst_19435__$1 = (state_19504[(2)]);
var inst_19436 = (inst_19435__$1 == null);
var state_19504__$1 = (function (){var statearr_19514 = state_19504;
(statearr_19514[(8)] = inst_19435__$1);

return statearr_19514;
})();
if(cljs.core.truth_(inst_19436)){
var statearr_19515_20932 = state_19504__$1;
(statearr_19515_20932[(1)] = (5));

} else {
var statearr_19516_20933 = state_19504__$1;
(statearr_19516_20933[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (15))){
var inst_19477 = (state_19504[(2)]);
var state_19504__$1 = state_19504;
var statearr_19521_20934 = state_19504__$1;
(statearr_19521_20934[(2)] = inst_19477);

(statearr_19521_20934[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (21))){
var inst_19497 = (state_19504[(2)]);
var state_19504__$1 = (function (){var statearr_19522 = state_19504;
(statearr_19522[(9)] = inst_19497);

return statearr_19522;
})();
var statearr_19523_20935 = state_19504__$1;
(statearr_19523_20935[(2)] = null);

(statearr_19523_20935[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (13))){
var inst_19459 = (state_19504[(10)]);
var inst_19461 = cljs.core.chunked_seq_QMARK_(inst_19459);
var state_19504__$1 = state_19504;
if(inst_19461){
var statearr_19524_20936 = state_19504__$1;
(statearr_19524_20936[(1)] = (16));

} else {
var statearr_19525_20942 = state_19504__$1;
(statearr_19525_20942[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (22))){
var inst_19489 = (state_19504[(2)]);
var state_19504__$1 = state_19504;
if(cljs.core.truth_(inst_19489)){
var statearr_19526_20943 = state_19504__$1;
(statearr_19526_20943[(1)] = (23));

} else {
var statearr_19527_20949 = state_19504__$1;
(statearr_19527_20949[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (6))){
var inst_19485 = (state_19504[(11)]);
var inst_19483 = (state_19504[(7)]);
var inst_19435 = (state_19504[(8)]);
var inst_19483__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_19435) : topic_fn.call(null,inst_19435));
var inst_19484 = cljs.core.deref(mults);
var inst_19485__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19484,inst_19483__$1);
var state_19504__$1 = (function (){var statearr_19528 = state_19504;
(statearr_19528[(11)] = inst_19485__$1);

(statearr_19528[(7)] = inst_19483__$1);

return statearr_19528;
})();
if(cljs.core.truth_(inst_19485__$1)){
var statearr_19529_20955 = state_19504__$1;
(statearr_19529_20955[(1)] = (19));

} else {
var statearr_19530_20956 = state_19504__$1;
(statearr_19530_20956[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (25))){
var inst_19494 = (state_19504[(2)]);
var state_19504__$1 = state_19504;
var statearr_19531_20962 = state_19504__$1;
(statearr_19531_20962[(2)] = inst_19494);

(statearr_19531_20962[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (17))){
var inst_19459 = (state_19504[(10)]);
var inst_19468 = cljs.core.first(inst_19459);
var inst_19469 = cljs.core.async.muxch_STAR_(inst_19468);
var inst_19470 = cljs.core.async.close_BANG_(inst_19469);
var inst_19471 = cljs.core.next(inst_19459);
var inst_19445 = inst_19471;
var inst_19446 = null;
var inst_19447 = (0);
var inst_19448 = (0);
var state_19504__$1 = (function (){var statearr_19532 = state_19504;
(statearr_19532[(12)] = inst_19446);

(statearr_19532[(13)] = inst_19447);

(statearr_19532[(14)] = inst_19445);

(statearr_19532[(15)] = inst_19470);

(statearr_19532[(16)] = inst_19448);

return statearr_19532;
})();
var statearr_19533_20967 = state_19504__$1;
(statearr_19533_20967[(2)] = null);

(statearr_19533_20967[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (3))){
var inst_19502 = (state_19504[(2)]);
var state_19504__$1 = state_19504;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19504__$1,inst_19502);
} else {
if((state_val_19505 === (12))){
var inst_19479 = (state_19504[(2)]);
var state_19504__$1 = state_19504;
var statearr_19534_20972 = state_19504__$1;
(statearr_19534_20972[(2)] = inst_19479);

(statearr_19534_20972[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (2))){
var state_19504__$1 = state_19504;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19504__$1,(4),ch);
} else {
if((state_val_19505 === (23))){
var state_19504__$1 = state_19504;
var statearr_19536_20977 = state_19504__$1;
(statearr_19536_20977[(2)] = null);

(statearr_19536_20977[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (19))){
var inst_19485 = (state_19504[(11)]);
var inst_19435 = (state_19504[(8)]);
var inst_19487 = cljs.core.async.muxch_STAR_(inst_19485);
var state_19504__$1 = state_19504;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_19504__$1,(22),inst_19487,inst_19435);
} else {
if((state_val_19505 === (11))){
var inst_19459 = (state_19504[(10)]);
var inst_19445 = (state_19504[(14)]);
var inst_19459__$1 = cljs.core.seq(inst_19445);
var state_19504__$1 = (function (){var statearr_19538 = state_19504;
(statearr_19538[(10)] = inst_19459__$1);

return statearr_19538;
})();
if(inst_19459__$1){
var statearr_19539_20985 = state_19504__$1;
(statearr_19539_20985[(1)] = (13));

} else {
var statearr_19540_20986 = state_19504__$1;
(statearr_19540_20986[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (9))){
var inst_19481 = (state_19504[(2)]);
var state_19504__$1 = state_19504;
var statearr_19541_20989 = state_19504__$1;
(statearr_19541_20989[(2)] = inst_19481);

(statearr_19541_20989[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (5))){
var inst_19442 = cljs.core.deref(mults);
var inst_19443 = cljs.core.vals(inst_19442);
var inst_19444 = cljs.core.seq(inst_19443);
var inst_19445 = inst_19444;
var inst_19446 = null;
var inst_19447 = (0);
var inst_19448 = (0);
var state_19504__$1 = (function (){var statearr_19545 = state_19504;
(statearr_19545[(12)] = inst_19446);

(statearr_19545[(13)] = inst_19447);

(statearr_19545[(14)] = inst_19445);

(statearr_19545[(16)] = inst_19448);

return statearr_19545;
})();
var statearr_19546_20990 = state_19504__$1;
(statearr_19546_20990[(2)] = null);

(statearr_19546_20990[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (14))){
var state_19504__$1 = state_19504;
var statearr_19550_20991 = state_19504__$1;
(statearr_19550_20991[(2)] = null);

(statearr_19550_20991[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (16))){
var inst_19459 = (state_19504[(10)]);
var inst_19463 = cljs.core.chunk_first(inst_19459);
var inst_19464 = cljs.core.chunk_rest(inst_19459);
var inst_19465 = cljs.core.count(inst_19463);
var inst_19445 = inst_19464;
var inst_19446 = inst_19463;
var inst_19447 = inst_19465;
var inst_19448 = (0);
var state_19504__$1 = (function (){var statearr_19551 = state_19504;
(statearr_19551[(12)] = inst_19446);

(statearr_19551[(13)] = inst_19447);

(statearr_19551[(14)] = inst_19445);

(statearr_19551[(16)] = inst_19448);

return statearr_19551;
})();
var statearr_19552_20992 = state_19504__$1;
(statearr_19552_20992[(2)] = null);

(statearr_19552_20992[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (10))){
var inst_19446 = (state_19504[(12)]);
var inst_19447 = (state_19504[(13)]);
var inst_19445 = (state_19504[(14)]);
var inst_19448 = (state_19504[(16)]);
var inst_19453 = cljs.core._nth(inst_19446,inst_19448);
var inst_19454 = cljs.core.async.muxch_STAR_(inst_19453);
var inst_19455 = cljs.core.async.close_BANG_(inst_19454);
var inst_19456 = (inst_19448 + (1));
var tmp19547 = inst_19446;
var tmp19548 = inst_19447;
var tmp19549 = inst_19445;
var inst_19445__$1 = tmp19549;
var inst_19446__$1 = tmp19547;
var inst_19447__$1 = tmp19548;
var inst_19448__$1 = inst_19456;
var state_19504__$1 = (function (){var statearr_19553 = state_19504;
(statearr_19553[(12)] = inst_19446__$1);

(statearr_19553[(13)] = inst_19447__$1);

(statearr_19553[(17)] = inst_19455);

(statearr_19553[(14)] = inst_19445__$1);

(statearr_19553[(16)] = inst_19448__$1);

return statearr_19553;
})();
var statearr_19554_20993 = state_19504__$1;
(statearr_19554_20993[(2)] = null);

(statearr_19554_20993[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (18))){
var inst_19474 = (state_19504[(2)]);
var state_19504__$1 = state_19504;
var statearr_19555_20998 = state_19504__$1;
(statearr_19555_20998[(2)] = inst_19474);

(statearr_19555_20998[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19505 === (8))){
var inst_19447 = (state_19504[(13)]);
var inst_19448 = (state_19504[(16)]);
var inst_19450 = (inst_19448 < inst_19447);
var inst_19451 = inst_19450;
var state_19504__$1 = state_19504;
if(cljs.core.truth_(inst_19451)){
var statearr_19556_21005 = state_19504__$1;
(statearr_19556_21005[(1)] = (10));

} else {
var statearr_19557_21007 = state_19504__$1;
(statearr_19557_21007[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__17706__auto__ = null;
var cljs$core$async$state_machine__17706__auto____0 = (function (){
var statearr_19558 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19558[(0)] = cljs$core$async$state_machine__17706__auto__);

(statearr_19558[(1)] = (1));

return statearr_19558;
});
var cljs$core$async$state_machine__17706__auto____1 = (function (state_19504){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_19504);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e19559){var ex__17709__auto__ = e19559;
var statearr_19560_21019 = state_19504;
(statearr_19560_21019[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_19504[(4)]))){
var statearr_19561_21020 = state_19504;
(statearr_19561_21020[(1)] = cljs.core.first((state_19504[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21021 = state_19504;
state_19504 = G__21021;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$state_machine__17706__auto__ = function(state_19504){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__17706__auto____1.call(this,state_19504);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__17706__auto____0;
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__17706__auto____1;
return cljs$core$async$state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_19562 = f__18003__auto__();
(statearr_19562[(6)] = c__18002__auto___20912);

return statearr_19562;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__19564 = arguments.length;
switch (G__19564) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__19566 = arguments.length;
switch (G__19566) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__19568 = arguments.length;
switch (G__19568) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
if((cnt === (0))){
cljs.core.async.close_BANG_(out);
} else {
var c__18002__auto___21057 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_19615){
var state_val_19616 = (state_19615[(1)]);
if((state_val_19616 === (7))){
var state_19615__$1 = state_19615;
var statearr_19617_21064 = state_19615__$1;
(statearr_19617_21064[(2)] = null);

(statearr_19617_21064[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19616 === (1))){
var state_19615__$1 = state_19615;
var statearr_19618_21068 = state_19615__$1;
(statearr_19618_21068[(2)] = null);

(statearr_19618_21068[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19616 === (4))){
var inst_19572 = (state_19615[(7)]);
var inst_19573 = (state_19615[(8)]);
var inst_19575 = (inst_19573 < inst_19572);
var state_19615__$1 = state_19615;
if(cljs.core.truth_(inst_19575)){
var statearr_19620_21075 = state_19615__$1;
(statearr_19620_21075[(1)] = (6));

} else {
var statearr_19624_21076 = state_19615__$1;
(statearr_19624_21076[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19616 === (15))){
var inst_19601 = (state_19615[(9)]);
var inst_19606 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_19601);
var state_19615__$1 = state_19615;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_19615__$1,(17),out,inst_19606);
} else {
if((state_val_19616 === (13))){
var inst_19601 = (state_19615[(9)]);
var inst_19601__$1 = (state_19615[(2)]);
var inst_19602 = cljs.core.some(cljs.core.nil_QMARK_,inst_19601__$1);
var state_19615__$1 = (function (){var statearr_19625 = state_19615;
(statearr_19625[(9)] = inst_19601__$1);

return statearr_19625;
})();
if(cljs.core.truth_(inst_19602)){
var statearr_19626_21081 = state_19615__$1;
(statearr_19626_21081[(1)] = (14));

} else {
var statearr_19627_21082 = state_19615__$1;
(statearr_19627_21082[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19616 === (6))){
var state_19615__$1 = state_19615;
var statearr_19628_21083 = state_19615__$1;
(statearr_19628_21083[(2)] = null);

(statearr_19628_21083[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19616 === (17))){
var inst_19608 = (state_19615[(2)]);
var state_19615__$1 = (function (){var statearr_19630 = state_19615;
(statearr_19630[(10)] = inst_19608);

return statearr_19630;
})();
var statearr_19631_21088 = state_19615__$1;
(statearr_19631_21088[(2)] = null);

(statearr_19631_21088[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19616 === (3))){
var inst_19613 = (state_19615[(2)]);
var state_19615__$1 = state_19615;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19615__$1,inst_19613);
} else {
if((state_val_19616 === (12))){
var _ = (function (){var statearr_19632 = state_19615;
(statearr_19632[(4)] = cljs.core.rest((state_19615[(4)])));

return statearr_19632;
})();
var state_19615__$1 = state_19615;
var ex19629 = (state_19615__$1[(2)]);
var statearr_19633_21091 = state_19615__$1;
(statearr_19633_21091[(5)] = ex19629);


if((ex19629 instanceof Object)){
var statearr_19634_21092 = state_19615__$1;
(statearr_19634_21092[(1)] = (11));

(statearr_19634_21092[(5)] = null);

} else {
throw ex19629;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19616 === (2))){
var inst_19571 = cljs.core.reset_BANG_(dctr,cnt);
var inst_19572 = cnt;
var inst_19573 = (0);
var state_19615__$1 = (function (){var statearr_19635 = state_19615;
(statearr_19635[(11)] = inst_19571);

(statearr_19635[(7)] = inst_19572);

(statearr_19635[(8)] = inst_19573);

return statearr_19635;
})();
var statearr_19644_21094 = state_19615__$1;
(statearr_19644_21094[(2)] = null);

(statearr_19644_21094[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19616 === (11))){
var inst_19577 = (state_19615[(2)]);
var inst_19578 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_19615__$1 = (function (){var statearr_19651 = state_19615;
(statearr_19651[(12)] = inst_19577);

return statearr_19651;
})();
var statearr_19652_21095 = state_19615__$1;
(statearr_19652_21095[(2)] = inst_19578);

(statearr_19652_21095[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19616 === (9))){
var inst_19573 = (state_19615[(8)]);
var _ = (function (){var statearr_19659 = state_19615;
(statearr_19659[(4)] = cljs.core.cons((12),(state_19615[(4)])));

return statearr_19659;
})();
var inst_19584 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_19573) : chs__$1.call(null,inst_19573));
var inst_19585 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_19573) : done.call(null,inst_19573));
var inst_19586 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_19584,inst_19585);
var ___$1 = (function (){var statearr_19660 = state_19615;
(statearr_19660[(4)] = cljs.core.rest((state_19615[(4)])));

return statearr_19660;
})();
var state_19615__$1 = state_19615;
var statearr_19661_21098 = state_19615__$1;
(statearr_19661_21098[(2)] = inst_19586);

(statearr_19661_21098[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19616 === (5))){
var inst_19596 = (state_19615[(2)]);
var state_19615__$1 = (function (){var statearr_19662 = state_19615;
(statearr_19662[(13)] = inst_19596);

return statearr_19662;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19615__$1,(13),dchan);
} else {
if((state_val_19616 === (14))){
var inst_19604 = cljs.core.async.close_BANG_(out);
var state_19615__$1 = state_19615;
var statearr_19663_21099 = state_19615__$1;
(statearr_19663_21099[(2)] = inst_19604);

(statearr_19663_21099[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19616 === (16))){
var inst_19611 = (state_19615[(2)]);
var state_19615__$1 = state_19615;
var statearr_19678_21104 = state_19615__$1;
(statearr_19678_21104[(2)] = inst_19611);

(statearr_19678_21104[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19616 === (10))){
var inst_19573 = (state_19615[(8)]);
var inst_19589 = (state_19615[(2)]);
var inst_19590 = (inst_19573 + (1));
var inst_19573__$1 = inst_19590;
var state_19615__$1 = (function (){var statearr_19679 = state_19615;
(statearr_19679[(14)] = inst_19589);

(statearr_19679[(8)] = inst_19573__$1);

return statearr_19679;
})();
var statearr_19686_21105 = state_19615__$1;
(statearr_19686_21105[(2)] = null);

(statearr_19686_21105[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19616 === (8))){
var inst_19594 = (state_19615[(2)]);
var state_19615__$1 = state_19615;
var statearr_19687_21106 = state_19615__$1;
(statearr_19687_21106[(2)] = inst_19594);

(statearr_19687_21106[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__17706__auto__ = null;
var cljs$core$async$state_machine__17706__auto____0 = (function (){
var statearr_19688 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19688[(0)] = cljs$core$async$state_machine__17706__auto__);

(statearr_19688[(1)] = (1));

return statearr_19688;
});
var cljs$core$async$state_machine__17706__auto____1 = (function (state_19615){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_19615);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e19689){var ex__17709__auto__ = e19689;
var statearr_19690_21108 = state_19615;
(statearr_19690_21108[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_19615[(4)]))){
var statearr_19691_21109 = state_19615;
(statearr_19691_21109[(1)] = cljs.core.first((state_19615[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21110 = state_19615;
state_19615 = G__21110;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$state_machine__17706__auto__ = function(state_19615){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__17706__auto____1.call(this,state_19615);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__17706__auto____0;
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__17706__auto____1;
return cljs$core$async$state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_19694 = f__18003__auto__();
(statearr_19694[(6)] = c__18002__auto___21057);

return statearr_19694;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));

}

return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__19698 = arguments.length;
switch (G__19698) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__18002__auto___21112 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_19733){
var state_val_19734 = (state_19733[(1)]);
if((state_val_19734 === (7))){
var inst_19713 = (state_19733[(7)]);
var inst_19712 = (state_19733[(8)]);
var inst_19712__$1 = (state_19733[(2)]);
var inst_19713__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_19712__$1,(0),null);
var inst_19714 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_19712__$1,(1),null);
var inst_19715 = (inst_19713__$1 == null);
var state_19733__$1 = (function (){var statearr_19735 = state_19733;
(statearr_19735[(7)] = inst_19713__$1);

(statearr_19735[(8)] = inst_19712__$1);

(statearr_19735[(9)] = inst_19714);

return statearr_19735;
})();
if(cljs.core.truth_(inst_19715)){
var statearr_19736_21113 = state_19733__$1;
(statearr_19736_21113[(1)] = (8));

} else {
var statearr_19737_21114 = state_19733__$1;
(statearr_19737_21114[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19734 === (1))){
var inst_19702 = cljs.core.vec(chs);
var inst_19703 = inst_19702;
var state_19733__$1 = (function (){var statearr_19738 = state_19733;
(statearr_19738[(10)] = inst_19703);

return statearr_19738;
})();
var statearr_19739_21116 = state_19733__$1;
(statearr_19739_21116[(2)] = null);

(statearr_19739_21116[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19734 === (4))){
var inst_19703 = (state_19733[(10)]);
var state_19733__$1 = state_19733;
return cljs.core.async.ioc_alts_BANG_(state_19733__$1,(7),inst_19703);
} else {
if((state_val_19734 === (6))){
var inst_19729 = (state_19733[(2)]);
var state_19733__$1 = state_19733;
var statearr_19740_21118 = state_19733__$1;
(statearr_19740_21118[(2)] = inst_19729);

(statearr_19740_21118[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19734 === (3))){
var inst_19731 = (state_19733[(2)]);
var state_19733__$1 = state_19733;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19733__$1,inst_19731);
} else {
if((state_val_19734 === (2))){
var inst_19703 = (state_19733[(10)]);
var inst_19705 = cljs.core.count(inst_19703);
var inst_19706 = (inst_19705 > (0));
var state_19733__$1 = state_19733;
if(cljs.core.truth_(inst_19706)){
var statearr_19742_21123 = state_19733__$1;
(statearr_19742_21123[(1)] = (4));

} else {
var statearr_19743_21124 = state_19733__$1;
(statearr_19743_21124[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19734 === (11))){
var inst_19703 = (state_19733[(10)]);
var inst_19722 = (state_19733[(2)]);
var tmp19741 = inst_19703;
var inst_19703__$1 = tmp19741;
var state_19733__$1 = (function (){var statearr_19744 = state_19733;
(statearr_19744[(10)] = inst_19703__$1);

(statearr_19744[(11)] = inst_19722);

return statearr_19744;
})();
var statearr_19745_21125 = state_19733__$1;
(statearr_19745_21125[(2)] = null);

(statearr_19745_21125[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19734 === (9))){
var inst_19713 = (state_19733[(7)]);
var state_19733__$1 = state_19733;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_19733__$1,(11),out,inst_19713);
} else {
if((state_val_19734 === (5))){
var inst_19727 = cljs.core.async.close_BANG_(out);
var state_19733__$1 = state_19733;
var statearr_19746_21126 = state_19733__$1;
(statearr_19746_21126[(2)] = inst_19727);

(statearr_19746_21126[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19734 === (10))){
var inst_19725 = (state_19733[(2)]);
var state_19733__$1 = state_19733;
var statearr_19747_21128 = state_19733__$1;
(statearr_19747_21128[(2)] = inst_19725);

(statearr_19747_21128[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19734 === (8))){
var inst_19713 = (state_19733[(7)]);
var inst_19703 = (state_19733[(10)]);
var inst_19712 = (state_19733[(8)]);
var inst_19714 = (state_19733[(9)]);
var inst_19717 = (function (){var cs = inst_19703;
var vec__19708 = inst_19712;
var v = inst_19713;
var c = inst_19714;
return (function (p1__19696_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__19696_SHARP_);
});
})();
var inst_19718 = cljs.core.filterv(inst_19717,inst_19703);
var inst_19703__$1 = inst_19718;
var state_19733__$1 = (function (){var statearr_19748 = state_19733;
(statearr_19748[(10)] = inst_19703__$1);

return statearr_19748;
})();
var statearr_19749_21138 = state_19733__$1;
(statearr_19749_21138[(2)] = null);

(statearr_19749_21138[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__17706__auto__ = null;
var cljs$core$async$state_machine__17706__auto____0 = (function (){
var statearr_19750 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19750[(0)] = cljs$core$async$state_machine__17706__auto__);

(statearr_19750[(1)] = (1));

return statearr_19750;
});
var cljs$core$async$state_machine__17706__auto____1 = (function (state_19733){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_19733);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e19751){var ex__17709__auto__ = e19751;
var statearr_19752_21141 = state_19733;
(statearr_19752_21141[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_19733[(4)]))){
var statearr_19753_21142 = state_19733;
(statearr_19753_21142[(1)] = cljs.core.first((state_19733[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21143 = state_19733;
state_19733 = G__21143;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$state_machine__17706__auto__ = function(state_19733){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__17706__auto____1.call(this,state_19733);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__17706__auto____0;
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__17706__auto____1;
return cljs$core$async$state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_19754 = f__18003__auto__();
(statearr_19754[(6)] = c__18002__auto___21112);

return statearr_19754;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__19764 = arguments.length;
switch (G__19764) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__18002__auto___21150 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_19791){
var state_val_19792 = (state_19791[(1)]);
if((state_val_19792 === (7))){
var inst_19773 = (state_19791[(7)]);
var inst_19773__$1 = (state_19791[(2)]);
var inst_19774 = (inst_19773__$1 == null);
var inst_19775 = cljs.core.not(inst_19774);
var state_19791__$1 = (function (){var statearr_19793 = state_19791;
(statearr_19793[(7)] = inst_19773__$1);

return statearr_19793;
})();
if(inst_19775){
var statearr_19794_21151 = state_19791__$1;
(statearr_19794_21151[(1)] = (8));

} else {
var statearr_19795_21152 = state_19791__$1;
(statearr_19795_21152[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19792 === (1))){
var inst_19768 = (0);
var state_19791__$1 = (function (){var statearr_19796 = state_19791;
(statearr_19796[(8)] = inst_19768);

return statearr_19796;
})();
var statearr_19797_21153 = state_19791__$1;
(statearr_19797_21153[(2)] = null);

(statearr_19797_21153[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19792 === (4))){
var state_19791__$1 = state_19791;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19791__$1,(7),ch);
} else {
if((state_val_19792 === (6))){
var inst_19786 = (state_19791[(2)]);
var state_19791__$1 = state_19791;
var statearr_19798_21155 = state_19791__$1;
(statearr_19798_21155[(2)] = inst_19786);

(statearr_19798_21155[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19792 === (3))){
var inst_19788 = (state_19791[(2)]);
var inst_19789 = cljs.core.async.close_BANG_(out);
var state_19791__$1 = (function (){var statearr_19799 = state_19791;
(statearr_19799[(9)] = inst_19788);

return statearr_19799;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_19791__$1,inst_19789);
} else {
if((state_val_19792 === (2))){
var inst_19768 = (state_19791[(8)]);
var inst_19770 = (inst_19768 < n);
var state_19791__$1 = state_19791;
if(cljs.core.truth_(inst_19770)){
var statearr_19800_21158 = state_19791__$1;
(statearr_19800_21158[(1)] = (4));

} else {
var statearr_19801_21159 = state_19791__$1;
(statearr_19801_21159[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19792 === (11))){
var inst_19768 = (state_19791[(8)]);
var inst_19778 = (state_19791[(2)]);
var inst_19779 = (inst_19768 + (1));
var inst_19768__$1 = inst_19779;
var state_19791__$1 = (function (){var statearr_19802 = state_19791;
(statearr_19802[(10)] = inst_19778);

(statearr_19802[(8)] = inst_19768__$1);

return statearr_19802;
})();
var statearr_19803_21161 = state_19791__$1;
(statearr_19803_21161[(2)] = null);

(statearr_19803_21161[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19792 === (9))){
var state_19791__$1 = state_19791;
var statearr_19804_21163 = state_19791__$1;
(statearr_19804_21163[(2)] = null);

(statearr_19804_21163[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19792 === (5))){
var state_19791__$1 = state_19791;
var statearr_19805_21165 = state_19791__$1;
(statearr_19805_21165[(2)] = null);

(statearr_19805_21165[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19792 === (10))){
var inst_19783 = (state_19791[(2)]);
var state_19791__$1 = state_19791;
var statearr_19806_21166 = state_19791__$1;
(statearr_19806_21166[(2)] = inst_19783);

(statearr_19806_21166[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19792 === (8))){
var inst_19773 = (state_19791[(7)]);
var state_19791__$1 = state_19791;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_19791__$1,(11),out,inst_19773);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__17706__auto__ = null;
var cljs$core$async$state_machine__17706__auto____0 = (function (){
var statearr_19807 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_19807[(0)] = cljs$core$async$state_machine__17706__auto__);

(statearr_19807[(1)] = (1));

return statearr_19807;
});
var cljs$core$async$state_machine__17706__auto____1 = (function (state_19791){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_19791);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e19808){var ex__17709__auto__ = e19808;
var statearr_19810_21168 = state_19791;
(statearr_19810_21168[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_19791[(4)]))){
var statearr_19811_21169 = state_19791;
(statearr_19811_21169[(1)] = cljs.core.first((state_19791[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21170 = state_19791;
state_19791 = G__21170;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$state_machine__17706__auto__ = function(state_19791){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__17706__auto____1.call(this,state_19791);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__17706__auto____0;
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__17706__auto____1;
return cljs$core$async$state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_19813 = f__18003__auto__();
(statearr_19813[(6)] = c__18002__auto___21150);

return statearr_19813;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);


/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async19822 = (function (f,ch,meta19816,_,fn1,meta19823){
this.f = f;
this.ch = ch;
this.meta19816 = meta19816;
this._ = _;
this.fn1 = fn1;
this.meta19823 = meta19823;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async19822.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_19824,meta19823__$1){
var self__ = this;
var _19824__$1 = this;
return (new cljs.core.async.t_cljs$core$async19822(self__.f,self__.ch,self__.meta19816,self__._,self__.fn1,meta19823__$1));
}));

(cljs.core.async.t_cljs$core$async19822.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_19824){
var self__ = this;
var _19824__$1 = this;
return self__.meta19823;
}));

(cljs.core.async.t_cljs$core$async19822.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19822.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async19822.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async19822.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__19814_SHARP_){
var G__19827 = (((p1__19814_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__19814_SHARP_) : self__.f.call(null,p1__19814_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__19827) : f1.call(null,G__19827));
});
}));

(cljs.core.async.t_cljs$core$async19822.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta19816","meta19816",-625049479,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async19815","cljs.core.async/t_cljs$core$async19815",580688959,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta19823","meta19823",889959251,null)], null);
}));

(cljs.core.async.t_cljs$core$async19822.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async19822.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19822");

(cljs.core.async.t_cljs$core$async19822.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async19822");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19822.
 */
cljs.core.async.__GT_t_cljs$core$async19822 = (function cljs$core$async$__GT_t_cljs$core$async19822(f,ch,meta19816,_,fn1,meta19823){
return (new cljs.core.async.t_cljs$core$async19822(f,ch,meta19816,_,fn1,meta19823));
});



/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async19815 = (function (f,ch,meta19816){
this.f = f;
this.ch = ch;
this.meta19816 = meta19816;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async19815.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_19817,meta19816__$1){
var self__ = this;
var _19817__$1 = this;
return (new cljs.core.async.t_cljs$core$async19815(self__.f,self__.ch,meta19816__$1));
}));

(cljs.core.async.t_cljs$core$async19815.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_19817){
var self__ = this;
var _19817__$1 = this;
return self__.meta19816;
}));

(cljs.core.async.t_cljs$core$async19815.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19815.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async19815.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async19815.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19815.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(new cljs.core.async.t_cljs$core$async19822(self__.f,self__.ch,self__.meta19816,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY)));
if(cljs.core.truth_((function (){var and__5000__auto__ = ret;
if(cljs.core.truth_(and__5000__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5000__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__19828 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__19828) : self__.f.call(null,G__19828));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async19815.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19815.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async19815.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta19816","meta19816",-625049479,null)], null);
}));

(cljs.core.async.t_cljs$core$async19815.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async19815.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19815");

(cljs.core.async.t_cljs$core$async19815.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async19815");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19815.
 */
cljs.core.async.__GT_t_cljs$core$async19815 = (function cljs$core$async$__GT_t_cljs$core$async19815(f,ch,meta19816){
return (new cljs.core.async.t_cljs$core$async19815(f,ch,meta19816));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
return (new cljs.core.async.t_cljs$core$async19815(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async19829 = (function (f,ch,meta19830){
this.f = f;
this.ch = ch;
this.meta19830 = meta19830;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async19829.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_19831,meta19830__$1){
var self__ = this;
var _19831__$1 = this;
return (new cljs.core.async.t_cljs$core$async19829(self__.f,self__.ch,meta19830__$1));
}));

(cljs.core.async.t_cljs$core$async19829.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_19831){
var self__ = this;
var _19831__$1 = this;
return self__.meta19830;
}));

(cljs.core.async.t_cljs$core$async19829.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19829.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async19829.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19829.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async19829.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19829.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async19829.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta19830","meta19830",-1151433153,null)], null);
}));

(cljs.core.async.t_cljs$core$async19829.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async19829.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19829");

(cljs.core.async.t_cljs$core$async19829.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async19829");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19829.
 */
cljs.core.async.__GT_t_cljs$core$async19829 = (function cljs$core$async$__GT_t_cljs$core$async19829(f,ch,meta19830){
return (new cljs.core.async.t_cljs$core$async19829(f,ch,meta19830));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
return (new cljs.core.async.t_cljs$core$async19829(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async19848 = (function (p,ch,meta19849){
this.p = p;
this.ch = ch;
this.meta19849 = meta19849;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async19848.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_19850,meta19849__$1){
var self__ = this;
var _19850__$1 = this;
return (new cljs.core.async.t_cljs$core$async19848(self__.p,self__.ch,meta19849__$1));
}));

(cljs.core.async.t_cljs$core$async19848.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_19850){
var self__ = this;
var _19850__$1 = this;
return self__.meta19849;
}));

(cljs.core.async.t_cljs$core$async19848.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19848.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async19848.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async19848.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19848.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async19848.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19848.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async19848.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta19849","meta19849",-44520529,null)], null);
}));

(cljs.core.async.t_cljs$core$async19848.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async19848.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19848");

(cljs.core.async.t_cljs$core$async19848.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async19848");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19848.
 */
cljs.core.async.__GT_t_cljs$core$async19848 = (function cljs$core$async$__GT_t_cljs$core$async19848(p,ch,meta19849){
return (new cljs.core.async.t_cljs$core$async19848(p,ch,meta19849));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
return (new cljs.core.async.t_cljs$core$async19848(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__19881 = arguments.length;
switch (G__19881) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__18002__auto___21187 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_19902){
var state_val_19903 = (state_19902[(1)]);
if((state_val_19903 === (7))){
var inst_19898 = (state_19902[(2)]);
var state_19902__$1 = state_19902;
var statearr_19904_21188 = state_19902__$1;
(statearr_19904_21188[(2)] = inst_19898);

(statearr_19904_21188[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19903 === (1))){
var state_19902__$1 = state_19902;
var statearr_19905_21189 = state_19902__$1;
(statearr_19905_21189[(2)] = null);

(statearr_19905_21189[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19903 === (4))){
var inst_19884 = (state_19902[(7)]);
var inst_19884__$1 = (state_19902[(2)]);
var inst_19885 = (inst_19884__$1 == null);
var state_19902__$1 = (function (){var statearr_19906 = state_19902;
(statearr_19906[(7)] = inst_19884__$1);

return statearr_19906;
})();
if(cljs.core.truth_(inst_19885)){
var statearr_19907_21190 = state_19902__$1;
(statearr_19907_21190[(1)] = (5));

} else {
var statearr_19908_21191 = state_19902__$1;
(statearr_19908_21191[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19903 === (6))){
var inst_19884 = (state_19902[(7)]);
var inst_19889 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_19884) : p.call(null,inst_19884));
var state_19902__$1 = state_19902;
if(cljs.core.truth_(inst_19889)){
var statearr_19909_21192 = state_19902__$1;
(statearr_19909_21192[(1)] = (8));

} else {
var statearr_19910_21193 = state_19902__$1;
(statearr_19910_21193[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19903 === (3))){
var inst_19900 = (state_19902[(2)]);
var state_19902__$1 = state_19902;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19902__$1,inst_19900);
} else {
if((state_val_19903 === (2))){
var state_19902__$1 = state_19902;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19902__$1,(4),ch);
} else {
if((state_val_19903 === (11))){
var inst_19892 = (state_19902[(2)]);
var state_19902__$1 = state_19902;
var statearr_19911_21194 = state_19902__$1;
(statearr_19911_21194[(2)] = inst_19892);

(statearr_19911_21194[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19903 === (9))){
var state_19902__$1 = state_19902;
var statearr_19912_21197 = state_19902__$1;
(statearr_19912_21197[(2)] = null);

(statearr_19912_21197[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19903 === (5))){
var inst_19887 = cljs.core.async.close_BANG_(out);
var state_19902__$1 = state_19902;
var statearr_19913_21199 = state_19902__$1;
(statearr_19913_21199[(2)] = inst_19887);

(statearr_19913_21199[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19903 === (10))){
var inst_19895 = (state_19902[(2)]);
var state_19902__$1 = (function (){var statearr_19914 = state_19902;
(statearr_19914[(8)] = inst_19895);

return statearr_19914;
})();
var statearr_19915_21201 = state_19902__$1;
(statearr_19915_21201[(2)] = null);

(statearr_19915_21201[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19903 === (8))){
var inst_19884 = (state_19902[(7)]);
var state_19902__$1 = state_19902;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_19902__$1,(11),out,inst_19884);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__17706__auto__ = null;
var cljs$core$async$state_machine__17706__auto____0 = (function (){
var statearr_19916 = [null,null,null,null,null,null,null,null,null];
(statearr_19916[(0)] = cljs$core$async$state_machine__17706__auto__);

(statearr_19916[(1)] = (1));

return statearr_19916;
});
var cljs$core$async$state_machine__17706__auto____1 = (function (state_19902){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_19902);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e19917){var ex__17709__auto__ = e19917;
var statearr_19918_21207 = state_19902;
(statearr_19918_21207[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_19902[(4)]))){
var statearr_19919_21210 = state_19902;
(statearr_19919_21210[(1)] = cljs.core.first((state_19902[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21211 = state_19902;
state_19902 = G__21211;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$state_machine__17706__auto__ = function(state_19902){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__17706__auto____1.call(this,state_19902);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__17706__auto____0;
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__17706__auto____1;
return cljs$core$async$state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_19920 = f__18003__auto__();
(statearr_19920[(6)] = c__18002__auto___21187);

return statearr_19920;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__19924 = arguments.length;
switch (G__19924) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__18002__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_19999){
var state_val_20000 = (state_19999[(1)]);
if((state_val_20000 === (7))){
var inst_19995 = (state_19999[(2)]);
var state_19999__$1 = state_19999;
var statearr_20001_21216 = state_19999__$1;
(statearr_20001_21216[(2)] = inst_19995);

(statearr_20001_21216[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (20))){
var inst_19964 = (state_19999[(7)]);
var inst_19976 = (state_19999[(2)]);
var inst_19977 = cljs.core.next(inst_19964);
var inst_19949 = inst_19977;
var inst_19950 = null;
var inst_19951 = (0);
var inst_19952 = (0);
var state_19999__$1 = (function (){var statearr_20002 = state_19999;
(statearr_20002[(8)] = inst_19952);

(statearr_20002[(9)] = inst_19949);

(statearr_20002[(10)] = inst_19951);

(statearr_20002[(11)] = inst_19976);

(statearr_20002[(12)] = inst_19950);

return statearr_20002;
})();
var statearr_20003_21218 = state_19999__$1;
(statearr_20003_21218[(2)] = null);

(statearr_20003_21218[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (1))){
var state_19999__$1 = state_19999;
var statearr_20004_21219 = state_19999__$1;
(statearr_20004_21219[(2)] = null);

(statearr_20004_21219[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (4))){
var inst_19938 = (state_19999[(13)]);
var inst_19938__$1 = (state_19999[(2)]);
var inst_19939 = (inst_19938__$1 == null);
var state_19999__$1 = (function (){var statearr_20005 = state_19999;
(statearr_20005[(13)] = inst_19938__$1);

return statearr_20005;
})();
if(cljs.core.truth_(inst_19939)){
var statearr_20006_21221 = state_19999__$1;
(statearr_20006_21221[(1)] = (5));

} else {
var statearr_20007_21222 = state_19999__$1;
(statearr_20007_21222[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (15))){
var state_19999__$1 = state_19999;
var statearr_20011_21226 = state_19999__$1;
(statearr_20011_21226[(2)] = null);

(statearr_20011_21226[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (21))){
var state_19999__$1 = state_19999;
var statearr_20012_21228 = state_19999__$1;
(statearr_20012_21228[(2)] = null);

(statearr_20012_21228[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (13))){
var inst_19952 = (state_19999[(8)]);
var inst_19949 = (state_19999[(9)]);
var inst_19951 = (state_19999[(10)]);
var inst_19950 = (state_19999[(12)]);
var inst_19960 = (state_19999[(2)]);
var inst_19961 = (inst_19952 + (1));
var tmp20008 = inst_19949;
var tmp20009 = inst_19951;
var tmp20010 = inst_19950;
var inst_19949__$1 = tmp20008;
var inst_19950__$1 = tmp20010;
var inst_19951__$1 = tmp20009;
var inst_19952__$1 = inst_19961;
var state_19999__$1 = (function (){var statearr_20013 = state_19999;
(statearr_20013[(8)] = inst_19952__$1);

(statearr_20013[(9)] = inst_19949__$1);

(statearr_20013[(10)] = inst_19951__$1);

(statearr_20013[(12)] = inst_19950__$1);

(statearr_20013[(14)] = inst_19960);

return statearr_20013;
})();
var statearr_20014_21233 = state_19999__$1;
(statearr_20014_21233[(2)] = null);

(statearr_20014_21233[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (22))){
var state_19999__$1 = state_19999;
var statearr_20017_21234 = state_19999__$1;
(statearr_20017_21234[(2)] = null);

(statearr_20017_21234[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (6))){
var inst_19938 = (state_19999[(13)]);
var inst_19947 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_19938) : f.call(null,inst_19938));
var inst_19948 = cljs.core.seq(inst_19947);
var inst_19949 = inst_19948;
var inst_19950 = null;
var inst_19951 = (0);
var inst_19952 = (0);
var state_19999__$1 = (function (){var statearr_20018 = state_19999;
(statearr_20018[(8)] = inst_19952);

(statearr_20018[(9)] = inst_19949);

(statearr_20018[(10)] = inst_19951);

(statearr_20018[(12)] = inst_19950);

return statearr_20018;
})();
var statearr_20020_21239 = state_19999__$1;
(statearr_20020_21239[(2)] = null);

(statearr_20020_21239[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (17))){
var inst_19964 = (state_19999[(7)]);
var inst_19969 = cljs.core.chunk_first(inst_19964);
var inst_19970 = cljs.core.chunk_rest(inst_19964);
var inst_19971 = cljs.core.count(inst_19969);
var inst_19949 = inst_19970;
var inst_19950 = inst_19969;
var inst_19951 = inst_19971;
var inst_19952 = (0);
var state_19999__$1 = (function (){var statearr_20021 = state_19999;
(statearr_20021[(8)] = inst_19952);

(statearr_20021[(9)] = inst_19949);

(statearr_20021[(10)] = inst_19951);

(statearr_20021[(12)] = inst_19950);

return statearr_20021;
})();
var statearr_20022_21240 = state_19999__$1;
(statearr_20022_21240[(2)] = null);

(statearr_20022_21240[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (3))){
var inst_19997 = (state_19999[(2)]);
var state_19999__$1 = state_19999;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19999__$1,inst_19997);
} else {
if((state_val_20000 === (12))){
var inst_19985 = (state_19999[(2)]);
var state_19999__$1 = state_19999;
var statearr_20023_21243 = state_19999__$1;
(statearr_20023_21243[(2)] = inst_19985);

(statearr_20023_21243[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (2))){
var state_19999__$1 = state_19999;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19999__$1,(4),in$);
} else {
if((state_val_20000 === (23))){
var inst_19993 = (state_19999[(2)]);
var state_19999__$1 = state_19999;
var statearr_20024_21247 = state_19999__$1;
(statearr_20024_21247[(2)] = inst_19993);

(statearr_20024_21247[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (19))){
var inst_19980 = (state_19999[(2)]);
var state_19999__$1 = state_19999;
var statearr_20034_21248 = state_19999__$1;
(statearr_20034_21248[(2)] = inst_19980);

(statearr_20034_21248[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (11))){
var inst_19964 = (state_19999[(7)]);
var inst_19949 = (state_19999[(9)]);
var inst_19964__$1 = cljs.core.seq(inst_19949);
var state_19999__$1 = (function (){var statearr_20035 = state_19999;
(statearr_20035[(7)] = inst_19964__$1);

return statearr_20035;
})();
if(inst_19964__$1){
var statearr_20036_21249 = state_19999__$1;
(statearr_20036_21249[(1)] = (14));

} else {
var statearr_20037_21250 = state_19999__$1;
(statearr_20037_21250[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (9))){
var inst_19987 = (state_19999[(2)]);
var inst_19988 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_19999__$1 = (function (){var statearr_20039 = state_19999;
(statearr_20039[(15)] = inst_19987);

return statearr_20039;
})();
if(cljs.core.truth_(inst_19988)){
var statearr_20040_21253 = state_19999__$1;
(statearr_20040_21253[(1)] = (21));

} else {
var statearr_20041_21254 = state_19999__$1;
(statearr_20041_21254[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (5))){
var inst_19941 = cljs.core.async.close_BANG_(out);
var state_19999__$1 = state_19999;
var statearr_20042_21255 = state_19999__$1;
(statearr_20042_21255[(2)] = inst_19941);

(statearr_20042_21255[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (14))){
var inst_19964 = (state_19999[(7)]);
var inst_19967 = cljs.core.chunked_seq_QMARK_(inst_19964);
var state_19999__$1 = state_19999;
if(inst_19967){
var statearr_20043_21260 = state_19999__$1;
(statearr_20043_21260[(1)] = (17));

} else {
var statearr_20044_21262 = state_19999__$1;
(statearr_20044_21262[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (16))){
var inst_19983 = (state_19999[(2)]);
var state_19999__$1 = state_19999;
var statearr_20045_21263 = state_19999__$1;
(statearr_20045_21263[(2)] = inst_19983);

(statearr_20045_21263[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (10))){
var inst_19952 = (state_19999[(8)]);
var inst_19950 = (state_19999[(12)]);
var inst_19958 = cljs.core._nth(inst_19950,inst_19952);
var state_19999__$1 = state_19999;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_19999__$1,(13),out,inst_19958);
} else {
if((state_val_20000 === (18))){
var inst_19964 = (state_19999[(7)]);
var inst_19974 = cljs.core.first(inst_19964);
var state_19999__$1 = state_19999;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_19999__$1,(20),out,inst_19974);
} else {
if((state_val_20000 === (8))){
var inst_19952 = (state_19999[(8)]);
var inst_19951 = (state_19999[(10)]);
var inst_19954 = (inst_19952 < inst_19951);
var inst_19955 = inst_19954;
var state_19999__$1 = state_19999;
if(cljs.core.truth_(inst_19955)){
var statearr_20046_21267 = state_19999__$1;
(statearr_20046_21267[(1)] = (10));

} else {
var statearr_20047_21268 = state_19999__$1;
(statearr_20047_21268[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__17706__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__17706__auto____0 = (function (){
var statearr_20048 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_20048[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__17706__auto__);

(statearr_20048[(1)] = (1));

return statearr_20048;
});
var cljs$core$async$mapcat_STAR__$_state_machine__17706__auto____1 = (function (state_19999){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_19999);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e20049){var ex__17709__auto__ = e20049;
var statearr_20050_21274 = state_19999;
(statearr_20050_21274[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_19999[(4)]))){
var statearr_20051_21279 = state_19999;
(statearr_20051_21279[(1)] = cljs.core.first((state_19999[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21283 = state_19999;
state_19999 = G__21283;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__17706__auto__ = function(state_19999){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__17706__auto____1.call(this,state_19999);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__17706__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__17706__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_20054 = f__18003__auto__();
(statearr_20054[(6)] = c__18002__auto__);

return statearr_20054;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));

return c__18002__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__20056 = arguments.length;
switch (G__20056) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__20060 = arguments.length;
switch (G__20060) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__20069 = arguments.length;
switch (G__20069) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__18002__auto___21298 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_20103){
var state_val_20104 = (state_20103[(1)]);
if((state_val_20104 === (7))){
var inst_20098 = (state_20103[(2)]);
var state_20103__$1 = state_20103;
var statearr_20116_21302 = state_20103__$1;
(statearr_20116_21302[(2)] = inst_20098);

(statearr_20116_21302[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20104 === (1))){
var inst_20080 = null;
var state_20103__$1 = (function (){var statearr_20117 = state_20103;
(statearr_20117[(7)] = inst_20080);

return statearr_20117;
})();
var statearr_20118_21303 = state_20103__$1;
(statearr_20118_21303[(2)] = null);

(statearr_20118_21303[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20104 === (4))){
var inst_20083 = (state_20103[(8)]);
var inst_20083__$1 = (state_20103[(2)]);
var inst_20084 = (inst_20083__$1 == null);
var inst_20085 = cljs.core.not(inst_20084);
var state_20103__$1 = (function (){var statearr_20120 = state_20103;
(statearr_20120[(8)] = inst_20083__$1);

return statearr_20120;
})();
if(inst_20085){
var statearr_20121_21304 = state_20103__$1;
(statearr_20121_21304[(1)] = (5));

} else {
var statearr_20122_21305 = state_20103__$1;
(statearr_20122_21305[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20104 === (6))){
var state_20103__$1 = state_20103;
var statearr_20123_21307 = state_20103__$1;
(statearr_20123_21307[(2)] = null);

(statearr_20123_21307[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20104 === (3))){
var inst_20100 = (state_20103[(2)]);
var inst_20101 = cljs.core.async.close_BANG_(out);
var state_20103__$1 = (function (){var statearr_20124 = state_20103;
(statearr_20124[(9)] = inst_20100);

return statearr_20124;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_20103__$1,inst_20101);
} else {
if((state_val_20104 === (2))){
var state_20103__$1 = state_20103;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20103__$1,(4),ch);
} else {
if((state_val_20104 === (11))){
var inst_20083 = (state_20103[(8)]);
var inst_20092 = (state_20103[(2)]);
var inst_20080 = inst_20083;
var state_20103__$1 = (function (){var statearr_20127 = state_20103;
(statearr_20127[(10)] = inst_20092);

(statearr_20127[(7)] = inst_20080);

return statearr_20127;
})();
var statearr_20128_21310 = state_20103__$1;
(statearr_20128_21310[(2)] = null);

(statearr_20128_21310[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20104 === (9))){
var inst_20083 = (state_20103[(8)]);
var state_20103__$1 = state_20103;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_20103__$1,(11),out,inst_20083);
} else {
if((state_val_20104 === (5))){
var inst_20083 = (state_20103[(8)]);
var inst_20080 = (state_20103[(7)]);
var inst_20087 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_20083,inst_20080);
var state_20103__$1 = state_20103;
if(inst_20087){
var statearr_20135_21312 = state_20103__$1;
(statearr_20135_21312[(1)] = (8));

} else {
var statearr_20136_21313 = state_20103__$1;
(statearr_20136_21313[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20104 === (10))){
var inst_20095 = (state_20103[(2)]);
var state_20103__$1 = state_20103;
var statearr_20137_21316 = state_20103__$1;
(statearr_20137_21316[(2)] = inst_20095);

(statearr_20137_21316[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20104 === (8))){
var inst_20080 = (state_20103[(7)]);
var tmp20132 = inst_20080;
var inst_20080__$1 = tmp20132;
var state_20103__$1 = (function (){var statearr_20138 = state_20103;
(statearr_20138[(7)] = inst_20080__$1);

return statearr_20138;
})();
var statearr_20139_21317 = state_20103__$1;
(statearr_20139_21317[(2)] = null);

(statearr_20139_21317[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__17706__auto__ = null;
var cljs$core$async$state_machine__17706__auto____0 = (function (){
var statearr_20141 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_20141[(0)] = cljs$core$async$state_machine__17706__auto__);

(statearr_20141[(1)] = (1));

return statearr_20141;
});
var cljs$core$async$state_machine__17706__auto____1 = (function (state_20103){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_20103);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e20142){var ex__17709__auto__ = e20142;
var statearr_20143_21320 = state_20103;
(statearr_20143_21320[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_20103[(4)]))){
var statearr_20147_21321 = state_20103;
(statearr_20147_21321[(1)] = cljs.core.first((state_20103[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21322 = state_20103;
state_20103 = G__21322;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$state_machine__17706__auto__ = function(state_20103){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__17706__auto____1.call(this,state_20103);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__17706__auto____0;
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__17706__auto____1;
return cljs$core$async$state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_20149 = f__18003__auto__();
(statearr_20149[(6)] = c__18002__auto___21298);

return statearr_20149;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__20151 = arguments.length;
switch (G__20151) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__18002__auto___21330 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_20198){
var state_val_20199 = (state_20198[(1)]);
if((state_val_20199 === (7))){
var inst_20194 = (state_20198[(2)]);
var state_20198__$1 = state_20198;
var statearr_20200_21331 = state_20198__$1;
(statearr_20200_21331[(2)] = inst_20194);

(statearr_20200_21331[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20199 === (1))){
var inst_20160 = (new Array(n));
var inst_20161 = inst_20160;
var inst_20162 = (0);
var state_20198__$1 = (function (){var statearr_20203 = state_20198;
(statearr_20203[(7)] = inst_20162);

(statearr_20203[(8)] = inst_20161);

return statearr_20203;
})();
var statearr_20204_21336 = state_20198__$1;
(statearr_20204_21336[(2)] = null);

(statearr_20204_21336[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20199 === (4))){
var inst_20165 = (state_20198[(9)]);
var inst_20165__$1 = (state_20198[(2)]);
var inst_20166 = (inst_20165__$1 == null);
var inst_20167 = cljs.core.not(inst_20166);
var state_20198__$1 = (function (){var statearr_20207 = state_20198;
(statearr_20207[(9)] = inst_20165__$1);

return statearr_20207;
})();
if(inst_20167){
var statearr_20208_21338 = state_20198__$1;
(statearr_20208_21338[(1)] = (5));

} else {
var statearr_20209_21339 = state_20198__$1;
(statearr_20209_21339[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20199 === (15))){
var inst_20188 = (state_20198[(2)]);
var state_20198__$1 = state_20198;
var statearr_20210_21340 = state_20198__$1;
(statearr_20210_21340[(2)] = inst_20188);

(statearr_20210_21340[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20199 === (13))){
var state_20198__$1 = state_20198;
var statearr_20211_21341 = state_20198__$1;
(statearr_20211_21341[(2)] = null);

(statearr_20211_21341[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20199 === (6))){
var inst_20162 = (state_20198[(7)]);
var inst_20184 = (inst_20162 > (0));
var state_20198__$1 = state_20198;
if(cljs.core.truth_(inst_20184)){
var statearr_20212_21342 = state_20198__$1;
(statearr_20212_21342[(1)] = (12));

} else {
var statearr_20214_21343 = state_20198__$1;
(statearr_20214_21343[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20199 === (3))){
var inst_20196 = (state_20198[(2)]);
var state_20198__$1 = state_20198;
return cljs.core.async.impl.ioc_helpers.return_chan(state_20198__$1,inst_20196);
} else {
if((state_val_20199 === (12))){
var inst_20161 = (state_20198[(8)]);
var inst_20186 = cljs.core.vec(inst_20161);
var state_20198__$1 = state_20198;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_20198__$1,(15),out,inst_20186);
} else {
if((state_val_20199 === (2))){
var state_20198__$1 = state_20198;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20198__$1,(4),ch);
} else {
if((state_val_20199 === (11))){
var inst_20178 = (state_20198[(2)]);
var inst_20179 = (new Array(n));
var inst_20161 = inst_20179;
var inst_20162 = (0);
var state_20198__$1 = (function (){var statearr_20216 = state_20198;
(statearr_20216[(7)] = inst_20162);

(statearr_20216[(8)] = inst_20161);

(statearr_20216[(10)] = inst_20178);

return statearr_20216;
})();
var statearr_20217_21351 = state_20198__$1;
(statearr_20217_21351[(2)] = null);

(statearr_20217_21351[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20199 === (9))){
var inst_20161 = (state_20198[(8)]);
var inst_20176 = cljs.core.vec(inst_20161);
var state_20198__$1 = state_20198;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_20198__$1,(11),out,inst_20176);
} else {
if((state_val_20199 === (5))){
var inst_20162 = (state_20198[(7)]);
var inst_20161 = (state_20198[(8)]);
var inst_20165 = (state_20198[(9)]);
var inst_20170 = (state_20198[(11)]);
var inst_20169 = (inst_20161[inst_20162] = inst_20165);
var inst_20170__$1 = (inst_20162 + (1));
var inst_20171 = (inst_20170__$1 < n);
var state_20198__$1 = (function (){var statearr_20218 = state_20198;
(statearr_20218[(12)] = inst_20169);

(statearr_20218[(11)] = inst_20170__$1);

return statearr_20218;
})();
if(cljs.core.truth_(inst_20171)){
var statearr_20219_21353 = state_20198__$1;
(statearr_20219_21353[(1)] = (8));

} else {
var statearr_20220_21354 = state_20198__$1;
(statearr_20220_21354[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20199 === (14))){
var inst_20191 = (state_20198[(2)]);
var inst_20192 = cljs.core.async.close_BANG_(out);
var state_20198__$1 = (function (){var statearr_20222 = state_20198;
(statearr_20222[(13)] = inst_20191);

return statearr_20222;
})();
var statearr_20223_21358 = state_20198__$1;
(statearr_20223_21358[(2)] = inst_20192);

(statearr_20223_21358[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20199 === (10))){
var inst_20182 = (state_20198[(2)]);
var state_20198__$1 = state_20198;
var statearr_20224_21360 = state_20198__$1;
(statearr_20224_21360[(2)] = inst_20182);

(statearr_20224_21360[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20199 === (8))){
var inst_20161 = (state_20198[(8)]);
var inst_20170 = (state_20198[(11)]);
var tmp20221 = inst_20161;
var inst_20161__$1 = tmp20221;
var inst_20162 = inst_20170;
var state_20198__$1 = (function (){var statearr_20225 = state_20198;
(statearr_20225[(7)] = inst_20162);

(statearr_20225[(8)] = inst_20161__$1);

return statearr_20225;
})();
var statearr_20226_21361 = state_20198__$1;
(statearr_20226_21361[(2)] = null);

(statearr_20226_21361[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__17706__auto__ = null;
var cljs$core$async$state_machine__17706__auto____0 = (function (){
var statearr_20227 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_20227[(0)] = cljs$core$async$state_machine__17706__auto__);

(statearr_20227[(1)] = (1));

return statearr_20227;
});
var cljs$core$async$state_machine__17706__auto____1 = (function (state_20198){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_20198);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e20232){var ex__17709__auto__ = e20232;
var statearr_20233_21362 = state_20198;
(statearr_20233_21362[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_20198[(4)]))){
var statearr_20234_21363 = state_20198;
(statearr_20234_21363[(1)] = cljs.core.first((state_20198[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21368 = state_20198;
state_20198 = G__21368;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$state_machine__17706__auto__ = function(state_20198){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__17706__auto____1.call(this,state_20198);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__17706__auto____0;
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__17706__auto____1;
return cljs$core$async$state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_20235 = f__18003__auto__();
(statearr_20235[(6)] = c__18002__auto___21330);

return statearr_20235;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__20238 = arguments.length;
switch (G__20238) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__18002__auto___21376 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18003__auto__ = (function (){var switch__17705__auto__ = (function (state_20296){
var state_val_20297 = (state_20296[(1)]);
if((state_val_20297 === (7))){
var inst_20292 = (state_20296[(2)]);
var state_20296__$1 = state_20296;
var statearr_20304_21379 = state_20296__$1;
(statearr_20304_21379[(2)] = inst_20292);

(statearr_20304_21379[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20297 === (1))){
var inst_20252 = [];
var inst_20253 = inst_20252;
var inst_20254 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_20296__$1 = (function (){var statearr_20305 = state_20296;
(statearr_20305[(7)] = inst_20254);

(statearr_20305[(8)] = inst_20253);

return statearr_20305;
})();
var statearr_20312_21380 = state_20296__$1;
(statearr_20312_21380[(2)] = null);

(statearr_20312_21380[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20297 === (4))){
var inst_20257 = (state_20296[(9)]);
var inst_20257__$1 = (state_20296[(2)]);
var inst_20258 = (inst_20257__$1 == null);
var inst_20259 = cljs.core.not(inst_20258);
var state_20296__$1 = (function (){var statearr_20313 = state_20296;
(statearr_20313[(9)] = inst_20257__$1);

return statearr_20313;
})();
if(inst_20259){
var statearr_20314_21382 = state_20296__$1;
(statearr_20314_21382[(1)] = (5));

} else {
var statearr_20315_21383 = state_20296__$1;
(statearr_20315_21383[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20297 === (15))){
var inst_20253 = (state_20296[(8)]);
var inst_20284 = cljs.core.vec(inst_20253);
var state_20296__$1 = state_20296;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_20296__$1,(18),out,inst_20284);
} else {
if((state_val_20297 === (13))){
var inst_20279 = (state_20296[(2)]);
var state_20296__$1 = state_20296;
var statearr_20316_21384 = state_20296__$1;
(statearr_20316_21384[(2)] = inst_20279);

(statearr_20316_21384[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20297 === (6))){
var inst_20253 = (state_20296[(8)]);
var inst_20281 = inst_20253.length;
var inst_20282 = (inst_20281 > (0));
var state_20296__$1 = state_20296;
if(cljs.core.truth_(inst_20282)){
var statearr_20318_21385 = state_20296__$1;
(statearr_20318_21385[(1)] = (15));

} else {
var statearr_20319_21386 = state_20296__$1;
(statearr_20319_21386[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20297 === (17))){
var inst_20289 = (state_20296[(2)]);
var inst_20290 = cljs.core.async.close_BANG_(out);
var state_20296__$1 = (function (){var statearr_20320 = state_20296;
(statearr_20320[(10)] = inst_20289);

return statearr_20320;
})();
var statearr_20322_21392 = state_20296__$1;
(statearr_20322_21392[(2)] = inst_20290);

(statearr_20322_21392[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20297 === (3))){
var inst_20294 = (state_20296[(2)]);
var state_20296__$1 = state_20296;
return cljs.core.async.impl.ioc_helpers.return_chan(state_20296__$1,inst_20294);
} else {
if((state_val_20297 === (12))){
var inst_20253 = (state_20296[(8)]);
var inst_20272 = cljs.core.vec(inst_20253);
var state_20296__$1 = state_20296;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_20296__$1,(14),out,inst_20272);
} else {
if((state_val_20297 === (2))){
var state_20296__$1 = state_20296;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20296__$1,(4),ch);
} else {
if((state_val_20297 === (11))){
var inst_20261 = (state_20296[(11)]);
var inst_20257 = (state_20296[(9)]);
var inst_20253 = (state_20296[(8)]);
var inst_20269 = inst_20253.push(inst_20257);
var tmp20323 = inst_20253;
var inst_20253__$1 = tmp20323;
var inst_20254 = inst_20261;
var state_20296__$1 = (function (){var statearr_20324 = state_20296;
(statearr_20324[(12)] = inst_20269);

(statearr_20324[(7)] = inst_20254);

(statearr_20324[(8)] = inst_20253__$1);

return statearr_20324;
})();
var statearr_20325_21402 = state_20296__$1;
(statearr_20325_21402[(2)] = null);

(statearr_20325_21402[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20297 === (9))){
var inst_20254 = (state_20296[(7)]);
var inst_20265 = cljs.core.keyword_identical_QMARK_(inst_20254,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_20296__$1 = state_20296;
var statearr_20331_21403 = state_20296__$1;
(statearr_20331_21403[(2)] = inst_20265);

(statearr_20331_21403[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20297 === (5))){
var inst_20262 = (state_20296[(13)]);
var inst_20254 = (state_20296[(7)]);
var inst_20261 = (state_20296[(11)]);
var inst_20257 = (state_20296[(9)]);
var inst_20261__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_20257) : f.call(null,inst_20257));
var inst_20262__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_20261__$1,inst_20254);
var state_20296__$1 = (function (){var statearr_20337 = state_20296;
(statearr_20337[(13)] = inst_20262__$1);

(statearr_20337[(11)] = inst_20261__$1);

return statearr_20337;
})();
if(inst_20262__$1){
var statearr_20338_21410 = state_20296__$1;
(statearr_20338_21410[(1)] = (8));

} else {
var statearr_20339_21411 = state_20296__$1;
(statearr_20339_21411[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20297 === (14))){
var inst_20261 = (state_20296[(11)]);
var inst_20257 = (state_20296[(9)]);
var inst_20274 = (state_20296[(2)]);
var inst_20275 = [];
var inst_20276 = inst_20275.push(inst_20257);
var inst_20253 = inst_20275;
var inst_20254 = inst_20261;
var state_20296__$1 = (function (){var statearr_20340 = state_20296;
(statearr_20340[(14)] = inst_20276);

(statearr_20340[(7)] = inst_20254);

(statearr_20340[(15)] = inst_20274);

(statearr_20340[(8)] = inst_20253);

return statearr_20340;
})();
var statearr_20341_21412 = state_20296__$1;
(statearr_20341_21412[(2)] = null);

(statearr_20341_21412[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20297 === (16))){
var state_20296__$1 = state_20296;
var statearr_20342_21413 = state_20296__$1;
(statearr_20342_21413[(2)] = null);

(statearr_20342_21413[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20297 === (10))){
var inst_20267 = (state_20296[(2)]);
var state_20296__$1 = state_20296;
if(cljs.core.truth_(inst_20267)){
var statearr_20344_21414 = state_20296__$1;
(statearr_20344_21414[(1)] = (11));

} else {
var statearr_20345_21415 = state_20296__$1;
(statearr_20345_21415[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20297 === (18))){
var inst_20286 = (state_20296[(2)]);
var state_20296__$1 = state_20296;
var statearr_20346_21418 = state_20296__$1;
(statearr_20346_21418[(2)] = inst_20286);

(statearr_20346_21418[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20297 === (8))){
var inst_20262 = (state_20296[(13)]);
var state_20296__$1 = state_20296;
var statearr_20348_21419 = state_20296__$1;
(statearr_20348_21419[(2)] = inst_20262);

(statearr_20348_21419[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__17706__auto__ = null;
var cljs$core$async$state_machine__17706__auto____0 = (function (){
var statearr_20349 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_20349[(0)] = cljs$core$async$state_machine__17706__auto__);

(statearr_20349[(1)] = (1));

return statearr_20349;
});
var cljs$core$async$state_machine__17706__auto____1 = (function (state_20296){
while(true){
var ret_value__17707__auto__ = (function (){try{while(true){
var result__17708__auto__ = switch__17705__auto__(state_20296);
if(cljs.core.keyword_identical_QMARK_(result__17708__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__17708__auto__;
}
break;
}
}catch (e20355){var ex__17709__auto__ = e20355;
var statearr_20356_21420 = state_20296;
(statearr_20356_21420[(2)] = ex__17709__auto__);


if(cljs.core.seq((state_20296[(4)]))){
var statearr_20357_21421 = state_20296;
(statearr_20357_21421[(1)] = cljs.core.first((state_20296[(4)])));

} else {
throw ex__17709__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__17707__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21422 = state_20296;
state_20296 = G__21422;
continue;
} else {
return ret_value__17707__auto__;
}
break;
}
});
cljs$core$async$state_machine__17706__auto__ = function(state_20296){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__17706__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__17706__auto____1.call(this,state_20296);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__17706__auto____0;
cljs$core$async$state_machine__17706__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__17706__auto____1;
return cljs$core$async$state_machine__17706__auto__;
})()
})();
var state__18004__auto__ = (function (){var statearr_20358 = f__18003__auto__();
(statearr_20358[(6)] = c__18002__auto___21376);

return statearr_20358;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18004__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
