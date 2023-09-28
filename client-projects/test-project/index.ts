const current = Array.from(document.getElementsByClassName("w--current"));
current.forEach((navItem) => {
  navItem.setAttribute("aria-disabled", "true");
  navItem.classList.add("pointer-events-none");
});

console.log("Hello from vs code.");
