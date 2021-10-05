const galleryText = document.querySelector(".popup__place-name");
const galleryImage = document.querySelector(".popup__img");
// import {galleryPopup} from "../pages/index.js";

export default class Card {
  constructor({ name, link }, selectTemplate, handleClickExtension) {
    this._text = name;
    this._link = link;
    this.selectTemplate = selectTemplate;
    this.handleClickExtension = handleClickExtension;
  }

  _cloneTemplate() {
    const template = this.selectTemplate.content.querySelector(".card");
    return template.cloneNode(true);
  }

  _handleImageClick = (evt) => {
    galleryText.textContent = this._text;
    galleryImage.src = this._link;
    galleryImage.alt = `Photograph of ${this._text}`;
    this.handleClickExtension(evt);
  };

  // function (){addPopup.open()}, false
  _handleDelete = () => {
    this._element.remove();
    this._element = null;
  };
  _handleLike = (evt) => {
     evt.target.classList.toggle("card__like-button_active");
  };
  _assignEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleImageClick);
    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", this._handleDelete);
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLike);
  }

  createCard = () => {
    this._element = this._cloneTemplate();
    this._assignEventListeners();
    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._text;

    this._element.querySelector(".card__text").textContent = this._text;
    this._element.querySelector(".card__overflow-tooltip").textContent =
      this._text;

    return this._element;
  };
}
