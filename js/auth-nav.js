import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://runqfwmpkpjruzgzmaxe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1bnF3bXBoa3BqcnV6Z3ptYXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyMDc1OTksImV4cCI6MjEwNDc4MzU5OX0.vuWoMDn7tYHSQAaplEc06cTNiGwwoqw_7drHRlf5wVE";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const nav = document.querySelector(".nav-links");
const isNestedPage = window.location.pathname.includes("/practicals/") ||
    window.location.pathname.includes("/foundations/") ||
    window.location.pathname.includes("/subjects/");
const loginPath = isNestedPage ? "../login.html" : "login.html";
const homePath = isNestedPage ? "../index.html" : "index.html";
const subjectsPath = isNestedPage ? "../subjects.html" : "subjects.html";

document.querySelectorAll('.nav-links a[href="index.html"]').forEach(link => {
    if (window.location.pathname.includes("/practicals/")) {
        link.href = "../practicals.html";
    }
});

if (nav && ![...nav.querySelectorAll("a")].some(link => link.textContent.trim().toLowerCase() === "subjects")) {
    const subjectsLink = document.createElement("a");
    subjectsLink.href = subjectsPath;
    subjectsLink.textContent = "Subjects";
    nav.insertBefore(subjectsLink, nav.firstElementChild?.nextElementSibling || null);
}

let loginLinks = [...document.querySelectorAll(".nav-links a")].filter(link => {
    const href = link.getAttribute("href") || "";
    return href.endsWith("login.html") || link.textContent.trim().toLowerCase() === "login";
});

if (!loginLinks.length && nav) {
    const link = document.createElement("a");
    link.href = loginPath;
    link.textContent = "Login";
    nav.append(link);
    loginLinks = [link];
}

function setAuthLink(session) {
    loginLinks.forEach(link => {
        link.textContent = session ? "Logout" : "Login";
        link.href = session ? "#logout" : link.href;
        link.classList.toggle("auth-logout-link", Boolean(session));
    });
}

async function updateAuthLink() {
    const { data } = await supabase.auth.getSession();
    setAuthLink(data.session);
}

loginLinks.forEach(link => {
    link.addEventListener("click", async event => {
        if (!link.classList.contains("auth-logout-link")) return;
        event.preventDefault();
        await supabase.auth.signOut();
        window.location.href = new URL(homePath, window.location.href).href;
    });
});

supabase.auth.onAuthStateChange((_event, session) => setAuthLink(session));
updateAuthLink();
