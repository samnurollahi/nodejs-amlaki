const section = document.querySelector("section");
const logo = document.querySelector(".logo");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 62) {
    section.classList.add("top-0");
    logo.classList.remove("fs-2")
    logo.classList.add("fs-3")
  } else if (window.scrollY == 0) {
    section.classList.remove("top-0");
    logo.classList.remove("fs-3")
    logo.classList.add("fs-2")
  }
});
