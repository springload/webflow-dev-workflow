import { TICKER_TAPE_SELECTOR, TICKER_TAPE_TEXT_SELECTOR } from "./selectors";
import {
  onlyPlayWhenVisible,
  pauseAnimations,
  resumeAnimations,
} from "./utils";

export function setUpTickerTapeLink() {
  const tickerTapeLink = document.querySelector(TICKER_TAPE_SELECTOR);
  if (!(tickerTapeLink instanceof HTMLAnchorElement)) {
    throw new Error(
      `ticker tape link not found, or not an <a> element: ${tickerTapeLink}`,
    );
  }

  onlyPlayWhenVisible(TICKER_TAPE_SELECTOR);

  const texts: NodeListOf<HTMLDivElement> = tickerTapeLink.querySelectorAll(
    TICKER_TAPE_TEXT_SELECTOR,
  );
  if (texts.length === 0) {
    throw new Error(`Ticker tape texts not found ${TICKER_TAPE_TEXT_SELECTOR}`);
  }

  texts.forEach((text) => {
    // As I'm using JS to stop and start the animations, all other interactive
    // style changes on this element are also done in JS, rather than CSS
    text.style.textDecorationLine = "underline";
    text.style.textDecorationThickness = "3px";
    text.style.textDecorationColor = "transparent";
    text.style.textUnderlineOffset = "0.1em";
  });

  const setUnderlineColor = (color: "#fff" | "transparent") => {
    texts.forEach((text) => {
      text.style.textDecorationColor = color;
    });
  };

  //  on hover, the ticker tape should pause and the text should underline
  tickerTapeLink?.addEventListener("mouseover", () => {
    setUnderlineColor("#fff");
    pauseAnimations(TICKER_TAPE_SELECTOR);
  });

  tickerTapeLink?.addEventListener("mouseout", () => {
    setUnderlineColor("transparent");
    resumeAnimations(TICKER_TAPE_SELECTOR);
  });
}
