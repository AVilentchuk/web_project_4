// reused variables ( additional variables exist in function to be used in them exclusively )
// buttons
const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
//popup background
const popupWrapper = document.querySelector(".popup");
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
//template
const cardTemplate = document
  .querySelector("#card-temp")
  .content.querySelector(".card");

//<<START>> function to construct new cards followed by loop to run it on each item in initial array <<START>>
const addCard = (locationName, imageUrl) => {
  // template variables used in this function
  const newCard = cardTemplate.cloneNode(true);
  const inputLocationName = newCard.querySelector(".card__text");
  const inputImageUrl = newCard.querySelector(".card__image");
  const deleteButton = newCard.querySelector(".button_type_delete");
  // value assignment here
  inputLocationName.textContent = locationName;
  inputImageUrl.src = imageUrl;
  inputImageUrl.alt = `Photograph of ${locationName}`;
  //creating listener for image
  inputImageUrl.addEventListener("click", () => {
    imageWindowName.textContent = locationName;
    imageWindowPhoto.src = imageUrl;
    openImg();
  });
  //creating delete button listener
  deleteButton.addEventListener("click", (evt) => {
    evt.currentTarget.parentNode.remove();
  });
  //attaching the card at the end of locations.
  document.querySelector(".locations").prepend(newCard);
  //this adds a caption to the place's name if it doesn't fit in the card.
  if (inputLocationName.scrollWidth > inputLocationName.clientWidth) {
    inputLocationName.nextElementSibling.nextElementSibling.textContent =
      inputLocationName.textContent;
  }
};

//Looping over the array in initialCards.js
initialCards.forEach((location) => {
  const locationName = location.name;
  const imageUrl = location.link;
  addCard(locationName, imageUrl);
});
//<<END>> function to construct new cards followed by loop to run it on each item in initial array <<END>>

//<<START>> functions for opening & closing windows <<START>>
//pulls current name and job from the profile and updates it into the inputs - for openEdit()
function pullProfData() {
  newName.value = currentName.textContent;
  newJob.value = currentJob.textContent;
}
//opens edit window
function openEdit() {
  pullProfData();
  windowId = "#w-edit";
  openPopup(windowId);
  const currentWindow = popupWrapper.querySelector(windowId);
  windowCloseButton = currentWindow.querySelector(".button_type_close");
  windowCloseButton.addEventListener("click", closePopup);
  windowForm = currentWindow.querySelector(".popup__form");
  windowForm.addEventListener('submit',submitProfile);
  };

//opens add window
function openAdd() {
  windowId = "#w-add";
  openPopup(windowId);
  const currentWindow = popupWrapper.querySelector(windowId);
  windowCloseButton = currentWindow.querySelector(".button_type_close");
  windowCloseButton.addEventListener("click", closePopup);
  windowForm = currentWindow.querySelector(".popup__form");
  windowForm.addEventListener('submit',submitPlace);
}
//opens clicked image.
function openImg() {
  windowId = "#w-img";
  openPopup(windowId);
  const currentWindow = popupWrapper.querySelector(windowId);
  windowCloseButton = currentWindow.querySelector(".button_type_close");
  windowCloseButton.addEventListener("click", closePopup);
}
//closes popup and active window/windows.
function closePopup(e) {
  popupWrapper.classList.remove("popup_active");
  e.currentTarget.parentNode.style.visibility = "collapse";
  e.target.removeEventListener('click', closePopup);
}
//function to make transitioned items un-clickable during transition
function unClickAbility(item) {
  item.addEventListener("transitionstart", function countDown(e) {
    var delayTime = getComputedStyle(e.target)[["transitionDuration"]];
    delayTime = parseFloat(delayTime) * 1000;
    e.target.style.pointerEvents = "none";
    setTimeout(function () {
      e.target.style.pointerEvents = "all";
      item.removeEventListener("transitionstart", countDown);
    }, delayTime);
  });
}
//Opens the popup background and selected window/windows.
function openPopup(child) {
  const popupWindow = popupWrapper.querySelector(child);
  popupWrapper.classList.add("popup_active");
  unClickAbility(popupWrapper);
  popupWindow.style.visibility = "visible";
}
//<<END>> functions for opening windows <<END>>

//<<START>> base page button listeners <<START>>
editButton.addEventListener("click", openEdit); //edit button listener
addButton.addEventListener("click", openAdd); //add button listener
//<<END>> base page button listeners <<END>>

//<<START>> Submission functions <<START>>
function submitProfile(e) {
  //submits the changes done to the profile in the edit window.
  e.preventDefault(); //prevent default behavior or submit form.
  currentName.textContent = newName.value;
  currentJob.textContent = newJob.value;
  e.target.removeEventListener("submit",submitProfile);
  closePopup(e);
}
function submitPlace(e) {
  //submits the new location added in the add window.
  e.preventDefault(); //prevent default behavior or submit form.
  const placeTitle = newPlace.value; // get current values inside
  const imageUrl = newImageLink.value; // input field of the add window.
  addCard(placeTitle, imageUrl);
  newPlace.value = ""; // empties the
  newImageLink.value = ""; // input fields.
  e.target.removeEventListener('submit',submitPlace);
  closePopup(e);
}
//<<END>> Submission functions <<END>>
