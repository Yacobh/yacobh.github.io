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
var G__35565 = arguments.length;
switch (G__35565) {
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
var seq__35567_35615 = cljs.core.seq(filters);
var chunk__35568_35616 = null;
var count__35569_35617 = (0);
var i__35570_35618 = (0);
while(true){
if((i__35570_35618 < count__35569_35617)){
var vec__35592_35619 = chunk__35568_35616.cljs$core$IIndexed$_nth$arity$2(null,i__35570_35618);
var col_35620 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35592_35619,(0),null);
var val_35621 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35592_35619,(1),null);
if(cljs.core.vector_QMARK_(val_35621)){
var vec__35595_35622 = val_35621;
var op_35623 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35595_35622,(0),null);
var v_35624 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35595_35622,(1),null);
var G__35598_35625 = op_35623;
var G__35598_35626__$1 = (((G__35598_35625 instanceof cljs.core.Keyword))?G__35598_35625.fqn:null);
switch (G__35598_35626__$1) {
case "eq":
query.eq(col_35620,v_35624);

break;
case "neq":
query.neq(col_35620,v_35624);

break;
case "lt":
query.lt(col_35620,v_35624);

break;
case "lte":
query.lte(col_35620,v_35624);

break;
case "gt":
query.gt(col_35620,v_35624);

break;
case "gte":
query.gte(col_35620,v_35624);

break;
case "like":
query.like(col_35620,v_35624);

break;
case "ilike":
query.ilike(col_35620,v_35624);

break;
case "between":
var vec__35599_35628 = val_35621;
var __35629 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35599_35628,(0),null);
var min_val_35630 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35599_35628,(1),null);
var max_val_35631 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35599_35628,(2),null);
query.gte(col_35620,min_val_35630);

query.lte(col_35620,max_val_35631);

break;
default:
query.eq(col_35620,v_35624);

}
} else {
query.eq(col_35620,val_35621);
}


var G__35632 = seq__35567_35615;
var G__35633 = chunk__35568_35616;
var G__35634 = count__35569_35617;
var G__35635 = (i__35570_35618 + (1));
seq__35567_35615 = G__35632;
chunk__35568_35616 = G__35633;
count__35569_35617 = G__35634;
i__35570_35618 = G__35635;
continue;
} else {
var temp__5823__auto___35636 = cljs.core.seq(seq__35567_35615);
if(temp__5823__auto___35636){
var seq__35567_35637__$1 = temp__5823__auto___35636;
if(cljs.core.chunked_seq_QMARK_(seq__35567_35637__$1)){
var c__5548__auto___35638 = cljs.core.chunk_first(seq__35567_35637__$1);
var G__35639 = cljs.core.chunk_rest(seq__35567_35637__$1);
var G__35640 = c__5548__auto___35638;
var G__35641 = cljs.core.count(c__5548__auto___35638);
var G__35642 = (0);
seq__35567_35615 = G__35639;
chunk__35568_35616 = G__35640;
count__35569_35617 = G__35641;
i__35570_35618 = G__35642;
continue;
} else {
var vec__35603_35643 = cljs.core.first(seq__35567_35637__$1);
var col_35644 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35603_35643,(0),null);
var val_35645 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35603_35643,(1),null);
if(cljs.core.vector_QMARK_(val_35645)){
var vec__35606_35646 = val_35645;
var op_35647 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35606_35646,(0),null);
var v_35648 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35606_35646,(1),null);
var G__35609_35649 = op_35647;
var G__35609_35650__$1 = (((G__35609_35649 instanceof cljs.core.Keyword))?G__35609_35649.fqn:null);
switch (G__35609_35650__$1) {
case "eq":
query.eq(col_35644,v_35648);

break;
case "neq":
query.neq(col_35644,v_35648);

break;
case "lt":
query.lt(col_35644,v_35648);

break;
case "lte":
query.lte(col_35644,v_35648);

break;
case "gt":
query.gt(col_35644,v_35648);

break;
case "gte":
query.gte(col_35644,v_35648);

break;
case "like":
query.like(col_35644,v_35648);

break;
case "ilike":
query.ilike(col_35644,v_35648);

break;
case "between":
var vec__35610_35652 = val_35645;
var __35653 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35610_35652,(0),null);
var min_val_35654 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35610_35652,(1),null);
var max_val_35655 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35610_35652,(2),null);
query.gte(col_35644,min_val_35654);

query.lte(col_35644,max_val_35655);

break;
default:
query.eq(col_35644,v_35648);

}
} else {
query.eq(col_35644,val_35645);
}


var G__35656 = cljs.core.next(seq__35567_35637__$1);
var G__35657 = null;
var G__35658 = (0);
var G__35659 = (0);
seq__35567_35615 = G__35656;
chunk__35568_35616 = G__35657;
count__35569_35617 = G__35658;
i__35570_35618 = G__35659;
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
