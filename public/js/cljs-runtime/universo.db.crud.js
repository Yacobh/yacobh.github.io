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
var G__30576 = arguments.length;
switch (G__30576) {
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
var seq__30577_30725 = cljs.core.seq(filters);
var chunk__30578_30726 = null;
var count__30579_30727 = (0);
var i__30580_30728 = (0);
while(true){
if((i__30580_30728 < count__30579_30727)){
var vec__30617_30729 = chunk__30578_30726.cljs$core$IIndexed$_nth$arity$2(null,i__30580_30728);
var col_30730 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30617_30729,(0),null);
var val_30731 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30617_30729,(1),null);
if(cljs.core.vector_QMARK_(val_30731)){
var vec__30620_30734 = val_30731;
var op_30735 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30620_30734,(0),null);
var v_30736 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30620_30734,(1),null);
var G__30623_30737 = op_30735;
var G__30623_30738__$1 = (((G__30623_30737 instanceof cljs.core.Keyword))?G__30623_30737.fqn:null);
switch (G__30623_30738__$1) {
case "eq":
query.eq(col_30730,v_30736);

break;
case "neq":
query.neq(col_30730,v_30736);

break;
case "lt":
query.lt(col_30730,v_30736);

break;
case "lte":
query.lte(col_30730,v_30736);

break;
case "gt":
query.gt(col_30730,v_30736);

break;
case "gte":
query.gte(col_30730,v_30736);

break;
case "like":
query.like(col_30730,v_30736);

break;
case "ilike":
query.ilike(col_30730,v_30736);

break;
case "between":
var vec__30624_30744 = val_30731;
var __30745 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30624_30744,(0),null);
var min_val_30746 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30624_30744,(1),null);
var max_val_30747 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30624_30744,(2),null);
query.gte(col_30730,min_val_30746);

query.lte(col_30730,max_val_30747);

break;
default:
query.eq(col_30730,v_30736);

}
} else {
query.eq(col_30730,val_30731);
}


var G__30748 = seq__30577_30725;
var G__30749 = chunk__30578_30726;
var G__30750 = count__30579_30727;
var G__30751 = (i__30580_30728 + (1));
seq__30577_30725 = G__30748;
chunk__30578_30726 = G__30749;
count__30579_30727 = G__30750;
i__30580_30728 = G__30751;
continue;
} else {
var temp__5823__auto___30752 = cljs.core.seq(seq__30577_30725);
if(temp__5823__auto___30752){
var seq__30577_30753__$1 = temp__5823__auto___30752;
if(cljs.core.chunked_seq_QMARK_(seq__30577_30753__$1)){
var c__5548__auto___30754 = cljs.core.chunk_first(seq__30577_30753__$1);
var G__30755 = cljs.core.chunk_rest(seq__30577_30753__$1);
var G__30756 = c__5548__auto___30754;
var G__30757 = cljs.core.count(c__5548__auto___30754);
var G__30758 = (0);
seq__30577_30725 = G__30755;
chunk__30578_30726 = G__30756;
count__30579_30727 = G__30757;
i__30580_30728 = G__30758;
continue;
} else {
var vec__30631_30759 = cljs.core.first(seq__30577_30753__$1);
var col_30760 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30631_30759,(0),null);
var val_30761 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30631_30759,(1),null);
if(cljs.core.vector_QMARK_(val_30761)){
var vec__30637_30762 = val_30761;
var op_30763 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30637_30762,(0),null);
var v_30764 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30637_30762,(1),null);
var G__30640_30767 = op_30763;
var G__30640_30768__$1 = (((G__30640_30767 instanceof cljs.core.Keyword))?G__30640_30767.fqn:null);
switch (G__30640_30768__$1) {
case "eq":
query.eq(col_30760,v_30764);

break;
case "neq":
query.neq(col_30760,v_30764);

break;
case "lt":
query.lt(col_30760,v_30764);

break;
case "lte":
query.lte(col_30760,v_30764);

break;
case "gt":
query.gt(col_30760,v_30764);

break;
case "gte":
query.gte(col_30760,v_30764);

break;
case "like":
query.like(col_30760,v_30764);

break;
case "ilike":
query.ilike(col_30760,v_30764);

break;
case "between":
var vec__30645_30774 = val_30761;
var __30775 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30645_30774,(0),null);
var min_val_30776 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30645_30774,(1),null);
var max_val_30777 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30645_30774,(2),null);
query.gte(col_30760,min_val_30776);

query.lte(col_30760,max_val_30777);

break;
default:
query.eq(col_30760,v_30764);

}
} else {
query.eq(col_30760,val_30761);
}


var G__30779 = cljs.core.next(seq__30577_30753__$1);
var G__30780 = null;
var G__30781 = (0);
var G__30782 = (0);
seq__30577_30725 = G__30779;
chunk__30578_30726 = G__30780;
count__30579_30727 = G__30781;
i__30580_30728 = G__30782;
continue;
}
} else {
}
}
break;
}

var temp__5823__auto___30786 = new cljs.core.Keyword(null,"order-by","order-by",1527318070).cljs$core$IFn$_invoke$arity$1(options);
if(cljs.core.truth_(temp__5823__auto___30786)){
var vec__30672_30787 = temp__5823__auto___30786;
var col_30788 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30672_30787,(0),null);
var orden_30789 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30672_30787,(1),null);
query.order(cljs.core.name(col_30788),({"ascending": cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(orden_30789,new cljs.core.Keyword(null,"asc","asc",356854569))}));
} else {
}

var temp__5823__auto___30790 = new cljs.core.Keyword(null,"limit","limit",-1355822363).cljs$core$IFn$_invoke$arity$1(options);
if(cljs.core.truth_(temp__5823__auto___30790)){
var limit_30791 = temp__5823__auto___30790;
query.limit(limit_30791);
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
var len__5749__auto___30817 = arguments.length;
var i__5750__auto___30818 = (0);
while(true){
if((i__5750__auto___30818 < len__5749__auto___30817)){
args__5755__auto__.push((arguments[i__5750__auto___30818]));

var G__30821 = (i__5750__auto___30818 + (1));
i__5750__auto___30818 = G__30821;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return universo.db.crud.get_latest.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(universo.db.crud.get_latest.cljs$core$IFn$_invoke$arity$variadic = (function (table_name,p__30706){
var vec__30707 = p__30706;
var filters = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30707,(0),null);
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
(universo.db.crud.get_latest.cljs$lang$applyTo = (function (seq30675){
var G__30676 = cljs.core.first(seq30675);
var seq30675__$1 = cljs.core.next(seq30675);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__30676,seq30675__$1);
}));

/**
 * Obtiene el registro con el valor máximo en una columna específica
 */
universo.db.crud.get_max_value = (function universo$db$crud$get_max_value(var_args){
var args__5755__auto__ = [];
var len__5749__auto___30823 = arguments.length;
var i__5750__auto___30824 = (0);
while(true){
if((i__5750__auto___30824 < len__5749__auto___30823)){
args__5755__auto__.push((arguments[i__5750__auto___30824]));

var G__30826 = (i__5750__auto___30824 + (1));
i__5750__auto___30824 = G__30826;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((2) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((2)),(0),null)):null);
return universo.db.crud.get_max_value.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5756__auto__);
});

(universo.db.crud.get_max_value.cljs$core$IFn$_invoke$arity$variadic = (function (table_name,column,p__30718){
var vec__30719 = p__30718;
var filters = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__30719,(0),null);
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
(universo.db.crud.get_max_value.cljs$lang$applyTo = (function (seq30714){
var G__30715 = cljs.core.first(seq30714);
var seq30714__$1 = cljs.core.next(seq30714);
var G__30716 = cljs.core.first(seq30714__$1);
var seq30714__$2 = cljs.core.next(seq30714__$1);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__30715,G__30716,seq30714__$2);
}));


//# sourceMappingURL=universo.db.crud.js.map
