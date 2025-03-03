navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: "smooth", inline: "start" });
  });
});

container.addEventListener("scroll", () => {
  const currentPosition = container.scrollLeft;

  sections.forEach((section, index) => {
    const sectionLeft = section.offsetLeft;
    const sectionWidth = section.offsetWidth;

    if (currentPosition >= sectionLeft - sectionWidth / 3) {
      navLinks.forEach((link) => link.classList.remove("active"));
      navLinks[index].classList.add("active");
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevButton.click();
  } else if (e.key === "ArrowRight") {
    nextButton.click();
  }
});
