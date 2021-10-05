//FormValidator Class - > Added
class FormValidator {
  constructor(formElement, settings) {
    this._settings = settings;
    this._formElement = formElement;
  }
  //<<START>>public methods of form validation.<<START>>
  enableValidation() {
    return this._setEventListeners();
  }

  _resetValidation = () => {
    const { inputStatus } = this._settings;
    this._inputList.forEach((input) => {
      this._deactivateError(input);
      input.classList.remove(`${inputStatus}`);
    });
    this._controlSubmit(true);
    return this._element;
  }
  //<<END>>public methods of form validation.<<END>>
  //<<START>> Error messages and button controls <<START>>
  _deactivateError = (input) => {
    const errorField = input.nextElementSibling;
    errorField.classList.remove(this._settings.inputErrorActive);
    errorField.textContent = "";
  };
  _activateError = (input, message) => {
    const errorField = input.nextElementSibling;
    errorField.classList.add(this._settings.inputErrorActive);
    errorField.textContent = message;
  };
  //Controls the status of the submit button, gets form inputs status from checkIfInputValid
  _controlSubmit = (formStatus) => {
    const { submitSelector, disabledButton } = this._settings;
    const submitButton = this._formElement.querySelector(`.${submitSelector}`);

    if (formStatus) {
      submitButton.classList.add(disabledButton);
      submitButton.setAttribute("disabled", true);
    } else {
      submitButton.classList.remove(disabledButton);
      submitButton.removeAttribute("disabled");
    }
  };
  _checkIfInputValid = (evt) => {
    const input = evt.target;
    input.classList.add(this._settings.inputStatus);
    if (!input.validity.valid) {
      this._activateError(input, input.validationMessage);
    } else {
      this._deactivateError(input);
    }

    const formStatus = this._inputList.some((item) => !item.validity.valid);
    return this._controlSubmit(formStatus);
  };
  //<<END>> Error messages control <<END>>
  //<<START>> Listeners control <<START>>
  _setEventListeners = () => {
    const { formInput } = this._settings;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(`.${formInput}`)
    );
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._formElement.addEventListener("reset", this._resetValidation);
    this._inputList.forEach((input) => {
      input.addEventListener("input", this._checkIfInputValid);
    });
    return this._element;
  };

  //<<END>> Listeners control <<END>>
}

export default FormValidator;
