goog.provide('universo.ip');
/**
 * Usa fetch API nativo del navegador con logs
 */
universo.ip.fetch_ip_info = (function universo$ip$fetch_ip_info(){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
console.log("\uD83D\uDE80 Iniciando fetch-ip-info...");

fetch("https://ipapi.co/json/").then((function (response){
console.log("\uD83D\uDCE1 Response recibido:",response);

console.log("\uD83D\uDCCA Status:",response.status);

console.log("\u2705 OK?:",response.ok);

if(cljs.core.truth_(response.ok)){
console.log("\uD83D\uDD04 Convirtiendo a JSON...");

return response.json();
} else {
throw (new Error(["HTTP ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(response.status)].join('')));
}
})).then((function (data){
console.log("\uD83D\uDCCB Data JSON recibida:",data);

var converted_data = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(data,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
console.log("\uD83D\uDD04 Data convertida a ClojureScript:",converted_data);

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"success","success",1890645906),true,new cljs.core.Keyword(null,"data","data",-232669377),converted_data], null));
})).catch((function (error){
console.error("\u274C Error capturado:",error);

console.error("\u274C Mensaje del error:",error.message);

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"success","success",1890645906),false,new cljs.core.Keyword(null,"error","error",-978969032),error.message], null));
}));

console.log("\uD83D\uDCE4 Retornando canal...");

return ch;
});
universo.ip.ip_test_component = (function universo$ip$ip_test_component(){
var result = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"status","status",-1997798413),"inicial"], null));
var loading_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Prueba de fetch-ip-info"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.deref(loading_QMARK_),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
console.log("\uD83C\uDFAF Bot\u00F3n clickeado!");

cljs.core.reset_BANG_(loading_QMARK_,true);

cljs.core.reset_BANG_(result,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"status","status",-1997798413),"cargando..."], null));

var c__11659__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__11660__auto__ = (function (){var switch__11495__auto__ = (function (state_12008){
var state_val_12009 = (state_12008[(1)]);
if((state_val_12009 === (1))){
var inst_12000 = console.log("\uD83C\uDFC3 Ejecutando go block...");
var inst_12001 = universo.ip.fetch_ip_info();
var state_12008__$1 = (function (){var statearr_12010 = state_12008;
(statearr_12010[(7)] = inst_12000);

return statearr_12010;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_12008__$1,(2),inst_12001);
} else {
if((state_val_12009 === (2))){
var inst_12003 = (state_12008[(2)]);
var inst_12004 = console.log("\uD83C\uDF89 Respuesta final recibida:",inst_12003);
var inst_12005 = cljs.core.reset_BANG_(loading_QMARK_,false);
var inst_12006 = cljs.core.reset_BANG_(result,inst_12003);
var state_12008__$1 = (function (){var statearr_12011 = state_12008;
(statearr_12011[(8)] = inst_12004);

(statearr_12011[(9)] = inst_12005);

return statearr_12011;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_12008__$1,inst_12006);
} else {
return null;
}
}
});
return (function() {
var universo$ip$ip_test_component_$_state_machine__11496__auto__ = null;
var universo$ip$ip_test_component_$_state_machine__11496__auto____0 = (function (){
var statearr_12012 = [null,null,null,null,null,null,null,null,null,null];
(statearr_12012[(0)] = universo$ip$ip_test_component_$_state_machine__11496__auto__);

(statearr_12012[(1)] = (1));

return statearr_12012;
});
var universo$ip$ip_test_component_$_state_machine__11496__auto____1 = (function (state_12008){
while(true){
var ret_value__11497__auto__ = (function (){try{while(true){
var result__11498__auto__ = switch__11495__auto__(state_12008);
if(cljs.core.keyword_identical_QMARK_(result__11498__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11498__auto__;
}
break;
}
}catch (e12013){var ex__11499__auto__ = e12013;
var statearr_12014_12051 = state_12008;
(statearr_12014_12051[(2)] = ex__11499__auto__);


if(cljs.core.seq((state_12008[(4)]))){
var statearr_12015_12052 = state_12008;
(statearr_12015_12052[(1)] = cljs.core.first((state_12008[(4)])));

} else {
throw ex__11499__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__11497__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12053 = state_12008;
state_12008 = G__12053;
continue;
} else {
return ret_value__11497__auto__;
}
break;
}
});
universo$ip$ip_test_component_$_state_machine__11496__auto__ = function(state_12008){
switch(arguments.length){
case 0:
return universo$ip$ip_test_component_$_state_machine__11496__auto____0.call(this);
case 1:
return universo$ip$ip_test_component_$_state_machine__11496__auto____1.call(this,state_12008);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$ip$ip_test_component_$_state_machine__11496__auto__.cljs$core$IFn$_invoke$arity$0 = universo$ip$ip_test_component_$_state_machine__11496__auto____0;
universo$ip$ip_test_component_$_state_machine__11496__auto__.cljs$core$IFn$_invoke$arity$1 = universo$ip$ip_test_component_$_state_machine__11496__auto____1;
return universo$ip$ip_test_component_$_state_machine__11496__auto__;
})()
})();
var state__11661__auto__ = (function (){var statearr_12016 = f__11660__auto__();
(statearr_12016[(6)] = c__11659__auto__);

return statearr_12016;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__11661__auto__);
}));

return c__11659__auto__;
})], null),(cljs.core.truth_(cljs.core.deref(loading_QMARK_))?"Cargando...":"Probar API")], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"Resultado:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result))], null),(cljs.core.truth_((function (){var and__5000__auto__ = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result));
if(cljs.core.truth_(and__5000__auto__)){
return new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result));
} else {
return and__5000__auto__;
}
})())?(function (){var data = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result));
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"Datos obtenidos:"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"IP: ",new cljs.core.Keyword(null,"ip","ip",58378915).cljs$core$IFn$_invoke$arity$1(data)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Pa\u00EDs: ",new cljs.core.Keyword(null,"country_name","country_name",1205772562).cljs$core$IFn$_invoke$arity$1(data)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Ciudad: ",new cljs.core.Keyword(null,"city","city",-393302614).cljs$core$IFn$_invoke$arity$1(data)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"ISP: ",new cljs.core.Keyword(null,"org","org",1495985).cljs$core$IFn$_invoke$arity$1(data)], null)], null);
})():null),(cljs.core.truth_((function (){var and__5000__auto__ = cljs.core.not(new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result)));
if(and__5000__auto__){
return new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result));
} else {
return and__5000__auto__;
}
})())?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"Error:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result))], null)], null):null)], null)], null);
});
});
universo.ip.simple_ip_test = (function universo$ip$simple_ip_test(){
var ip_info = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("No cargado");
return reagent.core.create_class.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (){
console.log("\uD83C\uDFAC Componente montado, iniciando fetch...");

var c__11659__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__11660__auto__ = (function (){var switch__11495__auto__ = (function (state_12024){
var state_val_12025 = (state_12024[(1)]);
if((state_val_12025 === (1))){
var inst_12017 = console.log("\u23F3 Llamando fetch-ip-info...");
var inst_12018 = universo.ip.fetch_ip_info();
var state_12024__$1 = (function (){var statearr_12026 = state_12024;
(statearr_12026[(7)] = inst_12017);

return statearr_12026;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_12024__$1,(2),inst_12018);
} else {
if((state_val_12025 === (2))){
var inst_12020 = (state_12024[(2)]);
var inst_12021 = console.log("\uD83C\uDFC1 Resultado final:",inst_12020);
var inst_12022 = cljs.core.reset_BANG_(ip_info,inst_12020);
var state_12024__$1 = (function (){var statearr_12027 = state_12024;
(statearr_12027[(8)] = inst_12021);

return statearr_12027;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_12024__$1,inst_12022);
} else {
return null;
}
}
});
return (function() {
var universo$ip$simple_ip_test_$_state_machine__11496__auto__ = null;
var universo$ip$simple_ip_test_$_state_machine__11496__auto____0 = (function (){
var statearr_12028 = [null,null,null,null,null,null,null,null,null];
(statearr_12028[(0)] = universo$ip$simple_ip_test_$_state_machine__11496__auto__);

(statearr_12028[(1)] = (1));

return statearr_12028;
});
var universo$ip$simple_ip_test_$_state_machine__11496__auto____1 = (function (state_12024){
while(true){
var ret_value__11497__auto__ = (function (){try{while(true){
var result__11498__auto__ = switch__11495__auto__(state_12024);
if(cljs.core.keyword_identical_QMARK_(result__11498__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11498__auto__;
}
break;
}
}catch (e12029){var ex__11499__auto__ = e12029;
var statearr_12030_12054 = state_12024;
(statearr_12030_12054[(2)] = ex__11499__auto__);


if(cljs.core.seq((state_12024[(4)]))){
var statearr_12031_12055 = state_12024;
(statearr_12031_12055[(1)] = cljs.core.first((state_12024[(4)])));

} else {
throw ex__11499__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__11497__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12056 = state_12024;
state_12024 = G__12056;
continue;
} else {
return ret_value__11497__auto__;
}
break;
}
});
universo$ip$simple_ip_test_$_state_machine__11496__auto__ = function(state_12024){
switch(arguments.length){
case 0:
return universo$ip$simple_ip_test_$_state_machine__11496__auto____0.call(this);
case 1:
return universo$ip$simple_ip_test_$_state_machine__11496__auto____1.call(this,state_12024);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$ip$simple_ip_test_$_state_machine__11496__auto__.cljs$core$IFn$_invoke$arity$0 = universo$ip$simple_ip_test_$_state_machine__11496__auto____0;
universo$ip$simple_ip_test_$_state_machine__11496__auto__.cljs$core$IFn$_invoke$arity$1 = universo$ip$simple_ip_test_$_state_machine__11496__auto____1;
return universo$ip$simple_ip_test_$_state_machine__11496__auto__;
})()
})();
var state__11661__auto__ = (function (){var statearr_12032 = f__11660__auto__();
(statearr_12032[(6)] = c__11659__auto__);

return statearr_12032;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__11661__auto__);
}));

return c__11659__auto__;
}),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Test Simple (autom\u00E1tico)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Resultado: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_info))], null),((cljs.core.map_QMARK_(cljs.core.deref(ip_info)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(cljs.core.truth_(new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_info)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"\u00C9xito: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_info)))], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_info)))], null))], null):null)], null);
})], null));
});
universo.ip.minimal_test = (function universo$ip$minimal_test(){
var status = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("inicial");
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"TEST M\u00CDNIMO"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Status: ",cljs.core.deref(status)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
console.log("Click!");

cljs.core.reset_BANG_(status,"clickeado");

var c__11659__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__11660__auto__ = (function (){var switch__11495__auto__ = (function (state_12042){
var state_val_12043 = (state_12042[(1)]);
if((state_val_12043 === (1))){
var inst_12033 = console.log("Go block ejecutado");
var inst_12034 = cljs.core.reset_BANG_(status,"go ejecutado");
var inst_12035 = universo.ip.fetch_ip_info();
var state_12042__$1 = (function (){var statearr_12044 = state_12042;
(statearr_12044[(7)] = inst_12033);

(statearr_12044[(8)] = inst_12034);

return statearr_12044;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_12042__$1,(2),inst_12035);
} else {
if((state_val_12043 === (2))){
var inst_12037 = (state_12042[(2)]);
var inst_12038 = console.log("Resultado:",inst_12037);
var inst_12039 = ["Resultado: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_12037)].join('');
var inst_12040 = cljs.core.reset_BANG_(status,inst_12039);
var state_12042__$1 = (function (){var statearr_12045 = state_12042;
(statearr_12045[(9)] = inst_12038);

return statearr_12045;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_12042__$1,inst_12040);
} else {
return null;
}
}
});
return (function() {
var universo$ip$minimal_test_$_state_machine__11496__auto__ = null;
var universo$ip$minimal_test_$_state_machine__11496__auto____0 = (function (){
var statearr_12046 = [null,null,null,null,null,null,null,null,null,null];
(statearr_12046[(0)] = universo$ip$minimal_test_$_state_machine__11496__auto__);

(statearr_12046[(1)] = (1));

return statearr_12046;
});
var universo$ip$minimal_test_$_state_machine__11496__auto____1 = (function (state_12042){
while(true){
var ret_value__11497__auto__ = (function (){try{while(true){
var result__11498__auto__ = switch__11495__auto__(state_12042);
if(cljs.core.keyword_identical_QMARK_(result__11498__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11498__auto__;
}
break;
}
}catch (e12047){var ex__11499__auto__ = e12047;
var statearr_12048_12057 = state_12042;
(statearr_12048_12057[(2)] = ex__11499__auto__);


if(cljs.core.seq((state_12042[(4)]))){
var statearr_12049_12058 = state_12042;
(statearr_12049_12058[(1)] = cljs.core.first((state_12042[(4)])));

} else {
throw ex__11499__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__11497__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12059 = state_12042;
state_12042 = G__12059;
continue;
} else {
return ret_value__11497__auto__;
}
break;
}
});
universo$ip$minimal_test_$_state_machine__11496__auto__ = function(state_12042){
switch(arguments.length){
case 0:
return universo$ip$minimal_test_$_state_machine__11496__auto____0.call(this);
case 1:
return universo$ip$minimal_test_$_state_machine__11496__auto____1.call(this,state_12042);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$ip$minimal_test_$_state_machine__11496__auto__.cljs$core$IFn$_invoke$arity$0 = universo$ip$minimal_test_$_state_machine__11496__auto____0;
universo$ip$minimal_test_$_state_machine__11496__auto__.cljs$core$IFn$_invoke$arity$1 = universo$ip$minimal_test_$_state_machine__11496__auto____1;
return universo$ip$minimal_test_$_state_machine__11496__auto__;
})()
})();
var state__11661__auto__ = (function (){var statearr_12050 = f__11660__auto__();
(statearr_12050[(6)] = c__11659__auto__);

return statearr_12050;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__11661__auto__);
}));

return c__11659__auto__;
})], null),"CLICK AQU\u00CD"], null)], null);
});

//# sourceMappingURL=universo.ip.js.map
