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

var c__18205__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_25420){
var state_val_25421 = (state_25420[(1)]);
if((state_val_25421 === (1))){
var inst_25412 = console.log("\uD83C\uDFC3 Ejecutando go block...");
var inst_25413 = universo.ip.fetch_ip_info();
var state_25420__$1 = (function (){var statearr_25423 = state_25420;
(statearr_25423[(7)] = inst_25412);

return statearr_25423;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_25420__$1,(2),inst_25413);
} else {
if((state_val_25421 === (2))){
var inst_25415 = (state_25420[(2)]);
var inst_25416 = console.log("\uD83C\uDF89 Respuesta final recibida:",inst_25415);
var inst_25417 = cljs.core.reset_BANG_(loading_QMARK_,false);
var inst_25418 = cljs.core.reset_BANG_(result,inst_25415);
var state_25420__$1 = (function (){var statearr_25424 = state_25420;
(statearr_25424[(8)] = inst_25417);

(statearr_25424[(9)] = inst_25416);

return statearr_25424;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_25420__$1,inst_25418);
} else {
return null;
}
}
});
return (function() {
var universo$ip$ip_test_component_$_state_machine__18081__auto__ = null;
var universo$ip$ip_test_component_$_state_machine__18081__auto____0 = (function (){
var statearr_25425 = [null,null,null,null,null,null,null,null,null,null];
(statearr_25425[(0)] = universo$ip$ip_test_component_$_state_machine__18081__auto__);

(statearr_25425[(1)] = (1));

return statearr_25425;
});
var universo$ip$ip_test_component_$_state_machine__18081__auto____1 = (function (state_25420){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_25420);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e25426){var ex__18084__auto__ = e25426;
var statearr_25427_25495 = state_25420;
(statearr_25427_25495[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_25420[(4)]))){
var statearr_25428_25497 = state_25420;
(statearr_25428_25497[(1)] = cljs.core.first((state_25420[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25498 = state_25420;
state_25420 = G__25498;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
universo$ip$ip_test_component_$_state_machine__18081__auto__ = function(state_25420){
switch(arguments.length){
case 0:
return universo$ip$ip_test_component_$_state_machine__18081__auto____0.call(this);
case 1:
return universo$ip$ip_test_component_$_state_machine__18081__auto____1.call(this,state_25420);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$ip$ip_test_component_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = universo$ip$ip_test_component_$_state_machine__18081__auto____0;
universo$ip$ip_test_component_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = universo$ip$ip_test_component_$_state_machine__18081__auto____1;
return universo$ip$ip_test_component_$_state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_25429 = f__18206__auto__();
(statearr_25429[(6)] = c__18205__auto__);

return statearr_25429;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));

return c__18205__auto__;
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

var c__18205__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_25438){
var state_val_25439 = (state_25438[(1)]);
if((state_val_25439 === (1))){
var inst_25431 = console.log("\u23F3 Llamando fetch-ip-info...");
var inst_25432 = universo.ip.fetch_ip_info();
var state_25438__$1 = (function (){var statearr_25440 = state_25438;
(statearr_25440[(7)] = inst_25431);

return statearr_25440;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_25438__$1,(2),inst_25432);
} else {
if((state_val_25439 === (2))){
var inst_25434 = (state_25438[(2)]);
var inst_25435 = console.log("\uD83C\uDFC1 Resultado final:",inst_25434);
var inst_25436 = cljs.core.reset_BANG_(ip_info,inst_25434);
var state_25438__$1 = (function (){var statearr_25441 = state_25438;
(statearr_25441[(8)] = inst_25435);

return statearr_25441;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_25438__$1,inst_25436);
} else {
return null;
}
}
});
return (function() {
var universo$ip$simple_ip_test_$_state_machine__18081__auto__ = null;
var universo$ip$simple_ip_test_$_state_machine__18081__auto____0 = (function (){
var statearr_25442 = [null,null,null,null,null,null,null,null,null];
(statearr_25442[(0)] = universo$ip$simple_ip_test_$_state_machine__18081__auto__);

(statearr_25442[(1)] = (1));

return statearr_25442;
});
var universo$ip$simple_ip_test_$_state_machine__18081__auto____1 = (function (state_25438){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_25438);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e25446){var ex__18084__auto__ = e25446;
var statearr_25447_25550 = state_25438;
(statearr_25447_25550[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_25438[(4)]))){
var statearr_25448_25551 = state_25438;
(statearr_25448_25551[(1)] = cljs.core.first((state_25438[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25552 = state_25438;
state_25438 = G__25552;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
universo$ip$simple_ip_test_$_state_machine__18081__auto__ = function(state_25438){
switch(arguments.length){
case 0:
return universo$ip$simple_ip_test_$_state_machine__18081__auto____0.call(this);
case 1:
return universo$ip$simple_ip_test_$_state_machine__18081__auto____1.call(this,state_25438);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$ip$simple_ip_test_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = universo$ip$simple_ip_test_$_state_machine__18081__auto____0;
universo$ip$simple_ip_test_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = universo$ip$simple_ip_test_$_state_machine__18081__auto____1;
return universo$ip$simple_ip_test_$_state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_25449 = f__18206__auto__();
(statearr_25449[(6)] = c__18205__auto__);

return statearr_25449;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));

return c__18205__auto__;
}),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Test Simple (autom\u00E1tico)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Resultado: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_info))], null),((cljs.core.map_QMARK_(cljs.core.deref(ip_info)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(cljs.core.truth_(new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_info)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"\u00C9xito: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_info)))], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_info)))], null))], null):null)], null);
})], null));
});
universo.ip.minimal_test = (function universo$ip$minimal_test(){
var status = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("inicial");
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"TEST M\u00CDNIMO"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Status: ",cljs.core.deref(status)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
console.log("Click!");

cljs.core.reset_BANG_(status,"clickeado");

var c__18205__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__18206__auto__ = (function (){var switch__18080__auto__ = (function (state_25459){
var state_val_25460 = (state_25459[(1)]);
if((state_val_25460 === (1))){
var inst_25450 = console.log("Go block ejecutado");
var inst_25451 = cljs.core.reset_BANG_(status,"go ejecutado");
var inst_25452 = universo.ip.fetch_ip_info();
var state_25459__$1 = (function (){var statearr_25461 = state_25459;
(statearr_25461[(7)] = inst_25450);

(statearr_25461[(8)] = inst_25451);

return statearr_25461;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_25459__$1,(2),inst_25452);
} else {
if((state_val_25460 === (2))){
var inst_25454 = (state_25459[(2)]);
var inst_25455 = console.log("Resultado:",inst_25454);
var inst_25456 = ["Resultado: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_25454)].join('');
var inst_25457 = cljs.core.reset_BANG_(status,inst_25456);
var state_25459__$1 = (function (){var statearr_25462 = state_25459;
(statearr_25462[(9)] = inst_25455);

return statearr_25462;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_25459__$1,inst_25457);
} else {
return null;
}
}
});
return (function() {
var universo$ip$minimal_test_$_state_machine__18081__auto__ = null;
var universo$ip$minimal_test_$_state_machine__18081__auto____0 = (function (){
var statearr_25463 = [null,null,null,null,null,null,null,null,null,null];
(statearr_25463[(0)] = universo$ip$minimal_test_$_state_machine__18081__auto__);

(statearr_25463[(1)] = (1));

return statearr_25463;
});
var universo$ip$minimal_test_$_state_machine__18081__auto____1 = (function (state_25459){
while(true){
var ret_value__18082__auto__ = (function (){try{while(true){
var result__18083__auto__ = switch__18080__auto__(state_25459);
if(cljs.core.keyword_identical_QMARK_(result__18083__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18083__auto__;
}
break;
}
}catch (e25464){var ex__18084__auto__ = e25464;
var statearr_25465_25561 = state_25459;
(statearr_25465_25561[(2)] = ex__18084__auto__);


if(cljs.core.seq((state_25459[(4)]))){
var statearr_25466_25562 = state_25459;
(statearr_25466_25562[(1)] = cljs.core.first((state_25459[(4)])));

} else {
throw ex__18084__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__18082__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25565 = state_25459;
state_25459 = G__25565;
continue;
} else {
return ret_value__18082__auto__;
}
break;
}
});
universo$ip$minimal_test_$_state_machine__18081__auto__ = function(state_25459){
switch(arguments.length){
case 0:
return universo$ip$minimal_test_$_state_machine__18081__auto____0.call(this);
case 1:
return universo$ip$minimal_test_$_state_machine__18081__auto____1.call(this,state_25459);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$ip$minimal_test_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$0 = universo$ip$minimal_test_$_state_machine__18081__auto____0;
universo$ip$minimal_test_$_state_machine__18081__auto__.cljs$core$IFn$_invoke$arity$1 = universo$ip$minimal_test_$_state_machine__18081__auto____1;
return universo$ip$minimal_test_$_state_machine__18081__auto__;
})()
})();
var state__18207__auto__ = (function (){var statearr_25467 = f__18206__auto__();
(statearr_25467[(6)] = c__18205__auto__);

return statearr_25467;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__18207__auto__);
}));

return c__18205__auto__;
})], null),"CLICK AQU\u00CD"], null)], null);
});

//# sourceMappingURL=universo.ip.js.map
