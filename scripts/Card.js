import { openImage } from "./index.js";

export default class Card {
  constructor({ name, link }, template) {
    this._text = name;
    this._link = link;
    this._template = template;
    return this.createCard();
  };

  _cloneTemplate() {
    return this._template.cloneNode(true);
  };

  _imageClickHandler = () => {
    document.querySelector(".popup__place-name").textContent = this._text;
    document.querySelector(".popup__img").src = this._link;
    document.querySelector(".popup__img").alt = `Photograph of ${this._text}`;
    openImage(event.target.parentNode);
  };

  _deleteHandler() {
    event.currentTarget.parentNode.remove();
  };

  _assignEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._imageClickHandler();
      });
    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", () => {
        this._deleteHandler();
      });
  };

  createCard() {
    this._element = this._cloneTemplate();
    this._assignEventListeners();

    this._element.querySelector(".card__text").textContent = this._text;
    this._element.querySelector(".card__overflow-tooltip").textContent =
      this._text;

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._text;
    return this._element;
  };
}
