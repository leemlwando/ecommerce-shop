module.exports = function Cart(oldCart) {
  console.log(oldCart, 'oldCart -----------------------------------');
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, id) {
    let storedItem = this.items[id];
    console.log(storedItem, 'storedItem -------------');
    if (!storedItem) {
      storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
      console.log(storedItem, '!stored item --------------------');
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };

  this.generateArray = function() {
    var arr = [];
    for (var id in this.items) {
      console.log(this.items, 'this.items------------------------');
      arr.push(this.items[id]);
    }
    return arr;
  };
};
