import Popup from "./Popup.js";

export default class PopupForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.handleSubmitForm = submitHandler;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._popup.querySelectorAll(".form__input");
  }
  open() {
    super.open();
  }
  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach((item) => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues;
  }

  setInputValues = (values) => {
    Object.entries(values).forEach(([key, value],i) => {
      this._inputList[i].value = value;
    })
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this.handleSubmitForm);
  }
}
