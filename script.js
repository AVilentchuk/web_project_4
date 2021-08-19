let editWindow = document.querySelector(".edit-window");
let editButton = document.querySelector(".button_edit");

// console.log(editWindow.style.visibility);
// console.log(editButton);
function openEdit() {
  let submitButton = editWindow.querySelector('.button_submit');
  let closeButton = editWindow.querySelector('.button_close');
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__about');
  let editName = document.querySelector('.edit-window__name');
  let editJob = document.querySelector('.edit-window__job');

  editName.value = profileName.textContent;
  editJob.value = profileJob.textContent;

  editWindow.style.visibility = "visible";
  document.querySelector('.page__mask').style.visibility = "visible";

  closeButton.addEventListener('click', function () {
    document.querySelector('.page__mask').style.visibility = "hidden";
    editWindow.style.visibility = "hidden";
  });
  submitButton.addEventListener('click',function () {
    profileName.textContent = editName.value;
    profileJob.textContent = editJob.value;
    editWindow.style.visibility = "hidden";
    document.querySelector('.page__mask').style.visibility = "hidden";
  })
}


editButton.addEventListener('click', openEdit);