export default class UserInfo {
  constructor(usernameSelector, userJobSelector) {
    this._name = document.querySelector(usernameSelector);
    this._job = document.querySelector(userJobSelector);
  }
  getUserInfo() {
    this._data = {
      name: this._name.textContent,
      job:  this._job.textContent
    }
    return this._data;
  }
  setUserInfo(newData) {
    const {name, job} = newData;
    this._name.textContent = name;
    this._job.textContent = job;
    this._data = newData;
  }
}
