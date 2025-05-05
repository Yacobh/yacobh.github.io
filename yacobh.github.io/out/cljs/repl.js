// Compiled by ClojureScript 1.11.54 {:optimizations :none}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
goog.require('goog.string');
goog.require('goog.string.format');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__1486){
var map__1487 = p__1486;
var map__1487__$1 = cljs.core.__destructure_map.call(null,map__1487);
var m = map__1487__$1;
var n = cljs.core.get.call(null,map__1487__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.call(null,map__1487__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,(function (){var or__5043__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
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
})());

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__1488_1516 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__1489_1517 = null;
var count__1490_1518 = (0);
var i__1491_1519 = (0);
while(true){
if((i__1491_1519 < count__1490_1518)){
var f_1520 = cljs.core._nth.call(null,chunk__1489_1517,i__1491_1519);
cljs.core.println.call(null,"  ",f_1520);


var G__1521 = seq__1488_1516;
var G__1522 = chunk__1489_1517;
var G__1523 = count__1490_1518;
var G__1524 = (i__1491_1519 + (1));
seq__1488_1516 = G__1521;
chunk__1489_1517 = G__1522;
count__1490_1518 = G__1523;
i__1491_1519 = G__1524;
continue;
} else {
var temp__5804__auto___1525 = cljs.core.seq.call(null,seq__1488_1516);
if(temp__5804__auto___1525){
var seq__1488_1526__$1 = temp__5804__auto___1525;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__1488_1526__$1)){
var c__5565__auto___1527 = cljs.core.chunk_first.call(null,seq__1488_1526__$1);
var G__1528 = cljs.core.chunk_rest.call(null,seq__1488_1526__$1);
var G__1529 = c__5565__auto___1527;
var G__1530 = cljs.core.count.call(null,c__5565__auto___1527);
var G__1531 = (0);
seq__1488_1516 = G__1528;
chunk__1489_1517 = G__1529;
count__1490_1518 = G__1530;
i__1491_1519 = G__1531;
continue;
} else {
var f_1532 = cljs.core.first.call(null,seq__1488_1526__$1);
cljs.core.println.call(null,"  ",f_1532);


var G__1533 = cljs.core.next.call(null,seq__1488_1526__$1);
var G__1534 = null;
var G__1535 = (0);
var G__1536 = (0);
seq__1488_1516 = G__1533;
chunk__1489_1517 = G__1534;
count__1490_1518 = G__1535;
i__1491_1519 = G__1536;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_1537 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5043__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_1537);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_1537)))?cljs.core.second.call(null,arglists_1537):arglists_1537));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Spec");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__1492_1538 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__1493_1539 = null;
var count__1494_1540 = (0);
var i__1495_1541 = (0);
while(true){
if((i__1495_1541 < count__1494_1540)){
var vec__1504_1542 = cljs.core._nth.call(null,chunk__1493_1539,i__1495_1541);
var name_1543 = cljs.core.nth.call(null,vec__1504_1542,(0),null);
var map__1507_1544 = cljs.core.nth.call(null,vec__1504_1542,(1),null);
var map__1507_1545__$1 = cljs.core.__destructure_map.call(null,map__1507_1544);
var doc_1546 = cljs.core.get.call(null,map__1507_1545__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_1547 = cljs.core.get.call(null,map__1507_1545__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_1543);

cljs.core.println.call(null," ",arglists_1547);

if(cljs.core.truth_(doc_1546)){
cljs.core.println.call(null," ",doc_1546);
} else {
}


var G__1548 = seq__1492_1538;
var G__1549 = chunk__1493_1539;
var G__1550 = count__1494_1540;
var G__1551 = (i__1495_1541 + (1));
seq__1492_1538 = G__1548;
chunk__1493_1539 = G__1549;
count__1494_1540 = G__1550;
i__1495_1541 = G__1551;
continue;
} else {
var temp__5804__auto___1552 = cljs.core.seq.call(null,seq__1492_1538);
if(temp__5804__auto___1552){
var seq__1492_1553__$1 = temp__5804__auto___1552;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__1492_1553__$1)){
var c__5565__auto___1554 = cljs.core.chunk_first.call(null,seq__1492_1553__$1);
var G__1555 = cljs.core.chunk_rest.call(null,seq__1492_1553__$1);
var G__1556 = c__5565__auto___1554;
var G__1557 = cljs.core.count.call(null,c__5565__auto___1554);
var G__1558 = (0);
seq__1492_1538 = G__1555;
chunk__1493_1539 = G__1556;
count__1494_1540 = G__1557;
i__1495_1541 = G__1558;
continue;
} else {
var vec__1508_1559 = cljs.core.first.call(null,seq__1492_1553__$1);
var name_1560 = cljs.core.nth.call(null,vec__1508_1559,(0),null);
var map__1511_1561 = cljs.core.nth.call(null,vec__1508_1559,(1),null);
var map__1511_1562__$1 = cljs.core.__destructure_map.call(null,map__1511_1561);
var doc_1563 = cljs.core.get.call(null,map__1511_1562__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_1564 = cljs.core.get.call(null,map__1511_1562__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_1560);

cljs.core.println.call(null," ",arglists_1564);

if(cljs.core.truth_(doc_1563)){
cljs.core.println.call(null," ",doc_1563);
} else {
}


var G__1565 = cljs.core.next.call(null,seq__1492_1553__$1);
var G__1566 = null;
var G__1567 = (0);
var G__1568 = (0);
seq__1492_1538 = G__1565;
chunk__1493_1539 = G__1566;
count__1494_1540 = G__1567;
i__1495_1541 = G__1568;
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
var temp__5804__auto__ = cljs.spec.alpha.get_spec.call(null,cljs.core.symbol.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name.call(null,n)),cljs.core.name.call(null,nm)));
if(cljs.core.truth_(temp__5804__auto__)){
var fnspec = temp__5804__auto__;
cljs.core.print.call(null,"Spec");

var seq__1512 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__1513 = null;
var count__1514 = (0);
var i__1515 = (0);
while(true){
if((i__1515 < count__1514)){
var role = cljs.core._nth.call(null,chunk__1513,i__1515);
var temp__5804__auto___1569__$1 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5804__auto___1569__$1)){
var spec_1570 = temp__5804__auto___1569__$1;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_1570));
} else {
}


var G__1571 = seq__1512;
var G__1572 = chunk__1513;
var G__1573 = count__1514;
var G__1574 = (i__1515 + (1));
seq__1512 = G__1571;
chunk__1513 = G__1572;
count__1514 = G__1573;
i__1515 = G__1574;
continue;
} else {
var temp__5804__auto____$1 = cljs.core.seq.call(null,seq__1512);
if(temp__5804__auto____$1){
var seq__1512__$1 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__1512__$1)){
var c__5565__auto__ = cljs.core.chunk_first.call(null,seq__1512__$1);
var G__1575 = cljs.core.chunk_rest.call(null,seq__1512__$1);
var G__1576 = c__5565__auto__;
var G__1577 = cljs.core.count.call(null,c__5565__auto__);
var G__1578 = (0);
seq__1512 = G__1575;
chunk__1513 = G__1576;
count__1514 = G__1577;
i__1515 = G__1578;
continue;
} else {
var role = cljs.core.first.call(null,seq__1512__$1);
var temp__5804__auto___1579__$2 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5804__auto___1579__$2)){
var spec_1580 = temp__5804__auto___1579__$2;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_1580));
} else {
}


var G__1581 = cljs.core.next.call(null,seq__1512__$1);
var G__1582 = null;
var G__1583 = (0);
var G__1584 = (0);
seq__1512 = G__1581;
chunk__1513 = G__1582;
count__1514 = G__1583;
i__1515 = G__1584;
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
var base = (function (t){
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol("cljs.core","ExceptionInfo","cljs.core/ExceptionInfo",701839050,null):(((t instanceof Error))?cljs.core.symbol.call(null,"js",t.name):null
))], null),(function (){var temp__5804__auto__ = cljs.core.ex_message.call(null,t);
if(cljs.core.truth_(temp__5804__auto__)){
var msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data.call(null,t);
if(cljs.core.truth_(temp__5804__auto__)){
var ed = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})());
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__1585 = cljs.core.conj.call(null,via,t);
var G__1586 = cljs.core.ex_cause.call(null,t);
via = G__1585;
t = G__1586;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek.call(null,via);
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec.call(null,cljs.core.map.call(null,base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5804__auto__ = cljs.core.ex_message.call(null,root);
if(cljs.core.truth_(temp__5804__auto__)){
var root_msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data.call(null,root);
if(cljs.core.truth_(temp__5804__auto__)){
var data = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data.call(null,o));
if(cljs.core.truth_(temp__5804__auto__)){
var phase = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})());
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
var map__1589 = datafied_throwable;
var map__1589__$1 = cljs.core.__destructure_map.call(null,map__1589);
var via = cljs.core.get.call(null,map__1589__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.call(null,map__1589__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.call(null,map__1589__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__1590 = cljs.core.last.call(null,via);
var map__1590__$1 = cljs.core.__destructure_map.call(null,map__1590);
var type = cljs.core.get.call(null,map__1590__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.call(null,map__1590__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.call(null,map__1590__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__1591 = data;
var map__1591__$1 = cljs.core.__destructure_map.call(null,map__1591);
var problems = cljs.core.get.call(null,map__1591__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.call(null,map__1591__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.call(null,map__1591__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__1592 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,via));
var map__1592__$1 = cljs.core.__destructure_map.call(null,map__1592);
var top_data = map__1592__$1;
var source = cljs.core.get.call(null,map__1592__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.call(null,(function (){var G__1593 = phase;
var G__1593__$1 = (((G__1593 instanceof cljs.core.Keyword))?G__1593.fqn:null);
switch (G__1593__$1) {
case "read-source":
var map__1594 = data;
var map__1594__$1 = cljs.core.__destructure_map.call(null,map__1594);
var line = cljs.core.get.call(null,map__1594__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__1594__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__1595 = cljs.core.merge.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,via)),top_data);
var G__1595__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__1595,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__1595);
var G__1595__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__1595__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__1595__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__1595__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__1595__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__1596 = top_data;
var G__1596__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__1596,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__1596);
var G__1596__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__1596__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__1596__$1);
var G__1596__$3 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__1596__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__1596__$2);
var G__1596__$4 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__1596__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__1596__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__1596__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__1596__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__1597 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__1597,(0),null);
var method = cljs.core.nth.call(null,vec__1597,(1),null);
var file = cljs.core.nth.call(null,vec__1597,(2),null);
var line = cljs.core.nth.call(null,vec__1597,(3),null);
var G__1600 = top_data;
var G__1600__$1 = (cljs.core.truth_(line)?cljs.core.assoc.call(null,G__1600,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__1600);
var G__1600__$2 = (cljs.core.truth_(file)?cljs.core.assoc.call(null,G__1600__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__1600__$1);
var G__1600__$3 = (cljs.core.truth_((function (){var and__5041__auto__ = source__$1;
if(cljs.core.truth_(and__5041__auto__)){
return method;
} else {
return and__5041__auto__;
}
})())?cljs.core.assoc.call(null,G__1600__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__1600__$2);
var G__1600__$4 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__1600__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__1600__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__1600__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__1600__$4;
}

break;
case "execution":
var vec__1601 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__1601,(0),null);
var method = cljs.core.nth.call(null,vec__1601,(1),null);
var file = cljs.core.nth.call(null,vec__1601,(2),null);
var line = cljs.core.nth.call(null,vec__1601,(3),null);
var file__$1 = cljs.core.first.call(null,cljs.core.remove.call(null,(function (p1__1588_SHARP_){
var or__5043__auto__ = (p1__1588_SHARP_ == null);
if(or__5043__auto__){
return or__5043__auto__;
} else {
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,p1__1588_SHARP_);
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5043__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return line;
}
})();
var G__1604 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__1604__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.call(null,G__1604,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__1604);
var G__1604__$2 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__1604__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__1604__$1);
var G__1604__$3 = (cljs.core.truth_((function (){var or__5043__auto__ = fn;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
var and__5041__auto__ = source__$1;
if(cljs.core.truth_(and__5041__auto__)){
return method;
} else {
return and__5041__auto__;
}
}
})())?cljs.core.assoc.call(null,G__1604__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5043__auto__ = fn;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__1604__$2);
var G__1604__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.call(null,G__1604__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__1604__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__1604__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__1604__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__1593__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__1608){
var map__1609 = p__1608;
var map__1609__$1 = cljs.core.__destructure_map.call(null,map__1609);
var triage_data = map__1609__$1;
var phase = cljs.core.get.call(null,map__1609__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.call(null,map__1609__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.call(null,map__1609__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__1609__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.call(null,map__1609__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.call(null,map__1609__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.call(null,map__1609__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.call(null,map__1609__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5043__auto__ = source;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5043__auto__ = line;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name.call(null,(function (){var or__5043__auto__ = class$;
if(cljs.core.truth_(or__5043__auto__)){
return or__5043__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__1610 = phase;
var G__1610__$1 = (((G__1610 instanceof cljs.core.Keyword))?G__1610.fqn:null);
switch (G__1610__$1) {
case "read-source":
return format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause);

break;
case "macro-syntax-check":
return format.call(null,"Syntax error macroexpanding %sat (%s).\n%s",(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,(cljs.core.truth_(spec)?(function (){var sb__5687__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__1611_1620 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__1612_1621 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__1613_1622 = true;
var _STAR_print_fn_STAR__temp_val__1614_1623 = (function (x__5688__auto__){
return sb__5687__auto__.append(x__5688__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__1613_1622);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__1614_1623);

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.call(null,(function (p1__1606_SHARP_){
return cljs.core.dissoc.call(null,p1__1606_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__1612_1621);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__1611_1620);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5687__auto__);
})():format.call(null,"%s\n",cause)));

break;
case "macroexpansion":
return format.call(null,"Unexpected error%s macroexpanding %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compile-syntax-check":
return format.call(null,"Syntax error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compilation":
return format.call(null,"Unexpected error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "read-eval-result":
return format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "print-eval-result":
return format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "execution":
if(cljs.core.truth_(spec)){
return format.call(null,"Execution error - invalid arguments to %s at (%s).\n%s",symbol,loc,(function (){var sb__5687__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__1615_1624 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__1616_1625 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__1617_1626 = true;
var _STAR_print_fn_STAR__temp_val__1618_1627 = (function (x__5688__auto__){
return sb__5687__auto__.append(x__5688__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__1617_1626);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__1618_1627);

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.call(null,(function (p1__1607_SHARP_){
return cljs.core.dissoc.call(null,p1__1607_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__1616_1625);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__1615_1624);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5687__auto__);
})());
} else {
return format.call(null,"Execution error%s at %s(%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__1610__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str.call(null,cljs.repl.ex_triage.call(null,cljs.repl.Error__GT_map.call(null,error)));
});

//# sourceMappingURL=repl.js.map
