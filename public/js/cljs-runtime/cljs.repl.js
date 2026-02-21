goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__37253){
var map__37254 = p__37253;
var map__37254__$1 = cljs.core.__destructure_map(map__37254);
var m = map__37254__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37254__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37254__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var or__5025__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return [(function (){var temp__5823__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5823__auto__)){
var ns = temp__5823__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})()], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__37260_37580 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__37261_37581 = null;
var count__37262_37582 = (0);
var i__37263_37583 = (0);
while(true){
if((i__37263_37583 < count__37262_37582)){
var f_37584 = chunk__37261_37581.cljs$core$IIndexed$_nth$arity$2(null,i__37263_37583);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_37584], 0));


var G__37585 = seq__37260_37580;
var G__37586 = chunk__37261_37581;
var G__37587 = count__37262_37582;
var G__37588 = (i__37263_37583 + (1));
seq__37260_37580 = G__37585;
chunk__37261_37581 = G__37586;
count__37262_37582 = G__37587;
i__37263_37583 = G__37588;
continue;
} else {
var temp__5823__auto___37590 = cljs.core.seq(seq__37260_37580);
if(temp__5823__auto___37590){
var seq__37260_37591__$1 = temp__5823__auto___37590;
if(cljs.core.chunked_seq_QMARK_(seq__37260_37591__$1)){
var c__5548__auto___37592 = cljs.core.chunk_first(seq__37260_37591__$1);
var G__37593 = cljs.core.chunk_rest(seq__37260_37591__$1);
var G__37594 = c__5548__auto___37592;
var G__37595 = cljs.core.count(c__5548__auto___37592);
var G__37596 = (0);
seq__37260_37580 = G__37593;
chunk__37261_37581 = G__37594;
count__37262_37582 = G__37595;
i__37263_37583 = G__37596;
continue;
} else {
var f_37598 = cljs.core.first(seq__37260_37591__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_37598], 0));


var G__37600 = cljs.core.next(seq__37260_37591__$1);
var G__37601 = null;
var G__37602 = (0);
var G__37603 = (0);
seq__37260_37580 = G__37600;
chunk__37261_37581 = G__37601;
count__37262_37582 = G__37602;
i__37263_37583 = G__37603;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_37608 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5025__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_37608], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_37608)))?cljs.core.second(arglists_37608):arglists_37608)], 0));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Macro"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__37274_37620 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__37275_37621 = null;
var count__37276_37622 = (0);
var i__37277_37623 = (0);
while(true){
if((i__37277_37623 < count__37276_37622)){
var vec__37295_37625 = chunk__37275_37621.cljs$core$IIndexed$_nth$arity$2(null,i__37277_37623);
var name_37626 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37295_37625,(0),null);
var map__37298_37627 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37295_37625,(1),null);
var map__37298_37628__$1 = cljs.core.__destructure_map(map__37298_37627);
var doc_37629 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37298_37628__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_37630 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37298_37628__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_37626], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_37630], 0));

if(cljs.core.truth_(doc_37629)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_37629], 0));
} else {
}


var G__37640 = seq__37274_37620;
var G__37641 = chunk__37275_37621;
var G__37642 = count__37276_37622;
var G__37643 = (i__37277_37623 + (1));
seq__37274_37620 = G__37640;
chunk__37275_37621 = G__37641;
count__37276_37622 = G__37642;
i__37277_37623 = G__37643;
continue;
} else {
var temp__5823__auto___37648 = cljs.core.seq(seq__37274_37620);
if(temp__5823__auto___37648){
var seq__37274_37649__$1 = temp__5823__auto___37648;
if(cljs.core.chunked_seq_QMARK_(seq__37274_37649__$1)){
var c__5548__auto___37650 = cljs.core.chunk_first(seq__37274_37649__$1);
var G__37655 = cljs.core.chunk_rest(seq__37274_37649__$1);
var G__37656 = c__5548__auto___37650;
var G__37657 = cljs.core.count(c__5548__auto___37650);
var G__37658 = (0);
seq__37274_37620 = G__37655;
chunk__37275_37621 = G__37656;
count__37276_37622 = G__37657;
i__37277_37623 = G__37658;
continue;
} else {
var vec__37301_37660 = cljs.core.first(seq__37274_37649__$1);
var name_37661 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37301_37660,(0),null);
var map__37304_37662 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37301_37660,(1),null);
var map__37304_37663__$1 = cljs.core.__destructure_map(map__37304_37662);
var doc_37664 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37304_37663__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_37665 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37304_37663__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_37661], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_37665], 0));

if(cljs.core.truth_(doc_37664)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_37664], 0));
} else {
}


var G__37666 = cljs.core.next(seq__37274_37649__$1);
var G__37667 = null;
var G__37668 = (0);
var G__37669 = (0);
seq__37274_37620 = G__37666;
chunk__37275_37621 = G__37667;
count__37276_37622 = G__37668;
i__37277_37623 = G__37669;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5823__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n)),cljs.core.name(nm)));
if(cljs.core.truth_(temp__5823__auto__)){
var fnspec = temp__5823__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));

var seq__37313 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__37314 = null;
var count__37315 = (0);
var i__37316 = (0);
while(true){
if((i__37316 < count__37315)){
var role = chunk__37314.cljs$core$IIndexed$_nth$arity$2(null,i__37316);
var temp__5823__auto___37678__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5823__auto___37678__$1)){
var spec_37682 = temp__5823__auto___37678__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_37682)], 0));
} else {
}


var G__37688 = seq__37313;
var G__37689 = chunk__37314;
var G__37690 = count__37315;
var G__37691 = (i__37316 + (1));
seq__37313 = G__37688;
chunk__37314 = G__37689;
count__37315 = G__37690;
i__37316 = G__37691;
continue;
} else {
var temp__5823__auto____$1 = cljs.core.seq(seq__37313);
if(temp__5823__auto____$1){
var seq__37313__$1 = temp__5823__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__37313__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__37313__$1);
var G__37695 = cljs.core.chunk_rest(seq__37313__$1);
var G__37696 = c__5548__auto__;
var G__37697 = cljs.core.count(c__5548__auto__);
var G__37698 = (0);
seq__37313 = G__37695;
chunk__37314 = G__37696;
count__37315 = G__37697;
i__37316 = G__37698;
continue;
} else {
var role = cljs.core.first(seq__37313__$1);
var temp__5823__auto___37703__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5823__auto___37703__$2)){
var spec_37707 = temp__5823__auto___37703__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_37707)], 0));
} else {
}


var G__37712 = cljs.core.next(seq__37313__$1);
var G__37713 = null;
var G__37714 = (0);
var G__37715 = (0);
seq__37313 = G__37712;
chunk__37314 = G__37713;
count__37315 = G__37714;
i__37316 = G__37715;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
return cljs.core.Throwable__GT_map(o);
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__37361 = datafied_throwable;
var map__37361__$1 = cljs.core.__destructure_map(map__37361);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37361__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37361__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__37361__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__37362 = cljs.core.last(via);
var map__37362__$1 = cljs.core.__destructure_map(map__37362);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37362__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37362__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37362__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__37363 = data;
var map__37363__$1 = cljs.core.__destructure_map(map__37363);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37363__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37363__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37363__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__37364 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__37364__$1 = cljs.core.__destructure_map(map__37364);
var top_data = map__37364__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37364__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__37368 = phase;
var G__37368__$1 = (((G__37368 instanceof cljs.core.Keyword))?G__37368.fqn:null);
switch (G__37368__$1) {
case "read-source":
var map__37371 = data;
var map__37371__$1 = cljs.core.__destructure_map(map__37371);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37371__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37371__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__37372 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__37372__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37372,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__37372);
var G__37372__$2 = (cljs.core.truth_((function (){var fexpr__37373 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__37373.cljs$core$IFn$_invoke$arity$1 ? fexpr__37373.cljs$core$IFn$_invoke$arity$1(source) : fexpr__37373.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__37372__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__37372__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37372__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__37372__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__37375 = top_data;
var G__37375__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37375,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__37375);
var G__37375__$2 = (cljs.core.truth_((function (){var fexpr__37380 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__37380.cljs$core$IFn$_invoke$arity$1 ? fexpr__37380.cljs$core$IFn$_invoke$arity$1(source) : fexpr__37380.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__37375__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__37375__$1);
var G__37375__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37375__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__37375__$2);
var G__37375__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37375__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__37375__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37375__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__37375__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__37398 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37398,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37398,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37398,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37398,(3),null);
var G__37402 = top_data;
var G__37402__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37402,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__37402);
var G__37402__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37402__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__37402__$1);
var G__37402__$3 = (cljs.core.truth_((function (){var and__5023__auto__ = source__$1;
if(cljs.core.truth_(and__5023__auto__)){
return method;
} else {
return and__5023__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37402__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__37402__$2);
var G__37402__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37402__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__37402__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37402__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__37402__$4;
}

break;
case "execution":
var vec__37412 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37412,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37412,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37412,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37412,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__37355_SHARP_){
var or__5025__auto__ = (p1__37355_SHARP_ == null);
if(or__5025__auto__){
return or__5025__auto__;
} else {
var fexpr__37427 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__37427.cljs$core$IFn$_invoke$arity$1 ? fexpr__37427.cljs$core$IFn$_invoke$arity$1(p1__37355_SHARP_) : fexpr__37427.call(null,p1__37355_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5025__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return line;
}
})();
var G__37431 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__37431__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37431,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__37431);
var G__37431__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37431__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__37431__$1);
var G__37431__$3 = (cljs.core.truth_((function (){var or__5025__auto__ = fn;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
var and__5023__auto__ = source__$1;
if(cljs.core.truth_(and__5023__auto__)){
return method;
} else {
return and__5023__auto__;
}
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37431__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5025__auto__ = fn;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__37431__$2);
var G__37431__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37431__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__37431__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37431__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__37431__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__37368__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__37486){
var map__37487 = p__37486;
var map__37487__$1 = cljs.core.__destructure_map(map__37487);
var triage_data = map__37487__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37487__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37487__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37487__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37487__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37487__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37487__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37487__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37487__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5025__auto__ = source;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5025__auto__ = line;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name((function (){var or__5025__auto__ = class$;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__37509 = phase;
var G__37509__$1 = (((G__37509 instanceof cljs.core.Keyword))?G__37509.fqn:null);
switch (G__37509__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__37511 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__37512 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__37513 = loc;
var G__37514 = (cljs.core.truth_(spec)?(function (){var sb__5670__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__37517_37767 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__37518_37768 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__37519_37769 = true;
var _STAR_print_fn_STAR__temp_val__37520_37770 = (function (x__5671__auto__){
return sb__5670__auto__.append(x__5671__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__37519_37769);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__37520_37770);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__37465_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__37465_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__37518_37768);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__37517_37767);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5670__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__37511,G__37512,G__37513,G__37514) : format.call(null,G__37511,G__37512,G__37513,G__37514));

break;
case "macroexpansion":
var G__37530 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__37531 = cause_type;
var G__37532 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__37533 = loc;
var G__37534 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__37530,G__37531,G__37532,G__37533,G__37534) : format.call(null,G__37530,G__37531,G__37532,G__37533,G__37534));

break;
case "compile-syntax-check":
var G__37536 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__37537 = cause_type;
var G__37538 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__37539 = loc;
var G__37540 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__37536,G__37537,G__37538,G__37539,G__37540) : format.call(null,G__37536,G__37537,G__37538,G__37539,G__37540));

break;
case "compilation":
var G__37542 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__37543 = cause_type;
var G__37544 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__37545 = loc;
var G__37546 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__37542,G__37543,G__37544,G__37545,G__37546) : format.call(null,G__37542,G__37543,G__37544,G__37545,G__37546));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__37549 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__37550 = symbol;
var G__37551 = loc;
var G__37552 = (function (){var sb__5670__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__37554_37787 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__37555_37788 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__37556_37789 = true;
var _STAR_print_fn_STAR__temp_val__37557_37790 = (function (x__5671__auto__){
return sb__5670__auto__.append(x__5671__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__37556_37789);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__37557_37790);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__37479_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__37479_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__37555_37788);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__37554_37787);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5670__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__37549,G__37550,G__37551,G__37552) : format.call(null,G__37549,G__37550,G__37551,G__37552));
} else {
var G__37560 = "Execution error%s at %s(%s).\n%s\n";
var G__37561 = cause_type;
var G__37562 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__37563 = loc;
var G__37564 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__37560,G__37561,G__37562,G__37563,G__37564) : format.call(null,G__37560,G__37561,G__37562,G__37563,G__37564));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__37509__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map
