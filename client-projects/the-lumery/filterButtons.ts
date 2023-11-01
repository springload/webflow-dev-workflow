import {
  FILTER_BUTTON_LIST_SELECTOR,
  FILTER_RESET_BUTTON_SELECTOR,
} from "./selectors";

export function setUpFilterButtons() {
  const resetButton: HTMLElement | null = document.querySelector(
    FILTER_RESET_BUTTON_SELECTOR,
  );
  if (!resetButton) {
    throw new Error(
      `Reset button element not found: ${FILTER_RESET_BUTTON_SELECTOR}`,
    );
  }
  const filterButtonList: HTMLElement | null = document.querySelector(
    FILTER_BUTTON_LIST_SELECTOR,
  );
  if (!filterButtonList) {
    throw new Error(
      `Filter button list element not found: ${FILTER_BUTTON_LIST_SELECTOR}`,
    );
  }

  filterButtonList.insertBefore(
    resetButton,
    filterButtonList.firstElementChild,
  );

  resetButton.style.opacity = "1";

  filterButtonList.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 400,
    delay: 900, // allow fonts to load and the header animation to finish
    fill: "both",
  });
}
