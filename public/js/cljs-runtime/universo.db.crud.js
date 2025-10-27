goog.provide('universo.db.crud');
/**
 * Recolecta datos básicos del visitante
 */
universo.db.crud.collect_visitor_data = (function universo$db$crud$collect_visitor_data(){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"pais","pais",1648581293),null,new cljs.core.Keyword(null,"ciudad","ciudad",1617222680),null,new cljs.core.Keyword(null,"timezone","timezone",1831928099),Intl.DateTimeFormat().resolvedOptions().timeZone,new cljs.core.Keyword(null,"idioma","idioma",244604300),navigator.language], null);
});
/**
 * Inserta data entregada en un mapa a la tabla
 */
universo.db.crud.insert_data_table_BANG_ = (function universo$db$crud$insert_data_table_BANG_(data_to_insert,table_name){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
console.log("\uD83D\uDCE4 Enviando datos a Supabase:",data_to_insert);

universo.supabase.supabase_client.from(table_name).insert(cljs.core.clj__GT_js(data_to_insert),({"returning": "representation"})).select("*").single().then((function (result){
console.log("\uD83D\uDCE1 Respuesta de Supabase:",result);

if(cljs.core.truth_(result.error)){
console.error("\u274C Error de Supabase:",result.error);

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"success","success",1890645906),false,new cljs.core.Keyword(null,"error","error",-978969032),result.error.message], null));
} else {
console.log("\u2705 Datos guardados exitosamente:",result.data);

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"success","success",1890645906),true,new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(result.data,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0))], null));
}
})).catch((function (error){
console.error("\uD83D\uDCA5 Error capturado:",error);

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"success","success",1890645906),false,new cljs.core.Keyword(null,"error","error",-978969032),error.message], null));
}));

return ch;
});
/**
 * Obtiene todos los elementos de la tabla
 */
universo.db.crud.get_all_table = (function universo$db$crud$get_all_table(table_name){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
universo.supabase.supabase_client.from(table_name).select("*").then((function (result){
console.log("\uD83D\uDCE1 Respuesta de Supabase:",result);

if(cljs.core.truth_(result.error)){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"success","success",1890645906),false,new cljs.core.Keyword(null,"error","error",-978969032),result.error.message], null));
} else {
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"success","success",1890645906),true,new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(result.data,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0))], null));
}
})).catch((function (error){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"success","success",1890645906),false,new cljs.core.Keyword(null,"error","error",-978969032),error.message], null));
}));

return ch;
});
/**
 * Obtiene elementos de una tabla, opcionalmente aplicando filtros.
 * - table-name: nombre de la tabla
 * - filters: mapa opcional con {columna valor} o {columna [:operador valor]}
 * - options: mapa opcional con opciones adicionales
 *   {:order-by [:columna :orden] ;; :orden puede ser :asc o :desc
 *    :limit n                     ;; número máximo de resultados
 *    :single true}                ;; si esperas un único resultado
 */
universo.db.crud.get_table = (function universo$db$crud$get_table(var_args){
var G__31505 = arguments.length;
switch (G__31505) {
case 1:
return universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$1 = (function (table_name){
return universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$3(table_name,cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.EMPTY);
}));

(universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$2 = (function (table_name,filters){
return universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$3(table_name,filters,cljs.core.PersistentArrayMap.EMPTY);
}));

(universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$3 = (function (table_name,filters,options){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var query = universo.supabase.supabase_client.from(table_name).select("*");
var seq__31506_31567 = cljs.core.seq(filters);
var chunk__31507_31568 = null;
var count__31508_31569 = (0);
var i__31509_31570 = (0);
while(true){
if((i__31509_31570 < count__31508_31569)){
var vec__31530_31571 = chunk__31507_31568.cljs$core$IIndexed$_nth$arity$2(null,i__31509_31570);
var col_31572 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31530_31571,(0),null);
var val_31573 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31530_31571,(1),null);
if(cljs.core.vector_QMARK_(val_31573)){
var vec__31533_31574 = val_31573;
var op_31575 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31533_31574,(0),null);
var v_31576 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31533_31574,(1),null);
var G__31536_31577 = op_31575;
var G__31536_31578__$1 = (((G__31536_31577 instanceof cljs.core.Keyword))?G__31536_31577.fqn:null);
switch (G__31536_31578__$1) {
case "eq":
query.eq(col_31572,v_31576);

break;
case "neq":
query.neq(col_31572,v_31576);

break;
case "lt":
query.lt(col_31572,v_31576);

break;
case "lte":
query.lte(col_31572,v_31576);

break;
case "gt":
query.gt(col_31572,v_31576);

break;
case "gte":
query.gte(col_31572,v_31576);

break;
case "like":
query.like(col_31572,v_31576);

break;
case "ilike":
query.ilike(col_31572,v_31576);

break;
case "between":
var vec__31537_31580 = val_31573;
var __31581 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31537_31580,(0),null);
var min_val_31582 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31537_31580,(1),null);
var max_val_31583 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31537_31580,(2),null);
query.gte(col_31572,min_val_31582);

query.lte(col_31572,max_val_31583);

break;
default:
query.eq(col_31572,v_31576);

}
} else {
query.eq(col_31572,val_31573);
}


var G__31584 = seq__31506_31567;
var G__31585 = chunk__31507_31568;
var G__31586 = count__31508_31569;
var G__31587 = (i__31509_31570 + (1));
seq__31506_31567 = G__31584;
chunk__31507_31568 = G__31585;
count__31508_31569 = G__31586;
i__31509_31570 = G__31587;
continue;
} else {
var temp__5823__auto___31588 = cljs.core.seq(seq__31506_31567);
if(temp__5823__auto___31588){
var seq__31506_31589__$1 = temp__5823__auto___31588;
if(cljs.core.chunked_seq_QMARK_(seq__31506_31589__$1)){
var c__5548__auto___31590 = cljs.core.chunk_first(seq__31506_31589__$1);
var G__31591 = cljs.core.chunk_rest(seq__31506_31589__$1);
var G__31592 = c__5548__auto___31590;
var G__31593 = cljs.core.count(c__5548__auto___31590);
var G__31594 = (0);
seq__31506_31567 = G__31591;
chunk__31507_31568 = G__31592;
count__31508_31569 = G__31593;
i__31509_31570 = G__31594;
continue;
} else {
var vec__31540_31595 = cljs.core.first(seq__31506_31589__$1);
var col_31596 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31540_31595,(0),null);
var val_31597 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31540_31595,(1),null);
if(cljs.core.vector_QMARK_(val_31597)){
var vec__31543_31598 = val_31597;
var op_31599 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31543_31598,(0),null);
var v_31600 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31543_31598,(1),null);
var G__31546_31601 = op_31599;
var G__31546_31602__$1 = (((G__31546_31601 instanceof cljs.core.Keyword))?G__31546_31601.fqn:null);
switch (G__31546_31602__$1) {
case "eq":
query.eq(col_31596,v_31600);

break;
case "neq":
query.neq(col_31596,v_31600);

break;
case "lt":
query.lt(col_31596,v_31600);

break;
case "lte":
query.lte(col_31596,v_31600);

break;
case "gt":
query.gt(col_31596,v_31600);

break;
case "gte":
query.gte(col_31596,v_31600);

break;
case "like":
query.like(col_31596,v_31600);

break;
case "ilike":
query.ilike(col_31596,v_31600);

break;
case "between":
var vec__31547_31608 = val_31597;
var __31609 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31547_31608,(0),null);
var min_val_31610 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31547_31608,(1),null);
var max_val_31611 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31547_31608,(2),null);
query.gte(col_31596,min_val_31610);

query.lte(col_31596,max_val_31611);

break;
default:
query.eq(col_31596,v_31600);

}
} else {
query.eq(col_31596,val_31597);
}


var G__31615 = cljs.core.next(seq__31506_31589__$1);
var G__31616 = null;
var G__31617 = (0);
var G__31618 = (0);
seq__31506_31567 = G__31615;
chunk__31507_31568 = G__31616;
count__31508_31569 = G__31617;
i__31509_31570 = G__31618;
continue;
}
} else {
}
}
break;
}

var temp__5823__auto___31619 = new cljs.core.Keyword(null,"order-by","order-by",1527318070).cljs$core$IFn$_invoke$arity$1(options);
if(cljs.core.truth_(temp__5823__auto___31619)){
var vec__31550_31620 = temp__5823__auto___31619;
var col_31621 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31550_31620,(0),null);
var orden_31622 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31550_31620,(1),null);
query.order(cljs.core.name(col_31621),({"ascending": cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(orden_31622,new cljs.core.Keyword(null,"asc","asc",356854569))}));
} else {
}

var temp__5823__auto___31623 = new cljs.core.Keyword(null,"limit","limit",-1355822363).cljs$core$IFn$_invoke$arity$1(options);
if(cljs.core.truth_(temp__5823__auto___31623)){
var limit_31624 = temp__5823__auto___31623;
query.limit(limit_31624);
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"single","single",1551466437).cljs$core$IFn$_invoke$arity$1(options))){
query.single();
} else {
}

query.then((function (result){
console.log("\uD83D\uDCE1 Respuesta filtrada de Supabase:",result);

if(cljs.core.truth_(result.error)){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"success","success",1890645906),false,new cljs.core.Keyword(null,"error","error",-978969032),result.error.message], null));
} else {
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"success","success",1890645906),true,new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(result.data,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0))], null));
}
})).catch((function (error){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"success","success",1890645906),false,new cljs.core.Keyword(null,"error","error",-978969032),error.message], null));
}));

return ch;
}));

(universo.db.crud.get_table.cljs$lang$maxFixedArity = 3);

/**
 * Obtiene el registro más reciente de una tabla basado en created_at
 */
universo.db.crud.get_latest = (function universo$db$crud$get_latest(var_args){
var args__5755__auto__ = [];
var len__5749__auto___31627 = arguments.length;
var i__5750__auto___31628 = (0);
while(true){
if((i__5750__auto___31628 < len__5749__auto___31627)){
args__5755__auto__.push((arguments[i__5750__auto___31628]));

var G__31633 = (i__5750__auto___31628 + (1));
i__5750__auto___31628 = G__31633;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return universo.db.crud.get_latest.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(universo.db.crud.get_latest.cljs$core$IFn$_invoke$arity$variadic = (function (table_name,p__31555){
var vec__31556 = p__31555;
var filters = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31556,(0),null);
return universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$3(table_name,(function (){var or__5025__auto__ = filters;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})(),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"order-by","order-by",1527318070),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"created_at","created_at",1484050750),new cljs.core.Keyword(null,"desc","desc",2093485764)], null),new cljs.core.Keyword(null,"limit","limit",-1355822363),(1),new cljs.core.Keyword(null,"single","single",1551466437),true], null));
}));

(universo.db.crud.get_latest.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(universo.db.crud.get_latest.cljs$lang$applyTo = (function (seq31553){
var G__31554 = cljs.core.first(seq31553);
var seq31553__$1 = cljs.core.next(seq31553);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__31554,seq31553__$1);
}));

/**
 * Obtiene el registro con el valor máximo en una columna específica
 */
universo.db.crud.get_max_value = (function universo$db$crud$get_max_value(var_args){
var args__5755__auto__ = [];
var len__5749__auto___31635 = arguments.length;
var i__5750__auto___31639 = (0);
while(true){
if((i__5750__auto___31639 < len__5749__auto___31635)){
args__5755__auto__.push((arguments[i__5750__auto___31639]));

var G__31640 = (i__5750__auto___31639 + (1));
i__5750__auto___31639 = G__31640;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((2) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((2)),(0),null)):null);
return universo.db.crud.get_max_value.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5756__auto__);
});

(universo.db.crud.get_max_value.cljs$core$IFn$_invoke$arity$variadic = (function (table_name,column,p__31562){
var vec__31563 = p__31562;
var filters = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31563,(0),null);
return universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$3(table_name,(function (){var or__5025__auto__ = filters;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})(),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"order-by","order-by",1527318070),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [column,new cljs.core.Keyword(null,"desc","desc",2093485764)], null),new cljs.core.Keyword(null,"limit","limit",-1355822363),(1),new cljs.core.Keyword(null,"single","single",1551466437),true], null));
}));

(universo.db.crud.get_max_value.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(universo.db.crud.get_max_value.cljs$lang$applyTo = (function (seq31559){
var G__31560 = cljs.core.first(seq31559);
var seq31559__$1 = cljs.core.next(seq31559);
var G__31561 = cljs.core.first(seq31559__$1);
var seq31559__$2 = cljs.core.next(seq31559__$1);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__31560,G__31561,seq31559__$2);
}));


//# sourceMappingURL=universo.db.crud.js.map
