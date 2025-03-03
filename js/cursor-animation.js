const cursor = document.querySelector(".gradient-cursor");
const container = document.querySelector(".sections-container");
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".top-bar a:not(.first):not(.logo)");
const prevButton = document.querySelector(".nav-arrow.prev");
const nextButton = document.querySelector(".nav-arrow.next");

let cursorX = 0;
let cursorY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});
function animate() {
  cursorX += (targetX - cursorX) * 0.1;
  cursorY += (targetY - cursorY) * 0.1;

  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;

  requestAnimationFrame(animate);
}
animate();
prevButton.addEventListener("click", () => {
  const currentScroll = container.scrollLeft;
  const targetScroll = currentScroll - window.innerWidth;
  container.scrollTo({
    left: targetScroll,
    behavior: "smooth",
  });
});
nextButton.addEventListener("click", () => {
  const currentScroll = container.scrollLeft;
  const targetScroll = currentScroll + window.innerWidth;
  container.scrollTo({
    left: targetScroll,
    behavior: "smooth",
  });
});

function updateArrowButtons() {
  const currentPosition = container.scrollLeft;
  const maxScroll = container.scrollWidth - container.clientWidth;

  prevButton.style.opacity = currentPosition <= 0 ? "0" : "1";
  prevButton.style.pointerEvents = currentPosition <= 0 ? "none" : "auto";

  nextButton.style.opacity = currentPosition >= maxScroll ? "0" : "1";
  nextButton.style.pointerEvents =
    currentPosition >= maxScroll ? "none" : "auto";
}

function scrollToSection(direction) {
  const currentIndex = [...sections].findIndex(
    (section) => section.offsetLeft >= container.scrollLeft
  );

  let newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
  newIndex = Math.max(0, Math.min(newIndex, sections.length - 1));

  sections[newIndex].scrollIntoView({ behavior: "smooth", inline: "start" });

  setTimeout(updateArrowButtons, 500);
}

prevButton.addEventListener("click", () => scrollToSection("prev"));
nextButton.addEventListener("click", () => scrollToSection("next"));

container.addEventListener("scroll", updateArrowButtons);
updateArrowButtons();
