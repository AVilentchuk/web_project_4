//Those are the selectors for windows and the card container.
export const galleryWindow = "#w-img";
export const addWindow = "#w-add";
export const editProfileWindow = "#w-edit";
export const editProfilePictureWindow = "#w-editpic";
export const largeProfileImageWindow = "#w-piclrg";
export const cardContainer = ".locations";
//button selectors
export const editButton = document.querySelector(".profile__button-edit");
export const addButton = document.querySelector(".profile__button-add");
export const editImageButton = document.querySelector(
  ".button_type_edit-profile-image"
);
export const enlargeImageButton = document.querySelector(
  ".button_type_enlarge-profile-image"
);
//formSelectors
export const editForm = document
  .querySelector(editProfileWindow)
  .querySelector(".form");
export const editProfilePictureForm = document
  .querySelector(editProfilePictureWindow)
  .querySelector(".form");
export const addForm = document.querySelector(addWindow).querySelector(".form");
//settings for the formValidator
export const settings = {
  formInput: "form__input",
  inputStatus: "form__input_status",
  submitSelector: "button_type_submit",
  disabledButton: "button_disabled",
  inputErrorActive: "form__input-error_active",
};
//card template selector.
export const cardTemplate = document.querySelector("#card-temp");
