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
var G__24768 = arguments.length;
switch (G__24768) {
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
var seq__24775_24866 = cljs.core.seq(filters);
var chunk__24776_24867 = null;
var count__24777_24868 = (0);
var i__24778_24869 = (0);
while(true){
if((i__24778_24869 < count__24777_24868)){
var vec__24804_24870 = chunk__24776_24867.cljs$core$IIndexed$_nth$arity$2(null,i__24778_24869);
var col_24871 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24804_24870,(0),null);
var val_24872 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24804_24870,(1),null);
if(cljs.core.vector_QMARK_(val_24872)){
var vec__24807_24873 = val_24872;
var op_24874 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24807_24873,(0),null);
var v_24875 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24807_24873,(1),null);
var G__24810_24876 = op_24874;
var G__24810_24877__$1 = (((G__24810_24876 instanceof cljs.core.Keyword))?G__24810_24876.fqn:null);
switch (G__24810_24877__$1) {
case "eq":
query.eq(col_24871,v_24875);

break;
case "neq":
query.neq(col_24871,v_24875);

break;
case "lt":
query.lt(col_24871,v_24875);

break;
case "lte":
query.lte(col_24871,v_24875);

break;
case "gt":
query.gt(col_24871,v_24875);

break;
case "gte":
query.gte(col_24871,v_24875);

break;
case "like":
query.like(col_24871,v_24875);

break;
case "ilike":
query.ilike(col_24871,v_24875);

break;
case "between":
var vec__24811_24889 = val_24872;
var __24890 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24811_24889,(0),null);
var min_val_24891 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24811_24889,(1),null);
var max_val_24892 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24811_24889,(2),null);
query.gte(col_24871,min_val_24891);

query.lte(col_24871,max_val_24892);

break;
default:
query.eq(col_24871,v_24875);

}
} else {
query.eq(col_24871,val_24872);
}


var G__24893 = seq__24775_24866;
var G__24894 = chunk__24776_24867;
var G__24895 = count__24777_24868;
var G__24896 = (i__24778_24869 + (1));
seq__24775_24866 = G__24893;
chunk__24776_24867 = G__24894;
count__24777_24868 = G__24895;
i__24778_24869 = G__24896;
continue;
} else {
var temp__5804__auto___24897 = cljs.core.seq(seq__24775_24866);
if(temp__5804__auto___24897){
var seq__24775_24898__$1 = temp__5804__auto___24897;
if(cljs.core.chunked_seq_QMARK_(seq__24775_24898__$1)){
var c__5525__auto___24899 = cljs.core.chunk_first(seq__24775_24898__$1);
var G__24900 = cljs.core.chunk_rest(seq__24775_24898__$1);
var G__24901 = c__5525__auto___24899;
var G__24902 = cljs.core.count(c__5525__auto___24899);
var G__24903 = (0);
seq__24775_24866 = G__24900;
chunk__24776_24867 = G__24901;
count__24777_24868 = G__24902;
i__24778_24869 = G__24903;
continue;
} else {
var vec__24817_24904 = cljs.core.first(seq__24775_24898__$1);
var col_24905 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24817_24904,(0),null);
var val_24906 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24817_24904,(1),null);
if(cljs.core.vector_QMARK_(val_24906)){
var vec__24821_24907 = val_24906;
var op_24908 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24821_24907,(0),null);
var v_24909 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24821_24907,(1),null);
var G__24824_24910 = op_24908;
var G__24824_24911__$1 = (((G__24824_24910 instanceof cljs.core.Keyword))?G__24824_24910.fqn:null);
switch (G__24824_24911__$1) {
case "eq":
query.eq(col_24905,v_24909);

break;
case "neq":
query.neq(col_24905,v_24909);

break;
case "lt":
query.lt(col_24905,v_24909);

break;
case "lte":
query.lte(col_24905,v_24909);

break;
case "gt":
query.gt(col_24905,v_24909);

break;
case "gte":
query.gte(col_24905,v_24909);

break;
case "like":
query.like(col_24905,v_24909);

break;
case "ilike":
query.ilike(col_24905,v_24909);

break;
case "between":
var vec__24826_24913 = val_24906;
var __24914 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24826_24913,(0),null);
var min_val_24915 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24826_24913,(1),null);
var max_val_24916 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24826_24913,(2),null);
query.gte(col_24905,min_val_24915);

query.lte(col_24905,max_val_24916);

break;
default:
query.eq(col_24905,v_24909);

}
} else {
query.eq(col_24905,val_24906);
}


var G__24917 = cljs.core.next(seq__24775_24898__$1);
var G__24918 = null;
var G__24919 = (0);
var G__24920 = (0);
seq__24775_24866 = G__24917;
chunk__24776_24867 = G__24918;
count__24777_24868 = G__24919;
i__24778_24869 = G__24920;
continue;
}
} else {
}
}
break;
}

var temp__5804__auto___24921 = new cljs.core.Keyword(null,"order-by","order-by",1527318070).cljs$core$IFn$_invoke$arity$1(options);
if(cljs.core.truth_(temp__5804__auto___24921)){
var vec__24830_24923 = temp__5804__auto___24921;
var col_24924 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24830_24923,(0),null);
var orden_24925 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24830_24923,(1),null);
query.order(cljs.core.name(col_24924),({"ascending": cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(orden_24925,new cljs.core.Keyword(null,"asc","asc",356854569))}));
} else {
}

var temp__5804__auto___24931 = new cljs.core.Keyword(null,"limit","limit",-1355822363).cljs$core$IFn$_invoke$arity$1(options);
if(cljs.core.truth_(temp__5804__auto___24931)){
var limit_24932 = temp__5804__auto___24931;
query.limit(limit_24932);
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
var args__5732__auto__ = [];
var len__5726__auto___24933 = arguments.length;
var i__5727__auto___24934 = (0);
while(true){
if((i__5727__auto___24934 < len__5726__auto___24933)){
args__5732__auto__.push((arguments[i__5727__auto___24934]));

var G__24935 = (i__5727__auto___24934 + (1));
i__5727__auto___24934 = G__24935;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return universo.db.crud.get_latest.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(universo.db.crud.get_latest.cljs$core$IFn$_invoke$arity$variadic = (function (table_name,p__24841){
var vec__24842 = p__24841;
var filters = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24842,(0),null);
return universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$3(table_name,(function (){var or__5002__auto__ = filters;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})(),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"order-by","order-by",1527318070),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"created_at","created_at",1484050750),new cljs.core.Keyword(null,"desc","desc",2093485764)], null),new cljs.core.Keyword(null,"limit","limit",-1355822363),(1),new cljs.core.Keyword(null,"single","single",1551466437),true], null));
}));

(universo.db.crud.get_latest.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(universo.db.crud.get_latest.cljs$lang$applyTo = (function (seq24838){
var G__24839 = cljs.core.first(seq24838);
var seq24838__$1 = cljs.core.next(seq24838);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__24839,seq24838__$1);
}));

/**
 * Obtiene el registro con el valor máximo en una columna específica
 */
universo.db.crud.get_max_value = (function universo$db$crud$get_max_value(var_args){
var args__5732__auto__ = [];
var len__5726__auto___24937 = arguments.length;
var i__5727__auto___24938 = (0);
while(true){
if((i__5727__auto___24938 < len__5726__auto___24937)){
args__5732__auto__.push((arguments[i__5727__auto___24938]));

var G__24939 = (i__5727__auto___24938 + (1));
i__5727__auto___24938 = G__24939;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return universo.db.crud.get_max_value.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(universo.db.crud.get_max_value.cljs$core$IFn$_invoke$arity$variadic = (function (table_name,column,p__24852){
var vec__24853 = p__24852;
var filters = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24853,(0),null);
return universo.db.crud.get_table.cljs$core$IFn$_invoke$arity$3(table_name,(function (){var or__5002__auto__ = filters;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})(),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"order-by","order-by",1527318070),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [column,new cljs.core.Keyword(null,"desc","desc",2093485764)], null),new cljs.core.Keyword(null,"limit","limit",-1355822363),(1),new cljs.core.Keyword(null,"single","single",1551466437),true], null));
}));

(universo.db.crud.get_max_value.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(universo.db.crud.get_max_value.cljs$lang$applyTo = (function (seq24847){
var G__24848 = cljs.core.first(seq24847);
var seq24847__$1 = cljs.core.next(seq24847);
var G__24849 = cljs.core.first(seq24847__$1);
var seq24847__$2 = cljs.core.next(seq24847__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__24848,G__24849,seq24847__$2);
}));


//# sourceMappingURL=universo.db.crud.js.map
