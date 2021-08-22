let editButton = document.querySelector(".button_profile_edit");
let submitButton = document.querySelector(".button_popup_submit");
let closeButton = document.querySelector(".button_popup_close");
let popupBack = document.querySelector(".popup");
let form = document.querySelector(".popup__form");
let curName = document.querySelector(".profile__name");
let curJob = document.querySelector(".profile__job");
let newName = document.getElementById("name");
let newJob = document.getElementById("job-des");

editButton.addEventListener("click", openEdit);

function pullProfData() {
  newName.value = curName.textContent;
  newJob.value = curJob.textContent;
}

function closePop() {
  popupBack.classList.remove("popup_active");
}
function openPop() {
  popupBack.classList.add("popup_active");
}

function openEdit() {
  pullProfData();
  openPop();
  closeButton.addEventListener("click", function closeClick() {
    popupBack.classList.remove("popup_active");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    curName.textContent = newName.value;
    curJob.textContent = newJob.value;
    closePop();
  });
}

// additional adaptability
let cardTxt = document.querySelectorAll(".card__text");
cardTxt.forEach((e) => {
  if (e.scrollWidth > e.clientWidth) {
    e.nextElementSibling.nextElementSibling.innerHTML = e.innerHTML;
    console.log(e.nextSibling.innerText);
  }
});
