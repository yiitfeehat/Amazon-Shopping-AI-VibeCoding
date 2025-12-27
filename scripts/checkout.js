import { loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

async function loadPage() {
    await loadProductsFetch();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();