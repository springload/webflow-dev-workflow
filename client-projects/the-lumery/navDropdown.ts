import { DROPDOWN_TOGGLE_SELECTOR, DROPDOWN_LINK_SELECTOR } from "./selectors";

export function setUpDropdownAnimations() {
  const navDropdowns = document.querySelectorAll(DROPDOWN_TOGGLE_SELECTOR);
  if (!navDropdowns) {
    return;
  }
  navDropdowns.forEach((dropdown) => {
    const watchExpanded = (mutations) => {
      mutations.map((mutation) => {
        if (dropdown.getAttribute("aria-expanded") === "true") {
          revealDropdownLinks(mutation.target.parentElement);
        }
      });
    };
    const observer = new MutationObserver(watchExpanded);
    observer.observe(dropdown, { attributes: true });
  });
}

function revealDropdownLinks(parent: HTMLElement) {
  const dropdownLinks: HTMLAnchorElement[] | undefined = Array.from(
    parent.querySelectorAll(DROPDOWN_LINK_SELECTOR),
  );
  if (!dropdownLinks) {
    throw new Error(`no dropdown links found (${DROPDOWN_LINK_SELECTOR})`);
  }

  const duration = 300;
  let cumulativeDelay = 0;

  dropdownLinks?.forEach((link, index) => {
    // the delay between each item starts at 60ms but should get shorter each time —
    // otherwise the animation of a lengthy dropdown becomes tiresome.
    const stagger = Math.max(0, 60 - index * 4);

    link.animate(
      [
        { opacity: 0, transform: "rotateX(-90deg)" },
        { transform: "rotateX(-20deg)" },
        { opacity: 1, transform: "rotateX(0deg)" },
      ],
      {
        delay: cumulativeDelay,
        duration,
        easing: "ease-in-out",
        fill: "both",
      },
    );

    cumulativeDelay += stagger;
  });
}
