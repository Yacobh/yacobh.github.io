goog.provide('universo.components.login');
universo.components.login.login_form = (function universo$components$login$login_form(){
var email = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var password = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var loading = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var error = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var success = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.login-container","div.login-container",43273041),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"Iniciar Sesi\u00F3n"], null),(cljs.core.truth_(cljs.core.deref(success))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.success-message","div.success-message",-374388414),cljs.core.deref(success)], null):null),(cljs.core.truth_(cljs.core.deref(error))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.error-message","div.error-message",926006572),cljs.core.deref(error)], null):null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-submit","on-submit",1227871159),(function (e){
e.preventDefault();

cljs.core.reset_BANG_(loading,true);

cljs.core.reset_BANG_(error,null);

cljs.core.reset_BANG_(success,null);

return universo.supabase.sign_in(cljs.core.deref(email),cljs.core.deref(password)).then((function (response){
cljs.core.reset_BANG_(loading,false);

if(cljs.core.truth_(response.error)){
return cljs.core.reset_BANG_(error,response.error.message);
} else {
cljs.core.reset_BANG_(success,"\u00A1Login exitoso!");

return console.log("Usuario:",response.data.user);
}
})).catch((function (err){
cljs.core.reset_BANG_(loading,false);

return cljs.core.reset_BANG_(error,"Error de conexi\u00F3n");
}));
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Email:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"type","type",1174270348),"email",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"tu@email.com",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(email),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__12135_SHARP_){
return cljs.core.reset_BANG_(email,p1__12135_SHARP_.target.value);
}),new cljs.core.Keyword(null,"required","required",1807647006),true,new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.deref(loading)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Contrase\u00F1a:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"type","type",1174270348),"password",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Tu contrase\u00F1a",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(password),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__12136_SHARP_){
return cljs.core.reset_BANG_(password,p1__12136_SHARP_.target.value);
}),new cljs.core.Keyword(null,"required","required",1807647006),true,new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.deref(loading)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"submit",new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.deref(loading)], null),(cljs.core.truth_(cljs.core.deref(loading))?"Iniciando sesi\u00F3n...":"Iniciar Sesi\u00F3n")], null)], null)], null);
});
});

//# sourceMappingURL=universo.components.login.js.map
