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

var c__34471__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_39851){
var state_val_39852 = (state_39851[(1)]);
if((state_val_39852 === (1))){
var inst_39843 = console.log("\uD83C\uDFC3 Ejecutando go block...");
var inst_39844 = universo.ip.fetch_ip_info();
var state_39851__$1 = (function (){var statearr_39854 = state_39851;
(statearr_39854[(7)] = inst_39843);

return statearr_39854;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39851__$1,(2),inst_39844);
} else {
if((state_val_39852 === (2))){
var inst_39846 = (state_39851[(2)]);
var inst_39847 = console.log("\uD83C\uDF89 Respuesta final recibida:",inst_39846);
var inst_39848 = cljs.core.reset_BANG_(loading_QMARK_,false);
var inst_39849 = cljs.core.reset_BANG_(result,inst_39846);
var state_39851__$1 = (function (){var statearr_39858 = state_39851;
(statearr_39858[(8)] = inst_39847);

(statearr_39858[(9)] = inst_39848);

return statearr_39858;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_39851__$1,inst_39849);
} else {
return null;
}
}
});
return (function() {
var universo$ip$ip_test_component_$_state_machine__34096__auto__ = null;
var universo$ip$ip_test_component_$_state_machine__34096__auto____0 = (function (){
var statearr_39859 = [null,null,null,null,null,null,null,null,null,null];
(statearr_39859[(0)] = universo$ip$ip_test_component_$_state_machine__34096__auto__);

(statearr_39859[(1)] = (1));

return statearr_39859;
});
var universo$ip$ip_test_component_$_state_machine__34096__auto____1 = (function (state_39851){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_39851);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e39860){var ex__34099__auto__ = e39860;
var statearr_39861_39949 = state_39851;
(statearr_39861_39949[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_39851[(4)]))){
var statearr_39863_39950 = state_39851;
(statearr_39863_39950[(1)] = cljs.core.first((state_39851[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39951 = state_39851;
state_39851 = G__39951;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
universo$ip$ip_test_component_$_state_machine__34096__auto__ = function(state_39851){
switch(arguments.length){
case 0:
return universo$ip$ip_test_component_$_state_machine__34096__auto____0.call(this);
case 1:
return universo$ip$ip_test_component_$_state_machine__34096__auto____1.call(this,state_39851);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$ip$ip_test_component_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = universo$ip$ip_test_component_$_state_machine__34096__auto____0;
universo$ip$ip_test_component_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = universo$ip$ip_test_component_$_state_machine__34096__auto____1;
return universo$ip$ip_test_component_$_state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_39867 = f__34472__auto__();
(statearr_39867[(6)] = c__34471__auto__);

return statearr_39867;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));

return c__34471__auto__;
})], null),(cljs.core.truth_(cljs.core.deref(loading_QMARK_))?"Cargando...":"Probar API")], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"Resultado:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result))], null),(cljs.core.truth_((function (){var and__5023__auto__ = new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result));
if(cljs.core.truth_(and__5023__auto__)){
return new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result));
} else {
return and__5023__auto__;
}
})())?(function (){var data = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result));
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"Datos obtenidos:"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"IP: ",new cljs.core.Keyword(null,"ip","ip",58378915).cljs$core$IFn$_invoke$arity$1(data)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Pa\u00EDs: ",new cljs.core.Keyword(null,"country_name","country_name",1205772562).cljs$core$IFn$_invoke$arity$1(data)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Ciudad: ",new cljs.core.Keyword(null,"city","city",-393302614).cljs$core$IFn$_invoke$arity$1(data)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"ISP: ",new cljs.core.Keyword(null,"org","org",1495985).cljs$core$IFn$_invoke$arity$1(data)], null)], null);
})():null),(cljs.core.truth_((function (){var and__5023__auto__ = cljs.core.not(new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result)));
if(and__5023__auto__){
return new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result));
} else {
return and__5023__auto__;
}
})())?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"Error:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(result))], null)], null):null)], null)], null);
});
});
universo.ip.simple_ip_test = (function universo$ip$simple_ip_test(){
var ip_info = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("No cargado");
return reagent.core.create_class.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (){
console.log("\uD83C\uDFAC Componente montado, iniciando fetch...");

var c__34471__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_39887){
var state_val_39888 = (state_39887[(1)]);
if((state_val_39888 === (1))){
var inst_39879 = console.log("\u23F3 Llamando fetch-ip-info...");
var inst_39880 = universo.ip.fetch_ip_info();
var state_39887__$1 = (function (){var statearr_39899 = state_39887;
(statearr_39899[(7)] = inst_39879);

return statearr_39899;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39887__$1,(2),inst_39880);
} else {
if((state_val_39888 === (2))){
var inst_39882 = (state_39887[(2)]);
var inst_39883 = console.log("\uD83C\uDFC1 Resultado final:",inst_39882);
var inst_39884 = cljs.core.reset_BANG_(ip_info,inst_39882);
var state_39887__$1 = (function (){var statearr_39902 = state_39887;
(statearr_39902[(8)] = inst_39883);

return statearr_39902;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_39887__$1,inst_39884);
} else {
return null;
}
}
});
return (function() {
var universo$ip$simple_ip_test_$_state_machine__34096__auto__ = null;
var universo$ip$simple_ip_test_$_state_machine__34096__auto____0 = (function (){
var statearr_39908 = [null,null,null,null,null,null,null,null,null];
(statearr_39908[(0)] = universo$ip$simple_ip_test_$_state_machine__34096__auto__);

(statearr_39908[(1)] = (1));

return statearr_39908;
});
var universo$ip$simple_ip_test_$_state_machine__34096__auto____1 = (function (state_39887){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_39887);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e39910){var ex__34099__auto__ = e39910;
var statearr_39911_39952 = state_39887;
(statearr_39911_39952[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_39887[(4)]))){
var statearr_39912_39953 = state_39887;
(statearr_39912_39953[(1)] = cljs.core.first((state_39887[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39954 = state_39887;
state_39887 = G__39954;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
universo$ip$simple_ip_test_$_state_machine__34096__auto__ = function(state_39887){
switch(arguments.length){
case 0:
return universo$ip$simple_ip_test_$_state_machine__34096__auto____0.call(this);
case 1:
return universo$ip$simple_ip_test_$_state_machine__34096__auto____1.call(this,state_39887);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$ip$simple_ip_test_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = universo$ip$simple_ip_test_$_state_machine__34096__auto____0;
universo$ip$simple_ip_test_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = universo$ip$simple_ip_test_$_state_machine__34096__auto____1;
return universo$ip$simple_ip_test_$_state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_39913 = f__34472__auto__();
(statearr_39913[(6)] = c__34471__auto__);

return statearr_39913;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));

return c__34471__auto__;
}),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Test Simple (autom\u00E1tico)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Resultado: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_info))], null),((cljs.core.map_QMARK_(cljs.core.deref(ip_info)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(cljs.core.truth_(new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_info)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"\u00C9xito: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_info)))], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Error: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_info)))], null))], null):null)], null);
})], null));
});
universo.ip.minimal_test = (function universo$ip$minimal_test(){
var status = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("inicial");
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"TEST M\u00CDNIMO"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Status: ",cljs.core.deref(status)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
console.log("Click!");

cljs.core.reset_BANG_(status,"clickeado");

var c__34471__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__34472__auto__ = (function (){var switch__34095__auto__ = (function (state_39930){
var state_val_39931 = (state_39930[(1)]);
if((state_val_39931 === (1))){
var inst_39921 = console.log("Go block ejecutado");
var inst_39922 = cljs.core.reset_BANG_(status,"go ejecutado");
var inst_39923 = universo.ip.fetch_ip_info();
var state_39930__$1 = (function (){var statearr_39935 = state_39930;
(statearr_39935[(7)] = inst_39921);

(statearr_39935[(8)] = inst_39922);

return statearr_39935;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39930__$1,(2),inst_39923);
} else {
if((state_val_39931 === (2))){
var inst_39925 = (state_39930[(2)]);
var inst_39926 = console.log("Resultado:",inst_39925);
var inst_39927 = ["Resultado: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_39925)].join('');
var inst_39928 = cljs.core.reset_BANG_(status,inst_39927);
var state_39930__$1 = (function (){var statearr_39936 = state_39930;
(statearr_39936[(9)] = inst_39926);

return statearr_39936;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_39930__$1,inst_39928);
} else {
return null;
}
}
});
return (function() {
var universo$ip$minimal_test_$_state_machine__34096__auto__ = null;
var universo$ip$minimal_test_$_state_machine__34096__auto____0 = (function (){
var statearr_39939 = [null,null,null,null,null,null,null,null,null,null];
(statearr_39939[(0)] = universo$ip$minimal_test_$_state_machine__34096__auto__);

(statearr_39939[(1)] = (1));

return statearr_39939;
});
var universo$ip$minimal_test_$_state_machine__34096__auto____1 = (function (state_39930){
while(true){
var ret_value__34097__auto__ = (function (){try{while(true){
var result__34098__auto__ = switch__34095__auto__(state_39930);
if(cljs.core.keyword_identical_QMARK_(result__34098__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__34098__auto__;
}
break;
}
}catch (e39941){var ex__34099__auto__ = e39941;
var statearr_39942_39955 = state_39930;
(statearr_39942_39955[(2)] = ex__34099__auto__);


if(cljs.core.seq((state_39930[(4)]))){
var statearr_39943_39956 = state_39930;
(statearr_39943_39956[(1)] = cljs.core.first((state_39930[(4)])));

} else {
throw ex__34099__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__34097__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39957 = state_39930;
state_39930 = G__39957;
continue;
} else {
return ret_value__34097__auto__;
}
break;
}
});
universo$ip$minimal_test_$_state_machine__34096__auto__ = function(state_39930){
switch(arguments.length){
case 0:
return universo$ip$minimal_test_$_state_machine__34096__auto____0.call(this);
case 1:
return universo$ip$minimal_test_$_state_machine__34096__auto____1.call(this,state_39930);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$ip$minimal_test_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$0 = universo$ip$minimal_test_$_state_machine__34096__auto____0;
universo$ip$minimal_test_$_state_machine__34096__auto__.cljs$core$IFn$_invoke$arity$1 = universo$ip$minimal_test_$_state_machine__34096__auto____1;
return universo$ip$minimal_test_$_state_machine__34096__auto__;
})()
})();
var state__34473__auto__ = (function (){var statearr_39944 = f__34472__auto__();
(statearr_39944[(6)] = c__34471__auto__);

return statearr_39944;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__34473__auto__);
}));

return c__34471__auto__;
})], null),"CLICK AQU\u00CD"], null)], null);
});

//# sourceMappingURL=universo.ip.js.map
