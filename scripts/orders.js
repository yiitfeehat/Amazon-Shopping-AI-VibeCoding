import { orders, deleteOrder } from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

async function loadPage() {
  document.querySelector('.orders-grid').innerHTML = '<h2>Loading orders...</h2>';

  await loadProductsFetch();

  let ordersHTML = '';

  orders.forEach((order) => {

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.orderTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
             <button class="track-package-button button-secondary js-delete-order" data-order-id="${order.id}" style="margin-top: 10px; background-color: #dc3545; color: white; border: none;">Delete Order</button>
          </div>
        </div>
        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
    `;
  });

  document.querySelector('.orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-delete-order').forEach((button) => {
    button.addEventListener('click', () => {
      const orderId = button.dataset.orderId;
      deleteOrder(orderId);
      loadPage(); // Re-render the page
    })
  })
}
loadPage();


function productsListHTML(order) {
  let productsHTML = '';

  order.products.forEach((productDetails) => {
    const product = getProduct(productDetails.productId)

    productsHTML += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>
      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${productDetails.estimatedDeliveryTime}
        </div>
        <div class="product-quantity">
          Quantity: ${productDetails.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>
      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });
  return productsHTML;
}