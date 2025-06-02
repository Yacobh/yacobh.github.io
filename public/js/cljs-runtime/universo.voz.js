goog.provide('universo.voz');
universo.voz.list_voices = (function universo$voz$list_voices(){
if((typeof window !== 'undefined') && (typeof window.speechSynthesis !== 'undefined')){
var voices = window.speechSynthesis.getVoices();
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__11999_SHARP_){
return cljs.core.re_find(/es-/,p1__11999_SHARP_.lang);
}),voices);
} else {
return null;
}
});
universo.voz.speak_with_voice = (function universo$voz$speak_with_voice(text,voice){
if((typeof window !== 'undefined') && (typeof window.speechSynthesis !== 'undefined')){
var synthesis = window.speechSynthesis;
var utterance = (new SpeechSynthesisUtterance(text));
(utterance.voice = voice);

(utterance.rate = 2.0);

(utterance.pitch = 0.0);

(utterance.volume = 1.0);

(utterance.lang = "es-ES");

return synthesis.speak(utterance);
} else {
return null;
}
});
universo.voz.voice_selector = (function universo$voz$voice_selector(){
var voices = universo.voz.list_voices();
var selected_voice_index = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((0));
return (function (){
var current_voice = cljs.core.get.cljs$core$IFn$_invoke$arity$2(voices,cljs.core.deref(selected_voice_index));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(selected_voice_index),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (e){
var index = parseInt(e.target.value);
return cljs.core.reset_BANG_(selected_voice_index,index);
})], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,voice){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),idx], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(voice.name)," (",cljs.core.str.cljs$core$IFn$_invoke$arity$1(voice.lang),")"].join('')], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),idx], null));
}),voices)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
var selected_voice = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(voices,cljs.core.deref(selected_voice_index),(0));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Voces disponibles:",voices], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Voces 1",cljs.core.nth.cljs$core$IFn$_invoke$arity$3(voices,cljs.core.deref(selected_voice_index),(0)).name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Voces 2",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(voices).name)," (",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(voices).lang),")"].join('')], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["\u00CDndice seleccionado:",cljs.core.deref(selected_voice_index)], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Voz seleccionada:",selected_voice], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Nombre de la voz:",selected_voice.name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Idioma de la voz:",selected_voice.lang], 0));

return universo.voz.speak_with_voice("Hola nilda Bienvenida al portal de; Jacobo C\u00F3rdova. \u00BFen qu\u00E9 puedo ayudarle?",selected_voice);
})], null),"Hablar"], null)], null);
});
});
universo.voz.speak_text = (function universo$voz$speak_text(text){
if((typeof window !== 'undefined') && (typeof window.speechSynthesis !== 'undefined')){
var synthesis = window.speechSynthesis;
var utterance = (new SpeechSynthesisUtterance(text));
(utterance.rate = 1.0);

(utterance.pitch = 1.0);

(utterance.volume = 1.0);

(utterance.lang = "es-ES");

var temp__5804__auto___12003 = cljs.core.seq(synthesis.getVoices());
if(temp__5804__auto___12003){
var voices_12004 = temp__5804__auto___12003;
var spanish_voices_12005 = cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__12001_SHARP_){
return cljs.core.re_find(/es-/,p1__12001_SHARP_.lang);
}),voices_12004);
if(cljs.core.seq(spanish_voices_12005)){
(utterance.voice = cljs.core.first(spanish_voices_12005));
} else {
}
} else {
}

return synthesis.speak(utterance);
} else {
return null;
}
});
universo.voz.speech_component = (function universo$voz$speech_component(){
var text = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(text),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__12002_SHARP_){
return cljs.core.reset_BANG_(text,p1__12002_SHARP_.target.value);
})], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return universo.voz.speak_text(cljs.core.deref(text));
})], null),"Hablar"], null)], null);
});
});

//# sourceMappingURL=universo.voz.js.map
