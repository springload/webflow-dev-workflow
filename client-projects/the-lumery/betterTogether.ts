import {
  BETTER_TOGETHER_CONTAINER_SELECTOR,
  BETTER_TOGETHER_LINE_SELECTOR,
} from "./selectors";

export function letterboxScroll() {
  const container = document.querySelector(BETTER_TOGETHER_CONTAINER_SELECTOR);
  if (!(container instanceof HTMLElement)) {
    throw new Error(
      `'Better Together' section not found: ${BETTER_TOGETHER_CONTAINER_SELECTOR}`,
    );
  }
  const lines = Array.from(
    document.querySelectorAll(BETTER_TOGETHER_LINE_SELECTOR),
  );
  if (!lines.length) {
    throw new Error(`No line elements found: ${BETTER_TOGETHER_LINE_SELECTOR}`);
  }

  const duration = 10000;
  const maxLineHeight = Math.max(...lines.map((line) => line.clientHeight));
  const totalDistance = container.clientHeight + maxLineHeight;

  const keyframes = [
    { transform: `translateY(${totalDistance}px)` },
    { transform: `translateY(${-totalDistance}px)` },
  ];

  lines.forEach((line, index) => {
    line.animate(keyframes, {
      duration: duration,
      delay: (duration / lines.length) * index,
      iterations: Infinity,
      fill: "both",
    });
  });
}
