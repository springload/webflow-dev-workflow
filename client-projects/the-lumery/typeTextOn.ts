import Splitting from "splitting";
import { TYPING_LINK_SELECTOR, TYPING_TEXT_SELECTOR } from "./selectors";

export function typeTextOn() {
  const typingText: HTMLElement | null =
    document.querySelector(TYPING_TEXT_SELECTOR);
  if (!typingText) {
    throw new Error("Text to animate not found");
  }
  // the color of the text needs to be different on different backgrounds
  const textColorHsl =
    typingText?.dataset?.color === "white" ? "0, 0%, 100%" : "0, 0%, 11.8%";
  const transparentColor = `hsla(${textColorHsl}, 0)`;
  const visibleColor = `hsla(${textColorHsl}, 1)`;
  const cursorWidth = "2px";
  // these are css box-shadow values which create a 'cursor' next to the character
  const transparentRightCursor = `${cursorWidth} 0 0 ${transparentColor}`;
  const transparentLeftCursor = "-" + transparentRightCursor;
  const visibleRightCursor = `${cursorWidth} 0 0 ${visibleColor}`;
  const visibleLeftCursor = "-" + visibleRightCursor;

  // animation keyframes
  const blinkLeftCursor = [
    {
      offset: 0.4,
      boxShadow: transparentLeftCursor,
    },
    {
      offset: 0.5,
      boxShadow: visibleLeftCursor,
    },
    {
      offset: 0.9,
      boxShadow: visibleLeftCursor,
    },
  ];
  const blinkRightCursor = [
    {
      offset: 0.2,
      boxShadow: transparentRightCursor,
    },
    {
      offset: 0.3,
      boxShadow: visibleRightCursor,
    },
    {
      offset: 0.7,
      boxShadow: visibleRightCursor,
    },
    {
      offset: 0.8,
      boxShadow: transparentRightCursor,
    },
  ];
  const typeCharacterOn = [
    {
      boxShadow: transparentRightCursor,
      color: visibleColor,
      offset: 0.2,
    },
    {
      boxShadow: visibleRightCursor,
      offset: 0.3,
    },
    {
      boxShadow: visibleRightCursor,
      offset: 0.99,
    },
    {
      boxShadow: transparentRightCursor,
      color: visibleColor,
    },
  ];
  const initialBlinkDuration = 1200;
  const infiniteBlinkDuration = 2000;

  // split the text into .char spans
  Splitting({
    target: typingText,
    by: "chars",
    key: null,
  });
  const elements = typingText?.querySelectorAll(
    `${TYPING_LINK_SELECTOR} .char, ${TYPING_LINK_SELECTOR} .whitespace`,
  );

  // blink the cursor twice before typing begins
  elements[0].animate(blinkLeftCursor, initialBlinkDuration);

  // animate each character in, and 'shift the cursor' to its right
  // (actually faked with a box shadow on each element)
  let delay = initialBlinkDuration;

  elements?.forEach((el) => {
    const duration = getRandomDuration();

    el.animate(typeCharacterOn, {
      delay,
      duration,
      fill: "forwards",
    });

    delay += duration;
  });

  const finalCharacter = elements[elements.length - 1];
  // continue blinking the cursor until the heat death of the universe
  Promise.all(
    typingText
      .getAnimations({ subtree: true })
      .map((animation) => animation.finished),
  ).then(() => {
    finalCharacter.animate(blinkRightCursor, {
      duration: infiniteBlinkDuration,
      iterations: Infinity,
    });
  });

  function getRandomDuration() {
    // Randomize duration between 60 and 200ms for a more natural typing effect
    return Math.random() * (200 - 60) + 60;
  }
}
