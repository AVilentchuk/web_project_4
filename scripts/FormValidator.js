//FormValidator Class - > Added
class FormValidator {
  constructor(formElement, settings) {
    this.settings = settings;
    this.formElement = formElement;
    return this.enableValidation();
  }
  //<<START>>public methods of form validation.<<START>>
  enableValidation() {
    return this._setEventListeners();
  }

  resetValidation() {
    this._unsetEventListeners();
    this.inputList = this.formElement.querySelectorAll(".form__input");
    this.inputList.forEach((input) => {
      this._deactivateError(input);
      if (input.classList.contains("form__input_status")) {
        input.classList.remove("form__input_status");
      }
    });
    this._setEventListeners(this.formElement);

    const submitButton = this.formElement.querySelector(
      `.${this.settings.submitSelector}`
    );
    !submitButton.classList.contains("button_disabled")
      ? submitButton.classList.add("button_disabled")
      : "";
    return this.formElement;
  };
  //<<END>>public methods of form validation.<<END>>
  //<<START>> Error messages and button controls <<START>>
  _deactivateError = (input) => {
    const errorField = input.nextElementSibling;
    errorField.classList.remove(this.settings.inputErrorActive);
    errorField.textContent = "";
  };
  _activateError = (input, message) => {
    const errorField = input.nextElementSibling;
    errorField.classList.add(this.settings.inputErrorActive);
    errorField.textContent = message;
  };
  //Controls the status of the submit button, gets form inputs status from checkIfInputValid
  _controlSubmit = (formStatus) => {
    const { submitSelector, disabledButton } = this.settings;
    const submitButton = this.formElement.querySelector(`.${submitSelector}`);

    if (formStatus) {
      submitButton.classList.add(disabledButton);
      submitButton.setAttribute("disabled", true);
    } else {
      submitButton.classList.remove(disabledButton);
      submitButton.removeAttribute("disabled");
    }
  };
  _checkIfInputValid = () => {
    const input = event.target;
    const inputList = Array.from(
      this.formElement.querySelectorAll(`.${this.settings.formInput}`)
    );
    input.classList.add(this.settings.inputStatus);
    !input.validity.valid
      ? this._activateError(input, input.validationMessage)
      : this._deactivateError(input);

    const formStatus = inputList.some((item) => !item.validity.valid);
    return this._controlSubmit(formStatus);
  };
  //<<END>> Error messages control <<END>>
  //<<START>> Listeners control <<START>>
  _setEventListeners = () => {
    this.formElement.addEventListener("submit", this._preventSubmitForm);
    this.inputList = Array.from(
      this.formElement.querySelectorAll(`.${this.settings.formInput}`)
    );
    this.inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkIfInputValid();
      });
    });
  };

  _unsetEventListeners = () => {
    this.inputList = Array.from(
      this.formElement.querySelectorAll(`.${this.settings.formInput}`)
    );
    this.inputList.forEach((input) => {
      input.removeEventListener("input", this._checkIfInputValid);
    });
  };
  _preventSubmitForm() {
    event.preventDefault();
  }
  //<<END>> Listeners control <<END>>
}

export default FormValidator;
