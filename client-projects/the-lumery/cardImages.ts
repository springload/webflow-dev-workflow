import {
  CARD_IMAGE_SELECTOR,
  CARD_LINK_SELECTOR,
  IMAGE_CONTAINER_SELECTOR,
} from "./selectors";
import { prefersReducedMotion } from "./utils";

export function setUpImageAnimation() {
  const cards = document.querySelectorAll(CARD_LINK_SELECTOR);

  cards.forEach((card) => {
    const imageContainer = card.querySelector(IMAGE_CONTAINER_SELECTOR);
    if (!(imageContainer instanceof HTMLDivElement)) {
      return;
    }
    imageContainer.style.opacity = "0";

    const image = card.querySelector(CARD_IMAGE_SELECTOR);
    if (image instanceof HTMLImageElement) {
      // each image will animate in whenever it enters the viewport
      addObserver(image, imageContainer);

      // JS hover effect, because once there are JS animations affecting a property,
      // CSS animations of that property will not work anymore (source: bitter experience)
      card.addEventListener("mouseover", () => zoomIn(image));
      card.addEventListener("mouseout", () => zoomOut(image));
    }
  });
}

function addObserver(image: HTMLImageElement, imageContainer: HTMLDivElement) {
  const cardEnter = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateImageIn(image, imageContainer);
        }
      });
    },
    {
      // delays the animation until the image is 20% into the viewport —
      // this prevents a nasty flicker effect, particularly on mobile devices.
      threshold: 0.2,
    },
  );
  const cardExit = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        resetImage(image, imageContainer);
      }
    });
  });
  cardEnter.observe(image);
  cardExit.observe(image);
}

function animateImageIn(
  image: HTMLImageElement,
  imageContainer: HTMLDivElement,
) {
  const options = {
    duration: 500,
    easing: "ease-out",
    fill: "both" as FillMode,
  };
  const isAnimating = image.classList.contains("animating");
  if (!prefersReducedMotion() && !isAnimating) {
    image.classList.add("animating");
    image
      .animate(
        [{ transform: "translateY(20%)" }, { transform: "translateY(0)" }],
        options,
      )
      .finished.then(() => image.classList.remove("animating"));
  }

  if (!isAnimating) {
    imageContainer.animate([{ opacity: 0 }, { opacity: 1 }], options);
  }
}

function resetImage(image: HTMLImageElement, imageContainer: HTMLDivElement) {
  if (!prefersReducedMotion()) {
    image.style.transform = "translateY(20%)";
  }

  imageContainer.style.opacity = "0";
}

function zoomIn(image: HTMLImageElement) {
  const keyframes = prefersReducedMotion()
    ? [{ opacity: 1 }, { opacity: 0.5 }]
    : [{ transform: "scale(1)" }, { transform: "scale(1.1)" }];

  image.animate(keyframes, {
    duration: 200,
    easing: "ease-out",
    fill: "both",
  });
}

function zoomOut(image: HTMLImageElement) {
  const keyframes = prefersReducedMotion()
    ? [{ opacity: 0.5 }, { opacity: 1 }]
    : [{ transform: "scale(1.1)" }, { transform: "scale(1)" }];

  image.animate(keyframes, {
    duration: 200,
    easing: "ease-in-out",
    fill: "both",
  });
}
