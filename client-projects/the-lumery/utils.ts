export function pauseAnimations(selector: string) {
  const container = document.querySelector(selector);
  container
    ?.getAnimations({ subtree: true })
    .filter((animation) => animation.playState === "running")
    .map((animation) => animation.pause());
}

export function resumeAnimations(selector: string) {
  const container = document.querySelector(selector);
  container
    ?.getAnimations({ subtree: true })
    .filter((animation) => animation.playState === "paused")
    .map((animation) => animation.play());
}

export function onlyPlayWhenVisible(selector: string) {
  const watchEl = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        resumeAnimations(selector);
      } else {
        pauseAnimations(selector);
      }
    });
  };
  const observer = new IntersectionObserver(watchEl);
  const animatedEl = document.querySelector(selector);

  if (animatedEl) {
    observer.observe(animatedEl);
  }
}

export function prefersReducedMotion() {
  const prefersReducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  return !prefersReducedMotionQuery || prefersReducedMotionQuery.matches;
}
