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
var G__30694 = arguments.length;
switch (G__30694) {
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
var seq__30695_30740 = cljs.core.seq(filters);
var chunk__30696_30741 = null;
var count__30697_30742 = (0);
var i__30698_30743 = (0);
while(true){
if((i__30698_30743 < count__30697_30742)){
var vec__30719_30750 = chunk__30696_30741.cljs$core$IIndexed$_nth$arity$2(null,i__30698_30743);
var col_30751 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30719_30750,(0),null);
var val_30752 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30719_30750,(1),null);
if(cljs.core.vector_QMARK_(val_30752)){
var vec__30722_30753 = val_30752;
var op_30754 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30722_30753,(0),null);
var v_30755 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30722_30753,(1),null);
var G__30725_30756 = op_30754;
var G__30725_30757__$1 = (((G__30725_30756 instanceof cljs.core.Keyword))?G__30725_30756.fqn:null);
switch (G__30725_30757__$1) {
case "eq":
query.eq(col_30751,v_30755);

break;
case "neq":
query.neq(col_30751,v_30755);

break;
case "lt":
query.lt(col_30751,v_30755);

break;
case "lte":
query.lte(col_30751,v_30755);

break;
case "gt":
query.gt(col_30751,v_30755);

break;
case "gte":
query.gte(col_30751,v_30755);

break;
case "like":
query.like(col_30751,v_30755);

break;
case "ilike":
query.ilike(col_30751,v_30755);

break;
case "between":
var vec__30726_30760 = val_30752;
var __30761 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30726_30760,(0),null);
var min_val_30762 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30726_30760,(1),null);
var max_val_30763 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30726_30760,(2),null);
query.gte(col_30751,min_val_30762);

query.lte(col_30751,max_val_30763);

break;
default:
query.eq(col_30751,v_30755);

}
} else {
query.eq(col_30751,val_30752);
}


var G__30764 = seq__30695_30740;
var G__30765 = chunk__30696_30741;
var G__30766 = count__30697_30742;
var G__30767 = (i__30698_30743 + (1));
seq__30695_30740 = G__30764;
chunk__30696_30741 = G__30765;
count__30697_30742 = G__30766;
i__30698_30743 = G__30767;
continue;
} else {
var temp__5823__auto___30768 = cljs.core.seq(seq__30695_30740);
if(temp__5823__auto___30768){
var seq__30695_30773__$1 = temp__5823__auto___30768;
if(cljs.core.chunked_seq_QMARK_(seq__30695_30773__$1)){
var c__5548__auto___30774 = cljs.core.chunk_first(seq__30695_30773__$1);
var G__30775 = cljs.core.chunk_rest(seq__30695_30773__$1);
var G__30776 = c__5548__auto___30774;
var G__30777 = cljs.core.count(c__5548__auto___30774);
var G__30778 = (0);
seq__30695_30740 = G__30775;
chunk__30696_30741 = G__30776;
count__30697_30742 = G__30777;
i__30698_30743 = G__30778;
continue;
} else {
var vec__30729_30780 = cljs.core.first(seq__30695_30773__$1);
var col_30781 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30729_30780,(0),null);
var val_30782 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30729_30780,(1),null);
if(cljs.core.vector_QMARK_(val_30782)){
var vec__30732_30790 = val_30782;
var op_30791 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30732_30790,(0),null);
var v_30792 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30732_30790,(1),null);
var G__30735_30795 = op_30791;
var G__30735_30796__$1 = (((G__30735_30795 instanceof cljs.core.Keyword))?G__30735_30795.fqn:null);
switch (G__30735_30796__$1) {
case "eq":
query.eq(col_30781,v_30792);

break;
case "neq":
query.neq(col_30781,v_30792);

break;
case "lt":
query.lt(col_30781,v_30792);

break;
case "lte":
query.lte(col_30781,v_30792);

break;
case "gt":
query.gt(col_30781,v_30792);

break;
case "gte":
query.gte(col_30781,v_30792);

break;
case "like":
query.like(col_30781,v_30792);

break;
case "ilike":
query.ilike(col_30781,v_30792);

break;
case "between":
var vec__30736_30830 = val_30782;
var __30831 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30736_30830,(0),null);
var min_val_30832 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30736_30830,(1),null);
var max_val_30833 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30736_30830,(2),null);
query.gte(col_30781,min_val_30832);

query.lte(col_30781,max_val_30833);

break;
default:
query.eq(col_30781,v_30792);

}
} else {
query.eq(col_30781,val_30782);
}


var G__30838 = cljs.core.next(seq__30695_30773__$1);
var G__30839 = null;
var G__30840 = (0);
var G__30841 = (0);
seq__30695_30740 = G__30838;
chunk__30696_30741 = G__30839;
count__30697_30742 = G__30840;
i__30698_30743 = G__30841;
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
