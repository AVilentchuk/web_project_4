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
  console.log(message);
};
const disableSubmit = (form, flag) => {
  console.log(form);
  submitButton = form.querySelector(".button_type_submit");
  console.log(submitButton);
  console.log(flag);
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
  inputList = Array.from(form.querySelectorAll(".form__input"));
  const flag = inputList.some((item) => !item.validity.valid);
  disableSubmit(form, flag);
  console.log(event);
};

const setEventListeners = (form) => {
  const inputList = form.querySelectorAll(".form__input");
  inputList.forEach((input) => {
    input.addEventListener("input", checkInputValid);
  });
};

const resetValidation = (formList) => {
  formList.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(".form__input"));
    inputList.forEach((input) =>
      !input.validity.valid
        ? activateError(form, input, input.validationMessage)
        : deactivateError(form, input)
    );
    const flag = inputList.some((item) => !item.validity.valid);
    disableSubmit(form, flag);
  });
};

function enableValidation() {
  const formList = document.querySelectorAll(".form");
  console.log(formList);
  formList.forEach((form) => {
    form.addEventListener(
      "submit",
      (formPreventSubmit = (e) => e.preventDefault())
    );
    setEventListeners(form);
    resetValidation(formList);
  });
}

enableValidation();

// resetValidation();
