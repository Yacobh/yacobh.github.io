goog.provide('universo.supabase');
var module$node_modules$$supabase$supabase_js$dist$main$index=shadow.js.require("module$node_modules$$supabase$supabase_js$dist$main$index", {});
universo.supabase.supabase_url = "https://jmnqklhxcdccvdhuuiji.supabase.co";
universo.supabase.supabase_anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptbnFrbGh4Y2RjY3ZkaHV1aWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NDAwNDksImV4cCI6MjA2NDMxNjA0OX0.WXchV7eoj4pzb8W_N_msmLNwRGEjWoAMRYrBApdRvOo";
universo.supabase.supabase_client = module$node_modules$$supabase$supabase_js$dist$main$index.createClient(universo.supabase.supabase_url,universo.supabase.supabase_anon_key);
console.log("\uD83D\uDD0C Cliente Supabase creado:",universo.supabase.supabase_client);
universo.supabase.sign_in = (function universo$supabase$sign_in(email,password){
return universo.supabase.supabase_client.auth.signInWithPassword(({"email": email, "password": password}));
});
universo.supabase.sign_in_with_google = (function universo$supabase$sign_in_with_google(){
return universo.supabase.supabase_client.auth.signInWithOAuth(({"provider": "google", "options": ({"redirectTo": window.location.href})}));
});
universo.supabase.sign_out = (function universo$supabase$sign_out(){
return universo.supabase.supabase_client.auth.signOut();
});
universo.supabase.get_session = (function universo$supabase$get_session(){
console.log("1. supabase object:",module$node_modules$$supabase$supabase_js$dist$main$index);

console.log("2. supabase.auth:",universo.supabase.supabase_client.auth);

console.log("3. auth methods:",(cljs.core.truth_(universo.supabase.supabase_client.auth)?Object.keys(universo.supabase.supabase_client.auth):null));

var temp__5802__auto__ = universo.supabase.supabase_client.auth;
if(cljs.core.truth_(temp__5802__auto__)){
var auth = temp__5802__auto__;
var temp__5802__auto____$1 = auth.getSession;
if(cljs.core.truth_(temp__5802__auto____$1)){
var get_session_fn = temp__5802__auto____$1;
console.log("4. Calling getSession...");

return auth.getSession();
} else {
return console.error("getSession method not found!");
}
} else {
return console.error("auth property not found!");
}
});
universo.supabase.on_auth_state_change = (function universo$supabase$on_auth_state_change(callback){
return universo.supabase.supabase_client.auth.onAuthStateChange(callback);
});
universo.supabase.sign_up = (function universo$supabase$sign_up(email,password){
return universo.supabase.supabase_client.auth.signUp(({"email": email, "password": password}));
});

//# sourceMappingURL=universo.supabase.js.map
