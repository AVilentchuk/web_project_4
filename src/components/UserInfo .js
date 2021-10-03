export default class UserInfo {
  constructor(usernameSelector, userJobSelector) {
    this._usernameSelector = usernameSelector;
    this._userJobSelector = userJobSelector;
  }
  getUserInfo() {
    this._data = {
      name: document.querySelector(this._usernameSelector).textContent,
      job: document.querySelector(this._userJobSelector).textContent
    }
    return this._data;
  }
  setUserInfo(newData) {
    const {name, job} = newData;
    document.querySelector(this._usernameSelector).textContent = name;
    document.querySelector(this._userJobSelector).textContent = job;
    this._data = newData;
  }
}
