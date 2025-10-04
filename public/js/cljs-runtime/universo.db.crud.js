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
 * - filters: mapa opcional con {comlumna valor} o {columna [:operador valor]}
 */
universo.db.crud.get_table = (function universo$db$crud$get_table(var_args){
var G__30425 = arguments.length;
switch (G__30425) {
case 1:
return universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$1 = (function (table_name){
return universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$2(table_name,cljs.core.PersistentArrayMap.EMPTY);
}));

(universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$2 = (function (table_name,filters){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var query = universo.supabase.supabase_client.from(table_name).select("*");
var seq__30426_30547 = cljs.core.seq(filters);
var chunk__30427_30548 = null;
var count__30428_30549 = (0);
var i__30429_30550 = (0);
while(true){
if((i__30429_30550 < count__30428_30549)){
var vec__30444_30551 = chunk__30427_30548.cljs$core$IIndexed$_nth$arity$2(null,i__30429_30550);
var col_30552 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30444_30551,(0),null);
var val_30553 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30444_30551,(1),null);
if(cljs.core.vector_QMARK_(val_30553)){
var vec__30447_30554 = val_30553;
var op_30555 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30447_30554,(0),null);
var v_30556 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30447_30554,(1),null);
var G__30450_30563 = op_30555;
var G__30450_30564__$1 = (((G__30450_30563 instanceof cljs.core.Keyword))?G__30450_30563.fqn:null);
switch (G__30450_30564__$1) {
case "eq":
query.eq(col_30552,v_30556);

break;
case "neq":
query.neq(col_30552,v_30556);

break;
case "lt":
query.lt(col_30552,v_30556);

break;
case "lte":
query.lte(col_30552,v_30556);

break;
case "gt":
query.gt(col_30552,v_30556);

break;
case "gte":
query.gte(col_30552,v_30556);

break;
case "like":
query.like(col_30552,v_30556);

break;
case "ilike":
query.ilike(col_30552,v_30556);

break;
default:
query.eq(col_30552,v_30556);

}
} else {
query.eq(col_30552,val_30553);
}


var G__30575 = seq__30426_30547;
var G__30576 = chunk__30427_30548;
var G__30577 = count__30428_30549;
var G__30578 = (i__30429_30550 + (1));
seq__30426_30547 = G__30575;
chunk__30427_30548 = G__30576;
count__30428_30549 = G__30577;
i__30429_30550 = G__30578;
continue;
} else {
var temp__5823__auto___30581 = cljs.core.seq(seq__30426_30547);
if(temp__5823__auto___30581){
var seq__30426_30584__$1 = temp__5823__auto___30581;
if(cljs.core.chunked_seq_QMARK_(seq__30426_30584__$1)){
var c__5548__auto___30586 = cljs.core.chunk_first(seq__30426_30584__$1);
var G__30587 = cljs.core.chunk_rest(seq__30426_30584__$1);
var G__30588 = c__5548__auto___30586;
var G__30589 = cljs.core.count(c__5548__auto___30586);
var G__30590 = (0);
seq__30426_30547 = G__30587;
chunk__30427_30548 = G__30588;
count__30428_30549 = G__30589;
i__30429_30550 = G__30590;
continue;
} else {
var vec__30451_30591 = cljs.core.first(seq__30426_30584__$1);
var col_30592 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30451_30591,(0),null);
var val_30593 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30451_30591,(1),null);
if(cljs.core.vector_QMARK_(val_30593)){
var vec__30454_30594 = val_30593;
var op_30595 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30454_30594,(0),null);
var v_30596 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30454_30594,(1),null);
var G__30457_30597 = op_30595;
var G__30457_30598__$1 = (((G__30457_30597 instanceof cljs.core.Keyword))?G__30457_30597.fqn:null);
switch (G__30457_30598__$1) {
case "eq":
query.eq(col_30592,v_30596);

break;
case "neq":
query.neq(col_30592,v_30596);

break;
case "lt":
query.lt(col_30592,v_30596);

break;
case "lte":
query.lte(col_30592,v_30596);

break;
case "gt":
query.gt(col_30592,v_30596);

break;
case "gte":
query.gte(col_30592,v_30596);

break;
case "like":
query.like(col_30592,v_30596);

break;
case "ilike":
query.ilike(col_30592,v_30596);

break;
default:
query.eq(col_30592,v_30596);

}
} else {
query.eq(col_30592,val_30593);
}


var G__30607 = cljs.core.next(seq__30426_30584__$1);
var G__30608 = null;
var G__30609 = (0);
var G__30610 = (0);
seq__30426_30547 = G__30607;
chunk__30427_30548 = G__30608;
count__30428_30549 = G__30609;
i__30429_30550 = G__30610;
continue;
}
} else {
}
}
break;
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

(universo.db.crud.get_table.cljs$lang$maxFixedArity = 2);


//# sourceMappingURL=universo.db.crud.js.map
