goog.provide('universo.jardin');
if((typeof universo !== 'undefined') && (typeof universo.jardin !== 'undefined') && (typeof universo.jardin.app_state !== 'undefined')){
} else {
universo.jardin.app_state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"particles","particles",801881788),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"wave-function","wave-function",-13639209),null,new cljs.core.Keyword(null,"simulation-running","simulation-running",-921231822),false], null));
}
universo.jardin.init_particles = (function universo$jardin$init_particles(n){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(universo.jardin.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"particles","particles",801881788),universo.physics.generate_quantum_particles(n));
});
universo.jardin.quantum_simulator = (function universo$jardin$quantum_simulator(){
var state = cljs.core.deref(universo.jardin.app_state);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.quantum-container","div.quantum-container",-1678769330),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),"Quantum Particle Simulator"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-panel","div.control-panel",-1920239249),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return universo.jardin.init_particles((20));
})], null),"Generate 10 Particles"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(universo.jardin.app_state,cljs.core.update,new cljs.core.Keyword(null,"simulation-running","simulation-running",-921231822),cljs.core.not);
})], null),(cljs.core.truth_(new cljs.core.Keyword(null,"simulation-running","simulation-running",-921231822).cljs$core$IFn$_invoke$arity$1(state))?"Stop Simulation":"Start Simulation")], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.visualization-area","div.visualization-area",-507799395),(function (){var iter__5480__auto__ = (function universo$jardin$quantum_simulator_$_iter__12305(s__12306){
return (new cljs.core.LazySeq(null,(function (){
var s__12306__$1 = s__12306;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__12306__$1);
if(temp__5804__auto__){
var s__12306__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__12306__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__12306__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__12309 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__12308 = (0);
while(true){
if((i__12308 < size__5479__auto__)){
var particle = cljs.core._nth(c__5478__auto__,i__12308);
cljs.core.chunk_append(b__12309,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.quantum-particle","div.quantum-particle",758561641),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(particle)),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(particle)),"px"].join('')], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(particle)], null)));

var G__12320 = (i__12308 + (1));
i__12308 = G__12320;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__12309),universo$jardin$quantum_simulator_$_iter__12305(cljs.core.chunk_rest(s__12306__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__12309),null);
}
} else {
var particle = cljs.core.first(s__12306__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.quantum-particle","div.quantum-particle",758561641),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(particle)),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(particle)),"px"].join('')], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(particle)], null)),universo$jardin$quantum_simulator_$_iter__12305(cljs.core.rest(s__12306__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(new cljs.core.Keyword(null,"particles","particles",801881788).cljs$core$IFn$_invoke$arity$1(state));
})()], null)], null);
});
universo.jardin.particle_position = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),"50%",new cljs.core.Keyword(null,"y","y",-1757859776),"40%"], null));
universo.jardin.particle_state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"fundamental","fundamental",-689778671));
universo.jardin.state_controls = (function universo$jardin$state_controls(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.reset_BANG_(universo.jardin.particle_state,new cljs.core.Keyword(null,"fundamental","fundamental",-689778671));
})], null),"Fundamental"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.reset_BANG_(universo.jardin.particle_state,new cljs.core.Keyword(null,"excited","excited",-1052405902));
})], null),"Excited"], null)], null);
});
universo.jardin.quantum_dot = (function universo$jardin$quantum_dot(){
var state = cljs.core.deref(universo.jardin.particle_state);
var pos = cljs.core.deref(universo.jardin.particle_position);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.quantum-dot","div.quantum-dot",1466240749),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"left","left",-399115937),new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(pos),new cljs.core.Keyword(null,"top","top",-1856271961),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(pos),new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(-50%, -50%)",new cljs.core.Keyword(null,"background-color","background-color",570434026),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.Keyword(null,"excited","excited",-1052405902)))?"#ff0":"#0ff")], null),new cljs.core.Keyword(null,"class","class",-2030961996),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.Keyword(null,"excited","excited",-1052405902)))?"excited-state":null)], null)], null);
});
universo.jardin.jardin = (function universo$jardin$jardin(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [universo.jardin.state_controls], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [universo.jardin.quantum_dot], null)], null);
});

//# sourceMappingURL=universo.jardin.js.map
