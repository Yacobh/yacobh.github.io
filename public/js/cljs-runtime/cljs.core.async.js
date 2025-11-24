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
cljs.core.async.t_cljs$core$async18278 = (function (f,blockable,meta18279){
this.f = f;
this.blockable = blockable;
this.meta18279 = meta18279;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async18278.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18280,meta18279__$1){
var self__ = this;
var _18280__$1 = this;
return (new cljs.core.async.t_cljs$core$async18278(self__.f,self__.blockable,meta18279__$1));
}));

(cljs.core.async.t_cljs$core$async18278.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18280){
var self__ = this;
var _18280__$1 = this;
return self__.meta18279;
}));

(cljs.core.async.t_cljs$core$async18278.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18278.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async18278.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async18278.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async18278.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta18279","meta18279",1188872114,null)], null);
}));

(cljs.core.async.t_cljs$core$async18278.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async18278.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18278");

(cljs.core.async.t_cljs$core$async18278.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async18278");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18278.
 */
cljs.core.async.__GT_t_cljs$core$async18278 = (function cljs$core$async$__GT_t_cljs$core$async18278(f,blockable,meta18279){
return (new cljs.core.async.t_cljs$core$async18278(f,blockable,meta18279));
});


cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__18277 = arguments.length;
switch (G__18277) {
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
return (new cljs.core.async.t_cljs$core$async18278(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
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
var G__18283 = arguments.length;
switch (G__18283) {
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
var G__18285 = arguments.length;
switch (G__18285) {
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
var G__18291 = arguments.length;
switch (G__18291) {
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
var val_20539 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_20539) : fn1.call(null,val_20539));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_20539) : fn1.call(null,val_20539));
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
var G__18293 = arguments.length;
switch (G__18293) {
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
var n__5593__auto___20541 = n;
var x_20542 = (0);
while(true){
if((x_20542 < n__5593__auto___20541)){
(a[x_20542] = x_20542);

var G__20543 = (x_20542 + (1));
x_20542 = G__20543;
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
cljs.core.async.t_cljs$core$async18294 = (function (flag,meta18295){
this.flag = flag;
this.meta18295 = meta18295;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async18294.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18296,meta18295__$1){
var self__ = this;
var _18296__$1 = this;
return (new cljs.core.async.t_cljs$core$async18294(self__.flag,meta18295__$1));
}));

(cljs.core.async.t_cljs$core$async18294.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18296){
var self__ = this;
var _18296__$1 = this;
return self__.meta18295;
}));

(cljs.core.async.t_cljs$core$async18294.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18294.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async18294.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async18294.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async18294.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta18295","meta18295",-1127907496,null)], null);
}));

(cljs.core.async.t_cljs$core$async18294.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async18294.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18294");

(cljs.core.async.t_cljs$core$async18294.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async18294");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18294.
 */
cljs.core.async.__GT_t_cljs$core$async18294 = (function cljs$core$async$__GT_t_cljs$core$async18294(flag,meta18295){
return (new cljs.core.async.t_cljs$core$async18294(flag,meta18295));
});


cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
return (new cljs.core.async.t_cljs$core$async18294(flag,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18301 = (function (flag,cb,meta18302){
this.flag = flag;
this.cb = cb;
this.meta18302 = meta18302;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async18301.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18303,meta18302__$1){
var self__ = this;
var _18303__$1 = this;
return (new cljs.core.async.t_cljs$core$async18301(self__.flag,self__.cb,meta18302__$1));
}));

(cljs.core.async.t_cljs$core$async18301.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18303){
var self__ = this;
var _18303__$1 = this;
return self__.meta18302;
}));

(cljs.core.async.t_cljs$core$async18301.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18301.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async18301.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async18301.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async18301.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta18302","meta18302",-1925208140,null)], null);
}));

(cljs.core.async.t_cljs$core$async18301.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async18301.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18301");

(cljs.core.async.t_cljs$core$async18301.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async18301");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18301.
 */
cljs.core.async.__GT_t_cljs$core$async18301 = (function cljs$core$async$__GT_t_cljs$core$async18301(flag,cb,meta18302){
return (new cljs.core.async.t_cljs$core$async18301(flag,cb,meta18302));
});


cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
return (new cljs.core.async.t_cljs$core$async18301(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
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
return (function (p1__18312_SHARP_){
var G__18321 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__18312_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__18321) : fret.call(null,G__18321));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__18313_SHARP_){
var G__18323 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__18313_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__18323) : fret.call(null,G__18323));
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
var G__20544 = (i + (1));
i = G__20544;
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
var len__5726__auto___20545 = arguments.length;
var i__5727__auto___20546 = (0);
while(true){
if((i__5727__auto___20546 < len__5726__auto___20545)){
args__5732__auto__.push((arguments[i__5727__auto___20546]));

var G__20547 = (i__5727__auto___20546 + (1));
i__5727__auto___20546 = G__20547;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__18346){
var map__18347 = p__18346;
var map__18347__$1 = cljs.core.__destructure_map(map__18347);
var opts = map__18347__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq18334){
var G__18335 = cljs.core.first(seq18334);
var seq18334__$1 = cljs.core.next(seq18334);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__18335,seq18334__$1);
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
var G__18349 = arguments.length;
switch (G__18349) {
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
var c__18205__auto___20550 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_18395){
var state_val_18396 = (state_18395[(1)]);
if((state_val_18396 === (7))){
var inst_18386 = (state_18395[(2)]);
var state_18395__$1 = state_18395;
var statearr_18397_20552 = state_18395__$1;
(statearr_18397_20552[(2)] = inst_18386);

(statearr_18397_20552[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18396 === (1))){
var state_18395__$1 = state_18395;
var statearr_18398_20553 = state_18395__$1;
(statearr_18398_20553[(2)] = null);

(statearr_18398_20553[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18396 === (4))){
var inst_18367 = (state_18395[(7)]);
var inst_18367__$1 = (state_18395[(2)]);
var inst_18368 = (inst_18367__$1 == null);
var state_18395__$1 = (function (){var statearr_18399 = state_18395;
(statearr_18399[(7)] = inst_18367__$1);

return statearr_18399;
})();
if(cljs.core.truth_(inst_18368)){
var statearr_18400_20554 = state_18395__$1;
(statearr_18400_20554[(1)] = (5));

} else {
var statearr_18401_20555 = state_18395__$1;
(statearr_18401_20555[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18396 === (13))){
var state_18395__$1 = state_18395;
var statearr_18408_20556 = state_18395__$1;
(statearr_18408_20556[(2)] = null);

(statearr_18408_20556[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18396 === (6))){
var inst_18367 = (state_18395[(7)]);
var state_18395__$1 = state_18395;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18395__$1,(11),to,inst_18367);
} else {
if((state_val_18396 === (3))){
var inst_18388 = (state_18395[(2)]);
var state_18395__$1 = state_18395;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18395__$1,inst_18388);
} else {
if((state_val_18396 === (12))){
var state_18395__$1 = state_18395;
var statearr_18417_20557 = state_18395__$1;
(statearr_18417_20557[(2)] = null);

(statearr_18417_20557[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18396 === (2))){
var state_18395__$1 = state_18395;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18395__$1,(4),from);
} else {
if((state_val_18396 === (11))){
var inst_18379 = (state_18395[(2)]);
var state_18395__$1 = state_18395;
if(cljs.core.truth_(inst_18379)){
var statearr_18425_20558 = state_18395__$1;
(statearr_18425_20558[(1)] = (12));

} else {
var statearr_18426_20559 = state_18395__$1;
(statearr_18426_20559[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18396 === (9))){
var state_18395__$1 = state_18395;
var statearr_18427_20560 = state_18395__$1;
(statearr_18427_20560[(2)] = null);

(statearr_18427_20560[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18396 === (5))){
var state_18395__$1 = state_18395;
if(cljs.core.truth_(close_QMARK_)){
var statearr_18428_20561 = state_18395__$1;
(statearr_18428_20561[(1)] = (8));

} else {
var statearr_18429_20562 = state_18395__$1;
(statearr_18429_20562[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18396 === (14))){
var inst_18384 = (state_18395[(2)]);
var state_18395__$1 = state_18395;
var statearr_18431_20565 = state_18395__$1;
(statearr_18431_20565[(2)] = inst_18384);

(statearr_18431_20565[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18396 === (10))){
var inst_18376 = (state_18395[(2)]);
var state_18395__$1 = state_18395;
var statearr_18433_20566 = state_18395__$1;
(statearr_18433_20566[(2)] = inst_18376);

(statearr_18433_20566[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18396 === (8))){
var inst_18372 = cljs.core.async.close_BANG_(to);
var state_18395__$1 = state_18395;
var statearr_18434_20567 = state_18395__$1;
(statearr_18434_20567[(2)] = inst_18372);

(statearr_18434_20567[(1)] = (10));


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
var cljs$core$async$state_machine__18081__auto__ = null;
var cljs$core$async$state_machine__18081__auto____0 = (function (){
var statearr_18435 = [null,null,null,null,null,null,null,null];
(statearr_18435[(0)] = cljs$core$async$state_machine__18081__auto__);

(statearr_18435[(1)] = (1));

return statearr_18435;
});
var cljs$core$async$state_machine__18081__auto____1 = (function (state_18395){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_18395);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e18436){var ex__18084__auto__ = e18436;
var statearr_18437_20568 = state_18395;
(statearr_18437_20568[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_18395[(4)]))){
var statearr_18438_20569 = state_18395;
(statearr_18438_20569[(1)] = cljs.core.first((state_18395[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20570 = state_18395;
state_18395 = G__20570;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$state_machine__18081__auto__ = function(state_18395){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18081__auto____1.call(this,state_18395);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18081__auto____0;
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18081__auto____1;
return cljs$core$async$state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_18439 = f__18206__auto__();
(statearr_18439[(6)] = c__18205__auto___20550);

return statearr_18439;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
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
var process__$1 = (function (p__18441){
var vec__18442 = p__18441;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18442,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18442,(1),null);
var job = vec__18442;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__18205__auto___20571 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_18449){
var state_val_18450 = (state_18449[(1)]);
if((state_val_18450 === (1))){
var state_18449__$1 = state_18449;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18449__$1,(2),res,v);
} else {
if((state_val_18450 === (2))){
var inst_18446 = (state_18449[(2)]);
var inst_18447 = cljs.core.async.close_BANG_(res);
var state_18449__$1 = (function (){var statearr_18464 = state_18449;
(statearr_18464[(7)] = inst_18446);

return statearr_18464;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_18449__$1,inst_18447);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0 = (function (){
var statearr_18494 = [null,null,null,null,null,null,null,null];
(statearr_18494[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__);

(statearr_18494[(1)] = (1));

return statearr_18494;
});
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1 = (function (state_18449){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_18449);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e18498){var ex__18084__auto__ = e18498;
var statearr_18499_20572 = state_18449;
(statearr_18499_20572[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_18449[(4)]))){
var statearr_18500_20573 = state_18449;
(statearr_18500_20573[(1)] = cljs.core.first((state_18449[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20575 = state_18449;
state_18449 = G__20575;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__ = function(state_18449){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1.call(this,state_18449);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_18501 = f__18206__auto__();
(statearr_18501[(6)] = c__18205__auto___20571);

return statearr_18501;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__18502){
var vec__18505 = p__18502;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18505,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18505,(1),null);
var job = vec__18505;
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
var n__5593__auto___20576 = n;
var __20577 = (0);
while(true){
if((__20577 < n__5593__auto___20576)){
var G__18508_20578 = type;
var G__18508_20579__$1 = (((G__18508_20578 instanceof cljs.core.Keyword))?G__18508_20578.fqn:null);
switch (G__18508_20579__$1) {
case "compute":
var c__18205__auto___20581 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__20577,c__18205__auto___20581,G__18508_20578,G__18508_20579__$1,n__5593__auto___20576,jobs,results,process__$1,async){
return (function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = ((function (__20577,c__18205__auto___20581,G__18508_20578,G__18508_20579__$1,n__5593__auto___20576,jobs,results,process__$1,async){
return (function (state_18523){
var state_val_18524 = (state_18523[(1)]);
if((state_val_18524 === (1))){
var state_18523__$1 = state_18523;
var statearr_18534_20582 = state_18523__$1;
(statearr_18534_20582[(2)] = null);

(statearr_18534_20582[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18524 === (2))){
var state_18523__$1 = state_18523;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18523__$1,(4),jobs);
} else {
if((state_val_18524 === (3))){
var inst_18521 = (state_18523[(2)]);
var state_18523__$1 = state_18523;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18523__$1,inst_18521);
} else {
if((state_val_18524 === (4))){
var inst_18512 = (state_18523[(2)]);
var inst_18513 = process__$1(inst_18512);
var state_18523__$1 = state_18523;
if(cljs.core.truth_(inst_18513)){
var statearr_18550_20583 = state_18523__$1;
(statearr_18550_20583[(1)] = (5));

} else {
var statearr_18551_20584 = state_18523__$1;
(statearr_18551_20584[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18524 === (5))){
var state_18523__$1 = state_18523;
var statearr_18552_20586 = state_18523__$1;
(statearr_18552_20586[(2)] = null);

(statearr_18552_20586[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18524 === (6))){
var state_18523__$1 = state_18523;
var statearr_18553_20587 = state_18523__$1;
(statearr_18553_20587[(2)] = null);

(statearr_18553_20587[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18524 === (7))){
var inst_18519 = (state_18523[(2)]);
var state_18523__$1 = state_18523;
var statearr_18554_20589 = state_18523__$1;
(statearr_18554_20589[(2)] = inst_18519);

(statearr_18554_20589[(1)] = (3));


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
});})(__20577,c__18205__auto___20581,G__18508_20578,G__18508_20579__$1,n__5593__auto___20576,jobs,results,process__$1,async))
;
return ((function (__20577,switch__18080__auto__,c__18205__auto___20581,G__18508_20578,G__18508_20579__$1,n__5593__auto___20576,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0 = (function (){
var statearr_18556 = [null,null,null,null,null,null,null];
(statearr_18556[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__);

(statearr_18556[(1)] = (1));

return statearr_18556;
});
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1 = (function (state_18523){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_18523);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e18557){var ex__18084__auto__ = e18557;
var statearr_18558_20590 = state_18523;
(statearr_18558_20590[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_18523[(4)]))){
var statearr_18559_20591 = state_18523;
(statearr_18559_20591[(1)] = cljs.core.first((state_18523[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20592 = state_18523;
state_18523 = G__20592;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__ = function(state_18523){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1.call(this,state_18523);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__;
})()
;})(__20577,switch__18080__auto__,c__18205__auto___20581,G__18508_20578,G__18508_20579__$1,n__5593__auto___20576,jobs,results,process__$1,async))
})();
var state__18207__auto__ = (function (){var statearr_18560 = f__18206__auto__();
(statearr_18560[(6)] = c__18205__auto___20581);

return statearr_18560;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
});})(__20577,c__18205__auto___20581,G__18508_20578,G__18508_20579__$1,n__5593__auto___20576,jobs,results,process__$1,async))
);


break;
case "async":
var c__18205__auto___20594 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__20577,c__18205__auto___20594,G__18508_20578,G__18508_20579__$1,n__5593__auto___20576,jobs,results,process__$1,async){
return (function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = ((function (__20577,c__18205__auto___20594,G__18508_20578,G__18508_20579__$1,n__5593__auto___20576,jobs,results,process__$1,async){
return (function (state_18573){
var state_val_18574 = (state_18573[(1)]);
if((state_val_18574 === (1))){
var state_18573__$1 = state_18573;
var statearr_18575_20595 = state_18573__$1;
(statearr_18575_20595[(2)] = null);

(statearr_18575_20595[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18574 === (2))){
var state_18573__$1 = state_18573;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18573__$1,(4),jobs);
} else {
if((state_val_18574 === (3))){
var inst_18571 = (state_18573[(2)]);
var state_18573__$1 = state_18573;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18573__$1,inst_18571);
} else {
if((state_val_18574 === (4))){
var inst_18563 = (state_18573[(2)]);
var inst_18564 = async(inst_18563);
var state_18573__$1 = state_18573;
if(cljs.core.truth_(inst_18564)){
var statearr_18576_20597 = state_18573__$1;
(statearr_18576_20597[(1)] = (5));

} else {
var statearr_18577_20598 = state_18573__$1;
(statearr_18577_20598[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18574 === (5))){
var state_18573__$1 = state_18573;
var statearr_18578_20599 = state_18573__$1;
(statearr_18578_20599[(2)] = null);

(statearr_18578_20599[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18574 === (6))){
var state_18573__$1 = state_18573;
var statearr_18579_20600 = state_18573__$1;
(statearr_18579_20600[(2)] = null);

(statearr_18579_20600[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18574 === (7))){
var inst_18569 = (state_18573[(2)]);
var state_18573__$1 = state_18573;
var statearr_18580_20601 = state_18573__$1;
(statearr_18580_20601[(2)] = inst_18569);

(statearr_18580_20601[(1)] = (3));


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
});})(__20577,c__18205__auto___20594,G__18508_20578,G__18508_20579__$1,n__5593__auto___20576,jobs,results,process__$1,async))
;
return ((function (__20577,switch__18080__auto__,c__18205__auto___20594,G__18508_20578,G__18508_20579__$1,n__5593__auto___20576,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0 = (function (){
var statearr_18582 = [null,null,null,null,null,null,null];
(statearr_18582[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__);

(statearr_18582[(1)] = (1));

return statearr_18582;
});
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1 = (function (state_18573){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_18573);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e18585){var ex__18084__auto__ = e18585;
var statearr_18586_20604 = state_18573;
(statearr_18586_20604[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_18573[(4)]))){
var statearr_18587_20605 = state_18573;
(statearr_18587_20605[(1)] = cljs.core.first((state_18573[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20615 = state_18573;
state_18573 = G__20615;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__ = function(state_18573){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1.call(this,state_18573);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__;
})()
;})(__20577,switch__18080__auto__,c__18205__auto___20594,G__18508_20578,G__18508_20579__$1,n__5593__auto___20576,jobs,results,process__$1,async))
})();
var state__18207__auto__ = (function (){var statearr_18589 = f__18206__auto__();
(statearr_18589[(6)] = c__18205__auto___20594);

return statearr_18589;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
});})(__20577,c__18205__auto___20594,G__18508_20578,G__18508_20579__$1,n__5593__auto___20576,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18508_20579__$1)].join('')));

}

var G__20616 = (__20577 + (1));
__20577 = G__20616;
continue;
} else {
}
break;
}

var c__18205__auto___20617 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_18612){
var state_val_18613 = (state_18612[(1)]);
if((state_val_18613 === (7))){
var inst_18608 = (state_18612[(2)]);
var state_18612__$1 = state_18612;
var statearr_18614_20618 = state_18612__$1;
(statearr_18614_20618[(2)] = inst_18608);

(statearr_18614_20618[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18613 === (1))){
var state_18612__$1 = state_18612;
var statearr_18615_20619 = state_18612__$1;
(statearr_18615_20619[(2)] = null);

(statearr_18615_20619[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18613 === (4))){
var inst_18592 = (state_18612[(7)]);
var inst_18592__$1 = (state_18612[(2)]);
var inst_18593 = (inst_18592__$1 == null);
var state_18612__$1 = (function (){var statearr_18616 = state_18612;
(statearr_18616[(7)] = inst_18592__$1);

return statearr_18616;
})();
if(cljs.core.truth_(inst_18593)){
var statearr_18618_20620 = state_18612__$1;
(statearr_18618_20620[(1)] = (5));

} else {
var statearr_18619_20621 = state_18612__$1;
(statearr_18619_20621[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18613 === (6))){
var inst_18592 = (state_18612[(7)]);
var inst_18597 = (state_18612[(8)]);
var inst_18597__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_18599 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_18600 = [inst_18592,inst_18597__$1];
var inst_18601 = (new cljs.core.PersistentVector(null,2,(5),inst_18599,inst_18600,null));
var state_18612__$1 = (function (){var statearr_18621 = state_18612;
(statearr_18621[(8)] = inst_18597__$1);

return statearr_18621;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18612__$1,(8),jobs,inst_18601);
} else {
if((state_val_18613 === (3))){
var inst_18610 = (state_18612[(2)]);
var state_18612__$1 = state_18612;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18612__$1,inst_18610);
} else {
if((state_val_18613 === (2))){
var state_18612__$1 = state_18612;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18612__$1,(4),from);
} else {
if((state_val_18613 === (9))){
var inst_18605 = (state_18612[(2)]);
var state_18612__$1 = (function (){var statearr_18622 = state_18612;
(statearr_18622[(9)] = inst_18605);

return statearr_18622;
})();
var statearr_18623_20624 = state_18612__$1;
(statearr_18623_20624[(2)] = null);

(statearr_18623_20624[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18613 === (5))){
var inst_18595 = cljs.core.async.close_BANG_(jobs);
var state_18612__$1 = state_18612;
var statearr_18625_20625 = state_18612__$1;
(statearr_18625_20625[(2)] = inst_18595);

(statearr_18625_20625[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18613 === (8))){
var inst_18597 = (state_18612[(8)]);
var inst_18603 = (state_18612[(2)]);
var state_18612__$1 = (function (){var statearr_18626 = state_18612;
(statearr_18626[(10)] = inst_18603);

return statearr_18626;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18612__$1,(9),results,inst_18597);
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
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0 = (function (){
var statearr_18627 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_18627[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__);

(statearr_18627[(1)] = (1));

return statearr_18627;
});
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1 = (function (state_18612){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_18612);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e18628){var ex__18084__auto__ = e18628;
var statearr_18629_20628 = state_18612;
(statearr_18629_20628[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_18612[(4)]))){
var statearr_18630_20629 = state_18612;
(statearr_18630_20629[(1)] = cljs.core.first((state_18612[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20630 = state_18612;
state_18612 = G__20630;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__ = function(state_18612){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1.call(this,state_18612);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_18638 = f__18206__auto__();
(statearr_18638[(6)] = c__18205__auto___20617);

return statearr_18638;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));


var c__18205__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_18681){
var state_val_18682 = (state_18681[(1)]);
if((state_val_18682 === (7))){
var inst_18677 = (state_18681[(2)]);
var state_18681__$1 = state_18681;
var statearr_18699_20632 = state_18681__$1;
(statearr_18699_20632[(2)] = inst_18677);

(statearr_18699_20632[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (20))){
var state_18681__$1 = state_18681;
var statearr_18700_20634 = state_18681__$1;
(statearr_18700_20634[(2)] = null);

(statearr_18700_20634[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (1))){
var state_18681__$1 = state_18681;
var statearr_18701_20635 = state_18681__$1;
(statearr_18701_20635[(2)] = null);

(statearr_18701_20635[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (4))){
var inst_18646 = (state_18681[(7)]);
var inst_18646__$1 = (state_18681[(2)]);
var inst_18647 = (inst_18646__$1 == null);
var state_18681__$1 = (function (){var statearr_18702 = state_18681;
(statearr_18702[(7)] = inst_18646__$1);

return statearr_18702;
})();
if(cljs.core.truth_(inst_18647)){
var statearr_18703_20637 = state_18681__$1;
(statearr_18703_20637[(1)] = (5));

} else {
var statearr_18704_20638 = state_18681__$1;
(statearr_18704_20638[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (15))){
var inst_18659 = (state_18681[(8)]);
var state_18681__$1 = state_18681;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18681__$1,(18),to,inst_18659);
} else {
if((state_val_18682 === (21))){
var inst_18672 = (state_18681[(2)]);
var state_18681__$1 = state_18681;
var statearr_18715_20639 = state_18681__$1;
(statearr_18715_20639[(2)] = inst_18672);

(statearr_18715_20639[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (13))){
var inst_18674 = (state_18681[(2)]);
var state_18681__$1 = (function (){var statearr_18723 = state_18681;
(statearr_18723[(9)] = inst_18674);

return statearr_18723;
})();
var statearr_18725_20640 = state_18681__$1;
(statearr_18725_20640[(2)] = null);

(statearr_18725_20640[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (6))){
var inst_18646 = (state_18681[(7)]);
var state_18681__$1 = state_18681;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18681__$1,(11),inst_18646);
} else {
if((state_val_18682 === (17))){
var inst_18667 = (state_18681[(2)]);
var state_18681__$1 = state_18681;
if(cljs.core.truth_(inst_18667)){
var statearr_18726_20641 = state_18681__$1;
(statearr_18726_20641[(1)] = (19));

} else {
var statearr_18727_20642 = state_18681__$1;
(statearr_18727_20642[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (3))){
var inst_18679 = (state_18681[(2)]);
var state_18681__$1 = state_18681;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18681__$1,inst_18679);
} else {
if((state_val_18682 === (12))){
var inst_18656 = (state_18681[(10)]);
var state_18681__$1 = state_18681;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18681__$1,(14),inst_18656);
} else {
if((state_val_18682 === (2))){
var state_18681__$1 = state_18681;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18681__$1,(4),results);
} else {
if((state_val_18682 === (19))){
var state_18681__$1 = state_18681;
var statearr_18732_20643 = state_18681__$1;
(statearr_18732_20643[(2)] = null);

(statearr_18732_20643[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (11))){
var inst_18656 = (state_18681[(2)]);
var state_18681__$1 = (function (){var statearr_18733 = state_18681;
(statearr_18733[(10)] = inst_18656);

return statearr_18733;
})();
var statearr_18734_20644 = state_18681__$1;
(statearr_18734_20644[(2)] = null);

(statearr_18734_20644[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (9))){
var state_18681__$1 = state_18681;
var statearr_18735_20645 = state_18681__$1;
(statearr_18735_20645[(2)] = null);

(statearr_18735_20645[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (5))){
var state_18681__$1 = state_18681;
if(cljs.core.truth_(close_QMARK_)){
var statearr_18736_20646 = state_18681__$1;
(statearr_18736_20646[(1)] = (8));

} else {
var statearr_18743_20647 = state_18681__$1;
(statearr_18743_20647[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (14))){
var inst_18661 = (state_18681[(11)]);
var inst_18659 = (state_18681[(8)]);
var inst_18659__$1 = (state_18681[(2)]);
var inst_18660 = (inst_18659__$1 == null);
var inst_18661__$1 = cljs.core.not(inst_18660);
var state_18681__$1 = (function (){var statearr_18760 = state_18681;
(statearr_18760[(11)] = inst_18661__$1);

(statearr_18760[(8)] = inst_18659__$1);

return statearr_18760;
})();
if(inst_18661__$1){
var statearr_18761_20648 = state_18681__$1;
(statearr_18761_20648[(1)] = (15));

} else {
var statearr_18762_20651 = state_18681__$1;
(statearr_18762_20651[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (16))){
var inst_18661 = (state_18681[(11)]);
var state_18681__$1 = state_18681;
var statearr_18774_20652 = state_18681__$1;
(statearr_18774_20652[(2)] = inst_18661);

(statearr_18774_20652[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (10))){
var inst_18653 = (state_18681[(2)]);
var state_18681__$1 = state_18681;
var statearr_18780_20653 = state_18681__$1;
(statearr_18780_20653[(2)] = inst_18653);

(statearr_18780_20653[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (18))){
var inst_18664 = (state_18681[(2)]);
var state_18681__$1 = state_18681;
var statearr_18787_20657 = state_18681__$1;
(statearr_18787_20657[(2)] = inst_18664);

(statearr_18787_20657[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18682 === (8))){
var inst_18650 = cljs.core.async.close_BANG_(to);
var state_18681__$1 = state_18681;
var statearr_18788_20658 = state_18681__$1;
(statearr_18788_20658[(2)] = inst_18650);

(statearr_18788_20658[(1)] = (10));


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
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0 = (function (){
var statearr_18789 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18789[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__);

(statearr_18789[(1)] = (1));

return statearr_18789;
});
var cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1 = (function (state_18681){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_18681);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e18790){var ex__18084__auto__ = e18790;
var statearr_18791_20659 = state_18681;
(statearr_18791_20659[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_18681[(4)]))){
var statearr_18792_20660 = state_18681;
(statearr_18792_20660[(1)] = cljs.core.first((state_18681[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20661 = state_18681;
state_18681 = G__20661;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__ = function(state_18681){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1.call(this,state_18681);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__18081__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_18796 = f__18206__auto__();
(statearr_18796[(6)] = c__18205__auto__);

return statearr_18796;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));

return c__18205__auto__;
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
var G__18798 = arguments.length;
switch (G__18798) {
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
var G__18813 = arguments.length;
switch (G__18813) {
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
var G__18816 = arguments.length;
switch (G__18816) {
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
var c__18205__auto___20671 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_18844){
var state_val_18845 = (state_18844[(1)]);
if((state_val_18845 === (7))){
var inst_18840 = (state_18844[(2)]);
var state_18844__$1 = state_18844;
var statearr_18846_20672 = state_18844__$1;
(statearr_18846_20672[(2)] = inst_18840);

(statearr_18846_20672[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18845 === (1))){
var state_18844__$1 = state_18844;
var statearr_18847_20673 = state_18844__$1;
(statearr_18847_20673[(2)] = null);

(statearr_18847_20673[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18845 === (4))){
var inst_18819 = (state_18844[(7)]);
var inst_18819__$1 = (state_18844[(2)]);
var inst_18821 = (inst_18819__$1 == null);
var state_18844__$1 = (function (){var statearr_18848 = state_18844;
(statearr_18848[(7)] = inst_18819__$1);

return statearr_18848;
})();
if(cljs.core.truth_(inst_18821)){
var statearr_18849_20674 = state_18844__$1;
(statearr_18849_20674[(1)] = (5));

} else {
var statearr_18850_20675 = state_18844__$1;
(statearr_18850_20675[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18845 === (13))){
var state_18844__$1 = state_18844;
var statearr_18851_20676 = state_18844__$1;
(statearr_18851_20676[(2)] = null);

(statearr_18851_20676[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18845 === (6))){
var inst_18819 = (state_18844[(7)]);
var inst_18826 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_18819) : p.call(null,inst_18819));
var state_18844__$1 = state_18844;
if(cljs.core.truth_(inst_18826)){
var statearr_18852_20677 = state_18844__$1;
(statearr_18852_20677[(1)] = (9));

} else {
var statearr_18853_20685 = state_18844__$1;
(statearr_18853_20685[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18845 === (3))){
var inst_18842 = (state_18844[(2)]);
var state_18844__$1 = state_18844;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18844__$1,inst_18842);
} else {
if((state_val_18845 === (12))){
var state_18844__$1 = state_18844;
var statearr_18854_20686 = state_18844__$1;
(statearr_18854_20686[(2)] = null);

(statearr_18854_20686[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18845 === (2))){
var state_18844__$1 = state_18844;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18844__$1,(4),ch);
} else {
if((state_val_18845 === (11))){
var inst_18819 = (state_18844[(7)]);
var inst_18830 = (state_18844[(2)]);
var state_18844__$1 = state_18844;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18844__$1,(8),inst_18830,inst_18819);
} else {
if((state_val_18845 === (9))){
var state_18844__$1 = state_18844;
var statearr_18856_20687 = state_18844__$1;
(statearr_18856_20687[(2)] = tc);

(statearr_18856_20687[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18845 === (5))){
var inst_18823 = cljs.core.async.close_BANG_(tc);
var inst_18824 = cljs.core.async.close_BANG_(fc);
var state_18844__$1 = (function (){var statearr_18857 = state_18844;
(statearr_18857[(8)] = inst_18823);

return statearr_18857;
})();
var statearr_18858_20689 = state_18844__$1;
(statearr_18858_20689[(2)] = inst_18824);

(statearr_18858_20689[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18845 === (14))){
var inst_18838 = (state_18844[(2)]);
var state_18844__$1 = state_18844;
var statearr_18860_20690 = state_18844__$1;
(statearr_18860_20690[(2)] = inst_18838);

(statearr_18860_20690[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18845 === (10))){
var state_18844__$1 = state_18844;
var statearr_18861_20691 = state_18844__$1;
(statearr_18861_20691[(2)] = fc);

(statearr_18861_20691[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18845 === (8))){
var inst_18833 = (state_18844[(2)]);
var state_18844__$1 = state_18844;
if(cljs.core.truth_(inst_18833)){
var statearr_18862_20696 = state_18844__$1;
(statearr_18862_20696[(1)] = (12));

} else {
var statearr_18863_20697 = state_18844__$1;
(statearr_18863_20697[(1)] = (13));

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
var cljs$core$async$state_machine__18081__auto__ = null;
var cljs$core$async$state_machine__18081__auto____0 = (function (){
var statearr_18864 = [null,null,null,null,null,null,null,null,null];
(statearr_18864[(0)] = cljs$core$async$state_machine__18081__auto__);

(statearr_18864[(1)] = (1));

return statearr_18864;
});
var cljs$core$async$state_machine__18081__auto____1 = (function (state_18844){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_18844);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e18865){var ex__18084__auto__ = e18865;
var statearr_18867_20707 = state_18844;
(statearr_18867_20707[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_18844[(4)]))){
var statearr_18868_20708 = state_18844;
(statearr_18868_20708[(1)] = cljs.core.first((state_18844[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20709 = state_18844;
state_18844 = G__20709;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$state_machine__18081__auto__ = function(state_18844){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18081__auto____1.call(this,state_18844);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18081__auto____0;
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18081__auto____1;
return cljs$core$async$state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_18869 = f__18206__auto__();
(statearr_18869[(6)] = c__18205__auto___20671);

return statearr_18869;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
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
var c__18205__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_18892){
var state_val_18893 = (state_18892[(1)]);
if((state_val_18893 === (7))){
var inst_18888 = (state_18892[(2)]);
var state_18892__$1 = state_18892;
var statearr_18894_20712 = state_18892__$1;
(statearr_18894_20712[(2)] = inst_18888);

(statearr_18894_20712[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18893 === (1))){
var inst_18870 = init;
var inst_18871 = inst_18870;
var state_18892__$1 = (function (){var statearr_18895 = state_18892;
(statearr_18895[(7)] = inst_18871);

return statearr_18895;
})();
var statearr_18896_20715 = state_18892__$1;
(statearr_18896_20715[(2)] = null);

(statearr_18896_20715[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18893 === (4))){
var inst_18875 = (state_18892[(8)]);
var inst_18875__$1 = (state_18892[(2)]);
var inst_18876 = (inst_18875__$1 == null);
var state_18892__$1 = (function (){var statearr_18898 = state_18892;
(statearr_18898[(8)] = inst_18875__$1);

return statearr_18898;
})();
if(cljs.core.truth_(inst_18876)){
var statearr_18899_20716 = state_18892__$1;
(statearr_18899_20716[(1)] = (5));

} else {
var statearr_18900_20717 = state_18892__$1;
(statearr_18900_20717[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18893 === (6))){
var inst_18875 = (state_18892[(8)]);
var inst_18871 = (state_18892[(7)]);
var inst_18879 = (state_18892[(9)]);
var inst_18879__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_18871,inst_18875) : f.call(null,inst_18871,inst_18875));
var inst_18880 = cljs.core.reduced_QMARK_(inst_18879__$1);
var state_18892__$1 = (function (){var statearr_18901 = state_18892;
(statearr_18901[(9)] = inst_18879__$1);

return statearr_18901;
})();
if(inst_18880){
var statearr_18902_20725 = state_18892__$1;
(statearr_18902_20725[(1)] = (8));

} else {
var statearr_18903_20726 = state_18892__$1;
(statearr_18903_20726[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18893 === (3))){
var inst_18890 = (state_18892[(2)]);
var state_18892__$1 = state_18892;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18892__$1,inst_18890);
} else {
if((state_val_18893 === (2))){
var state_18892__$1 = state_18892;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18892__$1,(4),ch);
} else {
if((state_val_18893 === (9))){
var inst_18879 = (state_18892[(9)]);
var inst_18871 = inst_18879;
var state_18892__$1 = (function (){var statearr_18905 = state_18892;
(statearr_18905[(7)] = inst_18871);

return statearr_18905;
})();
var statearr_18906_20727 = state_18892__$1;
(statearr_18906_20727[(2)] = null);

(statearr_18906_20727[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18893 === (5))){
var inst_18871 = (state_18892[(7)]);
var state_18892__$1 = state_18892;
var statearr_18907_20731 = state_18892__$1;
(statearr_18907_20731[(2)] = inst_18871);

(statearr_18907_20731[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18893 === (10))){
var inst_18886 = (state_18892[(2)]);
var state_18892__$1 = state_18892;
var statearr_18908_20733 = state_18892__$1;
(statearr_18908_20733[(2)] = inst_18886);

(statearr_18908_20733[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18893 === (8))){
var inst_18879 = (state_18892[(9)]);
var inst_18882 = cljs.core.deref(inst_18879);
var state_18892__$1 = state_18892;
var statearr_18909_20734 = state_18892__$1;
(statearr_18909_20734[(2)] = inst_18882);

(statearr_18909_20734[(1)] = (10));


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
var cljs$core$async$reduce_$_state_machine__18081__auto__ = null;
var cljs$core$async$reduce_$_state_machine__18081__auto____0 = (function (){
var statearr_18910 = [null,null,null,null,null,null,null,null,null,null];
(statearr_18910[(0)] = cljs$core$async$reduce_$_state_machine__18081__auto__);

(statearr_18910[(1)] = (1));

return statearr_18910;
});
var cljs$core$async$reduce_$_state_machine__18081__auto____1 = (function (state_18892){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_18892);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e18911){var ex__18084__auto__ = e18911;
var statearr_18912_20735 = state_18892;
(statearr_18912_20735[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_18892[(4)]))){
var statearr_18913_20736 = state_18892;
(statearr_18913_20736[(1)] = cljs.core.first((state_18892[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20737 = state_18892;
state_18892 = G__20737;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__18081__auto__ = function(state_18892){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__18081__auto____1.call(this,state_18892);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__18081__auto____0;
cljs$core$async$reduce_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__18081__auto____1;
return cljs$core$async$reduce_$_state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_18915 = f__18206__auto__();
(statearr_18915[(6)] = c__18205__auto__);

return statearr_18915;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));

return c__18205__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__18205__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_18921){
var state_val_18922 = (state_18921[(1)]);
if((state_val_18922 === (1))){
var inst_18916 = cljs.core.async.reduce(f__$1,init,ch);
var state_18921__$1 = state_18921;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18921__$1,(2),inst_18916);
} else {
if((state_val_18922 === (2))){
var inst_18918 = (state_18921[(2)]);
var inst_18919 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_18918) : f__$1.call(null,inst_18918));
var state_18921__$1 = state_18921;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18921__$1,inst_18919);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__18081__auto__ = null;
var cljs$core$async$transduce_$_state_machine__18081__auto____0 = (function (){
var statearr_18924 = [null,null,null,null,null,null,null];
(statearr_18924[(0)] = cljs$core$async$transduce_$_state_machine__18081__auto__);

(statearr_18924[(1)] = (1));

return statearr_18924;
});
var cljs$core$async$transduce_$_state_machine__18081__auto____1 = (function (state_18921){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_18921);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e18925){var ex__18084__auto__ = e18925;
var statearr_18926_20746 = state_18921;
(statearr_18926_20746[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_18921[(4)]))){
var statearr_18927_20747 = state_18921;
(statearr_18927_20747[(1)] = cljs.core.first((state_18921[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20750 = state_18921;
state_18921 = G__20750;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__18081__auto__ = function(state_18921){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__18081__auto____1.call(this,state_18921);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__18081__auto____0;
cljs$core$async$transduce_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__18081__auto____1;
return cljs$core$async$transduce_$_state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_18928 = f__18206__auto__();
(statearr_18928[(6)] = c__18205__auto__);

return statearr_18928;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));

return c__18205__auto__;
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
var G__18930 = arguments.length;
switch (G__18930) {
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
var c__18205__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_18956){
var state_val_18957 = (state_18956[(1)]);
if((state_val_18957 === (7))){
var inst_18938 = (state_18956[(2)]);
var state_18956__$1 = state_18956;
var statearr_18958_20752 = state_18956__$1;
(statearr_18958_20752[(2)] = inst_18938);

(statearr_18958_20752[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18957 === (1))){
var inst_18932 = cljs.core.seq(coll);
var inst_18933 = inst_18932;
var state_18956__$1 = (function (){var statearr_18959 = state_18956;
(statearr_18959[(7)] = inst_18933);

return statearr_18959;
})();
var statearr_18961_20754 = state_18956__$1;
(statearr_18961_20754[(2)] = null);

(statearr_18961_20754[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18957 === (4))){
var inst_18933 = (state_18956[(7)]);
var inst_18936 = cljs.core.first(inst_18933);
var state_18956__$1 = state_18956;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18956__$1,(7),ch,inst_18936);
} else {
if((state_val_18957 === (13))){
var inst_18950 = (state_18956[(2)]);
var state_18956__$1 = state_18956;
var statearr_18962_20755 = state_18956__$1;
(statearr_18962_20755[(2)] = inst_18950);

(statearr_18962_20755[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18957 === (6))){
var inst_18941 = (state_18956[(2)]);
var state_18956__$1 = state_18956;
if(cljs.core.truth_(inst_18941)){
var statearr_18963_20759 = state_18956__$1;
(statearr_18963_20759[(1)] = (8));

} else {
var statearr_18964_20760 = state_18956__$1;
(statearr_18964_20760[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18957 === (3))){
var inst_18954 = (state_18956[(2)]);
var state_18956__$1 = state_18956;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18956__$1,inst_18954);
} else {
if((state_val_18957 === (12))){
var state_18956__$1 = state_18956;
var statearr_18965_20761 = state_18956__$1;
(statearr_18965_20761[(2)] = null);

(statearr_18965_20761[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18957 === (2))){
var inst_18933 = (state_18956[(7)]);
var state_18956__$1 = state_18956;
if(cljs.core.truth_(inst_18933)){
var statearr_18966_20764 = state_18956__$1;
(statearr_18966_20764[(1)] = (4));

} else {
var statearr_18967_20767 = state_18956__$1;
(statearr_18967_20767[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18957 === (11))){
var inst_18947 = cljs.core.async.close_BANG_(ch);
var state_18956__$1 = state_18956;
var statearr_18969_20768 = state_18956__$1;
(statearr_18969_20768[(2)] = inst_18947);

(statearr_18969_20768[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18957 === (9))){
var state_18956__$1 = state_18956;
if(cljs.core.truth_(close_QMARK_)){
var statearr_18970_20769 = state_18956__$1;
(statearr_18970_20769[(1)] = (11));

} else {
var statearr_18971_20770 = state_18956__$1;
(statearr_18971_20770[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18957 === (5))){
var inst_18933 = (state_18956[(7)]);
var state_18956__$1 = state_18956;
var statearr_18972_20771 = state_18956__$1;
(statearr_18972_20771[(2)] = inst_18933);

(statearr_18972_20771[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18957 === (10))){
var inst_18952 = (state_18956[(2)]);
var state_18956__$1 = state_18956;
var statearr_18973_20772 = state_18956__$1;
(statearr_18973_20772[(2)] = inst_18952);

(statearr_18973_20772[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18957 === (8))){
var inst_18933 = (state_18956[(7)]);
var inst_18943 = cljs.core.next(inst_18933);
var inst_18933__$1 = inst_18943;
var state_18956__$1 = (function (){var statearr_18974 = state_18956;
(statearr_18974[(7)] = inst_18933__$1);

return statearr_18974;
})();
var statearr_18975_20773 = state_18956__$1;
(statearr_18975_20773[(2)] = null);

(statearr_18975_20773[(1)] = (2));


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
var cljs$core$async$state_machine__18081__auto__ = null;
var cljs$core$async$state_machine__18081__auto____0 = (function (){
var statearr_18977 = [null,null,null,null,null,null,null,null];
(statearr_18977[(0)] = cljs$core$async$state_machine__18081__auto__);

(statearr_18977[(1)] = (1));

return statearr_18977;
});
var cljs$core$async$state_machine__18081__auto____1 = (function (state_18956){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_18956);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e18978){var ex__18084__auto__ = e18978;
var statearr_18979_20774 = state_18956;
(statearr_18979_20774[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_18956[(4)]))){
var statearr_18980_20775 = state_18956;
(statearr_18980_20775[(1)] = cljs.core.first((state_18956[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20776 = state_18956;
state_18956 = G__20776;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$state_machine__18081__auto__ = function(state_18956){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18081__auto____1.call(this,state_18956);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18081__auto____0;
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18081__auto____1;
return cljs$core$async$state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_18981 = f__18206__auto__();
(statearr_18981[(6)] = c__18205__auto__);

return statearr_18981;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));

return c__18205__auto__;
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
var G__18984 = arguments.length;
switch (G__18984) {
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

var cljs$core$async$Mux$muxch_STAR_$dyn_20779 = (function (_){
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
return cljs$core$async$Mux$muxch_STAR_$dyn_20779(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_20787 = (function (m,ch,close_QMARK_){
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
return cljs$core$async$Mult$tap_STAR_$dyn_20787(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_20788 = (function (m,ch){
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
return cljs$core$async$Mult$untap_STAR_$dyn_20788(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_20790 = (function (m){
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
return cljs$core$async$Mult$untap_all_STAR_$dyn_20790(m);
}
});


/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18990 = (function (ch,cs,meta18991){
this.ch = ch;
this.cs = cs;
this.meta18991 = meta18991;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async18990.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18992,meta18991__$1){
var self__ = this;
var _18992__$1 = this;
return (new cljs.core.async.t_cljs$core$async18990(self__.ch,self__.cs,meta18991__$1));
}));

(cljs.core.async.t_cljs$core$async18990.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18992){
var self__ = this;
var _18992__$1 = this;
return self__.meta18991;
}));

(cljs.core.async.t_cljs$core$async18990.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18990.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async18990.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async18990.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async18990.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async18990.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async18990.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta18991","meta18991",1448442831,null)], null);
}));

(cljs.core.async.t_cljs$core$async18990.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async18990.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18990");

(cljs.core.async.t_cljs$core$async18990.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async18990");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18990.
 */
cljs.core.async.__GT_t_cljs$core$async18990 = (function cljs$core$async$__GT_t_cljs$core$async18990(ch,cs,meta18991){
return (new cljs.core.async.t_cljs$core$async18990(ch,cs,meta18991));
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
var m = (new cljs.core.async.t_cljs$core$async18990(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__18205__auto___20799 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_19129){
var state_val_19130 = (state_19129[(1)]);
if((state_val_19130 === (7))){
var inst_19124 = (state_19129[(2)]);
var state_19129__$1 = state_19129;
var statearr_19131_20800 = state_19129__$1;
(statearr_19131_20800[(2)] = inst_19124);

(statearr_19131_20800[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (20))){
var inst_19028 = (state_19129[(7)]);
var inst_19041 = cljs.core.first(inst_19028);
var inst_19042 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_19041,(0),null);
var inst_19043 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_19041,(1),null);
var state_19129__$1 = (function (){var statearr_19132 = state_19129;
(statearr_19132[(8)] = inst_19042);

return statearr_19132;
})();
if(cljs.core.truth_(inst_19043)){
var statearr_19133_20801 = state_19129__$1;
(statearr_19133_20801[(1)] = (22));

} else {
var statearr_19134_20802 = state_19129__$1;
(statearr_19134_20802[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (27))){
var inst_19071 = (state_19129[(9)]);
var inst_18997 = (state_19129[(10)]);
var inst_19073 = (state_19129[(11)]);
var inst_19078 = (state_19129[(12)]);
var inst_19078__$1 = cljs.core._nth(inst_19071,inst_19073);
var inst_19079 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_19078__$1,inst_18997,done);
var state_19129__$1 = (function (){var statearr_19136 = state_19129;
(statearr_19136[(12)] = inst_19078__$1);

return statearr_19136;
})();
if(cljs.core.truth_(inst_19079)){
var statearr_19137_20804 = state_19129__$1;
(statearr_19137_20804[(1)] = (30));

} else {
var statearr_19138_20805 = state_19129__$1;
(statearr_19138_20805[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (1))){
var state_19129__$1 = state_19129;
var statearr_19139_20806 = state_19129__$1;
(statearr_19139_20806[(2)] = null);

(statearr_19139_20806[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (24))){
var inst_19028 = (state_19129[(7)]);
var inst_19048 = (state_19129[(2)]);
var inst_19049 = cljs.core.next(inst_19028);
var inst_19006 = inst_19049;
var inst_19007 = null;
var inst_19008 = (0);
var inst_19009 = (0);
var state_19129__$1 = (function (){var statearr_19140 = state_19129;
(statearr_19140[(13)] = inst_19007);

(statearr_19140[(14)] = inst_19008);

(statearr_19140[(15)] = inst_19009);

(statearr_19140[(16)] = inst_19048);

(statearr_19140[(17)] = inst_19006);

return statearr_19140;
})();
var statearr_19141_20808 = state_19129__$1;
(statearr_19141_20808[(2)] = null);

(statearr_19141_20808[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (39))){
var state_19129__$1 = state_19129;
var statearr_19146_20813 = state_19129__$1;
(statearr_19146_20813[(2)] = null);

(statearr_19146_20813[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (4))){
var inst_18997 = (state_19129[(10)]);
var inst_18997__$1 = (state_19129[(2)]);
var inst_18998 = (inst_18997__$1 == null);
var state_19129__$1 = (function (){var statearr_19147 = state_19129;
(statearr_19147[(10)] = inst_18997__$1);

return statearr_19147;
})();
if(cljs.core.truth_(inst_18998)){
var statearr_19148_20817 = state_19129__$1;
(statearr_19148_20817[(1)] = (5));

} else {
var statearr_19149_20818 = state_19129__$1;
(statearr_19149_20818[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (15))){
var inst_19007 = (state_19129[(13)]);
var inst_19008 = (state_19129[(14)]);
var inst_19009 = (state_19129[(15)]);
var inst_19006 = (state_19129[(17)]);
var inst_19024 = (state_19129[(2)]);
var inst_19025 = (inst_19009 + (1));
var tmp19142 = inst_19007;
var tmp19143 = inst_19008;
var tmp19144 = inst_19006;
var inst_19006__$1 = tmp19144;
var inst_19007__$1 = tmp19142;
var inst_19008__$1 = tmp19143;
var inst_19009__$1 = inst_19025;
var state_19129__$1 = (function (){var statearr_19150 = state_19129;
(statearr_19150[(13)] = inst_19007__$1);

(statearr_19150[(14)] = inst_19008__$1);

(statearr_19150[(15)] = inst_19009__$1);

(statearr_19150[(17)] = inst_19006__$1);

(statearr_19150[(18)] = inst_19024);

return statearr_19150;
})();
var statearr_19151_20819 = state_19129__$1;
(statearr_19151_20819[(2)] = null);

(statearr_19151_20819[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (21))){
var inst_19052 = (state_19129[(2)]);
var state_19129__$1 = state_19129;
var statearr_19155_20820 = state_19129__$1;
(statearr_19155_20820[(2)] = inst_19052);

(statearr_19155_20820[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (31))){
var inst_19078 = (state_19129[(12)]);
var inst_19082 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_19078);
var state_19129__$1 = state_19129;
var statearr_19156_20821 = state_19129__$1;
(statearr_19156_20821[(2)] = inst_19082);

(statearr_19156_20821[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (32))){
var inst_19071 = (state_19129[(9)]);
var inst_19073 = (state_19129[(11)]);
var inst_19072 = (state_19129[(19)]);
var inst_19070 = (state_19129[(20)]);
var inst_19084 = (state_19129[(2)]);
var inst_19085 = (inst_19073 + (1));
var tmp19152 = inst_19071;
var tmp19153 = inst_19072;
var tmp19154 = inst_19070;
var inst_19070__$1 = tmp19154;
var inst_19071__$1 = tmp19152;
var inst_19072__$1 = tmp19153;
var inst_19073__$1 = inst_19085;
var state_19129__$1 = (function (){var statearr_19158 = state_19129;
(statearr_19158[(9)] = inst_19071__$1);

(statearr_19158[(21)] = inst_19084);

(statearr_19158[(11)] = inst_19073__$1);

(statearr_19158[(19)] = inst_19072__$1);

(statearr_19158[(20)] = inst_19070__$1);

return statearr_19158;
})();
var statearr_19159_20822 = state_19129__$1;
(statearr_19159_20822[(2)] = null);

(statearr_19159_20822[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (40))){
var inst_19097 = (state_19129[(22)]);
var inst_19101 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_19097);
var state_19129__$1 = state_19129;
var statearr_19160_20823 = state_19129__$1;
(statearr_19160_20823[(2)] = inst_19101);

(statearr_19160_20823[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (33))){
var inst_19088 = (state_19129[(23)]);
var inst_19090 = cljs.core.chunked_seq_QMARK_(inst_19088);
var state_19129__$1 = state_19129;
if(inst_19090){
var statearr_19161_20824 = state_19129__$1;
(statearr_19161_20824[(1)] = (36));

} else {
var statearr_19162_20825 = state_19129__$1;
(statearr_19162_20825[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (13))){
var inst_19018 = (state_19129[(24)]);
var inst_19021 = cljs.core.async.close_BANG_(inst_19018);
var state_19129__$1 = state_19129;
var statearr_19163_20829 = state_19129__$1;
(statearr_19163_20829[(2)] = inst_19021);

(statearr_19163_20829[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (22))){
var inst_19042 = (state_19129[(8)]);
var inst_19045 = cljs.core.async.close_BANG_(inst_19042);
var state_19129__$1 = state_19129;
var statearr_19164_20830 = state_19129__$1;
(statearr_19164_20830[(2)] = inst_19045);

(statearr_19164_20830[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (36))){
var inst_19088 = (state_19129[(23)]);
var inst_19092 = cljs.core.chunk_first(inst_19088);
var inst_19093 = cljs.core.chunk_rest(inst_19088);
var inst_19094 = cljs.core.count(inst_19092);
var inst_19070 = inst_19093;
var inst_19071 = inst_19092;
var inst_19072 = inst_19094;
var inst_19073 = (0);
var state_19129__$1 = (function (){var statearr_19166 = state_19129;
(statearr_19166[(9)] = inst_19071);

(statearr_19166[(11)] = inst_19073);

(statearr_19166[(19)] = inst_19072);

(statearr_19166[(20)] = inst_19070);

return statearr_19166;
})();
var statearr_19167_20835 = state_19129__$1;
(statearr_19167_20835[(2)] = null);

(statearr_19167_20835[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (41))){
var inst_19088 = (state_19129[(23)]);
var inst_19103 = (state_19129[(2)]);
var inst_19104 = cljs.core.next(inst_19088);
var inst_19070 = inst_19104;
var inst_19071 = null;
var inst_19072 = (0);
var inst_19073 = (0);
var state_19129__$1 = (function (){var statearr_19168 = state_19129;
(statearr_19168[(25)] = inst_19103);

(statearr_19168[(9)] = inst_19071);

(statearr_19168[(11)] = inst_19073);

(statearr_19168[(19)] = inst_19072);

(statearr_19168[(20)] = inst_19070);

return statearr_19168;
})();
var statearr_19169_20836 = state_19129__$1;
(statearr_19169_20836[(2)] = null);

(statearr_19169_20836[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (43))){
var state_19129__$1 = state_19129;
var statearr_19170_20837 = state_19129__$1;
(statearr_19170_20837[(2)] = null);

(statearr_19170_20837[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (29))){
var inst_19112 = (state_19129[(2)]);
var state_19129__$1 = state_19129;
var statearr_19172_20838 = state_19129__$1;
(statearr_19172_20838[(2)] = inst_19112);

(statearr_19172_20838[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (44))){
var inst_19121 = (state_19129[(2)]);
var state_19129__$1 = (function (){var statearr_19173 = state_19129;
(statearr_19173[(26)] = inst_19121);

return statearr_19173;
})();
var statearr_19174_20843 = state_19129__$1;
(statearr_19174_20843[(2)] = null);

(statearr_19174_20843[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (6))){
var inst_19062 = (state_19129[(27)]);
var inst_19061 = cljs.core.deref(cs);
var inst_19062__$1 = cljs.core.keys(inst_19061);
var inst_19063 = cljs.core.count(inst_19062__$1);
var inst_19064 = cljs.core.reset_BANG_(dctr,inst_19063);
var inst_19069 = cljs.core.seq(inst_19062__$1);
var inst_19070 = inst_19069;
var inst_19071 = null;
var inst_19072 = (0);
var inst_19073 = (0);
var state_19129__$1 = (function (){var statearr_19175 = state_19129;
(statearr_19175[(9)] = inst_19071);

(statearr_19175[(11)] = inst_19073);

(statearr_19175[(27)] = inst_19062__$1);

(statearr_19175[(19)] = inst_19072);

(statearr_19175[(20)] = inst_19070);

(statearr_19175[(28)] = inst_19064);

return statearr_19175;
})();
var statearr_19176_20844 = state_19129__$1;
(statearr_19176_20844[(2)] = null);

(statearr_19176_20844[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (28))){
var inst_19070 = (state_19129[(20)]);
var inst_19088 = (state_19129[(23)]);
var inst_19088__$1 = cljs.core.seq(inst_19070);
var state_19129__$1 = (function (){var statearr_19178 = state_19129;
(statearr_19178[(23)] = inst_19088__$1);

return statearr_19178;
})();
if(inst_19088__$1){
var statearr_19179_20845 = state_19129__$1;
(statearr_19179_20845[(1)] = (33));

} else {
var statearr_19180_20846 = state_19129__$1;
(statearr_19180_20846[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (25))){
var inst_19073 = (state_19129[(11)]);
var inst_19072 = (state_19129[(19)]);
var inst_19075 = (inst_19073 < inst_19072);
var inst_19076 = inst_19075;
var state_19129__$1 = state_19129;
if(cljs.core.truth_(inst_19076)){
var statearr_19181_20847 = state_19129__$1;
(statearr_19181_20847[(1)] = (27));

} else {
var statearr_19182_20848 = state_19129__$1;
(statearr_19182_20848[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (34))){
var state_19129__$1 = state_19129;
var statearr_19183_20855 = state_19129__$1;
(statearr_19183_20855[(2)] = null);

(statearr_19183_20855[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (17))){
var state_19129__$1 = state_19129;
var statearr_19184_20856 = state_19129__$1;
(statearr_19184_20856[(2)] = null);

(statearr_19184_20856[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (3))){
var inst_19126 = (state_19129[(2)]);
var state_19129__$1 = state_19129;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19129__$1,inst_19126);
} else {
if((state_val_19130 === (12))){
var inst_19057 = (state_19129[(2)]);
var state_19129__$1 = state_19129;
var statearr_19186_20857 = state_19129__$1;
(statearr_19186_20857[(2)] = inst_19057);

(statearr_19186_20857[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (2))){
var state_19129__$1 = state_19129;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19129__$1,(4),ch);
} else {
if((state_val_19130 === (23))){
var state_19129__$1 = state_19129;
var statearr_19187_20861 = state_19129__$1;
(statearr_19187_20861[(2)] = null);

(statearr_19187_20861[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (35))){
var inst_19110 = (state_19129[(2)]);
var state_19129__$1 = state_19129;
var statearr_19188_20865 = state_19129__$1;
(statearr_19188_20865[(2)] = inst_19110);

(statearr_19188_20865[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (19))){
var inst_19028 = (state_19129[(7)]);
var inst_19032 = cljs.core.chunk_first(inst_19028);
var inst_19033 = cljs.core.chunk_rest(inst_19028);
var inst_19035 = cljs.core.count(inst_19032);
var inst_19006 = inst_19033;
var inst_19007 = inst_19032;
var inst_19008 = inst_19035;
var inst_19009 = (0);
var state_19129__$1 = (function (){var statearr_19191 = state_19129;
(statearr_19191[(13)] = inst_19007);

(statearr_19191[(14)] = inst_19008);

(statearr_19191[(15)] = inst_19009);

(statearr_19191[(17)] = inst_19006);

return statearr_19191;
})();
var statearr_19192_20867 = state_19129__$1;
(statearr_19192_20867[(2)] = null);

(statearr_19192_20867[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (11))){
var inst_19028 = (state_19129[(7)]);
var inst_19006 = (state_19129[(17)]);
var inst_19028__$1 = cljs.core.seq(inst_19006);
var state_19129__$1 = (function (){var statearr_19193 = state_19129;
(statearr_19193[(7)] = inst_19028__$1);

return statearr_19193;
})();
if(inst_19028__$1){
var statearr_19194_20871 = state_19129__$1;
(statearr_19194_20871[(1)] = (16));

} else {
var statearr_19195_20872 = state_19129__$1;
(statearr_19195_20872[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (9))){
var inst_19059 = (state_19129[(2)]);
var state_19129__$1 = state_19129;
var statearr_19196_20873 = state_19129__$1;
(statearr_19196_20873[(2)] = inst_19059);

(statearr_19196_20873[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (5))){
var inst_19004 = cljs.core.deref(cs);
var inst_19005 = cljs.core.seq(inst_19004);
var inst_19006 = inst_19005;
var inst_19007 = null;
var inst_19008 = (0);
var inst_19009 = (0);
var state_19129__$1 = (function (){var statearr_19197 = state_19129;
(statearr_19197[(13)] = inst_19007);

(statearr_19197[(14)] = inst_19008);

(statearr_19197[(15)] = inst_19009);

(statearr_19197[(17)] = inst_19006);

return statearr_19197;
})();
var statearr_19198_20874 = state_19129__$1;
(statearr_19198_20874[(2)] = null);

(statearr_19198_20874[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (14))){
var state_19129__$1 = state_19129;
var statearr_19199_20875 = state_19129__$1;
(statearr_19199_20875[(2)] = null);

(statearr_19199_20875[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (45))){
var inst_19118 = (state_19129[(2)]);
var state_19129__$1 = state_19129;
var statearr_19200_20876 = state_19129__$1;
(statearr_19200_20876[(2)] = inst_19118);

(statearr_19200_20876[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (26))){
var inst_19062 = (state_19129[(27)]);
var inst_19114 = (state_19129[(2)]);
var inst_19115 = cljs.core.seq(inst_19062);
var state_19129__$1 = (function (){var statearr_19203 = state_19129;
(statearr_19203[(29)] = inst_19114);

return statearr_19203;
})();
if(inst_19115){
var statearr_19204_20877 = state_19129__$1;
(statearr_19204_20877[(1)] = (42));

} else {
var statearr_19205_20878 = state_19129__$1;
(statearr_19205_20878[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (16))){
var inst_19028 = (state_19129[(7)]);
var inst_19030 = cljs.core.chunked_seq_QMARK_(inst_19028);
var state_19129__$1 = state_19129;
if(inst_19030){
var statearr_19206_20880 = state_19129__$1;
(statearr_19206_20880[(1)] = (19));

} else {
var statearr_19207_20881 = state_19129__$1;
(statearr_19207_20881[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (38))){
var inst_19107 = (state_19129[(2)]);
var state_19129__$1 = state_19129;
var statearr_19208_20891 = state_19129__$1;
(statearr_19208_20891[(2)] = inst_19107);

(statearr_19208_20891[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (30))){
var state_19129__$1 = state_19129;
var statearr_19209_20892 = state_19129__$1;
(statearr_19209_20892[(2)] = null);

(statearr_19209_20892[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (10))){
var inst_19007 = (state_19129[(13)]);
var inst_19009 = (state_19129[(15)]);
var inst_19017 = cljs.core._nth(inst_19007,inst_19009);
var inst_19018 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_19017,(0),null);
var inst_19019 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_19017,(1),null);
var state_19129__$1 = (function (){var statearr_19210 = state_19129;
(statearr_19210[(24)] = inst_19018);

return statearr_19210;
})();
if(cljs.core.truth_(inst_19019)){
var statearr_19211_20893 = state_19129__$1;
(statearr_19211_20893[(1)] = (13));

} else {
var statearr_19212_20894 = state_19129__$1;
(statearr_19212_20894[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (18))){
var inst_19055 = (state_19129[(2)]);
var state_19129__$1 = state_19129;
var statearr_19213_20895 = state_19129__$1;
(statearr_19213_20895[(2)] = inst_19055);

(statearr_19213_20895[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (42))){
var state_19129__$1 = state_19129;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19129__$1,(45),dchan);
} else {
if((state_val_19130 === (37))){
var inst_19097 = (state_19129[(22)]);
var inst_18997 = (state_19129[(10)]);
var inst_19088 = (state_19129[(23)]);
var inst_19097__$1 = cljs.core.first(inst_19088);
var inst_19098 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_19097__$1,inst_18997,done);
var state_19129__$1 = (function (){var statearr_19214 = state_19129;
(statearr_19214[(22)] = inst_19097__$1);

return statearr_19214;
})();
if(cljs.core.truth_(inst_19098)){
var statearr_19215_20902 = state_19129__$1;
(statearr_19215_20902[(1)] = (39));

} else {
var statearr_19216_20903 = state_19129__$1;
(statearr_19216_20903[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19130 === (8))){
var inst_19008 = (state_19129[(14)]);
var inst_19009 = (state_19129[(15)]);
var inst_19011 = (inst_19009 < inst_19008);
var inst_19012 = inst_19011;
var state_19129__$1 = state_19129;
if(cljs.core.truth_(inst_19012)){
var statearr_19217_20904 = state_19129__$1;
(statearr_19217_20904[(1)] = (10));

} else {
var statearr_19218_20905 = state_19129__$1;
(statearr_19218_20905[(1)] = (11));

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
var cljs$core$async$mult_$_state_machine__18081__auto__ = null;
var cljs$core$async$mult_$_state_machine__18081__auto____0 = (function (){
var statearr_19221 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19221[(0)] = cljs$core$async$mult_$_state_machine__18081__auto__);

(statearr_19221[(1)] = (1));

return statearr_19221;
});
var cljs$core$async$mult_$_state_machine__18081__auto____1 = (function (state_19129){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_19129);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e19222){var ex__18084__auto__ = e19222;
var statearr_19223_20907 = state_19129;
(statearr_19223_20907[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_19129[(4)]))){
var statearr_19224_20908 = state_19129;
(statearr_19224_20908[(1)] = cljs.core.first((state_19129[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20909 = state_19129;
state_19129 = G__20909;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__18081__auto__ = function(state_19129){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__18081__auto____1.call(this,state_19129);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__18081__auto____0;
cljs$core$async$mult_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__18081__auto____1;
return cljs$core$async$mult_$_state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_19225 = f__18206__auto__();
(statearr_19225[(6)] = c__18205__auto___20799);

return statearr_19225;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
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
var G__19227 = arguments.length;
switch (G__19227) {
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

var cljs$core$async$Mix$admix_STAR_$dyn_20912 = (function (m,ch){
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
return cljs$core$async$Mix$admix_STAR_$dyn_20912(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_20913 = (function (m,ch){
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
return cljs$core$async$Mix$unmix_STAR_$dyn_20913(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_20916 = (function (m){
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
return cljs$core$async$Mix$unmix_all_STAR_$dyn_20916(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_20922 = (function (m,state_map){
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
return cljs$core$async$Mix$toggle_STAR_$dyn_20922(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_20928 = (function (m,mode){
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
return cljs$core$async$Mix$solo_mode_STAR_$dyn_20928(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___20930 = arguments.length;
var i__5727__auto___20931 = (0);
while(true){
if((i__5727__auto___20931 < len__5726__auto___20930)){
args__5732__auto__.push((arguments[i__5727__auto___20931]));

var G__20932 = (i__5727__auto___20931 + (1));
i__5727__auto___20931 = G__20932;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((3) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5733__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__19286){
var map__19287 = p__19286;
var map__19287__$1 = cljs.core.__destructure_map(map__19287);
var opts = map__19287__$1;
var statearr_19290_20933 = state;
(statearr_19290_20933[(1)] = cont_block);


var temp__5804__auto__ = cljs.core.async.do_alts((function (val){
var statearr_19298_20934 = state;
(statearr_19298_20934[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5804__auto__)){
var cb = temp__5804__auto__;
var statearr_19301_20935 = state;
(statearr_19301_20935[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq19277){
var G__19279 = cljs.core.first(seq19277);
var seq19277__$1 = cljs.core.next(seq19277);
var G__19280 = cljs.core.first(seq19277__$1);
var seq19277__$2 = cljs.core.next(seq19277__$1);
var G__19281 = cljs.core.first(seq19277__$2);
var seq19277__$3 = cljs.core.next(seq19277__$2);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__19279,G__19280,G__19281,seq19277__$3);
}));


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async19321 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta19322){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta19322 = meta19322;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async19321.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_19323,meta19322__$1){
var self__ = this;
var _19323__$1 = this;
return (new cljs.core.async.t_cljs$core$async19321(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta19322__$1));
}));

(cljs.core.async.t_cljs$core$async19321.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_19323){
var self__ = this;
var _19323__$1 = this;
return self__.meta19322;
}));

(cljs.core.async.t_cljs$core$async19321.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19321.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async19321.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19321.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async19321.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async19321.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async19321.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async19321.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async19321.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta19322","meta19322",1695475591,null)], null);
}));

(cljs.core.async.t_cljs$core$async19321.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async19321.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19321");

(cljs.core.async.t_cljs$core$async19321.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async19321");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19321.
 */
cljs.core.async.__GT_t_cljs$core$async19321 = (function cljs$core$async$__GT_t_cljs$core$async19321(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta19322){
return (new cljs.core.async.t_cljs$core$async19321(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta19322));
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
var m = (new cljs.core.async.t_cljs$core$async19321(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
var c__18205__auto___20946 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_19437){
var state_val_19438 = (state_19437[(1)]);
if((state_val_19438 === (7))){
var inst_19391 = (state_19437[(2)]);
var state_19437__$1 = state_19437;
if(cljs.core.truth_(inst_19391)){
var statearr_19441_20947 = state_19437__$1;
(statearr_19441_20947[(1)] = (8));

} else {
var statearr_19444_20948 = state_19437__$1;
(statearr_19444_20948[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (20))){
var inst_19383 = (state_19437[(7)]);
var state_19437__$1 = state_19437;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_19437__$1,(23),out,inst_19383);
} else {
if((state_val_19438 === (1))){
var inst_19357 = calc_state();
var inst_19358 = cljs.core.__destructure_map(inst_19357);
var inst_19360 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19358,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_19361 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19358,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_19362 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19358,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_19363 = inst_19357;
var state_19437__$1 = (function (){var statearr_19459 = state_19437;
(statearr_19459[(8)] = inst_19361);

(statearr_19459[(9)] = inst_19363);

(statearr_19459[(10)] = inst_19362);

(statearr_19459[(11)] = inst_19360);

return statearr_19459;
})();
var statearr_19460_20957 = state_19437__$1;
(statearr_19460_20957[(2)] = null);

(statearr_19460_20957[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (24))){
var inst_19368 = (state_19437[(12)]);
var inst_19363 = inst_19368;
var state_19437__$1 = (function (){var statearr_19461 = state_19437;
(statearr_19461[(9)] = inst_19363);

return statearr_19461;
})();
var statearr_19462_20959 = state_19437__$1;
(statearr_19462_20959[(2)] = null);

(statearr_19462_20959[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (4))){
var inst_19383 = (state_19437[(7)]);
var inst_19385 = (state_19437[(13)]);
var inst_19381 = (state_19437[(2)]);
var inst_19383__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_19381,(0),null);
var inst_19384 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_19381,(1),null);
var inst_19385__$1 = (inst_19383__$1 == null);
var state_19437__$1 = (function (){var statearr_19466 = state_19437;
(statearr_19466[(7)] = inst_19383__$1);

(statearr_19466[(13)] = inst_19385__$1);

(statearr_19466[(14)] = inst_19384);

return statearr_19466;
})();
if(cljs.core.truth_(inst_19385__$1)){
var statearr_19468_20960 = state_19437__$1;
(statearr_19468_20960[(1)] = (5));

} else {
var statearr_19470_20961 = state_19437__$1;
(statearr_19470_20961[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (15))){
var inst_19408 = (state_19437[(15)]);
var inst_19369 = (state_19437[(16)]);
var inst_19408__$1 = cljs.core.empty_QMARK_(inst_19369);
var state_19437__$1 = (function (){var statearr_19474 = state_19437;
(statearr_19474[(15)] = inst_19408__$1);

return statearr_19474;
})();
if(inst_19408__$1){
var statearr_19475_20962 = state_19437__$1;
(statearr_19475_20962[(1)] = (17));

} else {
var statearr_19480_20963 = state_19437__$1;
(statearr_19480_20963[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (21))){
var inst_19368 = (state_19437[(12)]);
var inst_19363 = inst_19368;
var state_19437__$1 = (function (){var statearr_19482 = state_19437;
(statearr_19482[(9)] = inst_19363);

return statearr_19482;
})();
var statearr_19483_20964 = state_19437__$1;
(statearr_19483_20964[(2)] = null);

(statearr_19483_20964[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (13))){
var inst_19400 = (state_19437[(2)]);
var inst_19401 = calc_state();
var inst_19363 = inst_19401;
var state_19437__$1 = (function (){var statearr_19484 = state_19437;
(statearr_19484[(17)] = inst_19400);

(statearr_19484[(9)] = inst_19363);

return statearr_19484;
})();
var statearr_19488_20966 = state_19437__$1;
(statearr_19488_20966[(2)] = null);

(statearr_19488_20966[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (22))){
var inst_19431 = (state_19437[(2)]);
var state_19437__$1 = state_19437;
var statearr_19489_20971 = state_19437__$1;
(statearr_19489_20971[(2)] = inst_19431);

(statearr_19489_20971[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (6))){
var inst_19384 = (state_19437[(14)]);
var inst_19389 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_19384,change);
var state_19437__$1 = state_19437;
var statearr_19493_20972 = state_19437__$1;
(statearr_19493_20972[(2)] = inst_19389);

(statearr_19493_20972[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (25))){
var state_19437__$1 = state_19437;
var statearr_19494_20977 = state_19437__$1;
(statearr_19494_20977[(2)] = null);

(statearr_19494_20977[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (17))){
var inst_19370 = (state_19437[(18)]);
var inst_19384 = (state_19437[(14)]);
var inst_19410 = (inst_19370.cljs$core$IFn$_invoke$arity$1 ? inst_19370.cljs$core$IFn$_invoke$arity$1(inst_19384) : inst_19370.call(null,inst_19384));
var inst_19411 = cljs.core.not(inst_19410);
var state_19437__$1 = state_19437;
var statearr_19495_20984 = state_19437__$1;
(statearr_19495_20984[(2)] = inst_19411);

(statearr_19495_20984[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (3))){
var inst_19435 = (state_19437[(2)]);
var state_19437__$1 = state_19437;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19437__$1,inst_19435);
} else {
if((state_val_19438 === (12))){
var state_19437__$1 = state_19437;
var statearr_19498_20985 = state_19437__$1;
(statearr_19498_20985[(2)] = null);

(statearr_19498_20985[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (2))){
var inst_19363 = (state_19437[(9)]);
var inst_19368 = (state_19437[(12)]);
var inst_19368__$1 = cljs.core.__destructure_map(inst_19363);
var inst_19369 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19368__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_19370 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19368__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_19376 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19368__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_19437__$1 = (function (){var statearr_19502 = state_19437;
(statearr_19502[(18)] = inst_19370);

(statearr_19502[(12)] = inst_19368__$1);

(statearr_19502[(16)] = inst_19369);

return statearr_19502;
})();
return cljs.core.async.ioc_alts_BANG_(state_19437__$1,(4),inst_19376);
} else {
if((state_val_19438 === (23))){
var inst_19421 = (state_19437[(2)]);
var state_19437__$1 = state_19437;
if(cljs.core.truth_(inst_19421)){
var statearr_19504_20986 = state_19437__$1;
(statearr_19504_20986[(1)] = (24));

} else {
var statearr_19506_20987 = state_19437__$1;
(statearr_19506_20987[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (19))){
var inst_19414 = (state_19437[(2)]);
var state_19437__$1 = state_19437;
var statearr_19509_20988 = state_19437__$1;
(statearr_19509_20988[(2)] = inst_19414);

(statearr_19509_20988[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (11))){
var inst_19384 = (state_19437[(14)]);
var inst_19397 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_19384);
var state_19437__$1 = state_19437;
var statearr_19511_20989 = state_19437__$1;
(statearr_19511_20989[(2)] = inst_19397);

(statearr_19511_20989[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (9))){
var inst_19384 = (state_19437[(14)]);
var inst_19369 = (state_19437[(16)]);
var inst_19405 = (state_19437[(19)]);
var inst_19405__$1 = (inst_19369.cljs$core$IFn$_invoke$arity$1 ? inst_19369.cljs$core$IFn$_invoke$arity$1(inst_19384) : inst_19369.call(null,inst_19384));
var state_19437__$1 = (function (){var statearr_19516 = state_19437;
(statearr_19516[(19)] = inst_19405__$1);

return statearr_19516;
})();
if(cljs.core.truth_(inst_19405__$1)){
var statearr_19520_20990 = state_19437__$1;
(statearr_19520_20990[(1)] = (14));

} else {
var statearr_19521_20991 = state_19437__$1;
(statearr_19521_20991[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (5))){
var inst_19385 = (state_19437[(13)]);
var state_19437__$1 = state_19437;
var statearr_19523_20992 = state_19437__$1;
(statearr_19523_20992[(2)] = inst_19385);

(statearr_19523_20992[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (14))){
var inst_19405 = (state_19437[(19)]);
var state_19437__$1 = state_19437;
var statearr_19526_20993 = state_19437__$1;
(statearr_19526_20993[(2)] = inst_19405);

(statearr_19526_20993[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (26))){
var inst_19427 = (state_19437[(2)]);
var state_19437__$1 = state_19437;
var statearr_19529_20994 = state_19437__$1;
(statearr_19529_20994[(2)] = inst_19427);

(statearr_19529_20994[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (16))){
var inst_19416 = (state_19437[(2)]);
var state_19437__$1 = state_19437;
if(cljs.core.truth_(inst_19416)){
var statearr_19530_20995 = state_19437__$1;
(statearr_19530_20995[(1)] = (20));

} else {
var statearr_19531_20996 = state_19437__$1;
(statearr_19531_20996[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (10))){
var inst_19433 = (state_19437[(2)]);
var state_19437__$1 = state_19437;
var statearr_19532_20997 = state_19437__$1;
(statearr_19532_20997[(2)] = inst_19433);

(statearr_19532_20997[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (18))){
var inst_19408 = (state_19437[(15)]);
var state_19437__$1 = state_19437;
var statearr_19537_20998 = state_19437__$1;
(statearr_19537_20998[(2)] = inst_19408);

(statearr_19537_20998[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19438 === (8))){
var inst_19383 = (state_19437[(7)]);
var inst_19395 = (inst_19383 == null);
var state_19437__$1 = state_19437;
if(cljs.core.truth_(inst_19395)){
var statearr_19538_20999 = state_19437__$1;
(statearr_19538_20999[(1)] = (11));

} else {
var statearr_19543_21000 = state_19437__$1;
(statearr_19543_21000[(1)] = (12));

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
var cljs$core$async$mix_$_state_machine__18081__auto__ = null;
var cljs$core$async$mix_$_state_machine__18081__auto____0 = (function (){
var statearr_19552 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19552[(0)] = cljs$core$async$mix_$_state_machine__18081__auto__);

(statearr_19552[(1)] = (1));

return statearr_19552;
});
var cljs$core$async$mix_$_state_machine__18081__auto____1 = (function (state_19437){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_19437);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e19554){var ex__18084__auto__ = e19554;
var statearr_19555_21004 = state_19437;
(statearr_19555_21004[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_19437[(4)]))){
var statearr_19556_21005 = state_19437;
(statearr_19556_21005[(1)] = cljs.core.first((state_19437[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21006 = state_19437;
state_19437 = G__21006;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__18081__auto__ = function(state_19437){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__18081__auto____1.call(this,state_19437);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__18081__auto____0;
cljs$core$async$mix_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__18081__auto____1;
return cljs$core$async$mix_$_state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_19560 = f__18206__auto__();
(statearr_19560[(6)] = c__18205__auto___20946);

return statearr_19560;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
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

var cljs$core$async$Pub$sub_STAR_$dyn_21007 = (function (p,v,ch,close_QMARK_){
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
return cljs$core$async$Pub$sub_STAR_$dyn_21007(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_21009 = (function (p,v,ch){
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
return cljs$core$async$Pub$unsub_STAR_$dyn_21009(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_21013 = (function() {
var G__21014 = null;
var G__21014__1 = (function (p){
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
var G__21014__2 = (function (p,v){
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
G__21014 = function(p,v){
switch(arguments.length){
case 1:
return G__21014__1.call(this,p);
case 2:
return G__21014__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__21014.cljs$core$IFn$_invoke$arity$1 = G__21014__1;
G__21014.cljs$core$IFn$_invoke$arity$2 = G__21014__2;
return G__21014;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__19593 = arguments.length;
switch (G__19593) {
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
return cljs$core$async$Pub$unsub_all_STAR_$dyn_21013(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_21013(p,v);
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
cljs.core.async.t_cljs$core$async19613 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta19614){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta19614 = meta19614;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async19613.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_19615,meta19614__$1){
var self__ = this;
var _19615__$1 = this;
return (new cljs.core.async.t_cljs$core$async19613(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta19614__$1));
}));

(cljs.core.async.t_cljs$core$async19613.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_19615){
var self__ = this;
var _19615__$1 = this;
return self__.meta19614;
}));

(cljs.core.async.t_cljs$core$async19613.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19613.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async19613.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async19613.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async19613.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
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

(cljs.core.async.t_cljs$core$async19613.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async19613.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async19613.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta19614","meta19614",391996691,null)], null);
}));

(cljs.core.async.t_cljs$core$async19613.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async19613.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19613");

(cljs.core.async.t_cljs$core$async19613.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async19613");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19613.
 */
cljs.core.async.__GT_t_cljs$core$async19613 = (function cljs$core$async$__GT_t_cljs$core$async19613(ch,topic_fn,buf_fn,mults,ensure_mult,meta19614){
return (new cljs.core.async.t_cljs$core$async19613(ch,topic_fn,buf_fn,mults,ensure_mult,meta19614));
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
var G__19608 = arguments.length;
switch (G__19608) {
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
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__19606_SHARP_){
if(cljs.core.truth_((p1__19606_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__19606_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__19606_SHARP_.call(null,topic)))){
return p1__19606_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__19606_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (new cljs.core.async.t_cljs$core$async19613(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
var c__18205__auto___21018 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_19704){
var state_val_19705 = (state_19704[(1)]);
if((state_val_19705 === (7))){
var inst_19700 = (state_19704[(2)]);
var state_19704__$1 = state_19704;
var statearr_19714_21019 = state_19704__$1;
(statearr_19714_21019[(2)] = inst_19700);

(statearr_19714_21019[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (20))){
var state_19704__$1 = state_19704;
var statearr_19715_21020 = state_19704__$1;
(statearr_19715_21020[(2)] = null);

(statearr_19715_21020[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (1))){
var state_19704__$1 = state_19704;
var statearr_19716_21021 = state_19704__$1;
(statearr_19716_21021[(2)] = null);

(statearr_19716_21021[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (24))){
var inst_19683 = (state_19704[(7)]);
var inst_19692 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_19683);
var state_19704__$1 = state_19704;
var statearr_19717_21022 = state_19704__$1;
(statearr_19717_21022[(2)] = inst_19692);

(statearr_19717_21022[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (4))){
var inst_19631 = (state_19704[(8)]);
var inst_19631__$1 = (state_19704[(2)]);
var inst_19632 = (inst_19631__$1 == null);
var state_19704__$1 = (function (){var statearr_19722 = state_19704;
(statearr_19722[(8)] = inst_19631__$1);

return statearr_19722;
})();
if(cljs.core.truth_(inst_19632)){
var statearr_19723_21023 = state_19704__$1;
(statearr_19723_21023[(1)] = (5));

} else {
var statearr_19724_21024 = state_19704__$1;
(statearr_19724_21024[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (15))){
var inst_19677 = (state_19704[(2)]);
var state_19704__$1 = state_19704;
var statearr_19726_21026 = state_19704__$1;
(statearr_19726_21026[(2)] = inst_19677);

(statearr_19726_21026[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (21))){
var inst_19697 = (state_19704[(2)]);
var state_19704__$1 = (function (){var statearr_19727 = state_19704;
(statearr_19727[(9)] = inst_19697);

return statearr_19727;
})();
var statearr_19728_21027 = state_19704__$1;
(statearr_19728_21027[(2)] = null);

(statearr_19728_21027[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (13))){
var inst_19658 = (state_19704[(10)]);
var inst_19660 = cljs.core.chunked_seq_QMARK_(inst_19658);
var state_19704__$1 = state_19704;
if(inst_19660){
var statearr_19729_21028 = state_19704__$1;
(statearr_19729_21028[(1)] = (16));

} else {
var statearr_19730_21030 = state_19704__$1;
(statearr_19730_21030[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (22))){
var inst_19689 = (state_19704[(2)]);
var state_19704__$1 = state_19704;
if(cljs.core.truth_(inst_19689)){
var statearr_19731_21031 = state_19704__$1;
(statearr_19731_21031[(1)] = (23));

} else {
var statearr_19732_21032 = state_19704__$1;
(statearr_19732_21032[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (6))){
var inst_19631 = (state_19704[(8)]);
var inst_19685 = (state_19704[(11)]);
var inst_19683 = (state_19704[(7)]);
var inst_19683__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_19631) : topic_fn.call(null,inst_19631));
var inst_19684 = cljs.core.deref(mults);
var inst_19685__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_19684,inst_19683__$1);
var state_19704__$1 = (function (){var statearr_19733 = state_19704;
(statearr_19733[(11)] = inst_19685__$1);

(statearr_19733[(7)] = inst_19683__$1);

return statearr_19733;
})();
if(cljs.core.truth_(inst_19685__$1)){
var statearr_19734_21033 = state_19704__$1;
(statearr_19734_21033[(1)] = (19));

} else {
var statearr_19735_21034 = state_19704__$1;
(statearr_19735_21034[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (25))){
var inst_19694 = (state_19704[(2)]);
var state_19704__$1 = state_19704;
var statearr_19737_21035 = state_19704__$1;
(statearr_19737_21035[(2)] = inst_19694);

(statearr_19737_21035[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (17))){
var inst_19658 = (state_19704[(10)]);
var inst_19668 = cljs.core.first(inst_19658);
var inst_19669 = cljs.core.async.muxch_STAR_(inst_19668);
var inst_19670 = cljs.core.async.close_BANG_(inst_19669);
var inst_19671 = cljs.core.next(inst_19658);
var inst_19641 = inst_19671;
var inst_19642 = null;
var inst_19643 = (0);
var inst_19644 = (0);
var state_19704__$1 = (function (){var statearr_19739 = state_19704;
(statearr_19739[(12)] = inst_19643);

(statearr_19739[(13)] = inst_19644);

(statearr_19739[(14)] = inst_19642);

(statearr_19739[(15)] = inst_19670);

(statearr_19739[(16)] = inst_19641);

return statearr_19739;
})();
var statearr_19740_21039 = state_19704__$1;
(statearr_19740_21039[(2)] = null);

(statearr_19740_21039[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (3))){
var inst_19702 = (state_19704[(2)]);
var state_19704__$1 = state_19704;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19704__$1,inst_19702);
} else {
if((state_val_19705 === (12))){
var inst_19679 = (state_19704[(2)]);
var state_19704__$1 = state_19704;
var statearr_19741_21040 = state_19704__$1;
(statearr_19741_21040[(2)] = inst_19679);

(statearr_19741_21040[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (2))){
var state_19704__$1 = state_19704;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19704__$1,(4),ch);
} else {
if((state_val_19705 === (23))){
var state_19704__$1 = state_19704;
var statearr_19742_21041 = state_19704__$1;
(statearr_19742_21041[(2)] = null);

(statearr_19742_21041[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (19))){
var inst_19631 = (state_19704[(8)]);
var inst_19685 = (state_19704[(11)]);
var inst_19687 = cljs.core.async.muxch_STAR_(inst_19685);
var state_19704__$1 = state_19704;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_19704__$1,(22),inst_19687,inst_19631);
} else {
if((state_val_19705 === (11))){
var inst_19658 = (state_19704[(10)]);
var inst_19641 = (state_19704[(16)]);
var inst_19658__$1 = cljs.core.seq(inst_19641);
var state_19704__$1 = (function (){var statearr_19743 = state_19704;
(statearr_19743[(10)] = inst_19658__$1);

return statearr_19743;
})();
if(inst_19658__$1){
var statearr_19744_21042 = state_19704__$1;
(statearr_19744_21042[(1)] = (13));

} else {
var statearr_19745_21043 = state_19704__$1;
(statearr_19745_21043[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (9))){
var inst_19681 = (state_19704[(2)]);
var state_19704__$1 = state_19704;
var statearr_19746_21044 = state_19704__$1;
(statearr_19746_21044[(2)] = inst_19681);

(statearr_19746_21044[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (5))){
var inst_19638 = cljs.core.deref(mults);
var inst_19639 = cljs.core.vals(inst_19638);
var inst_19640 = cljs.core.seq(inst_19639);
var inst_19641 = inst_19640;
var inst_19642 = null;
var inst_19643 = (0);
var inst_19644 = (0);
var state_19704__$1 = (function (){var statearr_19747 = state_19704;
(statearr_19747[(12)] = inst_19643);

(statearr_19747[(13)] = inst_19644);

(statearr_19747[(14)] = inst_19642);

(statearr_19747[(16)] = inst_19641);

return statearr_19747;
})();
var statearr_19748_21048 = state_19704__$1;
(statearr_19748_21048[(2)] = null);

(statearr_19748_21048[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (14))){
var state_19704__$1 = state_19704;
var statearr_19752_21049 = state_19704__$1;
(statearr_19752_21049[(2)] = null);

(statearr_19752_21049[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (16))){
var inst_19658 = (state_19704[(10)]);
var inst_19662 = cljs.core.chunk_first(inst_19658);
var inst_19664 = cljs.core.chunk_rest(inst_19658);
var inst_19665 = cljs.core.count(inst_19662);
var inst_19641 = inst_19664;
var inst_19642 = inst_19662;
var inst_19643 = inst_19665;
var inst_19644 = (0);
var state_19704__$1 = (function (){var statearr_19753 = state_19704;
(statearr_19753[(12)] = inst_19643);

(statearr_19753[(13)] = inst_19644);

(statearr_19753[(14)] = inst_19642);

(statearr_19753[(16)] = inst_19641);

return statearr_19753;
})();
var statearr_19754_21050 = state_19704__$1;
(statearr_19754_21050[(2)] = null);

(statearr_19754_21050[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (10))){
var inst_19643 = (state_19704[(12)]);
var inst_19644 = (state_19704[(13)]);
var inst_19642 = (state_19704[(14)]);
var inst_19641 = (state_19704[(16)]);
var inst_19649 = cljs.core._nth(inst_19642,inst_19644);
var inst_19650 = cljs.core.async.muxch_STAR_(inst_19649);
var inst_19651 = cljs.core.async.close_BANG_(inst_19650);
var inst_19652 = (inst_19644 + (1));
var tmp19749 = inst_19643;
var tmp19750 = inst_19642;
var tmp19751 = inst_19641;
var inst_19641__$1 = tmp19751;
var inst_19642__$1 = tmp19750;
var inst_19643__$1 = tmp19749;
var inst_19644__$1 = inst_19652;
var state_19704__$1 = (function (){var statearr_19755 = state_19704;
(statearr_19755[(17)] = inst_19651);

(statearr_19755[(12)] = inst_19643__$1);

(statearr_19755[(13)] = inst_19644__$1);

(statearr_19755[(14)] = inst_19642__$1);

(statearr_19755[(16)] = inst_19641__$1);

return statearr_19755;
})();
var statearr_19756_21051 = state_19704__$1;
(statearr_19756_21051[(2)] = null);

(statearr_19756_21051[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (18))){
var inst_19674 = (state_19704[(2)]);
var state_19704__$1 = state_19704;
var statearr_19757_21052 = state_19704__$1;
(statearr_19757_21052[(2)] = inst_19674);

(statearr_19757_21052[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19705 === (8))){
var inst_19643 = (state_19704[(12)]);
var inst_19644 = (state_19704[(13)]);
var inst_19646 = (inst_19644 < inst_19643);
var inst_19647 = inst_19646;
var state_19704__$1 = state_19704;
if(cljs.core.truth_(inst_19647)){
var statearr_19758_21053 = state_19704__$1;
(statearr_19758_21053[(1)] = (10));

} else {
var statearr_19759_21054 = state_19704__$1;
(statearr_19759_21054[(1)] = (11));

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
var cljs$core$async$state_machine__18081__auto__ = null;
var cljs$core$async$state_machine__18081__auto____0 = (function (){
var statearr_19760 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19760[(0)] = cljs$core$async$state_machine__18081__auto__);

(statearr_19760[(1)] = (1));

return statearr_19760;
});
var cljs$core$async$state_machine__18081__auto____1 = (function (state_19704){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_19704);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e19761){var ex__18084__auto__ = e19761;
var statearr_19762_21055 = state_19704;
(statearr_19762_21055[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_19704[(4)]))){
var statearr_19763_21056 = state_19704;
(statearr_19763_21056[(1)] = cljs.core.first((state_19704[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21057 = state_19704;
state_19704 = G__21057;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$state_machine__18081__auto__ = function(state_19704){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18081__auto____1.call(this,state_19704);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18081__auto____0;
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18081__auto____1;
return cljs$core$async$state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_19765 = f__18206__auto__();
(statearr_19765[(6)] = c__18205__auto___21018);

return statearr_19765;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
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
var G__19768 = arguments.length;
switch (G__19768) {
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
var G__19772 = arguments.length;
switch (G__19772) {
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
var G__19776 = arguments.length;
switch (G__19776) {
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
var c__18205__auto___21069 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_19819){
var state_val_19820 = (state_19819[(1)]);
if((state_val_19820 === (7))){
var state_19819__$1 = state_19819;
var statearr_19821_21070 = state_19819__$1;
(statearr_19821_21070[(2)] = null);

(statearr_19821_21070[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19820 === (1))){
var state_19819__$1 = state_19819;
var statearr_19822_21071 = state_19819__$1;
(statearr_19822_21071[(2)] = null);

(statearr_19822_21071[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19820 === (4))){
var inst_19779 = (state_19819[(7)]);
var inst_19780 = (state_19819[(8)]);
var inst_19782 = (inst_19780 < inst_19779);
var state_19819__$1 = state_19819;
if(cljs.core.truth_(inst_19782)){
var statearr_19823_21072 = state_19819__$1;
(statearr_19823_21072[(1)] = (6));

} else {
var statearr_19824_21073 = state_19819__$1;
(statearr_19824_21073[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19820 === (15))){
var inst_19805 = (state_19819[(9)]);
var inst_19810 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_19805);
var state_19819__$1 = state_19819;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_19819__$1,(17),out,inst_19810);
} else {
if((state_val_19820 === (13))){
var inst_19805 = (state_19819[(9)]);
var inst_19805__$1 = (state_19819[(2)]);
var inst_19806 = cljs.core.some(cljs.core.nil_QMARK_,inst_19805__$1);
var state_19819__$1 = (function (){var statearr_19827 = state_19819;
(statearr_19827[(9)] = inst_19805__$1);

return statearr_19827;
})();
if(cljs.core.truth_(inst_19806)){
var statearr_19828_21079 = state_19819__$1;
(statearr_19828_21079[(1)] = (14));

} else {
var statearr_19829_21080 = state_19819__$1;
(statearr_19829_21080[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19820 === (6))){
var state_19819__$1 = state_19819;
var statearr_19834_21081 = state_19819__$1;
(statearr_19834_21081[(2)] = null);

(statearr_19834_21081[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19820 === (17))){
var inst_19812 = (state_19819[(2)]);
var state_19819__$1 = (function (){var statearr_19838 = state_19819;
(statearr_19838[(10)] = inst_19812);

return statearr_19838;
})();
var statearr_19839_21082 = state_19819__$1;
(statearr_19839_21082[(2)] = null);

(statearr_19839_21082[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19820 === (3))){
var inst_19817 = (state_19819[(2)]);
var state_19819__$1 = state_19819;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19819__$1,inst_19817);
} else {
if((state_val_19820 === (12))){
var _ = (function (){var statearr_19841 = state_19819;
(statearr_19841[(4)] = cljs.core.rest((state_19819[(4)])));

return statearr_19841;
})();
var state_19819__$1 = state_19819;
var ex19836 = (state_19819__$1[(2)]);
var statearr_19842_21087 = state_19819__$1;
(statearr_19842_21087[(5)] = ex19836);


if((ex19836 instanceof Object)){
var statearr_19845_21088 = state_19819__$1;
(statearr_19845_21088[(1)] = (11));

(statearr_19845_21088[(5)] = null);

} else {
throw ex19836;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19820 === (2))){
var inst_19778 = cljs.core.reset_BANG_(dctr,cnt);
var inst_19779 = cnt;
var inst_19780 = (0);
var state_19819__$1 = (function (){var statearr_19846 = state_19819;
(statearr_19846[(11)] = inst_19778);

(statearr_19846[(7)] = inst_19779);

(statearr_19846[(8)] = inst_19780);

return statearr_19846;
})();
var statearr_19850_21093 = state_19819__$1;
(statearr_19850_21093[(2)] = null);

(statearr_19850_21093[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19820 === (11))){
var inst_19784 = (state_19819[(2)]);
var inst_19785 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_19819__$1 = (function (){var statearr_19851 = state_19819;
(statearr_19851[(12)] = inst_19784);

return statearr_19851;
})();
var statearr_19852_21094 = state_19819__$1;
(statearr_19852_21094[(2)] = inst_19785);

(statearr_19852_21094[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19820 === (9))){
var inst_19780 = (state_19819[(8)]);
var _ = (function (){var statearr_19853 = state_19819;
(statearr_19853[(4)] = cljs.core.cons((12),(state_19819[(4)])));

return statearr_19853;
})();
var inst_19791 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_19780) : chs__$1.call(null,inst_19780));
var inst_19792 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_19780) : done.call(null,inst_19780));
var inst_19793 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_19791,inst_19792);
var ___$1 = (function (){var statearr_19854 = state_19819;
(statearr_19854[(4)] = cljs.core.rest((state_19819[(4)])));

return statearr_19854;
})();
var state_19819__$1 = state_19819;
var statearr_19855_21095 = state_19819__$1;
(statearr_19855_21095[(2)] = inst_19793);

(statearr_19855_21095[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19820 === (5))){
var inst_19803 = (state_19819[(2)]);
var state_19819__$1 = (function (){var statearr_19856 = state_19819;
(statearr_19856[(13)] = inst_19803);

return statearr_19856;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19819__$1,(13),dchan);
} else {
if((state_val_19820 === (14))){
var inst_19808 = cljs.core.async.close_BANG_(out);
var state_19819__$1 = state_19819;
var statearr_19870_21096 = state_19819__$1;
(statearr_19870_21096[(2)] = inst_19808);

(statearr_19870_21096[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19820 === (16))){
var inst_19815 = (state_19819[(2)]);
var state_19819__$1 = state_19819;
var statearr_19877_21097 = state_19819__$1;
(statearr_19877_21097[(2)] = inst_19815);

(statearr_19877_21097[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19820 === (10))){
var inst_19780 = (state_19819[(8)]);
var inst_19796 = (state_19819[(2)]);
var inst_19797 = (inst_19780 + (1));
var inst_19780__$1 = inst_19797;
var state_19819__$1 = (function (){var statearr_19878 = state_19819;
(statearr_19878[(14)] = inst_19796);

(statearr_19878[(8)] = inst_19780__$1);

return statearr_19878;
})();
var statearr_19879_21098 = state_19819__$1;
(statearr_19879_21098[(2)] = null);

(statearr_19879_21098[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19820 === (8))){
var inst_19801 = (state_19819[(2)]);
var state_19819__$1 = state_19819;
var statearr_19880_21099 = state_19819__$1;
(statearr_19880_21099[(2)] = inst_19801);

(statearr_19880_21099[(1)] = (5));


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
var cljs$core$async$state_machine__18081__auto__ = null;
var cljs$core$async$state_machine__18081__auto____0 = (function (){
var statearr_19881 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19881[(0)] = cljs$core$async$state_machine__18081__auto__);

(statearr_19881[(1)] = (1));

return statearr_19881;
});
var cljs$core$async$state_machine__18081__auto____1 = (function (state_19819){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_19819);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e19886){var ex__18084__auto__ = e19886;
var statearr_19890_21100 = state_19819;
(statearr_19890_21100[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_19819[(4)]))){
var statearr_19891_21101 = state_19819;
(statearr_19891_21101[(1)] = cljs.core.first((state_19819[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21102 = state_19819;
state_19819 = G__21102;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$state_machine__18081__auto__ = function(state_19819){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18081__auto____1.call(this,state_19819);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18081__auto____0;
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18081__auto____1;
return cljs$core$async$state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_19895 = f__18206__auto__();
(statearr_19895[(6)] = c__18205__auto___21069);

return statearr_19895;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
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
var G__19901 = arguments.length;
switch (G__19901) {
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
var c__18205__auto___21106 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_19937){
var state_val_19938 = (state_19937[(1)]);
if((state_val_19938 === (7))){
var inst_19912 = (state_19937[(7)]);
var inst_19914 = (state_19937[(8)]);
var inst_19912__$1 = (state_19937[(2)]);
var inst_19914__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_19912__$1,(0),null);
var inst_19915 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_19912__$1,(1),null);
var inst_19919 = (inst_19914__$1 == null);
var state_19937__$1 = (function (){var statearr_19939 = state_19937;
(statearr_19939[(7)] = inst_19912__$1);

(statearr_19939[(8)] = inst_19914__$1);

(statearr_19939[(9)] = inst_19915);

return statearr_19939;
})();
if(cljs.core.truth_(inst_19919)){
var statearr_19940_21107 = state_19937__$1;
(statearr_19940_21107[(1)] = (8));

} else {
var statearr_19941_21108 = state_19937__$1;
(statearr_19941_21108[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19938 === (1))){
var inst_19902 = cljs.core.vec(chs);
var inst_19903 = inst_19902;
var state_19937__$1 = (function (){var statearr_19942 = state_19937;
(statearr_19942[(10)] = inst_19903);

return statearr_19942;
})();
var statearr_19943_21109 = state_19937__$1;
(statearr_19943_21109[(2)] = null);

(statearr_19943_21109[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19938 === (4))){
var inst_19903 = (state_19937[(10)]);
var state_19937__$1 = state_19937;
return cljs.core.async.ioc_alts_BANG_(state_19937__$1,(7),inst_19903);
} else {
if((state_val_19938 === (6))){
var inst_19933 = (state_19937[(2)]);
var state_19937__$1 = state_19937;
var statearr_19945_21110 = state_19937__$1;
(statearr_19945_21110[(2)] = inst_19933);

(statearr_19945_21110[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19938 === (3))){
var inst_19935 = (state_19937[(2)]);
var state_19937__$1 = state_19937;
return cljs.core.async.impl.ioc_helpers.return_chan(state_19937__$1,inst_19935);
} else {
if((state_val_19938 === (2))){
var inst_19903 = (state_19937[(10)]);
var inst_19905 = cljs.core.count(inst_19903);
var inst_19906 = (inst_19905 > (0));
var state_19937__$1 = state_19937;
if(cljs.core.truth_(inst_19906)){
var statearr_19950_21112 = state_19937__$1;
(statearr_19950_21112[(1)] = (4));

} else {
var statearr_19951_21113 = state_19937__$1;
(statearr_19951_21113[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19938 === (11))){
var inst_19903 = (state_19937[(10)]);
var inst_19926 = (state_19937[(2)]);
var tmp19949 = inst_19903;
var inst_19903__$1 = tmp19949;
var state_19937__$1 = (function (){var statearr_19954 = state_19937;
(statearr_19954[(10)] = inst_19903__$1);

(statearr_19954[(11)] = inst_19926);

return statearr_19954;
})();
var statearr_19955_21115 = state_19937__$1;
(statearr_19955_21115[(2)] = null);

(statearr_19955_21115[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19938 === (9))){
var inst_19914 = (state_19937[(8)]);
var state_19937__$1 = state_19937;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_19937__$1,(11),out,inst_19914);
} else {
if((state_val_19938 === (5))){
var inst_19931 = cljs.core.async.close_BANG_(out);
var state_19937__$1 = state_19937;
var statearr_19958_21116 = state_19937__$1;
(statearr_19958_21116[(2)] = inst_19931);

(statearr_19958_21116[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19938 === (10))){
var inst_19929 = (state_19937[(2)]);
var state_19937__$1 = state_19937;
var statearr_19959_21117 = state_19937__$1;
(statearr_19959_21117[(2)] = inst_19929);

(statearr_19959_21117[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19938 === (8))){
var inst_19912 = (state_19937[(7)]);
var inst_19903 = (state_19937[(10)]);
var inst_19914 = (state_19937[(8)]);
var inst_19915 = (state_19937[(9)]);
var inst_19921 = (function (){var cs = inst_19903;
var vec__19908 = inst_19912;
var v = inst_19914;
var c = inst_19915;
return (function (p1__19899_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__19899_SHARP_);
});
})();
var inst_19922 = cljs.core.filterv(inst_19921,inst_19903);
var inst_19903__$1 = inst_19922;
var state_19937__$1 = (function (){var statearr_19960 = state_19937;
(statearr_19960[(10)] = inst_19903__$1);

return statearr_19960;
})();
var statearr_19961_21118 = state_19937__$1;
(statearr_19961_21118[(2)] = null);

(statearr_19961_21118[(1)] = (2));


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
var cljs$core$async$state_machine__18081__auto__ = null;
var cljs$core$async$state_machine__18081__auto____0 = (function (){
var statearr_19962 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19962[(0)] = cljs$core$async$state_machine__18081__auto__);

(statearr_19962[(1)] = (1));

return statearr_19962;
});
var cljs$core$async$state_machine__18081__auto____1 = (function (state_19937){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_19937);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e19963){var ex__18084__auto__ = e19963;
var statearr_19964_21120 = state_19937;
(statearr_19964_21120[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_19937[(4)]))){
var statearr_19965_21121 = state_19937;
(statearr_19965_21121[(1)] = cljs.core.first((state_19937[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21123 = state_19937;
state_19937 = G__21123;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$state_machine__18081__auto__ = function(state_19937){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18081__auto____1.call(this,state_19937);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18081__auto____0;
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18081__auto____1;
return cljs$core$async$state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_19966 = f__18206__auto__();
(statearr_19966[(6)] = c__18205__auto___21106);

return statearr_19966;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
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
var G__19975 = arguments.length;
switch (G__19975) {
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
var c__18205__auto___21125 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_19999){
var state_val_20000 = (state_19999[(1)]);
if((state_val_20000 === (7))){
var inst_19981 = (state_19999[(7)]);
var inst_19981__$1 = (state_19999[(2)]);
var inst_19982 = (inst_19981__$1 == null);
var inst_19983 = cljs.core.not(inst_19982);
var state_19999__$1 = (function (){var statearr_20001 = state_19999;
(statearr_20001[(7)] = inst_19981__$1);

return statearr_20001;
})();
if(inst_19983){
var statearr_20002_21126 = state_19999__$1;
(statearr_20002_21126[(1)] = (8));

} else {
var statearr_20003_21127 = state_19999__$1;
(statearr_20003_21127[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (1))){
var inst_19976 = (0);
var state_19999__$1 = (function (){var statearr_20004 = state_19999;
(statearr_20004[(8)] = inst_19976);

return statearr_20004;
})();
var statearr_20005_21129 = state_19999__$1;
(statearr_20005_21129[(2)] = null);

(statearr_20005_21129[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (4))){
var state_19999__$1 = state_19999;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19999__$1,(7),ch);
} else {
if((state_val_20000 === (6))){
var inst_19994 = (state_19999[(2)]);
var state_19999__$1 = state_19999;
var statearr_20006_21130 = state_19999__$1;
(statearr_20006_21130[(2)] = inst_19994);

(statearr_20006_21130[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (3))){
var inst_19996 = (state_19999[(2)]);
var inst_19997 = cljs.core.async.close_BANG_(out);
var state_19999__$1 = (function (){var statearr_20007 = state_19999;
(statearr_20007[(9)] = inst_19996);

return statearr_20007;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_19999__$1,inst_19997);
} else {
if((state_val_20000 === (2))){
var inst_19976 = (state_19999[(8)]);
var inst_19978 = (inst_19976 < n);
var state_19999__$1 = state_19999;
if(cljs.core.truth_(inst_19978)){
var statearr_20012_21132 = state_19999__$1;
(statearr_20012_21132[(1)] = (4));

} else {
var statearr_20013_21136 = state_19999__$1;
(statearr_20013_21136[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (11))){
var inst_19976 = (state_19999[(8)]);
var inst_19986 = (state_19999[(2)]);
var inst_19987 = (inst_19976 + (1));
var inst_19976__$1 = inst_19987;
var state_19999__$1 = (function (){var statearr_20015 = state_19999;
(statearr_20015[(10)] = inst_19986);

(statearr_20015[(8)] = inst_19976__$1);

return statearr_20015;
})();
var statearr_20017_21137 = state_19999__$1;
(statearr_20017_21137[(2)] = null);

(statearr_20017_21137[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (9))){
var state_19999__$1 = state_19999;
var statearr_20019_21138 = state_19999__$1;
(statearr_20019_21138[(2)] = null);

(statearr_20019_21138[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (5))){
var state_19999__$1 = state_19999;
var statearr_20020_21139 = state_19999__$1;
(statearr_20020_21139[(2)] = null);

(statearr_20020_21139[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (10))){
var inst_19991 = (state_19999[(2)]);
var state_19999__$1 = state_19999;
var statearr_20021_21140 = state_19999__$1;
(statearr_20021_21140[(2)] = inst_19991);

(statearr_20021_21140[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20000 === (8))){
var inst_19981 = (state_19999[(7)]);
var state_19999__$1 = state_19999;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_19999__$1,(11),out,inst_19981);
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
var cljs$core$async$state_machine__18081__auto__ = null;
var cljs$core$async$state_machine__18081__auto____0 = (function (){
var statearr_20022 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_20022[(0)] = cljs$core$async$state_machine__18081__auto__);

(statearr_20022[(1)] = (1));

return statearr_20022;
});
var cljs$core$async$state_machine__18081__auto____1 = (function (state_19999){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_19999);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e20023){var ex__18084__auto__ = e20023;
var statearr_20024_21144 = state_19999;
(statearr_20024_21144[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_19999[(4)]))){
var statearr_20025_21145 = state_19999;
(statearr_20025_21145[(1)] = cljs.core.first((state_19999[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21146 = state_19999;
state_19999 = G__21146;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$state_machine__18081__auto__ = function(state_19999){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18081__auto____1.call(this,state_19999);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18081__auto____0;
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18081__auto____1;
return cljs$core$async$state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_20028 = f__18206__auto__();
(statearr_20028[(6)] = c__18205__auto___21125);

return statearr_20028;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
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
cljs.core.async.t_cljs$core$async20036 = (function (f,ch,meta20034,_,fn1,meta20037){
this.f = f;
this.ch = ch;
this.meta20034 = meta20034;
this._ = _;
this.fn1 = fn1;
this.meta20037 = meta20037;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async20036.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_20038,meta20037__$1){
var self__ = this;
var _20038__$1 = this;
return (new cljs.core.async.t_cljs$core$async20036(self__.f,self__.ch,self__.meta20034,self__._,self__.fn1,meta20037__$1));
}));

(cljs.core.async.t_cljs$core$async20036.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_20038){
var self__ = this;
var _20038__$1 = this;
return self__.meta20037;
}));

(cljs.core.async.t_cljs$core$async20036.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async20036.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async20036.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async20036.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__20032_SHARP_){
var G__20039 = (((p1__20032_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__20032_SHARP_) : self__.f.call(null,p1__20032_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__20039) : f1.call(null,G__20039));
});
}));

(cljs.core.async.t_cljs$core$async20036.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta20034","meta20034",-1752983176,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async20033","cljs.core.async/t_cljs$core$async20033",1026902950,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta20037","meta20037",-1101615670,null)], null);
}));

(cljs.core.async.t_cljs$core$async20036.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async20036.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async20036");

(cljs.core.async.t_cljs$core$async20036.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async20036");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async20036.
 */
cljs.core.async.__GT_t_cljs$core$async20036 = (function cljs$core$async$__GT_t_cljs$core$async20036(f,ch,meta20034,_,fn1,meta20037){
return (new cljs.core.async.t_cljs$core$async20036(f,ch,meta20034,_,fn1,meta20037));
});



/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async20033 = (function (f,ch,meta20034){
this.f = f;
this.ch = ch;
this.meta20034 = meta20034;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async20033.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_20035,meta20034__$1){
var self__ = this;
var _20035__$1 = this;
return (new cljs.core.async.t_cljs$core$async20033(self__.f,self__.ch,meta20034__$1));
}));

(cljs.core.async.t_cljs$core$async20033.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_20035){
var self__ = this;
var _20035__$1 = this;
return self__.meta20034;
}));

(cljs.core.async.t_cljs$core$async20033.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async20033.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async20033.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async20033.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async20033.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(new cljs.core.async.t_cljs$core$async20036(self__.f,self__.ch,self__.meta20034,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY)));
if(cljs.core.truth_((function (){var and__5000__auto__ = ret;
if(cljs.core.truth_(and__5000__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5000__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__20044 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__20044) : self__.f.call(null,G__20044));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async20033.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async20033.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async20033.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta20034","meta20034",-1752983176,null)], null);
}));

(cljs.core.async.t_cljs$core$async20033.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async20033.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async20033");

(cljs.core.async.t_cljs$core$async20033.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async20033");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async20033.
 */
cljs.core.async.__GT_t_cljs$core$async20033 = (function cljs$core$async$__GT_t_cljs$core$async20033(f,ch,meta20034){
return (new cljs.core.async.t_cljs$core$async20033(f,ch,meta20034));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
return (new cljs.core.async.t_cljs$core$async20033(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async20049 = (function (f,ch,meta20050){
this.f = f;
this.ch = ch;
this.meta20050 = meta20050;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async20049.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_20051,meta20050__$1){
var self__ = this;
var _20051__$1 = this;
return (new cljs.core.async.t_cljs$core$async20049(self__.f,self__.ch,meta20050__$1));
}));

(cljs.core.async.t_cljs$core$async20049.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_20051){
var self__ = this;
var _20051__$1 = this;
return self__.meta20050;
}));

(cljs.core.async.t_cljs$core$async20049.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async20049.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async20049.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async20049.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async20049.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async20049.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async20049.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta20050","meta20050",-423129984,null)], null);
}));

(cljs.core.async.t_cljs$core$async20049.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async20049.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async20049");

(cljs.core.async.t_cljs$core$async20049.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async20049");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async20049.
 */
cljs.core.async.__GT_t_cljs$core$async20049 = (function cljs$core$async$__GT_t_cljs$core$async20049(f,ch,meta20050){
return (new cljs.core.async.t_cljs$core$async20049(f,ch,meta20050));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
return (new cljs.core.async.t_cljs$core$async20049(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async20057 = (function (p,ch,meta20058){
this.p = p;
this.ch = ch;
this.meta20058 = meta20058;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async20057.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_20059,meta20058__$1){
var self__ = this;
var _20059__$1 = this;
return (new cljs.core.async.t_cljs$core$async20057(self__.p,self__.ch,meta20058__$1));
}));

(cljs.core.async.t_cljs$core$async20057.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_20059){
var self__ = this;
var _20059__$1 = this;
return self__.meta20058;
}));

(cljs.core.async.t_cljs$core$async20057.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async20057.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async20057.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async20057.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async20057.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async20057.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async20057.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async20057.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta20058","meta20058",-1303014986,null)], null);
}));

(cljs.core.async.t_cljs$core$async20057.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async20057.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async20057");

(cljs.core.async.t_cljs$core$async20057.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async20057");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async20057.
 */
cljs.core.async.__GT_t_cljs$core$async20057 = (function cljs$core$async$__GT_t_cljs$core$async20057(p,ch,meta20058){
return (new cljs.core.async.t_cljs$core$async20057(p,ch,meta20058));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
return (new cljs.core.async.t_cljs$core$async20057(p,ch,cljs.core.PersistentArrayMap.EMPTY));
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
var G__20061 = arguments.length;
switch (G__20061) {
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
var c__18205__auto___21160 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_20082){
var state_val_20083 = (state_20082[(1)]);
if((state_val_20083 === (7))){
var inst_20078 = (state_20082[(2)]);
var state_20082__$1 = state_20082;
var statearr_20084_21161 = state_20082__$1;
(statearr_20084_21161[(2)] = inst_20078);

(statearr_20084_21161[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20083 === (1))){
var state_20082__$1 = state_20082;
var statearr_20085_21162 = state_20082__$1;
(statearr_20085_21162[(2)] = null);

(statearr_20085_21162[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20083 === (4))){
var inst_20064 = (state_20082[(7)]);
var inst_20064__$1 = (state_20082[(2)]);
var inst_20065 = (inst_20064__$1 == null);
var state_20082__$1 = (function (){var statearr_20086 = state_20082;
(statearr_20086[(7)] = inst_20064__$1);

return statearr_20086;
})();
if(cljs.core.truth_(inst_20065)){
var statearr_20087_21163 = state_20082__$1;
(statearr_20087_21163[(1)] = (5));

} else {
var statearr_20088_21164 = state_20082__$1;
(statearr_20088_21164[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20083 === (6))){
var inst_20064 = (state_20082[(7)]);
var inst_20069 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_20064) : p.call(null,inst_20064));
var state_20082__$1 = state_20082;
if(cljs.core.truth_(inst_20069)){
var statearr_20089_21165 = state_20082__$1;
(statearr_20089_21165[(1)] = (8));

} else {
var statearr_20090_21166 = state_20082__$1;
(statearr_20090_21166[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20083 === (3))){
var inst_20080 = (state_20082[(2)]);
var state_20082__$1 = state_20082;
return cljs.core.async.impl.ioc_helpers.return_chan(state_20082__$1,inst_20080);
} else {
if((state_val_20083 === (2))){
var state_20082__$1 = state_20082;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20082__$1,(4),ch);
} else {
if((state_val_20083 === (11))){
var inst_20072 = (state_20082[(2)]);
var state_20082__$1 = state_20082;
var statearr_20091_21173 = state_20082__$1;
(statearr_20091_21173[(2)] = inst_20072);

(statearr_20091_21173[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20083 === (9))){
var state_20082__$1 = state_20082;
var statearr_20092_21174 = state_20082__$1;
(statearr_20092_21174[(2)] = null);

(statearr_20092_21174[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20083 === (5))){
var inst_20067 = cljs.core.async.close_BANG_(out);
var state_20082__$1 = state_20082;
var statearr_20093_21175 = state_20082__$1;
(statearr_20093_21175[(2)] = inst_20067);

(statearr_20093_21175[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20083 === (10))){
var inst_20075 = (state_20082[(2)]);
var state_20082__$1 = (function (){var statearr_20094 = state_20082;
(statearr_20094[(8)] = inst_20075);

return statearr_20094;
})();
var statearr_20095_21176 = state_20082__$1;
(statearr_20095_21176[(2)] = null);

(statearr_20095_21176[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20083 === (8))){
var inst_20064 = (state_20082[(7)]);
var state_20082__$1 = state_20082;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_20082__$1,(11),out,inst_20064);
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
var cljs$core$async$state_machine__18081__auto__ = null;
var cljs$core$async$state_machine__18081__auto____0 = (function (){
var statearr_20096 = [null,null,null,null,null,null,null,null,null];
(statearr_20096[(0)] = cljs$core$async$state_machine__18081__auto__);

(statearr_20096[(1)] = (1));

return statearr_20096;
});
var cljs$core$async$state_machine__18081__auto____1 = (function (state_20082){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_20082);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e20098){var ex__18084__auto__ = e20098;
var statearr_20099_21180 = state_20082;
(statearr_20099_21180[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_20082[(4)]))){
var statearr_20100_21181 = state_20082;
(statearr_20100_21181[(1)] = cljs.core.first((state_20082[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21182 = state_20082;
state_20082 = G__21182;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$state_machine__18081__auto__ = function(state_20082){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18081__auto____1.call(this,state_20082);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18081__auto____0;
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18081__auto____1;
return cljs$core$async$state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_20101 = f__18206__auto__();
(statearr_20101[(6)] = c__18205__auto___21160);

return statearr_20101;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__20106 = arguments.length;
switch (G__20106) {
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
var c__18205__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_20172){
var state_val_20173 = (state_20172[(1)]);
if((state_val_20173 === (7))){
var inst_20168 = (state_20172[(2)]);
var state_20172__$1 = state_20172;
var statearr_20174_21187 = state_20172__$1;
(statearr_20174_21187[(2)] = inst_20168);

(statearr_20174_21187[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (20))){
var inst_20138 = (state_20172[(7)]);
var inst_20149 = (state_20172[(2)]);
var inst_20150 = cljs.core.next(inst_20138);
var inst_20124 = inst_20150;
var inst_20125 = null;
var inst_20126 = (0);
var inst_20127 = (0);
var state_20172__$1 = (function (){var statearr_20175 = state_20172;
(statearr_20175[(8)] = inst_20149);

(statearr_20175[(9)] = inst_20126);

(statearr_20175[(10)] = inst_20125);

(statearr_20175[(11)] = inst_20124);

(statearr_20175[(12)] = inst_20127);

return statearr_20175;
})();
var statearr_20176_21188 = state_20172__$1;
(statearr_20176_21188[(2)] = null);

(statearr_20176_21188[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (1))){
var state_20172__$1 = state_20172;
var statearr_20177_21189 = state_20172__$1;
(statearr_20177_21189[(2)] = null);

(statearr_20177_21189[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (4))){
var inst_20113 = (state_20172[(13)]);
var inst_20113__$1 = (state_20172[(2)]);
var inst_20114 = (inst_20113__$1 == null);
var state_20172__$1 = (function (){var statearr_20178 = state_20172;
(statearr_20178[(13)] = inst_20113__$1);

return statearr_20178;
})();
if(cljs.core.truth_(inst_20114)){
var statearr_20179_21190 = state_20172__$1;
(statearr_20179_21190[(1)] = (5));

} else {
var statearr_20180_21191 = state_20172__$1;
(statearr_20180_21191[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (15))){
var state_20172__$1 = state_20172;
var statearr_20184_21192 = state_20172__$1;
(statearr_20184_21192[(2)] = null);

(statearr_20184_21192[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (21))){
var state_20172__$1 = state_20172;
var statearr_20185_21193 = state_20172__$1;
(statearr_20185_21193[(2)] = null);

(statearr_20185_21193[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (13))){
var inst_20126 = (state_20172[(9)]);
var inst_20125 = (state_20172[(10)]);
var inst_20124 = (state_20172[(11)]);
var inst_20127 = (state_20172[(12)]);
var inst_20134 = (state_20172[(2)]);
var inst_20135 = (inst_20127 + (1));
var tmp20181 = inst_20126;
var tmp20182 = inst_20125;
var tmp20183 = inst_20124;
var inst_20124__$1 = tmp20183;
var inst_20125__$1 = tmp20182;
var inst_20126__$1 = tmp20181;
var inst_20127__$1 = inst_20135;
var state_20172__$1 = (function (){var statearr_20200 = state_20172;
(statearr_20200[(14)] = inst_20134);

(statearr_20200[(9)] = inst_20126__$1);

(statearr_20200[(10)] = inst_20125__$1);

(statearr_20200[(11)] = inst_20124__$1);

(statearr_20200[(12)] = inst_20127__$1);

return statearr_20200;
})();
var statearr_20201_21194 = state_20172__$1;
(statearr_20201_21194[(2)] = null);

(statearr_20201_21194[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (22))){
var state_20172__$1 = state_20172;
var statearr_20208_21198 = state_20172__$1;
(statearr_20208_21198[(2)] = null);

(statearr_20208_21198[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (6))){
var inst_20113 = (state_20172[(13)]);
var inst_20122 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_20113) : f.call(null,inst_20113));
var inst_20123 = cljs.core.seq(inst_20122);
var inst_20124 = inst_20123;
var inst_20125 = null;
var inst_20126 = (0);
var inst_20127 = (0);
var state_20172__$1 = (function (){var statearr_20209 = state_20172;
(statearr_20209[(9)] = inst_20126);

(statearr_20209[(10)] = inst_20125);

(statearr_20209[(11)] = inst_20124);

(statearr_20209[(12)] = inst_20127);

return statearr_20209;
})();
var statearr_20210_21199 = state_20172__$1;
(statearr_20210_21199[(2)] = null);

(statearr_20210_21199[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (17))){
var inst_20138 = (state_20172[(7)]);
var inst_20142 = cljs.core.chunk_first(inst_20138);
var inst_20143 = cljs.core.chunk_rest(inst_20138);
var inst_20144 = cljs.core.count(inst_20142);
var inst_20124 = inst_20143;
var inst_20125 = inst_20142;
var inst_20126 = inst_20144;
var inst_20127 = (0);
var state_20172__$1 = (function (){var statearr_20225 = state_20172;
(statearr_20225[(9)] = inst_20126);

(statearr_20225[(10)] = inst_20125);

(statearr_20225[(11)] = inst_20124);

(statearr_20225[(12)] = inst_20127);

return statearr_20225;
})();
var statearr_20226_21200 = state_20172__$1;
(statearr_20226_21200[(2)] = null);

(statearr_20226_21200[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (3))){
var inst_20170 = (state_20172[(2)]);
var state_20172__$1 = state_20172;
return cljs.core.async.impl.ioc_helpers.return_chan(state_20172__$1,inst_20170);
} else {
if((state_val_20173 === (12))){
var inst_20158 = (state_20172[(2)]);
var state_20172__$1 = state_20172;
var statearr_20233_21202 = state_20172__$1;
(statearr_20233_21202[(2)] = inst_20158);

(statearr_20233_21202[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (2))){
var state_20172__$1 = state_20172;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20172__$1,(4),in$);
} else {
if((state_val_20173 === (23))){
var inst_20166 = (state_20172[(2)]);
var state_20172__$1 = state_20172;
var statearr_20234_21203 = state_20172__$1;
(statearr_20234_21203[(2)] = inst_20166);

(statearr_20234_21203[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (19))){
var inst_20153 = (state_20172[(2)]);
var state_20172__$1 = state_20172;
var statearr_20237_21204 = state_20172__$1;
(statearr_20237_21204[(2)] = inst_20153);

(statearr_20237_21204[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (11))){
var inst_20138 = (state_20172[(7)]);
var inst_20124 = (state_20172[(11)]);
var inst_20138__$1 = cljs.core.seq(inst_20124);
var state_20172__$1 = (function (){var statearr_20238 = state_20172;
(statearr_20238[(7)] = inst_20138__$1);

return statearr_20238;
})();
if(inst_20138__$1){
var statearr_20239_21205 = state_20172__$1;
(statearr_20239_21205[(1)] = (14));

} else {
var statearr_20240_21206 = state_20172__$1;
(statearr_20240_21206[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (9))){
var inst_20160 = (state_20172[(2)]);
var inst_20161 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_20172__$1 = (function (){var statearr_20242 = state_20172;
(statearr_20242[(15)] = inst_20160);

return statearr_20242;
})();
if(cljs.core.truth_(inst_20161)){
var statearr_20243_21207 = state_20172__$1;
(statearr_20243_21207[(1)] = (21));

} else {
var statearr_20244_21208 = state_20172__$1;
(statearr_20244_21208[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (5))){
var inst_20116 = cljs.core.async.close_BANG_(out);
var state_20172__$1 = state_20172;
var statearr_20245_21209 = state_20172__$1;
(statearr_20245_21209[(2)] = inst_20116);

(statearr_20245_21209[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (14))){
var inst_20138 = (state_20172[(7)]);
var inst_20140 = cljs.core.chunked_seq_QMARK_(inst_20138);
var state_20172__$1 = state_20172;
if(inst_20140){
var statearr_20246_21210 = state_20172__$1;
(statearr_20246_21210[(1)] = (17));

} else {
var statearr_20247_21211 = state_20172__$1;
(statearr_20247_21211[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (16))){
var inst_20156 = (state_20172[(2)]);
var state_20172__$1 = state_20172;
var statearr_20251_21212 = state_20172__$1;
(statearr_20251_21212[(2)] = inst_20156);

(statearr_20251_21212[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20173 === (10))){
var inst_20125 = (state_20172[(10)]);
var inst_20127 = (state_20172[(12)]);
var inst_20132 = cljs.core._nth(inst_20125,inst_20127);
var state_20172__$1 = state_20172;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_20172__$1,(13),out,inst_20132);
} else {
if((state_val_20173 === (18))){
var inst_20138 = (state_20172[(7)]);
var inst_20147 = cljs.core.first(inst_20138);
var state_20172__$1 = state_20172;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_20172__$1,(20),out,inst_20147);
} else {
if((state_val_20173 === (8))){
var inst_20126 = (state_20172[(9)]);
var inst_20127 = (state_20172[(12)]);
var inst_20129 = (inst_20127 < inst_20126);
var inst_20130 = inst_20129;
var state_20172__$1 = state_20172;
if(cljs.core.truth_(inst_20130)){
var statearr_20252_21213 = state_20172__$1;
(statearr_20252_21213[(1)] = (10));

} else {
var statearr_20253_21214 = state_20172__$1;
(statearr_20253_21214[(1)] = (11));

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
var cljs$core$async$mapcat_STAR__$_state_machine__18081__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__18081__auto____0 = (function (){
var statearr_20254 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_20254[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__18081__auto__);

(statearr_20254[(1)] = (1));

return statearr_20254;
});
var cljs$core$async$mapcat_STAR__$_state_machine__18081__auto____1 = (function (state_20172){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_20172);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e20255){var ex__18084__auto__ = e20255;
var statearr_20256_21218 = state_20172;
(statearr_20256_21218[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_20172[(4)]))){
var statearr_20257_21219 = state_20172;
(statearr_20257_21219[(1)] = cljs.core.first((state_20172[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21224 = state_20172;
state_20172 = G__21224;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__18081__auto__ = function(state_20172){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__18081__auto____1.call(this,state_20172);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__18081__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__18081__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_20258 = f__18206__auto__();
(statearr_20258[(6)] = c__18205__auto__);

return statearr_20258;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));

return c__18205__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__20260 = arguments.length;
switch (G__20260) {
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
var G__20262 = arguments.length;
switch (G__20262) {
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
var G__20264 = arguments.length;
switch (G__20264) {
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
var c__18205__auto___21228 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_20288){
var state_val_20289 = (state_20288[(1)]);
if((state_val_20289 === (7))){
var inst_20283 = (state_20288[(2)]);
var state_20288__$1 = state_20288;
var statearr_20290_21229 = state_20288__$1;
(statearr_20290_21229[(2)] = inst_20283);

(statearr_20290_21229[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20289 === (1))){
var inst_20265 = null;
var state_20288__$1 = (function (){var statearr_20291 = state_20288;
(statearr_20291[(7)] = inst_20265);

return statearr_20291;
})();
var statearr_20294_21230 = state_20288__$1;
(statearr_20294_21230[(2)] = null);

(statearr_20294_21230[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20289 === (4))){
var inst_20268 = (state_20288[(8)]);
var inst_20268__$1 = (state_20288[(2)]);
var inst_20269 = (inst_20268__$1 == null);
var inst_20270 = cljs.core.not(inst_20269);
var state_20288__$1 = (function (){var statearr_20301 = state_20288;
(statearr_20301[(8)] = inst_20268__$1);

return statearr_20301;
})();
if(inst_20270){
var statearr_20305_21231 = state_20288__$1;
(statearr_20305_21231[(1)] = (5));

} else {
var statearr_20306_21232 = state_20288__$1;
(statearr_20306_21232[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20289 === (6))){
var state_20288__$1 = state_20288;
var statearr_20307_21233 = state_20288__$1;
(statearr_20307_21233[(2)] = null);

(statearr_20307_21233[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20289 === (3))){
var inst_20285 = (state_20288[(2)]);
var inst_20286 = cljs.core.async.close_BANG_(out);
var state_20288__$1 = (function (){var statearr_20308 = state_20288;
(statearr_20308[(9)] = inst_20285);

return statearr_20308;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_20288__$1,inst_20286);
} else {
if((state_val_20289 === (2))){
var state_20288__$1 = state_20288;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20288__$1,(4),ch);
} else {
if((state_val_20289 === (11))){
var inst_20268 = (state_20288[(8)]);
var inst_20277 = (state_20288[(2)]);
var inst_20265 = inst_20268;
var state_20288__$1 = (function (){var statearr_20309 = state_20288;
(statearr_20309[(7)] = inst_20265);

(statearr_20309[(10)] = inst_20277);

return statearr_20309;
})();
var statearr_20310_21235 = state_20288__$1;
(statearr_20310_21235[(2)] = null);

(statearr_20310_21235[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20289 === (9))){
var inst_20268 = (state_20288[(8)]);
var state_20288__$1 = state_20288;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_20288__$1,(11),out,inst_20268);
} else {
if((state_val_20289 === (5))){
var inst_20265 = (state_20288[(7)]);
var inst_20268 = (state_20288[(8)]);
var inst_20272 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_20268,inst_20265);
var state_20288__$1 = state_20288;
if(inst_20272){
var statearr_20312_21236 = state_20288__$1;
(statearr_20312_21236[(1)] = (8));

} else {
var statearr_20313_21237 = state_20288__$1;
(statearr_20313_21237[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20289 === (10))){
var inst_20280 = (state_20288[(2)]);
var state_20288__$1 = state_20288;
var statearr_20314_21239 = state_20288__$1;
(statearr_20314_21239[(2)] = inst_20280);

(statearr_20314_21239[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20289 === (8))){
var inst_20265 = (state_20288[(7)]);
var tmp20311 = inst_20265;
var inst_20265__$1 = tmp20311;
var state_20288__$1 = (function (){var statearr_20315 = state_20288;
(statearr_20315[(7)] = inst_20265__$1);

return statearr_20315;
})();
var statearr_20316_21241 = state_20288__$1;
(statearr_20316_21241[(2)] = null);

(statearr_20316_21241[(1)] = (2));


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
var cljs$core$async$state_machine__18081__auto__ = null;
var cljs$core$async$state_machine__18081__auto____0 = (function (){
var statearr_20317 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_20317[(0)] = cljs$core$async$state_machine__18081__auto__);

(statearr_20317[(1)] = (1));

return statearr_20317;
});
var cljs$core$async$state_machine__18081__auto____1 = (function (state_20288){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_20288);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e20318){var ex__18084__auto__ = e20318;
var statearr_20319_21242 = state_20288;
(statearr_20319_21242[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_20288[(4)]))){
var statearr_20320_21243 = state_20288;
(statearr_20320_21243[(1)] = cljs.core.first((state_20288[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21244 = state_20288;
state_20288 = G__21244;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$state_machine__18081__auto__ = function(state_20288){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18081__auto____1.call(this,state_20288);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18081__auto____0;
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18081__auto____1;
return cljs$core$async$state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_20321 = f__18206__auto__();
(statearr_20321[(6)] = c__18205__auto___21228);

return statearr_20321;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__20324 = arguments.length;
switch (G__20324) {
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
var c__18205__auto___21256 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_20365){
var state_val_20366 = (state_20365[(1)]);
if((state_val_20366 === (7))){
var inst_20361 = (state_20365[(2)]);
var state_20365__$1 = state_20365;
var statearr_20369_21257 = state_20365__$1;
(statearr_20369_21257[(2)] = inst_20361);

(statearr_20369_21257[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20366 === (1))){
var inst_20326 = (new Array(n));
var inst_20327 = inst_20326;
var inst_20328 = (0);
var state_20365__$1 = (function (){var statearr_20370 = state_20365;
(statearr_20370[(7)] = inst_20328);

(statearr_20370[(8)] = inst_20327);

return statearr_20370;
})();
var statearr_20371_21258 = state_20365__$1;
(statearr_20371_21258[(2)] = null);

(statearr_20371_21258[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20366 === (4))){
var inst_20331 = (state_20365[(9)]);
var inst_20331__$1 = (state_20365[(2)]);
var inst_20332 = (inst_20331__$1 == null);
var inst_20333 = cljs.core.not(inst_20332);
var state_20365__$1 = (function (){var statearr_20372 = state_20365;
(statearr_20372[(9)] = inst_20331__$1);

return statearr_20372;
})();
if(inst_20333){
var statearr_20373_21259 = state_20365__$1;
(statearr_20373_21259[(1)] = (5));

} else {
var statearr_20374_21260 = state_20365__$1;
(statearr_20374_21260[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20366 === (15))){
var inst_20355 = (state_20365[(2)]);
var state_20365__$1 = state_20365;
var statearr_20376_21261 = state_20365__$1;
(statearr_20376_21261[(2)] = inst_20355);

(statearr_20376_21261[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20366 === (13))){
var state_20365__$1 = state_20365;
var statearr_20378_21262 = state_20365__$1;
(statearr_20378_21262[(2)] = null);

(statearr_20378_21262[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20366 === (6))){
var inst_20328 = (state_20365[(7)]);
var inst_20351 = (inst_20328 > (0));
var state_20365__$1 = state_20365;
if(cljs.core.truth_(inst_20351)){
var statearr_20379_21263 = state_20365__$1;
(statearr_20379_21263[(1)] = (12));

} else {
var statearr_20380_21264 = state_20365__$1;
(statearr_20380_21264[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20366 === (3))){
var inst_20363 = (state_20365[(2)]);
var state_20365__$1 = state_20365;
return cljs.core.async.impl.ioc_helpers.return_chan(state_20365__$1,inst_20363);
} else {
if((state_val_20366 === (12))){
var inst_20327 = (state_20365[(8)]);
var inst_20353 = cljs.core.vec(inst_20327);
var state_20365__$1 = state_20365;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_20365__$1,(15),out,inst_20353);
} else {
if((state_val_20366 === (2))){
var state_20365__$1 = state_20365;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20365__$1,(4),ch);
} else {
if((state_val_20366 === (11))){
var inst_20344 = (state_20365[(2)]);
var inst_20346 = (new Array(n));
var inst_20327 = inst_20346;
var inst_20328 = (0);
var state_20365__$1 = (function (){var statearr_20381 = state_20365;
(statearr_20381[(7)] = inst_20328);

(statearr_20381[(8)] = inst_20327);

(statearr_20381[(10)] = inst_20344);

return statearr_20381;
})();
var statearr_20382_21272 = state_20365__$1;
(statearr_20382_21272[(2)] = null);

(statearr_20382_21272[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20366 === (9))){
var inst_20327 = (state_20365[(8)]);
var inst_20342 = cljs.core.vec(inst_20327);
var state_20365__$1 = state_20365;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_20365__$1,(11),out,inst_20342);
} else {
if((state_val_20366 === (5))){
var inst_20331 = (state_20365[(9)]);
var inst_20336 = (state_20365[(11)]);
var inst_20328 = (state_20365[(7)]);
var inst_20327 = (state_20365[(8)]);
var inst_20335 = (inst_20327[inst_20328] = inst_20331);
var inst_20336__$1 = (inst_20328 + (1));
var inst_20338 = (inst_20336__$1 < n);
var state_20365__$1 = (function (){var statearr_20383 = state_20365;
(statearr_20383[(11)] = inst_20336__$1);

(statearr_20383[(12)] = inst_20335);

return statearr_20383;
})();
if(cljs.core.truth_(inst_20338)){
var statearr_20384_21277 = state_20365__$1;
(statearr_20384_21277[(1)] = (8));

} else {
var statearr_20385_21278 = state_20365__$1;
(statearr_20385_21278[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20366 === (14))){
var inst_20358 = (state_20365[(2)]);
var inst_20359 = cljs.core.async.close_BANG_(out);
var state_20365__$1 = (function (){var statearr_20387 = state_20365;
(statearr_20387[(13)] = inst_20358);

return statearr_20387;
})();
var statearr_20388_21279 = state_20365__$1;
(statearr_20388_21279[(2)] = inst_20359);

(statearr_20388_21279[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20366 === (10))){
var inst_20349 = (state_20365[(2)]);
var state_20365__$1 = state_20365;
var statearr_20389_21280 = state_20365__$1;
(statearr_20389_21280[(2)] = inst_20349);

(statearr_20389_21280[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20366 === (8))){
var inst_20336 = (state_20365[(11)]);
var inst_20327 = (state_20365[(8)]);
var tmp20386 = inst_20327;
var inst_20327__$1 = tmp20386;
var inst_20328 = inst_20336;
var state_20365__$1 = (function (){var statearr_20390 = state_20365;
(statearr_20390[(7)] = inst_20328);

(statearr_20390[(8)] = inst_20327__$1);

return statearr_20390;
})();
var statearr_20391_21285 = state_20365__$1;
(statearr_20391_21285[(2)] = null);

(statearr_20391_21285[(1)] = (2));


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
var cljs$core$async$state_machine__18081__auto__ = null;
var cljs$core$async$state_machine__18081__auto____0 = (function (){
var statearr_20395 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_20395[(0)] = cljs$core$async$state_machine__18081__auto__);

(statearr_20395[(1)] = (1));

return statearr_20395;
});
var cljs$core$async$state_machine__18081__auto____1 = (function (state_20365){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_20365);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e20396){var ex__18084__auto__ = e20396;
var statearr_20397_21286 = state_20365;
(statearr_20397_21286[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_20365[(4)]))){
var statearr_20398_21287 = state_20365;
(statearr_20398_21287[(1)] = cljs.core.first((state_20365[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21288 = state_20365;
state_20365 = G__21288;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$state_machine__18081__auto__ = function(state_20365){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18081__auto____1.call(this,state_20365);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18081__auto____0;
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18081__auto____1;
return cljs$core$async$state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_20399 = f__18206__auto__();
(statearr_20399[(6)] = c__18205__auto___21256);

return statearr_20399;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__20401 = arguments.length;
switch (G__20401) {
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
var c__18205__auto___21290 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_20459){
var state_val_20460 = (state_20459[(1)]);
if((state_val_20460 === (7))){
var inst_20455 = (state_20459[(2)]);
var state_20459__$1 = state_20459;
var statearr_20471_21291 = state_20459__$1;
(statearr_20471_21291[(2)] = inst_20455);

(statearr_20471_21291[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20460 === (1))){
var inst_20405 = [];
var inst_20406 = inst_20405;
var inst_20407 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_20459__$1 = (function (){var statearr_20472 = state_20459;
(statearr_20472[(7)] = inst_20407);

(statearr_20472[(8)] = inst_20406);

return statearr_20472;
})();
var statearr_20473_21294 = state_20459__$1;
(statearr_20473_21294[(2)] = null);

(statearr_20473_21294[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20460 === (4))){
var inst_20410 = (state_20459[(9)]);
var inst_20410__$1 = (state_20459[(2)]);
var inst_20414 = (inst_20410__$1 == null);
var inst_20415 = cljs.core.not(inst_20414);
var state_20459__$1 = (function (){var statearr_20474 = state_20459;
(statearr_20474[(9)] = inst_20410__$1);

return statearr_20474;
})();
if(inst_20415){
var statearr_20475_21295 = state_20459__$1;
(statearr_20475_21295[(1)] = (5));

} else {
var statearr_20476_21296 = state_20459__$1;
(statearr_20476_21296[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20460 === (15))){
var inst_20406 = (state_20459[(8)]);
var inst_20447 = cljs.core.vec(inst_20406);
var state_20459__$1 = state_20459;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_20459__$1,(18),out,inst_20447);
} else {
if((state_val_20460 === (13))){
var inst_20442 = (state_20459[(2)]);
var state_20459__$1 = state_20459;
var statearr_20484_21297 = state_20459__$1;
(statearr_20484_21297[(2)] = inst_20442);

(statearr_20484_21297[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20460 === (6))){
var inst_20406 = (state_20459[(8)]);
var inst_20444 = inst_20406.length;
var inst_20445 = (inst_20444 > (0));
var state_20459__$1 = state_20459;
if(cljs.core.truth_(inst_20445)){
var statearr_20491_21302 = state_20459__$1;
(statearr_20491_21302[(1)] = (15));

} else {
var statearr_20496_21303 = state_20459__$1;
(statearr_20496_21303[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20460 === (17))){
var inst_20452 = (state_20459[(2)]);
var inst_20453 = cljs.core.async.close_BANG_(out);
var state_20459__$1 = (function (){var statearr_20497 = state_20459;
(statearr_20497[(10)] = inst_20452);

return statearr_20497;
})();
var statearr_20498_21304 = state_20459__$1;
(statearr_20498_21304[(2)] = inst_20453);

(statearr_20498_21304[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20460 === (3))){
var inst_20457 = (state_20459[(2)]);
var state_20459__$1 = state_20459;
return cljs.core.async.impl.ioc_helpers.return_chan(state_20459__$1,inst_20457);
} else {
if((state_val_20460 === (12))){
var inst_20406 = (state_20459[(8)]);
var inst_20432 = cljs.core.vec(inst_20406);
var state_20459__$1 = state_20459;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_20459__$1,(14),out,inst_20432);
} else {
if((state_val_20460 === (2))){
var state_20459__$1 = state_20459;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_20459__$1,(4),ch);
} else {
if((state_val_20460 === (11))){
var inst_20418 = (state_20459[(11)]);
var inst_20410 = (state_20459[(9)]);
var inst_20406 = (state_20459[(8)]);
var inst_20429 = inst_20406.push(inst_20410);
var tmp20501 = inst_20406;
var inst_20406__$1 = tmp20501;
var inst_20407 = inst_20418;
var state_20459__$1 = (function (){var statearr_20502 = state_20459;
(statearr_20502[(12)] = inst_20429);

(statearr_20502[(7)] = inst_20407);

(statearr_20502[(8)] = inst_20406__$1);

return statearr_20502;
})();
var statearr_20503_21305 = state_20459__$1;
(statearr_20503_21305[(2)] = null);

(statearr_20503_21305[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20460 === (9))){
var inst_20407 = (state_20459[(7)]);
var inst_20425 = cljs.core.keyword_identical_QMARK_(inst_20407,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_20459__$1 = state_20459;
var statearr_20504_21306 = state_20459__$1;
(statearr_20504_21306[(2)] = inst_20425);

(statearr_20504_21306[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20460 === (5))){
var inst_20407 = (state_20459[(7)]);
var inst_20418 = (state_20459[(11)]);
var inst_20410 = (state_20459[(9)]);
var inst_20422 = (state_20459[(13)]);
var inst_20418__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_20410) : f.call(null,inst_20410));
var inst_20422__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_20418__$1,inst_20407);
var state_20459__$1 = (function (){var statearr_20505 = state_20459;
(statearr_20505[(11)] = inst_20418__$1);

(statearr_20505[(13)] = inst_20422__$1);

return statearr_20505;
})();
if(inst_20422__$1){
var statearr_20506_21312 = state_20459__$1;
(statearr_20506_21312[(1)] = (8));

} else {
var statearr_20507_21313 = state_20459__$1;
(statearr_20507_21313[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20460 === (14))){
var inst_20418 = (state_20459[(11)]);
var inst_20410 = (state_20459[(9)]);
var inst_20434 = (state_20459[(2)]);
var inst_20438 = [];
var inst_20439 = inst_20438.push(inst_20410);
var inst_20406 = inst_20438;
var inst_20407 = inst_20418;
var state_20459__$1 = (function (){var statearr_20508 = state_20459;
(statearr_20508[(7)] = inst_20407);

(statearr_20508[(14)] = inst_20434);

(statearr_20508[(8)] = inst_20406);

(statearr_20508[(15)] = inst_20439);

return statearr_20508;
})();
var statearr_20509_21315 = state_20459__$1;
(statearr_20509_21315[(2)] = null);

(statearr_20509_21315[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20460 === (16))){
var state_20459__$1 = state_20459;
var statearr_20510_21316 = state_20459__$1;
(statearr_20510_21316[(2)] = null);

(statearr_20510_21316[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20460 === (10))){
var inst_20427 = (state_20459[(2)]);
var state_20459__$1 = state_20459;
if(cljs.core.truth_(inst_20427)){
var statearr_20511_21319 = state_20459__$1;
(statearr_20511_21319[(1)] = (11));

} else {
var statearr_20512_21323 = state_20459__$1;
(statearr_20512_21323[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20460 === (18))){
var inst_20449 = (state_20459[(2)]);
var state_20459__$1 = state_20459;
var statearr_20513_21324 = state_20459__$1;
(statearr_20513_21324[(2)] = inst_20449);

(statearr_20513_21324[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20460 === (8))){
var inst_20422 = (state_20459[(13)]);
var state_20459__$1 = state_20459;
var statearr_20514_21332 = state_20459__$1;
(statearr_20514_21332[(2)] = inst_20422);

(statearr_20514_21332[(1)] = (10));


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
var cljs$core$async$state_machine__18081__auto__ = null;
var cljs$core$async$state_machine__18081__auto____0 = (function (){
var statearr_20515 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_20515[(0)] = cljs$core$async$state_machine__18081__auto__);

(statearr_20515[(1)] = (1));

return statearr_20515;
});
var cljs$core$async$state_machine__18081__auto____1 = (function (state_20459){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_20459);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e20516){var ex__18084__auto__ = e20516;
var statearr_20517_21342 = state_20459;
(statearr_20517_21342[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_20459[(4)]))){
var statearr_20518_21343 = state_20459;
(statearr_20518_21343[(1)] = cljs.core.first((state_20459[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21344 = state_20459;
state_20459 = G__21344;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
cljs$core$async$state_machine__18081__auto__ = function(state_20459){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18081__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18081__auto____1.call(this,state_20459);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18081__auto____0;
cljs$core$async$state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18081__auto____1;
return cljs$core$async$state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_20519 = f__18206__auto__();
(statearr_20519[(6)] = c__18205__auto___21290);

return statearr_20519;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
