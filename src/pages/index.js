//Imports
import "./index.css";
import { initialCards } from "../scripts/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupForm from "../components/PopupForm.js";
import PopupGallery from "../components/PopupGallery.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo .js";
import { settings, addButton, editButton, galleryWindow, addWindow, editProfileWindow, cardContainer, cardTemplate, newPlace, newImageLink } from "../scripts/constructs.js";

//Creates a userInfo object.
const userInfo = new UserInfo(".profile__name", ".profile__job");

//enables formValidation throughout the document
document.querySelectorAll(".form").forEach(form => {
  form = new FormValidator(form, settings);
  form.enableValidation();
})
//adds card section
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = new Card(item, cardTemplate);
    const renderedCard = cardElement.createCard();
    cardSection.addItem(renderedCard);
  }
}, cardContainer, () => {
  galleryPopup.open(renderedCard);

});

//renders card section
cardSection.renderItems();
//Creates the pop with the edit form
const editPopup = new PopupForm(editProfileWindow, () => {

  userInfo.setUserInfo(editPopup._getInputValues());
  editPopup.close();
}
);

//creates popup with form corresponding to add button with a callback function;
const addPopup = new PopupForm(addWindow, () => {
  const newCard = {
    name: newPlace.value,
    link: newImageLink.value,
  };
  const cardElement = new Card(newCard,
    cardTemplate,
    (evt) => PopupGallery.open(evt));

  const renderedCard = cardElement.createCard();
  cardSection.addItem(renderedCard);
  addPopup.close();
});

//Creates the gallery popup
const galleryPopup = new PopupGallery(galleryWindow);


//<<START>> base page button listeners <<START>>
editButton.addEventListener("click", () => {
  editPopup.setInputValues(userInfo.getUserInfo());
  editPopup.open();
}); //edit button listener
addButton.addEventListener("click", () => addPopup.open()); //add button listener
//<<END>> base page button listeners <<END>>

//export to card so image click listener would work.
export { galleryPopup };
