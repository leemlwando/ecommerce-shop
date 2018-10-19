const Product = require('../server/models/product');
const mongoose = require('mongoose');
const { mongoURI } = require('./config');

try {
  mongoose.connect(
    mongoURI,
    { useNewUrlParser: true }
  );
  console.log('connected');
} catch (error) {
  console.log(error);
}

const products = [
  new Product({
    categoryId: '1',
    name: 'Apple iPhone 5c',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies lorem odio, at laoreet tellus sodales in. Nullam maximus eros ut tortor ultricies rutrum. Aliquam euismod lacus non est egesta',
    price: 823,
    image: '/uploads/iphone5c-selection-hero-2013.png',
    cpu: '1.3GHz Apple A6',
    camera: '8mp (3264x2448)',
    size: '124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)',
    weight: '132 grams (4.7 ounces) with battery',
    display: '4.0 326 pixel density',
    battery: '1480 mAh',
    memory: '16GB, 32GB and RAM 1 GB'
  }),
  new Product({
    categoryId: '1',
    name: 'Apple iPhone 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies lorem odio, at laoreet tellus sodales in. Nullam maximus eros ut tortor ultricies rutrum. Aliquam euismod lacus non est egesta',
    price: 953,
    image: '/uploads/51u6y9Rm8QL._SY300_.jpg',
    cpu: '1.3GHz Apple A6',
    camera: '8mp (3264x2448)',
    size: '124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)',
    weight: '132 grams (4.7 ounces) with battery',
    display: '4.0 326 pixel density',
    battery: '1480 mAh',
    memory: '16GB, 32GB and RAM 1 GB'
  }),
  new Product({
    categoryId: '4',
    name: 'Lenovo A6000',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies lorem odio, at laoreet tellus sodales in. Nullam maximus eros ut tortor ultricies rutrum. Aliquam euismod lacus non est egesta',
    price: 764,
    image: '/uploads/_35%20(1).JPG',
    cpu: '1.3GHz Apple A6',
    camera: '8mp (3264x2448)',
    size: '124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)',
    weight: '132 grams (4.7 ounces) with battery',
    display: '4.0 326 pixel density',
    battery: '1480 mAh',
    memory: '16GB, 32GB and RAM 1 GB'
  }),
  new Product({
    categoryId: '5',
    name: 'Nokia Lumia 1520',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies lorem odio, at laoreet tellus sodales in. Nullam maximus eros ut tortor ultricies rutrum. Aliquam euismod lacus non est egesta',
    price: 674,
    image: '/uploads/Lumia1520-Front-Back-png.png',
    cpu: '1.3GHz Apple A6',
    camera: '8mp (3264x2448)',
    size: '124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)',
    weight: '132 grams (4.7 ounces) with battery',
    display: '4.0 326 pixel density',
    battery: '1480 mAh',
    memory: '16GB, 32GB and RAM 1 GB'
  }),
  new Product({
    categoryId: '3',
    name: 'HTC One',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies lorem odio, at laoreet tellus sodales in. Nullam maximus eros ut tortor ultricies rutrum. Aliquam euismod lacus non est egesta',
    price: 674,
    image: '/uploads/htc-one-m7-802w-dual-sim-silver.jpg',
    cpu: '1.3GHz Apple A6',
    camera: '8mp (3264x2448)',
    size: '124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)',
    weight: '132 grams (4.7 ounces) with battery',
    display: '4.0 326 pixel density',
    battery: '1480 mAh',
    memory: '16GB, 32GB and RAM 1 GB'
  }),
  new Product({
    categoryId: '2',
    name: 'Samsung Galaxy S6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies lorem odio, at laoreet tellus sodales in. Nullam maximus eros ut tortor ultricies rutrum. Aliquam euismod lacus non est egesta',
    price: 674,
    image: '/uploads/Agnes_Case_for_Samsung_Galaxy_S6_(1)__92643_thumb.jpg',
    cpu: '1.3GHz Apple A6',
    camera: '8mp (3264x2448)',
    size: '124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)',
    weight: '132 grams (4.7 ounces) with battery',
    display: '4.0 326 pixel density',
    battery: '1480 mAh',
    memory: '16GB, 32GB and RAM 1 GB'
  })
];

let done = 0;
let length = products.length;
products.forEach(element => {
  element.save((err, result) => {
    done++;
    if (done === length) {
      exit();
    }
  });
});

function exit() {
  mongoose.disconnect();
  console.log('done');
}
