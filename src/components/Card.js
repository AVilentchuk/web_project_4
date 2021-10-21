import Api from "./Api";

export default class Card {
  constructor(
    cardData,
    selectTemplate,
    handleImageClick,
    serverDelete,
    serverLike,
    myId
  ) {
    this._text = cardData.name;
    this._link = cardData.link;
    this.selectTemplate = selectTemplate;
    this._handleImageClick = handleImageClick;
    this.cardID = cardData._id;
    this.likes = cardData.likes;
    this._handleServerDelete = serverDelete;
    this._serverLike = serverLike;
    this._ownerId = cardData.owner._id || undefined;
    this._myId = myId;
  }

  _cloneTemplate() {
    const template = this.selectTemplate.content.querySelector(".card");
    return template.cloneNode(true);
  }

  // function (){addPopup.open()}, false
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLike(res) {
    if (this.likes !== res.likes) this.likes = res.likes;
    this.likeCounter.textContent = this.likes.length;

    this.likeCounter.style.visibility = this.likes.length ? "visible" : "hidden";

    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");

    return this.likes;
  }

  _assignEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleImageClick);
    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", () => this._handleServerDelete(this.cardID));
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._serverLike(this.cardID));
  }
  getId() {
    return this.cardID;
  }

  tooltipCheck = (card) => {
    const tooltip = this._element.querySelector(".card__overflow-tooltip");
    if (tooltip.offsetWidth < tooltip.scrollWidth) {
      this._element.remove(tooltip);
      tooltip = null;
    }
  };
  createCard = () => {
    this._element = this._cloneTemplate();
    this._assignEventListeners();

    this.likeCounter = this._element.querySelector(".card__like-label");

    if (this.likes) {
      if (this.likes.length !== 0) {
        this.likeCounter.style.visibility = "visible";
        this._element.querySelector(".card__like-label").textContent =
          this.likes.length;

        if (this.likes.some((entry) => entry._id === this._myId)) {
          this._element
            .querySelector(".card__like-button")
            .classList.add("card__like-button_active");
        }
      }
    }
    if (this._ownerId !== this._myId) {
      this._element.querySelector(".button_type_delete").style.display = "none";
    }

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._text;

    this._element.querySelector(".card__text").textContent = this._text;

    return this._element;
  };
}
