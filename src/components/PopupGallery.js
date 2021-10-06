import Popup from "./Popup.js";

export default class PopupGallery extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._leftArrow = this._popup.querySelector(".navigation-arrow_left");
    this._rightArrow = this._popup.querySelector(".navigation-arrow_right");
    this._imageWindowPhoto = this._popup.querySelector(".popup__img");
    this._imageWindowName = this._popup.querySelector(".popup__place-name");
  }

  open(evt) {
    super.open();
    const card = evt.target.parentNode;
    const cardText = card.querySelector(".card__text");
    const cardLink = card.querySelector(".card__image");
    this._imageWindowName.textContent = cardText.textContent;
    this._imageWindowPhoto.src = cardLink.src;
    this._imageWindowPhoto.alt = `Photograph of ${cardText.textContent}`;
    this._navigationAssign(card);
  }
  _handleEscClose = (evt) => {
    switch (evt.code) {
      case "ArrowLeft":
          this._goLeft();
          this._toggleArrow(this._leftArrow);
        break;
      case "ArrowRight":
         this._goRight();
          this._toggleArrow(this._rightArrow);
        break;
      case "Escape":
        this.close();
        break;
      default:
        break;
    }
  }

   _navigationAssign = (card) => {
    //if conditions for exceptions of no sibling to go to start/end.
    this.card = card;
    this._leftCard = card.previousElementSibling || card.parentNode.lastChild;
    this._rightCard = card.nextElementSibling || card.parentNode.firstChild;
  }

   _goLeft() {
    this._imageWindowPhoto.src = this._leftCard.querySelector(".card__image").src;
    this._imageWindowPhoto.alt = this._leftCard.querySelector(".card__image").alt;
    this._imageWindowName.textContent = this._leftCard.querySelector(".card__text").textContent;
    this._navigationAssign(this._leftCard); //sends data to navigation to update card location.
  }
   _goRight()  {
    this._imageWindowPhoto.src = this._rightCard.querySelector(".card__image").src;
    this._imageWindowPhoto.alt = this._rightCard.querySelector(".card__image").alt;
    this._imageWindowName.textContent = this._rightCard.querySelector(".card__text").textContent;
    this._navigationAssign(this._rightCard); //sends data to navigation to update card location.
  }
  // toggles the Arrow animation by adding and removing css class and turning on transition for it's duration.
  _toggleArrow(e) {
    e.classList.add("navigation-arrow_animated");
    const delayTime =
      parseFloat(getComputedStyle(e)["transitionDuration"]) * 1000;
    setTimeout(() => e.classList.remove("navigation-arrow_animated"), delayTime);
  }
  setEventListeners(){
    super.setEventListeners();
    this._rightArrow.addEventListener("click", this._goRight.bind(this));
    this._leftArrow.addEventListener("click", this._goLeft.bind(this));
  }
}
