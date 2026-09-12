import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Replace these two public values with the values from Supabase Project Settings.
const SUPABASE_URL = "https://runfwmphkpjruzgzmaxe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1bnFmd21wa3BqcnV6Z3ptYXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyMDc1OTksImV4cCI6MjEwNDc4MzU5OX0.vuWoMDn7tYHSQAaplEc06cTNiGwwoqw_7drHRlf5wVE";

const form = document.querySelector("#auth-form");
const googleButton = document.querySelector("#google-login");
const switchButton = document.querySelector("#auth-switch");
const submitButton = document.querySelector("#email-login");
const status = document.querySelector("#auth-status");
const title = document.querySelector("#auth-title");
const passwordInput = document.querySelector("#password");
const deployedLoginUrl = "https://rasikapatil3499.github.io/Rasika-codelab/login.html";
const redirectTarget = new URLSearchParams(window.location.search).get("redirect");
const authRedirectUrl = new URL(deployedLoginUrl);

if (redirectTarget) {
    authRedirectUrl.searchParams.set("redirect", redirectTarget);
}

let isSignUpMode = false;

function showStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle("is-error", isError);
}

function hasSupabaseConfig() {
    return !SUPABASE_URL.startsWith("YOUR_") && !SUPABASE_ANON_KEY.startsWith("YOUR_");
}

if (!hasSupabaseConfig()) {
    showStatus("Add your Supabase URL and anon key in js/auth.js before using login.", true);
}

const supabase = hasSupabaseConfig()
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

switchButton.addEventListener("click", () => {
    isSignUpMode = !isSignUpMode;
    title.innerHTML = isSignUpMode ? "Create your <span>CodeLab</span> account" : "Log in to <span>CodeLab</span>";
    submitButton.textContent = isSignUpMode ? "Create account" : "Log in";
    passwordInput.autocomplete = isSignUpMode ? "new-password" : "current-password";
    switchButton.textContent = isSignUpMode
        ? "Already have an account? Log in"
        : "New here? Create an account";
    showStatus("");
});

googleButton.addEventListener("click", async () => {
    if (!supabase) return;

    showStatus("Redirecting to Google...");
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: authRedirectUrl.href
        }
    });

    if (error) showStatus(error.message, true);
});

form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!supabase) return;

    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const result = isSignUpMode
        ? await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: authRedirectUrl.href }
        })
        : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
        showStatus(result.error.message, true);
        return;
    }

    if (isSignUpMode) {
        showStatus("Account created. Check your email to confirm your address.");
        return;
    }

    showStatus("Login successful. Redirecting...");
    window.location.href = redirectTarget || "index.html";
});
