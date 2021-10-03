export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector).parentNode;
  }
  open() {
    this._popup.classList.add("popup_active");
    this.setEventListeners();
  }
  close() {
    this._popup.classList.remove("popup_active");
  }
  _handleEscClose = (evt) => {
    if (evt.code === "Escape") {
      this.close();
    }
  }

  _handleBackgroundClose = (evt) => {
    if (evt.target.classList.contains("popup_active")) {
      this.close();
    }
  }
  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.querySelector(".button_type_close").addEventListener("click", this.close.bind(this));
    this._popup.addEventListener("click", this._handleBackgroundClose)
  }
}
