// <<START>> reused variables  <<START>>
// buttons
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
const leftArrow = document.querySelector(".navigation__arrow--left");
const rightArrow = document.querySelector(".navigation__arrow--right");
//template
const cardTemplate = document
  .querySelector("#card-temp")
  .content.querySelector(".card");

// <<END>> reused variables  <<END>>

//<<START>> functions for opening & closing windows <<START>>
function openPopup(target) {
  target.parentNode.classList.add("popup_active");
  target.classList.add("popup_active");
}
//closes popup and active window/windows.
function closePopup(e) {
  if (!e) { //distinguishes between escape click close and mouse click close.
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
 !card.previousElementSibling ?
  leftImage = card.parentNode.lastChild :
  leftImage = card.previousElementSibling;

 !card.nextElementSibling ?
  rightImage = card.parentNode.firstChild :
  rightImage = card.nextElementSibling;

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
//toggles the Arrow animation by adding and removing css class and turning on transition for it's duration.
toggleArrow = (e) => {
  e.classList.add("navigation__arrow-animation_type_keyboard");
  delayTime = parseFloat(getComputedStyle(e)["transitionDuration"]) * 1000;
  setTimeout(() => e.classList.remove("navigation__arrow-animation_type_keyboard"), delayTime);
};
//switch for keyDown listener
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
  inputImageUrl.alt = `Photograph of ${locationName}`; //lookie here an alt
  //creating listener for image
  inputImageUrl.addEventListener("click",function imageListener(e)  {
    imageWindowName.textContent = locationName;
    imageWindowPhoto.src = imageUrl; // comment about missing alt look at the comment above
    openImage(e.target.parentNode);
  });
  //creating delete button listener
  deleteButton.addEventListener("click",function deleteListener(button) {
    button.currentTarget.parentNode.remove();
    button.currentTarget.parentNode = null;
  });
  //attaching the card at the end of locations.
  cardContainer.prepend(newCard);
  //this adds a caption to the place's name if it doesn't fit in the card.
  inputLocationName.scrollWidth > inputLocationName.clientWidth?
    overflowTooltip.textContent = inputLocationName.textContent:
    overflowTooltip.remove();
  }

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
  windowForm = editProfileWindow.querySelector(".popup__form");
  windowForm.addEventListener("submit", submitProfile);
}
//opens add window
function openAdd() {
  openPopup(addWindow);
  windowForm = addWindow.querySelector(".popup__form");
  windowForm.addEventListener("submit", submitPlace);
}
//opens galleryWindow and send card clicked to navigation function.
function openImage(card) {
  openPopup(galleryWindow);
  navigationArrows(card);
}
alert("This page works better on firefox!! \n(try adding a broken image with long name to locations\n try selecting long text under image when gallery opened)");
alert("There are is a keyboard listener for closing popups and navigating the gallery when turned on! escape to exit, left/right arrows to navigate ");


//<<END>> Specific action functions <<END>>

//<<START>> base page button listeners <<START>>
editButton.addEventListener("click", openEdit); //edit button listener
addButton.addEventListener("click", openAdd); //add button listener
//<<END>> base page button listeners <<END>>
