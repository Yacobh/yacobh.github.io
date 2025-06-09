goog.provide('universo.components.supabase_test');
universo.components.supabase_test.supabase_test = (function universo$components$supabase_test$supabase_test(){
var status = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("inicial");
var visitor_data = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var all_visitors = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"\uD83E\uDDEA Test de Conexi\u00F3n Supabase"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Status: ",cljs.core.deref(status)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_(status,"insertando...");

var c__11742__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__11743__auto__ = (function (){var switch__11542__auto__ = (function (state_11948){
var state_val_11949 = (state_11948[(1)]);
if((state_val_11949 === (7))){
var inst_11938 = cljs.core.reset_BANG_(status,"\u2705 Insertado exitosamente!");
var state_11948__$1 = state_11948;
var statearr_11950_12010 = state_11948__$1;
(statearr_11950_12010[(2)] = inst_11938);

(statearr_11950_12010[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11949 === (1))){
var inst_11912 = console.log("\uD83D\uDE80 Iniciando inserci\u00F3n...");
var inst_11914 = universo.ip.fetch_ip_info();
var state_11948__$1 = (function (){var statearr_11951 = state_11948;
(statearr_11951[(7)] = inst_11912);

return statearr_11951;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_11948__$1,(2),inst_11914);
} else {
if((state_val_11949 === (4))){
var inst_11917 = (state_11948[(8)]);
var state_11948__$1 = state_11948;
var statearr_11952_12011 = state_11948__$1;
(statearr_11952_12011[(2)] = inst_11917);

(statearr_11952_12011[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11949 === (6))){
var inst_11935 = (state_11948[(9)]);
var inst_11935__$1 = (state_11948[(2)]);
var inst_11936 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_11935__$1);
var state_11948__$1 = (function (){var statearr_11953 = state_11948;
(statearr_11953[(9)] = inst_11935__$1);

return statearr_11953;
})();
if(cljs.core.truth_(inst_11936)){
var statearr_11954_12012 = state_11948__$1;
(statearr_11954_12012[(1)] = (7));

} else {
var statearr_11955_12013 = state_11948__$1;
(statearr_11955_12013[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11949 === (3))){
var inst_11916 = (state_11948[(10)]);
var inst_11917 = (state_11948[(8)]);
var inst_11920 = [new cljs.core.Keyword(null,"pais","pais",1648581293),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680)];
var inst_11921 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_11916);
var inst_11922 = new cljs.core.Keyword(null,"country_name","country_name",1205772562).cljs$core$IFn$_invoke$arity$1(inst_11921);
var inst_11923 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_11916);
var inst_11924 = new cljs.core.Keyword(null,"city","city",-393302614).cljs$core$IFn$_invoke$arity$1(inst_11923);
var inst_11925 = [inst_11922,inst_11924];
var inst_11926 = cljs.core.PersistentHashMap.fromArrays(inst_11920,inst_11925);
var inst_11927 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_11917,inst_11926], 0));
var state_11948__$1 = state_11948;
var statearr_11960_12014 = state_11948__$1;
(statearr_11960_12014[(2)] = inst_11927);

(statearr_11960_12014[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11949 === (2))){
var inst_11916 = (state_11948[(10)]);
var inst_11916__$1 = (state_11948[(2)]);
var inst_11917 = universo.db.crud.collect_visitor_data();
var inst_11918 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_11916__$1);
var state_11948__$1 = (function (){var statearr_11962 = state_11948;
(statearr_11962[(10)] = inst_11916__$1);

(statearr_11962[(8)] = inst_11917);

return statearr_11962;
})();
if(cljs.core.truth_(inst_11918)){
var statearr_11963_12015 = state_11948__$1;
(statearr_11963_12015[(1)] = (3));

} else {
var statearr_11964_12016 = state_11948__$1;
(statearr_11964_12016[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11949 === (9))){
var inst_11946 = (state_11948[(2)]);
var state_11948__$1 = state_11948;
return cljs.core.async.impl.ioc_helpers.return_chan(state_11948__$1,inst_11946);
} else {
if((state_val_11949 === (5))){
var inst_11930 = (state_11948[(2)]);
var inst_11931 = console.log("\uD83D\uDCCB Datos finales a insertar:",inst_11930);
var inst_11932 = cljs.core.reset_BANG_(visitor_data,inst_11930);
var inst_11933 = universo.db.crud.insert_data_table_BANG_(inst_11930,"visitor");
var state_11948__$1 = (function (){var statearr_11965 = state_11948;
(statearr_11965[(11)] = inst_11932);

(statearr_11965[(12)] = inst_11931);

return statearr_11965;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_11948__$1,(6),inst_11933);
} else {
if((state_val_11949 === (8))){
var inst_11935 = (state_11948[(9)]);
var inst_11942 = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(inst_11935);
var inst_11943 = ["\u274C Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_11942)].join('');
var inst_11944 = cljs.core.reset_BANG_(status,inst_11943);
var state_11948__$1 = state_11948;
var statearr_11966_12017 = state_11948__$1;
(statearr_11966_12017[(2)] = inst_11944);

(statearr_11966_12017[(1)] = (9));


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
var statearr_11971 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11971[(0)] = universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__);

(statearr_11971[(1)] = (1));

return statearr_11971;
});
var universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____1 = (function (state_11948){
while(true){
var ret_value__11544__auto__ = (function (){try{while(true){
var result__11545__auto__ = switch__11542__auto__(state_11948);
if(cljs.core.keyword_identical_QMARK_(result__11545__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11545__auto__;
}
break;
}
}catch (e11972){var ex__11546__auto__ = e11972;
var statearr_11973_12018 = state_11948;
(statearr_11973_12018[(2)] = ex__11546__auto__);


if(cljs.core.seq((state_11948[(4)]))){
var statearr_11974_12019 = state_11948;
(statearr_11974_12019[(1)] = cljs.core.first((state_11948[(4)])));

} else {
throw ex__11546__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__11544__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12020 = state_11948;
state_11948 = G__12020;
continue;
} else {
return ret_value__11544__auto__;
}
break;
}
});
universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__ = function(state_11948){
switch(arguments.length){
case 0:
return universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____0.call(this);
case 1:
return universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____1.call(this,state_11948);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__.cljs$core$IFn$_invoke$arity$0 = universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____0;
universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__.cljs$core$IFn$_invoke$arity$1 = universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____1;
return universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__;
})()
})();
var state__11744__auto__ = (function (){var statearr_11975 = f__11743__auto__();
(statearr_11975[(6)] = c__11742__auto__);

return statearr_11975;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__11744__auto__);
}));

return c__11742__auto__;
})], null),"Insertar Visitante"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_(status,"obteniendo datos...");

var c__11742__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__11743__auto__ = (function (){var switch__11542__auto__ = (function (state_11991){
var state_val_11992 = (state_11991[(1)]);
if((state_val_11992 === (1))){
var inst_11976 = universo.db.crud.get_all_table("visitor");
var state_11991__$1 = state_11991;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_11991__$1,(2),inst_11976);
} else {
if((state_val_11992 === (2))){
var inst_11978 = (state_11991[(7)]);
var inst_11978__$1 = (state_11991[(2)]);
var inst_11979 = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(inst_11978__$1);
var state_11991__$1 = (function (){var statearr_11993 = state_11991;
(statearr_11993[(7)] = inst_11978__$1);

return statearr_11993;
})();
if(cljs.core.truth_(inst_11979)){
var statearr_11994_12021 = state_11991__$1;
(statearr_11994_12021[(1)] = (3));

} else {
var statearr_11995_12022 = state_11991__$1;
(statearr_11995_12022[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11992 === (3))){
var inst_11978 = (state_11991[(7)]);
var inst_11981 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(inst_11978);
var inst_11982 = cljs.core.reset_BANG_(all_visitors,inst_11981);
var inst_11983 = cljs.core.reset_BANG_(status,"\u2705 Datos obtenidos!");
var state_11991__$1 = (function (){var statearr_11996 = state_11991;
(statearr_11996[(8)] = inst_11982);

return statearr_11996;
})();
var statearr_11997_12023 = state_11991__$1;
(statearr_11997_12023[(2)] = inst_11983);

(statearr_11997_12023[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11992 === (4))){
var inst_11978 = (state_11991[(7)]);
var inst_11985 = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(inst_11978);
var inst_11986 = ["\u274C Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_11985)].join('');
var inst_11987 = cljs.core.reset_BANG_(status,inst_11986);
var state_11991__$1 = state_11991;
var statearr_11998_12024 = state_11991__$1;
(statearr_11998_12024[(2)] = inst_11987);

(statearr_11998_12024[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11992 === (5))){
var inst_11989 = (state_11991[(2)]);
var state_11991__$1 = state_11991;
return cljs.core.async.impl.ioc_helpers.return_chan(state_11991__$1,inst_11989);
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
var statearr_11999 = [null,null,null,null,null,null,null,null,null];
(statearr_11999[(0)] = universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__);

(statearr_11999[(1)] = (1));

return statearr_11999;
});
var universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____1 = (function (state_11991){
while(true){
var ret_value__11544__auto__ = (function (){try{while(true){
var result__11545__auto__ = switch__11542__auto__(state_11991);
if(cljs.core.keyword_identical_QMARK_(result__11545__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11545__auto__;
}
break;
}
}catch (e12000){var ex__11546__auto__ = e12000;
var statearr_12001_12025 = state_11991;
(statearr_12001_12025[(2)] = ex__11546__auto__);


if(cljs.core.seq((state_11991[(4)]))){
var statearr_12002_12026 = state_11991;
(statearr_12002_12026[(1)] = cljs.core.first((state_11991[(4)])));

} else {
throw ex__11546__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__11544__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12027 = state_11991;
state_11991 = G__12027;
continue;
} else {
return ret_value__11544__auto__;
}
break;
}
});
universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__ = function(state_11991){
switch(arguments.length){
case 0:
return universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____0.call(this);
case 1:
return universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____1.call(this,state_11991);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__.cljs$core$IFn$_invoke$arity$0 = universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____0;
universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__.cljs$core$IFn$_invoke$arity$1 = universo$components$supabase_test$supabase_test_$_state_machine__11543__auto____1;
return universo$components$supabase_test$supabase_test_$_state_machine__11543__auto__;
})()
})();
var state__11744__auto__ = (function (){var statearr_12003 = f__11743__auto__();
(statearr_12003[(6)] = c__11742__auto__);

return statearr_12003;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__11744__auto__);
}));

return c__11742__auto__;
})], null),"Obtener Todos"], null),(cljs.core.truth_(cljs.core.deref(visitor_data))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"\uD83D\uDCCB Datos a insertar:"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Pa\u00EDs: ",new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Ciudad: ",new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Timezone: ",new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Idioma: ",new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(visitor_data))], null)], null)], null):null),((cljs.core.seq(cljs.core.deref(all_visitors)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"\uD83D\uDC65 Visitantes en la BD:"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"border","border",1444987323),"1"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"ID"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Fecha"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Pa\u00EDs"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Ciudad"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Timezone"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Idioma"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),(function (){var iter__5480__auto__ = (function universo$components$supabase_test$supabase_test_$_iter__12004(s__12005){
return (new cljs.core.LazySeq(null,(function (){
var s__12005__$1 = s__12005;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__12005__$1);
if(temp__5804__auto__){
var s__12005__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__12005__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__12005__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__12007 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__12006 = (0);
while(true){
if((i__12006 < size__5479__auto__)){
var visitor = cljs.core._nth(c__5478__auto__,i__12006);
cljs.core.chunk_append(b__12007,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(visitor).substring((0),(19))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(visitor)], null)], null));

var G__12028 = (i__12006 + (1));
i__12006 = G__12028;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__12007),universo$components$supabase_test$supabase_test_$_iter__12004(cljs.core.chunk_rest(s__12005__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__12007),null);
}
} else {
var visitor = cljs.core.first(s__12005__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(visitor).substring((0),(19))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"pais","pais",1648581293).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"ciudad","ciudad",1617222680).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(visitor)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"idioma","idioma",244604300).cljs$core$IFn$_invoke$arity$1(visitor)], null)], null),universo$components$supabase_test$supabase_test_$_iter__12004(cljs.core.rest(s__12005__$2)));
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
