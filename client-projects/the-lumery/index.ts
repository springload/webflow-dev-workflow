import heroHeadingAnimation from "./heroHeadingAnimation";
import { typeTextOn } from "./typeTextOn";
import {
  TYPING_LINK_SELECTOR,
  TICKER_TAPE_SELECTOR,
  YT_DEFER_SELECTOR,
  WHO_WE_WORK_WITH_SECTION_SELECTOR,
  CHANGING_TAGLINES_SELECTOR,
  FILTER_BUTTON_LIST_SELECTOR,
} from "./selectors";
import {
  onlyPlayWhenVisible,
  pauseAnimations,
  resumeAnimations,
  prefersReducedMotion
} from "./utils";
import { ytdefer_setup } from "./ytdefer";
import { createClientFilterButtons } from "./whoWeWorkWithFilter";
import { setUpDropdowns } from "./navDropdown";
import { swapOutTaglines } from "./swapOutTaglines";
import { setUpFilterButtons } from "./filterButtons";

document.addEventListener("DOMContentLoaded", () => {
  if (!prefersReducedMotion()) {
    // nav dropdowns have a staggered animation effect on their children
    setUpDropdowns();

    // all pages have a hero heading animation. On the 'Today' page, there's a
    // 'changing taglines' animation that follows it.
    heroHeadingAnimation();
  } else {
    // there's no reduced-motion version of the hero heading animation, but
    // the reduced-motion version of 'swapOutTaglines' can still play
    if (document.querySelector(CHANGING_TAGLINES_SELECTOR)) {
      swapOutTaglines;
      onlyPlayWhenVisible(CHANGING_TAGLINES_SELECTOR);
    }
  }

  // The article landing pages (Projects, Tomorrow Insights) can be filtered.
  // The layout of the filter button section is severely limited by Webflow's rules.
  // This is a hack to put the 'reset' button in the right place to match the design
  if (document.querySelector(FILTER_BUTTON_LIST_SELECTOR)) {
    setUpFilterButtons();
  }

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
