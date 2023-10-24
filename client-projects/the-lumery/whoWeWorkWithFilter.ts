import { CLIENT_FILTER_BUTTON_SELECTOR } from "./selectors";
import { prefersReducedMotion } from "./utils";

const CLIENT_CATEGORIES = [
  "customers",
  "technology-vendors",
  "industry-associations",
] as const;

type ClientCategory = (typeof CLIENT_CATEGORIES)[number];

// Webflow doesn't let us create <button> elements, so this function grabs
// the <a> elements which should be <button>s and converts them.
export const createClientFilterButtons = () => {
  const fakeButtons: HTMLAnchorElement[] | undefined = Array.from(
    document.querySelectorAll(CLIENT_FILTER_BUTTON_SELECTOR),
  );

  fakeButtons?.forEach((fakeButton) => {
    const realButton = document.createElement("button");
    realButton.className = fakeButton.className;
    if (fakeButton.className.includes("button--filter-active")) {
      realButton.setAttribute("disabled", "");
    }
    realButton.innerHTML = fakeButton.innerHTML;
    const buttonCategory = fakeButton.dataset.category as
      | ClientCategory
      | undefined;
    if (!buttonCategory) {
      throw new Error(
        `Missing 'category' data attribute on client filter button: ${fakeButton.innerHTML}`,
      );
    }
    realButton.setAttribute("data-category", buttonCategory);

    realButton.addEventListener("click", () =>
      handleCategoryChange(buttonCategory),
    );

    fakeButton.replaceWith(realButton);
  });
};

export function handleCategoryChange(selectedCategory: ClientCategory) {
  const clientFilterButtons: HTMLButtonElement[] = Array.from(
    document.querySelectorAll(CLIENT_FILTER_BUTTON_SELECTOR),
  );

  // toggle buttons' disabled status and styles
  clientFilterButtons.forEach((button: HTMLButtonElement) => {
    const buttonCategory = button.dataset.category as
      | ClientCategory
      | undefined;

    if (buttonCategory === selectedCategory) {
      button.setAttribute("disabled", "");
      button.classList.remove("button--filter-inactive");
      button.classList.add("button--filter-active");
    } else {
      button.removeAttribute("disabled");
      button.classList.remove("button--filter-active");
      button.classList.add("button--filter-inactive");
    }
  });

  // the existing block of logos will slide up and fade out, and be replaced with
  // the new block sliding in from below
  const slideOutKeyframes = [
    { opacity: 1, transform: "translateY(0)" },
    { opacity: 0, transform: "translateY(-20%)" },
  ];
  const slideInKeyframes = [
    { opacity: 0, transform: "translateY(20%)" },
    { opacity: 1, transform: "translateY(0)" },
  ];
  // if reduced motion is set, just fade them in and out
  const fadeInKeyframes = [{ opacity: 0 }, { opacity: 1 }];
  const fadeOutKeyframes = [{ opacity: 1 }, { opacity: 0 }];

  CLIENT_CATEGORIES.forEach((category) => {
    if (selectedCategory === category) {
      const logosToShow: HTMLElement | null = document.querySelector(
        `.${category}`,
      );
      if (!logosToShow) {
        throw new Error(`logo collection not found: ${category}`);
      }

      logosToShow.style.display = "block";
      logosToShow.animate(
        prefersReducedMotion() ? fadeInKeyframes : slideInKeyframes,
        {
          delay: 200,
          duration: 300,
          easing: "ease-out",
          fill: "both",
        },
      );
    } else {
      const logosToHide: HTMLElement | null = document.querySelector(
        `.${category}`,
      );
      if (!logosToHide) {
        throw new Error(`logo collection not found: ${category}`);
      }

      const slideOut = logosToHide.animate(
        prefersReducedMotion() ? fadeOutKeyframes : slideOutKeyframes,
        {
          duration: 200,
          easing: "ease-in",
          fill: "both",
        },
      );

      slideOut.finished.then(() => (logosToHide.style.display = "none"));
    }
  });
}
