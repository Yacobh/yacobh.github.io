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
var G__29120 = arguments.length;
switch (G__29120) {
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
var seq__29121_29218 = cljs.core.seq(filters);
var chunk__29122_29219 = null;
var count__29123_29220 = (0);
var i__29124_29221 = (0);
while(true){
if((i__29124_29221 < count__29123_29220)){
var vec__29145_29227 = chunk__29122_29219.cljs$core$IIndexed$_nth$arity$2(null,i__29124_29221);
var col_29228 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29145_29227,(0),null);
var val_29229 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29145_29227,(1),null);
if(cljs.core.vector_QMARK_(val_29229)){
var vec__29148_29253 = val_29229;
var op_29254 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29148_29253,(0),null);
var v_29255 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29148_29253,(1),null);
var G__29151_29262 = op_29254;
var G__29151_29263__$1 = (((G__29151_29262 instanceof cljs.core.Keyword))?G__29151_29262.fqn:null);
switch (G__29151_29263__$1) {
case "eq":
query.eq(col_29228,v_29255);

break;
case "neq":
query.neq(col_29228,v_29255);

break;
case "lt":
query.lt(col_29228,v_29255);

break;
case "lte":
query.lte(col_29228,v_29255);

break;
case "gt":
query.gt(col_29228,v_29255);

break;
case "gte":
query.gte(col_29228,v_29255);

break;
case "like":
query.like(col_29228,v_29255);

break;
case "ilike":
query.ilike(col_29228,v_29255);

break;
case "between":
var vec__29152_29320 = val_29229;
var __29321 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29152_29320,(0),null);
var min_val_29322 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29152_29320,(1),null);
var max_val_29323 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29152_29320,(2),null);
query.gte(col_29228,min_val_29322);

query.lte(col_29228,max_val_29323);

break;
default:
query.eq(col_29228,v_29255);

}
} else {
query.eq(col_29228,val_29229);
}


var G__29335 = seq__29121_29218;
var G__29336 = chunk__29122_29219;
var G__29337 = count__29123_29220;
var G__29338 = (i__29124_29221 + (1));
seq__29121_29218 = G__29335;
chunk__29122_29219 = G__29336;
count__29123_29220 = G__29337;
i__29124_29221 = G__29338;
continue;
} else {
var temp__5823__auto___29340 = cljs.core.seq(seq__29121_29218);
if(temp__5823__auto___29340){
var seq__29121_29342__$1 = temp__5823__auto___29340;
if(cljs.core.chunked_seq_QMARK_(seq__29121_29342__$1)){
var c__5548__auto___29343 = cljs.core.chunk_first(seq__29121_29342__$1);
var G__29344 = cljs.core.chunk_rest(seq__29121_29342__$1);
var G__29345 = c__5548__auto___29343;
var G__29346 = cljs.core.count(c__5548__auto___29343);
var G__29347 = (0);
seq__29121_29218 = G__29344;
chunk__29122_29219 = G__29345;
count__29123_29220 = G__29346;
i__29124_29221 = G__29347;
continue;
} else {
var vec__29155_29351 = cljs.core.first(seq__29121_29342__$1);
var col_29352 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29155_29351,(0),null);
var val_29353 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29155_29351,(1),null);
if(cljs.core.vector_QMARK_(val_29353)){
var vec__29158_29357 = val_29353;
var op_29358 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29158_29357,(0),null);
var v_29359 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29158_29357,(1),null);
var G__29161_29362 = op_29358;
var G__29161_29363__$1 = (((G__29161_29362 instanceof cljs.core.Keyword))?G__29161_29362.fqn:null);
switch (G__29161_29363__$1) {
case "eq":
query.eq(col_29352,v_29359);

break;
case "neq":
query.neq(col_29352,v_29359);

break;
case "lt":
query.lt(col_29352,v_29359);

break;
case "lte":
query.lte(col_29352,v_29359);

break;
case "gt":
query.gt(col_29352,v_29359);

break;
case "gte":
query.gte(col_29352,v_29359);

break;
case "like":
query.like(col_29352,v_29359);

break;
case "ilike":
query.ilike(col_29352,v_29359);

break;
case "between":
var vec__29162_29369 = val_29353;
var __29370 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29162_29369,(0),null);
var min_val_29371 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29162_29369,(1),null);
var max_val_29372 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29162_29369,(2),null);
query.gte(col_29352,min_val_29371);

query.lte(col_29352,max_val_29372);

break;
default:
query.eq(col_29352,v_29359);

}
} else {
query.eq(col_29352,val_29353);
}


var G__29375 = cljs.core.next(seq__29121_29342__$1);
var G__29376 = null;
var G__29377 = (0);
var G__29378 = (0);
seq__29121_29218 = G__29375;
chunk__29122_29219 = G__29376;
count__29123_29220 = G__29377;
i__29124_29221 = G__29378;
continue;
}
} else {
}
}
break;
}

var temp__5823__auto___29379 = new cljs.core.Keyword(null,"order-by","order-by",1527318070).cljs$core$IFn$_invoke$arity$1(options);
if(cljs.core.truth_(temp__5823__auto___29379)){
var vec__29165_29381 = temp__5823__auto___29379;
var col_29382 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29165_29381,(0),null);
var orden_29383 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29165_29381,(1),null);
query.order(cljs.core.name(col_29382),({"ascending": cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(orden_29383,new cljs.core.Keyword(null,"asc","asc",356854569))}));
} else {
}

var temp__5823__auto___29385 = new cljs.core.Keyword(null,"limit","limit",-1355822363).cljs$core$IFn$_invoke$arity$1(options);
if(cljs.core.truth_(temp__5823__auto___29385)){
var limit_29386 = temp__5823__auto___29385;
query.limit(limit_29386);
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
var len__5749__auto___29398 = arguments.length;
var i__5750__auto___29399 = (0);
while(true){
if((i__5750__auto___29399 < len__5749__auto___29398)){
args__5755__auto__.push((arguments[i__5750__auto___29399]));

var G__29401 = (i__5750__auto___29399 + (1));
i__5750__auto___29399 = G__29401;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return universo.db.crud.get_latest.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(universo.db.crud.get_latest.cljs$core$IFn$_invoke$arity$variadic = (function (table_name,p__29170){
var vec__29171 = p__29170;
var filters = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29171,(0),null);
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
(universo.db.crud.get_latest.cljs$lang$applyTo = (function (seq29168){
var G__29169 = cljs.core.first(seq29168);
var seq29168__$1 = cljs.core.next(seq29168);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__29169,seq29168__$1);
}));

/**
 * Obtiene el registro con el valor máximo en una columna específica
 */
universo.db.crud.get_max_value = (function universo$db$crud$get_max_value(var_args){
var args__5755__auto__ = [];
var len__5749__auto___29420 = arguments.length;
var i__5750__auto___29421 = (0);
while(true){
if((i__5750__auto___29421 < len__5749__auto___29420)){
args__5755__auto__.push((arguments[i__5750__auto___29421]));

var G__29423 = (i__5750__auto___29421 + (1));
i__5750__auto___29421 = G__29423;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((2) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((2)),(0),null)):null);
return universo.db.crud.get_max_value.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5756__auto__);
});

(universo.db.crud.get_max_value.cljs$core$IFn$_invoke$arity$variadic = (function (table_name,column,p__29177){
var vec__29178 = p__29177;
var filters = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29178,(0),null);
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
(universo.db.crud.get_max_value.cljs$lang$applyTo = (function (seq29174){
var G__29175 = cljs.core.first(seq29174);
var seq29174__$1 = cljs.core.next(seq29174);
var G__29176 = cljs.core.first(seq29174__$1);
var seq29174__$2 = cljs.core.next(seq29174__$1);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__29175,G__29176,seq29174__$2);
}));


//# sourceMappingURL=universo.db.crud.js.map
