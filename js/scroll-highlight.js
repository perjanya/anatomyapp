document.addEventListener("scroll", () => {
  document.querySelectorAll("section, article, div").forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
      sec.style.background = "rgba(224,242,254,0.8)";
    } else {
      sec.style.background = "rgba(240,248,255,0.65)";
    }
  });
});
