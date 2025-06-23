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
var f__28265__auto__ = (function (){var switch__28167__auto__ = (function (state_29677){
var state_val_29678 = (state_29677[(1)]);
if((state_val_29678 === (7))){
var inst_29669 = cljs.core.reset_BANG_(status,"\u2705 Insertado exitosamente!");
var state_29677__$1 = state_29677;
var statearr_29680_29792 = state_29677__$1;
(statearr_29680_29792[(2)] = inst_29669);

(statearr_29680_29792[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29678 === (1))){
var inst_29627 = console.log("\uD83D\uDE80 Iniciando inserci\u00F3n...");
var inst_29631 = universo.ip.fetch_ip_info();
var state_29677__$1 = (function (){var statearr_29683 = state_29677;
(statearr_29683[(7)] = inst_29627);

return statearr_29683;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_29677__$1,(2),inst_29631);
} else {
if((state_val_29678 === (4))){
var inst_29634 = (state_29677[(8)]);
var state_29677__$1 = state_29677;
var statearr_29684_29793 = state_29677__$1;
(statearr_29684_29793[(2)] = inst_29634);

(statearr_29684_29793[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29678 === (6))){
var inst_29666 = (state_29677[(9)]);
var inst_29666__$1 = (state_29677[(2)]);
var inst_29667 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_29666__$1);
var state_29677__$1 = (function (){var statearr_29688 = state_29677;
(statearr_29688[(9)] = inst_29666__$1);

return statearr_29688;
})();
if(cljs.core.truth_(inst_29667)){
var statearr_29689_29794 = state_29677__$1;
(statearr_29689_29794[(1)] = (7));

} else {
var statearr_29690_29795 = state_29677__$1;
(statearr_29690_29795[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29678 === (3))){
var inst_29633 = (state_29677[(10)]);
var inst_29634 = (state_29677[(8)]);
var inst_29645 = [new cljs.core.Keyword(null,"pais","pais",1648581293),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680)];
var inst_29650 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_29633);
var inst_29651 = new cljs.core.Keyword(null,"country_name","country_name",1205772562).cljs$core$IFn$_invoke$arity$1(inst_29650);
var inst_29652 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_29633);
var inst_29653 = new cljs.core.Keyword(null,"city","city",-393302614).cljs$core$IFn$_invoke$arity$1(inst_29652);
var inst_29654 = [inst_29651,inst_29653];
var inst_29655 = cljs.core.PersistentHashMap.fromArrays(inst_29645,inst_29654);
var inst_29656 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_29634,inst_29655], 0));
var state_29677__$1 = state_29677;
var statearr_29692_29796 = state_29677__$1;
(statearr_29692_29796[(2)] = inst_29656);

(statearr_29692_29796[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29678 === (2))){
var inst_29633 = (state_29677[(10)]);
var inst_29633__$1 = (state_29677[(2)]);
var inst_29634 = universo.db.crud.collect_visitor_data();
var inst_29636 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_29633__$1);
var state_29677__$1 = (function (){var statearr_29696 = state_29677;
(statearr_29696[(10)] = inst_29633__$1);

(statearr_29696[(8)] = inst_29634);

return statearr_29696;
})();
if(cljs.core.truth_(inst_29636)){
var statearr_29698_29797 = state_29677__$1;
(statearr_29698_29797[(1)] = (3));

} else {
var statearr_29699_29798 = state_29677__$1;
(statearr_29699_29798[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29678 === (9))){
var inst_29675 = (state_29677[(2)]);
var state_29677__$1 = state_29677;
return cljs.core.async.impl.ioc_helpers.return_chan(state_29677__$1,inst_29675);
} else {
if((state_val_29678 === (5))){
var inst_29659 = (state_29677[(2)]);
var inst_29660 = console.log("\uD83D\uDCCB Datos finales a insertar:",inst_29659);
var inst_29662 = cljs.core.reset_BANG_(visitor_data,inst_29659);
var inst_29664 = universo.db.crud.insert_data_table_BANG_(inst_29659,"visitor");
var state_29677__$1 = (function (){var statearr_29702 = state_29677;
(statearr_29702[(11)] = inst_29660);

(statearr_29702[(12)] = inst_29662);

return statearr_29702;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_29677__$1,(6),inst_29664);
} else {
if((state_val_29678 === (8))){
var inst_29666 = (state_29677[(9)]);
var inst_29671 = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(inst_29666);
var inst_29672 = ["\u274C Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_29671)].join('');
var inst_29673 = cljs.core.reset_BANG_(status,inst_29672);
var state_29677__$1 = state_29677;
var statearr_29705_29799 = state_29677__$1;
(statearr_29705_29799[(2)] = inst_29673);

(statearr_29705_29799[(1)] = (9));


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
var statearr_29707 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_29707[(0)] = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__);

(statearr_29707[(1)] = (1));

return statearr_29707;
});
var universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1 = (function (state_29677){
while(true){
var ret_value__28169__auto__ = (function (){try{while(true){
var result__28170__auto__ = switch__28167__auto__(state_29677);
if(cljs.core.keyword_identical_QMARK_(result__28170__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__28170__auto__;
}
break;
}
}catch (e29708){var ex__28171__auto__ = e29708;
var statearr_29709_29800 = state_29677;
(statearr_29709_29800[(2)] = ex__28171__auto__);


if(cljs.core.seq((state_29677[(4)]))){
var statearr_29710_29801 = state_29677;
(statearr_29710_29801[(1)] = cljs.core.first((state_29677[(4)])));

} else {
throw ex__28171__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__28169__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29802 = state_29677;
state_29677 = G__29802;
continue;
} else {
return ret_value__28169__auto__;
}
break;
}
});
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__ = function(state_29677){
switch(arguments.length){
case 0:
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0.call(this);
case 1:
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1.call(this,state_29677);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__.cljs$core$IFn$_invoke$arity$0 = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0;
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__.cljs$core$IFn$_invoke$arity$1 = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1;
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__;
})()
})();
var state__28266__auto__ = (function (){var statearr_29730 = f__28265__auto__();
(statearr_29730[(6)] = c__28264__auto__);

return statearr_29730;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__28266__auto__);
}));

return c__28264__auto__;
})], null),"Insertar Visitante"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_(status,"obteniendo datos...");

var c__28264__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__28265__auto__ = (function (){var switch__28167__auto__ = (function (state_29747){
var state_val_29748 = (state_29747[(1)]);
if((state_val_29748 === (1))){
var inst_29732 = universo.db.crud.get_all_table("visitor");
var state_29747__$1 = state_29747;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_29747__$1,(2),inst_29732);
} else {
if((state_val_29748 === (2))){
var inst_29734 = (state_29747[(7)]);
var inst_29734__$1 = (state_29747[(2)]);
var inst_29735 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_29734__$1);
var state_29747__$1 = (function (){var statearr_29752 = state_29747;
(statearr_29752[(7)] = inst_29734__$1);

return statearr_29752;
})();
if(cljs.core.truth_(inst_29735)){
var statearr_29753_29803 = state_29747__$1;
(statearr_29753_29803[(1)] = (3));

} else {
var statearr_29755_29804 = state_29747__$1;
(statearr_29755_29804[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29748 === (3))){
var inst_29734 = (state_29747[(7)]);
var inst_29737 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_29734);
var inst_29738 = cljs.core.reset_BANG_(all_visitors,inst_29737);
var inst_29739 = cljs.core.reset_BANG_(status,"\u2705 Datos obtenidos!");
var state_29747__$1 = (function (){var statearr_29757 = state_29747;
(statearr_29757[(8)] = inst_29738);

return statearr_29757;
})();
var statearr_29758_29805 = state_29747__$1;
(statearr_29758_29805[(2)] = inst_29739);

(statearr_29758_29805[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29748 === (4))){
var inst_29734 = (state_29747[(7)]);
var inst_29741 = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(inst_29734);
var inst_29742 = ["\u274C Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_29741)].join('');
var inst_29743 = cljs.core.reset_BANG_(status,inst_29742);
var state_29747__$1 = state_29747;
var statearr_29762_29806 = state_29747__$1;
(statearr_29762_29806[(2)] = inst_29743);

(statearr_29762_29806[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29748 === (5))){
var inst_29745 = (state_29747[(2)]);
var state_29747__$1 = state_29747;
return cljs.core.async.impl.ioc_helpers.return_chan(state_29747__$1,inst_29745);
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
var statearr_29764 = [null,null,null,null,null,null,null,null,null];
(statearr_29764[(0)] = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__);

(statearr_29764[(1)] = (1));

return statearr_29764;
});
var universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1 = (function (state_29747){
while(true){
var ret_value__28169__auto__ = (function (){try{while(true){
var result__28170__auto__ = switch__28167__auto__(state_29747);
if(cljs.core.keyword_identical_QMARK_(result__28170__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__28170__auto__;
}
break;
}
}catch (e29766){var ex__28171__auto__ = e29766;
var statearr_29767_29807 = state_29747;
(statearr_29767_29807[(2)] = ex__28171__auto__);


if(cljs.core.seq((state_29747[(4)]))){
var statearr_29768_29808 = state_29747;
(statearr_29768_29808[(1)] = cljs.core.first((state_29747[(4)])));

} else {
throw ex__28171__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__28169__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29809 = state_29747;
state_29747 = G__29809;
continue;
} else {
return ret_value__28169__auto__;
}
break;
}
});
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__ = function(state_29747){
switch(arguments.length){
case 0:
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0.call(this);
case 1:
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1.call(this,state_29747);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__.cljs$core$IFn$_invoke$arity$0 = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____0;
universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__.cljs$core$IFn$_invoke$arity$1 = universo$components$supabase_test$supabase_test_$_state_machine__28168__auto____1;
return universo$components$supabase_test$supabase_test_$_state_machine__28168__auto__;
})()
})();
var state__28266__auto__ = (function (){var statearr_29769 = f__28265__auto__();
(statearr_29769[(6)] = c__28264__auto__);

return statearr_29769;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__28266__auto__);
}));

return c__28264__auto__;
})], null),"Obtener Todos"], null),(cljs.core.truth_(cljs.core.deref(visitor_data))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"\uD83D\uDCCB Datos a insertar:"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Pa\u00EDs: ",new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Ciudad: ",new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Timezone: ",new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Idioma: ",new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null)], null)], null):null),((cljs.core.seq(cljs.core.deref(all_visitors)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"\uD83D\uDC65 Visitantes en la BD:"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"border","border",1444987323),"1"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"ID"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Fecha"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Pa\u00EDs"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Ciudad"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Timezone"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Idioma"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),(function (){var iter__5503__auto__ = (function universo$components$supabase_test$supabase_test_$_iter__29772(s__29773){
return (new cljs.core.LazySeq(null,(function (){
var s__29773__$1 = s__29773;
while(true){
var temp__5823__auto__ = cljs.core.seq(s__29773__$1);
if(temp__5823__auto__){
var s__29773__$2 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(s__29773__$2)){
var c__5501__auto__ = cljs.core.chunk_first(s__29773__$2);
var size__5502__auto__ = cljs.core.count(c__5501__auto__);
var b__29775 = cljs.core.chunk_buffer(size__5502__auto__);
if((function (){var i__29774 = (0);
while(true){
if((i__29774 < size__5502__auto__)){
var visitor = cljs.core._nth(c__5501__auto__,i__29774);
cljs.core.chunk_append(b__29775,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(visitor).substring((0),(19))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(visitor)], null)], null));

var G__29810 = (i__29774 + (1));
i__29774 = G__29810;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__29775),universo$components$supabase_test$supabase_test_$_iter__29772(cljs.core.chunk_rest(s__29773__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__29775),null);
}
} else {
var visitor = cljs.core.first(s__29773__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(visitor).substring((0),(19))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(visitor)], null)], null),universo$components$supabase_test$supabase_test_$_iter__29772(cljs.core.rest(s__29773__$2)));
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
