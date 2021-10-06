//Imports
import "./index.css";
import { initialCards } from "../scripts/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupForm from "../components/PopupForm.js";
import PopupGallery from "../components/PopupGallery.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo .js";
import {
  settings,
  addButton,
  editButton,
  galleryWindow,
  addWindow,
  editProfileWindow,
  cardContainer,
  cardTemplate,
  addForm,
  editForm

} from "../scripts/constructs.js";

//Creates a userInfo object.
const userInfo = new UserInfo(".profile__name", ".profile__job");
//cardRendering function passed to section class for cardSection and new card creators.
const cardRenderer = (newCard) => {
  const cardElement = new Card(newCard, cardTemplate, (evt) => {
    galleryPopup.open(evt);
  });
  const renderedCard = cardElement.createCard();

  cardSection.addItem(renderedCard);
};

//Creates the pop with the edit form
const editPopup = new PopupForm(editProfileWindow, () => {
  userInfo.setUserInfo(editPopup.getInputValues());
  editPopup.close();
});
editPopup.setEventListeners();

//creates popup with form corresponding to add button with a callback function;
const addPopup = new PopupForm(addWindow, () => {
  const newCard = addPopup.getInputValues();
  cardRenderer(newCard);
  addPopup.close();
});

addPopup.setEventListeners();

//Creates the gallery popup
const galleryPopup = new PopupGallery(galleryWindow);
galleryPopup.setEventListeners();

//form Validation
const editValidator = new FormValidator(editForm,settings);
editValidator.enableValidation();

const addValidator = new FormValidator(addForm,settings);
addValidator.enableValidation();

//adds card section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (newCard) => {
      cardRenderer(newCard)
    },
  },
  cardContainer
);

//renders card section
cardSection.renderItems();

//<<START>> base page button listeners <<START>>
editButton.addEventListener("click", () => {
  editPopup.setInputValues(userInfo.getUserInfo());
  editPopup.open();
}); //edit button listener
addButton.addEventListener("click", () => addPopup.open()); //add button listener
//<<END>> base page button listeners <<END>>

const addImagePopup = new PopupWithForm(".popup_add-image", {
  submitHandler: (imageData) => {
    const newImageData = {
      name: imageData.imageTitle,
      link: imageData.imageLink
    };
      const newImageElement = new Card(newImageData, "#image-template",
       { handleCardClick: openCardPopup });
      imagesGenerator.addItem(newImageElement.generateCard());
   }}
);
addImagePopup.setEventListeners();

addImageBtn.addEventListener("click",()=> addImagePopup.open())





