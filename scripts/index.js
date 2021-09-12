//Imported functions
import {initialCards} from './initialCards.js';
import * as Validator from './validate.js';
// import {resetValidation} from "./validate.js";
// resetValidation(form);
//variable declarations //
var locationName;
var imageUrl;
var windowTarget;
var windowParent;
var windowForm;
// <<START>> reused variables  <<START>>
// buttons
const navigationArrowsContainer = document.querySelectorAll(".navigation-arrow");
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
//Form formInput and error message selectors
// const formList = document.querySelector(".form");
// const formInput = form.querySelector(".form__input");
// const inputError = form.querySelector(`.${formInput.id}-error`);
// <<END>> reused variables  <<END>>

//<<START>> functions for opening & closing windows <<START>>
//Closes popup on background click
const popupBackgroundClickClose = () => {
  if (event.target.classList.contains("popup") && event.target.classList.contains("popup_active")) {
    closePopup();
    event.target.removeEventListener("click", popupBackgroundClickClose)
  }
};

function openPopup(window) {
  const popupBackground =   window.parentNode;
  popupBackground.classList.add("popup_active");
  window.classList.add("popup_active");
  window.querySelector("form")? Validator.resetValidation(window.querySelector("form")) :"";
  popupBackground.addEventListener('click', popupBackgroundClickClose);
}
//closes popup and active window/windows.
function closePopup(e) {
  if (!e) {
    //distinguishes between escape click close and mouse click close.
    document
      .querySelectorAll(".popup_active")
      .forEach((target) => target.classList.remove("popup_active"));
  } else {
    [windowTarget, windowParent] = [
      e.target.parentNode,
      e.target.parentNode.parentNode,
    ];
    windowTarget.classList.remove("popup_active");
    windowParent.classList.remove("popup_active");
  }
}
//Close button listener
const closeButton = document.querySelectorAll(".button_type_close");
closeButton.forEach((btn) => btn.addEventListener("click", closePopup));
//<<END>> functions for opening windows <<END>>

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
function toggleArrow (e) {
  e.classList.add("navigation-arrow_animated");
  var delayTime = parseFloat(getComputedStyle(e)["transitionDuration"]) * 1000;
  setTimeout(() => e.classList.remove("navigation-arrow_animated"), delayTime);
};
// switch for keyDown listener
function checkKey(key) {
  switch (key.keyCode) {
    case 37:
      if (galleryWindow.classList.contains("popup_active")) {
        goLeft();
        toggleArrow(leftArrow);
      }
      break;
    case 39:
      if (galleryWindow.classList.contains("popup_active")) {
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
//Listener for mouse click on navigation arrows
function navigationListenerSetup() {
  navigationArrowsContainer.forEach((arrow) =>{
    arrow.classList.contains("navigation-arrow_left")?
    arrow.addEventListener("click", goLeft):
    arrow.addEventListener('click', goRight);
  }
  );
}
navigationListenerSetup();
//keyDown Listener for document
document.addEventListener("keydown", checkKey);
//<<END>> Navigation functions <<END>>

//<<START>> function to construct new cards followed by loop to run it on each item in initial array <<START>>
const addCard = (locationName, imageUrl) => {
  // template variables in function
  const newCard = cardTemplate.cloneNode(true);
  const overflowTooltip = newCard.querySelector(".card__overflow-tooltip");
  const inputLocationName = newCard.querySelector(".card__text");
  const inputImageUrl = newCard.querySelector(".card__image");
  const deleteButton = newCard.querySelector(".button_type_delete");
  // value assignment here
  inputLocationName.textContent = locationName;
  inputImageUrl.src = imageUrl;
  inputImageUrl.alt = `Photograph of ${locationName}`;
  //creating listener for image
  inputImageUrl.addEventListener("click", function imageListener(e) {
    imageWindowName.textContent = locationName;
    imageWindowPhoto.src = imageUrl;
    openImage(e.target.parentNode);
  });
  //creating delete button listener
  deleteButton.addEventListener("click", function deleteListener(button) {
    button.currentTarget.parentNode.remove();
    button.currentTarget.parentNode = null;
  });
  //attaching the card at the end of locations.
  cardContainer.prepend(newCard);
  //this adds a caption to the place's name if it doesn't fit in the card.
  inputLocationName.scrollWidth > inputLocationName.clientWidth
    ? (overflowTooltip.textContent = inputLocationName.textContent)
    : overflowTooltip.remove();
};

//Looping over the array in initialCards.js

initialCards.forEach((location) => {
  [locationName, imageUrl] = [location.name, location.link];
  addCard(locationName, imageUrl);
});
//<<END>> function to construct new cards followed by loop to run it on each item in initial array <<END>>

//<<START>> Submission functions <<START>>
//submits the changes done to the profile in the edit window.
function submitProfile(e) {
  e.preventDefault(); //prevent default behavior or submit form.
  currentName.textContent = newName.value;
  currentJob.textContent = newJob.value;
  e.target.removeEventListener("submit", submitProfile);
  closePopup(e);
}
//submits the new location added in the add window.
function submitPlace(e) {
  e.preventDefault(); //prevent default behavior or submit form.
  const placeTitle = newPlace.value; // get current values inside
  const imageUrl = newImageLink.value; // input field of the add window.
  addCard(placeTitle, imageUrl);
  closePopup(e);
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
