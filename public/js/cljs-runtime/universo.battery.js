goog.provide('universo.battery');
universo.battery.update_battery_status = (function universo$battery$update_battery_status(battery,battery_state){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(battery_state,cljs.core.assoc,new cljs.core.Keyword(null,"charging","charging",-72750460),battery.charging,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"level","level",1290497552),((100) * battery.level),new cljs.core.Keyword(null,"chargingTime","chargingTime",-1353766724),(cljs.core.truth_(isFinite(battery.chargingTime))?battery.chargingTime:"Infinito"),new cljs.core.Keyword(null,"dischargingTime","dischargingTime",1190357238),(cljs.core.truth_(isFinite(battery.dischargingTime))?battery.dischargingTime:"Infinito")], 0));
});
universo.battery.setup_battery_listeners = (function universo$battery$setup_battery_listeners(battery,battery_state){
universo.battery.update_battery_status(battery,battery_state);

battery.addEventListener("chargingchange",(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(battery_state,cljs.core.assoc,new cljs.core.Keyword(null,"charging","charging",-72750460),battery.charging);
}));

battery.addEventListener("levelchange",(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(battery_state,cljs.core.assoc,new cljs.core.Keyword(null,"level","level",1290497552),((100) * battery.level));
}));

battery.addEventListener("chargingtimechange",(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(battery_state,cljs.core.assoc,new cljs.core.Keyword(null,"chargingTime","chargingTime",-1353766724),(cljs.core.truth_(isFinite(battery.chargingTime))?battery.chargingTime:"Infinito"));
}));

return battery.addEventListener("dischargingtimechange",(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(battery_state,cljs.core.assoc,new cljs.core.Keyword(null,"dischargingTime","dischargingTime",1190357238),(cljs.core.truth_(isFinite(battery.dischargingTime))?battery.dischargingTime:"Infinito"));
}));
});
universo.battery.battery_status_component = (function universo$battery$battery_status_component(){
var battery_state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"charging","charging",-72750460),false,new cljs.core.Keyword(null,"level","level",1290497552),(0),new cljs.core.Keyword(null,"chargingTime","chargingTime",-1353766724),"Infinito",new cljs.core.Keyword(null,"dischargingTime","dischargingTime",1190357238),"Infinito"], null));
return reagent.core.create_class.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (){
if(cljs.core.truth_(navigator.getBattery)){
return navigator.getBattery().then((function (p1__11896_SHARP_){
return universo.battery.setup_battery_listeners(p1__11896_SHARP_,battery_state);
})).catch((function (p1__11897_SHARP_){
return console.error("Error accediendo a la API de bater\u00EDa:",p1__11897_SHARP_);
}));
} else {
return null;
}
}),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"Estado de la Bater\u00EDa"], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),["Nivel: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"level","level",1290497552).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(battery_state))),"%"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.battery-indicator","div.battery-indicator",314438669),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.battery-level","div.battery-level",-1447311608),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"level","level",1290497552).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(battery_state))),"%"].join(''),new cljs.core.Keyword(null,"background-color","background-color",570434026),(cljs.core.truth_(new cljs.core.Keyword(null,"charging","charging",-72750460).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(battery_state)))?"green":(((new cljs.core.Keyword(null,"level","level",1290497552).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(battery_state)) < (20)))?"red":(((new cljs.core.Keyword(null,"level","level",1290497552).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(battery_state)) < (50)))?"orange":"lightgreen"
)))], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),["Estado: ",(cljs.core.truth_(new cljs.core.Keyword(null,"charging","charging",-72750460).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(battery_state)))?"Cargando":"Descargando")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),["Tiempo de carga restante: ",(cljs.core.truth_(new cljs.core.Keyword(null,"charging","charging",-72750460).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(battery_state)))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1((new cljs.core.Keyword(null,"chargingTime","chargingTime",-1353766724).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(battery_state)) / (60)))," minutos"].join(''):"N/A")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),["Tiempo de descarga restante: ",((cljs.core.not(new cljs.core.Keyword(null,"charging","charging",-72750460).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(battery_state))))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"dischargingTime","dischargingTime",1190357238).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(battery_state)))," segundos"].join(''):"N/A")].join('')], null)], null)], null);
})], null));
});

//# sourceMappingURL=universo.battery.js.map
