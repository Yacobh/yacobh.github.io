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
var f__11660__auto__ = (function (){var switch__11542__auto__ = (function (state_13006){
var state_val_13007 = (state_13006[(1)]);
if((state_val_13007 === (7))){
var inst_12998 = cljs.core.reset_BANG_(status,"\u2705 Insertado exitosamente!");
var state_13006__$1 = state_13006;
var statearr_13008_13057 = state_13006__$1;
(statearr_13008_13057[(2)] = inst_12998);

(statearr_13008_13057[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13007 === (1))){
var inst_12973 = console.log("\uD83D\uDE80 Iniciando inserci\u00F3n...");
var inst_12974 = universo.ip.fetch_ip_info();
var state_13006__$1 = (function (){var statearr_13009 = state_13006;
(statearr_13009[(7)] = inst_12973);

return statearr_13009;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13006__$1,(2),inst_12974);
} else {
if((state_val_13007 === (4))){
var inst_12977 = (state_13006[(8)]);
var state_13006__$1 = state_13006;
var statearr_13010_13058 = state_13006__$1;
(statearr_13010_13058[(2)] = inst_12977);

(statearr_13010_13058[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13007 === (6))){
var inst_12995 = (state_13006[(9)]);
var inst_12995__$1 = (state_13006[(2)]);
var inst_12996 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_12995__$1);
var state_13006__$1 = (function (){var statearr_13011 = state_13006;
(statearr_13011[(9)] = inst_12995__$1);

return statearr_13011;
})();
if(cljs.core.truth_(inst_12996)){
var statearr_13012_13059 = state_13006__$1;
(statearr_13012_13059[(1)] = (7));

} else {
var statearr_13013_13060 = state_13006__$1;
(statearr_13013_13060[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13007 === (3))){
var inst_12977 = (state_13006[(8)]);
var inst_12976 = (state_13006[(10)]);
var inst_12980 = [new cljs.core.Keyword(null,"pais","pais",1648581293),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680)];
var inst_12981 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_12976);
var inst_12982 = new cljs.core.Keyword(null,"country_name","country_name",1205772562).cljs$core$IFn$_invoke$arity$1(inst_12981);
var inst_12983 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_12976);
var inst_12984 = new cljs.core.Keyword(null,"city","city",-393302614).cljs$core$IFn$_invoke$arity$1(inst_12983);
var inst_12985 = [inst_12982,inst_12984];
var inst_12986 = cljs.core.PersistentHashMap.fromArrays(inst_12980,inst_12985);
var inst_12987 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_12977,inst_12986], 0));
var state_13006__$1 = state_13006;
var statearr_13014_13061 = state_13006__$1;
(statearr_13014_13061[(2)] = inst_12987);

(statearr_13014_13061[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13007 === (2))){
var inst_12976 = (state_13006[(10)]);
var inst_12976__$1 = (state_13006[(2)]);
var inst_12977 = universo.db.crud.collect_visitor_data();
var inst_12978 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_12976__$1);
var state_13006__$1 = (function (){var statearr_13015 = state_13006;
(statearr_13015[(8)] = inst_12977);

(statearr_13015[(10)] = inst_12976__$1);

return statearr_13015;
})();
if(cljs.core.truth_(inst_12978)){
var statearr_13016_13062 = state_13006__$1;
(statearr_13016_13062[(1)] = (3));

} else {
var statearr_13017_13063 = state_13006__$1;
(statearr_13017_13063[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13007 === (9))){
var inst_13004 = (state_13006[(2)]);
var state_13006__$1 = state_13006;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13006__$1,inst_13004);
} else {
if((state_val_13007 === (5))){
var inst_12990 = (state_13006[(2)]);
var inst_12991 = console.log("\uD83D\uDCCB Datos finales a insertar:",inst_12990);
var inst_12992 = cljs.core.reset_BANG_(visitor_data,inst_12990);
var inst_12993 = universo.db.crud.insert_data_table_BANG_(inst_12990,"visitor");
var state_13006__$1 = (function (){var statearr_13018 = state_13006;
(statearr_13018[(11)] = inst_12991);

(statearr_13018[(12)] = inst_12992);

return statearr_13018;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13006__$1,(6),inst_12993);
} else {
if((state_val_13007 === (8))){
var inst_12995 = (state_13006[(9)]);
var inst_13000 = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(inst_12995);
var inst_13001 = ["\u274C Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_13000)].join('');
var inst_13002 = cljs.core.reset_BANG_(status,inst_13001);
var state_13006__$1 = state_13006;
var statearr_13019_13064 = state_13006__$1;
(statearr_13019_13064[(2)] = inst_13002);

(statearr_13019_13064[(1)] = (9));


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
var universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__ = null;
var universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____0 = (function (){
var statearr_13020 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_13020[(0)] = universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__);

(statearr_13020[(1)] = (1));

return statearr_13020;
});
var universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____1 = (function (state_13006){
while(true){
var ret_value__11544__auto__ = (function (){try{while(true){
var result__11545__auto__ = switch__11542__auto__(state_13006);
if(cljs.core.keyword_identical_QMARK_(result__11545__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11545__auto__;
}
break;
}
}catch (e13021){var ex__11546__auto__ = e13021;
var statearr_13022_13065 = state_13006;
(statearr_13022_13065[(2)] = ex__11546__auto__);


if(cljs.core.seq((state_13006[(4)]))){
var statearr_13023_13066 = state_13006;
(statearr_13023_13066[(1)] = cljs.core.first((state_13006[(4)])));

} else {
throw ex__11546__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__11544__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13067 = state_13006;
state_13006 = G__13067;
continue;
} else {
return ret_value__11544__auto__;
}
break;
}
});
universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__ = function(state_13006){
switch(arguments.length){
case 0:
return universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____0.call(this);
case 1:
return universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____1.call(this,state_13006);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__.cljs$core$IFn$_invoke$arity$0 = universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____0;
universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__.cljs$core$IFn$_invoke$arity$1 = universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____1;
return universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__;
})()
})();
var state__11661__auto__ = (function (){var statearr_13024 = f__11660__auto__();
(statearr_13024[(6)] = c__11659__auto__);

return statearr_13024;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__11661__auto__);
}));

return c__11659__auto__;
})], null),"Insertar Visitante"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_(status,"obteniendo datos...");

var c__11659__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__11660__auto__ = (function (){var switch__11542__auto__ = (function (state_13040){
var state_val_13041 = (state_13040[(1)]);
if((state_val_13041 === (1))){
var inst_13025 = universo.db.crud.get_all_table("visitor");
var state_13040__$1 = state_13040;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13040__$1,(2),inst_13025);
} else {
if((state_val_13041 === (2))){
var inst_13027 = (state_13040[(7)]);
var inst_13027__$1 = (state_13040[(2)]);
var inst_13028 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_13027__$1);
var state_13040__$1 = (function (){var statearr_13042 = state_13040;
(statearr_13042[(7)] = inst_13027__$1);

return statearr_13042;
})();
if(cljs.core.truth_(inst_13028)){
var statearr_13043_13068 = state_13040__$1;
(statearr_13043_13068[(1)] = (3));

} else {
var statearr_13044_13069 = state_13040__$1;
(statearr_13044_13069[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13041 === (3))){
var inst_13027 = (state_13040[(7)]);
var inst_13030 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_13027);
var inst_13031 = cljs.core.reset_BANG_(all_visitors,inst_13030);
var inst_13032 = cljs.core.reset_BANG_(status,"\u2705 Datos obtenidos!");
var state_13040__$1 = (function (){var statearr_13045 = state_13040;
(statearr_13045[(8)] = inst_13031);

return statearr_13045;
})();
var statearr_13046_13070 = state_13040__$1;
(statearr_13046_13070[(2)] = inst_13032);

(statearr_13046_13070[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13041 === (4))){
var inst_13027 = (state_13040[(7)]);
var inst_13034 = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(inst_13027);
var inst_13035 = ["\u274C Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_13034)].join('');
var inst_13036 = cljs.core.reset_BANG_(status,inst_13035);
var state_13040__$1 = state_13040;
var statearr_13047_13071 = state_13040__$1;
(statearr_13047_13071[(2)] = inst_13036);

(statearr_13047_13071[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13041 === (5))){
var inst_13038 = (state_13040[(2)]);
var state_13040__$1 = state_13040;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13040__$1,inst_13038);
} else {
return null;
}
}
}
}
}
});
return (function() {
var universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__ = null;
var universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____0 = (function (){
var statearr_13048 = [null,null,null,null,null,null,null,null,null];
(statearr_13048[(0)] = universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__);

(statearr_13048[(1)] = (1));

return statearr_13048;
});
var universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____1 = (function (state_13040){
while(true){
var ret_value__11544__auto__ = (function (){try{while(true){
var result__11545__auto__ = switch__11542__auto__(state_13040);
if(cljs.core.keyword_identical_QMARK_(result__11545__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11545__auto__;
}
break;
}
}catch (e13049){var ex__11546__auto__ = e13049;
var statearr_13050_13072 = state_13040;
(statearr_13050_13072[(2)] = ex__11546__auto__);


if(cljs.core.seq((state_13040[(4)]))){
var statearr_13051_13073 = state_13040;
(statearr_13051_13073[(1)] = cljs.core.first((state_13040[(4)])));

} else {
throw ex__11546__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__11544__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13074 = state_13040;
state_13040 = G__13074;
continue;
} else {
return ret_value__11544__auto__;
}
break;
}
});
universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__ = function(state_13040){
switch(arguments.length){
case 0:
return universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____0.call(this);
case 1:
return universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____1.call(this,state_13040);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__.cljs$core$IFn$_invoke$arity$0 = universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____0;
universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__.cljs$core$IFn$_invoke$arity$1 = universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____1;
return universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__;
})()
})();
var state__11661__auto__ = (function (){var statearr_13052 = f__11660__auto__();
(statearr_13052[(6)] = c__11659__auto__);

return statearr_13052;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__11661__auto__);
}));

return c__11659__auto__;
})], null),"Obtener Todos"], null),(cljs.core.truth_(cljs.core.deref(visitor_data))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"\uD83D\uDCCB Datos a insertar:"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Pa\u00EDs: ",new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Ciudad: ",new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Timezone: ",new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Idioma: ",new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null)], null)], null):null),((cljs.core.seq(cljs.core.deref(all_visitors)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"\uD83D\uDC65 Visitantes en la BD:"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"border","border",1444987323),"1"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"ID"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Fecha"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Pa\u00EDs"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Ciudad"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Timezone"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Idioma"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),(function (){var iter__5480__auto__ = (function universo$components$supabase_test$supabase_test_$_iter__13053(s__13054){
return (new cljs.core.LazySeq(null,(function (){
var s__13054__$1 = s__13054;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__13054__$1);
if(temp__5804__auto__){
var s__13054__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__13054__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__13054__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__13056 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__13055 = (0);
while(true){
if((i__13055 < size__5479__auto__)){
var visitor = cljs.core._nth(c__5478__auto__,i__13055);
cljs.core.chunk_append(b__13056,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(visitor).substring((0),(19))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(visitor)], null)], null));

var G__13075 = (i__13055 + (1));
i__13055 = G__13075;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13056),universo$components$supabase_test$supabase_test_$_iter__13053(cljs.core.chunk_rest(s__13054__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13056),null);
}
} else {
var visitor = cljs.core.first(s__13054__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(visitor).substring((0),(19))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(visitor)], null)], null),universo$components$supabase_test$supabase_test_$_iter__13053(cljs.core.rest(s__13054__$2)));
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
