export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [];
}

function saveCartToLocale() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToCart(productId, quantity) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        })
    }
    saveCartToLocale();
}


export function deleteFromCart(productId) {
    let newCart = [];

    cart.forEach((item) => {
        if (item.productId !== productId) {
            newCart.push(item);
        }
    })

    cart = newCart;
    saveCartToLocale();


}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        matchingItem.deliveryOptionId = deliveryOptionId;

        }

    });

    saveCartToLocale();
}

export function resetCart(){
    cart = [];
    saveCartToLocale();
}