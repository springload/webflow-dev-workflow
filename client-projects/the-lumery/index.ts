import heroHeadingAnimation from "./heroHeadingAnimation";

document.addEventListener("DOMContentLoaded", () => {
  // all pages have a hero heading animation.
  // the hero's intersectionObserver setup is contained within the function.
  heroHeadingAnimation();
});
