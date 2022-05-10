// Form one elements
const formOne = document.getElementById("form-one");
const buttonOne = document.getElementById("button-one");
const stepOne = document.getElementById("step-one");
// Form two elements
const formTwo = document.getElementById("form-two");
const buttonTwo = document.getElementById("button-two");
const stepTwo = document.getElementById("step-two");
// Form three elements
const buttonThree = document.getElementById("button-three");
const stepThree = document.getElementById("step-three");
// All required inputs
const inputs = document.querySelectorAll("[required]");
// Global vars
const hiddenInputs = document.getElementById("hidden");
const showLink = document.getElementById("showlink");
const hideLink = document.getElementById("hidelink");

inputs.forEach((item) => {
  item.addEventListener("keyup", validateInput);
});

function alertFunction(form) {
  let alert = form.querySelector("div.alert-required");
  let formCheck = form.checkValidity();
  if (formCheck === false) {
    alert.style.display = "block";
  } else if (formCheck === true) {
    alert.style.display = "none";
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
  }, 8000);
}

function validateForm(form) {
  let alert = form.querySelector("div.alert-required");
  let formCheck = form.checkValidity();
  if (formCheck === false) {
    alert.style.display = "block";
    inputs.forEach((el) => {
      let oneVal = el.checkValidity();
      if (oneVal === false) {
        el.classList.add("highlight");
      }
    });
  } else if (formCheck === true) {
    alert.style.display = "none";
    return true;
  }
}

buttonOne.onclick = (e) => {
  e.preventDefault();
  if (validateForm(formOne)) {
    let formInputs = formOne.querySelectorAll(
      "input:not([type=submit]), select"
    );
    formInputs.forEach((item) => {
      localStorage.setItem(`wf-${item.id}`, item.value);
    });
    stepOne.classList.add("invisible");
    stepOne.style.display = "none";
    stepTwo.classList.remove("invisible");
    stepTwo.style.display = "block";
  }
};

buttonTwo.onclick = (e) => {
  e.preventDefault();
  if (validateForm(formTwo)) {
    let formInputs = formTwo.querySelectorAll(
      "input:not([type=submit]), select"
    );
    formInputs.forEach((item) => {
      localStorage.setItem(`wf-${item.id}`, item.value);
    });
    stepTwo.classList.add("invisible");
    stepTwo.style.display = "none";
    stepThree.classList.remove("invisible");
    stepThree.style.display = "block";
    const ls = { ...localStorage };
    const keys = Object.keys(ls)
      .filter((key) => key.startsWith("wf-"))
      .map((key) => key.replace("wf-", ""));
    keys.forEach((key) => {
      const value = localStorage.getItem("wf-" + key);
      let newInput = document.createElement("input");
      newInput.name = key;
      newInput.dataset.name = key;
      newInput.value = value;
      newInput.id = key;
      newInput.classList.add("input", "w-input");
      document.getElementById("hidden").appendChild(newInput);
      console.log(key, value);
    });
  }
};

buttonThree.onclick = (e) => {
  localStorage.clear();
};

showLink.onclick = (e) => {
  hiddenInputs.style.display = "block";
};

hideLink.onclick = (e) => {
  hiddenInputs.style.display = "none";
};
