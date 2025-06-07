goog.provide('universo.components.guestbook');
universo.components.guestbook.validate_form = (function universo$components$guestbook$validate_form(form_data){
var map__11966 = form_data;
var map__11966__$1 = cljs.core.__destructure_map(map__11966);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11966__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11966__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var errors = cljs.core.PersistentArrayMap.EMPTY;
var G__11967 = errors;
var G__11967__$1 = ((clojure.string.blank_QMARK_(name))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11967,new cljs.core.Keyword(null,"name","name",1843675177),"El nombre es requerido"):G__11967);
var G__11967__$2 = ((clojure.string.blank_QMARK_(message))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11967__$1,new cljs.core.Keyword(null,"message","message",-406056002),"El mensaje es requerido"):G__11967__$1);
if(cljs.core.truth_((function (){var and__5000__auto__ = new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(form_data);
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not(cljs.core.re_matches(/.+@.+\..+/,new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(form_data)));
} else {
return and__5000__auto__;
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__11967__$2,new cljs.core.Keyword(null,"email","email",1415816706),"Email inv\u00E1lido");
} else {
return G__11967__$2;
}
});
universo.components.guestbook.guestbook_form = (function universo$components$guestbook$guestbook_form(on_submit,loading_QMARK_){
var form_data = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),"",new cljs.core.Keyword(null,"email","email",1415816706),"",new cljs.core.Keyword(null,"phone","phone",-763596057),"",new cljs.core.Keyword(null,"message","message",-406056002),""], null));
var errors = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var success = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.guestbook-form.bg-white.rounded-lg.shadow-lg.p-6.mb-8","div.guestbook-form.bg-white.rounded-lg.shadow-lg.p-6.mb-8",1900951085),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-center.mb-6","div.text-center.mb-6",550930704),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2.text-2xl.font-bold.text-gray-800.mb-2","h2.text-2xl.font-bold.text-gray-800.mb-2",98928679),"\u00A1Hola! Soy Jacobo C\u00F3rdova"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.text-gray-600","p.text-gray-600",-123426867),"Me encantar\u00EDa conocerte. \u00BFQuieres escribir tu nombre en mi libro de visitas?"], null)], null),(cljs.core.truth_(cljs.core.deref(success))?new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-center.py-8","div.text-center.py-8",1457361225),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-green-600.text-6xl.mb-4","div.text-green-600.text-6xl.mb-4",-2143938675),"\u2713"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3.text-xl.font-semibold.text-gray-800.mb-2","h3.text-xl.font-semibold.text-gray-800.mb-2",-970745730),"\u00A1Gracias por firmar!"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.text-gray-600","p.text-gray-600",-123426867),"Tu mensaje ha sido agregado al libro de visitas."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.mt-4.px-4.py-2.bg-blue-500.text-white.rounded.hover:bg-blue-600","button.mt-4.px-4.py-2.bg-blue-500.text-white.rounded.hover:bg-blue-600",1865692814),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_(success,false);

return cljs.core.reset_BANG_(form_data,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),"",new cljs.core.Keyword(null,"email","email",1415816706),"",new cljs.core.Keyword(null,"phone","phone",-763596057),"",new cljs.core.Keyword(null,"message","message",-406056002),""], null));
})], null),"Agregar otro mensaje"], null)], null):new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-submit","on-submit",1227871159),(function (e){
e.preventDefault();

var validation_errors = universo.components.guestbook.validate_form(cljs.core.deref(form_data));
if(cljs.core.empty_QMARK_(validation_errors)){
cljs.core.reset_BANG_(errors,cljs.core.PersistentArrayMap.EMPTY);

var G__11972 = cljs.core.deref(form_data);
var G__11973 = (function (){
return cljs.core.reset_BANG_(success,true);
});
return (on_submit.cljs$core$IFn$_invoke$arity$2 ? on_submit.cljs$core$IFn$_invoke$arity$2(G__11972,G__11973) : on_submit.call(null,G__11972,G__11973));
} else {
return cljs.core.reset_BANG_(errors,validation_errors);
}
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.grid.grid-cols-1.md:grid-cols-2.gap-4.mb-4","div.grid.grid-cols-1.md:grid-cols-2.gap-4.mb-4",-1462072490),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.block.text-sm.font-medium.text-gray-700.mb-1","label.block.text-sm.font-medium.text-gray-700.mb-1",602608273),"Nombre *"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500","input.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500",-982839672),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(form_data)),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__11968_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(form_data,cljs.core.assoc,new cljs.core.Keyword(null,"name","name",1843675177),p1__11968_SHARP_.target.value);
}),new cljs.core.Keyword(null,"class","class",-2030961996),(cljs.core.truth_(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(errors)))?"border-red-500":null)], null)], null),(cljs.core.truth_(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(errors)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.text-red-500.text-sm.mt-1","p.text-red-500.text-sm.mt-1",1155243970),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(errors))], null):null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.block.text-sm.font-medium.text-gray-700.mb-1","label.block.text-sm.font-medium.text-gray-700.mb-1",602608273),"Email (opcional)"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500","input.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500",-982839672),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"email",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(form_data)),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__11969_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(form_data,cljs.core.assoc,new cljs.core.Keyword(null,"email","email",1415816706),p1__11969_SHARP_.target.value);
}),new cljs.core.Keyword(null,"class","class",-2030961996),(cljs.core.truth_(new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(errors)))?"border-red-500":null)], null)], null),(cljs.core.truth_(new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(errors)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.text-red-500.text-sm.mt-1","p.text-red-500.text-sm.mt-1",1155243970),new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(errors))], null):null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mb-4","div.mb-4",-1002350692),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.block.text-sm.font-medium.text-gray-700.mb-1","label.block.text-sm.font-medium.text-gray-700.mb-1",602608273),"Tel\u00E9fono (opcional)"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500","input.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500",-982839672),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"tel",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"phone","phone",-763596057).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(form_data)),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__11970_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(form_data,cljs.core.assoc,new cljs.core.Keyword(null,"phone","phone",-763596057),p1__11970_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mb-6","div.mb-6",-1954659128),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.block.text-sm.font-medium.text-gray-700.mb-1","label.block.text-sm.font-medium.text-gray-700.mb-1",602608273),"Mensaje *"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500.h-24","textarea.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500.h-24",-1203553690),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(form_data)),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__11971_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(form_data,cljs.core.assoc,new cljs.core.Keyword(null,"message","message",-406056002),p1__11971_SHARP_.target.value);
}),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Escribe aqu\u00ED tu mensaje...",new cljs.core.Keyword(null,"class","class",-2030961996),(cljs.core.truth_(new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(errors)))?"border-red-500":null)], null)], null),(cljs.core.truth_(new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(errors)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.text-red-500.text-sm.mt-1","p.text-red-500.text-sm.mt-1",1155243970),new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(errors))], null):null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-center","div.text-center",921869624),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.px-6.py-3.bg-blue-600.text-white.font-semibold.rounded-lg.hover:bg-blue-700.focus:outline-none.focus:ring-2.focus:ring-blue-500.disabled:opacity-50.disabled:cursor-not-allowed","button.px-6.py-3.bg-blue-600.text-white.font-semibold.rounded-lg.hover:bg-blue-700.focus:outline-none.focus:ring-2.focus:ring-blue-500.disabled:opacity-50.disabled:cursor-not-allowed",-1110952474),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"submit",new cljs.core.Keyword(null,"disabled","disabled",-1529784218),loading_QMARK_], null),(cljs.core.truth_(loading_QMARK_)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.flex.items-center.justify-center","span.flex.items-center.justify-center",1844163715),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg.animate-spin.h-4.w-4.mr-2.text-white","svg.animate-spin.h-4.w-4.mr-2.text-white",-2111826577),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"viewBox","viewBox",-469489477),"0 0 24 24"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"circle.opacity-25","circle.opacity-25",-2135642308),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"cx","cx",1272694324),"12",new cljs.core.Keyword(null,"cy","cy",755331060),"12",new cljs.core.Keyword(null,"r","r",-471384190),"10",new cljs.core.Keyword(null,"stroke","stroke",1741823555),"currentColor",new cljs.core.Keyword(null,"stroke-width","stroke-width",716836435),"4"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path.opacity-75","path.opacity-75",1184631242),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"fill","fill",883462889),"currentColor",new cljs.core.Keyword(null,"d","d",1972142424),"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"], null)], null)], null),"Enviando..."], null):"\u270D\uFE0F Firmar el libro de visitas")], null)], null)], null))], null);
});
});
universo.components.guestbook.guestbook_entry = (function universo$components$guestbook$guestbook_entry(entry){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.bg-gray-50.rounded-lg.p-4.mb-4.border-l-4.border-blue-500","div.bg-gray-50.rounded-lg.p-4.mb-4.border-l-4.border-blue-500",807233716),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex.justify-between.items-start.mb-2","div.flex.justify-between.items-start.mb-2",-1737971220),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4.font-semibold.text-gray-800","h4.font-semibold.text-gray-800",690382909),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(entry)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text-sm.text-gray-500","span.text-sm.text-gray-500",-84506544),(new Date(new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(entry))).toLocaleDateString("es-ES")], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.text-gray-700.leading-relaxed","p.text-gray-700.leading-relaxed",-497622854),new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(entry)], null),(cljs.core.truth_((function (){var and__5000__auto__ = new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(entry);
if(cljs.core.truth_(and__5000__auto__)){
return (!(clojure.string.blank_QMARK_(new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(entry))));
} else {
return and__5000__auto__;
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.text-sm.text-gray-500.mt-2","p.text-sm.text-gray-500.mt-2",1710365945),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"\uD83D\uDCE7 ",new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(entry)], null)], null):null)], null);
});
universo.components.guestbook.guestbook_list = (function universo$components$guestbook$guestbook_list(entries,loading_QMARK_){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.guestbook-list","div.guestbook-list",-1327049008),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3.text-xl.font-bold.text-gray-800.mb-4.text-center","h3.text-xl.font-bold.text-gray-800.mb-4.text-center",1191965129),"Mensajes del libro de visitas"], null),(cljs.core.truth_(loading_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-center.py-8","div.text-center.py-8",1457361225),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.inline-block.animate-spin.rounded-full.h-8.w-8.border-b-2.border-blue-600","div.inline-block.animate-spin.rounded-full.h-8.w-8.border-b-2.border-blue-600",110382994)], null)], null):((cljs.core.empty_QMARK_(entries))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-center.py-8.text-gray-500","div.text-center.py-8.text-gray-500",-1966422531),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"S\u00E9 el primero en firmar el libro de visitas"], null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(function (){var iter__5480__auto__ = (function universo$components$guestbook$guestbook_list_$_iter__11974(s__11975){
return (new cljs.core.LazySeq(null,(function (){
var s__11975__$1 = s__11975;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__11975__$1);
if(temp__5804__auto__){
var s__11975__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__11975__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__11975__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__11977 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__11976 = (0);
while(true){
if((i__11976 < size__5479__auto__)){
var entry = cljs.core._nth(c__5478__auto__,i__11976);
cljs.core.chunk_append(b__11977,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [universo.components.guestbook.guestbook_entry,entry], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(entry)], null)));

var G__11982 = (i__11976 + (1));
i__11976 = G__11982;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11977),universo$components$guestbook$guestbook_list_$_iter__11974(cljs.core.chunk_rest(s__11975__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11977),null);
}
} else {
var entry = cljs.core.first(s__11975__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [universo.components.guestbook.guestbook_entry,entry], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(entry)], null)),universo$components$guestbook$guestbook_list_$_iter__11974(cljs.core.rest(s__11975__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(entries);
})()], null)))], null);
});
universo.components.guestbook.guestbook_component = (function universo$components$guestbook$guestbook_component(){
var entries = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var loading_entries_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(true);
var loading_submit_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
return reagent.core.create_class.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (){
return universo.db.supabase.get_guestbook_entries().then((function (p1__11978_SHARP_){
cljs.core.reset_BANG_(entries,p1__11978_SHARP_);

return cljs.core.reset_BANG_(loading_entries_QMARK_,false);
})).catch((function (p1__11979_SHARP_){
console.error("Error loading guestbook:",p1__11979_SHARP_);

return cljs.core.reset_BANG_(loading_entries_QMARK_,false);
}));
}),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.max-w-4xl.mx-auto.px-4.py-8","div.max-w-4xl.mx-auto.px-4.py-8",-148538908),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [universo.components.guestbook.guestbook_form,(function (form_data,on_success){
cljs.core.reset_BANG_(loading_submit_QMARK_,true);

return universo.db.supabase.add_guestbook_entry(form_data).then((function (new_entry){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(entries,(function (p1__11980_SHARP_){
return cljs.core.vec(cljs.core.cons(new_entry,p1__11980_SHARP_));
}));

cljs.core.reset_BANG_(loading_submit_QMARK_,false);

return (on_success.cljs$core$IFn$_invoke$arity$0 ? on_success.cljs$core$IFn$_invoke$arity$0() : on_success.call(null));
})).catch((function (p1__11981_SHARP_){
console.error("Error submitting:",p1__11981_SHARP_);

return cljs.core.reset_BANG_(loading_submit_QMARK_,false);
}));
}),cljs.core.deref(loading_submit_QMARK_)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [universo.components.guestbook.guestbook_list,cljs.core.deref(entries),cljs.core.deref(loading_entries_QMARK_)], null)], null);
})], null));
});

//# sourceMappingURL=universo.components.guestbook.js.map
