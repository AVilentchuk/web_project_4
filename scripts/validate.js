//<<START>> Error messages and button controls <<START>>
const deactivateError = (input) => {
  const errorField = input.nextElementSibling;
  errorField.classList.remove("form__input-error_active");
  errorField.textContent = "";
};

const activateError = (input, message) => {
  const errorField = input.nextElementSibling;
  errorField.classList.add("form__input-error_active");
  errorField.textContent = message;
};

//Controls the status of the submit button, gets form inputs status from checkIfInputValid
const controlSubmit = (form, formStatus) => {
  const submitButton = form.querySelector(".button_type_submit");
  if (formStatus) {
    submitButton.classList.add("button_disabled");
    submitButton.setAttribute("disabled", true);
  } else {
    submitButton.classList.remove("button_disabled");
    submitButton.removeAttribute("disabled");
  }
};

const checkIfInputValid = () => {
  const input = event.target;
  const form = input.closest(".form");
  const inputList = Array.from(form.querySelectorAll(".form__input"));
  !input.validity.valid
    ? activateError(input, input.validationMessage)
    : deactivateError(input);

  const formStatus = inputList.some((item) => !item.validity.valid);
  return controlSubmit(form, formStatus);
};
//Function has a listener for focus, when Focus shows initial validation error and removes the listener.
const runCheckOnFocus = () => {
  checkIfInputValid(event);
  event.target.removeEventListener("focus", runCheckOnFocus);
};
//<<END>> Error messages control <<END>>
//<<START>> Listeners control <<START>>
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".form__input"));
  inputList.forEach((input) => {
    input.addEventListener("focus", runCheckOnFocus);
    input.addEventListener("input", checkIfInputValid);
  });
};

const unsetEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".form__input"));
  inputList.forEach((input) => {
    input.removeEventListener("focus", runCheckOnFocus);
    input.removeEventListener("input", checkIfInputValid);
  });
};
//<<END>> Listeners control <<END>>
//<<START>> Exported functions (main) <<START>>
const preventSubmitForm = () => {
  event.preventDefault();
};

const resetValidation = (form) => {
  unsetEventListeners(form);
  const inputList = form.querySelectorAll(".form__input");
  inputList.forEach((input) => deactivateError(input));
  setEventListeners(form);
  const submitButton = form.querySelector(".button_type_submit");
  !submitButton.classList.contains("button_disabled")
    ? submitButton.classList.add("button_disabled")
    : "";
};

function enableValidation() {
  const formList = document.querySelectorAll(".form");
  formList.forEach((form) => {
    form.addEventListener("submit", preventSubmitForm);
    setEventListeners(form);
  });
}
//<<END>> Exported functions (main) <<END>>

//Exports
export { resetValidation, enableValidation };
