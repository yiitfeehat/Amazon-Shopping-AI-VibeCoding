import { cart, resetCart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


export function renderPaymentSummary() {

  let totalItemsPriceCents = 0;
  let totalShippingPriceCents = 0;
  let totalBeforeTaxPriceCents = 0;
  let totalTaxCents = 0;
  let totalOrderPriceCents = 0;
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    totalItemsPriceCents += product.priceCents * cartItem.quantity;
    totalShippingPriceCents += (getDeliveryOption(cartItem.deliveryOptionId).priceCents);
    cartQuantity += cartItem.quantity;
  })

  totalBeforeTaxPriceCents = totalItemsPriceCents + totalShippingPriceCents;
  totalTaxCents = totalBeforeTaxPriceCents * 0.1;
  totalOrderPriceCents = totalTaxCents + totalBeforeTaxPriceCents;

  if (cartQuantity === 0) {
    document.querySelector('.js-payment-summary').innerHTML = `
        <div class="payment-summary-title">
          Order Summary
        </div>
        <div style="text-align: center; margin-top: 20px;">
            Your cart is empty. <br>
            <a href="index.html" class="link-primary">View products</a>
        </div>
     `;
    return; // Stop execution
  }

  document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;

  document.querySelector('.js-payment-summary').innerHTML = `
        <div class="payment-summary-title">
          Order Summary
        </div>
        
        <!-- CHECKOUT FORM -->
        <div class="payment-summary-row" style="display: block;">
            <div style="margin-bottom: 15px; font-weight: 700; font-size: 16px;">Payment Details</div>
            
            <div style="margin-bottom: 5px; font-size: 14px;">Name on Card:</div>
            <input class="js-name-input" type="text" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #D5D9D9; border-radius: 8px;" placeholder="John Doe">
            
            <div style="margin-bottom: 5px; font-size: 14px;">Card Number:</div>
            <input class="js-card-number-input" type="text" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #D5D9D9; border-radius: 8px;" placeholder="0000 0000 0000 0000">

            <div style="display: flex; gap: 10px;">
                <div style="flex: 2;">
                    <div style="margin-bottom: 5px; font-size: 14px;">Expiration Date:</div>
                    <input class="js-expiry-input" type="text" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #D5D9D9; border-radius: 8px;" placeholder="MM/YY">
                </div>
                <div style="flex: 1;">
                    <div style="margin-bottom: 5px; font-size: 14px;">CVV:</div>
                    <input class="js-cvv-input" type="text" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #D5D9D9; border-radius: 8px;" placeholder="123">
                </div>
            </div>
            
            <div style="margin-bottom: 5px; font-size: 14px;">Address:</div>
            <input class="js-address-input" type="text" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #D5D9D9; border-radius: 8px;" placeholder="123 Main St">
        </div>
        <hr style="border: 0; border-top: 1px solid #D5D9D9; margin: 20px 0;">

        <div class="payment-summary-row">
          <div>Items (${cartQuantity}):</div>
          <div class="payment-summary-money JSpayment-summary-money">$${formatCurrency(totalItemsPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(totalShippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(totalTaxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(totalOrderPriceCents)}</div>
        </div>

        <button class="place-order-button js-place-order-button button-primary">
          Place your order
        </button>
    `



  document.querySelector('.js-place-order-button').addEventListener('click', async () => {

    // VALIDATION
    const nameInput = document.querySelector('.js-name-input').value;
    const addressInput = document.querySelector('.js-address-input').value;

    if (!nameInput || !addressInput) {
      alert('Please fill in your Name and Address to complete the order.');
      return;
    }

    const today = dayjs();

    const order = {
      id: crypto.randomUUID(),
      orderTime: today.format('MMMM D'),
      totalCostCents: totalOrderPriceCents,
      products: cart.map(cartItem => {
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

        return {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          estimatedDeliveryTime: deliveryDate.format('MMMM D')
        }
      })
    };

    addOrder(order);
    window.location.href = 'orders.html'
    resetCart();


  })
}

