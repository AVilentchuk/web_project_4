export default class UserInfo {
  constructor(usernameSelector, userJobSelector, profileImageSelector) {
    this._name = document.querySelector(usernameSelector);
    this._about = document.querySelector(userJobSelector);
    this._avatar = document.querySelector(profileImageSelector);
    this._data = {};
  }

  getUserInfo() {
    this._data.avatar = this._avatar.src;
    this._data.name = this._name.textContent;
    this._data.about = this._about.textContent;

    return this._data;
  }

  setUserInfo(newData) {
    const { name, about, avatar, _id } = newData;

    this._name.textContent = name;
    this._about.textContent = about;
    if (avatar) this._avatar.src = avatar;
    if (_id) this._data._id = _id;

    return this._data;
  }
}
