document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const submitBtn = document.getElementById("submit-btn");

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameValidation = /^[A-Za-z]+ [A-Za-z]+$/;

  function disableButton(text, icon) {
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.85";
    submitBtn.style.color = "red";
    submitBtn.innerHTML = `${text} <i class="fa-regular ${icon}"></i>`;
  }

  function enableButton(text, icon) {
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    submitBtn.style.color = "#3ad52c";
    submitBtn.innerHTML = `${text} <i class="fa-solid ${icon}"></i>`;
  }

  function validateForm() {
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let subject = subjectInput.value.trim();
    let message = messageInput.value.trim();

    if (!name || !email || !subject || !message) {
      disableButton("Fill all fields", "fa-pen-to-square");
      return false;
    }

    if (!nameValidation.test(name)) {
      disableButton("Invalid name format", "fa-user");
      return false;
    }

    if (!emailPattern.test(email)) {
      disableButton("Invalid email format", "fa-envelope-open");
      return false;
    }

    enableButton("Publish", "fa-paper-plane");
    return true;
  }

  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    input.addEventListener("input", validateForm);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) return;

    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim(),
    };

    fetch("https://hook.eu2.make.com/f0a6qtyt142lip7blh1ipt46ntkanuqj", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log("Raw response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.text();
      })
      .then((text) => {
        console.log("Raw response text:", text);

        if (text.includes("Accepted")) {
          form.reset();
          enableButton("Published", "fa-thumbs-up");
        } else {
          throw new Error("Unexpected response format");
        }
      })
      .catch((error) => {
        console.error("Error caught in catch block:", error);
        alert(`There was an error submitting the form\n${error}`);
        disableButton("Error. Try again.", "fa-solid fa-triangle-exclamation");
      });
  });
});
