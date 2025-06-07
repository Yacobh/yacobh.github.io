goog.provide('universo.components.auth');
universo.components.auth.auth_component = (function universo$components$auth$auth_component(){
var email = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var password = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var mode = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"login","login",55217519));
var user = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var loading = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var error = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var message = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
universo.supabase.get_session().then((function (res){
var temp__5804__auto__ = res.data.session;
if(cljs.core.truth_(temp__5804__auto__)){
var session = temp__5804__auto__;
return cljs.core.reset_BANG_(user,session.user);
} else {
return null;
}
}));

return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.auth-container","div.auth-container",-319032841),(cljs.core.truth_(cljs.core.deref(user))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.user-panel","div.user-panel",1214507856),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"Bienvenido"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Email: ",cljs.core.deref(user).email], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
universo.supabase.sign_out();

cljs.core.reset_BANG_(user,null);

return cljs.core.reset_BANG_(message,"Sesi\u00F3n cerrada");
})], null),"Cerrar Sesi\u00F3n"], null)], null):new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.auth-form","div.auth-form",-733559273),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mode),new cljs.core.Keyword(null,"login","login",55217519)))?"Iniciar Sesi\u00F3n":"Registrarse")], null),(cljs.core.truth_(cljs.core.deref(error))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.error","div.error",314336058),cljs.core.deref(error)], null):null),(cljs.core.truth_(cljs.core.deref(message))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),cljs.core.deref(message)], null):null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-submit","on-submit",1227871159),(function (e){
e.preventDefault();

cljs.core.reset_BANG_(loading,true);

cljs.core.reset_BANG_(error,null);

cljs.core.reset_BANG_(message,null);

var auth_fn = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mode),new cljs.core.Keyword(null,"login","login",55217519)))?universo.supabase.sign_in:universo.supabase.sign_up);
return (function (){var G__12133 = cljs.core.deref(email);
var G__12134 = cljs.core.deref(password);
return (auth_fn.cljs$core$IFn$_invoke$arity$2 ? auth_fn.cljs$core$IFn$_invoke$arity$2(G__12133,G__12134) : auth_fn.call(null,G__12133,G__12134));
})().then((function (res){
cljs.core.reset_BANG_(loading,false);

if(cljs.core.truth_(res.error)){
return cljs.core.reset_BANG_(error,res.error.message);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mode),new cljs.core.Keyword(null,"login","login",55217519))){
return cljs.core.reset_BANG_(user,res.data.user);
} else {
return cljs.core.reset_BANG_(message,"\u00A1Registro exitoso! Revisa tu email.");
}
}
})).catch((function (err){
cljs.core.reset_BANG_(loading,false);

return cljs.core.reset_BANG_(error,"Error de conexi\u00F3n");
}));
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"email",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Email",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(email),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__12131_SHARP_){
return cljs.core.reset_BANG_(email,p1__12131_SHARP_.target.value);
}),new cljs.core.Keyword(null,"required","required",1807647006),true], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"type","type",1174270348),"password",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Contrase\u00F1a (m\u00EDnimo 6 caracteres)",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(password),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__12132_SHARP_){
return cljs.core.reset_BANG_(password,p1__12132_SHARP_.target.value);
}),new cljs.core.Keyword(null,"required","required",1807647006),true,new cljs.core.Keyword(null,"min-length","min-length",-325792315),(6)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"submit",new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core.deref(loading)], null),(cljs.core.truth_(cljs.core.deref(loading))?"Procesando...":((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mode),new cljs.core.Keyword(null,"login","login",55217519)))?"Iniciar Sesi\u00F3n":"Registrarse"))], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.switch-mode","p.switch-mode",-1717507031),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mode),new cljs.core.Keyword(null,"login","login",55217519)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"\u00BFNo tienes cuenta? ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (e){
e.preventDefault();

cljs.core.reset_BANG_(mode,new cljs.core.Keyword(null,"register","register",1968522516));

return cljs.core.reset_BANG_(error,null);
})], null),"Reg\u00EDstrate"], null)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"\u00BFYa tienes cuenta? ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (e){
e.preventDefault();

cljs.core.reset_BANG_(mode,new cljs.core.Keyword(null,"login","login",55217519));

return cljs.core.reset_BANG_(error,null);
})], null),"Inicia sesi\u00F3n"], null)], null))], null)], null))], null);
});
});

//# sourceMappingURL=universo.components.auth.js.map
