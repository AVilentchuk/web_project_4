import { openImage } from "./index.js";
const galleryText = document.querySelector(".popup__place-name");
const galleryImage = document.querySelector(".popup__img");

export default class Card {
  constructor({ name, link }, selectTemplate) {
    this._text = name;
    this._link = link;
    this.selectTemplate = selectTemplate;
  }

  _cloneTemplate() {
    const template = this.selectTemplate.content.querySelector(".card");
    return template.cloneNode(true);
  }

  _handleImageClick = () => {
    galleryText.textContent = this._text;
    galleryImage.src = this._link;
    galleryImage.alt = `Photograph of ${this._text}`;
    openImage(this._element);
  };

  _handleDelete = () => {
    this._element.remove();
    this._element = null;
  };

  _assignEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleImageClick);
    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", this._handleDelete);
  }

  createCard = () => {
    this._element = this._cloneTemplate();
    this._assignEventListeners();
    const cardImage = this._element.querySelector(".card__image");
    this._element.querySelector(".card__text").textContent = this._text;
    this._element.querySelector(".card__overflow-tooltip").textContent =
      this._text;

      cardImage.src = this._link;
      cardImage.alt = this._text;
    return this._element;
  };
}
