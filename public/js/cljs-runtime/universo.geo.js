goog.provide('universo.geo');
/**
 * Usa fetch API nativo del navegador
 */
universo.geo.fetch_ip_info = (function universo$geo$fetch_ip_info(){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
fetch("https://ipapi.co/json/").then((function (response){
if(cljs.core.truth_(response.ok)){
return response.json();
} else {
throw (new Error(["HTTP ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(response.status)].join('')));
}
})).then((function (data){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"success","success",1890645906),true,new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(data,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0))], null));
})).catch((function (error){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"success","success",1890645906),false,new cljs.core.Keyword(null,"error","error",-978969032),error.message], null));
}));

return ch;
});
universo.geo.browser_info = (function universo$geo$browser_info(){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"user-agent","user-agent",1220426212),navigator.userAgent,new cljs.core.Keyword(null,"language","language",-1591107564),navigator.language,new cljs.core.Keyword(null,"languages","languages",1471910331),cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(navigator.languages),new cljs.core.Keyword(null,"platform","platform",-1086422114),navigator.platform,new cljs.core.Keyword(null,"cookie-enabled","cookie-enabled",2068401630),navigator.cookieEnabled,new cljs.core.Keyword(null,"online","online",868574801),navigator.onLine], null);
});
universo.geo.timezone_info = (function universo$geo$timezone_info(){
var date = (new Date());
var timezone_name = Intl.DateTimeFormat().resolvedOptions().timeZone();
var offset = date.getTimezoneOffset();
var offset_hours = (offset / (-60));
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"timezone","timezone",1831928099),timezone_name,new cljs.core.Keyword(null,"offset-minutes","offset-minutes",1873776323),offset,new cljs.core.Keyword(null,"offset-hours","offset-hours",1977849303),offset_hours,new cljs.core.Keyword(null,"local-time","local-time",-1873195290),date.toLocaleString(),new cljs.core.Keyword(null,"utc-time","utc-time",1182374597),date.toUTCString()], null);
});
universo.geo.screen_info = (function universo$geo$screen_info(){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"width","width",-384071477),screen.width,new cljs.core.Keyword(null,"height","height",1025178622),screen.height,new cljs.core.Keyword(null,"color-depth","color-depth",517202942),screen.colorDepth,new cljs.core.Keyword(null,"pixel-ratio","pixel-ratio",1006083054),devicePixelRatio,new cljs.core.Keyword(null,"orientation","orientation",623557579),(cljs.core.truth_(screen.orientation)?screen.orientation.angle:null)], null);
});
universo.geo.estimate_country = (function universo$geo$estimate_country(){
var tz = Intl.DateTimeFormat().resolvedOptions().timeZone();
if(cljs.core.truth_(tz.includes("Mexico"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"M\u00E9xico",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDF2\uD83C\uDDFD"], null);
} else {
if(cljs.core.truth_(tz.includes("Argentina"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Argentina",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDE6\uD83C\uDDF7"], null);
} else {
if(cljs.core.truth_(tz.includes("Bogota"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Colombia",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDE8\uD83C\uDDF4"], null);
} else {
if(cljs.core.truth_(tz.includes("Lima"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Per\u00FA",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDF5\uD83C\uDDEA"], null);
} else {
if(cljs.core.truth_(tz.includes("Santiago"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Chile",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDE8\uD83C\uDDF1"], null);
} else {
if(cljs.core.truth_(tz.includes("Madrid"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Espa\u00F1a",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDEA\uD83C\uDDF8"], null);
} else {
if(cljs.core.truth_(tz.includes("New_York"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Estados Unidos",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDFA\uD83C\uDDF8"], null);
} else {
if(cljs.core.truth_(tz.includes("London"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Reino Unido",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDEC\uD83C\uDDE7"], null);
} else {
if(cljs.core.truth_(tz.includes("Paris"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Francia",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDEB\uD83C\uDDF7"], null);
} else {
if(cljs.core.truth_(tz.includes("Berlin"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Alemania",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDE9\uD83C\uDDEA"], null);
} else {
if(cljs.core.truth_(tz.includes("Rome"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Italia",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDEE\uD83C\uDDF9"], null);
} else {
if(cljs.core.truth_(tz.includes("Tokyo"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Jap\u00F3n",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDEF\uD83C\uDDF5"], null);
} else {
if(cljs.core.truth_(tz.includes("Shanghai"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"China",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDE8\uD83C\uDDF3"], null);
} else {
if(cljs.core.truth_(tz.includes("Europe/"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Europa",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDDEA\uD83C\uDDFA"], null);
} else {
if(cljs.core.truth_(tz.includes("America/"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Am\u00E9rica",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDF0E"], null);
} else {
if(cljs.core.truth_(tz.includes("Asia/"))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Asia",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDF0F"], null);
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"country","country",312965309),"Mundo",new cljs.core.Keyword(null,"flag","flag",1088647881),"\uD83C\uDF0D"], null);

}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
universo.geo.geo_info_display = (function universo$geo$geo_info_display(){
var browser_data = universo.geo.browser_info();
var timezone_data = universo.geo.timezone_info();
var screen_data = universo.geo.screen_info();
var country_estimate = universo.geo.estimate_country();
var ip_data = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"loading","loading",-737050189),true], null));
var show_details_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
return reagent.core.create_class.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (){
var c__11659__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__11660__auto__ = (function (){var switch__11495__auto__ = (function (state_11921){
var state_val_11922 = (state_11921[(1)]);
if((state_val_11922 === (1))){
var inst_11916 = universo.geo.fetch_ip_info();
var state_11921__$1 = state_11921;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_11921__$1,(2),inst_11916);
} else {
if((state_val_11922 === (2))){
var inst_11918 = (state_11921[(2)]);
var inst_11919 = cljs.core.reset_BANG_(ip_data,inst_11918);
var state_11921__$1 = state_11921;
return cljs.core.async.impl.ioc_helpers.return_chan(state_11921__$1,inst_11919);
} else {
return null;
}
}
});
return (function() {
var universo$geo$geo_info_display_$_state_machine__11496__auto__ = null;
var universo$geo$geo_info_display_$_state_machine__11496__auto____0 = (function (){
var statearr_11923 = [null,null,null,null,null,null,null];
(statearr_11923[(0)] = universo$geo$geo_info_display_$_state_machine__11496__auto__);

(statearr_11923[(1)] = (1));

return statearr_11923;
});
var universo$geo$geo_info_display_$_state_machine__11496__auto____1 = (function (state_11921){
while(true){
var ret_value__11497__auto__ = (function (){try{while(true){
var result__11498__auto__ = switch__11495__auto__(state_11921);
if(cljs.core.keyword_identical_QMARK_(result__11498__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11498__auto__;
}
break;
}
}catch (e11924){var ex__11499__auto__ = e11924;
var statearr_11925_11934 = state_11921;
(statearr_11925_11934[(2)] = ex__11499__auto__);


if(cljs.core.seq((state_11921[(4)]))){
var statearr_11926_11935 = state_11921;
(statearr_11926_11935[(1)] = cljs.core.first((state_11921[(4)])));

} else {
throw ex__11499__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__11497__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11936 = state_11921;
state_11921 = G__11936;
continue;
} else {
return ret_value__11497__auto__;
}
break;
}
});
universo$geo$geo_info_display_$_state_machine__11496__auto__ = function(state_11921){
switch(arguments.length){
case 0:
return universo$geo$geo_info_display_$_state_machine__11496__auto____0.call(this);
case 1:
return universo$geo$geo_info_display_$_state_machine__11496__auto____1.call(this,state_11921);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
universo$geo$geo_info_display_$_state_machine__11496__auto__.cljs$core$IFn$_invoke$arity$0 = universo$geo$geo_info_display_$_state_machine__11496__auto____0;
universo$geo$geo_info_display_$_state_machine__11496__auto__.cljs$core$IFn$_invoke$arity$1 = universo$geo$geo_info_display_$_state_machine__11496__auto____1;
return universo$geo$geo_info_display_$_state_machine__11496__auto__;
})()
})();
var state__11661__auto__ = (function (){var statearr_11927 = f__11660__auto__();
(statearr_11927[(6)] = c__11659__auto__);

return statearr_11927;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__11661__auto__);
}));

return c__11659__auto__;
}),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.geo-info-container","div.geo-info-container",1355798504),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.info-header","div.info-header",510011472),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"flag","flag",1088647881).cljs$core$IFn$_invoke$arity$1(country_estimate))," Informaci\u00F3n Detectada"].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.toggle-btn","button.toggle-btn",-47503824),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(show_details_QMARK_,cljs.core.not);
})], null),(cljs.core.truth_(cljs.core.deref(show_details_QMARK_))?"Ocultar detalles":"Ver detalles")], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.info-summary","div.info-summary",1106554506),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.info-card","div.info-card",-1341595317),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"\uD83D\uDDE3\uFE0F Idioma"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),(function (){var G__11928 = new cljs.core.Keyword(null,"language","language",-1591107564).cljs$core$IFn$_invoke$arity$1(browser_data);
switch (G__11928) {
case "es":
return "Espa\u00F1ol";

break;
case "es-ES":
return "Espa\u00F1ol (Espa\u00F1a)";

break;
case "es-MX":
return "Espa\u00F1ol (M\u00E9xico)";

break;
case "en":
return "English";

break;
case "fr":
return "Fran\u00E7ais";

break;
case "de":
return "Deutsch";

break;
default:
return new cljs.core.Keyword(null,"language","language",-1591107564).cljs$core$IFn$_invoke$arity$1(browser_data);

}
})()], null),(cljs.core.truth_(cljs.core.deref(show_details_QMARK_))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.details","div.details",-1501667044),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),"Idiomas preferidos:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__5480__auto__ = (function universo$geo$geo_info_display_$_iter__11929(s__11930){
return (new cljs.core.LazySeq(null,(function (){
var s__11930__$1 = s__11930;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__11930__$1);
if(temp__5804__auto__){
var s__11930__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__11930__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__11930__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__11932 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__11931 = (0);
while(true){
if((i__11931 < size__5479__auto__)){
var lang = cljs.core._nth(c__5478__auto__,i__11931);
cljs.core.chunk_append(b__11932,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),lang], null),lang], null));

var G__11938 = (i__11931 + (1));
i__11931 = G__11938;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11932),universo$geo$geo_info_display_$_iter__11929(cljs.core.chunk_rest(s__11930__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11932),null);
}
} else {
var lang = cljs.core.first(s__11930__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),lang], null),lang], null),universo$geo$geo_info_display_$_iter__11929(cljs.core.rest(s__11930__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(new cljs.core.Keyword(null,"languages","languages",1471910331).cljs$core$IFn$_invoke$arity$1(browser_data));
})()], null)], null):null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.info-card","div.info-card",-1341595317),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"\uD83D\uDD50 Zona Horaria"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"timezone","timezone",1831928099).cljs$core$IFn$_invoke$arity$1(timezone_data)], null),(cljs.core.truth_(cljs.core.deref(show_details_QMARK_))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.details","div.details",-1501667044),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),"Hora local: "], null),new cljs.core.Keyword(null,"local-time","local-time",-1873195290).cljs$core$IFn$_invoke$arity$1(timezone_data)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),"Offset UTC: "], null),new cljs.core.Keyword(null,"offset-hours","offset-hours",1977849303).cljs$core$IFn$_invoke$arity$1(timezone_data)," horas"], null)], null):null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.info-card","div.info-card",-1341595317),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"\uD83D\uDCCD Ubicaci\u00F3n Estimada"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"flag","flag",1088647881).cljs$core$IFn$_invoke$arity$1(country_estimate))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"country","country",312965309).cljs$core$IFn$_invoke$arity$1(country_estimate))].join('')], null),(cljs.core.truth_(cljs.core.deref(show_details_QMARK_))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.details","div.details",-1501667044),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),"Basado en: "], null),"Zona horaria del navegador"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),"Precisi\u00F3n: "], null),"Pa\u00EDs/Regi\u00F3n aproximado"], null)], null):null)], null),(cljs.core.truth_((function (){var and__5000__auto__ = cljs.core.not(new cljs.core.Keyword(null,"loading","loading",-737050189).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_data)));
if(and__5000__auto__){
return new cljs.core.Keyword(null,"success","success",1890645906).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_data));
} else {
return and__5000__auto__;
}
})())?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.info-card","div.info-card",-1341595317),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"\uD83C\uDF10 IP Info"], null),(function (){var data = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ip_data));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"city","city",-393302614).cljs$core$IFn$_invoke$arity$1(data)),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"country_name","country_name",1205772562).cljs$core$IFn$_invoke$arity$1(data))].join('')], null),(cljs.core.truth_(cljs.core.deref(show_details_QMARK_))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.details","div.details",-1501667044),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),"IP: "], null),new cljs.core.Keyword(null,"ip","ip",58378915).cljs$core$IFn$_invoke$arity$1(data)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),"ISP: "], null),new cljs.core.Keyword(null,"org","org",1495985).cljs$core$IFn$_invoke$arity$1(data)], null)], null):null)], null);
})()], null):null)], null),(cljs.core.truth_(cljs.core.deref(show_details_QMARK_))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.technical-details","div.technical-details",-3179946),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"\uD83D\uDD27 Informaci\u00F3n T\u00E9cnica"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.tech-grid","div.tech-grid",624025586),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.tech-item","div.tech-item",1663393153),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Navegador:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),(cljs.core.truth_(new cljs.core.Keyword(null,"user-agent","user-agent",1220426212).cljs$core$IFn$_invoke$arity$1(browser_data).includes("Chrome"))?"Chrome":(cljs.core.truth_(new cljs.core.Keyword(null,"user-agent","user-agent",1220426212).cljs$core$IFn$_invoke$arity$1(browser_data).includes("Firefox"))?"Firefox":(cljs.core.truth_(new cljs.core.Keyword(null,"user-agent","user-agent",1220426212).cljs$core$IFn$_invoke$arity$1(browser_data).includes("Safari"))?"Safari":(cljs.core.truth_(new cljs.core.Keyword(null,"user-agent","user-agent",1220426212).cljs$core$IFn$_invoke$arity$1(browser_data).includes("Edge"))?"Edge":"Otro"
))))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.tech-item","div.tech-item",1663393153),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Sistema:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.Keyword(null,"platform","platform",-1086422114).cljs$core$IFn$_invoke$arity$1(browser_data)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.tech-item","div.tech-item",1663393153),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Pantalla:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(screen_data)),"\u00D7",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(screen_data))].join('')], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.tech-item","div.tech-item",1663393153),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"En l\u00EDnea:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),(cljs.core.truth_(new cljs.core.Keyword(null,"online","online",868574801).cljs$core$IFn$_invoke$arity$1(browser_data))?"\u2705 S\u00ED":"\u274C No")], null)], null)], null)], null):null)], null);
})], null));
});
universo.geo.welcome_message = (function universo$geo$welcome_message(){
var lang = navigator.language;
var hour = (new Date()).getHours();
var greeting = (((hour < (12)))?"Buenos d\u00EDas":(((hour < (18)))?"Buenas tardes":"Buenas noches"
));
var lang_name = (function (){var G__11933 = lang.substring((0),(2));
switch (G__11933) {
case "es":
return "espa\u00F1ol";

break;
case "en":
return "ingl\u00E9s";

break;
case "fr":
return "franc\u00E9s";

break;
case "de":
return "alem\u00E1n";

break;
default:
return "otro idioma";

}
})();
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.welcome-banner","div.welcome-banner",-1537289137),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),[greeting,"! \uD83D\uDC4B"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),["Vemos que tu navegador est\u00E1 en ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(lang_name)].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"\u00BFNecesitas ayuda con tus estudios? \u00A1Est\u00E1s en el lugar correcto!"], null)], null);
});

//# sourceMappingURL=universo.geo.js.map
