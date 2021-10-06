
export const galleryWindow = "#w-img";
export const addWindow = "#w-add";
export const editProfileWindow = "#w-edit";
export const cardContainer = ".locations";

export const editButton = document.querySelector(".profile__button-edit");
export const addButton = document.querySelector(".profile__button-add");

export const editForm = document.querySelector(editProfileWindow).querySelector(".form");
export const addForm = document.querySelector(addWindow).querySelector(".form");

export const settings = {
  formInput: "form__input",
  inputStatus: "form__input_status",
  submitSelector: "button_type_submit",
  disabledButton: "button_disabled",
  inputErrorActive: "form__input-error_active",
};
export const cardTemplate = document.querySelector("#card-temp");

export const renderCard = (newCard) => {
  const cardElement = new Card(newCard, cardTemplate, (evt) => {
    galleryPopup.open(evt);
  });
  const renderedCard = cardElement.createCard();
  cardSection.addItem(renderedCard);
};
