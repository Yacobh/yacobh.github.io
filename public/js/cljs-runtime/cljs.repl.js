goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__21292){
var map__21293 = p__21292;
var map__21293__$1 = cljs.core.__destructure_map(map__21293);
var m = map__21293__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21293__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21293__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var or__5002__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return [(function (){var temp__5804__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
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
var seq__21298_21522 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__21299_21523 = null;
var count__21300_21524 = (0);
var i__21301_21525 = (0);
while(true){
if((i__21301_21525 < count__21300_21524)){
var f_21527 = chunk__21299_21523.cljs$core$IIndexed$_nth$arity$2(null,i__21301_21525);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_21527], 0));


var G__21528 = seq__21298_21522;
var G__21529 = chunk__21299_21523;
var G__21530 = count__21300_21524;
var G__21531 = (i__21301_21525 + (1));
seq__21298_21522 = G__21528;
chunk__21299_21523 = G__21529;
count__21300_21524 = G__21530;
i__21301_21525 = G__21531;
continue;
} else {
var temp__5804__auto___21532 = cljs.core.seq(seq__21298_21522);
if(temp__5804__auto___21532){
var seq__21298_21533__$1 = temp__5804__auto___21532;
if(cljs.core.chunked_seq_QMARK_(seq__21298_21533__$1)){
var c__5525__auto___21534 = cljs.core.chunk_first(seq__21298_21533__$1);
var G__21535 = cljs.core.chunk_rest(seq__21298_21533__$1);
var G__21536 = c__5525__auto___21534;
var G__21537 = cljs.core.count(c__5525__auto___21534);
var G__21538 = (0);
seq__21298_21522 = G__21535;
chunk__21299_21523 = G__21536;
count__21300_21524 = G__21537;
i__21301_21525 = G__21538;
continue;
} else {
var f_21540 = cljs.core.first(seq__21298_21533__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_21540], 0));


var G__21542 = cljs.core.next(seq__21298_21533__$1);
var G__21543 = null;
var G__21544 = (0);
var G__21545 = (0);
seq__21298_21522 = G__21542;
chunk__21299_21523 = G__21543;
count__21300_21524 = G__21544;
i__21301_21525 = G__21545;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_21547 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5002__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_21547], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_21547)))?cljs.core.second(arglists_21547):arglists_21547)], 0));
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
var seq__21328_21549 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__21329_21550 = null;
var count__21330_21551 = (0);
var i__21331_21552 = (0);
while(true){
if((i__21331_21552 < count__21330_21551)){
var vec__21357_21553 = chunk__21329_21550.cljs$core$IIndexed$_nth$arity$2(null,i__21331_21552);
var name_21554 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21357_21553,(0),null);
var map__21360_21555 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21357_21553,(1),null);
var map__21360_21556__$1 = cljs.core.__destructure_map(map__21360_21555);
var doc_21557 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21360_21556__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_21558 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21360_21556__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_21554], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_21558], 0));

if(cljs.core.truth_(doc_21557)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_21557], 0));
} else {
}


var G__21567 = seq__21328_21549;
var G__21568 = chunk__21329_21550;
var G__21569 = count__21330_21551;
var G__21570 = (i__21331_21552 + (1));
seq__21328_21549 = G__21567;
chunk__21329_21550 = G__21568;
count__21330_21551 = G__21569;
i__21331_21552 = G__21570;
continue;
} else {
var temp__5804__auto___21576 = cljs.core.seq(seq__21328_21549);
if(temp__5804__auto___21576){
var seq__21328_21577__$1 = temp__5804__auto___21576;
if(cljs.core.chunked_seq_QMARK_(seq__21328_21577__$1)){
var c__5525__auto___21578 = cljs.core.chunk_first(seq__21328_21577__$1);
var G__21579 = cljs.core.chunk_rest(seq__21328_21577__$1);
var G__21580 = c__5525__auto___21578;
var G__21581 = cljs.core.count(c__5525__auto___21578);
var G__21582 = (0);
seq__21328_21549 = G__21579;
chunk__21329_21550 = G__21580;
count__21330_21551 = G__21581;
i__21331_21552 = G__21582;
continue;
} else {
var vec__21364_21583 = cljs.core.first(seq__21328_21577__$1);
var name_21584 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21364_21583,(0),null);
var map__21367_21585 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21364_21583,(1),null);
var map__21367_21586__$1 = cljs.core.__destructure_map(map__21367_21585);
var doc_21587 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21367_21586__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_21588 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21367_21586__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_21584], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_21588], 0));

if(cljs.core.truth_(doc_21587)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_21587], 0));
} else {
}


var G__21593 = cljs.core.next(seq__21328_21577__$1);
var G__21594 = null;
var G__21595 = (0);
var G__21596 = (0);
seq__21328_21549 = G__21593;
chunk__21329_21550 = G__21594;
count__21330_21551 = G__21595;
i__21331_21552 = G__21596;
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
var temp__5804__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n)),cljs.core.name(nm)));
if(cljs.core.truth_(temp__5804__auto__)){
var fnspec = temp__5804__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));

var seq__21368 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__21369 = null;
var count__21370 = (0);
var i__21371 = (0);
while(true){
if((i__21371 < count__21370)){
var role = chunk__21369.cljs$core$IIndexed$_nth$arity$2(null,i__21371);
var temp__5804__auto___21600__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___21600__$1)){
var spec_21601 = temp__5804__auto___21600__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_21601)], 0));
} else {
}


var G__21606 = seq__21368;
var G__21607 = chunk__21369;
var G__21608 = count__21370;
var G__21609 = (i__21371 + (1));
seq__21368 = G__21606;
chunk__21369 = G__21607;
count__21370 = G__21608;
i__21371 = G__21609;
continue;
} else {
var temp__5804__auto____$1 = cljs.core.seq(seq__21368);
if(temp__5804__auto____$1){
var seq__21368__$1 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__21368__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__21368__$1);
var G__21615 = cljs.core.chunk_rest(seq__21368__$1);
var G__21616 = c__5525__auto__;
var G__21617 = cljs.core.count(c__5525__auto__);
var G__21618 = (0);
seq__21368 = G__21615;
chunk__21369 = G__21616;
count__21370 = G__21617;
i__21371 = G__21618;
continue;
} else {
var role = cljs.core.first(seq__21368__$1);
var temp__5804__auto___21621__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___21621__$2)){
var spec_21626 = temp__5804__auto___21621__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_21626)], 0));
} else {
}


var G__21630 = cljs.core.next(seq__21368__$1);
var G__21631 = null;
var G__21632 = (0);
var G__21633 = (0);
seq__21368 = G__21630;
chunk__21369 = G__21631;
count__21370 = G__21632;
i__21371 = G__21633;
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
var map__21400 = datafied_throwable;
var map__21400__$1 = cljs.core.__destructure_map(map__21400);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21400__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21400__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__21400__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__21401 = cljs.core.last(via);
var map__21401__$1 = cljs.core.__destructure_map(map__21401);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21401__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21401__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21401__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__21402 = data;
var map__21402__$1 = cljs.core.__destructure_map(map__21402);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21402__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21402__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21402__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__21403 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__21403__$1 = cljs.core.__destructure_map(map__21403);
var top_data = map__21403__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21403__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__21408 = phase;
var G__21408__$1 = (((G__21408 instanceof cljs.core.Keyword))?G__21408.fqn:null);
switch (G__21408__$1) {
case "read-source":
var map__21411 = data;
var map__21411__$1 = cljs.core.__destructure_map(map__21411);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21411__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21411__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__21412 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__21412__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21412,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__21412);
var G__21412__$2 = (cljs.core.truth_((function (){var fexpr__21413 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__21413.cljs$core$IFn$_invoke$arity$1 ? fexpr__21413.cljs$core$IFn$_invoke$arity$1(source) : fexpr__21413.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__21412__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__21412__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21412__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__21412__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__21416 = top_data;
var G__21416__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21416,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__21416);
var G__21416__$2 = (cljs.core.truth_((function (){var fexpr__21417 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__21417.cljs$core$IFn$_invoke$arity$1 ? fexpr__21417.cljs$core$IFn$_invoke$arity$1(source) : fexpr__21417.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__21416__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__21416__$1);
var G__21416__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21416__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__21416__$2);
var G__21416__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21416__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__21416__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21416__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__21416__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__21419 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21419,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21419,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21419,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21419,(3),null);
var G__21422 = top_data;
var G__21422__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21422,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__21422);
var G__21422__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21422__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__21422__$1);
var G__21422__$3 = (cljs.core.truth_((function (){var and__5000__auto__ = source__$1;
if(cljs.core.truth_(and__5000__auto__)){
return method;
} else {
return and__5000__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21422__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__21422__$2);
var G__21422__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21422__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__21422__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21422__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__21422__$4;
}

break;
case "execution":
var vec__21424 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21424,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21424,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21424,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__21424,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__21396_SHARP_){
var or__5002__auto__ = (p1__21396_SHARP_ == null);
if(or__5002__auto__){
return or__5002__auto__;
} else {
var fexpr__21428 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__21428.cljs$core$IFn$_invoke$arity$1 ? fexpr__21428.cljs$core$IFn$_invoke$arity$1(p1__21396_SHARP_) : fexpr__21428.call(null,p1__21396_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5002__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return line;
}
})();
var G__21430 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__21430__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21430,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__21430);
var G__21430__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21430__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__21430__$1);
var G__21430__$3 = (cljs.core.truth_((function (){var or__5002__auto__ = fn;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var and__5000__auto__ = source__$1;
if(cljs.core.truth_(and__5000__auto__)){
return method;
} else {
return and__5000__auto__;
}
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21430__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5002__auto__ = fn;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__21430__$2);
var G__21430__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21430__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__21430__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21430__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__21430__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__21408__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__21433){
var map__21434 = p__21433;
var map__21434__$1 = cljs.core.__destructure_map(map__21434);
var triage_data = map__21434__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21434__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21434__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21434__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21434__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21434__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21434__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21434__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21434__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5002__auto__ = source;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5002__auto__ = line;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name((function (){var or__5002__auto__ = class$;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__21442 = phase;
var G__21442__$1 = (((G__21442 instanceof cljs.core.Keyword))?G__21442.fqn:null);
switch (G__21442__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__21443 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__21444 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__21445 = loc;
var G__21446 = (cljs.core.truth_(spec)?(function (){var sb__5647__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__21447_21738 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__21448_21739 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__21449_21740 = true;
var _STAR_print_fn_STAR__temp_val__21450_21741 = (function (x__5648__auto__){
return sb__5647__auto__.append(x__5648__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__21449_21740);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__21450_21741);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__21431_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__21431_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__21448_21739);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__21447_21738);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5647__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__21443,G__21444,G__21445,G__21446) : format.call(null,G__21443,G__21444,G__21445,G__21446));

break;
case "macroexpansion":
var G__21452 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__21453 = cause_type;
var G__21454 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__21455 = loc;
var G__21456 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__21452,G__21453,G__21454,G__21455,G__21456) : format.call(null,G__21452,G__21453,G__21454,G__21455,G__21456));

break;
case "compile-syntax-check":
var G__21457 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__21458 = cause_type;
var G__21459 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__21460 = loc;
var G__21461 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__21457,G__21458,G__21459,G__21460,G__21461) : format.call(null,G__21457,G__21458,G__21459,G__21460,G__21461));

break;
case "compilation":
var G__21462 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__21463 = cause_type;
var G__21464 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__21465 = loc;
var G__21466 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__21462,G__21463,G__21464,G__21465,G__21466) : format.call(null,G__21462,G__21463,G__21464,G__21465,G__21466));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__21468 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__21469 = symbol;
var G__21470 = loc;
var G__21471 = (function (){var sb__5647__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__21472_21758 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__21473_21759 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__21474_21760 = true;
var _STAR_print_fn_STAR__temp_val__21475_21761 = (function (x__5648__auto__){
return sb__5647__auto__.append(x__5648__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__21474_21760);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__21475_21761);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__21432_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__21432_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__21473_21759);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__21472_21758);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5647__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__21468,G__21469,G__21470,G__21471) : format.call(null,G__21468,G__21469,G__21470,G__21471));
} else {
var G__21476 = "Execution error%s at %s(%s).\n%s\n";
var G__21477 = cause_type;
var G__21478 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__21479 = loc;
var G__21480 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__21476,G__21477,G__21478,G__21479,G__21480) : format.call(null,G__21476,G__21477,G__21478,G__21479,G__21480));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__21442__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map
