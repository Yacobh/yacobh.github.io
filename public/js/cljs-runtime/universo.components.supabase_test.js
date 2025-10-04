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
var f__28265__auto__ = (function (){var switch__28167__auto__ = (function (state_30545){
var state_val_30546 = (state_30545[(1)]);
if((state_val_30546 === (7))){
var inst_30537 = cljs.core.reset_BANG_(status,"\u2705 Insertado exitosamente!");
var state_30545__$1 = state_30545;
var statearr_30558_30714 = state_30545__$1;
(statearr_30558_30714[(2)] = inst_30537);

(statearr_30558_30714[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30546 === (1))){
var inst_30459 = console.log("\uD83D\uDE80 Iniciando inserci\u00F3n...");
var inst_30462 = universo.ip.fetch_ip_info();
var state_30545__$1 = (function (){var statearr_30567 = state_30545;
(statearr_30567[(7)] = inst_30459);

return statearr_30567;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_30545__$1,(2),inst_30462);
} else {
if((state_val_30546 === (4))){
var inst_30471 = (state_30545[(8)]);
var state_30545__$1 = state_30545;
var statearr_30570_30715 = state_30545__$1;
(statearr_30570_30715[(2)] = inst_30471);

(statearr_30570_30715[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30546 === (6))){
var inst_30532 = (state_30545[(9)]);
var inst_30532__$1 = (state_30545[(2)]);
var inst_30534 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_30532__$1);
var state_30545__$1 = (function (){var statearr_30579 = state_30545;
(statearr_30579[(9)] = inst_30532__$1);

return statearr_30579;
})();
if(cljs.core.truth_(inst_30534)){
var statearr_30582_30718 = state_30545__$1;
(statearr_30582_30718[(1)] = (7));

} else {
var statearr_30585_30719 = state_30545__$1;
(statearr_30585_30719[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30546 === (3))){
var inst_30467 = (state_30545[(10)]);
var inst_30471 = (state_30545[(8)]);
var inst_30487 = [new cljs.core.Keyword(null,"pais","pais",1648581293),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680)];
var inst_30490 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_30467);
var inst_30491 = new cljs.core.Keyword(null,"country_name","country_name",1205772562).cljs$core$IFn$_invoke$arity$1(inst_30490);
var inst_30492 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_30467);
var inst_30493 = new cljs.core.Keyword(null,"city","city",-393302614).cljs$core$IFn$_invoke$arity$1(inst_30492);
var inst_30494 = [inst_30491,inst_30493];
var inst_30497 = cljs.core.PersistentHashMap.fromArrays(inst_30487,inst_30494);
var inst_30498 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_30471,inst_30497], 0));
var state_30545__$1 = state_30545;
var statearr_30599_30722 = state_30545__$1;
(statearr_30599_30722[(2)] = inst_30498);

(statearr_30599_30722[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30546 === (2))){
var inst_30467 = (state_30545[(10)]);
var inst_30467__$1 = (state_30545[(2)]);
var inst_30471 = universo.db.crud.collect_visitor_data();
var inst_30472 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_30467__$1);
var state_30545__$1 = (function (){var statearr_30605 = state_30545;
(statearr_30605[(10)] = inst_30467__$1);

(statearr_30605[(8)] = inst_30471);

return statearr_30605;
})();
if(cljs.core.truth_(inst_30472)){
var statearr_30612_30727 = state_30545__$1;
(statearr_30612_30727[(1)] = (3));

} else {
var statearr_30614_30729 = state_30545__$1;
(statearr_30614_30729[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30546 === (9))){
var inst_30543 = (state_30545[(2)]);
var state_30545__$1 = state_30545;
return cljs.core.async.impl.ioc_helpers.return_chan(state_30545__$1,inst_30543);
} else {
if((state_val_30546 === (5))){
var inst_30511 = (state_30545[(2)]);
var inst_30523 = console.log("\uD83D\uDCCB Datos finales a insertar:",inst_30511);
var inst_30526 = cljs.core.reset_BANG_(visitor_data,inst_30511);
var inst_30530 = universo.db.crud.insert_data_table_BANG_(inst_30511,"visitor");
var state_30545__$1 = (function (){var statearr_30617 = state_30545;
(statearr_30617[(11)] = inst_30523);

(statearr_30617[(12)] = inst_30526);

return statearr_30617;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_30545__$1,(6),inst_30530);
} else {
if((state_val_30546 === (8))){
var inst_30532 = (state_30545[(9)]);
var inst_30539 = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(inst_30532);
var inst_30540 = ["\u274C Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_30539)].join('');
var inst_30541 = cljs.core.reset_BANG_(status,inst_30540);
var state_30545__$1 = state_30545;
var statearr_30624_30735 = state_30545__$1;
(statearr_30624_30735[(2)] = inst_30541);

(statearr_30624_30735[(1)] = (9));


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
var statearr_30627 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30627[(0)] = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__);

(statearr_30627[(1)] = (1));

return statearr_30627;
});
var universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1 = (function (state_30545){
while(true){
var ret_value__28169__auto__ = (function (){try{while(true){
var result__28170__auto__ = switch__28167__auto__(state_30545);
if(cljs.core.keyword_identical_QMARK_(result__28170__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__28170__auto__;
}
break;
}
}catch (e30629){var ex__28171__auto__ = e30629;
var statearr_30630_30739 = state_30545;
(statearr_30630_30739[(2)] = ex__28171__auto__);


if(cljs.core.seq((state_30545[(4)]))){
var statearr_30631_30740 = state_30545;
(statearr_30631_30740[(1)] = cljs.core.first((state_30545[(4)])));

} else {
throw ex__28171__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__28169__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30741 = state_30545;
state_30545 = G__30741;
continue;
} else {
return ret_value__28169__auto__;
}
break;
}
});
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__ = function(state_30545){
switch(arguments.length){
case 0:
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0.call(this);
case 1:
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1.call(this,state_30545);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__.cljs$core$IFn$_invoke$arity$0 = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0;
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__.cljs$core$IFn$_invoke$arity$1 = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1;
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__;
})()
})();
var state__28266__auto__ = (function (){var statearr_30638 = f__28265__auto__();
(statearr_30638[(6)] = c__28264__auto__);

return statearr_30638;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__28266__auto__);
}));

return c__28264__auto__;
})], null),"Insertar Visitante"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_(status,"obteniendo datos...");

var c__28264__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__28265__auto__ = (function (){var switch__28167__auto__ = (function (state_30668){
var state_val_30669 = (state_30668[(1)]);
if((state_val_30669 === (1))){
var inst_30653 = universo.db.crud.get_all_table("visitor");
var state_30668__$1 = state_30668;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_30668__$1,(2),inst_30653);
} else {
if((state_val_30669 === (2))){
var inst_30655 = (state_30668[(7)]);
var inst_30655__$1 = (state_30668[(2)]);
var inst_30656 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_30655__$1);
var state_30668__$1 = (function (){var statearr_30673 = state_30668;
(statearr_30673[(7)] = inst_30655__$1);

return statearr_30673;
})();
if(cljs.core.truth_(inst_30656)){
var statearr_30674_30746 = state_30668__$1;
(statearr_30674_30746[(1)] = (3));

} else {
var statearr_30675_30747 = state_30668__$1;
(statearr_30675_30747[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30669 === (3))){
var inst_30655 = (state_30668[(7)]);
var inst_30658 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_30655);
var inst_30659 = cljs.core.reset_BANG_(all_visitors,inst_30658);
var inst_30660 = cljs.core.reset_BANG_(status,"\u2705 Datos obtenidos!");
var state_30668__$1 = (function (){var statearr_30677 = state_30668;
(statearr_30677[(8)] = inst_30659);

return statearr_30677;
})();
var statearr_30678_30749 = state_30668__$1;
(statearr_30678_30749[(2)] = inst_30660);

(statearr_30678_30749[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30669 === (4))){
var inst_30655 = (state_30668[(7)]);
var inst_30662 = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(inst_30655);
var inst_30663 = ["\u274C Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_30662)].join('');
var inst_30664 = cljs.core.reset_BANG_(status,inst_30663);
var state_30668__$1 = state_30668;
var statearr_30680_30750 = state_30668__$1;
(statearr_30680_30750[(2)] = inst_30664);

(statearr_30680_30750[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30669 === (5))){
var inst_30666 = (state_30668[(2)]);
var state_30668__$1 = state_30668;
return cljs.core.async.impl.ioc_helpers.return_chan(state_30668__$1,inst_30666);
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
var statearr_30682 = [null,null,null,null,null,null,null,null,null];
(statearr_30682[(0)] = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__);

(statearr_30682[(1)] = (1));

return statearr_30682;
});
var universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1 = (function (state_30668){
while(true){
var ret_value__28169__auto__ = (function (){try{while(true){
var result__28170__auto__ = switch__28167__auto__(state_30668);
if(cljs.core.keyword_identical_QMARK_(result__28170__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__28170__auto__;
}
break;
}
}catch (e30685){var ex__28171__auto__ = e30685;
var statearr_30686_30752 = state_30668;
(statearr_30686_30752[(2)] = ex__28171__auto__);


if(cljs.core.seq((state_30668[(4)]))){
var statearr_30688_30753 = state_30668;
(statearr_30688_30753[(1)] = cljs.core.first((state_30668[(4)])));

} else {
throw ex__28171__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__28169__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30754 = state_30668;
state_30668 = G__30754;
continue;
} else {
return ret_value__28169__auto__;
}
break;
}
});
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__ = function(state_30668){
switch(arguments.length){
case 0:
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0.call(this);
case 1:
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1.call(this,state_30668);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__.cljs$core$IFn$_invoke$arity$0 = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0;
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__.cljs$core$IFn$_invoke$arity$1 = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1;
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__;
})()
})();
var state__28266__auto__ = (function (){var statearr_30690 = f__28265__auto__();
(statearr_30690[(6)] = c__28264__auto__);

return statearr_30690;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__28266__auto__);
}));

return c__28264__auto__;
})], null),"Obtener Todos"], null),(cljs.core.truth_(cljs.core.deref(visitor_data))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"\uD83D\uDCCB Datos a insertar:"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Pa\u00EDs: ",new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Ciudad: ",new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Timezone: ",new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Idioma: ",new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null)], null)], null):null),((cljs.core.seq(cljs.core.deref(all_visitors)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"\uD83D\uDC65 Visitantes en la BD:"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"border","border",1444987323),"1"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"ID"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Fecha"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Pa\u00EDs"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Ciudad"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Timezone"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Idioma"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),(function (){var iter__5503__auto__ = (function universo$components$supabase_test$supabase_test_$_iter__30695(s__30696){
return (new cljs.core.LazySeq(null,(function (){
var s__30696__$1 = s__30696;
while(true){
var temp__5823__auto__ = cljs.core.seq(s__30696__$1);
if(temp__5823__auto__){
var s__30696__$2 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(s__30696__$2)){
var c__5501__auto__ = cljs.core.chunk_first(s__30696__$2);
var size__5502__auto__ = cljs.core.count(c__5501__auto__);
var b__30698 = cljs.core.chunk_buffer(size__5502__auto__);
if((function (){var i__30697 = (0);
while(true){
if((i__30697 < size__5502__auto__)){
var visitor = cljs.core._nth(c__5501__auto__,i__30697);
cljs.core.chunk_append(b__30698,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(visitor).substring((0),(19))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(visitor)], null)], null));

var G__30756 = (i__30697 + (1));
i__30697 = G__30756;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__30698),universo$components$supabase_test$supabase_test_$_iter__30695(cljs.core.chunk_rest(s__30696__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__30698),null);
}
} else {
var visitor = cljs.core.first(s__30696__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(visitor).substring((0),(19))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(visitor)], null)], null),universo$components$supabase_test$supabase_test_$_iter__30695(cljs.core.rest(s__30696__$2)));
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
