const editButton = document.querySelector(".profile__button-edit");
const submitButton = document.querySelectorAll(".button_type_submit");
const closeButton = document.querySelectorAll(".button_type_close");
const addButton = document.querySelector(".profile__button-add");
const popupBack = document.querySelector(".popup");
const form = document.querySelectorAll(".popup__form");
const curName = document.querySelector(".profile__name");
const curJob = document.querySelector(".profile__job");
const newName = document.getElementById("name");
const newJob = document.getElementById("job-des");

editButton.addEventListener("click", openEdit);
addButton.addEventListener("click", openAdd);
// Array of initial cards
let initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
//Card add constructor
const cardAdd = (locName, imgUrl) => {
  const cardTemp = document.querySelector("#card-temp").content;
  const newCard = cardTemp.querySelector(".card").cloneNode(true);
  const inLocName = newCard.querySelector(".card__text");
  const inImgUrl = newCard.querySelector(".card__image");
  inLocName.innerText = locName;
  inImgUrl.src = imgUrl;
  document.querySelector(".locations").append(newCard);
  let cardTxt = document.querySelectorAll(".card__text");
  cardTxt.forEach((e) => {
    if (e.scrollWidth > e.clientWidth) {
      e.nextElementSibling.nextElementSibling.innerHTML = e.innerHTML;
      console.log(e.nextSibling.innerText);
    }
  });
};
//loop array constructor
initialCards.forEach((location) => {
  console.log(location);
  const locName = location.name;
  const imgUrl = location.link;
  console.log(locName);
  console.log(imgUrl);
  cardAdd(locName, imgUrl);
});
//base page button listeners
editButton.addEventListener("click", openEdit);
addButton.addEventListener("click", openAdd);

// delBtn.addEventListener("click", function print() {
//   console.log("lol");
// });

//functions

function pullProfData() {
  newName.value = curName.textContent;
  newJob.value = curJob.textContent;
}

function closePop(e) {
  popupBack.classList.remove("popup_active");
  e.currentTarget.parentNode.style.display = "none";
}

function openPop(child) {
  const popWin = popupBack.querySelector(child);
  popupBack.classList.add("popup_active");
  popWin.style.display = "flex";
}

function submitProf(e) {
  e.preventDefault();
  curName.textContent = newName.value;
  curJob.textContent = newJob.value;
  closePop(e);
}
function sumbitPlc(e) {
  e.preventDefault();
  const plcTitle = document.getElementById("place-title").value;
  const imgUrl = document.getElementById("image-link").value;
  cardAdd(plcTitle, imgUrl);
  document.getElementById("place-title").value = "";
  document.getElementById("image-link").value = "";
  closePop(e);
}

function openEdit() {
  pullProfData();
  openPop("#w-edit");
  closeButton.forEach((btn) => {
    btn.addEventListener("click", closePop);
    document
      .getElementsByName("editWindow")[0]
      .addEventListener("submit", submitProf);
  });
}
function openAdd() {
  openPop("#w-add");
  closeButton.forEach((btn) => {
    btn.addEventListener("click", closePop);
    document
      .getElementsByName("addWindow")[0]
      .addEventListener("submit", sumbitPlc);
  });
}
function openImg() {
  openPop("#w-img");

  closeButton.forEach((btn) => {
    btn.addEventListener("click", closePop);
  });
}

const delBtn = document.querySelectorAll(".button_type_delete");
delBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.currentTarget.parentNode.remove();
  });
});
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  const cardPhoto = card.querySelector(".card__image");
  console.log(cardPhoto);
  const cardTitle = card.querySelector(".card__text");

  cardPhoto.addEventListener("click", () => {
    console.log(cardPhoto.getAttribute("src"));
    document.querySelector(".popup__img").src = cardPhoto.getAttribute("src");
    console.log(document.querySelector(".popup__img").getAttribute("src"));
    document.querySelector(".popup__place-name").innerHTML =
      cardTitle.innerHTML;
    openImg();
  });
});

// alt for del onclick="return this.parentNode.remove();"
