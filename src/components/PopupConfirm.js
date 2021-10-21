import Popup from "./Popup";
export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setFunction(func) {
    this.setSubmitHandler = func;
  }

  open() {
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector(".button_type_submit")
      .addEventListener("click", () => this.setSubmitHandler());
  }
}
