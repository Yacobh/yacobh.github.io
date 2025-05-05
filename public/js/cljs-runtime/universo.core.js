goog.provide('universo.core');
universo.core.home_page = (function universo$core$home_page(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"Welcome to Reagent"], null)], null);
});
universo.core.mount_root = (function universo$core$mount_root(){
return reagent.dom.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [universo.core.home_page], null),document.getElementById("app"));
});
universo.core.init_BANG_ = (function universo$core$init_BANG_(){
return universo.core.mount_root();
});
goog.exportSymbol('universo.core.init_BANG_', universo.core.init_BANG_);

//# sourceMappingURL=universo.core.js.map
