import { CHANGING_TAGLINES_SELECTOR, TAGLINE_SELECTOR } from "./selectors";

export function swapOutTaglines() {
  // the ~7 tagline texts are added in the CMS as a Webflow Collection
  const taglineEls: HTMLDivElement[] = Array.from(
    document.querySelectorAll(TAGLINE_SELECTOR),
  );
  // each time the header is viewed, there is a different random order of taglines
  const shuffledEls = taglineEls
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const container = document.querySelector(CHANGING_TAGLINES_SELECTOR);
  container?.replaceChildren(...shuffledEls);

  // The hero header animation needs to play out before taglines start animating
  const initialDelay = 1000;
  // time for element to move in/out of position
  const inDuration = 600;
  const outDuration = 600;
  // currEl starts moving out slightly before nextEl moves in
  const entranceDelay = 200;
  // time inbetween transitions when a tagline is static and visible
  const pause = 3000;
  const fill = "both";

  const keyframesIn = [
    {
      offset: 0,
      transform: "translateY(100%)",
      filter: "blur(2px)",
      easing: "cubic-bezier(.26,.39,.31,1)",
    },
    { offset: 0, opacity: 0, easing: "linear" },
    { offset: 1, transform: "translateY(0)", filter: "blur(0)" },
    { offset: 1, opacity: 1 },
  ];
  const keyframesOut = [
    {
      offset: 0,
      transform: "translateY(0)",
      filter: "blur(0)",
      easing: "cubic-bezier(.69,.1,.74,.61)",
    },
    { offset: 0, opacity: 1, easing: "linear" },
    { offset: 0.75, opacity: 0 },
    { offset: 1, transform: "translateY(-100%)", filter: "blur(2px)" },
    { offset: 1, opacity: 0 },
  ];

  const swapOutEls = (index: number, array: HTMLDivElement[]) => {
    // loop back to the beginning at the end of the array
    const nextIndex = (index + 1) % array.length;
    const currEl = array[index];
    const nextEl = array[nextIndex];

    currEl.animate(keyframesOut, {
      delay: pause,
      duration: outDuration,
      fill,
    });

    const animateNextIn = nextEl.animate(keyframesIn, {
      delay: pause + entranceDelay,
      duration: inDuration,
      fill,
    });

    animateNextIn.finished.then(() => swapOutEls(nextIndex, array));
  };

  shuffledEls[0]
    .animate(keyframesIn, { duration: inDuration, delay: initialDelay, fill })
    .finished.then(() => swapOutEls(0, shuffledEls));
}
