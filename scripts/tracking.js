import { getProduct, loadProductsFetch } from '../data/products.js';
import { orders } from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadPage() {
    await loadProductsFetch();

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const order = orders.find(o => o.id === orderId);
    const product = getProduct(productId);

    // Bu siparişteki bu ürünün detaylarını bulalım
    let productDetails;
    if (order) {
        productDetails = order.products.find(p => p.productId === productId);
    }

    if (!order || !product || !productDetails) {
        document.querySelector('.order-tracking').innerHTML = 'Order or Product not found!';
        return;
    }

    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
    const dateString = deliveryTime.format('dddd, MMMM D');

    const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${dateString}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;

    document.querySelector('.order-tracking').innerHTML = trackingHTML;
}

loadPage();
