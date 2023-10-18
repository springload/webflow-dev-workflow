import heroHeadingAnimation from "./heroHeadingAnimation";
import { typeTextOn } from "./typeTextOn";
import { TYPING_LINK_SELECTOR, TICKER_TAPE_SELECTOR } from "./selectors";
import {
  onlyPlayWhenVisible,
  pauseAnimations,
  resumeAnimations,
} from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  // all pages have a hero heading animation.
  // the hero's intersectionObserver setup is contained within the function.
  heroHeadingAnimation();

  // typewriter effect (found on 'yesterday' and 'today' pages)
  const typingLink = document.querySelector(TYPING_LINK_SELECTOR);
  if (typingLink) {
    typeTextOn();
    onlyPlayWhenVisible(TYPING_LINK_SELECTOR);
  }

  // ticker tape effect (CSS animation, found on 'yesterday' and 'tomorrow' pages)
  const tickerTapeLink = document.querySelector(TICKER_TAPE_SELECTOR);
  if (tickerTapeLink) {
    onlyPlayWhenVisible(TICKER_TAPE_SELECTOR);

    // the ticker tape should pause on hover
    tickerTapeLink?.addEventListener("mouseover", () =>
      pauseAnimations(TICKER_TAPE_SELECTOR),
    );
    tickerTapeLink?.addEventListener("mouseout", () =>
      resumeAnimations(TICKER_TAPE_SELECTOR),
    );
  }
});
