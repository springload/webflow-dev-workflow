import { CHANGING_TAGLINES_SELECTOR, TAGLINE_SELECTOR } from "./selectors";
import { prefersReducedMotion } from "./utils";

export function swapOutTaglines() {
  // there are 6 tagline text props for the animated tagline component.
  const taglineEls: HTMLDivElement[] | null = Array.from(
    document.querySelectorAll(TAGLINE_SELECTOR),
  );
  // each time the header is viewed, there is a different random order of taglines
  const shuffledEls = taglineEls
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const container = document.querySelector(CHANGING_TAGLINES_SELECTOR);
  container?.replaceChildren(...shuffledEls);

  const isReducedMotionVersion = prefersReducedMotion();
  // The hero header animation needs to play out before taglines start animating
  const initialDelay = isReducedMotionVersion ? 500 : 1000;
  // time for element to move in/out of position
  const inDuration = 600;
  const outDuration = 600;
  // currEl starts moving out slightly before nextEl moves in
  const entranceDelay = isReducedMotionVersion ? 500 : 200;
  // time inbetween transitions when a tagline is static and visible
  const pause = isReducedMotionVersion ? 4000 : 3000;
  const fill = "both";

  const slideInKeyframes = [
    {
      offset: 0,
      transform: "translateY(100%)",
      easing: "cubic-bezier(.26,.39,.31,1)",
    },
    { offset: 0, opacity: 0, easing: "linear" },
    { offset: 1, transform: "translateY(0)" },
    { offset: 1, opacity: 1 },
  ];
  const slideOutkeyframes = [
    {
      offset: 0,
      transform: "translateY(0)",
      easing: "cubic-bezier(.69,.1,.74,.61)",
    },
    { offset: 0, opacity: 1, easing: "linear" },
    { offset: 0.75, opacity: 0 },
    { offset: 1, transform: "translateY(-100%)" },
    { offset: 1, opacity: 0 },
  ];
  const fadeInKeyframes = [
    { opacity: 0, transform: "translateY(0)" },
    { opacity: 1, transform: "translateY(0)" },
  ];
  const fadeOutKeyframes = [
    { opacity: 1, transform: "translateY(0)" },
    { opacity: 0, transform: "translateY(0)" },
  ];

  const outKeyframes = isReducedMotionVersion
    ? fadeOutKeyframes
    : slideOutkeyframes;
  const inKeyframes = isReducedMotionVersion
    ? fadeInKeyframes
    : slideInKeyframes;

  const swapOutEls = (array: HTMLDivElement[], index = 0) => {
    // loop back to the beginning at the end of the array
    const nextIndex = (index + 1) % array.length;
    const currEl = array[index];
    const nextEl = array[nextIndex];

    currEl.animate(outKeyframes, {
      delay: pause,
      duration: outDuration,
      fill,
    });

    const animateNextIn = nextEl.animate(inKeyframes, {
      delay: pause + entranceDelay,
      duration: inDuration,
      fill,
    });

    animateNextIn.finished.then(() => swapOutEls(array, nextIndex));
  };

  shuffledEls[0]
    .animate(inKeyframes, {
      duration: inDuration,
      delay: initialDelay,
      fill,
    })
    .finished.then(() => swapOutEls(shuffledEls));
}
