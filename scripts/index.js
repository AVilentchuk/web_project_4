//Imports
import { initialCards } from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
//imports
export { openImage };
//settings passed onto form validator
const settings = {
  formInput: "form__input",
  inputStatus: "form__input_status",
  submitSelector: "button_type_submit",
  disabledButton: "button_disabled",
  inputErrorActive: "form__input-error_active",
};

// <<START>> reused variables  <<START>>
// buttons
const navigationArrowsContainer =
  document.querySelectorAll(".navigation-arrow");
const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
//popup windows & container
const galleryWindow = document.querySelector("#w-img");
const addWindow = document.querySelector("#w-add");
const editProfileWindow = document.querySelector("#w-edit");
const cardContainer = document.querySelector(".locations");
//profile attributes
const currentName = document.querySelector(".profile__name");
const currentJob = document.querySelector(".profile__job");
//profile input field
const newName = document.getElementById("name");
const newJob = document.getElementById("job-des");
//Add input fields
const newPlace = document.getElementById("place-title");
const newImageLink = document.getElementById("image-link");
//Image popup window attributes
const imageWindowName = document.querySelector(".popup__place-name");
const imageWindowPhoto = document.querySelector(".popup__img");
//arrow keys
const leftArrow = document.querySelector(".navigation-arrow_left");
const rightArrow = document.querySelector(".navigation-arrow_right");
//template
const cardTemplate = document
  .querySelector("#card-temp");

//closes popup and active window/windows.
function closePopup() {
  const activePopup = document.querySelector(".popup_active");
  let form = activePopup.querySelector(".form");
  activePopup.classList.remove("popup_active");
  activePopup.removeEventListener("click", closeOnClickBackground);
  if (form) {
    form.reset();
  }
  detachKeyListener();
}
const closeOnClickBackground = (event) => {
  if (event.target.classList.contains("popup_active")) {
    closePopup();
  }
};
//<<START>> Navigation functions <<START>>
//This gets the value of the card clicked from photo listeners
function navigationArrows(card) {
  //if conditions for exceptions of no sibling to go to start/end.
  const leftImage = card.previousElementSibling || card.parentNode.lastChild;
  const rightImage = card.nextElementSibling || card.parentNode.firstChild;
  navigationArrows.left = leftImage;
  navigationArrows.right = rightImage;
}

function goLeft() {
  imageWindowPhoto.src =
    navigationArrows.left.querySelector(".card__image").src;
  imageWindowPhoto.alt =
    navigationArrows.right.querySelector(".card__image").alt;
  imageWindowName.textContent =
    navigationArrows.left.querySelector(".card__text").textContent;
  navigationArrows(navigationArrows.left); //sends data to navigation to update card location.
}
function goRight() {
  imageWindowPhoto.src =
    navigationArrows.right.querySelector(".card__image").src;
  imageWindowPhoto.alt =
    navigationArrows.right.querySelector(".card__image").alt;
  imageWindowName.textContent =
    navigationArrows.right.querySelector(".card__text").textContent;
  navigationArrows(navigationArrows.right); //sends data to navigation to update card location.
}
// toggles the Arrow animation by adding and removing css class and turning on transition for it's duration.
function toggleArrow(e) {
  e.classList.add("navigation-arrow_animated");
  const delayTime =
    parseFloat(getComputedStyle(e)["transitionDuration"]) * 1000;
  setTimeout(() => e.classList.remove("navigation-arrow_animated"), delayTime);
}
// switch for keyDown listener
function keyListener(key) {
  switch (key.code) {
    case "ArrowLeft":
      if (
        document
          .querySelector(".popup_active")
          .classList.contains("popup_gallery")
      ) {
        goLeft();
        toggleArrow(leftArrow);
      }
      break;
    case "ArrowRight":
      if (
        document
          .querySelector(".popup_active")
          .classList.contains("popup_gallery")
      ) {
        goRight();
        toggleArrow(rightArrow);
      }
      break;
    case "Escape":
      closePopup();
      break;
    default:
      break;
  }
}
//Attach mouse click listener for navigation
function attachMouseNavigationListener() {
  leftArrow.addEventListener("click", goLeft);
  rightArrow.addEventListener("click", goRight);
}

//Detach mouse click listener for navigation
function detachMouseNavigationListener() {
  leftArrow.removeEventListener("click", goLeft);
  rightArrow.removeEventListener("click", goRight);
}

//Attach key listener
function attachKeyListener() {
  document.addEventListener("keydown", keyListener);
  if (
    document.querySelector(".popup_active").classList.contains("popup_gallery")
  ) {
    attachMouseNavigationListener();
  }
}
//Detach key listener
function detachKeyListener() {
  document.removeEventListener("keydown", keyListener);
  detachMouseNavigationListener();
}

//<<END>> Navigation functions <<END>>
//<<START>> functions for opening & closing windows <<START>>
//Closes popup on background click

function openPopup(window) {
  const popupBackground = window.parentNode;
  popupBackground.classList.add("popup_active");
  attachKeyListener();
  popupBackground.addEventListener("click", closeOnClickBackground);
}

//Close button listener
const closeButton = document.querySelectorAll(".button_type_close");
closeButton.forEach((button) => button.addEventListener("click", closePopup));
//<<END>> functions for opening windows <<END>>
//<<START>> function to construct new cards followed by loop to run it on each item in initial array <<START>>

//Adds the card to the locations and removes/adjusts the tooltip according to the width of text.
function addCard(card) {
  cardContainer.prepend(card);
  //adjusts/removes tooltip
  // console.log(card.overflowTooltip);
  let overflowTooltip = card.querySelector(".card__overflow-tooltip");
  const inputLocationName = card.querySelector(".card__text");
  if (inputLocationName.scrollWidth > inputLocationName.clientWidth) {
    overflowTooltip.textContent = inputLocationName.textContent;
  } else {
    overflowTooltip.remove();
    overflowTooltip = null;
  }
}
//Looping over the array in initialCards.js
initialCards.forEach((card) => {
  let cardElement = new Card(card, cardTemplate);
  addCard(cardElement.createCard());
});
//<<END>> function to construct new cards followed by loop to run it on each item in initial array <<END>>
//<<START>> Submission functions <<START>>
//submits the changes done to the profile in the edit window.
function submitProfile(e) {
  e.preventDefault(); //prevent default behavior or submit form.
  currentName.textContent = newName.value;
  currentJob.textContent = newJob.value;
  e.target.removeEventListener("submit", submitProfile);
  closePopup();
}
//submits the new location added in the add window.
function submitPlace(e) {
  e.preventDefault(); //prevent default behavior or submit form.
  const newCard = {
    name: newPlace.value,
    link: newImageLink.value,
  };
  const submitCard = new Card(newCard, cardTemplate)
  addCard(submitCard.createCard());
  closePopup();
  e.target.removeEventListener("submit", submitPlace);
  e.target.reset();
}
//<<END>> Submission functions <<END>>

//<<START>> Specific action functions <<START>>
//pulls current name and job from the profile and updates it into the inputs - for openEdit()
function pullProfileData() {
  newName.value = currentName.textContent;
  newJob.value = currentJob.textContent;
}
//opens edit window
function openEdit() {
  pullProfileData();
  openPopup(editProfileWindow);
  const windowForm = editProfileWindow.querySelector(".form");
  windowForm.addEventListener("submit", submitProfile);
}
//opens add window
function openAdd() {
  openPopup(addWindow);
  const windowForm = addWindow.querySelector(".form");
  windowForm.addEventListener("submit", submitPlace);
}
//opens galleryWindow and send card clicked to navigation function.
function openImage(card) {
  openPopup(galleryWindow);
  navigationArrows(card);
}

//<<END>> Specific action functions <<END>>

//<<START>> base page button listeners <<START>>
editButton.addEventListener("click", openEdit); //edit button listener
addButton.addEventListener("click", openAdd); //add button listener
//<<END>> base page button listeners <<END>>

//FormValidator activation
const formList = Array.from(document.querySelectorAll(".form"));
formList.forEach( form => {
  form = new FormValidator(form, settings)
  form.enableValidation();
});
//I decided to extend the FormDATA class with FormValidator, that way
//I can not name arbitrary names to each form and they'll have the same behaviors.
//This also lets me make resetValidation private and add it as a reset event listener.
