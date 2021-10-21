//Imports
import "./index.css";
import { initialCards } from "../scripts/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupForm from "../components/PopupForm.js";
import PopupGallery from "../components/PopupGallery.js";
import PopupConfirm from "../components/PopupConfirm";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo .js";
import Api from "../components/Api.js";
import {
  settings,
  addButton,
  editButton,
  enlargeImageButton,
  editImageButton,
  galleryWindow,
  addWindow,
  editProfileWindow,
  editProfilePictureWindow,
  largeProfileImageWindow,
  cardContainer,
  cardTemplate,
  addForm,
  editForm,
  editProfilePictureForm,
} from "../scripts/constants.js";
//loader is a custom script I've created to process the button state while loading and finished.
//Liza from the educational team helped me to refactor it's code to be reusable.
import { loader } from "./loader.js";
//This is a function to determinate if the text in a card overflows and add tooltip accordingly.
const tooltipCheck = (renderedCard) => {
  renderedCard;
  let tooltip = renderedCard.querySelector(".card__overflow-tooltip");
  let text = renderedCard.querySelector(".card__text");
  if (text.offsetWidth < text.scrollWidth) {
    tooltip.textContent = text.textContent;
  } else {
    tooltip.remove();
    tooltip = null;
  }
  return renderedCard;
};
//Api options
const options = {
  baseUrl: "https://around.nomoreparties.co/v1/",
  apiKey: "69483cc0-2fd4-4d47-b549-ff7c13f67c88",
  groupId: "group-12",
};
//Api is created here.
const mainApi = new Api(options);

//Creates a userInfo object.
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__about",
  ".profile__photo"
);
//This updates the profile data with data from the server
mainApi.getProfile().then((res) => {
  userInfo.setUserInfo(res);
});

//cardRendering function passed to section class for cardSection and new card creators.
const confirmWindow = new PopupConfirm("#w-confirm");
confirmWindow.setEventListeners();

const cardRenderer = (newCard) => {
  const cardElement = new Card(
    newCard,
    cardTemplate,
    (evt) => {

      galleryPopup.open(evt);
    },
    (id) => {
      confirmWindow.open();
      confirmWindow.setFunction(() => {
        loader({
          dots: {
            interval: 100,
            count: 4,
          },
          completeTimeDelay: 250,
          callbackEnd: () => confirmWindow.close(),
          clickHandler: () =>
            mainApi.deleteCardPost(id).then(cardElement.deleteCard()),
        });
      });
    },
    (id) => {
      console.log(userInfo._data._id);
      if (cardElement.likes.some((entry) => entry._id == userInfo._data._id)) {
        mainApi.dislikePhoto(id).then((res) => cardElement._handleLike(res));
      } else {
        mainApi.likePhoto(id).then((res) => cardElement._handleLike(res));
      }
    },
    userInfo._data._id
  );
  const renderedCard = cardElement.createCard();
  return renderedCard;
};

const editPopup = new PopupForm(editProfileWindow, () => {
  userInfo.setUserInfo(editPopup.getInputValues());
  loader({
    dots: {
      interval: 40,
      count: 4,
    },
    completeTimeDelay: 400,
    callbackEnd: () => editPopup.close(),
    clickHandler: () => mainApi.updateProfile(editPopup.getInputValues()),
  });
});

editPopup.setEventListeners();
//popup for editing profile picture.
const editPicWindow = new PopupForm(editProfilePictureWindow, () => {
  loader({
    dots: {
      interval: 60,
      count: 4,
    },
    completeTimeDelay: 400,
    callbackEnd: () => editPicWindow.close(),
    clickHandler: () =>
      mainApi
        .updateProfilePhoto(editPicWindow.getInputValues().avatar)
        .then((res) => userInfo.setUserInfo(res)),
  });
});

editPicWindow.setEventListeners();
//creates popup with form corresponding to add button with a callback function;
const addPopup = new PopupForm(addWindow, () => {
  let newCard = addPopup.getInputValues();
  loader({
    dots: {
      interval: 60,
      count: 4,
    },
    completeTimeDelay: 400,
    clickHandler: () =>
      mainApi.postNewCard(newCard).then((res) => {
        newCard = cardRenderer(res);
        cardSection.addItem(newCard);
        tooltipCheck(newCard);
        addPopup.close();
      }),
  });
});

addPopup.setEventListeners();

//Creates the gallery popup
const galleryPopup = new PopupGallery(galleryWindow);
galleryPopup.setEventListeners();
//creates the galleryPopup to open profile image.
const profileLarge = new PopupGallery(largeProfileImageWindow);
profileLarge.setEventListeners();
//<<Start>> form Validation <<Start>>
const editValidator = new FormValidator(editForm, settings);
editValidator.enableValidation();

const addValidator = new FormValidator(addForm, settings);
addValidator.enableValidation();

const editPicValidator = new FormValidator(editProfilePictureForm, settings);
editPicValidator.enableValidation();
//<<END>> form Validation <<END>>

//adds card section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (newCard) => {
      newCard = cardRenderer(newCard);
      cardSection.addItem(newCard, "append");
      tooltipCheck(newCard);
    },
  },
  cardContainer
);

//renders card section
mainApi.getInitialCards().then((data) => {
  cardSection.renderItems(data);
});

//<<START>> base page button listeners <<START>>
editButton.addEventListener("click", () => {
  editPopup.setInputValues(userInfo.getUserInfo());
  editPopup.open();
});

addButton.addEventListener("click", () => addPopup.open());

editImageButton.addEventListener("click", () => {
  editPicWindow.setInputValues(userInfo.getUserInfo());
  editPicWindow.open();
});

enlargeImageButton.addEventListener("click", () => profileLarge.open());

//<<END>> base page button listeners <<END>>
