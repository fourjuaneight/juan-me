// Theme Switcher
const button = document.querySelector('#theme-switcher');
const body = document.querySelector("body");
button.onclick = () => {
  body.classList.toggle('dark');
  body.classList.toggle('light');
}
// SW
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js", { scope: "/" });
  navigator.serviceWorker.ready.then(registration => {
    console.log("Service Worker Ready");
  });
  window.addEventListener("load", () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ command: "trimCaches" });
    }
  });
}
// Stuff
const main = document.querySelector("main");
const stuff = document.querySelector("section.stuff");
window.addEventListener("resize", () => {
  if (window.matchMedia("(max-width: 300px)").matches) {
    main.setAttribute("aria-hidden", "true");
    stuff.setAttribute("aria-hidden", "false");
  } else {
    main.setAttribute("aria-hidden", "false");
    stuff.setAttribute("aria-hidden", "true");
  }
});
// Console Crap
function isIE() {
  ua = navigator.userAgent;
  const is_ie = ua.includes("MSIE ") || ua.includes("Trident/");
  return is_ie;
}
if (isIE()){
  console.log('Fuck yeah it works on IE 11.');
}
console.log('I love to sleep because in my dreams I can finally get revenge on the stingray that strangled Steve Irwin.');