import heroHeadingAnimation from "./heroHeadingAnimation";
import { typeTextOn } from "./typeTextOn";
import { TYPING_LINK_SELECTOR } from "./selectors";
import {
  onlyPlayWhenVisible,
  pauseAnimations,
  resumeAnimations,
} from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  // all pages have a hero heading animation.
  // the hero's intersectionObserver setup is contained within the function.
  heroHeadingAnimation();

  const typingLink = document.querySelector(TYPING_LINK_SELECTOR);
  if (typingLink) {
    typeTextOn();
    onlyPlayWhenVisible(TYPING_LINK_SELECTOR);
  }
});
