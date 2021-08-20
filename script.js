let editButton = document.querySelector(".button_edit");
let submitButton = document.querySelector(".button_submit");
let closeButton = document.querySelector(".edit-window__button-close");
let popupBack = document.querySelector(".popup");
let form = document.querySelector(".edit-window__form");
let curName = document.querySelector(".profile__name");
let curJob = document.querySelector(".profile__job");
let newName = document.getElementById("name");
let newJob = document.getElementById("job-des");

editButton.addEventListener("click", openEdit);
newName.value = curName.textContent;
newJob.value = curJob.textContent;

function openEdit() {

  popupBack.classList.add("popup_active");
  closeButton.addEventListener("click", function closeClick() {
    popupBack.classList.remove("popup_active");
    closeButton.removeEventListener("click", closeClick);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault()
     curName.textContent = newName.value;
    curJob.textContent = newJob.value;
    popupBack.classList.remove("popup_active")
  });
}


