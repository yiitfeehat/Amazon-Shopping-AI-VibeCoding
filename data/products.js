
export function getProduct(productId) {
  const matchingProduct = products.find(product => product.id === productId);
  return matchingProduct;
}

export let products = [];

export async function loadProductsFetch() {
  return fetch('https://supersimplebackend.dev/products')
    .then((res) => {
      return res.json();
    })
    .then((productsData) => {
      products = productsData.map((productDetails) => {
        return productDetails;
      });
      console.log('ürünler yüklendi');
    })
}