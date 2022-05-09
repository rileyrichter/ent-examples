const nextOne = document.getElementById("next1");
const emailForm = document.getElementById("email-form");
const alertOne = document.getElementById("alert1");
const inputs = document.querySelectorAll("[required]");

inputs.forEach((item) => {
  item.addEventListener("keyup", validateInput);
});

function alertFunction(form) {
  let formCheck = form.checkValidity();
  if (formCheck === false) {
    alertOne.style.display = "block";
  } else if (formCheck === true) {
    alertOne.style.display = "none";
  }
}

function validateInput() {
  let currentForm = this.form;
  let quickCheck = this.checkValidity();
  if (quickCheck === false) {
    this.classList.add("highlight");
  } else if (quickCheck === true) {
    this.classList.remove("highlight");
  }
  setTimeout(() => {
    alertFunction(currentForm);
  }, 3000);
}

function validateForm(form) {
  let formCheck = form.checkValidity();
  if (formCheck === false) {
    alertOne.style.display = "block";
    inputs.forEach((el) => {
      let oneVal = el.checkValidity();
      if (oneVal === false) {
        el.classList.add("highlight");
      }
    });
  } else if (formCheck === true) {
    alertOne.style.display = "none";
    console.log("Good to go, all required fields validated");
    return true;
  }
}

nextOne.onclick = (e) => {
  e.preventDefault();
  validateForm(emailForm);
};
