goog.provide('universo.physics');
universo.physics.generate_quantum_particles = (function universo$physics$generate_quantum_particles(n){
return cljs.core.vec((function (){var iter__5480__auto__ = (function universo$physics$generate_quantum_particles_$_iter__11967(s__11968){
return (new cljs.core.LazySeq(null,(function (){
var s__11968__$1 = s__11968;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__11968__$1);
if(temp__5804__auto__){
var s__11968__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__11968__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__11968__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__11970 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__11969 = (0);
while(true){
if((i__11969 < size__5479__auto__)){
var i = cljs.core._nth(c__5478__auto__,i__11969);
cljs.core.chunk_append(b__11970,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.random_uuid(),new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.rand_int((800)),new cljs.core.Keyword(null,"y","y",-1757859776),cljs.core.rand_int((600)),new cljs.core.Keyword(null,"momentum","momentum",899080342),(cljs.core.rand.cljs$core$IFn$_invoke$arity$1((2)) - (1)),new cljs.core.Keyword(null,"energy","energy",129856526),cljs.core.rand.cljs$core$IFn$_invoke$arity$0()], null));

var G__11971 = (i__11969 + (1));
i__11969 = G__11971;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11970),universo$physics$generate_quantum_particles_$_iter__11967(cljs.core.chunk_rest(s__11968__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11970),null);
}
} else {
var i = cljs.core.first(s__11968__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.random_uuid(),new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.rand_int((800)),new cljs.core.Keyword(null,"y","y",-1757859776),cljs.core.rand_int((600)),new cljs.core.Keyword(null,"momentum","momentum",899080342),(cljs.core.rand.cljs$core$IFn$_invoke$arity$1((2)) - (1)),new cljs.core.Keyword(null,"energy","energy",129856526),cljs.core.rand.cljs$core$IFn$_invoke$arity$0()], null),universo$physics$generate_quantum_particles_$_iter__11967(cljs.core.rest(s__11968__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(n));
})());
});
universo.physics.update_particle_position = (function universo$physics$update_particle_position(particle){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$4(particle,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core._PLUS_,new cljs.core.Keyword(null,"momentum","momentum",899080342).cljs$core$IFn$_invoke$arity$1(particle)),new cljs.core.Keyword(null,"y","y",-1757859776),cljs.core._PLUS_,new cljs.core.Keyword(null,"momentum","momentum",899080342).cljs$core$IFn$_invoke$arity$1(particle));
});

//# sourceMappingURL=universo.physics.js.map
