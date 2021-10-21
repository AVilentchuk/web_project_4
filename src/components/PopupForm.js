import Popup from "./Popup.js";

export default class PopupForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.handleSubmitForm = submitHandler;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__input");
  }

  close() {
    super.close();
    this._form.reset();
  }

  getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((item) => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues;
  }

  setInputValues = (values) => {
    for (let i = 0; i < this._inputList.length; i++) {
      if (values[`${this._inputList[i].name}`])
        this._inputList[i].value = values[`${this._inputList[i].name}`];
    }
    return this._inputList;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this.handleSubmitForm);
  }
}
