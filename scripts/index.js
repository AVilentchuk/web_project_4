//Imported functions
import { initialCards } from "./initialCards.js";
import * as Validator from "./validate.js";
//variable declarations //
let windowForm;
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
  .querySelector("#card-temp")
  .content.querySelector(".card");
//<<START>> Navigation functions <<START>>
//This gets the value of the card clicked from photo listeners
function navigationArrows(card) {
  //if conditions for exceptions of no sibling to go to start/end.
  var leftImage;
  var rightImage;
  !card.previousElementSibling
    ? (leftImage = card.parentNode.lastChild)
    : (leftImage = card.previousElementSibling);

  !card.nextElementSibling
    ? (rightImage = card.parentNode.firstChild)
    : (rightImage = card.nextElementSibling);

  navigationArrows.left = leftImage;
  navigationArrows.right = rightImage;
}

function goLeft() {
  imageWindowPhoto.src =
    navigationArrows.left.querySelector(".card__image").src;
  imageWindowName.textContent =
    navigationArrows.left.querySelector(".card__text").textContent;
  navigationArrows(navigationArrows.left); //sends data to navigation to update card location.
}

function goRight() {
  imageWindowPhoto.src =
    navigationArrows.right.querySelector(".card__image").src;
  imageWindowName.textContent =
    navigationArrows.right.querySelector(".card__text").textContent;
  navigationArrows(navigationArrows.right); //sends data to navigation to update card location.
}
// toggles the Arrow animation by adding and removing css class and turning on transition for it's duration.
function toggleArrow(e) {
  e.classList.add("navigation-arrow_animated");
  var delayTime = parseFloat(getComputedStyle(e)["transitionDuration"]) * 1000;
  setTimeout(() => e.classList.remove("navigation-arrow_animated"), delayTime);
}
// switch for keyDown listener
function keyListener(key) {
  switch (key.keyCode) {
    case 37:
      if (
        document
          .querySelector(".popup_active")
          .classList.contains("popup_gallery")
      ) {
        goLeft();
        toggleArrow(leftArrow);
      }
      break;
    case 39:
      if (
        document
          .querySelector(".popup_active")
          .classList.contains("popup_gallery")
      ) {
        goRight();
        toggleArrow(rightArrow);
      }
      break;
    case 27:
      closePopup();
      break;
    default:
      break;
  }
}
//Attach mouse click listener for navigation
function attachMouseNavigationListener() {
  navigationArrowsContainer.forEach((arrow) => {
    arrow.classList.contains("navigation-arrow_left")
      ? arrow.addEventListener("click", goLeft)
      : arrow.addEventListener("click", goRight);
  });
}
//Detach mouse click listener for navigation
function detachMouseNavigationListener() {
  navigationArrowsContainer.forEach((arrow) => {
    arrow.classList.contains("navigation-arrow_left")
      ? arrow.removeEventListener("click", goLeft)
      : arrow.removeEventListener("click", goRight);
  });
}
//Attach key listener
function attachKeyListener() {
  document.addEventListener("keydown", keyListener);
  document.querySelector(".popup_active").classList.contains("popup_gallery")
    ? attachMouseNavigationListener()
    : "";
}
//Detach key listener
function detachKeyListener() {
  document.removeEventListener("keydown", keyListener);
  detachMouseNavigationListener();
}

//<<END>> Navigation functions <<END>>
//<<START>> functions for opening & closing windows <<START>>
//Closes popup on background click
const closeOnClickBackground = () => {
  if (event.target.classList.contains("popup_active")) {
    closePopup();
  }
};

function openPopup(window) {
  const popupBackground = window.parentNode;
  popupBackground.classList.add("popup_active");
  attachKeyListener();
  popupBackground.addEventListener("click", closeOnClickBackground);
}

//closes popup and active window/windows.
function closePopup() {
  var activePop = document.querySelector(".popup_active");
  var form = activePop.querySelector(".form");
  activePop.classList.remove("popup_active");
  activePop.removeEventListener("click", closeOnClickBackground);
  if (form) {
    Validator.resetValidation(form);
    form.reset();
  }
  detachKeyListener();
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
  const overflowTooltip = card.querySelector(".card__overflow-tooltip");
  const inputLocationName = card.querySelector(".card__text");
  inputLocationName.scrollWidth > inputLocationName.clientWidth
    ? (overflowTooltip.textContent = inputLocationName.textContent)
    : overflowTooltip.remove();
}
//creates the card
const createCard = (cardData) => {
  // template variables in function
  const newCard = cardTemplate.cloneNode(true);
  const inputLocationName = newCard.querySelector(".card__text");
  const inputImageUrl = newCard.querySelector(".card__image");
  const deleteButton = newCard.querySelector(".button_type_delete");
  // value assignment here
  inputLocationName.textContent = cardData.name;
  inputImageUrl.src = cardData.link;
  inputImageUrl.alt = `Photograph of ${cardData.name}`;
  //creating listener for image
  inputImageUrl.addEventListener("click", function imageListener(e) {
    imageWindowName.textContent = cardData.name;
    imageWindowPhoto.src = cardData.link;
    imageWindowPhoto.alt = `Photograph of ${cardData.name}`;
    openImage(e.target.parentNode);
  });
  //creating delete button listener
  deleteButton.addEventListener("click", function deleteListener(button) {
    button.currentTarget.parentNode.remove();
  });
  //Passes the new card to be rendered
  return addCard(newCard);
};

//Looping over the array in initialCards.js
initialCards.forEach((cardData) => {
  createCard(cardData);
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
  const placeTitle = newPlace.value; // get current values inside
  const imageUrl = newImageLink.value; // input field of the add window.
  createCard(placeTitle, imageUrl);
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
  windowForm = editProfileWindow.querySelector(".form");
  windowForm.addEventListener("submit", submitProfile);
}
//opens add window
function openAdd() {
  openPopup(addWindow);
  windowForm = addWindow.querySelector(".form");
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

//Validator activation
Validator.enableValidation();
