export default class Section{
  constructor({items, renderer}, cardContainer) {
    this._items = items;
    this._tenderer = renderer;
    this._container = document.querySelector(cardContainer);
  }
  renderItems() {
    this._items.forEach(item => {
      this._tenderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
