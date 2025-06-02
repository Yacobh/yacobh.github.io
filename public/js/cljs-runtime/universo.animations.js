goog.provide('universo.animations');
universo.animations.toggle_dark_mode_BANG_ = (function universo$animations$toggle_dark_mode_BANG_(){
var body = document.body;
return body.classList.toggle("dark-mode");
});
if((typeof universo !== 'undefined') && (typeof universo.animations !== 'undefined') && (typeof universo.animations.box_position !== 'undefined')){
} else {
universo.animations.box_position = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(0),new cljs.core.Keyword(null,"target-x","target-x",-1562024412),(0)], null));
}
universo.animations.animate_step = (function universo$animations$animate_step(timestamp){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(universo.animations.box_position,(function (current_pos){
var current_x = new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(current_pos);
var target_x = new cljs.core.Keyword(null,"target-x","target-x",-1562024412).cljs$core$IFn$_invoke$arity$1(current_pos);
var step_size = (10);
var new_x = (((current_x < target_x))?(function (){var x__5090__auto__ = target_x;
var y__5091__auto__ = (current_x + step_size);
return ((x__5090__auto__ < y__5091__auto__) ? x__5090__auto__ : y__5091__auto__);
})():(function (){var x__5087__auto__ = target_x;
var y__5088__auto__ = (current_x - step_size);
return ((x__5087__auto__ > y__5088__auto__) ? x__5087__auto__ : y__5088__auto__);
})());
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(current_pos,new cljs.core.Keyword(null,"x","x",2099068185),new_x);
}));

if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(universo.animations.box_position)),new cljs.core.Keyword(null,"target-x","target-x",-1562024412).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(universo.animations.box_position)))){
return requestAnimationFrame(universo.animations.animate_step);
} else {
return null;
}
});
universo.animations.start_animation = (function universo$animations$start_animation(target_x_pos){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(universo.animations.box_position,cljs.core.assoc,new cljs.core.Keyword(null,"target-x","target-x",-1562024412),target_x_pos);

return requestAnimationFrame(universo.animations.animate_step);
});
universo.animations.movable_box_component = (function universo$animations$movable_box_component(){
var pos = cljs.core.deref(universo.animations.box_position);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.movable-circle","div.movable-circle",-869003024),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),["translateX(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(pos)),"px) translateY(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(pos)),"px)"].join('')], null)], null)], null);
});
universo.animations.wow_state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"visible","visible",-1024216805),false], null));
universo.animations.show_wow = (function universo$animations$show_wow(){
return setTimeout((function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(universo.animations.wow_state,cljs.core.assoc,new cljs.core.Keyword(null,"visible","visible",-1024216805),true);
}),(1000));
});
universo.animations.app = (function universo$animations$app(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [universo.animations.movable_box_component], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return universo.animations.start_animation((200));
})], null),"Move to 200px"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return universo.animations.start_animation((0));
})], null),"Move to 0px"], null)], null);
});
universo.animations.fade_in_page = (function universo$animations$fade_in_page(){
var body = document.body;
body.classList.add("fading");

return setTimeout((function (){
return body.classList.remove("fading");
}),(5000));
});
universo.animations.home_page = (function universo$animations$home_page(){
universo.animations.fade_in_page();

return reagent.core.create_class.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),universo.animations.show_wow,new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.wow-container","div.wow-container",659306226),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2.wow-text","h2.wow-text",1715728437),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),(cljs.core.truth_(new cljs.core.Keyword(null,"visible","visible",-1024216805).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(universo.animations.wow_state)))?"visible":null)], null),"WOW"], null)], null);
})], null));
});

//# sourceMappingURL=universo.animations.js.map
