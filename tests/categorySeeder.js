const Category = require('../server/models/category');
const mongoose = require('mongoose');
const {mongoURI} = require('./config')

try {
  mongoose.connect(
    mongoURI,
    { useNewUrlParser: true }
  );
  console.log('connected');
} catch (error) {
  console.log(error);
}

const categories = [
  new Category({
    id: '1',
    name: 'Apple',
  }),
  new Category({
    id: '2',
    name: 'Samsung',
  }),
  new Category({
    id: '3',
    name: 'Htc',
  }),
  new Category({
    id: '4',
    name: 'Lenovo',
  }),
  new Category({
    id: '5',
    name: 'Microsoft',
  }),
];

let done = 0;
let length = categories.length;
categories.forEach(element => {
  element.save((err, result) => {
    done++;
    console.log(element, 'inserted')
    if (done === length) {
      exit();
    }
  });
});

function exit() {
  mongoose.disconnect();
  console.log('done');
}
