export class Product {
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() { // Formatting logic could live here or remain in utils
    return (this.priceCents / 100).toFixed(2);
  }
}

export let products = [];

export function loadProductsFetch() {
  return fetch('https://supersimplebackend.dev/products')
    .then((res) => {
      return res.json();
    })
    .then((productsData) => {
      products = productsData.map((productDetails) => {
        return new Product(productDetails);
      });
      console.log('Product data loaded');
    });
}
export function getProduct(productId) {
  const matchingProduct = products.find(product => product.id === productId);
  return matchingProduct;
}