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
var G__36082 = arguments.length;
switch (G__36082) {
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
var seq__36083_36146 = cljs.core.seq(filters);
var chunk__36084_36147 = null;
var count__36085_36148 = (0);
var i__36086_36149 = (0);
while(true){
if((i__36086_36149 < count__36085_36148)){
var vec__36107_36150 = chunk__36084_36147.cljs$core$IIndexed$_nth$arity$2(null,i__36086_36149);
var col_36151 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36107_36150,(0),null);
var val_36152 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36107_36150,(1),null);
if(cljs.core.vector_QMARK_(val_36152)){
var vec__36110_36153 = val_36152;
var op_36154 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36110_36153,(0),null);
var v_36155 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36110_36153,(1),null);
var G__36113_36156 = op_36154;
var G__36113_36157__$1 = (((G__36113_36156 instanceof cljs.core.Keyword))?G__36113_36156.fqn:null);
switch (G__36113_36157__$1) {
case "eq":
query.eq(col_36151,v_36155);

break;
case "neq":
query.neq(col_36151,v_36155);

break;
case "lt":
query.lt(col_36151,v_36155);

break;
case "lte":
query.lte(col_36151,v_36155);

break;
case "gt":
query.gt(col_36151,v_36155);

break;
case "gte":
query.gte(col_36151,v_36155);

break;
case "like":
query.like(col_36151,v_36155);

break;
case "ilike":
query.ilike(col_36151,v_36155);

break;
case "between":
var vec__36114_36159 = val_36152;
var __36160 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36114_36159,(0),null);
var min_val_36161 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36114_36159,(1),null);
var max_val_36162 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36114_36159,(2),null);
query.gte(col_36151,min_val_36161);

query.lte(col_36151,max_val_36162);

break;
default:
query.eq(col_36151,v_36155);

}
} else {
query.eq(col_36151,val_36152);
}


var G__36163 = seq__36083_36146;
var G__36164 = chunk__36084_36147;
var G__36165 = count__36085_36148;
var G__36166 = (i__36086_36149 + (1));
seq__36083_36146 = G__36163;
chunk__36084_36147 = G__36164;
count__36085_36148 = G__36165;
i__36086_36149 = G__36166;
continue;
} else {
var temp__5823__auto___36167 = cljs.core.seq(seq__36083_36146);
if(temp__5823__auto___36167){
var seq__36083_36168__$1 = temp__5823__auto___36167;
if(cljs.core.chunked_seq_QMARK_(seq__36083_36168__$1)){
var c__5548__auto___36169 = cljs.core.chunk_first(seq__36083_36168__$1);
var G__36170 = cljs.core.chunk_rest(seq__36083_36168__$1);
var G__36171 = c__5548__auto___36169;
var G__36172 = cljs.core.count(c__5548__auto___36169);
var G__36173 = (0);
seq__36083_36146 = G__36170;
chunk__36084_36147 = G__36171;
count__36085_36148 = G__36172;
i__36086_36149 = G__36173;
continue;
} else {
var vec__36117_36174 = cljs.core.first(seq__36083_36168__$1);
var col_36175 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36117_36174,(0),null);
var val_36176 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36117_36174,(1),null);
if(cljs.core.vector_QMARK_(val_36176)){
var vec__36120_36177 = val_36176;
var op_36178 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36120_36177,(0),null);
var v_36179 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36120_36177,(1),null);
var G__36123_36180 = op_36178;
var G__36123_36181__$1 = (((G__36123_36180 instanceof cljs.core.Keyword))?G__36123_36180.fqn:null);
switch (G__36123_36181__$1) {
case "eq":
query.eq(col_36175,v_36179);

break;
case "neq":
query.neq(col_36175,v_36179);

break;
case "lt":
query.lt(col_36175,v_36179);

break;
case "lte":
query.lte(col_36175,v_36179);

break;
case "gt":
query.gt(col_36175,v_36179);

break;
case "gte":
query.gte(col_36175,v_36179);

break;
case "like":
query.like(col_36175,v_36179);

break;
case "ilike":
query.ilike(col_36175,v_36179);

break;
case "between":
var vec__36124_36183 = val_36176;
var __36184 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36124_36183,(0),null);
var min_val_36185 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36124_36183,(1),null);
var max_val_36186 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36124_36183,(2),null);
query.gte(col_36175,min_val_36185);

query.lte(col_36175,max_val_36186);

break;
default:
query.eq(col_36175,v_36179);

}
} else {
query.eq(col_36175,val_36176);
}


var G__36187 = cljs.core.next(seq__36083_36168__$1);
var G__36188 = null;
var G__36189 = (0);
var G__36190 = (0);
seq__36083_36146 = G__36187;
chunk__36084_36147 = G__36188;
count__36085_36148 = G__36189;
i__36086_36149 = G__36190;
continue;
}
} else {
}
}
break;
}

var temp__5823__auto___36191 = new cljs.core.Keyword(null,"order-by","order-by",1527318070).cljs$core$IFn$_invoke$arity$1(options);
if(cljs.core.truth_(temp__5823__auto___36191)){
var vec__36127_36192 = temp__5823__auto___36191;
var col_36194 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36127_36192,(0),null);
var orden_36195 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36127_36192,(1),null);
query.order(cljs.core.name(col_36194),({"ascending": cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(orden_36195,new cljs.core.Keyword(null,"asc","asc",356854569))}));
} else {
}

var temp__5823__auto___36197 = new cljs.core.Keyword(null,"limit","limit",-1355822363).cljs$core$IFn$_invoke$arity$1(options);
if(cljs.core.truth_(temp__5823__auto___36197)){
var limit_36199 = temp__5823__auto___36197;
query.limit(limit_36199);
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
var len__5749__auto___36200 = arguments.length;
var i__5750__auto___36201 = (0);
while(true){
if((i__5750__auto___36201 < len__5749__auto___36200)){
args__5755__auto__.push((arguments[i__5750__auto___36201]));

var G__36202 = (i__5750__auto___36201 + (1));
i__5750__auto___36201 = G__36202;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return universo.db.crud.get_latest.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(universo.db.crud.get_latest.cljs$core$IFn$_invoke$arity$variadic = (function (table_name,p__36133){
var vec__36134 = p__36133;
var filters = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36134,(0),null);
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
(universo.db.crud.get_latest.cljs$lang$applyTo = (function (seq36131){
var G__36132 = cljs.core.first(seq36131);
var seq36131__$1 = cljs.core.next(seq36131);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__36132,seq36131__$1);
}));

/**
 * Obtiene el registro con el valor máximo en una columna específica
 */
universo.db.crud.get_max_value = (function universo$db$crud$get_max_value(var_args){
var args__5755__auto__ = [];
var len__5749__auto___36210 = arguments.length;
var i__5750__auto___36213 = (0);
while(true){
if((i__5750__auto___36213 < len__5749__auto___36210)){
args__5755__auto__.push((arguments[i__5750__auto___36213]));

var G__36214 = (i__5750__auto___36213 + (1));
i__5750__auto___36213 = G__36214;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((2) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((2)),(0),null)):null);
return universo.db.crud.get_max_value.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5756__auto__);
});

(universo.db.crud.get_max_value.cljs$core$IFn$_invoke$arity$variadic = (function (table_name,column,p__36141){
var vec__36142 = p__36141;
var filters = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36142,(0),null);
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
(universo.db.crud.get_max_value.cljs$lang$applyTo = (function (seq36137){
var G__36138 = cljs.core.first(seq36137);
var seq36137__$1 = cljs.core.next(seq36137);
var G__36139 = cljs.core.first(seq36137__$1);
var seq36137__$2 = cljs.core.next(seq36137__$1);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__36138,G__36139,seq36137__$2);
}));


//# sourceMappingURL=universo.db.crud.js.map
