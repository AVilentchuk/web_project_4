export default class Section {
  constructor({ items, renderer }, cardContainer) {
    this._items = items;
    this._tenderer = renderer;
    this._container = document.querySelector(cardContainer);
  }
  renderItems() {
    this._items.forEach(item => {
      this._tenderer(item);
    });
  }

  //I did it so you can choose if you want to prepend or append the card element, default is prepend.
  addItem(element, attachAt) {
    if (attachAt = 'prepend' || attachAt == undefined ) {
      this._container.prepend(element);
    } else {
      if (attachAt == 'append') {
        this._container.append(element);
      }
    }
  }
}
