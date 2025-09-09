goog.provide('universo.core');
universo.core.mount_root = (function universo$core$mount_root(){
re_frame.core.clear_subscription_cache_BANG_();

return reagent.dom.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [universo.views.main_panel], null),document.getElementById("app"));
});
universo.core.init_BANG_ = (function universo$core$init_BANG_(){
re_frame.core.dispatch_sync(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"initialize-db","initialize-db",230998432)], null));

universo.visitor_tracker.start_tracking_BANG_();

return universo.core.mount_root();
});
goog.exportSymbol('universo.core.init_BANG_', universo.core.init_BANG_);

//# sourceMappingURL=universo.core.js.map
