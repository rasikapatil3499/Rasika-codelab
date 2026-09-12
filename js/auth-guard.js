import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://runfwmphkpjruzgzmaxe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1bnF3bXBoa3BqcnV6Z3ptYXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyMDc1OTksImV4cCI6MjEwNDc4MzU5OX0.vuWoMDn7tYHSQAaplEc06cTNiGwwoqw_7drHRlf5wVE";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginUrl = new URL("../login.html", window.location.href);
loginUrl.searchParams.set("redirect", `${window.location.pathname}${window.location.search}`);

document.documentElement.classList.add("auth-checking");

const { data, error } = await supabase.auth.getSession();

if (error || !data.session) {
    window.location.replace(loginUrl.href);
} else {
    document.documentElement.classList.remove("auth-checking");
    document.documentElement.classList.add("authenticated");
    document.body.classList.add("auth-ready");
}

supabase.auth.onAuthStateChange((_event, session) => {
    if (!session) window.location.replace(loginUrl.href);
});
