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
var G__29013 = arguments.length;
switch (G__29013) {
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
var seq__29014_29053 = cljs.core.seq(filters);
var chunk__29015_29054 = null;
var count__29016_29055 = (0);
var i__29017_29056 = (0);
while(true){
if((i__29017_29056 < count__29016_29055)){
var vec__29032_29057 = chunk__29015_29054.cljs$core$IIndexed$_nth$arity$2(null,i__29017_29056);
var col_29058 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29032_29057,(0),null);
var val_29059 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29032_29057,(1),null);
if(cljs.core.vector_QMARK_(val_29059)){
var vec__29035_29061 = val_29059;
var op_29062 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29035_29061,(0),null);
var v_29063 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29035_29061,(1),null);
var G__29038_29064 = op_29062;
var G__29038_29065__$1 = (((G__29038_29064 instanceof cljs.core.Keyword))?G__29038_29064.fqn:null);
switch (G__29038_29065__$1) {
case "eq":
query.eq(col_29058,v_29063);

break;
case "neq":
query.neq(col_29058,v_29063);

break;
case "lt":
query.lt(col_29058,v_29063);

break;
case "lte":
query.lte(col_29058,v_29063);

break;
case "gt":
query.gt(col_29058,v_29063);

break;
case "gte":
query.gte(col_29058,v_29063);

break;
case "like":
query.like(col_29058,v_29063);

break;
case "ilike":
query.ilike(col_29058,v_29063);

break;
default:
query.eq(col_29058,v_29063);

}
} else {
query.eq(col_29058,val_29059);
}


var G__29068 = seq__29014_29053;
var G__29069 = chunk__29015_29054;
var G__29070 = count__29016_29055;
var G__29071 = (i__29017_29056 + (1));
seq__29014_29053 = G__29068;
chunk__29015_29054 = G__29069;
count__29016_29055 = G__29070;
i__29017_29056 = G__29071;
continue;
} else {
var temp__5823__auto___29072 = cljs.core.seq(seq__29014_29053);
if(temp__5823__auto___29072){
var seq__29014_29073__$1 = temp__5823__auto___29072;
if(cljs.core.chunked_seq_QMARK_(seq__29014_29073__$1)){
var c__5548__auto___29074 = cljs.core.chunk_first(seq__29014_29073__$1);
var G__29076 = cljs.core.chunk_rest(seq__29014_29073__$1);
var G__29077 = c__5548__auto___29074;
var G__29078 = cljs.core.count(c__5548__auto___29074);
var G__29079 = (0);
seq__29014_29053 = G__29076;
chunk__29015_29054 = G__29077;
count__29016_29055 = G__29078;
i__29017_29056 = G__29079;
continue;
} else {
var vec__29039_29083 = cljs.core.first(seq__29014_29073__$1);
var col_29084 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29039_29083,(0),null);
var val_29085 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29039_29083,(1),null);
if(cljs.core.vector_QMARK_(val_29085)){
var vec__29042_29086 = val_29085;
var op_29087 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29042_29086,(0),null);
var v_29088 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__29042_29086,(1),null);
var G__29045_29089 = op_29087;
var G__29045_29090__$1 = (((G__29045_29089 instanceof cljs.core.Keyword))?G__29045_29089.fqn:null);
switch (G__29045_29090__$1) {
case "eq":
query.eq(col_29084,v_29088);

break;
case "neq":
query.neq(col_29084,v_29088);

break;
case "lt":
query.lt(col_29084,v_29088);

break;
case "lte":
query.lte(col_29084,v_29088);

break;
case "gt":
query.gt(col_29084,v_29088);

break;
case "gte":
query.gte(col_29084,v_29088);

break;
case "like":
query.like(col_29084,v_29088);

break;
case "ilike":
query.ilike(col_29084,v_29088);

break;
default:
query.eq(col_29084,v_29088);

}
} else {
query.eq(col_29084,val_29085);
}


var G__29092 = cljs.core.next(seq__29014_29073__$1);
var G__29093 = null;
var G__29094 = (0);
var G__29095 = (0);
seq__29014_29053 = G__29092;
chunk__29015_29054 = G__29093;
count__29016_29055 = G__29094;
i__29017_29056 = G__29095;
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
