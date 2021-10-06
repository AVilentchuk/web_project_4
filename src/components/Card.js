export default class Card {
  constructor({ name, link }, selectTemplate, handleImageClick) {
    this._text = name;
    this._link = link;
    this.selectTemplate = selectTemplate;
    this._handleImageClick = handleImageClick;
  }

  _cloneTemplate() {
    const template = this.selectTemplate.content.querySelector(".card");
    return template.cloneNode(true);
  }


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

  tooltipCheck = (card) => {
    const tooltip = this._element.querySelector(".card__overflow-tooltip");
      if (tooltip.offsetWidth < tooltip.scrollWidth){
        this._element.remove(tooltip);
        tooltip = null;
        console.log("1")
      }
  }
  createCard = () => {
    this._element = this._cloneTemplate();
    this._assignEventListeners();

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._text;

    this._element.querySelector(".card__text").textContent = this._text;
    return this._element;
  };
}
