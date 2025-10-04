goog.provide('universo.components.login');
universo.components.login.login_form = (function universo$components$login$login_form(){
var email = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var password = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var loading = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var error = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var success = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex.items-center.justify-center.bg-gray-100.p-20","div.flex.items-center.justify-center.bg-gray-100.p-20",956133290),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.bg-white.shadow-md.rounded-lg.p-6.w-full.max-w-md","div.bg-white.shadow-md.rounded-lg.p-6.w-full.max-w-md",1742230360),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2.text-2xl.font-bold.text-gray-800.mb-6.text-center","h2.text-2xl.font-bold.text-gray-800.mb-6.text-center",-1346044492),"Iniciar Sesi\u00F3n"], null),(cljs.core.truth_(cljs.core.deref(success))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.bg-green-100.text-green-700.p-3.rounded.mb-4.text-sm","div.bg-green-100.text-green-700.p-3.rounded.mb-4.text-sm",-1982889393),cljs.core.deref(success)], null):null),(cljs.core.truth_(cljs.core.deref(error))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.bg-red-100.text-red-700.p-3.rounded.mb-4.text-sm","div.bg-red-100.text-red-700.p-3.rounded.mb-4.text-sm",1798207121),cljs.core.deref(error)], null):null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-submit","on-submit",1227871159),(function (e){
e.preventDefault();

cljs.core.reset_BANG_(loading,true);

cljs.core.reset_BANG_(error,null);

cljs.core.reset_BANG_(success,null);

return universo.supabase.sign_in("jacobocordova@gmail.com","Jacobo.1").then((function (response){
cljs.core.reset_BANG_(loading,false);

if(cljs.core.truth_(response.error)){
return cljs.core.reset_BANG_(error,response.error.message);
} else {
cljs.core.reset_BANG_(success,"\u00A1Login exitoso!");

console.log("Usuario:",response.data.user);

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-dashboard-user-id","set-dashboard-user-id",162426676),response.data.user.id], null));

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-visitor-email","set-visitor-email",-1249034608),cljs.core.deref(email)], null));

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-section","set-section",-636822900),new cljs.core.Keyword(null,"dashboard","dashboard",-631747508)], null));
}
})).catch((function (err){
cljs.core.reset_BANG_(loading,false);

return cljs.core.reset_BANG_(error,"Error de conexi\u00F3n");
}));
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mb-4","div.mb-4",-1002350692),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.block.text-sm.font-medium.text-gray-700.mb-1","label.block.text-sm.font-medium.text-gray-700.mb-1",602608273),"Email"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"type","type",1174270348),"email",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"tu@email.com",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(email),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__29267_SHARP_){
return cljs.core.reset_BANG_(email,p1__29267_SHARP_.target.value);
}),new cljs.core.Keyword(null,"required","required",1807647006),true,new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.deref(loading),new cljs.core.Keyword(null,"class","class",-2030961996),"w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mb-6","div.mb-6",-1954659128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.block.text-sm.font-medium.text-gray-700.mb-1","label.block.text-sm.font-medium.text-gray-700.mb-1",602608273),"Contrase\u00F1a"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"type","type",1174270348),"password",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Tu contrase\u00F1a",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(password),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__29268_SHARP_){
return cljs.core.reset_BANG_(password,p1__29268_SHARP_.target.value);
}),new cljs.core.Keyword(null,"required","required",1807647006),true,new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.deref(loading),new cljs.core.Keyword(null,"class","class",-2030961996),"w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"submit",new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.deref(loading),new cljs.core.Keyword(null,"class","class",-2030961996),["w-full py-2 px-4 text-white font-semibold rounded-md transition-colors ",(cljs.core.truth_(cljs.core.deref(loading))?"bg-gray-400 cursor-not-allowed":"bg-blue-600 hover:bg-blue-700")].join('')], null),(cljs.core.truth_(cljs.core.deref(loading))?"Iniciando sesi\u00F3n...":"Iniciar Sesi\u00F3n")], null)], null)], null)], null);
});
});

//# sourceMappingURL=universo.components.login.js.map
