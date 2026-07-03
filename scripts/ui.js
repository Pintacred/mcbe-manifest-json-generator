const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

const darkmode = document.getElementById("darkmode");

if (prefersDarkMode && prefersDarkMode.matches) {
  darkmode.checked = true
} else {
  darkmode.checked = false
}

function UItheme() {
  document.body.style.backgroundColor = "var(--main-body-color)";
  if (darkmode.checked) {
    document.body.classList.add('darkmode');
  } else {
    document.body.classList.remove('darkmode');
  }
}

UItheme()
darkmode.addEventListener('click', UItheme)

// only apply the transition effects 100ms after (re)loading the page to prevent flashing
setTimeout(function () {
  const elements = document.querySelectorAll("body, div, input, button, textarea, details");
  elements.forEach(el => {
    el.style.transition = "background-color 0.2s ease, color 0.2s ease";
  });
}, 100)
