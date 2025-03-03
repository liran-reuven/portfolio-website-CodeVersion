// Dark/Light Mode On Click
function darkLightFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
// Icon Toggle On Click
document
  .getElementById("themeToggle")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    const icon = document.getElementById("themeIcon");
    // Toggle classes between moon and sun
    if (icon.classList.contains("fa-moon")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
