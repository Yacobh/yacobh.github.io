goog.provide('universo.components.supabase_test');
universo.components.supabase_test.supabase_test = (function universo$components$supabase_test$supabase_test(){
var status = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("inicial");
var visitor_data = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var all_visitors = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"\uD83E\uDDEA Test de Conexi\u00F3n Supabase"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Status: ",cljs.core.deref(status)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_(status,"insertando...");

var c__28264__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__28265__auto__ = (function (){var switch__28167__auto__ = (function (state_29199){
var state_val_29202 = (state_29199[(1)]);
if((state_val_29202 === (7))){
var inst_29179 = cljs.core.reset_BANG_(status,"\u2705 Insertado exitosamente!");
var state_29199__$1 = state_29199;
var statearr_29203_29366 = state_29199__$1;
(statearr_29203_29366[(2)] = inst_29179);

(statearr_29203_29366[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29202 === (1))){
var inst_29102 = console.log("\uD83D\uDE80 Iniciando inserci\u00F3n...");
var inst_29111 = universo.ip.fetch_ip_info();
var state_29199__$1 = (function (){var statearr_29205 = state_29199;
(statearr_29205[(7)] = inst_29102);

return statearr_29205;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_29199__$1,(2),inst_29111);
} else {
if((state_val_29202 === (4))){
var inst_29114 = (state_29199[(8)]);
var state_29199__$1 = state_29199;
var statearr_29208_29369 = state_29199__$1;
(statearr_29208_29369[(2)] = inst_29114);

(statearr_29208_29369[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29202 === (6))){
var inst_29176 = (state_29199[(9)]);
var inst_29176__$1 = (state_29199[(2)]);
var inst_29177 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_29176__$1);
var state_29199__$1 = (function (){var statearr_29211 = state_29199;
(statearr_29211[(9)] = inst_29176__$1);

return statearr_29211;
})();
if(cljs.core.truth_(inst_29177)){
var statearr_29213_29370 = state_29199__$1;
(statearr_29213_29370[(1)] = (7));

} else {
var statearr_29214_29371 = state_29199__$1;
(statearr_29214_29371[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29202 === (3))){
var inst_29113 = (state_29199[(10)]);
var inst_29114 = (state_29199[(8)]);
var inst_29135 = [new cljs.core.Keyword(null,"pais","pais",1648581293),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680)];
var inst_29139 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_29113);
var inst_29140 = new cljs.core.Keyword(null,"country_name","country_name",1205772562).cljs$core$IFn$_invoke$arity$1(inst_29139);
var inst_29143 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_29113);
var inst_29145 = new cljs.core.Keyword(null,"city","city",-393302614).cljs$core$IFn$_invoke$arity$1(inst_29143);
var inst_29147 = [inst_29140,inst_29145];
var inst_29148 = cljs.core.PersistentHashMap.fromArrays(inst_29135,inst_29147);
var inst_29150 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_29114,inst_29148], 0));
var state_29199__$1 = state_29199;
var statearr_29220_29374 = state_29199__$1;
(statearr_29220_29374[(2)] = inst_29150);

(statearr_29220_29374[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29202 === (2))){
var inst_29113 = (state_29199[(10)]);
var inst_29113__$1 = (state_29199[(2)]);
var inst_29114 = universo.db.crud.collect_visitor_data();
var inst_29125 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_29113__$1);
var state_29199__$1 = (function (){var statearr_29222 = state_29199;
(statearr_29222[(10)] = inst_29113__$1);

(statearr_29222[(8)] = inst_29114);

return statearr_29222;
})();
if(cljs.core.truth_(inst_29125)){
var statearr_29225_29378 = state_29199__$1;
(statearr_29225_29378[(1)] = (3));

} else {
var statearr_29227_29379 = state_29199__$1;
(statearr_29227_29379[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29202 === (9))){
var inst_29195 = (state_29199[(2)]);
var state_29199__$1 = state_29199;
return cljs.core.async.impl.ioc_helpers.return_chan(state_29199__$1,inst_29195);
} else {
if((state_val_29202 === (5))){
var inst_29171 = (state_29199[(2)]);
var inst_29172 = console.log("\uD83D\uDCCB Datos finales a insertar:",inst_29171);
var inst_29173 = cljs.core.reset_BANG_(visitor_data,inst_29171);
var inst_29174 = universo.db.crud.insert_data_table_BANG_(inst_29171,"visitor");
var state_29199__$1 = (function (){var statearr_29230 = state_29199;
(statearr_29230[(11)] = inst_29172);

(statearr_29230[(12)] = inst_29173);

return statearr_29230;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_29199__$1,(6),inst_29174);
} else {
if((state_val_29202 === (8))){
var inst_29176 = (state_29199[(9)]);
var inst_29191 = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(inst_29176);
var inst_29192 = ["\u274C Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_29191)].join('');
var inst_29193 = cljs.core.reset_BANG_(status,inst_29192);
var state_29199__$1 = state_29199;
var statearr_29236_29380 = state_29199__$1;
(statearr_29236_29380[(2)] = inst_29193);

(statearr_29236_29380[(1)] = (9));


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
});
return (function() {
var universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__ = null;
var universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0 = (function (){
var statearr_29240 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_29240[(0)] = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__);

(statearr_29240[(1)] = (1));

return statearr_29240;
});
var universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1 = (function (state_29199){
while(true){
var ret_value__28169__auto__ = (function (){try{while(true){
var result__28170__auto__ = switch__28167__auto__(state_29199);
if(cljs.core.keyword_identical_QMARK_(result__28170__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__28170__auto__;
}
break;
}
}catch (e29241){var ex__28171__auto__ = e29241;
var statearr_29242_29381 = state_29199;
(statearr_29242_29381[(2)] = ex__28171__auto__);


if(cljs.core.seq((state_29199[(4)]))){
var statearr_29243_29382 = state_29199;
(statearr_29243_29382[(1)] = cljs.core.first((state_29199[(4)])));

} else {
throw ex__28171__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__28169__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29383 = state_29199;
state_29199 = G__29383;
continue;
} else {
return ret_value__28169__auto__;
}
break;
}
});
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__ = function(state_29199){
switch(arguments.length){
case 0:
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0.call(this);
case 1:
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1.call(this,state_29199);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__.cljs$core$IFn$_invoke$arity$0 = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0;
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__.cljs$core$IFn$_invoke$arity$1 = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1;
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__;
})()
})();
var state__28266__auto__ = (function (){var statearr_29246 = f__28265__auto__();
(statearr_29246[(6)] = c__28264__auto__);

return statearr_29246;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__28266__auto__);
}));

return c__28264__auto__;
})], null),"Insertar Visitante"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_(status,"obteniendo datos...");

var c__28264__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__28265__auto__ = (function (){var switch__28167__auto__ = (function (state_29289){
var state_val_29290 = (state_29289[(1)]);
if((state_val_29290 === (1))){
var inst_29264 = universo.db.crud.get_all_table("visitor");
var state_29289__$1 = state_29289;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_29289__$1,(2),inst_29264);
} else {
if((state_val_29290 === (2))){
var inst_29268 = (state_29289[(7)]);
var inst_29268__$1 = (state_29289[(2)]);
var inst_29270 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_29268__$1);
var state_29289__$1 = (function (){var statearr_29296 = state_29289;
(statearr_29296[(7)] = inst_29268__$1);

return statearr_29296;
})();
if(cljs.core.truth_(inst_29270)){
var statearr_29298_29384 = state_29289__$1;
(statearr_29298_29384[(1)] = (3));

} else {
var statearr_29299_29385 = state_29289__$1;
(statearr_29299_29385[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29290 === (3))){
var inst_29268 = (state_29289[(7)]);
var inst_29277 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_29268);
var inst_29278 = cljs.core.reset_BANG_(all_visitors,inst_29277);
var inst_29279 = cljs.core.reset_BANG_(status,"\u2705 Datos obtenidos!");
var state_29289__$1 = (function (){var statearr_29302 = state_29289;
(statearr_29302[(8)] = inst_29278);

return statearr_29302;
})();
var statearr_29304_29386 = state_29289__$1;
(statearr_29304_29386[(2)] = inst_29279);

(statearr_29304_29386[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29290 === (4))){
var inst_29268 = (state_29289[(7)]);
var inst_29283 = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(inst_29268);
var inst_29284 = ["\u274C Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_29283)].join('');
var inst_29285 = cljs.core.reset_BANG_(status,inst_29284);
var state_29289__$1 = state_29289;
var statearr_29307_29387 = state_29289__$1;
(statearr_29307_29387[(2)] = inst_29285);

(statearr_29307_29387[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29290 === (5))){
var inst_29287 = (state_29289[(2)]);
var state_29289__$1 = state_29289;
return cljs.core.async.impl.ioc_helpers.return_chan(state_29289__$1,inst_29287);
} else {
return null;
}
}
}
}
}
});
return (function() {
var universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__ = null;
var universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0 = (function (){
var statearr_29311 = [null,null,null,null,null,null,null,null,null];
(statearr_29311[(0)] = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__);

(statearr_29311[(1)] = (1));

return statearr_29311;
});
var universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1 = (function (state_29289){
while(true){
var ret_value__28169__auto__ = (function (){try{while(true){
var result__28170__auto__ = switch__28167__auto__(state_29289);
if(cljs.core.keyword_identical_QMARK_(result__28170__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__28170__auto__;
}
break;
}
}catch (e29314){var ex__28171__auto__ = e29314;
var statearr_29316_29388 = state_29289;
(statearr_29316_29388[(2)] = ex__28171__auto__);


if(cljs.core.seq((state_29289[(4)]))){
var statearr_29317_29389 = state_29289;
(statearr_29317_29389[(1)] = cljs.core.first((state_29289[(4)])));

} else {
throw ex__28171__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__28169__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29390 = state_29289;
state_29289 = G__29390;
continue;
} else {
return ret_value__28169__auto__;
}
break;
}
});
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__ = function(state_29289){
switch(arguments.length){
case 0:
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0.call(this);
case 1:
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1.call(this,state_29289);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__.cljs$core$IFn$_invoke$arity$0 = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0;
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__.cljs$core$IFn$_invoke$arity$1 = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1;
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__;
})()
})();
var state__28266__auto__ = (function (){var statearr_29323 = f__28265__auto__();
(statearr_29323[(6)] = c__28264__auto__);

return statearr_29323;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__28266__auto__);
}));

return c__28264__auto__;
})], null),"Obtener Todos"], null),(cljs.core.truth_(cljs.core.deref(visitor_data))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"\uD83D\uDCCB Datos a insertar:"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Pa\u00EDs: ",new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Ciudad: ",new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Timezone: ",new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Idioma: ",new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null)], null)], null):null),((cljs.core.seq(cljs.core.deref(all_visitors)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"\uD83D\uDC65 Visitantes en la BD:"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"border","border",1444987323),"1"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"ID"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Fecha"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Pa\u00EDs"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Ciudad"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Timezone"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Idioma"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),(function (){var iter__5503__auto__ = (function universo$components$supabase_test$supabase_test_$_iter__29343(s__29344){
return (new cljs.core.LazySeq(null,(function (){
var s__29344__$1 = s__29344;
while(true){
var temp__5823__auto__ = cljs.core.seq(s__29344__$1);
if(temp__5823__auto__){
var s__29344__$2 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(s__29344__$2)){
var c__5501__auto__ = cljs.core.chunk_first(s__29344__$2);
var size__5502__auto__ = cljs.core.count(c__5501__auto__);
var b__29347 = cljs.core.chunk_buffer(size__5502__auto__);
if((function (){var i__29346 = (0);
while(true){
if((i__29346 < size__5502__auto__)){
var visitor = cljs.core._nth(c__5501__auto__,i__29346);
cljs.core.chunk_append(b__29347,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(visitor).substring((0),(19))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(visitor)], null)], null));

var G__29395 = (i__29346 + (1));
i__29346 = G__29395;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__29347),universo$components$supabase_test$supabase_test_$_iter__29343(cljs.core.chunk_rest(s__29344__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__29347),null);
}
} else {
var visitor = cljs.core.first(s__29344__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(visitor).substring((0),(19))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(visitor)], null)], null),universo$components$supabase_test$supabase_test_$_iter__29343(cljs.core.rest(s__29344__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5503__auto__(cljs.core.deref(all_visitors));
})()], null)], null)], null):null)], null);
});
});

//# sourceMappingURL=universo.components.supabase_test.js.map
