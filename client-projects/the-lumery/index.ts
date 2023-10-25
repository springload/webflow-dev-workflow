import heroHeadingAnimation from "./heroHeadingAnimation";
import { typeTextOn } from "./typeTextOn";
import {
  TYPING_LINK_SELECTOR,
  TICKER_TAPE_SELECTOR,
  YT_DEFER_SELECTOR,
  WHO_WE_WORK_WITH_SECTION_SELECTOR,
} from "./selectors";
import {
  onlyPlayWhenVisible,
  pauseAnimations,
  resumeAnimations,
} from "./utils";
import { ytdefer_setup } from "./ytdefer";
import { createClientFilterButtons } from "./whoWeWorkWithFilter";
import { setUpDropdowns } from "./navDropdown";

document.addEventListener("DOMContentLoaded", () => {
  // nav dropdowns have a staggered animation effect on their children
  setUpDropdowns();

  // all pages have a hero heading animation.
  // the hero's intersectionObserver setup is contained within the function.
  heroHeadingAnimation();

  // typewriter effect (found on 'yesterday' and 'today' pages)
  if (document.querySelector(TYPING_LINK_SELECTOR)) {
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

  // ytdefer is an alternative to loading the 2.5MB base.js from the standard YouTube embed
  // https://github.com/groupboard/ytdefer
  // it displays the video thumbnail and a YouTube icon, and only loads the video embed on click
  if (document.querySelector(YT_DEFER_SELECTOR)) {
    ytdefer_setup();
  }

  // 3 buttons are set up to filter/display different categories of client logos
  if (document.querySelector(WHO_WE_WORK_WITH_SECTION_SELECTOR)) {
    createClientFilterButtons();
  }
});
