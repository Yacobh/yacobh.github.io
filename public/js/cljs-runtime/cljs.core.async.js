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
cljs.core.async.t_cljs$core$async34613 = (function (f,blockable,meta34614){
this.f = f;
this.blockable = blockable;
this.meta34614 = meta34614;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async34613.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_34615,meta34614__$1){
var self__ = this;
var _34615__$1 = this;
return (new cljs.core.async.t_cljs$core$async34613(self__.f,self__.blockable,meta34614__$1));
}));

(cljs.core.async.t_cljs$core$async34613.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_34615){
var self__ = this;
var _34615__$1 = this;
return self__.meta34614;
}));

(cljs.core.async.t_cljs$core$async34613.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async34613.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async34613.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async34613.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async34613.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta34614","meta34614",-487090261,null)], null);
}));

(cljs.core.async.t_cljs$core$async34613.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async34613.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34613");

(cljs.core.async.t_cljs$core$async34613.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async34613");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async34613.
 */
cljs.core.async.__GT_t_cljs$core$async34613 = (function cljs$core$async$__GT_t_cljs$core$async34613(f,blockable,meta34614){
return (new cljs.core.async.t_cljs$core$async34613(f,blockable,meta34614));
});


cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__34600 = arguments.length;
switch (G__34600) {
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
return (new cljs.core.async.t_cljs$core$async34613(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
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
var G__34647 = arguments.length;
switch (G__34647) {
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
 *   channel is closed, then return the value (or nil) forever. See chan for the
 *   semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__34650 = arguments.length;
switch (G__34650) {
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
var G__34662 = arguments.length;
switch (G__34662) {
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
var val_36837 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_36837) : fn1.call(null,val_36837));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_36837) : fn1.call(null,val_36837));
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
var G__34682 = arguments.length;
switch (G__34682) {
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
var temp__5821__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5821__auto__)){
var ret = temp__5821__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5821__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5821__auto__)){
var retb = temp__5821__auto__;
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
var n__5616__auto___36840 = n;
var x_36841 = (0);
while(true){
if((x_36841 < n__5616__auto___36840)){
(a[x_36841] = x_36841);

var G__36842 = (x_36841 + (1));
x_36841 = G__36842;
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
cljs.core.async.t_cljs$core$async34704 = (function (flag,meta34705){
this.flag = flag;
this.meta34705 = meta34705;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async34704.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_34706,meta34705__$1){
var self__ = this;
var _34706__$1 = this;
return (new cljs.core.async.t_cljs$core$async34704(self__.flag,meta34705__$1));
}));

(cljs.core.async.t_cljs$core$async34704.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_34706){
var self__ = this;
var _34706__$1 = this;
return self__.meta34705;
}));

(cljs.core.async.t_cljs$core$async34704.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async34704.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async34704.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async34704.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async34704.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta34705","meta34705",612420561,null)], null);
}));

(cljs.core.async.t_cljs$core$async34704.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async34704.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34704");

(cljs.core.async.t_cljs$core$async34704.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async34704");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async34704.
 */
cljs.core.async.__GT_t_cljs$core$async34704 = (function cljs$core$async$__GT_t_cljs$core$async34704(flag,meta34705){
return (new cljs.core.async.t_cljs$core$async34704(flag,meta34705));
});


cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
return (new cljs.core.async.t_cljs$core$async34704(flag,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async34728 = (function (flag,cb,meta34729){
this.flag = flag;
this.cb = cb;
this.meta34729 = meta34729;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_34730,meta34729__$1){
var self__ = this;
var _34730__$1 = this;
return (new cljs.core.async.t_cljs$core$async34728(self__.flag,self__.cb,meta34729__$1));
}));

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_34730){
var self__ = this;
var _34730__$1 = this;
return self__.meta34729;
}));

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async34728.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta34729","meta34729",2084087100,null)], null);
}));

(cljs.core.async.t_cljs$core$async34728.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async34728.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34728");

(cljs.core.async.t_cljs$core$async34728.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async34728");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async34728.
 */
cljs.core.async.__GT_t_cljs$core$async34728 = (function cljs$core$async$__GT_t_cljs$core$async34728(flag,cb,meta34729){
return (new cljs.core.async.t_cljs$core$async34728(flag,cb,meta34729));
});


cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
return (new cljs.core.async.t_cljs$core$async34728(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
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
var ports__$1 = cljs.core.vec(ports);
var n = cljs.core.count(ports__$1);
var _ = (function (){var i = (0);
while(true){
if((i < n)){
var port_36847 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports__$1,i);
if(cljs.core.vector_QMARK_(port_36847)){
if((!(((port_36847.cljs$core$IFn$_invoke$arity$1 ? port_36847.cljs$core$IFn$_invoke$arity$1((1)) : port_36847.call(null,(1))) == null)))){
} else {
throw (new Error(["Assert failed: ","can't put nil on channel","\n","(some? (port 1))"].join('')));
}
} else {
}

var G__36848 = (i + (1));
i = G__36848;
continue;
} else {
return null;
}
break;
}
})();
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports__$1,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,ports__$1,n,_,idxs,priority){
return (function (p1__34774_SHARP_){
var G__34777 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__34774_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__34777) : fret.call(null,G__34777));
});})(i,val,idx,port,wport,flag,ports__$1,n,_,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,ports__$1,n,_,idxs,priority){
return (function (p1__34775_SHARP_){
var G__34778 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__34775_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__34778) : fret.call(null,G__34778));
});})(i,idx,port,wport,flag,ports__$1,n,_,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__5025__auto__ = wport;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return port;
}
})()], null));
} else {
var G__36852 = (i + (1));
i = G__36852;
continue;
}
} else {
return null;
}
break;
}
})();
var or__5025__auto__ = ret;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5823__auto__ = (function (){var and__5023__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__5023__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__5023__auto__;
}
})();
if(cljs.core.truth_(temp__5823__auto__)){
var got = temp__5823__auto__;
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
var args__5755__auto__ = [];
var len__5749__auto___36862 = arguments.length;
var i__5750__auto___36863 = (0);
while(true){
if((i__5750__auto___36863 < len__5749__auto___36862)){
args__5755__auto__.push((arguments[i__5750__auto___36863]));

var G__36864 = (i__5750__auto___36863 + (1));
i__5750__auto___36863 = G__36864;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__34793){
var map__34794 = p__34793;
var map__34794__$1 = cljs.core.__destructure_map(map__34794);
var opts = map__34794__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq34791){
var G__34792 = cljs.core.first(seq34791);
var seq34791__$1 = cljs.core.next(seq34791);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__34792,seq34791__$1);
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
var G__34797 = arguments.length;
switch (G__34797) {
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
var c__34471__auto___36878 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_34824){
var state_val_34825 = (state_34824[(1)]);
if((state_val_34825 === (7))){
var inst_34820 = (state_34824[(2)]);
var state_34824__$1 = state_34824;
var statearr_34830_36885 = state_34824__$1;
(statearr_34830_36885[(2)] = inst_34820);

(statearr_34830_36885[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34825 === (1))){
var state_34824__$1 = state_34824;
var statearr_34831_36887 = state_34824__$1;
(statearr_34831_36887[(2)] = null);

(statearr_34831_36887[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34825 === (4))){
var inst_34802 = (state_34824[(7)]);
var inst_34802__$1 = (state_34824[(2)]);
var inst_34803 = (inst_34802__$1 == null);
var state_34824__$1 = (function (){var statearr_34833 = state_34824;
(statearr_34833[(7)] = inst_34802__$1);

return statearr_34833;
})();
if(cljs.core.truth_(inst_34803)){
var statearr_34834_36888 = state_34824__$1;
(statearr_34834_36888[(1)] = (5));

} else {
var statearr_34835_36889 = state_34824__$1;
(statearr_34835_36889[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34825 === (13))){
var state_34824__$1 = state_34824;
var statearr_34837_36890 = state_34824__$1;
(statearr_34837_36890[(2)] = null);

(statearr_34837_36890[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34825 === (6))){
var inst_34802 = (state_34824[(7)]);
var state_34824__$1 = state_34824;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_34824__$1,(11),to,inst_34802);
} else {
if((state_val_34825 === (3))){
var inst_34822 = (state_34824[(2)]);
var state_34824__$1 = state_34824;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34824__$1,inst_34822);
} else {
if((state_val_34825 === (12))){
var state_34824__$1 = state_34824;
var statearr_34839_36891 = state_34824__$1;
(statearr_34839_36891[(2)] = null);

(statearr_34839_36891[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34825 === (2))){
var state_34824__$1 = state_34824;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34824__$1,(4),from);
} else {
if((state_val_34825 === (11))){
var inst_34812 = (state_34824[(2)]);
var state_34824__$1 = state_34824;
if(cljs.core.truth_(inst_34812)){
var statearr_34840_36893 = state_34824__$1;
(statearr_34840_36893[(1)] = (12));

} else {
var statearr_34841_36894 = state_34824__$1;
(statearr_34841_36894[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34825 === (9))){
var state_34824__$1 = state_34824;
var statearr_34842_36896 = state_34824__$1;
(statearr_34842_36896[(2)] = null);

(statearr_34842_36896[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34825 === (5))){
var state_34824__$1 = state_34824;
if(cljs.core.truth_(close_QMARK_)){
var statearr_34843_36897 = state_34824__$1;
(statearr_34843_36897[(1)] = (8));

} else {
var statearr_34844_36898 = state_34824__$1;
(statearr_34844_36898[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34825 === (14))){
var inst_34818 = (state_34824[(2)]);
var state_34824__$1 = state_34824;
var statearr_34846_36900 = state_34824__$1;
(statearr_34846_36900[(2)] = inst_34818);

(statearr_34846_36900[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34825 === (10))){
var inst_34809 = (state_34824[(2)]);
var state_34824__$1 = state_34824;
var statearr_34847_36901 = state_34824__$1;
(statearr_34847_36901[(2)] = inst_34809);

(statearr_34847_36901[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34825 === (8))){
var inst_34806 = cljs.core.async.close_BANG_(to);
var state_34824__$1 = state_34824;
var statearr_34848_36902 = state_34824__$1;
(statearr_34848_36902[(2)] = inst_34806);

(statearr_34848_36902[(1)] = (10));


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
var cljs$core$async$state_machine__34096__auto__ = null;
var cljs$core$async$state_machine__34096__auto____0 = (function (){
var statearr_34849 = [null,null,null,null,null,null,null,null];
(statearr_34849[(0)] = cljs$core$async$state_machine__34096__auto__);

(statearr_34849[(1)] = (1));

return statearr_34849;
});
var cljs$core$async$state_machine__34096__auto____1 = (function (state_34824){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_34824);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e34850){var ex__34099__auto__ = e34850;
var statearr_34851_36915 = state_34824;
(statearr_34851_36915[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_34824[(4)]))){
var statearr_34852_36916 = state_34824;
(statearr_34852_36916[(1)] = cljs.core.first((state_34824[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36917 = state_34824;
state_34824 = G__36917;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$state_machine__34096__auto__ = function(state_34824){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__34096__auto____1.call(this,state_34824);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__34096__auto____0;
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__34096__auto____1;
return cljs$core$async$state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_34854 = f__34472__auto__();
(statearr_34854[(6)] = c__34471__auto___36878);

return statearr_34854;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
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
var process__$1 = (function (p__34856){
var vec__34857 = p__34856;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34857,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34857,(1),null);
var job = vec__34857;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__34471__auto___36923 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_34865){
var state_val_34866 = (state_34865[(1)]);
if((state_val_34866 === (1))){
var state_34865__$1 = state_34865;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_34865__$1,(2),res,v);
} else {
if((state_val_34866 === (2))){
var inst_34862 = (state_34865[(2)]);
var inst_34863 = cljs.core.async.close_BANG_(res);
var state_34865__$1 = (function (){var statearr_34867 = state_34865;
(statearr_34867[(7)] = inst_34862);

return statearr_34867;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_34865__$1,inst_34863);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0 = (function (){
var statearr_34868 = [null,null,null,null,null,null,null,null];
(statearr_34868[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__);

(statearr_34868[(1)] = (1));

return statearr_34868;
});
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1 = (function (state_34865){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_34865);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e34870){var ex__34099__auto__ = e34870;
var statearr_34871_36932 = state_34865;
(statearr_34871_36932[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_34865[(4)]))){
var statearr_34872_36933 = state_34865;
(statearr_34872_36933[(1)] = cljs.core.first((state_34865[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36934 = state_34865;
state_34865 = G__36934;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__ = function(state_34865){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1.call(this,state_34865);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_34873 = f__34472__auto__();
(statearr_34873[(6)] = c__34471__auto___36923);

return statearr_34873;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__34874){
var vec__34875 = p__34874;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34875,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34875,(1),null);
var job = vec__34875;
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
var n__5616__auto___36935 = n;
var __36936 = (0);
while(true){
if((__36936 < n__5616__auto___36935)){
var G__34879_36938 = type;
var G__34879_36939__$1 = (((G__34879_36938 instanceof cljs.core.Keyword))?G__34879_36938.fqn:null);
switch (G__34879_36939__$1) {
case "compute":
var c__34471__auto___36944 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__36936,c__34471__auto___36944,G__34879_36938,G__34879_36939__$1,n__5616__auto___36935,jobs,results,process__$1,async){
return (function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = ((function (__36936,c__34471__auto___36944,G__34879_36938,G__34879_36939__$1,n__5616__auto___36935,jobs,results,process__$1,async){
return (function (state_34893){
var state_val_34894 = (state_34893[(1)]);
if((state_val_34894 === (1))){
var state_34893__$1 = state_34893;
var statearr_34895_36945 = state_34893__$1;
(statearr_34895_36945[(2)] = null);

(statearr_34895_36945[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34894 === (2))){
var state_34893__$1 = state_34893;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34893__$1,(4),jobs);
} else {
if((state_val_34894 === (3))){
var inst_34891 = (state_34893[(2)]);
var state_34893__$1 = state_34893;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34893__$1,inst_34891);
} else {
if((state_val_34894 === (4))){
var inst_34882 = (state_34893[(2)]);
var inst_34883 = process__$1(inst_34882);
var state_34893__$1 = state_34893;
if(cljs.core.truth_(inst_34883)){
var statearr_34896_36949 = state_34893__$1;
(statearr_34896_36949[(1)] = (5));

} else {
var statearr_34897_36950 = state_34893__$1;
(statearr_34897_36950[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34894 === (5))){
var state_34893__$1 = state_34893;
var statearr_34899_36951 = state_34893__$1;
(statearr_34899_36951[(2)] = null);

(statearr_34899_36951[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34894 === (6))){
var state_34893__$1 = state_34893;
var statearr_34900_36952 = state_34893__$1;
(statearr_34900_36952[(2)] = null);

(statearr_34900_36952[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34894 === (7))){
var inst_34889 = (state_34893[(2)]);
var state_34893__$1 = state_34893;
var statearr_34901_36953 = state_34893__$1;
(statearr_34901_36953[(2)] = inst_34889);

(statearr_34901_36953[(1)] = (3));


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
});})(__36936,c__34471__auto___36944,G__34879_36938,G__34879_36939__$1,n__5616__auto___36935,jobs,results,process__$1,async))
;
return ((function (__36936,switch__34095__auto__,c__34471__auto___36944,G__34879_36938,G__34879_36939__$1,n__5616__auto___36935,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0 = (function (){
var statearr_34902 = [null,null,null,null,null,null,null];
(statearr_34902[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__);

(statearr_34902[(1)] = (1));

return statearr_34902;
});
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1 = (function (state_34893){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_34893);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e34903){var ex__34099__auto__ = e34903;
var statearr_34904_36965 = state_34893;
(statearr_34904_36965[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_34893[(4)]))){
var statearr_34906_36969 = state_34893;
(statearr_34906_36969[(1)] = cljs.core.first((state_34893[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36970 = state_34893;
state_34893 = G__36970;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__ = function(state_34893){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1.call(this,state_34893);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__;
})()
;})(__36936,switch__34095__auto__,c__34471__auto___36944,G__34879_36938,G__34879_36939__$1,n__5616__auto___36935,jobs,results,process__$1,async))
})();
var state__34473__auto__ = (function (){var statearr_34907 = f__34472__auto__();
(statearr_34907[(6)] = c__34471__auto___36944);

return statearr_34907;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
});})(__36936,c__34471__auto___36944,G__34879_36938,G__34879_36939__$1,n__5616__auto___36935,jobs,results,process__$1,async))
);


break;
case "async":
var c__34471__auto___36971 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__36936,c__34471__auto___36971,G__34879_36938,G__34879_36939__$1,n__5616__auto___36935,jobs,results,process__$1,async){
return (function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = ((function (__36936,c__34471__auto___36971,G__34879_36938,G__34879_36939__$1,n__5616__auto___36935,jobs,results,process__$1,async){
return (function (state_34920){
var state_val_34921 = (state_34920[(1)]);
if((state_val_34921 === (1))){
var state_34920__$1 = state_34920;
var statearr_34923_36972 = state_34920__$1;
(statearr_34923_36972[(2)] = null);

(statearr_34923_36972[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34921 === (2))){
var state_34920__$1 = state_34920;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34920__$1,(4),jobs);
} else {
if((state_val_34921 === (3))){
var inst_34918 = (state_34920[(2)]);
var state_34920__$1 = state_34920;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34920__$1,inst_34918);
} else {
if((state_val_34921 === (4))){
var inst_34910 = (state_34920[(2)]);
var inst_34911 = async(inst_34910);
var state_34920__$1 = state_34920;
if(cljs.core.truth_(inst_34911)){
var statearr_34924_36973 = state_34920__$1;
(statearr_34924_36973[(1)] = (5));

} else {
var statearr_34925_36974 = state_34920__$1;
(statearr_34925_36974[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34921 === (5))){
var state_34920__$1 = state_34920;
var statearr_34926_36975 = state_34920__$1;
(statearr_34926_36975[(2)] = null);

(statearr_34926_36975[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34921 === (6))){
var state_34920__$1 = state_34920;
var statearr_34927_36976 = state_34920__$1;
(statearr_34927_36976[(2)] = null);

(statearr_34927_36976[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34921 === (7))){
var inst_34916 = (state_34920[(2)]);
var state_34920__$1 = state_34920;
var statearr_34928_36977 = state_34920__$1;
(statearr_34928_36977[(2)] = inst_34916);

(statearr_34928_36977[(1)] = (3));


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
});})(__36936,c__34471__auto___36971,G__34879_36938,G__34879_36939__$1,n__5616__auto___36935,jobs,results,process__$1,async))
;
return ((function (__36936,switch__34095__auto__,c__34471__auto___36971,G__34879_36938,G__34879_36939__$1,n__5616__auto___36935,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0 = (function (){
var statearr_34930 = [null,null,null,null,null,null,null];
(statearr_34930[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__);

(statearr_34930[(1)] = (1));

return statearr_34930;
});
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1 = (function (state_34920){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_34920);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e34931){var ex__34099__auto__ = e34931;
var statearr_34932_36978 = state_34920;
(statearr_34932_36978[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_34920[(4)]))){
var statearr_34933_36979 = state_34920;
(statearr_34933_36979[(1)] = cljs.core.first((state_34920[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36980 = state_34920;
state_34920 = G__36980;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__ = function(state_34920){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1.call(this,state_34920);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__;
})()
;})(__36936,switch__34095__auto__,c__34471__auto___36971,G__34879_36938,G__34879_36939__$1,n__5616__auto___36935,jobs,results,process__$1,async))
})();
var state__34473__auto__ = (function (){var statearr_34934 = f__34472__auto__();
(statearr_34934[(6)] = c__34471__auto___36971);

return statearr_34934;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
});})(__36936,c__34471__auto___36971,G__34879_36938,G__34879_36939__$1,n__5616__auto___36935,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__34879_36939__$1)].join('')));

}

var G__36981 = (__36936 + (1));
__36936 = G__36981;
continue;
} else {
}
break;
}

var c__34471__auto___36982 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_34957){
var state_val_34958 = (state_34957[(1)]);
if((state_val_34958 === (7))){
var inst_34953 = (state_34957[(2)]);
var state_34957__$1 = state_34957;
var statearr_34960_36987 = state_34957__$1;
(statearr_34960_36987[(2)] = inst_34953);

(statearr_34960_36987[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34958 === (1))){
var state_34957__$1 = state_34957;
var statearr_34961_36988 = state_34957__$1;
(statearr_34961_36988[(2)] = null);

(statearr_34961_36988[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34958 === (4))){
var inst_34937 = (state_34957[(7)]);
var inst_34937__$1 = (state_34957[(2)]);
var inst_34939 = (inst_34937__$1 == null);
var state_34957__$1 = (function (){var statearr_34962 = state_34957;
(statearr_34962[(7)] = inst_34937__$1);

return statearr_34962;
})();
if(cljs.core.truth_(inst_34939)){
var statearr_34963_36989 = state_34957__$1;
(statearr_34963_36989[(1)] = (5));

} else {
var statearr_34964_36993 = state_34957__$1;
(statearr_34964_36993[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34958 === (6))){
var inst_34937 = (state_34957[(7)]);
var inst_34943 = (state_34957[(8)]);
var inst_34943__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_34944 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_34945 = [inst_34937,inst_34943__$1];
var inst_34946 = (new cljs.core.PersistentVector(null,2,(5),inst_34944,inst_34945,null));
var state_34957__$1 = (function (){var statearr_34965 = state_34957;
(statearr_34965[(8)] = inst_34943__$1);

return statearr_34965;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_34957__$1,(8),jobs,inst_34946);
} else {
if((state_val_34958 === (3))){
var inst_34955 = (state_34957[(2)]);
var state_34957__$1 = state_34957;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34957__$1,inst_34955);
} else {
if((state_val_34958 === (2))){
var state_34957__$1 = state_34957;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34957__$1,(4),from);
} else {
if((state_val_34958 === (9))){
var inst_34950 = (state_34957[(2)]);
var state_34957__$1 = (function (){var statearr_34967 = state_34957;
(statearr_34967[(9)] = inst_34950);

return statearr_34967;
})();
var statearr_34968_36994 = state_34957__$1;
(statearr_34968_36994[(2)] = null);

(statearr_34968_36994[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34958 === (5))){
var inst_34941 = cljs.core.async.close_BANG_(jobs);
var state_34957__$1 = state_34957;
var statearr_34969_36995 = state_34957__$1;
(statearr_34969_36995[(2)] = inst_34941);

(statearr_34969_36995[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34958 === (8))){
var inst_34943 = (state_34957[(8)]);
var inst_34948 = (state_34957[(2)]);
var state_34957__$1 = (function (){var statearr_34970 = state_34957;
(statearr_34970[(10)] = inst_34948);

return statearr_34970;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_34957__$1,(9),results,inst_34943);
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
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0 = (function (){
var statearr_34971 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_34971[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__);

(statearr_34971[(1)] = (1));

return statearr_34971;
});
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1 = (function (state_34957){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_34957);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e34972){var ex__34099__auto__ = e34972;
var statearr_34973_36999 = state_34957;
(statearr_34973_36999[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_34957[(4)]))){
var statearr_34974_37000 = state_34957;
(statearr_34974_37000[(1)] = cljs.core.first((state_34957[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37001 = state_34957;
state_34957 = G__37001;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__ = function(state_34957){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1.call(this,state_34957);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_34976 = f__34472__auto__();
(statearr_34976[(6)] = c__34471__auto___36982);

return statearr_34976;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));


var c__34471__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_35015){
var state_val_35016 = (state_35015[(1)]);
if((state_val_35016 === (7))){
var inst_35011 = (state_35015[(2)]);
var state_35015__$1 = state_35015;
var statearr_35017_37002 = state_35015__$1;
(statearr_35017_37002[(2)] = inst_35011);

(statearr_35017_37002[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (20))){
var state_35015__$1 = state_35015;
var statearr_35018_37003 = state_35015__$1;
(statearr_35018_37003[(2)] = null);

(statearr_35018_37003[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (1))){
var state_35015__$1 = state_35015;
var statearr_35020_37007 = state_35015__$1;
(statearr_35020_37007[(2)] = null);

(statearr_35020_37007[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (4))){
var inst_34979 = (state_35015[(7)]);
var inst_34979__$1 = (state_35015[(2)]);
var inst_34980 = (inst_34979__$1 == null);
var state_35015__$1 = (function (){var statearr_35021 = state_35015;
(statearr_35021[(7)] = inst_34979__$1);

return statearr_35021;
})();
if(cljs.core.truth_(inst_34980)){
var statearr_35022_37008 = state_35015__$1;
(statearr_35022_37008[(1)] = (5));

} else {
var statearr_35023_37009 = state_35015__$1;
(statearr_35023_37009[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (15))){
var inst_34992 = (state_35015[(8)]);
var state_35015__$1 = state_35015;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35015__$1,(18),to,inst_34992);
} else {
if((state_val_35016 === (21))){
var inst_35006 = (state_35015[(2)]);
var state_35015__$1 = state_35015;
var statearr_35024_37010 = state_35015__$1;
(statearr_35024_37010[(2)] = inst_35006);

(statearr_35024_37010[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (13))){
var inst_35008 = (state_35015[(2)]);
var state_35015__$1 = (function (){var statearr_35025 = state_35015;
(statearr_35025[(9)] = inst_35008);

return statearr_35025;
})();
var statearr_35026_37011 = state_35015__$1;
(statearr_35026_37011[(2)] = null);

(statearr_35026_37011[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (6))){
var inst_34979 = (state_35015[(7)]);
var state_35015__$1 = state_35015;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35015__$1,(11),inst_34979);
} else {
if((state_val_35016 === (17))){
var inst_35000 = (state_35015[(2)]);
var state_35015__$1 = state_35015;
if(cljs.core.truth_(inst_35000)){
var statearr_35027_37012 = state_35015__$1;
(statearr_35027_37012[(1)] = (19));

} else {
var statearr_35028_37013 = state_35015__$1;
(statearr_35028_37013[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (3))){
var inst_35013 = (state_35015[(2)]);
var state_35015__$1 = state_35015;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35015__$1,inst_35013);
} else {
if((state_val_35016 === (12))){
var inst_34989 = (state_35015[(10)]);
var state_35015__$1 = state_35015;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35015__$1,(14),inst_34989);
} else {
if((state_val_35016 === (2))){
var state_35015__$1 = state_35015;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35015__$1,(4),results);
} else {
if((state_val_35016 === (19))){
var state_35015__$1 = state_35015;
var statearr_35030_37017 = state_35015__$1;
(statearr_35030_37017[(2)] = null);

(statearr_35030_37017[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (11))){
var inst_34989 = (state_35015[(2)]);
var state_35015__$1 = (function (){var statearr_35031 = state_35015;
(statearr_35031[(10)] = inst_34989);

return statearr_35031;
})();
var statearr_35032_37018 = state_35015__$1;
(statearr_35032_37018[(2)] = null);

(statearr_35032_37018[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (9))){
var state_35015__$1 = state_35015;
var statearr_35033_37019 = state_35015__$1;
(statearr_35033_37019[(2)] = null);

(statearr_35033_37019[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (5))){
var state_35015__$1 = state_35015;
if(cljs.core.truth_(close_QMARK_)){
var statearr_35034_37020 = state_35015__$1;
(statearr_35034_37020[(1)] = (8));

} else {
var statearr_35036_37021 = state_35015__$1;
(statearr_35036_37021[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (14))){
var inst_34992 = (state_35015[(8)]);
var inst_34994 = (state_35015[(11)]);
var inst_34992__$1 = (state_35015[(2)]);
var inst_34993 = (inst_34992__$1 == null);
var inst_34994__$1 = cljs.core.not(inst_34993);
var state_35015__$1 = (function (){var statearr_35037 = state_35015;
(statearr_35037[(8)] = inst_34992__$1);

(statearr_35037[(11)] = inst_34994__$1);

return statearr_35037;
})();
if(inst_34994__$1){
var statearr_35038_37022 = state_35015__$1;
(statearr_35038_37022[(1)] = (15));

} else {
var statearr_35039_37023 = state_35015__$1;
(statearr_35039_37023[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (16))){
var inst_34994 = (state_35015[(11)]);
var state_35015__$1 = state_35015;
var statearr_35040_37024 = state_35015__$1;
(statearr_35040_37024[(2)] = inst_34994);

(statearr_35040_37024[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (10))){
var inst_34986 = (state_35015[(2)]);
var state_35015__$1 = state_35015;
var statearr_35041_37026 = state_35015__$1;
(statearr_35041_37026[(2)] = inst_34986);

(statearr_35041_37026[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (18))){
var inst_34997 = (state_35015[(2)]);
var state_35015__$1 = state_35015;
var statearr_35043_37027 = state_35015__$1;
(statearr_35043_37027[(2)] = inst_34997);

(statearr_35043_37027[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35016 === (8))){
var inst_34983 = cljs.core.async.close_BANG_(to);
var state_35015__$1 = state_35015;
var statearr_35044_37028 = state_35015__$1;
(statearr_35044_37028[(2)] = inst_34983);

(statearr_35044_37028[(1)] = (10));


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
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0 = (function (){
var statearr_35045 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35045[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__);

(statearr_35045[(1)] = (1));

return statearr_35045;
});
var cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1 = (function (state_35015){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_35015);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e35046){var ex__34099__auto__ = e35046;
var statearr_35047_37032 = state_35015;
(statearr_35047_37032[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_35015[(4)]))){
var statearr_35048_37033 = state_35015;
(statearr_35048_37033[(1)] = cljs.core.first((state_35015[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37034 = state_35015;
state_35015 = G__37034;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__ = function(state_35015){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1.call(this,state_35015);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__34096__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_35049 = f__34472__auto__();
(statearr_35049[(6)] = c__34471__auto__);

return statearr_35049;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));

return c__34471__auto__;
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
var G__35052 = arguments.length;
switch (G__35052) {
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
var G__35055 = arguments.length;
switch (G__35055) {
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
var G__35058 = arguments.length;
switch (G__35058) {
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
var c__34471__auto___37045 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_35085){
var state_val_35086 = (state_35085[(1)]);
if((state_val_35086 === (7))){
var inst_35081 = (state_35085[(2)]);
var state_35085__$1 = state_35085;
var statearr_35088_37050 = state_35085__$1;
(statearr_35088_37050[(2)] = inst_35081);

(statearr_35088_37050[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35086 === (1))){
var state_35085__$1 = state_35085;
var statearr_35089_37054 = state_35085__$1;
(statearr_35089_37054[(2)] = null);

(statearr_35089_37054[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35086 === (4))){
var inst_35062 = (state_35085[(7)]);
var inst_35062__$1 = (state_35085[(2)]);
var inst_35063 = (inst_35062__$1 == null);
var state_35085__$1 = (function (){var statearr_35090 = state_35085;
(statearr_35090[(7)] = inst_35062__$1);

return statearr_35090;
})();
if(cljs.core.truth_(inst_35063)){
var statearr_35091_37055 = state_35085__$1;
(statearr_35091_37055[(1)] = (5));

} else {
var statearr_35092_37056 = state_35085__$1;
(statearr_35092_37056[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35086 === (13))){
var state_35085__$1 = state_35085;
var statearr_35093_37057 = state_35085__$1;
(statearr_35093_37057[(2)] = null);

(statearr_35093_37057[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35086 === (6))){
var inst_35062 = (state_35085[(7)]);
var inst_35068 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_35062) : p.call(null,inst_35062));
var state_35085__$1 = state_35085;
if(cljs.core.truth_(inst_35068)){
var statearr_35095_37059 = state_35085__$1;
(statearr_35095_37059[(1)] = (9));

} else {
var statearr_35096_37060 = state_35085__$1;
(statearr_35096_37060[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35086 === (3))){
var inst_35083 = (state_35085[(2)]);
var state_35085__$1 = state_35085;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35085__$1,inst_35083);
} else {
if((state_val_35086 === (12))){
var state_35085__$1 = state_35085;
var statearr_35097_37064 = state_35085__$1;
(statearr_35097_37064[(2)] = null);

(statearr_35097_37064[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35086 === (2))){
var state_35085__$1 = state_35085;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35085__$1,(4),ch);
} else {
if((state_val_35086 === (11))){
var inst_35062 = (state_35085[(7)]);
var inst_35072 = (state_35085[(2)]);
var state_35085__$1 = state_35085;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35085__$1,(8),inst_35072,inst_35062);
} else {
if((state_val_35086 === (9))){
var state_35085__$1 = state_35085;
var statearr_35098_37065 = state_35085__$1;
(statearr_35098_37065[(2)] = tc);

(statearr_35098_37065[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35086 === (5))){
var inst_35065 = cljs.core.async.close_BANG_(tc);
var inst_35066 = cljs.core.async.close_BANG_(fc);
var state_35085__$1 = (function (){var statearr_35099 = state_35085;
(statearr_35099[(8)] = inst_35065);

return statearr_35099;
})();
var statearr_35100_37066 = state_35085__$1;
(statearr_35100_37066[(2)] = inst_35066);

(statearr_35100_37066[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35086 === (14))){
var inst_35079 = (state_35085[(2)]);
var state_35085__$1 = state_35085;
var statearr_35101_37067 = state_35085__$1;
(statearr_35101_37067[(2)] = inst_35079);

(statearr_35101_37067[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35086 === (10))){
var state_35085__$1 = state_35085;
var statearr_35103_37072 = state_35085__$1;
(statearr_35103_37072[(2)] = fc);

(statearr_35103_37072[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35086 === (8))){
var inst_35074 = (state_35085[(2)]);
var state_35085__$1 = state_35085;
if(cljs.core.truth_(inst_35074)){
var statearr_35104_37073 = state_35085__$1;
(statearr_35104_37073[(1)] = (12));

} else {
var statearr_35105_37074 = state_35085__$1;
(statearr_35105_37074[(1)] = (13));

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
var cljs$core$async$state_machine__34096__auto__ = null;
var cljs$core$async$state_machine__34096__auto____0 = (function (){
var statearr_35106 = [null,null,null,null,null,null,null,null,null];
(statearr_35106[(0)] = cljs$core$async$state_machine__34096__auto__);

(statearr_35106[(1)] = (1));

return statearr_35106;
});
var cljs$core$async$state_machine__34096__auto____1 = (function (state_35085){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_35085);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e35107){var ex__34099__auto__ = e35107;
var statearr_35108_37082 = state_35085;
(statearr_35108_37082[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_35085[(4)]))){
var statearr_35109_37083 = state_35085;
(statearr_35109_37083[(1)] = cljs.core.first((state_35085[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37084 = state_35085;
state_35085 = G__37084;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$state_machine__34096__auto__ = function(state_35085){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__34096__auto____1.call(this,state_35085);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__34096__auto____0;
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__34096__auto____1;
return cljs$core$async$state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_35110 = f__34472__auto__();
(statearr_35110[(6)] = c__34471__auto___37045);

return statearr_35110;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
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
var c__34471__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_35134){
var state_val_35135 = (state_35134[(1)]);
if((state_val_35135 === (7))){
var inst_35130 = (state_35134[(2)]);
var state_35134__$1 = state_35134;
var statearr_35136_37088 = state_35134__$1;
(statearr_35136_37088[(2)] = inst_35130);

(statearr_35136_37088[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35135 === (1))){
var inst_35112 = init;
var inst_35113 = inst_35112;
var state_35134__$1 = (function (){var statearr_35137 = state_35134;
(statearr_35137[(7)] = inst_35113);

return statearr_35137;
})();
var statearr_35138_37089 = state_35134__$1;
(statearr_35138_37089[(2)] = null);

(statearr_35138_37089[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35135 === (4))){
var inst_35116 = (state_35134[(8)]);
var inst_35116__$1 = (state_35134[(2)]);
var inst_35117 = (inst_35116__$1 == null);
var state_35134__$1 = (function (){var statearr_35139 = state_35134;
(statearr_35139[(8)] = inst_35116__$1);

return statearr_35139;
})();
if(cljs.core.truth_(inst_35117)){
var statearr_35140_37090 = state_35134__$1;
(statearr_35140_37090[(1)] = (5));

} else {
var statearr_35142_37091 = state_35134__$1;
(statearr_35142_37091[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35135 === (6))){
var inst_35113 = (state_35134[(7)]);
var inst_35116 = (state_35134[(8)]);
var inst_35120 = (state_35134[(9)]);
var inst_35120__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_35113,inst_35116) : f.call(null,inst_35113,inst_35116));
var inst_35121 = cljs.core.reduced_QMARK_(inst_35120__$1);
var state_35134__$1 = (function (){var statearr_35143 = state_35134;
(statearr_35143[(9)] = inst_35120__$1);

return statearr_35143;
})();
if(inst_35121){
var statearr_35144_37092 = state_35134__$1;
(statearr_35144_37092[(1)] = (8));

} else {
var statearr_35145_37093 = state_35134__$1;
(statearr_35145_37093[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35135 === (3))){
var inst_35132 = (state_35134[(2)]);
var state_35134__$1 = state_35134;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35134__$1,inst_35132);
} else {
if((state_val_35135 === (2))){
var state_35134__$1 = state_35134;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35134__$1,(4),ch);
} else {
if((state_val_35135 === (9))){
var inst_35120 = (state_35134[(9)]);
var inst_35113 = inst_35120;
var state_35134__$1 = (function (){var statearr_35146 = state_35134;
(statearr_35146[(7)] = inst_35113);

return statearr_35146;
})();
var statearr_35147_37097 = state_35134__$1;
(statearr_35147_37097[(2)] = null);

(statearr_35147_37097[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35135 === (5))){
var inst_35113 = (state_35134[(7)]);
var state_35134__$1 = state_35134;
var statearr_35149_37101 = state_35134__$1;
(statearr_35149_37101[(2)] = inst_35113);

(statearr_35149_37101[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35135 === (10))){
var inst_35128 = (state_35134[(2)]);
var state_35134__$1 = state_35134;
var statearr_35150_37102 = state_35134__$1;
(statearr_35150_37102[(2)] = inst_35128);

(statearr_35150_37102[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35135 === (8))){
var inst_35120 = (state_35134[(9)]);
var inst_35123 = cljs.core.deref(inst_35120);
var state_35134__$1 = state_35134;
var statearr_35151_37103 = state_35134__$1;
(statearr_35151_37103[(2)] = inst_35123);

(statearr_35151_37103[(1)] = (10));


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
var cljs$core$async$reduce_$_state_machine__34096__auto__ = null;
var cljs$core$async$reduce_$_state_machine__34096__auto____0 = (function (){
var statearr_35152 = [null,null,null,null,null,null,null,null,null,null];
(statearr_35152[(0)] = cljs$core$async$reduce_$_state_machine__34096__auto__);

(statearr_35152[(1)] = (1));

return statearr_35152;
});
var cljs$core$async$reduce_$_state_machine__34096__auto____1 = (function (state_35134){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_35134);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e35153){var ex__34099__auto__ = e35153;
var statearr_35154_37104 = state_35134;
(statearr_35154_37104[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_35134[(4)]))){
var statearr_35155_37105 = state_35134;
(statearr_35155_37105[(1)] = cljs.core.first((state_35134[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37106 = state_35134;
state_35134 = G__37106;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__34096__auto__ = function(state_35134){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__34096__auto____1.call(this,state_35134);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__34096__auto____0;
cljs$core$async$reduce_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__34096__auto____1;
return cljs$core$async$reduce_$_state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_35157 = f__34472__auto__();
(statearr_35157[(6)] = c__34471__auto__);

return statearr_35157;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));

return c__34471__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__34471__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_35163){
var state_val_35164 = (state_35163[(1)]);
if((state_val_35164 === (1))){
var inst_35158 = cljs.core.async.reduce(f__$1,init,ch);
var state_35163__$1 = state_35163;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35163__$1,(2),inst_35158);
} else {
if((state_val_35164 === (2))){
var inst_35160 = (state_35163[(2)]);
var inst_35161 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_35160) : f__$1.call(null,inst_35160));
var state_35163__$1 = state_35163;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35163__$1,inst_35161);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__34096__auto__ = null;
var cljs$core$async$transduce_$_state_machine__34096__auto____0 = (function (){
var statearr_35166 = [null,null,null,null,null,null,null];
(statearr_35166[(0)] = cljs$core$async$transduce_$_state_machine__34096__auto__);

(statearr_35166[(1)] = (1));

return statearr_35166;
});
var cljs$core$async$transduce_$_state_machine__34096__auto____1 = (function (state_35163){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_35163);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e35167){var ex__34099__auto__ = e35167;
var statearr_35168_37107 = state_35163;
(statearr_35168_37107[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_35163[(4)]))){
var statearr_35169_37108 = state_35163;
(statearr_35169_37108[(1)] = cljs.core.first((state_35163[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37109 = state_35163;
state_35163 = G__37109;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__34096__auto__ = function(state_35163){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__34096__auto____1.call(this,state_35163);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__34096__auto____0;
cljs$core$async$transduce_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__34096__auto____1;
return cljs$core$async$transduce_$_state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_35170 = f__34472__auto__();
(statearr_35170[(6)] = c__34471__auto__);

return statearr_35170;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));

return c__34471__auto__;
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
var G__35173 = arguments.length;
switch (G__35173) {
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
var c__34471__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_35199){
var state_val_35200 = (state_35199[(1)]);
if((state_val_35200 === (7))){
var inst_35181 = (state_35199[(2)]);
var state_35199__$1 = state_35199;
var statearr_35201_37113 = state_35199__$1;
(statearr_35201_37113[(2)] = inst_35181);

(statearr_35201_37113[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35200 === (1))){
var inst_35174 = cljs.core.seq(coll);
var inst_35175 = inst_35174;
var state_35199__$1 = (function (){var statearr_35202 = state_35199;
(statearr_35202[(7)] = inst_35175);

return statearr_35202;
})();
var statearr_35203_37114 = state_35199__$1;
(statearr_35203_37114[(2)] = null);

(statearr_35203_37114[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35200 === (4))){
var inst_35175 = (state_35199[(7)]);
var inst_35179 = cljs.core.first(inst_35175);
var state_35199__$1 = state_35199;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35199__$1,(7),ch,inst_35179);
} else {
if((state_val_35200 === (13))){
var inst_35193 = (state_35199[(2)]);
var state_35199__$1 = state_35199;
var statearr_35205_37115 = state_35199__$1;
(statearr_35205_37115[(2)] = inst_35193);

(statearr_35205_37115[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35200 === (6))){
var inst_35184 = (state_35199[(2)]);
var state_35199__$1 = state_35199;
if(cljs.core.truth_(inst_35184)){
var statearr_35206_37116 = state_35199__$1;
(statearr_35206_37116[(1)] = (8));

} else {
var statearr_35207_37117 = state_35199__$1;
(statearr_35207_37117[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35200 === (3))){
var inst_35197 = (state_35199[(2)]);
var state_35199__$1 = state_35199;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35199__$1,inst_35197);
} else {
if((state_val_35200 === (12))){
var state_35199__$1 = state_35199;
var statearr_35208_37119 = state_35199__$1;
(statearr_35208_37119[(2)] = null);

(statearr_35208_37119[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35200 === (2))){
var inst_35175 = (state_35199[(7)]);
var state_35199__$1 = state_35199;
if(cljs.core.truth_(inst_35175)){
var statearr_35209_37120 = state_35199__$1;
(statearr_35209_37120[(1)] = (4));

} else {
var statearr_35210_37121 = state_35199__$1;
(statearr_35210_37121[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35200 === (11))){
var inst_35190 = cljs.core.async.close_BANG_(ch);
var state_35199__$1 = state_35199;
var statearr_35211_37122 = state_35199__$1;
(statearr_35211_37122[(2)] = inst_35190);

(statearr_35211_37122[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35200 === (9))){
var state_35199__$1 = state_35199;
if(cljs.core.truth_(close_QMARK_)){
var statearr_35212_37123 = state_35199__$1;
(statearr_35212_37123[(1)] = (11));

} else {
var statearr_35214_37124 = state_35199__$1;
(statearr_35214_37124[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35200 === (5))){
var inst_35175 = (state_35199[(7)]);
var state_35199__$1 = state_35199;
var statearr_35215_37126 = state_35199__$1;
(statearr_35215_37126[(2)] = inst_35175);

(statearr_35215_37126[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35200 === (10))){
var inst_35195 = (state_35199[(2)]);
var state_35199__$1 = state_35199;
var statearr_35216_37130 = state_35199__$1;
(statearr_35216_37130[(2)] = inst_35195);

(statearr_35216_37130[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35200 === (8))){
var inst_35175 = (state_35199[(7)]);
var inst_35186 = cljs.core.next(inst_35175);
var inst_35175__$1 = inst_35186;
var state_35199__$1 = (function (){var statearr_35217 = state_35199;
(statearr_35217[(7)] = inst_35175__$1);

return statearr_35217;
})();
var statearr_35218_37131 = state_35199__$1;
(statearr_35218_37131[(2)] = null);

(statearr_35218_37131[(1)] = (2));


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
var cljs$core$async$state_machine__34096__auto__ = null;
var cljs$core$async$state_machine__34096__auto____0 = (function (){
var statearr_35219 = [null,null,null,null,null,null,null,null];
(statearr_35219[(0)] = cljs$core$async$state_machine__34096__auto__);

(statearr_35219[(1)] = (1));

return statearr_35219;
});
var cljs$core$async$state_machine__34096__auto____1 = (function (state_35199){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_35199);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e35220){var ex__34099__auto__ = e35220;
var statearr_35221_37132 = state_35199;
(statearr_35221_37132[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_35199[(4)]))){
var statearr_35223_37133 = state_35199;
(statearr_35223_37133[(1)] = cljs.core.first((state_35199[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37134 = state_35199;
state_35199 = G__37134;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$state_machine__34096__auto__ = function(state_35199){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__34096__auto____1.call(this,state_35199);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__34096__auto____0;
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__34096__auto____1;
return cljs$core$async$state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_35224 = f__34472__auto__();
(statearr_35224[(6)] = c__34471__auto__);

return statearr_35224;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));

return c__34471__auto__;
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
var G__35228 = arguments.length;
switch (G__35228) {
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

var cljs$core$async$Mux$muxch_STAR_$dyn_37141 = (function (_){
var x__5373__auto__ = (((_ == null))?null:_);
var m__5374__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5374__auto__.call(null,_));
} else {
var m__5372__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5372__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_37141(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_37142 = (function (m,ch,close_QMARK_){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5374__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__5372__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5372__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_37142(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_37144 = (function (m,ch){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5374__auto__.call(null,m,ch));
} else {
var m__5372__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5372__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_37144(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_37145 = (function (m){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5374__auto__.call(null,m));
} else {
var m__5372__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5372__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_37145(m);
}
});


/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async35233 = (function (ch,cs,meta35234){
this.ch = ch;
this.cs = cs;
this.meta35234 = meta35234;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async35233.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_35235,meta35234__$1){
var self__ = this;
var _35235__$1 = this;
return (new cljs.core.async.t_cljs$core$async35233(self__.ch,self__.cs,meta35234__$1));
}));

(cljs.core.async.t_cljs$core$async35233.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_35235){
var self__ = this;
var _35235__$1 = this;
return self__.meta35234;
}));

(cljs.core.async.t_cljs$core$async35233.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35233.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async35233.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35233.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async35233.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async35233.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async35233.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta35234","meta35234",-2051322436,null)], null);
}));

(cljs.core.async.t_cljs$core$async35233.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async35233.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async35233");

(cljs.core.async.t_cljs$core$async35233.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async35233");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async35233.
 */
cljs.core.async.__GT_t_cljs$core$async35233 = (function cljs$core$async$__GT_t_cljs$core$async35233(ch,cs,meta35234){
return (new cljs.core.async.t_cljs$core$async35233(ch,cs,meta35234));
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
var m = (new cljs.core.async.t_cljs$core$async35233(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__34471__auto___37157 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_35382){
var state_val_35384 = (state_35382[(1)]);
if((state_val_35384 === (7))){
var inst_35377 = (state_35382[(2)]);
var state_35382__$1 = state_35382;
var statearr_35388_37158 = state_35382__$1;
(statearr_35388_37158[(2)] = inst_35377);

(statearr_35388_37158[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (20))){
var inst_35274 = (state_35382[(7)]);
var inst_35290 = cljs.core.first(inst_35274);
var inst_35291 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_35290,(0),null);
var inst_35292 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_35290,(1),null);
var state_35382__$1 = (function (){var statearr_35392 = state_35382;
(statearr_35392[(8)] = inst_35291);

return statearr_35392;
})();
if(cljs.core.truth_(inst_35292)){
var statearr_35393_37159 = state_35382__$1;
(statearr_35393_37159[(1)] = (22));

} else {
var statearr_35394_37160 = state_35382__$1;
(statearr_35394_37160[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (27))){
var inst_35320 = (state_35382[(9)]);
var inst_35322 = (state_35382[(10)]);
var inst_35327 = (state_35382[(11)]);
var inst_35238 = (state_35382[(12)]);
var inst_35327__$1 = cljs.core._nth(inst_35320,inst_35322);
var inst_35328 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_35327__$1,inst_35238,done);
var state_35382__$1 = (function (){var statearr_35399 = state_35382;
(statearr_35399[(11)] = inst_35327__$1);

return statearr_35399;
})();
if(cljs.core.truth_(inst_35328)){
var statearr_35400_37161 = state_35382__$1;
(statearr_35400_37161[(1)] = (30));

} else {
var statearr_35401_37165 = state_35382__$1;
(statearr_35401_37165[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (1))){
var state_35382__$1 = state_35382;
var statearr_35403_37166 = state_35382__$1;
(statearr_35403_37166[(2)] = null);

(statearr_35403_37166[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (24))){
var inst_35274 = (state_35382[(7)]);
var inst_35297 = (state_35382[(2)]);
var inst_35298 = cljs.core.next(inst_35274);
var inst_35250 = inst_35298;
var inst_35251 = null;
var inst_35252 = (0);
var inst_35253 = (0);
var state_35382__$1 = (function (){var statearr_35407 = state_35382;
(statearr_35407[(13)] = inst_35297);

(statearr_35407[(14)] = inst_35250);

(statearr_35407[(15)] = inst_35251);

(statearr_35407[(16)] = inst_35252);

(statearr_35407[(17)] = inst_35253);

return statearr_35407;
})();
var statearr_35408_37167 = state_35382__$1;
(statearr_35408_37167[(2)] = null);

(statearr_35408_37167[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (39))){
var state_35382__$1 = state_35382;
var statearr_35416_37168 = state_35382__$1;
(statearr_35416_37168[(2)] = null);

(statearr_35416_37168[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (4))){
var inst_35238 = (state_35382[(12)]);
var inst_35238__$1 = (state_35382[(2)]);
var inst_35239 = (inst_35238__$1 == null);
var state_35382__$1 = (function (){var statearr_35417 = state_35382;
(statearr_35417[(12)] = inst_35238__$1);

return statearr_35417;
})();
if(cljs.core.truth_(inst_35239)){
var statearr_35418_37169 = state_35382__$1;
(statearr_35418_37169[(1)] = (5));

} else {
var statearr_35419_37170 = state_35382__$1;
(statearr_35419_37170[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (15))){
var inst_35253 = (state_35382[(17)]);
var inst_35250 = (state_35382[(14)]);
var inst_35251 = (state_35382[(15)]);
var inst_35252 = (state_35382[(16)]);
var inst_35268 = (state_35382[(2)]);
var inst_35269 = (inst_35253 + (1));
var tmp35410 = inst_35252;
var tmp35411 = inst_35250;
var tmp35412 = inst_35251;
var inst_35250__$1 = tmp35411;
var inst_35251__$1 = tmp35412;
var inst_35252__$1 = tmp35410;
var inst_35253__$1 = inst_35269;
var state_35382__$1 = (function (){var statearr_35421 = state_35382;
(statearr_35421[(18)] = inst_35268);

(statearr_35421[(14)] = inst_35250__$1);

(statearr_35421[(15)] = inst_35251__$1);

(statearr_35421[(16)] = inst_35252__$1);

(statearr_35421[(17)] = inst_35253__$1);

return statearr_35421;
})();
var statearr_35425_37171 = state_35382__$1;
(statearr_35425_37171[(2)] = null);

(statearr_35425_37171[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (21))){
var inst_35301 = (state_35382[(2)]);
var state_35382__$1 = state_35382;
var statearr_35430_37172 = state_35382__$1;
(statearr_35430_37172[(2)] = inst_35301);

(statearr_35430_37172[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (31))){
var inst_35327 = (state_35382[(11)]);
var inst_35331 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_35327);
var state_35382__$1 = state_35382;
var statearr_35434_37173 = state_35382__$1;
(statearr_35434_37173[(2)] = inst_35331);

(statearr_35434_37173[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (32))){
var inst_35322 = (state_35382[(10)]);
var inst_35319 = (state_35382[(19)]);
var inst_35320 = (state_35382[(9)]);
var inst_35321 = (state_35382[(20)]);
var inst_35333 = (state_35382[(2)]);
var inst_35334 = (inst_35322 + (1));
var tmp35427 = inst_35320;
var tmp35428 = inst_35319;
var tmp35429 = inst_35321;
var inst_35319__$1 = tmp35428;
var inst_35320__$1 = tmp35427;
var inst_35321__$1 = tmp35429;
var inst_35322__$1 = inst_35334;
var state_35382__$1 = (function (){var statearr_35437 = state_35382;
(statearr_35437[(21)] = inst_35333);

(statearr_35437[(19)] = inst_35319__$1);

(statearr_35437[(9)] = inst_35320__$1);

(statearr_35437[(20)] = inst_35321__$1);

(statearr_35437[(10)] = inst_35322__$1);

return statearr_35437;
})();
var statearr_35438_37175 = state_35382__$1;
(statearr_35438_37175[(2)] = null);

(statearr_35438_37175[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (40))){
var inst_35347 = (state_35382[(22)]);
var inst_35353 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_35347);
var state_35382__$1 = state_35382;
var statearr_35442_37179 = state_35382__$1;
(statearr_35442_37179[(2)] = inst_35353);

(statearr_35442_37179[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (33))){
var inst_35337 = (state_35382[(23)]);
var inst_35340 = cljs.core.chunked_seq_QMARK_(inst_35337);
var state_35382__$1 = state_35382;
if(inst_35340){
var statearr_35443_37180 = state_35382__$1;
(statearr_35443_37180[(1)] = (36));

} else {
var statearr_35444_37181 = state_35382__$1;
(statearr_35444_37181[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (13))){
var inst_35262 = (state_35382[(24)]);
var inst_35265 = cljs.core.async.close_BANG_(inst_35262);
var state_35382__$1 = state_35382;
var statearr_35446_37182 = state_35382__$1;
(statearr_35446_37182[(2)] = inst_35265);

(statearr_35446_37182[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (22))){
var inst_35291 = (state_35382[(8)]);
var inst_35294 = cljs.core.async.close_BANG_(inst_35291);
var state_35382__$1 = state_35382;
var statearr_35451_37183 = state_35382__$1;
(statearr_35451_37183[(2)] = inst_35294);

(statearr_35451_37183[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (36))){
var inst_35337 = (state_35382[(23)]);
var inst_35342 = cljs.core.chunk_first(inst_35337);
var inst_35343 = cljs.core.chunk_rest(inst_35337);
var inst_35344 = cljs.core.count(inst_35342);
var inst_35319 = inst_35343;
var inst_35320 = inst_35342;
var inst_35321 = inst_35344;
var inst_35322 = (0);
var state_35382__$1 = (function (){var statearr_35452 = state_35382;
(statearr_35452[(19)] = inst_35319);

(statearr_35452[(9)] = inst_35320);

(statearr_35452[(20)] = inst_35321);

(statearr_35452[(10)] = inst_35322);

return statearr_35452;
})();
var statearr_35454_37185 = state_35382__$1;
(statearr_35454_37185[(2)] = null);

(statearr_35454_37185[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (41))){
var inst_35337 = (state_35382[(23)]);
var inst_35355 = (state_35382[(2)]);
var inst_35357 = cljs.core.next(inst_35337);
var inst_35319 = inst_35357;
var inst_35320 = null;
var inst_35321 = (0);
var inst_35322 = (0);
var state_35382__$1 = (function (){var statearr_35457 = state_35382;
(statearr_35457[(25)] = inst_35355);

(statearr_35457[(19)] = inst_35319);

(statearr_35457[(9)] = inst_35320);

(statearr_35457[(20)] = inst_35321);

(statearr_35457[(10)] = inst_35322);

return statearr_35457;
})();
var statearr_35460_37189 = state_35382__$1;
(statearr_35460_37189[(2)] = null);

(statearr_35460_37189[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (43))){
var state_35382__$1 = state_35382;
var statearr_35461_37190 = state_35382__$1;
(statearr_35461_37190[(2)] = null);

(statearr_35461_37190[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (29))){
var inst_35365 = (state_35382[(2)]);
var state_35382__$1 = state_35382;
var statearr_35463_37191 = state_35382__$1;
(statearr_35463_37191[(2)] = inst_35365);

(statearr_35463_37191[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (44))){
var inst_35374 = (state_35382[(2)]);
var state_35382__$1 = (function (){var statearr_35467 = state_35382;
(statearr_35467[(26)] = inst_35374);

return statearr_35467;
})();
var statearr_35468_37192 = state_35382__$1;
(statearr_35468_37192[(2)] = null);

(statearr_35468_37192[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (6))){
var inst_35311 = (state_35382[(27)]);
var inst_35310 = cljs.core.deref(cs);
var inst_35311__$1 = cljs.core.keys(inst_35310);
var inst_35312 = cljs.core.count(inst_35311__$1);
var inst_35313 = cljs.core.reset_BANG_(dctr,inst_35312);
var inst_35318 = cljs.core.seq(inst_35311__$1);
var inst_35319 = inst_35318;
var inst_35320 = null;
var inst_35321 = (0);
var inst_35322 = (0);
var state_35382__$1 = (function (){var statearr_35472 = state_35382;
(statearr_35472[(27)] = inst_35311__$1);

(statearr_35472[(28)] = inst_35313);

(statearr_35472[(19)] = inst_35319);

(statearr_35472[(9)] = inst_35320);

(statearr_35472[(20)] = inst_35321);

(statearr_35472[(10)] = inst_35322);

return statearr_35472;
})();
var statearr_35474_37194 = state_35382__$1;
(statearr_35474_37194[(2)] = null);

(statearr_35474_37194[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (28))){
var inst_35319 = (state_35382[(19)]);
var inst_35337 = (state_35382[(23)]);
var inst_35337__$1 = cljs.core.seq(inst_35319);
var state_35382__$1 = (function (){var statearr_35478 = state_35382;
(statearr_35478[(23)] = inst_35337__$1);

return statearr_35478;
})();
if(inst_35337__$1){
var statearr_35481_37195 = state_35382__$1;
(statearr_35481_37195[(1)] = (33));

} else {
var statearr_35482_37196 = state_35382__$1;
(statearr_35482_37196[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (25))){
var inst_35322 = (state_35382[(10)]);
var inst_35321 = (state_35382[(20)]);
var inst_35324 = (inst_35322 < inst_35321);
var inst_35325 = inst_35324;
var state_35382__$1 = state_35382;
if(cljs.core.truth_(inst_35325)){
var statearr_35484_37197 = state_35382__$1;
(statearr_35484_37197[(1)] = (27));

} else {
var statearr_35485_37198 = state_35382__$1;
(statearr_35485_37198[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (34))){
var state_35382__$1 = state_35382;
var statearr_35486_37199 = state_35382__$1;
(statearr_35486_37199[(2)] = null);

(statearr_35486_37199[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (17))){
var state_35382__$1 = state_35382;
var statearr_35493_37200 = state_35382__$1;
(statearr_35493_37200[(2)] = null);

(statearr_35493_37200[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (3))){
var inst_35379 = (state_35382[(2)]);
var state_35382__$1 = state_35382;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35382__$1,inst_35379);
} else {
if((state_val_35384 === (12))){
var inst_35306 = (state_35382[(2)]);
var state_35382__$1 = state_35382;
var statearr_35495_37201 = state_35382__$1;
(statearr_35495_37201[(2)] = inst_35306);

(statearr_35495_37201[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (2))){
var state_35382__$1 = state_35382;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35382__$1,(4),ch);
} else {
if((state_val_35384 === (23))){
var state_35382__$1 = state_35382;
var statearr_35499_37202 = state_35382__$1;
(statearr_35499_37202[(2)] = null);

(statearr_35499_37202[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (35))){
var inst_35363 = (state_35382[(2)]);
var state_35382__$1 = state_35382;
var statearr_35500_37203 = state_35382__$1;
(statearr_35500_37203[(2)] = inst_35363);

(statearr_35500_37203[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (19))){
var inst_35274 = (state_35382[(7)]);
var inst_35279 = cljs.core.chunk_first(inst_35274);
var inst_35280 = cljs.core.chunk_rest(inst_35274);
var inst_35281 = cljs.core.count(inst_35279);
var inst_35250 = inst_35280;
var inst_35251 = inst_35279;
var inst_35252 = inst_35281;
var inst_35253 = (0);
var state_35382__$1 = (function (){var statearr_35502 = state_35382;
(statearr_35502[(14)] = inst_35250);

(statearr_35502[(15)] = inst_35251);

(statearr_35502[(16)] = inst_35252);

(statearr_35502[(17)] = inst_35253);

return statearr_35502;
})();
var statearr_35506_37204 = state_35382__$1;
(statearr_35506_37204[(2)] = null);

(statearr_35506_37204[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (11))){
var inst_35250 = (state_35382[(14)]);
var inst_35274 = (state_35382[(7)]);
var inst_35274__$1 = cljs.core.seq(inst_35250);
var state_35382__$1 = (function (){var statearr_35509 = state_35382;
(statearr_35509[(7)] = inst_35274__$1);

return statearr_35509;
})();
if(inst_35274__$1){
var statearr_35511_37205 = state_35382__$1;
(statearr_35511_37205[(1)] = (16));

} else {
var statearr_35512_37206 = state_35382__$1;
(statearr_35512_37206[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (9))){
var inst_35308 = (state_35382[(2)]);
var state_35382__$1 = state_35382;
var statearr_35513_37207 = state_35382__$1;
(statearr_35513_37207[(2)] = inst_35308);

(statearr_35513_37207[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (5))){
var inst_35247 = cljs.core.deref(cs);
var inst_35248 = cljs.core.seq(inst_35247);
var inst_35250 = inst_35248;
var inst_35251 = null;
var inst_35252 = (0);
var inst_35253 = (0);
var state_35382__$1 = (function (){var statearr_35517 = state_35382;
(statearr_35517[(14)] = inst_35250);

(statearr_35517[(15)] = inst_35251);

(statearr_35517[(16)] = inst_35252);

(statearr_35517[(17)] = inst_35253);

return statearr_35517;
})();
var statearr_35518_37208 = state_35382__$1;
(statearr_35518_37208[(2)] = null);

(statearr_35518_37208[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (14))){
var state_35382__$1 = state_35382;
var statearr_35520_37213 = state_35382__$1;
(statearr_35520_37213[(2)] = null);

(statearr_35520_37213[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (45))){
var inst_35371 = (state_35382[(2)]);
var state_35382__$1 = state_35382;
var statearr_35521_37214 = state_35382__$1;
(statearr_35521_37214[(2)] = inst_35371);

(statearr_35521_37214[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (26))){
var inst_35311 = (state_35382[(27)]);
var inst_35367 = (state_35382[(2)]);
var inst_35368 = cljs.core.seq(inst_35311);
var state_35382__$1 = (function (){var statearr_35525 = state_35382;
(statearr_35525[(29)] = inst_35367);

return statearr_35525;
})();
if(inst_35368){
var statearr_35526_37219 = state_35382__$1;
(statearr_35526_37219[(1)] = (42));

} else {
var statearr_35527_37220 = state_35382__$1;
(statearr_35527_37220[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (16))){
var inst_35274 = (state_35382[(7)]);
var inst_35277 = cljs.core.chunked_seq_QMARK_(inst_35274);
var state_35382__$1 = state_35382;
if(inst_35277){
var statearr_35528_37221 = state_35382__$1;
(statearr_35528_37221[(1)] = (19));

} else {
var statearr_35530_37222 = state_35382__$1;
(statearr_35530_37222[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (38))){
var inst_35360 = (state_35382[(2)]);
var state_35382__$1 = state_35382;
var statearr_35531_37223 = state_35382__$1;
(statearr_35531_37223[(2)] = inst_35360);

(statearr_35531_37223[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (30))){
var state_35382__$1 = state_35382;
var statearr_35535_37228 = state_35382__$1;
(statearr_35535_37228[(2)] = null);

(statearr_35535_37228[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (10))){
var inst_35251 = (state_35382[(15)]);
var inst_35253 = (state_35382[(17)]);
var inst_35261 = cljs.core._nth(inst_35251,inst_35253);
var inst_35262 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_35261,(0),null);
var inst_35263 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_35261,(1),null);
var state_35382__$1 = (function (){var statearr_35536 = state_35382;
(statearr_35536[(24)] = inst_35262);

return statearr_35536;
})();
if(cljs.core.truth_(inst_35263)){
var statearr_35538_37230 = state_35382__$1;
(statearr_35538_37230[(1)] = (13));

} else {
var statearr_35539_37231 = state_35382__$1;
(statearr_35539_37231[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (18))){
var inst_35304 = (state_35382[(2)]);
var state_35382__$1 = state_35382;
var statearr_35540_37232 = state_35382__$1;
(statearr_35540_37232[(2)] = inst_35304);

(statearr_35540_37232[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (42))){
var state_35382__$1 = state_35382;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35382__$1,(45),dchan);
} else {
if((state_val_35384 === (37))){
var inst_35337 = (state_35382[(23)]);
var inst_35347 = (state_35382[(22)]);
var inst_35238 = (state_35382[(12)]);
var inst_35347__$1 = cljs.core.first(inst_35337);
var inst_35348 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_35347__$1,inst_35238,done);
var state_35382__$1 = (function (){var statearr_35549 = state_35382;
(statearr_35549[(22)] = inst_35347__$1);

return statearr_35549;
})();
if(cljs.core.truth_(inst_35348)){
var statearr_35551_37234 = state_35382__$1;
(statearr_35551_37234[(1)] = (39));

} else {
var statearr_35552_37235 = state_35382__$1;
(statearr_35552_37235[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35384 === (8))){
var inst_35253 = (state_35382[(17)]);
var inst_35252 = (state_35382[(16)]);
var inst_35255 = (inst_35253 < inst_35252);
var inst_35256 = inst_35255;
var state_35382__$1 = state_35382;
if(cljs.core.truth_(inst_35256)){
var statearr_35553_37236 = state_35382__$1;
(statearr_35553_37236[(1)] = (10));

} else {
var statearr_35555_37238 = state_35382__$1;
(statearr_35555_37238[(1)] = (11));

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
var cljs$core$async$mult_$_state_machine__34096__auto__ = null;
var cljs$core$async$mult_$_state_machine__34096__auto____0 = (function (){
var statearr_35560 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35560[(0)] = cljs$core$async$mult_$_state_machine__34096__auto__);

(statearr_35560[(1)] = (1));

return statearr_35560;
});
var cljs$core$async$mult_$_state_machine__34096__auto____1 = (function (state_35382){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_35382);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e35561){var ex__34099__auto__ = e35561;
var statearr_35564_37239 = state_35382;
(statearr_35564_37239[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_35382[(4)]))){
var statearr_35566_37240 = state_35382;
(statearr_35566_37240[(1)] = cljs.core.first((state_35382[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37242 = state_35382;
state_35382 = G__37242;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__34096__auto__ = function(state_35382){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__34096__auto____1.call(this,state_35382);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__34096__auto____0;
cljs$core$async$mult_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__34096__auto____1;
return cljs$core$async$mult_$_state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_35568 = f__34472__auto__();
(statearr_35568[(6)] = c__34471__auto___37157);

return statearr_35568;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
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
var G__35574 = arguments.length;
switch (G__35574) {
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

var cljs$core$async$Mix$admix_STAR_$dyn_37248 = (function (m,ch){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5374__auto__.call(null,m,ch));
} else {
var m__5372__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5372__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_37248(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_37249 = (function (m,ch){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5374__auto__.call(null,m,ch));
} else {
var m__5372__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5372__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_37249(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_37250 = (function (m){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5374__auto__.call(null,m));
} else {
var m__5372__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5372__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_37250(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_37251 = (function (m,state_map){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5374__auto__.call(null,m,state_map));
} else {
var m__5372__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5372__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_37251(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_37252 = (function (m,mode){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5374__auto__.call(null,m,mode));
} else {
var m__5372__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5372__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_37252(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5755__auto__ = [];
var len__5749__auto___37257 = arguments.length;
var i__5750__auto___37258 = (0);
while(true){
if((i__5750__auto___37258 < len__5749__auto___37257)){
args__5755__auto__.push((arguments[i__5750__auto___37258]));

var G__37259 = (i__5750__auto___37258 + (1));
i__5750__auto___37258 = G__37259;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((3) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5756__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__35636){
var map__35637 = p__35636;
var map__35637__$1 = cljs.core.__destructure_map(map__35637);
var opts = map__35637__$1;
var statearr_35638_37264 = state;
(statearr_35638_37264[(1)] = cont_block);


var temp__5823__auto__ = cljs.core.async.do_alts((function (val){
var statearr_35639_37266 = state;
(statearr_35639_37266[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5823__auto__)){
var cb = temp__5823__auto__;
var statearr_35641_37267 = state;
(statearr_35641_37267[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq35619){
var G__35621 = cljs.core.first(seq35619);
var seq35619__$1 = cljs.core.next(seq35619);
var G__35622 = cljs.core.first(seq35619__$1);
var seq35619__$2 = cljs.core.next(seq35619__$1);
var G__35623 = cljs.core.first(seq35619__$2);
var seq35619__$3 = cljs.core.next(seq35619__$2);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__35621,G__35622,G__35623,seq35619__$3);
}));


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async35675 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta35676){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta35676 = meta35676;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async35675.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_35677,meta35676__$1){
var self__ = this;
var _35677__$1 = this;
return (new cljs.core.async.t_cljs$core$async35675(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta35676__$1));
}));

(cljs.core.async.t_cljs$core$async35675.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_35677){
var self__ = this;
var _35677__$1 = this;
return self__.meta35676;
}));

(cljs.core.async.t_cljs$core$async35675.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35675.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async35675.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35675.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async35675.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async35675.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async35675.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async35675.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async35675.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta35676","meta35676",102263122,null)], null);
}));

(cljs.core.async.t_cljs$core$async35675.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async35675.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async35675");

(cljs.core.async.t_cljs$core$async35675.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async35675");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async35675.
 */
cljs.core.async.__GT_t_cljs$core$async35675 = (function cljs$core$async$__GT_t_cljs$core$async35675(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta35676){
return (new cljs.core.async.t_cljs$core$async35675(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta35676));
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
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (cljs.core.seq(solos))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (new cljs.core.async.t_cljs$core$async35675(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
var c__34471__auto___37292 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_35794){
var state_val_35795 = (state_35794[(1)]);
if((state_val_35795 === (7))){
var inst_35753 = (state_35794[(2)]);
var state_35794__$1 = state_35794;
if(cljs.core.truth_(inst_35753)){
var statearr_35796_37293 = state_35794__$1;
(statearr_35796_37293[(1)] = (8));

} else {
var statearr_35797_37294 = state_35794__$1;
(statearr_35797_37294[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (20))){
var inst_35746 = (state_35794[(7)]);
var state_35794__$1 = state_35794;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35794__$1,(23),out,inst_35746);
} else {
if((state_val_35795 === (1))){
var inst_35721 = calc_state();
var inst_35722 = cljs.core.__destructure_map(inst_35721);
var inst_35723 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_35722,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_35724 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_35722,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_35725 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_35722,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_35726 = inst_35721;
var state_35794__$1 = (function (){var statearr_35805 = state_35794;
(statearr_35805[(8)] = inst_35723);

(statearr_35805[(9)] = inst_35724);

(statearr_35805[(10)] = inst_35725);

(statearr_35805[(11)] = inst_35726);

return statearr_35805;
})();
var statearr_35806_37299 = state_35794__$1;
(statearr_35806_37299[(2)] = null);

(statearr_35806_37299[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (24))){
var inst_35733 = (state_35794[(12)]);
var inst_35726 = inst_35733;
var state_35794__$1 = (function (){var statearr_35808 = state_35794;
(statearr_35808[(11)] = inst_35726);

return statearr_35808;
})();
var statearr_35809_37300 = state_35794__$1;
(statearr_35809_37300[(2)] = null);

(statearr_35809_37300[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (4))){
var inst_35746 = (state_35794[(7)]);
var inst_35748 = (state_35794[(13)]);
var inst_35744 = (state_35794[(2)]);
var inst_35746__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_35744,(0),null);
var inst_35747 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_35744,(1),null);
var inst_35748__$1 = (inst_35746__$1 == null);
var state_35794__$1 = (function (){var statearr_35814 = state_35794;
(statearr_35814[(7)] = inst_35746__$1);

(statearr_35814[(14)] = inst_35747);

(statearr_35814[(13)] = inst_35748__$1);

return statearr_35814;
})();
if(cljs.core.truth_(inst_35748__$1)){
var statearr_35815_37305 = state_35794__$1;
(statearr_35815_37305[(1)] = (5));

} else {
var statearr_35816_37306 = state_35794__$1;
(statearr_35816_37306[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (15))){
var inst_35734 = (state_35794[(15)]);
var inst_35768 = (state_35794[(16)]);
var inst_35768__$1 = cljs.core.empty_QMARK_(inst_35734);
var state_35794__$1 = (function (){var statearr_35821 = state_35794;
(statearr_35821[(16)] = inst_35768__$1);

return statearr_35821;
})();
if(inst_35768__$1){
var statearr_35822_37307 = state_35794__$1;
(statearr_35822_37307[(1)] = (17));

} else {
var statearr_35823_37308 = state_35794__$1;
(statearr_35823_37308[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (21))){
var inst_35733 = (state_35794[(12)]);
var inst_35726 = inst_35733;
var state_35794__$1 = (function (){var statearr_35824 = state_35794;
(statearr_35824[(11)] = inst_35726);

return statearr_35824;
})();
var statearr_35825_37312 = state_35794__$1;
(statearr_35825_37312[(2)] = null);

(statearr_35825_37312[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (13))){
var inst_35760 = (state_35794[(2)]);
var inst_35761 = calc_state();
var inst_35726 = inst_35761;
var state_35794__$1 = (function (){var statearr_35829 = state_35794;
(statearr_35829[(17)] = inst_35760);

(statearr_35829[(11)] = inst_35726);

return statearr_35829;
})();
var statearr_35831_37317 = state_35794__$1;
(statearr_35831_37317[(2)] = null);

(statearr_35831_37317[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (22))){
var inst_35788 = (state_35794[(2)]);
var state_35794__$1 = state_35794;
var statearr_35832_37322 = state_35794__$1;
(statearr_35832_37322[(2)] = inst_35788);

(statearr_35832_37322[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (6))){
var inst_35747 = (state_35794[(14)]);
var inst_35751 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_35747,change);
var state_35794__$1 = state_35794;
var statearr_35833_37326 = state_35794__$1;
(statearr_35833_37326[(2)] = inst_35751);

(statearr_35833_37326[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (25))){
var state_35794__$1 = state_35794;
var statearr_35834_37327 = state_35794__$1;
(statearr_35834_37327[(2)] = null);

(statearr_35834_37327[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (17))){
var inst_35735 = (state_35794[(18)]);
var inst_35747 = (state_35794[(14)]);
var inst_35770 = (inst_35735.cljs$core$IFn$_invoke$arity$1 ? inst_35735.cljs$core$IFn$_invoke$arity$1(inst_35747) : inst_35735.call(null,inst_35747));
var inst_35771 = cljs.core.not(inst_35770);
var state_35794__$1 = state_35794;
var statearr_35835_37332 = state_35794__$1;
(statearr_35835_37332[(2)] = inst_35771);

(statearr_35835_37332[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (3))){
var inst_35792 = (state_35794[(2)]);
var state_35794__$1 = state_35794;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35794__$1,inst_35792);
} else {
if((state_val_35795 === (12))){
var state_35794__$1 = state_35794;
var statearr_35836_37333 = state_35794__$1;
(statearr_35836_37333[(2)] = null);

(statearr_35836_37333[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (2))){
var inst_35726 = (state_35794[(11)]);
var inst_35733 = (state_35794[(12)]);
var inst_35733__$1 = cljs.core.__destructure_map(inst_35726);
var inst_35734 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_35733__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_35735 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_35733__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_35736 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_35733__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_35794__$1 = (function (){var statearr_35841 = state_35794;
(statearr_35841[(12)] = inst_35733__$1);

(statearr_35841[(15)] = inst_35734);

(statearr_35841[(18)] = inst_35735);

return statearr_35841;
})();
return cljs.core.async.ioc_alts_BANG_(state_35794__$1,(4),inst_35736);
} else {
if((state_val_35795 === (23))){
var inst_35779 = (state_35794[(2)]);
var state_35794__$1 = state_35794;
if(cljs.core.truth_(inst_35779)){
var statearr_35842_37337 = state_35794__$1;
(statearr_35842_37337[(1)] = (24));

} else {
var statearr_35843_37338 = state_35794__$1;
(statearr_35843_37338[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (19))){
var inst_35774 = (state_35794[(2)]);
var state_35794__$1 = state_35794;
var statearr_35845_37342 = state_35794__$1;
(statearr_35845_37342[(2)] = inst_35774);

(statearr_35845_37342[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (11))){
var inst_35747 = (state_35794[(14)]);
var inst_35757 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_35747);
var state_35794__$1 = state_35794;
var statearr_35846_37344 = state_35794__$1;
(statearr_35846_37344[(2)] = inst_35757);

(statearr_35846_37344[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (9))){
var inst_35734 = (state_35794[(15)]);
var inst_35747 = (state_35794[(14)]);
var inst_35764 = (state_35794[(19)]);
var inst_35764__$1 = (inst_35734.cljs$core$IFn$_invoke$arity$1 ? inst_35734.cljs$core$IFn$_invoke$arity$1(inst_35747) : inst_35734.call(null,inst_35747));
var state_35794__$1 = (function (){var statearr_35847 = state_35794;
(statearr_35847[(19)] = inst_35764__$1);

return statearr_35847;
})();
if(cljs.core.truth_(inst_35764__$1)){
var statearr_35848_37345 = state_35794__$1;
(statearr_35848_37345[(1)] = (14));

} else {
var statearr_35849_37347 = state_35794__$1;
(statearr_35849_37347[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (5))){
var inst_35748 = (state_35794[(13)]);
var state_35794__$1 = state_35794;
var statearr_35850_37349 = state_35794__$1;
(statearr_35850_37349[(2)] = inst_35748);

(statearr_35850_37349[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (14))){
var inst_35764 = (state_35794[(19)]);
var state_35794__$1 = state_35794;
var statearr_35851_37352 = state_35794__$1;
(statearr_35851_37352[(2)] = inst_35764);

(statearr_35851_37352[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (26))){
var inst_35784 = (state_35794[(2)]);
var state_35794__$1 = state_35794;
var statearr_35854_37353 = state_35794__$1;
(statearr_35854_37353[(2)] = inst_35784);

(statearr_35854_37353[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (16))){
var inst_35776 = (state_35794[(2)]);
var state_35794__$1 = state_35794;
if(cljs.core.truth_(inst_35776)){
var statearr_35855_37356 = state_35794__$1;
(statearr_35855_37356[(1)] = (20));

} else {
var statearr_35856_37357 = state_35794__$1;
(statearr_35856_37357[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (10))){
var inst_35790 = (state_35794[(2)]);
var state_35794__$1 = state_35794;
var statearr_35857_37358 = state_35794__$1;
(statearr_35857_37358[(2)] = inst_35790);

(statearr_35857_37358[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (18))){
var inst_35768 = (state_35794[(16)]);
var state_35794__$1 = state_35794;
var statearr_35858_37360 = state_35794__$1;
(statearr_35858_37360[(2)] = inst_35768);

(statearr_35858_37360[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35795 === (8))){
var inst_35746 = (state_35794[(7)]);
var inst_35755 = (inst_35746 == null);
var state_35794__$1 = state_35794;
if(cljs.core.truth_(inst_35755)){
var statearr_35859_37365 = state_35794__$1;
(statearr_35859_37365[(1)] = (11));

} else {
var statearr_35860_37366 = state_35794__$1;
(statearr_35860_37366[(1)] = (12));

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
var cljs$core$async$mix_$_state_machine__34096__auto__ = null;
var cljs$core$async$mix_$_state_machine__34096__auto____0 = (function (){
var statearr_35861 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35861[(0)] = cljs$core$async$mix_$_state_machine__34096__auto__);

(statearr_35861[(1)] = (1));

return statearr_35861;
});
var cljs$core$async$mix_$_state_machine__34096__auto____1 = (function (state_35794){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_35794);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e35862){var ex__34099__auto__ = e35862;
var statearr_35863_37367 = state_35794;
(statearr_35863_37367[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_35794[(4)]))){
var statearr_35864_37369 = state_35794;
(statearr_35864_37369[(1)] = cljs.core.first((state_35794[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37370 = state_35794;
state_35794 = G__37370;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__34096__auto__ = function(state_35794){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__34096__auto____1.call(this,state_35794);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__34096__auto____0;
cljs$core$async$mix_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__34096__auto____1;
return cljs$core$async$mix_$_state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_35865 = f__34472__auto__();
(statearr_35865[(6)] = c__34471__auto___37292);

return statearr_35865;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
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

var cljs$core$async$Pub$sub_STAR_$dyn_37374 = (function (p,v,ch,close_QMARK_){
var x__5373__auto__ = (((p == null))?null:p);
var m__5374__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5374__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__5372__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5372__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_37374(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_37401 = (function (p,v,ch){
var x__5373__auto__ = (((p == null))?null:p);
var m__5374__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5374__auto__.call(null,p,v,ch));
} else {
var m__5372__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5372__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_37401(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_37407 = (function() {
var G__37408 = null;
var G__37408__1 = (function (p){
var x__5373__auto__ = (((p == null))?null:p);
var m__5374__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5374__auto__.call(null,p));
} else {
var m__5372__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5372__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__37408__2 = (function (p,v){
var x__5373__auto__ = (((p == null))?null:p);
var m__5374__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5374__auto__.call(null,p,v));
} else {
var m__5372__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5372__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__37408 = function(p,v){
switch(arguments.length){
case 1:
return G__37408__1.call(this,p);
case 2:
return G__37408__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__37408.cljs$core$IFn$_invoke$arity$1 = G__37408__1;
G__37408.cljs$core$IFn$_invoke$arity$2 = G__37408__2;
return G__37408;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__35873 = arguments.length;
switch (G__35873) {
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
return cljs$core$async$Pub$unsub_all_STAR_$dyn_37407(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_37407(p,v);
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
cljs.core.async.t_cljs$core$async35883 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta35884){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta35884 = meta35884;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async35883.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_35885,meta35884__$1){
var self__ = this;
var _35885__$1 = this;
return (new cljs.core.async.t_cljs$core$async35883(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta35884__$1));
}));

(cljs.core.async.t_cljs$core$async35883.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_35885){
var self__ = this;
var _35885__$1 = this;
return self__.meta35884;
}));

(cljs.core.async.t_cljs$core$async35883.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35883.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async35883.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35883.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async35883.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5823__auto__)){
var m = temp__5823__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async35883.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async35883.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async35883.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta35884","meta35884",-1392489832,null)], null);
}));

(cljs.core.async.t_cljs$core$async35883.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async35883.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async35883");

(cljs.core.async.t_cljs$core$async35883.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async35883");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async35883.
 */
cljs.core.async.__GT_t_cljs$core$async35883 = (function cljs$core$async$__GT_t_cljs$core$async35883(ch,topic_fn,buf_fn,mults,ensure_mult,meta35884){
return (new cljs.core.async.t_cljs$core$async35883(ch,topic_fn,buf_fn,mults,ensure_mult,meta35884));
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
var G__35878 = arguments.length;
switch (G__35878) {
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
var or__5025__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__35874_SHARP_){
if(cljs.core.truth_((p1__35874_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__35874_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__35874_SHARP_.call(null,topic)))){
return p1__35874_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__35874_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (new cljs.core.async.t_cljs$core$async35883(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
var c__34471__auto___37474 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_35965){
var state_val_35966 = (state_35965[(1)]);
if((state_val_35966 === (7))){
var inst_35961 = (state_35965[(2)]);
var state_35965__$1 = state_35965;
var statearr_35980_37484 = state_35965__$1;
(statearr_35980_37484[(2)] = inst_35961);

(statearr_35980_37484[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (20))){
var state_35965__$1 = state_35965;
var statearr_35981_37485 = state_35965__$1;
(statearr_35981_37485[(2)] = null);

(statearr_35981_37485[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (1))){
var state_35965__$1 = state_35965;
var statearr_35982_37492 = state_35965__$1;
(statearr_35982_37492[(2)] = null);

(statearr_35982_37492[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (24))){
var inst_35944 = (state_35965[(7)]);
var inst_35953 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_35944);
var state_35965__$1 = state_35965;
var statearr_35989_37497 = state_35965__$1;
(statearr_35989_37497[(2)] = inst_35953);

(statearr_35989_37497[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (4))){
var inst_35893 = (state_35965[(8)]);
var inst_35893__$1 = (state_35965[(2)]);
var inst_35894 = (inst_35893__$1 == null);
var state_35965__$1 = (function (){var statearr_35990 = state_35965;
(statearr_35990[(8)] = inst_35893__$1);

return statearr_35990;
})();
if(cljs.core.truth_(inst_35894)){
var statearr_35991_37502 = state_35965__$1;
(statearr_35991_37502[(1)] = (5));

} else {
var statearr_35992_37503 = state_35965__$1;
(statearr_35992_37503[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (15))){
var inst_35938 = (state_35965[(2)]);
var state_35965__$1 = state_35965;
var statearr_35993_37508 = state_35965__$1;
(statearr_35993_37508[(2)] = inst_35938);

(statearr_35993_37508[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (21))){
var inst_35958 = (state_35965[(2)]);
var state_35965__$1 = (function (){var statearr_35994 = state_35965;
(statearr_35994[(9)] = inst_35958);

return statearr_35994;
})();
var statearr_35999_37510 = state_35965__$1;
(statearr_35999_37510[(2)] = null);

(statearr_35999_37510[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (13))){
var inst_35920 = (state_35965[(10)]);
var inst_35922 = cljs.core.chunked_seq_QMARK_(inst_35920);
var state_35965__$1 = state_35965;
if(inst_35922){
var statearr_36003_37515 = state_35965__$1;
(statearr_36003_37515[(1)] = (16));

} else {
var statearr_36004_37516 = state_35965__$1;
(statearr_36004_37516[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (22))){
var inst_35950 = (state_35965[(2)]);
var state_35965__$1 = state_35965;
if(cljs.core.truth_(inst_35950)){
var statearr_36008_37526 = state_35965__$1;
(statearr_36008_37526[(1)] = (23));

} else {
var statearr_36009_37527 = state_35965__$1;
(statearr_36009_37527[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (6))){
var inst_35893 = (state_35965[(8)]);
var inst_35944 = (state_35965[(7)]);
var inst_35946 = (state_35965[(11)]);
var inst_35944__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_35893) : topic_fn.call(null,inst_35893));
var inst_35945 = cljs.core.deref(mults);
var inst_35946__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_35945,inst_35944__$1);
var state_35965__$1 = (function (){var statearr_36013 = state_35965;
(statearr_36013[(7)] = inst_35944__$1);

(statearr_36013[(11)] = inst_35946__$1);

return statearr_36013;
})();
if(cljs.core.truth_(inst_35946__$1)){
var statearr_36014_37529 = state_35965__$1;
(statearr_36014_37529[(1)] = (19));

} else {
var statearr_36015_37535 = state_35965__$1;
(statearr_36015_37535[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (25))){
var inst_35955 = (state_35965[(2)]);
var state_35965__$1 = state_35965;
var statearr_36016_37541 = state_35965__$1;
(statearr_36016_37541[(2)] = inst_35955);

(statearr_36016_37541[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (17))){
var inst_35920 = (state_35965[(10)]);
var inst_35929 = cljs.core.first(inst_35920);
var inst_35930 = cljs.core.async.muxch_STAR_(inst_35929);
var inst_35931 = cljs.core.async.close_BANG_(inst_35930);
var inst_35932 = cljs.core.next(inst_35920);
var inst_35906 = inst_35932;
var inst_35907 = null;
var inst_35908 = (0);
var inst_35909 = (0);
var state_35965__$1 = (function (){var statearr_36017 = state_35965;
(statearr_36017[(12)] = inst_35931);

(statearr_36017[(13)] = inst_35906);

(statearr_36017[(14)] = inst_35907);

(statearr_36017[(15)] = inst_35908);

(statearr_36017[(16)] = inst_35909);

return statearr_36017;
})();
var statearr_36018_37553 = state_35965__$1;
(statearr_36018_37553[(2)] = null);

(statearr_36018_37553[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (3))){
var inst_35963 = (state_35965[(2)]);
var state_35965__$1 = state_35965;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35965__$1,inst_35963);
} else {
if((state_val_35966 === (12))){
var inst_35940 = (state_35965[(2)]);
var state_35965__$1 = state_35965;
var statearr_36019_37558 = state_35965__$1;
(statearr_36019_37558[(2)] = inst_35940);

(statearr_36019_37558[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (2))){
var state_35965__$1 = state_35965;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35965__$1,(4),ch);
} else {
if((state_val_35966 === (23))){
var state_35965__$1 = state_35965;
var statearr_36024_37559 = state_35965__$1;
(statearr_36024_37559[(2)] = null);

(statearr_36024_37559[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (19))){
var inst_35946 = (state_35965[(11)]);
var inst_35893 = (state_35965[(8)]);
var inst_35948 = cljs.core.async.muxch_STAR_(inst_35946);
var state_35965__$1 = state_35965;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35965__$1,(22),inst_35948,inst_35893);
} else {
if((state_val_35966 === (11))){
var inst_35906 = (state_35965[(13)]);
var inst_35920 = (state_35965[(10)]);
var inst_35920__$1 = cljs.core.seq(inst_35906);
var state_35965__$1 = (function (){var statearr_36025 = state_35965;
(statearr_36025[(10)] = inst_35920__$1);

return statearr_36025;
})();
if(inst_35920__$1){
var statearr_36026_37565 = state_35965__$1;
(statearr_36026_37565[(1)] = (13));

} else {
var statearr_36027_37566 = state_35965__$1;
(statearr_36027_37566[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (9))){
var inst_35942 = (state_35965[(2)]);
var state_35965__$1 = state_35965;
var statearr_36028_37567 = state_35965__$1;
(statearr_36028_37567[(2)] = inst_35942);

(statearr_36028_37567[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (5))){
var inst_35900 = cljs.core.deref(mults);
var inst_35901 = cljs.core.vals(inst_35900);
var inst_35902 = cljs.core.seq(inst_35901);
var inst_35906 = inst_35902;
var inst_35907 = null;
var inst_35908 = (0);
var inst_35909 = (0);
var state_35965__$1 = (function (){var statearr_36029 = state_35965;
(statearr_36029[(13)] = inst_35906);

(statearr_36029[(14)] = inst_35907);

(statearr_36029[(15)] = inst_35908);

(statearr_36029[(16)] = inst_35909);

return statearr_36029;
})();
var statearr_36030_37572 = state_35965__$1;
(statearr_36030_37572[(2)] = null);

(statearr_36030_37572[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (14))){
var state_35965__$1 = state_35965;
var statearr_36038_37573 = state_35965__$1;
(statearr_36038_37573[(2)] = null);

(statearr_36038_37573[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (16))){
var inst_35920 = (state_35965[(10)]);
var inst_35924 = cljs.core.chunk_first(inst_35920);
var inst_35925 = cljs.core.chunk_rest(inst_35920);
var inst_35926 = cljs.core.count(inst_35924);
var inst_35906 = inst_35925;
var inst_35907 = inst_35924;
var inst_35908 = inst_35926;
var inst_35909 = (0);
var state_35965__$1 = (function (){var statearr_36039 = state_35965;
(statearr_36039[(13)] = inst_35906);

(statearr_36039[(14)] = inst_35907);

(statearr_36039[(15)] = inst_35908);

(statearr_36039[(16)] = inst_35909);

return statearr_36039;
})();
var statearr_36042_37578 = state_35965__$1;
(statearr_36042_37578[(2)] = null);

(statearr_36042_37578[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (10))){
var inst_35907 = (state_35965[(14)]);
var inst_35909 = (state_35965[(16)]);
var inst_35906 = (state_35965[(13)]);
var inst_35908 = (state_35965[(15)]);
var inst_35914 = cljs.core._nth(inst_35907,inst_35909);
var inst_35915 = cljs.core.async.muxch_STAR_(inst_35914);
var inst_35916 = cljs.core.async.close_BANG_(inst_35915);
var inst_35917 = (inst_35909 + (1));
var tmp36032 = inst_35908;
var tmp36033 = inst_35906;
var tmp36034 = inst_35907;
var inst_35906__$1 = tmp36033;
var inst_35907__$1 = tmp36034;
var inst_35908__$1 = tmp36032;
var inst_35909__$1 = inst_35917;
var state_35965__$1 = (function (){var statearr_36044 = state_35965;
(statearr_36044[(17)] = inst_35916);

(statearr_36044[(13)] = inst_35906__$1);

(statearr_36044[(14)] = inst_35907__$1);

(statearr_36044[(15)] = inst_35908__$1);

(statearr_36044[(16)] = inst_35909__$1);

return statearr_36044;
})();
var statearr_36046_37589 = state_35965__$1;
(statearr_36046_37589[(2)] = null);

(statearr_36046_37589[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (18))){
var inst_35935 = (state_35965[(2)]);
var state_35965__$1 = state_35965;
var statearr_36047_37597 = state_35965__$1;
(statearr_36047_37597[(2)] = inst_35935);

(statearr_36047_37597[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35966 === (8))){
var inst_35909 = (state_35965[(16)]);
var inst_35908 = (state_35965[(15)]);
var inst_35911 = (inst_35909 < inst_35908);
var inst_35912 = inst_35911;
var state_35965__$1 = state_35965;
if(cljs.core.truth_(inst_35912)){
var statearr_36048_37609 = state_35965__$1;
(statearr_36048_37609[(1)] = (10));

} else {
var statearr_36049_37610 = state_35965__$1;
(statearr_36049_37610[(1)] = (11));

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
var cljs$core$async$state_machine__34096__auto__ = null;
var cljs$core$async$state_machine__34096__auto____0 = (function (){
var statearr_36050 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_36050[(0)] = cljs$core$async$state_machine__34096__auto__);

(statearr_36050[(1)] = (1));

return statearr_36050;
});
var cljs$core$async$state_machine__34096__auto____1 = (function (state_35965){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_35965);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e36051){var ex__34099__auto__ = e36051;
var statearr_36052_37612 = state_35965;
(statearr_36052_37612[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_35965[(4)]))){
var statearr_36053_37613 = state_35965;
(statearr_36053_37613[(1)] = cljs.core.first((state_35965[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37614 = state_35965;
state_35965 = G__37614;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$state_machine__34096__auto__ = function(state_35965){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__34096__auto____1.call(this,state_35965);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__34096__auto____0;
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__34096__auto____1;
return cljs$core$async$state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_36054 = f__34472__auto__();
(statearr_36054[(6)] = c__34471__auto___37474);

return statearr_36054;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
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
var G__36057 = arguments.length;
switch (G__36057) {
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
var G__36065 = arguments.length;
switch (G__36065) {
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
var G__36067 = arguments.length;
switch (G__36067) {
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
var c__34471__auto___37677 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_36115){
var state_val_36116 = (state_36115[(1)]);
if((state_val_36116 === (7))){
var state_36115__$1 = state_36115;
var statearr_36119_37687 = state_36115__$1;
(statearr_36119_37687[(2)] = null);

(statearr_36119_37687[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36116 === (1))){
var state_36115__$1 = state_36115;
var statearr_36120_37692 = state_36115__$1;
(statearr_36120_37692[(2)] = null);

(statearr_36120_37692[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36116 === (4))){
var inst_36071 = (state_36115[(7)]);
var inst_36070 = (state_36115[(8)]);
var inst_36073 = (inst_36071 < inst_36070);
var state_36115__$1 = state_36115;
if(cljs.core.truth_(inst_36073)){
var statearr_36121_37699 = state_36115__$1;
(statearr_36121_37699[(1)] = (6));

} else {
var statearr_36122_37702 = state_36115__$1;
(statearr_36122_37702[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36116 === (15))){
var inst_36101 = (state_36115[(9)]);
var inst_36106 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_36101);
var state_36115__$1 = state_36115;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_36115__$1,(17),out,inst_36106);
} else {
if((state_val_36116 === (13))){
var inst_36101 = (state_36115[(9)]);
var inst_36101__$1 = (state_36115[(2)]);
var inst_36102 = cljs.core.some(cljs.core.nil_QMARK_,inst_36101__$1);
var state_36115__$1 = (function (){var statearr_36124 = state_36115;
(statearr_36124[(9)] = inst_36101__$1);

return statearr_36124;
})();
if(cljs.core.truth_(inst_36102)){
var statearr_36126_37716 = state_36115__$1;
(statearr_36126_37716[(1)] = (14));

} else {
var statearr_36127_37717 = state_36115__$1;
(statearr_36127_37717[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36116 === (6))){
var state_36115__$1 = state_36115;
var statearr_36131_37718 = state_36115__$1;
(statearr_36131_37718[(2)] = null);

(statearr_36131_37718[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36116 === (17))){
var inst_36108 = (state_36115[(2)]);
var state_36115__$1 = (function (){var statearr_36133 = state_36115;
(statearr_36133[(10)] = inst_36108);

return statearr_36133;
})();
var statearr_36134_37721 = state_36115__$1;
(statearr_36134_37721[(2)] = null);

(statearr_36134_37721[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36116 === (3))){
var inst_36113 = (state_36115[(2)]);
var state_36115__$1 = state_36115;
return cljs.core.async.impl.ioc_helpers.return_chan(state_36115__$1,inst_36113);
} else {
if((state_val_36116 === (12))){
var _ = (function (){var statearr_36135 = state_36115;
(statearr_36135[(4)] = cljs.core.rest((state_36115[(4)])));

return statearr_36135;
})();
var state_36115__$1 = state_36115;
var ex36132 = (state_36115__$1[(2)]);
var statearr_36136_37725 = state_36115__$1;
(statearr_36136_37725[(5)] = ex36132);


if((ex36132 instanceof Object)){
var statearr_36137_37726 = state_36115__$1;
(statearr_36137_37726[(1)] = (11));

(statearr_36137_37726[(5)] = null);

} else {
throw ex36132;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36116 === (2))){
var inst_36069 = cljs.core.reset_BANG_(dctr,cnt);
var inst_36070 = cnt;
var inst_36071 = (0);
var state_36115__$1 = (function (){var statearr_36142 = state_36115;
(statearr_36142[(11)] = inst_36069);

(statearr_36142[(8)] = inst_36070);

(statearr_36142[(7)] = inst_36071);

return statearr_36142;
})();
var statearr_36143_37731 = state_36115__$1;
(statearr_36143_37731[(2)] = null);

(statearr_36143_37731[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36116 === (11))){
var inst_36079 = (state_36115[(2)]);
var inst_36080 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_36115__$1 = (function (){var statearr_36144 = state_36115;
(statearr_36144[(12)] = inst_36079);

return statearr_36144;
})();
var statearr_36145_37732 = state_36115__$1;
(statearr_36145_37732[(2)] = inst_36080);

(statearr_36145_37732[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36116 === (9))){
var inst_36071 = (state_36115[(7)]);
var _ = (function (){var statearr_36146 = state_36115;
(statearr_36146[(4)] = cljs.core.cons((12),(state_36115[(4)])));

return statearr_36146;
})();
var inst_36087 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_36071) : chs__$1.call(null,inst_36071));
var inst_36088 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_36071) : done.call(null,inst_36071));
var inst_36089 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_36087,inst_36088);
var ___$1 = (function (){var statearr_36147 = state_36115;
(statearr_36147[(4)] = cljs.core.rest((state_36115[(4)])));

return statearr_36147;
})();
var state_36115__$1 = state_36115;
var statearr_36152_37733 = state_36115__$1;
(statearr_36152_37733[(2)] = inst_36089);

(statearr_36152_37733[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36116 === (5))){
var inst_36099 = (state_36115[(2)]);
var state_36115__$1 = (function (){var statearr_36153 = state_36115;
(statearr_36153[(13)] = inst_36099);

return statearr_36153;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_36115__$1,(13),dchan);
} else {
if((state_val_36116 === (14))){
var inst_36104 = cljs.core.async.close_BANG_(out);
var state_36115__$1 = state_36115;
var statearr_36154_37734 = state_36115__$1;
(statearr_36154_37734[(2)] = inst_36104);

(statearr_36154_37734[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36116 === (16))){
var inst_36111 = (state_36115[(2)]);
var state_36115__$1 = state_36115;
var statearr_36155_37736 = state_36115__$1;
(statearr_36155_37736[(2)] = inst_36111);

(statearr_36155_37736[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36116 === (10))){
var inst_36071 = (state_36115[(7)]);
var inst_36092 = (state_36115[(2)]);
var inst_36093 = (inst_36071 + (1));
var inst_36071__$1 = inst_36093;
var state_36115__$1 = (function (){var statearr_36156 = state_36115;
(statearr_36156[(14)] = inst_36092);

(statearr_36156[(7)] = inst_36071__$1);

return statearr_36156;
})();
var statearr_36157_37739 = state_36115__$1;
(statearr_36157_37739[(2)] = null);

(statearr_36157_37739[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36116 === (8))){
var inst_36097 = (state_36115[(2)]);
var state_36115__$1 = state_36115;
var statearr_36158_37742 = state_36115__$1;
(statearr_36158_37742[(2)] = inst_36097);

(statearr_36158_37742[(1)] = (5));


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
var cljs$core$async$state_machine__34096__auto__ = null;
var cljs$core$async$state_machine__34096__auto____0 = (function (){
var statearr_36159 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_36159[(0)] = cljs$core$async$state_machine__34096__auto__);

(statearr_36159[(1)] = (1));

return statearr_36159;
});
var cljs$core$async$state_machine__34096__auto____1 = (function (state_36115){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_36115);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e36160){var ex__34099__auto__ = e36160;
var statearr_36161_37744 = state_36115;
(statearr_36161_37744[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_36115[(4)]))){
var statearr_36162_37747 = state_36115;
(statearr_36162_37747[(1)] = cljs.core.first((state_36115[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37750 = state_36115;
state_36115 = G__37750;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$state_machine__34096__auto__ = function(state_36115){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__34096__auto____1.call(this,state_36115);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__34096__auto____0;
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__34096__auto____1;
return cljs$core$async$state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_36163 = f__34472__auto__();
(statearr_36163[(6)] = c__34471__auto___37677);

return statearr_36163;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
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
var G__36168 = arguments.length;
switch (G__36168) {
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
var c__34471__auto___37755 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_36203){
var state_val_36204 = (state_36203[(1)]);
if((state_val_36204 === (7))){
var inst_36182 = (state_36203[(7)]);
var inst_36183 = (state_36203[(8)]);
var inst_36182__$1 = (state_36203[(2)]);
var inst_36183__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_36182__$1,(0),null);
var inst_36184 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_36182__$1,(1),null);
var inst_36185 = (inst_36183__$1 == null);
var state_36203__$1 = (function (){var statearr_36205 = state_36203;
(statearr_36205[(7)] = inst_36182__$1);

(statearr_36205[(8)] = inst_36183__$1);

(statearr_36205[(9)] = inst_36184);

return statearr_36205;
})();
if(cljs.core.truth_(inst_36185)){
var statearr_36206_37762 = state_36203__$1;
(statearr_36206_37762[(1)] = (8));

} else {
var statearr_36207_37765 = state_36203__$1;
(statearr_36207_37765[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36204 === (1))){
var inst_36169 = cljs.core.vec(chs);
var inst_36170 = inst_36169;
var state_36203__$1 = (function (){var statearr_36208 = state_36203;
(statearr_36208[(10)] = inst_36170);

return statearr_36208;
})();
var statearr_36209_37771 = state_36203__$1;
(statearr_36209_37771[(2)] = null);

(statearr_36209_37771[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36204 === (4))){
var inst_36170 = (state_36203[(10)]);
var state_36203__$1 = state_36203;
return cljs.core.async.ioc_alts_BANG_(state_36203__$1,(7),inst_36170);
} else {
if((state_val_36204 === (6))){
var inst_36199 = (state_36203[(2)]);
var state_36203__$1 = state_36203;
var statearr_36210_37773 = state_36203__$1;
(statearr_36210_37773[(2)] = inst_36199);

(statearr_36210_37773[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36204 === (3))){
var inst_36201 = (state_36203[(2)]);
var state_36203__$1 = state_36203;
return cljs.core.async.impl.ioc_helpers.return_chan(state_36203__$1,inst_36201);
} else {
if((state_val_36204 === (2))){
var inst_36170 = (state_36203[(10)]);
var inst_36175 = cljs.core.count(inst_36170);
var inst_36176 = (inst_36175 > (0));
var state_36203__$1 = state_36203;
if(cljs.core.truth_(inst_36176)){
var statearr_36212_37776 = state_36203__$1;
(statearr_36212_37776[(1)] = (4));

} else {
var statearr_36213_37777 = state_36203__$1;
(statearr_36213_37777[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36204 === (11))){
var inst_36170 = (state_36203[(10)]);
var inst_36192 = (state_36203[(2)]);
var tmp36211 = inst_36170;
var inst_36170__$1 = tmp36211;
var state_36203__$1 = (function (){var statearr_36214 = state_36203;
(statearr_36214[(11)] = inst_36192);

(statearr_36214[(10)] = inst_36170__$1);

return statearr_36214;
})();
var statearr_36215_37780 = state_36203__$1;
(statearr_36215_37780[(2)] = null);

(statearr_36215_37780[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36204 === (9))){
var inst_36183 = (state_36203[(8)]);
var state_36203__$1 = state_36203;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_36203__$1,(11),out,inst_36183);
} else {
if((state_val_36204 === (5))){
var inst_36197 = cljs.core.async.close_BANG_(out);
var state_36203__$1 = state_36203;
var statearr_36216_37784 = state_36203__$1;
(statearr_36216_37784[(2)] = inst_36197);

(statearr_36216_37784[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36204 === (10))){
var inst_36195 = (state_36203[(2)]);
var state_36203__$1 = state_36203;
var statearr_36217_37795 = state_36203__$1;
(statearr_36217_37795[(2)] = inst_36195);

(statearr_36217_37795[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36204 === (8))){
var inst_36170 = (state_36203[(10)]);
var inst_36182 = (state_36203[(7)]);
var inst_36183 = (state_36203[(8)]);
var inst_36184 = (state_36203[(9)]);
var inst_36187 = (function (){var cs = inst_36170;
var vec__36178 = inst_36182;
var v = inst_36183;
var c = inst_36184;
return (function (p1__36164_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__36164_SHARP_);
});
})();
var inst_36188 = cljs.core.filterv(inst_36187,inst_36170);
var inst_36170__$1 = inst_36188;
var state_36203__$1 = (function (){var statearr_36218 = state_36203;
(statearr_36218[(10)] = inst_36170__$1);

return statearr_36218;
})();
var statearr_36219_37798 = state_36203__$1;
(statearr_36219_37798[(2)] = null);

(statearr_36219_37798[(1)] = (2));


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
var cljs$core$async$state_machine__34096__auto__ = null;
var cljs$core$async$state_machine__34096__auto____0 = (function (){
var statearr_36220 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_36220[(0)] = cljs$core$async$state_machine__34096__auto__);

(statearr_36220[(1)] = (1));

return statearr_36220;
});
var cljs$core$async$state_machine__34096__auto____1 = (function (state_36203){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_36203);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e36221){var ex__34099__auto__ = e36221;
var statearr_36222_37802 = state_36203;
(statearr_36222_37802[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_36203[(4)]))){
var statearr_36223_37804 = state_36203;
(statearr_36223_37804[(1)] = cljs.core.first((state_36203[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37805 = state_36203;
state_36203 = G__37805;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$state_machine__34096__auto__ = function(state_36203){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__34096__auto____1.call(this,state_36203);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__34096__auto____0;
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__34096__auto____1;
return cljs$core$async$state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_36224 = f__34472__auto__();
(statearr_36224[(6)] = c__34471__auto___37755);

return statearr_36224;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
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
var G__36226 = arguments.length;
switch (G__36226) {
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
var c__34471__auto___37816 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_36250){
var state_val_36251 = (state_36250[(1)]);
if((state_val_36251 === (7))){
var inst_36232 = (state_36250[(7)]);
var inst_36232__$1 = (state_36250[(2)]);
var inst_36233 = (inst_36232__$1 == null);
var inst_36234 = cljs.core.not(inst_36233);
var state_36250__$1 = (function (){var statearr_36253 = state_36250;
(statearr_36253[(7)] = inst_36232__$1);

return statearr_36253;
})();
if(inst_36234){
var statearr_36254_37821 = state_36250__$1;
(statearr_36254_37821[(1)] = (8));

} else {
var statearr_36255_37822 = state_36250__$1;
(statearr_36255_37822[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36251 === (1))){
var inst_36227 = (0);
var state_36250__$1 = (function (){var statearr_36256 = state_36250;
(statearr_36256[(8)] = inst_36227);

return statearr_36256;
})();
var statearr_36257_37824 = state_36250__$1;
(statearr_36257_37824[(2)] = null);

(statearr_36257_37824[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36251 === (4))){
var state_36250__$1 = state_36250;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_36250__$1,(7),ch);
} else {
if((state_val_36251 === (6))){
var inst_36245 = (state_36250[(2)]);
var state_36250__$1 = state_36250;
var statearr_36258_37826 = state_36250__$1;
(statearr_36258_37826[(2)] = inst_36245);

(statearr_36258_37826[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36251 === (3))){
var inst_36247 = (state_36250[(2)]);
var inst_36248 = cljs.core.async.close_BANG_(out);
var state_36250__$1 = (function (){var statearr_36259 = state_36250;
(statearr_36259[(9)] = inst_36247);

return statearr_36259;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_36250__$1,inst_36248);
} else {
if((state_val_36251 === (2))){
var inst_36227 = (state_36250[(8)]);
var inst_36229 = (inst_36227 < n);
var state_36250__$1 = state_36250;
if(cljs.core.truth_(inst_36229)){
var statearr_36263_37830 = state_36250__$1;
(statearr_36263_37830[(1)] = (4));

} else {
var statearr_36264_37831 = state_36250__$1;
(statearr_36264_37831[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36251 === (11))){
var inst_36227 = (state_36250[(8)]);
var inst_36237 = (state_36250[(2)]);
var inst_36238 = (inst_36227 + (1));
var inst_36227__$1 = inst_36238;
var state_36250__$1 = (function (){var statearr_36265 = state_36250;
(statearr_36265[(10)] = inst_36237);

(statearr_36265[(8)] = inst_36227__$1);

return statearr_36265;
})();
var statearr_36266_37838 = state_36250__$1;
(statearr_36266_37838[(2)] = null);

(statearr_36266_37838[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36251 === (9))){
var state_36250__$1 = state_36250;
var statearr_36267_37839 = state_36250__$1;
(statearr_36267_37839[(2)] = null);

(statearr_36267_37839[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36251 === (5))){
var state_36250__$1 = state_36250;
var statearr_36268_37844 = state_36250__$1;
(statearr_36268_37844[(2)] = null);

(statearr_36268_37844[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36251 === (10))){
var inst_36242 = (state_36250[(2)]);
var state_36250__$1 = state_36250;
var statearr_36269_37851 = state_36250__$1;
(statearr_36269_37851[(2)] = inst_36242);

(statearr_36269_37851[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36251 === (8))){
var inst_36232 = (state_36250[(7)]);
var state_36250__$1 = state_36250;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_36250__$1,(11),out,inst_36232);
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
var cljs$core$async$state_machine__34096__auto__ = null;
var cljs$core$async$state_machine__34096__auto____0 = (function (){
var statearr_36274 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_36274[(0)] = cljs$core$async$state_machine__34096__auto__);

(statearr_36274[(1)] = (1));

return statearr_36274;
});
var cljs$core$async$state_machine__34096__auto____1 = (function (state_36250){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_36250);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e36275){var ex__34099__auto__ = e36275;
var statearr_36276_37864 = state_36250;
(statearr_36276_37864[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_36250[(4)]))){
var statearr_36277_37867 = state_36250;
(statearr_36277_37867[(1)] = cljs.core.first((state_36250[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37877 = state_36250;
state_36250 = G__37877;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$state_machine__34096__auto__ = function(state_36250){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__34096__auto____1.call(this,state_36250);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__34096__auto____0;
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__34096__auto____1;
return cljs$core$async$state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_36278 = f__34472__auto__();
(statearr_36278[(6)] = c__34471__auto___37816);

return statearr_36278;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
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
cljs.core.async.t_cljs$core$async36283 = (function (f,ch,meta36281,_,fn1,meta36284){
this.f = f;
this.ch = ch;
this.meta36281 = meta36281;
this._ = _;
this.fn1 = fn1;
this.meta36284 = meta36284;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async36283.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_36285,meta36284__$1){
var self__ = this;
var _36285__$1 = this;
return (new cljs.core.async.t_cljs$core$async36283(self__.f,self__.ch,self__.meta36281,self__._,self__.fn1,meta36284__$1));
}));

(cljs.core.async.t_cljs$core$async36283.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_36285){
var self__ = this;
var _36285__$1 = this;
return self__.meta36284;
}));

(cljs.core.async.t_cljs$core$async36283.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async36283.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async36283.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async36283.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__36279_SHARP_){
var G__36306 = (((p1__36279_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__36279_SHARP_) : self__.f.call(null,p1__36279_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__36306) : f1.call(null,G__36306));
});
}));

(cljs.core.async.t_cljs$core$async36283.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta36281","meta36281",-1585268573,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async36280","cljs.core.async/t_cljs$core$async36280",84944600,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta36284","meta36284",1525588755,null)], null);
}));

(cljs.core.async.t_cljs$core$async36283.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async36283.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async36283");

(cljs.core.async.t_cljs$core$async36283.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async36283");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async36283.
 */
cljs.core.async.__GT_t_cljs$core$async36283 = (function cljs$core$async$__GT_t_cljs$core$async36283(f,ch,meta36281,_,fn1,meta36284){
return (new cljs.core.async.t_cljs$core$async36283(f,ch,meta36281,_,fn1,meta36284));
});



/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async36280 = (function (f,ch,meta36281){
this.f = f;
this.ch = ch;
this.meta36281 = meta36281;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async36280.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_36282,meta36281__$1){
var self__ = this;
var _36282__$1 = this;
return (new cljs.core.async.t_cljs$core$async36280(self__.f,self__.ch,meta36281__$1));
}));

(cljs.core.async.t_cljs$core$async36280.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_36282){
var self__ = this;
var _36282__$1 = this;
return self__.meta36281;
}));

(cljs.core.async.t_cljs$core$async36280.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async36280.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async36280.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async36280.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async36280.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(new cljs.core.async.t_cljs$core$async36283(self__.f,self__.ch,self__.meta36281,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY)));
if(cljs.core.truth_((function (){var and__5023__auto__ = ret;
if(cljs.core.truth_(and__5023__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5023__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__36321 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__36321) : self__.f.call(null,G__36321));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async36280.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async36280.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async36280.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta36281","meta36281",-1585268573,null)], null);
}));

(cljs.core.async.t_cljs$core$async36280.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async36280.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async36280");

(cljs.core.async.t_cljs$core$async36280.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async36280");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async36280.
 */
cljs.core.async.__GT_t_cljs$core$async36280 = (function cljs$core$async$__GT_t_cljs$core$async36280(f,ch,meta36281){
return (new cljs.core.async.t_cljs$core$async36280(f,ch,meta36281));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
return (new cljs.core.async.t_cljs$core$async36280(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async36330 = (function (f,ch,meta36331){
this.f = f;
this.ch = ch;
this.meta36331 = meta36331;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async36330.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_36332,meta36331__$1){
var self__ = this;
var _36332__$1 = this;
return (new cljs.core.async.t_cljs$core$async36330(self__.f,self__.ch,meta36331__$1));
}));

(cljs.core.async.t_cljs$core$async36330.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_36332){
var self__ = this;
var _36332__$1 = this;
return self__.meta36331;
}));

(cljs.core.async.t_cljs$core$async36330.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async36330.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async36330.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async36330.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async36330.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async36330.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async36330.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta36331","meta36331",758452791,null)], null);
}));

(cljs.core.async.t_cljs$core$async36330.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async36330.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async36330");

(cljs.core.async.t_cljs$core$async36330.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async36330");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async36330.
 */
cljs.core.async.__GT_t_cljs$core$async36330 = (function cljs$core$async$__GT_t_cljs$core$async36330(f,ch,meta36331){
return (new cljs.core.async.t_cljs$core$async36330(f,ch,meta36331));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
return (new cljs.core.async.t_cljs$core$async36330(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async36337 = (function (p,ch,meta36338){
this.p = p;
this.ch = ch;
this.meta36338 = meta36338;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async36337.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_36339,meta36338__$1){
var self__ = this;
var _36339__$1 = this;
return (new cljs.core.async.t_cljs$core$async36337(self__.p,self__.ch,meta36338__$1));
}));

(cljs.core.async.t_cljs$core$async36337.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_36339){
var self__ = this;
var _36339__$1 = this;
return self__.meta36338;
}));

(cljs.core.async.t_cljs$core$async36337.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async36337.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async36337.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async36337.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async36337.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async36337.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async36337.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async36337.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta36338","meta36338",-1451819658,null)], null);
}));

(cljs.core.async.t_cljs$core$async36337.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async36337.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async36337");

(cljs.core.async.t_cljs$core$async36337.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async36337");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async36337.
 */
cljs.core.async.__GT_t_cljs$core$async36337 = (function cljs$core$async$__GT_t_cljs$core$async36337(p,ch,meta36338){
return (new cljs.core.async.t_cljs$core$async36337(p,ch,meta36338));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
return (new cljs.core.async.t_cljs$core$async36337(p,ch,cljs.core.PersistentArrayMap.EMPTY));
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
var G__36341 = arguments.length;
switch (G__36341) {
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
var c__34471__auto___37917 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_36362){
var state_val_36363 = (state_36362[(1)]);
if((state_val_36363 === (7))){
var inst_36358 = (state_36362[(2)]);
var state_36362__$1 = state_36362;
var statearr_36364_37920 = state_36362__$1;
(statearr_36364_37920[(2)] = inst_36358);

(statearr_36364_37920[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36363 === (1))){
var state_36362__$1 = state_36362;
var statearr_36365_37922 = state_36362__$1;
(statearr_36365_37922[(2)] = null);

(statearr_36365_37922[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36363 === (4))){
var inst_36344 = (state_36362[(7)]);
var inst_36344__$1 = (state_36362[(2)]);
var inst_36345 = (inst_36344__$1 == null);
var state_36362__$1 = (function (){var statearr_36366 = state_36362;
(statearr_36366[(7)] = inst_36344__$1);

return statearr_36366;
})();
if(cljs.core.truth_(inst_36345)){
var statearr_36367_37927 = state_36362__$1;
(statearr_36367_37927[(1)] = (5));

} else {
var statearr_36368_37932 = state_36362__$1;
(statearr_36368_37932[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36363 === (6))){
var inst_36344 = (state_36362[(7)]);
var inst_36349 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_36344) : p.call(null,inst_36344));
var state_36362__$1 = state_36362;
if(cljs.core.truth_(inst_36349)){
var statearr_36369_37938 = state_36362__$1;
(statearr_36369_37938[(1)] = (8));

} else {
var statearr_36370_37939 = state_36362__$1;
(statearr_36370_37939[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36363 === (3))){
var inst_36360 = (state_36362[(2)]);
var state_36362__$1 = state_36362;
return cljs.core.async.impl.ioc_helpers.return_chan(state_36362__$1,inst_36360);
} else {
if((state_val_36363 === (2))){
var state_36362__$1 = state_36362;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_36362__$1,(4),ch);
} else {
if((state_val_36363 === (11))){
var inst_36352 = (state_36362[(2)]);
var state_36362__$1 = state_36362;
var statearr_36379_37941 = state_36362__$1;
(statearr_36379_37941[(2)] = inst_36352);

(statearr_36379_37941[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36363 === (9))){
var state_36362__$1 = state_36362;
var statearr_36380_37946 = state_36362__$1;
(statearr_36380_37946[(2)] = null);

(statearr_36380_37946[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36363 === (5))){
var inst_36347 = cljs.core.async.close_BANG_(out);
var state_36362__$1 = state_36362;
var statearr_36384_37949 = state_36362__$1;
(statearr_36384_37949[(2)] = inst_36347);

(statearr_36384_37949[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36363 === (10))){
var inst_36355 = (state_36362[(2)]);
var state_36362__$1 = (function (){var statearr_36385 = state_36362;
(statearr_36385[(8)] = inst_36355);

return statearr_36385;
})();
var statearr_36386_37955 = state_36362__$1;
(statearr_36386_37955[(2)] = null);

(statearr_36386_37955[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36363 === (8))){
var inst_36344 = (state_36362[(7)]);
var state_36362__$1 = state_36362;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_36362__$1,(11),out,inst_36344);
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
var cljs$core$async$state_machine__34096__auto__ = null;
var cljs$core$async$state_machine__34096__auto____0 = (function (){
var statearr_36387 = [null,null,null,null,null,null,null,null,null];
(statearr_36387[(0)] = cljs$core$async$state_machine__34096__auto__);

(statearr_36387[(1)] = (1));

return statearr_36387;
});
var cljs$core$async$state_machine__34096__auto____1 = (function (state_36362){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_36362);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e36388){var ex__34099__auto__ = e36388;
var statearr_36389_37963 = state_36362;
(statearr_36389_37963[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_36362[(4)]))){
var statearr_36390_37964 = state_36362;
(statearr_36390_37964[(1)] = cljs.core.first((state_36362[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37965 = state_36362;
state_36362 = G__37965;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$state_machine__34096__auto__ = function(state_36362){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__34096__auto____1.call(this,state_36362);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__34096__auto____0;
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__34096__auto____1;
return cljs$core$async$state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_36391 = f__34472__auto__();
(statearr_36391[(6)] = c__34471__auto___37917);

return statearr_36391;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__36393 = arguments.length;
switch (G__36393) {
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
var c__34471__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_36456){
var state_val_36457 = (state_36456[(1)]);
if((state_val_36457 === (7))){
var inst_36452 = (state_36456[(2)]);
var state_36456__$1 = state_36456;
var statearr_36459_37971 = state_36456__$1;
(statearr_36459_37971[(2)] = inst_36452);

(statearr_36459_37971[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (20))){
var inst_36421 = (state_36456[(7)]);
var inst_36433 = (state_36456[(2)]);
var inst_36434 = cljs.core.next(inst_36421);
var inst_36407 = inst_36434;
var inst_36408 = null;
var inst_36409 = (0);
var inst_36410 = (0);
var state_36456__$1 = (function (){var statearr_36460 = state_36456;
(statearr_36460[(8)] = inst_36433);

(statearr_36460[(9)] = inst_36407);

(statearr_36460[(10)] = inst_36408);

(statearr_36460[(11)] = inst_36409);

(statearr_36460[(12)] = inst_36410);

return statearr_36460;
})();
var statearr_36461_37975 = state_36456__$1;
(statearr_36461_37975[(2)] = null);

(statearr_36461_37975[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (1))){
var state_36456__$1 = state_36456;
var statearr_36463_37976 = state_36456__$1;
(statearr_36463_37976[(2)] = null);

(statearr_36463_37976[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (4))){
var inst_36396 = (state_36456[(13)]);
var inst_36396__$1 = (state_36456[(2)]);
var inst_36397 = (inst_36396__$1 == null);
var state_36456__$1 = (function (){var statearr_36465 = state_36456;
(statearr_36465[(13)] = inst_36396__$1);

return statearr_36465;
})();
if(cljs.core.truth_(inst_36397)){
var statearr_36466_37977 = state_36456__$1;
(statearr_36466_37977[(1)] = (5));

} else {
var statearr_36467_37978 = state_36456__$1;
(statearr_36467_37978[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (15))){
var state_36456__$1 = state_36456;
var statearr_36471_37980 = state_36456__$1;
(statearr_36471_37980[(2)] = null);

(statearr_36471_37980[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (21))){
var state_36456__$1 = state_36456;
var statearr_36472_37986 = state_36456__$1;
(statearr_36472_37986[(2)] = null);

(statearr_36472_37986[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (13))){
var inst_36410 = (state_36456[(12)]);
var inst_36407 = (state_36456[(9)]);
var inst_36408 = (state_36456[(10)]);
var inst_36409 = (state_36456[(11)]);
var inst_36417 = (state_36456[(2)]);
var inst_36418 = (inst_36410 + (1));
var tmp36468 = inst_36408;
var tmp36469 = inst_36407;
var tmp36470 = inst_36409;
var inst_36407__$1 = tmp36469;
var inst_36408__$1 = tmp36468;
var inst_36409__$1 = tmp36470;
var inst_36410__$1 = inst_36418;
var state_36456__$1 = (function (){var statearr_36475 = state_36456;
(statearr_36475[(14)] = inst_36417);

(statearr_36475[(9)] = inst_36407__$1);

(statearr_36475[(10)] = inst_36408__$1);

(statearr_36475[(11)] = inst_36409__$1);

(statearr_36475[(12)] = inst_36410__$1);

return statearr_36475;
})();
var statearr_36476_37995 = state_36456__$1;
(statearr_36476_37995[(2)] = null);

(statearr_36476_37995[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (22))){
var state_36456__$1 = state_36456;
var statearr_36477_37997 = state_36456__$1;
(statearr_36477_37997[(2)] = null);

(statearr_36477_37997[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (6))){
var inst_36396 = (state_36456[(13)]);
var inst_36405 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_36396) : f.call(null,inst_36396));
var inst_36406 = cljs.core.seq(inst_36405);
var inst_36407 = inst_36406;
var inst_36408 = null;
var inst_36409 = (0);
var inst_36410 = (0);
var state_36456__$1 = (function (){var statearr_36480 = state_36456;
(statearr_36480[(9)] = inst_36407);

(statearr_36480[(10)] = inst_36408);

(statearr_36480[(11)] = inst_36409);

(statearr_36480[(12)] = inst_36410);

return statearr_36480;
})();
var statearr_36481_38002 = state_36456__$1;
(statearr_36481_38002[(2)] = null);

(statearr_36481_38002[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (17))){
var inst_36421 = (state_36456[(7)]);
var inst_36425 = cljs.core.chunk_first(inst_36421);
var inst_36426 = cljs.core.chunk_rest(inst_36421);
var inst_36427 = cljs.core.count(inst_36425);
var inst_36407 = inst_36426;
var inst_36408 = inst_36425;
var inst_36409 = inst_36427;
var inst_36410 = (0);
var state_36456__$1 = (function (){var statearr_36482 = state_36456;
(statearr_36482[(9)] = inst_36407);

(statearr_36482[(10)] = inst_36408);

(statearr_36482[(11)] = inst_36409);

(statearr_36482[(12)] = inst_36410);

return statearr_36482;
})();
var statearr_36483_38007 = state_36456__$1;
(statearr_36483_38007[(2)] = null);

(statearr_36483_38007[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (3))){
var inst_36454 = (state_36456[(2)]);
var state_36456__$1 = state_36456;
return cljs.core.async.impl.ioc_helpers.return_chan(state_36456__$1,inst_36454);
} else {
if((state_val_36457 === (12))){
var inst_36442 = (state_36456[(2)]);
var state_36456__$1 = state_36456;
var statearr_36484_38008 = state_36456__$1;
(statearr_36484_38008[(2)] = inst_36442);

(statearr_36484_38008[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (2))){
var state_36456__$1 = state_36456;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_36456__$1,(4),in$);
} else {
if((state_val_36457 === (23))){
var inst_36450 = (state_36456[(2)]);
var state_36456__$1 = state_36456;
var statearr_36485_38019 = state_36456__$1;
(statearr_36485_38019[(2)] = inst_36450);

(statearr_36485_38019[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (19))){
var inst_36437 = (state_36456[(2)]);
var state_36456__$1 = state_36456;
var statearr_36486_38029 = state_36456__$1;
(statearr_36486_38029[(2)] = inst_36437);

(statearr_36486_38029[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (11))){
var inst_36407 = (state_36456[(9)]);
var inst_36421 = (state_36456[(7)]);
var inst_36421__$1 = cljs.core.seq(inst_36407);
var state_36456__$1 = (function (){var statearr_36487 = state_36456;
(statearr_36487[(7)] = inst_36421__$1);

return statearr_36487;
})();
if(inst_36421__$1){
var statearr_36488_38035 = state_36456__$1;
(statearr_36488_38035[(1)] = (14));

} else {
var statearr_36489_38037 = state_36456__$1;
(statearr_36489_38037[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (9))){
var inst_36444 = (state_36456[(2)]);
var inst_36445 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_36456__$1 = (function (){var statearr_36490 = state_36456;
(statearr_36490[(15)] = inst_36444);

return statearr_36490;
})();
if(cljs.core.truth_(inst_36445)){
var statearr_36491_38038 = state_36456__$1;
(statearr_36491_38038[(1)] = (21));

} else {
var statearr_36492_38041 = state_36456__$1;
(statearr_36492_38041[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (5))){
var inst_36399 = cljs.core.async.close_BANG_(out);
var state_36456__$1 = state_36456;
var statearr_36493_38042 = state_36456__$1;
(statearr_36493_38042[(2)] = inst_36399);

(statearr_36493_38042[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (14))){
var inst_36421 = (state_36456[(7)]);
var inst_36423 = cljs.core.chunked_seq_QMARK_(inst_36421);
var state_36456__$1 = state_36456;
if(inst_36423){
var statearr_36494_38048 = state_36456__$1;
(statearr_36494_38048[(1)] = (17));

} else {
var statearr_36495_38050 = state_36456__$1;
(statearr_36495_38050[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (16))){
var inst_36440 = (state_36456[(2)]);
var state_36456__$1 = state_36456;
var statearr_36499_38052 = state_36456__$1;
(statearr_36499_38052[(2)] = inst_36440);

(statearr_36499_38052[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36457 === (10))){
var inst_36408 = (state_36456[(10)]);
var inst_36410 = (state_36456[(12)]);
var inst_36415 = cljs.core._nth(inst_36408,inst_36410);
var state_36456__$1 = state_36456;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_36456__$1,(13),out,inst_36415);
} else {
if((state_val_36457 === (18))){
var inst_36421 = (state_36456[(7)]);
var inst_36431 = cljs.core.first(inst_36421);
var state_36456__$1 = state_36456;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_36456__$1,(20),out,inst_36431);
} else {
if((state_val_36457 === (8))){
var inst_36410 = (state_36456[(12)]);
var inst_36409 = (state_36456[(11)]);
var inst_36412 = (inst_36410 < inst_36409);
var inst_36413 = inst_36412;
var state_36456__$1 = state_36456;
if(cljs.core.truth_(inst_36413)){
var statearr_36500_38055 = state_36456__$1;
(statearr_36500_38055[(1)] = (10));

} else {
var statearr_36501_38056 = state_36456__$1;
(statearr_36501_38056[(1)] = (11));

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
var cljs$core$async$mapcat_STAR__$_state_machine__34096__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__34096__auto____0 = (function (){
var statearr_36502 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_36502[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__34096__auto__);

(statearr_36502[(1)] = (1));

return statearr_36502;
});
var cljs$core$async$mapcat_STAR__$_state_machine__34096__auto____1 = (function (state_36456){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_36456);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e36503){var ex__34099__auto__ = e36503;
var statearr_36504_38068 = state_36456;
(statearr_36504_38068[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_36456[(4)]))){
var statearr_36508_38069 = state_36456;
(statearr_36508_38069[(1)] = cljs.core.first((state_36456[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38071 = state_36456;
state_36456 = G__38071;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__34096__auto__ = function(state_36456){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__34096__auto____1.call(this,state_36456);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__34096__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__34096__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_36516 = f__34472__auto__();
(statearr_36516[(6)] = c__34471__auto__);

return statearr_36516;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));

return c__34471__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__36521 = arguments.length;
switch (G__36521) {
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
var G__36533 = arguments.length;
switch (G__36533) {
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
var G__36552 = arguments.length;
switch (G__36552) {
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
var c__34471__auto___38089 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_36578){
var state_val_36579 = (state_36578[(1)]);
if((state_val_36579 === (7))){
var inst_36573 = (state_36578[(2)]);
var state_36578__$1 = state_36578;
var statearr_36580_38090 = state_36578__$1;
(statearr_36580_38090[(2)] = inst_36573);

(statearr_36580_38090[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36579 === (1))){
var inst_36555 = null;
var state_36578__$1 = (function (){var statearr_36581 = state_36578;
(statearr_36581[(7)] = inst_36555);

return statearr_36581;
})();
var statearr_36582_38096 = state_36578__$1;
(statearr_36582_38096[(2)] = null);

(statearr_36582_38096[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36579 === (4))){
var inst_36558 = (state_36578[(8)]);
var inst_36558__$1 = (state_36578[(2)]);
var inst_36559 = (inst_36558__$1 == null);
var inst_36560 = cljs.core.not(inst_36559);
var state_36578__$1 = (function (){var statearr_36583 = state_36578;
(statearr_36583[(8)] = inst_36558__$1);

return statearr_36583;
})();
if(inst_36560){
var statearr_36584_38099 = state_36578__$1;
(statearr_36584_38099[(1)] = (5));

} else {
var statearr_36585_38100 = state_36578__$1;
(statearr_36585_38100[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36579 === (6))){
var state_36578__$1 = state_36578;
var statearr_36586_38101 = state_36578__$1;
(statearr_36586_38101[(2)] = null);

(statearr_36586_38101[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36579 === (3))){
var inst_36575 = (state_36578[(2)]);
var inst_36576 = cljs.core.async.close_BANG_(out);
var state_36578__$1 = (function (){var statearr_36587 = state_36578;
(statearr_36587[(9)] = inst_36575);

return statearr_36587;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_36578__$1,inst_36576);
} else {
if((state_val_36579 === (2))){
var state_36578__$1 = state_36578;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_36578__$1,(4),ch);
} else {
if((state_val_36579 === (11))){
var inst_36558 = (state_36578[(8)]);
var inst_36567 = (state_36578[(2)]);
var inst_36555 = inst_36558;
var state_36578__$1 = (function (){var statearr_36588 = state_36578;
(statearr_36588[(10)] = inst_36567);

(statearr_36588[(7)] = inst_36555);

return statearr_36588;
})();
var statearr_36589_38110 = state_36578__$1;
(statearr_36589_38110[(2)] = null);

(statearr_36589_38110[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36579 === (9))){
var inst_36558 = (state_36578[(8)]);
var state_36578__$1 = state_36578;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_36578__$1,(11),out,inst_36558);
} else {
if((state_val_36579 === (5))){
var inst_36558 = (state_36578[(8)]);
var inst_36555 = (state_36578[(7)]);
var inst_36562 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_36558,inst_36555);
var state_36578__$1 = state_36578;
if(inst_36562){
var statearr_36591_38118 = state_36578__$1;
(statearr_36591_38118[(1)] = (8));

} else {
var statearr_36592_38120 = state_36578__$1;
(statearr_36592_38120[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36579 === (10))){
var inst_36570 = (state_36578[(2)]);
var state_36578__$1 = state_36578;
var statearr_36593_38125 = state_36578__$1;
(statearr_36593_38125[(2)] = inst_36570);

(statearr_36593_38125[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36579 === (8))){
var inst_36555 = (state_36578[(7)]);
var tmp36590 = inst_36555;
var inst_36555__$1 = tmp36590;
var state_36578__$1 = (function (){var statearr_36594 = state_36578;
(statearr_36594[(7)] = inst_36555__$1);

return statearr_36594;
})();
var statearr_36595_38131 = state_36578__$1;
(statearr_36595_38131[(2)] = null);

(statearr_36595_38131[(1)] = (2));


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
var cljs$core$async$state_machine__34096__auto__ = null;
var cljs$core$async$state_machine__34096__auto____0 = (function (){
var statearr_36596 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_36596[(0)] = cljs$core$async$state_machine__34096__auto__);

(statearr_36596[(1)] = (1));

return statearr_36596;
});
var cljs$core$async$state_machine__34096__auto____1 = (function (state_36578){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_36578);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e36597){var ex__34099__auto__ = e36597;
var statearr_36598_38144 = state_36578;
(statearr_36598_38144[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_36578[(4)]))){
var statearr_36599_38145 = state_36578;
(statearr_36599_38145[(1)] = cljs.core.first((state_36578[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38151 = state_36578;
state_36578 = G__38151;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$state_machine__34096__auto__ = function(state_36578){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__34096__auto____1.call(this,state_36578);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__34096__auto____0;
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__34096__auto____1;
return cljs$core$async$state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_36600 = f__34472__auto__();
(statearr_36600[(6)] = c__34471__auto___38089);

return statearr_36600;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__36604 = arguments.length;
switch (G__36604) {
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
var c__34471__auto___38161 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_36655){
var state_val_36656 = (state_36655[(1)]);
if((state_val_36656 === (7))){
var inst_36651 = (state_36655[(2)]);
var state_36655__$1 = state_36655;
var statearr_36657_38169 = state_36655__$1;
(statearr_36657_38169[(2)] = inst_36651);

(statearr_36657_38169[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36656 === (1))){
var inst_36616 = (new Array(n));
var inst_36617 = inst_36616;
var inst_36618 = (0);
var state_36655__$1 = (function (){var statearr_36658 = state_36655;
(statearr_36658[(7)] = inst_36617);

(statearr_36658[(8)] = inst_36618);

return statearr_36658;
})();
var statearr_36659_38174 = state_36655__$1;
(statearr_36659_38174[(2)] = null);

(statearr_36659_38174[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36656 === (4))){
var inst_36621 = (state_36655[(9)]);
var inst_36621__$1 = (state_36655[(2)]);
var inst_36622 = (inst_36621__$1 == null);
var inst_36623 = cljs.core.not(inst_36622);
var state_36655__$1 = (function (){var statearr_36660 = state_36655;
(statearr_36660[(9)] = inst_36621__$1);

return statearr_36660;
})();
if(inst_36623){
var statearr_36661_38181 = state_36655__$1;
(statearr_36661_38181[(1)] = (5));

} else {
var statearr_36662_38182 = state_36655__$1;
(statearr_36662_38182[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36656 === (15))){
var inst_36645 = (state_36655[(2)]);
var state_36655__$1 = state_36655;
var statearr_36663_38183 = state_36655__$1;
(statearr_36663_38183[(2)] = inst_36645);

(statearr_36663_38183[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36656 === (13))){
var state_36655__$1 = state_36655;
var statearr_36664_38186 = state_36655__$1;
(statearr_36664_38186[(2)] = null);

(statearr_36664_38186[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36656 === (6))){
var inst_36618 = (state_36655[(8)]);
var inst_36640 = (inst_36618 > (0));
var state_36655__$1 = state_36655;
if(cljs.core.truth_(inst_36640)){
var statearr_36665_38187 = state_36655__$1;
(statearr_36665_38187[(1)] = (12));

} else {
var statearr_36666_38188 = state_36655__$1;
(statearr_36666_38188[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36656 === (3))){
var inst_36653 = (state_36655[(2)]);
var state_36655__$1 = state_36655;
return cljs.core.async.impl.ioc_helpers.return_chan(state_36655__$1,inst_36653);
} else {
if((state_val_36656 === (12))){
var inst_36617 = (state_36655[(7)]);
var inst_36643 = cljs.core.vec(inst_36617);
var state_36655__$1 = state_36655;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_36655__$1,(15),out,inst_36643);
} else {
if((state_val_36656 === (2))){
var state_36655__$1 = state_36655;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_36655__$1,(4),ch);
} else {
if((state_val_36656 === (11))){
var inst_36633 = (state_36655[(2)]);
var inst_36634 = (new Array(n));
var inst_36617 = inst_36634;
var inst_36618 = (0);
var state_36655__$1 = (function (){var statearr_36667 = state_36655;
(statearr_36667[(10)] = inst_36633);

(statearr_36667[(7)] = inst_36617);

(statearr_36667[(8)] = inst_36618);

return statearr_36667;
})();
var statearr_36668_38212 = state_36655__$1;
(statearr_36668_38212[(2)] = null);

(statearr_36668_38212[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36656 === (9))){
var inst_36617 = (state_36655[(7)]);
var inst_36631 = cljs.core.vec(inst_36617);
var state_36655__$1 = state_36655;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_36655__$1,(11),out,inst_36631);
} else {
if((state_val_36656 === (5))){
var inst_36617 = (state_36655[(7)]);
var inst_36618 = (state_36655[(8)]);
var inst_36621 = (state_36655[(9)]);
var inst_36626 = (state_36655[(11)]);
var inst_36625 = (inst_36617[inst_36618] = inst_36621);
var inst_36626__$1 = (inst_36618 + (1));
var inst_36627 = (inst_36626__$1 < n);
var state_36655__$1 = (function (){var statearr_36671 = state_36655;
(statearr_36671[(12)] = inst_36625);

(statearr_36671[(11)] = inst_36626__$1);

return statearr_36671;
})();
if(cljs.core.truth_(inst_36627)){
var statearr_36672_38218 = state_36655__$1;
(statearr_36672_38218[(1)] = (8));

} else {
var statearr_36673_38222 = state_36655__$1;
(statearr_36673_38222[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36656 === (14))){
var inst_36648 = (state_36655[(2)]);
var inst_36649 = cljs.core.async.close_BANG_(out);
var state_36655__$1 = (function (){var statearr_36676 = state_36655;
(statearr_36676[(13)] = inst_36648);

return statearr_36676;
})();
var statearr_36677_38226 = state_36655__$1;
(statearr_36677_38226[(2)] = inst_36649);

(statearr_36677_38226[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36656 === (10))){
var inst_36637 = (state_36655[(2)]);
var state_36655__$1 = state_36655;
var statearr_36678_38230 = state_36655__$1;
(statearr_36678_38230[(2)] = inst_36637);

(statearr_36678_38230[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36656 === (8))){
var inst_36617 = (state_36655[(7)]);
var inst_36626 = (state_36655[(11)]);
var tmp36675 = inst_36617;
var inst_36617__$1 = tmp36675;
var inst_36618 = inst_36626;
var state_36655__$1 = (function (){var statearr_36679 = state_36655;
(statearr_36679[(7)] = inst_36617__$1);

(statearr_36679[(8)] = inst_36618);

return statearr_36679;
})();
var statearr_36680_38241 = state_36655__$1;
(statearr_36680_38241[(2)] = null);

(statearr_36680_38241[(1)] = (2));


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
var cljs$core$async$state_machine__34096__auto__ = null;
var cljs$core$async$state_machine__34096__auto____0 = (function (){
var statearr_36681 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_36681[(0)] = cljs$core$async$state_machine__34096__auto__);

(statearr_36681[(1)] = (1));

return statearr_36681;
});
var cljs$core$async$state_machine__34096__auto____1 = (function (state_36655){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_36655);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e36691){var ex__34099__auto__ = e36691;
var statearr_36692_38247 = state_36655;
(statearr_36692_38247[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_36655[(4)]))){
var statearr_36693_38249 = state_36655;
(statearr_36693_38249[(1)] = cljs.core.first((state_36655[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38253 = state_36655;
state_36655 = G__38253;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$state_machine__34096__auto__ = function(state_36655){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__34096__auto____1.call(this,state_36655);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__34096__auto____0;
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__34096__auto____1;
return cljs$core$async$state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_36694 = f__34472__auto__();
(statearr_36694[(6)] = c__34471__auto___38161);

return statearr_36694;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__36697 = arguments.length;
switch (G__36697) {
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
var c__34471__auto___38264 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_36744){
var state_val_36745 = (state_36744[(1)]);
if((state_val_36745 === (7))){
var inst_36738 = (state_36744[(2)]);
var state_36744__$1 = state_36744;
var statearr_36746_38268 = state_36744__$1;
(statearr_36746_38268[(2)] = inst_36738);

(statearr_36746_38268[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36745 === (1))){
var inst_36698 = [];
var inst_36699 = inst_36698;
var inst_36700 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_36744__$1 = (function (){var statearr_36748 = state_36744;
(statearr_36748[(7)] = inst_36699);

(statearr_36748[(8)] = inst_36700);

return statearr_36748;
})();
var statearr_36749_38286 = state_36744__$1;
(statearr_36749_38286[(2)] = null);

(statearr_36749_38286[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36745 === (4))){
var inst_36703 = (state_36744[(9)]);
var inst_36703__$1 = (state_36744[(2)]);
var inst_36704 = (inst_36703__$1 == null);
var inst_36705 = cljs.core.not(inst_36704);
var state_36744__$1 = (function (){var statearr_36751 = state_36744;
(statearr_36751[(9)] = inst_36703__$1);

return statearr_36751;
})();
if(inst_36705){
var statearr_36752_38291 = state_36744__$1;
(statearr_36752_38291[(1)] = (5));

} else {
var statearr_36753_38296 = state_36744__$1;
(statearr_36753_38296[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36745 === (15))){
var inst_36699 = (state_36744[(7)]);
var inst_36730 = cljs.core.vec(inst_36699);
var state_36744__$1 = state_36744;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_36744__$1,(18),out,inst_36730);
} else {
if((state_val_36745 === (13))){
var inst_36725 = (state_36744[(2)]);
var state_36744__$1 = state_36744;
var statearr_36754_38302 = state_36744__$1;
(statearr_36754_38302[(2)] = inst_36725);

(statearr_36754_38302[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36745 === (6))){
var inst_36699 = (state_36744[(7)]);
var inst_36727 = inst_36699.length;
var inst_36728 = (inst_36727 > (0));
var state_36744__$1 = state_36744;
if(cljs.core.truth_(inst_36728)){
var statearr_36755_38307 = state_36744__$1;
(statearr_36755_38307[(1)] = (15));

} else {
var statearr_36756_38308 = state_36744__$1;
(statearr_36756_38308[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36745 === (17))){
var inst_36735 = (state_36744[(2)]);
var inst_36736 = cljs.core.async.close_BANG_(out);
var state_36744__$1 = (function (){var statearr_36757 = state_36744;
(statearr_36757[(10)] = inst_36735);

return statearr_36757;
})();
var statearr_36758_38311 = state_36744__$1;
(statearr_36758_38311[(2)] = inst_36736);

(statearr_36758_38311[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36745 === (3))){
var inst_36740 = (state_36744[(2)]);
var state_36744__$1 = state_36744;
return cljs.core.async.impl.ioc_helpers.return_chan(state_36744__$1,inst_36740);
} else {
if((state_val_36745 === (12))){
var inst_36699 = (state_36744[(7)]);
var inst_36718 = cljs.core.vec(inst_36699);
var state_36744__$1 = state_36744;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_36744__$1,(14),out,inst_36718);
} else {
if((state_val_36745 === (2))){
var state_36744__$1 = state_36744;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_36744__$1,(4),ch);
} else {
if((state_val_36745 === (11))){
var inst_36699 = (state_36744[(7)]);
var inst_36703 = (state_36744[(9)]);
var inst_36707 = (state_36744[(11)]);
var inst_36715 = inst_36699.push(inst_36703);
var tmp36759 = inst_36699;
var inst_36699__$1 = tmp36759;
var inst_36700 = inst_36707;
var state_36744__$1 = (function (){var statearr_36760 = state_36744;
(statearr_36760[(12)] = inst_36715);

(statearr_36760[(7)] = inst_36699__$1);

(statearr_36760[(8)] = inst_36700);

return statearr_36760;
})();
var statearr_36761_38314 = state_36744__$1;
(statearr_36761_38314[(2)] = null);

(statearr_36761_38314[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36745 === (9))){
var inst_36700 = (state_36744[(8)]);
var inst_36711 = cljs.core.keyword_identical_QMARK_(inst_36700,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_36744__$1 = state_36744;
var statearr_36769_38323 = state_36744__$1;
(statearr_36769_38323[(2)] = inst_36711);

(statearr_36769_38323[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36745 === (5))){
var inst_36703 = (state_36744[(9)]);
var inst_36707 = (state_36744[(11)]);
var inst_36700 = (state_36744[(8)]);
var inst_36708 = (state_36744[(13)]);
var inst_36707__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_36703) : f.call(null,inst_36703));
var inst_36708__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_36707__$1,inst_36700);
var state_36744__$1 = (function (){var statearr_36771 = state_36744;
(statearr_36771[(11)] = inst_36707__$1);

(statearr_36771[(13)] = inst_36708__$1);

return statearr_36771;
})();
if(inst_36708__$1){
var statearr_36772_38344 = state_36744__$1;
(statearr_36772_38344[(1)] = (8));

} else {
var statearr_36773_38345 = state_36744__$1;
(statearr_36773_38345[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36745 === (14))){
var inst_36703 = (state_36744[(9)]);
var inst_36707 = (state_36744[(11)]);
var inst_36720 = (state_36744[(2)]);
var inst_36721 = [];
var inst_36722 = inst_36721.push(inst_36703);
var inst_36699 = inst_36721;
var inst_36700 = inst_36707;
var state_36744__$1 = (function (){var statearr_36774 = state_36744;
(statearr_36774[(14)] = inst_36720);

(statearr_36774[(15)] = inst_36722);

(statearr_36774[(7)] = inst_36699);

(statearr_36774[(8)] = inst_36700);

return statearr_36774;
})();
var statearr_36775_38347 = state_36744__$1;
(statearr_36775_38347[(2)] = null);

(statearr_36775_38347[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36745 === (16))){
var state_36744__$1 = state_36744;
var statearr_36785_38348 = state_36744__$1;
(statearr_36785_38348[(2)] = null);

(statearr_36785_38348[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36745 === (10))){
var inst_36713 = (state_36744[(2)]);
var state_36744__$1 = state_36744;
if(cljs.core.truth_(inst_36713)){
var statearr_36786_38351 = state_36744__$1;
(statearr_36786_38351[(1)] = (11));

} else {
var statearr_36787_38352 = state_36744__$1;
(statearr_36787_38352[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36745 === (18))){
var inst_36732 = (state_36744[(2)]);
var state_36744__$1 = state_36744;
var statearr_36788_38353 = state_36744__$1;
(statearr_36788_38353[(2)] = inst_36732);

(statearr_36788_38353[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36745 === (8))){
var inst_36708 = (state_36744[(13)]);
var state_36744__$1 = state_36744;
var statearr_36789_38358 = state_36744__$1;
(statearr_36789_38358[(2)] = inst_36708);

(statearr_36789_38358[(1)] = (10));


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
var cljs$core$async$state_machine__34096__auto__ = null;
var cljs$core$async$state_machine__34096__auto____0 = (function (){
var statearr_36794 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_36794[(0)] = cljs$core$async$state_machine__34096__auto__);

(statearr_36794[(1)] = (1));

return statearr_36794;
});
var cljs$core$async$state_machine__34096__auto____1 = (function (state_36744){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_36744);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e36795){var ex__34099__auto__ = e36795;
var statearr_36796_38375 = state_36744;
(statearr_36796_38375[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_36744[(4)]))){
var statearr_36797_38380 = state_36744;
(statearr_36797_38380[(1)] = cljs.core.first((state_36744[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38381 = state_36744;
state_36744 = G__38381;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
cljs$core$async$state_machine__34096__auto__ = function(state_36744){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__34096__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__34096__auto____1.call(this,state_36744);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__34096__auto____0;
cljs$core$async$state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__34096__auto____1;
return cljs$core$async$state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_36805 = f__34472__auto__();
(statearr_36805[(6)] = c__34471__auto___38264);

return statearr_36805;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
