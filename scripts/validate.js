var submitButton;
//<<START>> Validation Functions <<START>>
const deactivateError = (form, input) => {
  const errorField = input.nextElementSibling;
  // input.classList.remove("form_input_type_error");
  errorField.classList.remove("form__input-error_active");
  errorField.textContent = "";
};
const activateError = (form, input, message) => {
  const errorField = input.nextElementSibling;
  errorField.classList.add("form__input-error_active");
  errorField.textContent = message;
};
const disableSubmit = (form, flag) => {
  submitButton = form.querySelector(".button_type_submit");
  switch (flag) {
    case true:
      submitButton.classList.add("button_disabled");
      submitButton.setAttribute("disabled", true);
      break;
    case false:
      submitButton.classList.remove("button_disabled");
      submitButton.removeAttribute("disabled");
      break;
    default:
      break;
  }
};

const checkInputValid = () => {
  const input = event.target;
  const form = input.closest("form");
  !input.validity.valid
    ? activateError(form, input, input.validationMessage)
    : deactivateError(form, input);
  const inputList = Array.from(form.querySelectorAll(".form__input"));
  const flag = inputList.some((item) => !item.validity.valid);
  disableSubmit(form, flag);

};

const setEventListeners = (form) => {
  const inputList = form.querySelectorAll(".form__input");
  inputList.forEach((input) => {
    input.addEventListener("input", checkInputValid);
  });
};

const resetValidation = (form) => {
    const inputList = Array.from(form.querySelectorAll(".form__input"))
    inputList.forEach((input) =>
      !input.validity.valid
        ? activateError(form, input, input.validationMessage)
        : deactivateError(form, input)
    );
    const flag = inputList.some((item) => !item.validity.valid);
    console.log(flag);
    disableSubmit(form, flag);
}
const formPreventSubmit = (e) => e.preventDefault();

function enableValidation() {
  const formList = document.querySelectorAll(".form");
  formList.forEach((form) => {
    form.addEventListener(
      "submit",formPreventSubmit);
    setEventListeners(form);
    resetValidation(form);
  });
}

export {resetValidation, disableSubmit, formPreventSubmit , enableValidation};
// resetValidation();

