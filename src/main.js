import { translations } from "./translations.js"

// --- Dark mode ---
;(function () {
  var themeToggle = document.getElementById("theme-toggle")
  var html = document.documentElement

  function getPreferredTheme() {
    var stored = localStorage.getItem("theme")
    if (stored) return stored
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  function setTheme(theme) {
    html.classList.toggle("dark", theme === "dark")
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "light_mode" : "dark_mode"
    }
    localStorage.setItem("theme", theme)
  }

  setTheme(getPreferredTheme())

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = html.classList.contains("dark") ? "light" : "dark"
      setTheme(next)
    })
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light")
    }
  })
})()

// --- Active link ---
var sections = document.querySelectorAll("section[id]")
var navLinks = document.querySelectorAll("nav a")

window.addEventListener("scroll", function () {
  var current = ""
  sections.forEach(function (section) {
    var sectionTop = section.offsetTop
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })
  navLinks.forEach(function (link) {
    link.classList.remove("text-primary")
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("text-primary")
    }
  })
})

// --- Dynamic year ---
document.getElementById("current-year").textContent = new Date().getFullYear()

// --- i18n ---
function getPreferredLang() {
  return localStorage.getItem("lang") || "es"
}

function applyLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n")
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === "IMG") {
        el.setAttribute("alt", translations[lang][key])
      } else {
        el.innerHTML = translations[lang][key]
      }
    }
  })
  document.getElementById("lang-es").classList.toggle("lang-btn--active", lang === "es")
  document.getElementById("lang-en").classList.toggle("lang-btn--active", lang === "en")
  document.documentElement.setAttribute("lang", lang)
  localStorage.setItem("lang", lang)
}

applyLang(getPreferredLang())

document.getElementById("lang-es").addEventListener("click", function () { applyLang("es") })
document.getElementById("lang-en").addEventListener("click", function () { applyLang("en") })
