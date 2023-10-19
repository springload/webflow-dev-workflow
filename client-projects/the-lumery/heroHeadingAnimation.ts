import Splitting from "splitting";
import { swapOutTaglines } from "./swapOutTaglines";
import { pauseAnimations, resumeAnimations } from "./utils";
import {
  HERO_SECTION_SELECTOR,
  HEADING_WRAPPER_SELECTOR,
  TARGET_HEADING_SELECTOR,
  CHANGING_TAGLINES_SELECTOR,
} from "./selectors";

type SplitByLines = {
  el: HTMLHeadingElement;
  lines: HTMLSpanElement[][];
  words: HTMLSpanElement[];
}[];
type SplitByWords = {
  el: HTMLSpanElement;
  chars: HTMLSpanElement[];
  words: HTMLSpanElement[];
}[][];
type Cell = {
  spanEl: HTMLSpanElement;
  position: number;
  originalChar: string;
};
type Line = {
  position: number;
  cells: Cell[];
};

export default function heroHeadingAnimation() {
  // the h1 animates on, replacing each letter of the heading with random characters

  // whether the containing section element is in view will affect
  // whether the heading stays static or re-animates.
  const heroSection: HTMLElement | null = document.querySelector(
    HERO_SECTION_SELECTOR,
  );
  // the heading element itself is modifed and then replaced with a clone, so I'm using
  // its always-there wrapper div as the target to observe.
  const heading: HTMLDivElement | null = document.querySelector(
    HEADING_WRAPPER_SELECTOR,
  );
  if (!heroSection || !heading) {
    throw new Error("Cannot find heading or hero section for header animation");
  }

  // prevents a flash of the original heading. Opacity will be restored when animating
  const hideHeading = () => (heading.style.opacity = "0");
  hideHeading();

  // on the 'Today' page, the intro text in the hero will begin its animation
  // after the heading animation is complete.
  const changingTaglinesContainer = document.querySelector(
    CHANGING_TAGLINES_SELECTOR,
  );

  // state
  let isHeroHeadingAnimating = false;
  let hasHeroAnimatedOnce = false;
  let isOutsideHeroSection = true;

  const watchHeroSection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.target.className.includes(HERO_SECTION_SELECTOR)) {
        if (hasHeroAnimatedOnce && !isHeroHeadingAnimating) {
          // hide the heading in preparation for the next animation
          // (when the heading next appears on screen)
          hideHeading();
        }
        if (!entry.isIntersecting) {
          // if the heading was off-screen but we were still within the hero section,
          // we could scroll back up and see the static heading.
          // But once we completely leave the heading section, this boolean ensures
          // the animation resets and will fire again when we re-enter and view the
          // heading wrapper
          isOutsideHeroSection = true;

          if (changingTaglinesContainer && hasHeroAnimatedOnce) {
            pauseAnimations(CHANGING_TAGLINES_SELECTOR);
          }
        }
      }
    });
  };

  const watchHeading = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.target.className.includes(HEADING_WRAPPER_SELECTOR)) {
        if (entry.isIntersecting) {
          if (isOutsideHeroSection) {
            animateHeroHeading();
            isHeroHeadingAnimating = true;
            isOutsideHeroSection = false;

            if (changingTaglinesContainer) {
              hasHeroAnimatedOnce
                ? resumeAnimations(CHANGING_TAGLINES_SELECTOR)
                : swapOutTaglines();
            }
          }
        }
      }
    });
  };
  let sectionObserver = new IntersectionObserver(watchHeroSection, {
    threshold: 0.25,
  });
  let headingObserver = new IntersectionObserver(watchHeading, {
    threshold: 0.5,
  });

  sectionObserver.observe(heroSection);
  headingObserver.observe(heading);

  function animateHeroHeading() {
    // TODO: global variable for reduced motion that listens for changes
    const prefersReducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (!prefersReducedMotionQuery || prefersReducedMotionQuery.matches) {
      // If prefers reduced motion is set, don't animate the heading.
      return;
    }
    // characters to replace the text — the widest letters (m & w) are removed
    // so that the word length doesn't increase too much
    const letters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "x",
      "y",
      "z",
    ];

    const symbols = [
      "!",
      "@",
      "(",
      ")",
      "-",
      "+",
      "=",
      "[",
      "]",
      "{",
      "}",
      ";",
      ":",
      "<",
      ">",
      ",",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    // twice the prevalence of letters to non-letters, otherwise it looks weird
    const lettersAndSymbols = [...letters, ...letters, ...symbols];

    const { targetEl, cloneOfOriginalEl, lines, totalChars } = prepareElement(
      TARGET_HEADING_SELECTOR,
    );

    // this will determine when to switch each char back to its original letter
    const MAX_ITERATIONS = 20;

    const initialFadeIn = ({ spanEl }: Cell) =>
      spanEl.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 100,
        fill: "forwards",
      });

    const replaceWithRandomChar = ({ spanEl }: Cell) =>
      (spanEl.innerHTML =
        lettersAndSymbols[
          Math.floor(Math.random() * lettersAndSymbols.length)
        ]);

    // the animation moves through each line simultaneously as a wave — each
    // character will 'report' when it is finished by decrementing this value.
    let charsStillAnimating = totalChars;

    const loop = (cell: Cell, iteration = 0) => {
      if (iteration === MAX_ITERATIONS - 1) {
        // on final iteration, restore original character
        cell.spanEl.innerHTML = cell.originalChar;
        --charsStillAnimating;
      } else {
        replaceWithRandomChar(cell);
      }
      if (iteration === 0) {
        initialFadeIn(cell);
      }

      if (charsStillAnimating === 0) {
        // we're done! allow lines to wrap again
        targetEl.replaceWith(cloneOfOriginalEl);
        isHeroHeadingAnimating = false;
        hasHeroAnimatedOnce = true;
      }

      ++iteration;
      // if we haven't reached the last iteration, repeat
      if (iteration < MAX_ITERATIONS) {
        setTimeout(() => loop(cell, iteration), 40);
      }
    };

    lines.forEach((line) =>
      line.cells.forEach((cell) =>
        setTimeout(() => loop(cell), (cell.position + 1) * 30),
      ),
    );
  }

  function prepareElement(selector = TARGET_HEADING_SELECTOR) {
    const targetEl = document.querySelector(selector);
    if (!targetEl) {
      throw new Error(
        `Heading element to animate not found: ${TARGET_HEADING_SELECTOR}`,
      );
    }
    // making a copy in order to restore the original after the animation
    const cloneOfOriginalEl = targetEl.cloneNode(true);

    // split the heading into individual character spans and arrange by line
    const splitByLines = Splitting({
      target: targetEl,
      by: "lines",
    }) as unknown as SplitByLines;
    const splitByWords = splitByLines.map((line) =>
      Splitting({ target: line.words }),
    ) as unknown as SplitByWords;

    // the object we'll iterate over during animation
    const lines: Line[] = splitByLines[0].lines.map((line, index) => {
      const charsPerLine = splitByWords[0]
        .filter(({ el }) => line.includes(el))
        .map((word) => word.chars)
        .flat();
      const cells = charsPerLine.map((spanEl, index) => ({
        spanEl,
        position: index,
        originalChar: spanEl.innerHTML,
      }));
      return { position: index, cells };
    });
    // on page load, the heading wrapper was made transparent.
    // opacity will now be adjusted on the individual character spans instead.
    const wrapper: HTMLDivElement | null = document.querySelector(
      HEADING_WRAPPER_SELECTOR,
    );
    if (wrapper) {
      wrapper.style.opacity = "1";
    } else {
      throw new Error("Heading wrapper not found");
    }

    // we'll use this to check when the animation has completed
    const totalChars = lines.reduce((acc, curr) => acc + curr.cells.length, 0);

    // as we're not using a monospaced font, the variable widths of characters
    // can cause lines to wrap, creating a nasty flickering layout shift effect.
    // So this locks the lines in place for the duration of the animation.
    const preventLinesFromWrapping = () => {
      const wordSpans = Array.from(targetEl.children) as HTMLSpanElement[];
      // work out which words are on which line
      const groupedByLine = wordSpans.reduce(
        (acc: HTMLSpanElement[][], curr) => {
          const lineIndex = parseInt(
            getComputedStyle(curr).getPropertyValue("--line-index"),
          );
          if (curr.tagName === "BR") {
            // get rid of any <br> elements
            return acc;
          }
          if (curr.className === "whitespace") {
            // put any spaces on the current line
            acc[acc.length - 1].push(curr);
            return acc;
          }
          if (!acc[lineIndex]) {
            // we're at the start of a new line
            acc[lineIndex] = [];
          }
          acc[lineIndex].push(curr);
          return acc;
        },
        [],
      );

      // put each line into an element which will never wrap
      const enclosedInBlockSpans = groupedByLine.map((line) => {
        const container = document.createElement("span");
        container.setAttribute("class", "no-wrap");
        container.setAttribute("aria-hidden", "true");
        line.forEach((el) => container.appendChild(el));
        return container;
      });

      targetEl.replaceChildren(...enclosedInBlockSpans);
    };

    preventLinesFromWrapping();

    return { targetEl, cloneOfOriginalEl, lines, totalChars };
  }
}
