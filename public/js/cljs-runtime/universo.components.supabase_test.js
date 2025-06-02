goog.provide('universo.components.supabase_test');
universo.components.supabase_test.supabase_test = (function universo$components$supabase_test$supabase_test(){
var status = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("inicial");
var visitor_data = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var all_visitors = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"\uD83E\uDDEA Test de Conexi\u00F3n Supabase"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Status: ",cljs.core.deref(status)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_(status,"insertando...");

var c__11659__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__11660__auto__ = (function (){var switch__11495__auto__ = (function (state_12543){
var state_val_12544 = (state_12543[(1)]);
if((state_val_12544 === (7))){
var inst_12535 = cljs.core.reset_BANG_(status,"\u2705 Insertado exitosamente!");
var state_12543__$1 = state_12543;
var statearr_12545_12594 = state_12543__$1;
(statearr_12545_12594[(2)] = inst_12535);

(statearr_12545_12594[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12544 === (1))){
var inst_12510 = console.log("\uD83D\uDE80 Iniciando inserci\u00F3n...");
var inst_12511 = universo.ip.fetch_ip_info();
var state_12543__$1 = (function (){var statearr_12546 = state_12543;
(statearr_12546[(7)] = inst_12510);

return statearr_12546;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_12543__$1,(2),inst_12511);
} else {
if((state_val_12544 === (4))){
var inst_12514 = (state_12543[(8)]);
var state_12543__$1 = state_12543;
var statearr_12547_12595 = state_12543__$1;
(statearr_12547_12595[(2)] = inst_12514);

(statearr_12547_12595[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12544 === (6))){
var inst_12532 = (state_12543[(9)]);
var inst_12532__$1 = (state_12543[(2)]);
var inst_12533 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_12532__$1);
var state_12543__$1 = (function (){var statearr_12548 = state_12543;
(statearr_12548[(9)] = inst_12532__$1);

return statearr_12548;
})();
if(cljs.core.truth_(inst_12533)){
var statearr_12549_12596 = state_12543__$1;
(statearr_12549_12596[(1)] = (7));

} else {
var statearr_12550_12597 = state_12543__$1;
(statearr_12550_12597[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12544 === (3))){
var inst_12514 = (state_12543[(8)]);
var inst_12513 = (state_12543[(10)]);
var inst_12517 = [new cljs.core.Keyword(null,"pais","pais",1648581293),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680)];
var inst_12518 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_12513);
var inst_12519 = new cljs.core.Keyword(null,"country_name","country_name",1205772562).cljs$core$IFn$_invoke$arity$1(inst_12518);
var inst_12520 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_12513);
var inst_12521 = new cljs.core.Keyword(null,"city","city",-393302614).cljs$core$IFn$_invoke$arity$1(inst_12520);
var inst_12522 = [inst_12519,inst_12521];
var inst_12523 = cljs.core.PersistentHashMap.fromArrays(inst_12517,inst_12522);
var inst_12524 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_12514,inst_12523], 0));
var state_12543__$1 = state_12543;
var statearr_12551_12598 = state_12543__$1;
(statearr_12551_12598[(2)] = inst_12524);

(statearr_12551_12598[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12544 === (2))){
var inst_12513 = (state_12543[(10)]);
var inst_12513__$1 = (state_12543[(2)]);
var inst_12514 = universo.db.visitante.collect_visitor_data();
var inst_12515 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_12513__$1);
var state_12543__$1 = (function (){var statearr_12552 = state_12543;
(statearr_12552[(8)] = inst_12514);

(statearr_12552[(10)] = inst_12513__$1);

return statearr_12552;
})();
if(cljs.core.truth_(inst_12515)){
var statearr_12553_12599 = state_12543__$1;
(statearr_12553_12599[(1)] = (3));

} else {
var statearr_12554_12600 = state_12543__$1;
(statearr_12554_12600[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12544 === (9))){
var inst_12541 = (state_12543[(2)]);
var state_12543__$1 = state_12543;
return cljs.core.async.impl.ioc_helpers.return_chan(state_12543__$1,inst_12541);
} else {
if((state_val_12544 === (5))){
var inst_12527 = (state_12543[(2)]);
var inst_12528 = console.log("\uD83D\uDCCB Datos finales a insertar:",inst_12527);
var inst_12529 = cljs.core.reset_BANG_(visitor_data,inst_12527);
var inst_12530 = universo.db.visitante.insert_visitor_BANG_(inst_12527);
var state_12543__$1 = (function (){var statearr_12555 = state_12543;
(statearr_12555[(11)] = inst_12528);

(statearr_12555[(12)] = inst_12529);

return statearr_12555;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_12543__$1,(6),inst_12530);
} else {
if((state_val_12544 === (8))){
var inst_12532 = (state_12543[(9)]);
var inst_12537 = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(inst_12532);
var inst_12538 = ["\u274C Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_12537)].join('');
var inst_12539 = cljs.core.reset_BANG_(status,inst_12538);
var state_12543__$1 = state_12543;
var statearr_12556_12601 = state_12543__$1;
(statearr_12556_12601[(2)] = inst_12539);

(statearr_12556_12601[(1)] = (9));


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
var universo$components$supabase_test$supabase_test_$_state_machine__11496__auto__ = null;
var universo$components$supabase_test$supabase_test_$_state_machine__11496__auto____0 = (function (){
var statearr_12557 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12557[(0)] = universo$components$supabase_test$supabase_test_$_state_machine__11496__auto__);

(statearr_12557[(1)] = (1));

return statearr_12557;
});
var universo$components$supabase_test$supabase_test_$_state_machine__11496__auto____1 = (function (state_12543){
while(true){
var ret_value__11497__auto__ = (function (){try{while(true){
var result__11498__auto__ = switch__11495__auto__(state_12543);
if(cljs.core.keyword_identical_QMARK_(result__11498__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11498__auto__;
}
break;
}
}catch (e12558){var ex__11499__auto__ = e12558;
var statearr_12559_12602 = state_12543;
(statearr_12559_12602[(2)] = ex__11499__auto__);


if(cljs.core.seq((state_12543[(4)]))){
var statearr_12560_12603 = state_12543;
(statearr_12560_12603[(1)] = cljs.core.first((state_12543[(4)])));

} else {
throw ex__11499__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__11497__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12604 = state_12543;
state_12543 = G__12604;
continue;
} else {
return ret_value__11497__auto__;
}
break;
}
});
universo$components$supabase_test$supabase_test_$_state_machine__11496__auto__ = function(state_12543){
switch(arguments.length){
case 0:
return universo$components$supabase_test$supabase_test_$_state_machine__11496__auto____0.call(this);
case 1:
return universo$components$supabase_test$supabase_test_$_state_machine__11496__auto____1.call(this,state_12543);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$components$supabase_test$supabase_test_$_state_machine__11496__auto__.cljs$core$IFn$_invoke$arity$0 = universo$components$supabase_test$supabase_test_$_state_machine__11496__auto____0;
universo$components$supabase_test$supabase_test_$_state_machine__11496__auto__.cljs$core$IFn$_invoke$arity$1 = universo$components$supabase_test$supabase_test_$_state_machine__11496__auto____1;
return universo$components$supabase_test$supabase_test_$_state_machine__11496__auto__;
})()
})();
var state__11661__auto__ = (function (){var statearr_12561 = f__11660__auto__();
(statearr_12561[(6)] = c__11659__auto__);

return statearr_12561;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__11661__auto__);
}));

return c__11659__auto__;
})], null),"Insertar Visitante"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_(status,"obteniendo datos...");

var c__11659__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__11660__auto__ = (function (){var switch__11495__auto__ = (function (state_12577){
var state_val_12578 = (state_12577[(1)]);
if((state_val_12578 === (1))){
var inst_12562 = universo.db.visitante.get_all_visitors();
var state_12577__$1 = state_12577;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_12577__$1,(2),inst_12562);
} else {
if((state_val_12578 === (2))){
var inst_12564 = (state_12577[(7)]);
var inst_12564__$1 = (state_12577[(2)]);
var inst_12565 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_12564__$1);
var state_12577__$1 = (function (){var statearr_12579 = state_12577;
(statearr_12579[(7)] = inst_12564__$1);

return statearr_12579;
})();
if(cljs.core.truth_(inst_12565)){
var statearr_12580_12605 = state_12577__$1;
(statearr_12580_12605[(1)] = (3));

} else {
var statearr_12581_12606 = state_12577__$1;
(statearr_12581_12606[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12578 === (3))){
var inst_12564 = (state_12577[(7)]);
var inst_12567 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_12564);
var inst_12568 = cljs.core.reset_BANG_(all_visitors,inst_12567);
var inst_12569 = cljs.core.reset_BANG_(status,"\u2705 Datos obtenidos!");
var state_12577__$1 = (function (){var statearr_12582 = state_12577;
(statearr_12582[(8)] = inst_12568);

return statearr_12582;
})();
var statearr_12583_12607 = state_12577__$1;
(statearr_12583_12607[(2)] = inst_12569);

(statearr_12583_12607[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12578 === (4))){
var inst_12564 = (state_12577[(7)]);
var inst_12571 = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(inst_12564);
var inst_12572 = ["\u274C Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_12571)].join('');
var inst_12573 = cljs.core.reset_BANG_(status,inst_12572);
var state_12577__$1 = state_12577;
var statearr_12584_12608 = state_12577__$1;
(statearr_12584_12608[(2)] = inst_12573);

(statearr_12584_12608[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12578 === (5))){
var inst_12575 = (state_12577[(2)]);
var state_12577__$1 = state_12577;
return cljs.core.async.impl.ioc_helpers.return_chan(state_12577__$1,inst_12575);
} else {
return null;
}
}
}
}
}
});
return (function() {
var universo$components$supabase_test$supabase_test_$_state_machine__11496__auto__ = null;
var universo$components$supabase_test$supabase_test_$_state_machine__11496__auto____0 = (function (){
var statearr_12585 = [null,null,null,null,null,null,null,null,null];
(statearr_12585[(0)] = universo$components$supabase_test$supabase_test_$_state_machine__11496__auto__);

(statearr_12585[(1)] = (1));

return statearr_12585;
});
var universo$components$supabase_test$supabase_test_$_state_machine__11496__auto____1 = (function (state_12577){
while(true){
var ret_value__11497__auto__ = (function (){try{while(true){
var result__11498__auto__ = switch__11495__auto__(state_12577);
if(cljs.core.keyword_identical_QMARK_(result__11498__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11498__auto__;
}
break;
}
}catch (e12586){var ex__11499__auto__ = e12586;
var statearr_12587_12609 = state_12577;
(statearr_12587_12609[(2)] = ex__11499__auto__);


if(cljs.core.seq((state_12577[(4)]))){
var statearr_12588_12610 = state_12577;
(statearr_12588_12610[(1)] = cljs.core.first((state_12577[(4)])));

} else {
throw ex__11499__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__11497__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12611 = state_12577;
state_12577 = G__12611;
continue;
} else {
return ret_value__11497__auto__;
}
break;
}
});
universo$components$supabase_test$supabase_test_$_state_machine__11496__auto__ = function(state_12577){
switch(arguments.length){
case 0:
return universo$components$supabase_test$supabase_test_$_state_machine__11496__auto____0.call(this);
case 1:
return universo$components$supabase_test$supabase_test_$_state_machine__11496__auto____1.call(this,state_12577);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$components$supabase_test$supabase_test_$_state_machine__11496__auto__.cljs$core$IFn$_invoke$arity$0 = universo$components$supabase_test$supabase_test_$_state_machine__11496__auto____0;
universo$components$supabase_test$supabase_test_$_state_machine__11496__auto__.cljs$core$IFn$_invoke$arity$1 = universo$components$supabase_test$supabase_test_$_state_machine__11496__auto____1;
return universo$components$supabase_test$supabase_test_$_state_machine__11496__auto__;
})()
})();
var state__11661__auto__ = (function (){var statearr_12589 = f__11660__auto__();
(statearr_12589[(6)] = c__11659__auto__);

return statearr_12589;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__11661__auto__);
}));

return c__11659__auto__;
})], null),"Obtener Todos"], null),(cljs.core.truth_(cljs.core.deref(visitor_data))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"\uD83D\uDCCB Datos a insertar:"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Pa\u00EDs: ",new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Ciudad: ",new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Timezone: ",new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Idioma: ",new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null)], null)], null):null),((cljs.core.seq(cljs.core.deref(all_visitors)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"\uD83D\uDC65 Visitantes en la BD:"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"border","border",1444987323),"1"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"ID"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Fecha"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Pa\u00EDs"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Ciudad"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Timezone"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Idioma"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),(function (){var iter__5480__auto__ = (function universo$components$supabase_test$supabase_test_$_iter__12590(s__12591){
return (new cljs.core.LazySeq(null,(function (){
var s__12591__$1 = s__12591;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__12591__$1);
if(temp__5804__auto__){
var s__12591__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__12591__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__12591__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__12593 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__12592 = (0);
while(true){
if((i__12592 < size__5479__auto__)){
var visitor = cljs.core._nth(c__5478__auto__,i__12592);
cljs.core.chunk_append(b__12593,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(visitor).substring((0),(19))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(visitor)], null)], null));

var G__12612 = (i__12592 + (1));
i__12592 = G__12612;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__12593),universo$components$supabase_test$supabase_test_$_iter__12590(cljs.core.chunk_rest(s__12591__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__12593),null);
}
} else {
var visitor = cljs.core.first(s__12591__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(visitor).substring((0),(19))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(visitor)], null)], null),universo$components$supabase_test$supabase_test_$_iter__12590(cljs.core.rest(s__12591__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(cljs.core.deref(all_visitors));
})()], null)], null)], null):null)], null);
});
});

//# sourceMappingURL=universo.components.supabase_test.js.map
