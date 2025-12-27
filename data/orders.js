




export const orders = JSON.parse(localStorage.getItem('orders')) || [];

function saveToLocale() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function addOrder(order) {
    orders.unshift(order);
    saveToLocale();
}

export function deleteOrder(orderId) {
    const newOrders = orders.filter((order) => order.id !== orderId);
    orders.length = 0; // Clear the original array
    orders.push(...newOrders); // Push filtered items back
    saveToLocale();
}
