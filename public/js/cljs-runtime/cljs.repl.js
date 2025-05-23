goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__20650){
var map__20656 = p__20650;
var map__20656__$1 = cljs.core.__destructure_map(map__20656);
var m = map__20656__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20656__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20656__$1,new cljs.core.Keyword(null,"name","name",1843675177));
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
var seq__20667_20994 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__20668_20995 = null;
var count__20669_20996 = (0);
var i__20670_20997 = (0);
while(true){
if((i__20670_20997 < count__20669_20996)){
var f_20999 = chunk__20668_20995.cljs$core$IIndexed$_nth$arity$2(null,i__20670_20997);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_20999], 0));


var G__21000 = seq__20667_20994;
var G__21001 = chunk__20668_20995;
var G__21002 = count__20669_20996;
var G__21003 = (i__20670_20997 + (1));
seq__20667_20994 = G__21000;
chunk__20668_20995 = G__21001;
count__20669_20996 = G__21002;
i__20670_20997 = G__21003;
continue;
} else {
var temp__5804__auto___21004 = cljs.core.seq(seq__20667_20994);
if(temp__5804__auto___21004){
var seq__20667_21006__$1 = temp__5804__auto___21004;
if(cljs.core.chunked_seq_QMARK_(seq__20667_21006__$1)){
var c__5525__auto___21008 = cljs.core.chunk_first(seq__20667_21006__$1);
var G__21009 = cljs.core.chunk_rest(seq__20667_21006__$1);
var G__21010 = c__5525__auto___21008;
var G__21011 = cljs.core.count(c__5525__auto___21008);
var G__21012 = (0);
seq__20667_20994 = G__21009;
chunk__20668_20995 = G__21010;
count__20669_20996 = G__21011;
i__20670_20997 = G__21012;
continue;
} else {
var f_21013 = cljs.core.first(seq__20667_21006__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_21013], 0));


var G__21014 = cljs.core.next(seq__20667_21006__$1);
var G__21015 = null;
var G__21016 = (0);
var G__21017 = (0);
seq__20667_20994 = G__21014;
chunk__20668_20995 = G__21015;
count__20669_20996 = G__21016;
i__20670_20997 = G__21017;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_21018 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5002__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_21018], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_21018)))?cljs.core.second(arglists_21018):arglists_21018)], 0));
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
var seq__20694_21023 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__20695_21024 = null;
var count__20696_21025 = (0);
var i__20697_21026 = (0);
while(true){
if((i__20697_21026 < count__20696_21025)){
var vec__20714_21027 = chunk__20695_21024.cljs$core$IIndexed$_nth$arity$2(null,i__20697_21026);
var name_21028 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20714_21027,(0),null);
var map__20717_21029 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20714_21027,(1),null);
var map__20717_21030__$1 = cljs.core.__destructure_map(map__20717_21029);
var doc_21031 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20717_21030__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_21032 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20717_21030__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_21028], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_21032], 0));

if(cljs.core.truth_(doc_21031)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_21031], 0));
} else {
}


var G__21034 = seq__20694_21023;
var G__21035 = chunk__20695_21024;
var G__21036 = count__20696_21025;
var G__21037 = (i__20697_21026 + (1));
seq__20694_21023 = G__21034;
chunk__20695_21024 = G__21035;
count__20696_21025 = G__21036;
i__20697_21026 = G__21037;
continue;
} else {
var temp__5804__auto___21038 = cljs.core.seq(seq__20694_21023);
if(temp__5804__auto___21038){
var seq__20694_21039__$1 = temp__5804__auto___21038;
if(cljs.core.chunked_seq_QMARK_(seq__20694_21039__$1)){
var c__5525__auto___21040 = cljs.core.chunk_first(seq__20694_21039__$1);
var G__21041 = cljs.core.chunk_rest(seq__20694_21039__$1);
var G__21042 = c__5525__auto___21040;
var G__21043 = cljs.core.count(c__5525__auto___21040);
var G__21044 = (0);
seq__20694_21023 = G__21041;
chunk__20695_21024 = G__21042;
count__20696_21025 = G__21043;
i__20697_21026 = G__21044;
continue;
} else {
var vec__20726_21045 = cljs.core.first(seq__20694_21039__$1);
var name_21046 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20726_21045,(0),null);
var map__20729_21047 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20726_21045,(1),null);
var map__20729_21048__$1 = cljs.core.__destructure_map(map__20729_21047);
var doc_21049 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20729_21048__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_21050 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20729_21048__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_21046], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_21050], 0));

if(cljs.core.truth_(doc_21049)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_21049], 0));
} else {
}


var G__21052 = cljs.core.next(seq__20694_21039__$1);
var G__21053 = null;
var G__21054 = (0);
var G__21055 = (0);
seq__20694_21023 = G__21052;
chunk__20695_21024 = G__21053;
count__20696_21025 = G__21054;
i__20697_21026 = G__21055;
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

var seq__20732 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__20733 = null;
var count__20734 = (0);
var i__20735 = (0);
while(true){
if((i__20735 < count__20734)){
var role = chunk__20733.cljs$core$IIndexed$_nth$arity$2(null,i__20735);
var temp__5804__auto___21058__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___21058__$1)){
var spec_21059 = temp__5804__auto___21058__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_21059)], 0));
} else {
}


var G__21060 = seq__20732;
var G__21061 = chunk__20733;
var G__21062 = count__20734;
var G__21063 = (i__20735 + (1));
seq__20732 = G__21060;
chunk__20733 = G__21061;
count__20734 = G__21062;
i__20735 = G__21063;
continue;
} else {
var temp__5804__auto____$1 = cljs.core.seq(seq__20732);
if(temp__5804__auto____$1){
var seq__20732__$1 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__20732__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__20732__$1);
var G__21069 = cljs.core.chunk_rest(seq__20732__$1);
var G__21070 = c__5525__auto__;
var G__21071 = cljs.core.count(c__5525__auto__);
var G__21072 = (0);
seq__20732 = G__21069;
chunk__20733 = G__21070;
count__20734 = G__21071;
i__20735 = G__21072;
continue;
} else {
var role = cljs.core.first(seq__20732__$1);
var temp__5804__auto___21073__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___21073__$2)){
var spec_21074 = temp__5804__auto___21073__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_21074)], 0));
} else {
}


var G__21077 = cljs.core.next(seq__20732__$1);
var G__21078 = null;
var G__21079 = (0);
var G__21080 = (0);
seq__20732 = G__21077;
chunk__20733 = G__21078;
count__20734 = G__21079;
i__20735 = G__21080;
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
var map__20780 = datafied_throwable;
var map__20780__$1 = cljs.core.__destructure_map(map__20780);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20780__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20780__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20780__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__20781 = cljs.core.last(via);
var map__20781__$1 = cljs.core.__destructure_map(map__20781);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20781__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20781__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20781__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__20783 = data;
var map__20783__$1 = cljs.core.__destructure_map(map__20783);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20783__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20783__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20783__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__20784 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__20784__$1 = cljs.core.__destructure_map(map__20784);
var top_data = map__20784__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20784__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__20808 = phase;
var G__20808__$1 = (((G__20808 instanceof cljs.core.Keyword))?G__20808.fqn:null);
switch (G__20808__$1) {
case "read-source":
var map__20831 = data;
var map__20831__$1 = cljs.core.__destructure_map(map__20831);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20831__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20831__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__20833 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__20833__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20833,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__20833);
var G__20833__$2 = (cljs.core.truth_((function (){var fexpr__20836 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__20836.cljs$core$IFn$_invoke$arity$1 ? fexpr__20836.cljs$core$IFn$_invoke$arity$1(source) : fexpr__20836.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__20833__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__20833__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20833__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__20833__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__20846 = top_data;
var G__20846__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20846,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__20846);
var G__20846__$2 = (cljs.core.truth_((function (){var fexpr__20850 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__20850.cljs$core$IFn$_invoke$arity$1 ? fexpr__20850.cljs$core$IFn$_invoke$arity$1(source) : fexpr__20850.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__20846__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__20846__$1);
var G__20846__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20846__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__20846__$2);
var G__20846__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20846__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__20846__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20846__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__20846__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__20869 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20869,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20869,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20869,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20869,(3),null);
var G__20877 = top_data;
var G__20877__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20877,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__20877);
var G__20877__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20877__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__20877__$1);
var G__20877__$3 = (cljs.core.truth_((function (){var and__5000__auto__ = source__$1;
if(cljs.core.truth_(and__5000__auto__)){
return method;
} else {
return and__5000__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20877__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__20877__$2);
var G__20877__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20877__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__20877__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20877__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__20877__$4;
}

break;
case "execution":
var vec__20889 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20889,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20889,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20889,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20889,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__20768_SHARP_){
var or__5002__auto__ = (p1__20768_SHARP_ == null);
if(or__5002__auto__){
return or__5002__auto__;
} else {
var fexpr__20893 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__20893.cljs$core$IFn$_invoke$arity$1 ? fexpr__20893.cljs$core$IFn$_invoke$arity$1(p1__20768_SHARP_) : fexpr__20893.call(null,p1__20768_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5002__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return line;
}
})();
var G__20895 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__20895__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20895,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__20895);
var G__20895__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20895__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__20895__$1);
var G__20895__$3 = (cljs.core.truth_((function (){var or__5002__auto__ = fn;
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
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20895__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5002__auto__ = fn;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__20895__$2);
var G__20895__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20895__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__20895__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20895__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__20895__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__20808__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__20906){
var map__20907 = p__20906;
var map__20907__$1 = cljs.core.__destructure_map(map__20907);
var triage_data = map__20907__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20907__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20907__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20907__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20907__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20907__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20907__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20907__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20907__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
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
var G__20913 = phase;
var G__20913__$1 = (((G__20913 instanceof cljs.core.Keyword))?G__20913.fqn:null);
switch (G__20913__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__20920 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__20921 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__20922 = loc;
var G__20923 = (cljs.core.truth_(spec)?(function (){var sb__5647__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__20926_21119 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__20927_21120 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__20928_21121 = true;
var _STAR_print_fn_STAR__temp_val__20929_21122 = (function (x__5648__auto__){
return sb__5647__auto__.append(x__5648__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__20928_21121);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__20929_21122);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__20903_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__20903_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__20927_21120);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__20926_21119);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5647__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__20920,G__20921,G__20922,G__20923) : format.call(null,G__20920,G__20921,G__20922,G__20923));

break;
case "macroexpansion":
var G__20937 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__20938 = cause_type;
var G__20939 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__20940 = loc;
var G__20941 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__20937,G__20938,G__20939,G__20940,G__20941) : format.call(null,G__20937,G__20938,G__20939,G__20940,G__20941));

break;
case "compile-syntax-check":
var G__20944 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__20945 = cause_type;
var G__20946 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__20947 = loc;
var G__20948 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__20944,G__20945,G__20946,G__20947,G__20948) : format.call(null,G__20944,G__20945,G__20946,G__20947,G__20948));

break;
case "compilation":
var G__20950 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__20951 = cause_type;
var G__20952 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__20953 = loc;
var G__20954 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__20950,G__20951,G__20952,G__20953,G__20954) : format.call(null,G__20950,G__20951,G__20952,G__20953,G__20954));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__20958 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__20959 = symbol;
var G__20960 = loc;
var G__20961 = (function (){var sb__5647__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__20963_21134 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__20964_21135 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__20965_21136 = true;
var _STAR_print_fn_STAR__temp_val__20966_21137 = (function (x__5648__auto__){
return sb__5647__auto__.append(x__5648__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__20965_21136);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__20966_21137);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__20905_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__20905_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__20964_21135);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__20963_21134);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5647__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__20958,G__20959,G__20960,G__20961) : format.call(null,G__20958,G__20959,G__20960,G__20961));
} else {
var G__20978 = "Execution error%s at %s(%s).\n%s\n";
var G__20979 = cause_type;
var G__20980 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__20981 = loc;
var G__20982 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__20978,G__20979,G__20980,G__20981,G__20982) : format.call(null,G__20978,G__20979,G__20980,G__20981,G__20982));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__20913__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map
