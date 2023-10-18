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
