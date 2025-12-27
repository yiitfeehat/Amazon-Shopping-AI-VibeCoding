export class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

        if (!this.cartItems) {
            this.cartItems = [];
        }
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId, quantity) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    }

    deleteFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if (!matchingItem) {
            return;
        }

        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }

    getQuantity() {
        return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    resetCart() {
        this.cartItems = [];
        this.saveToStorage();
    }

}

export const cart = new Cart('cart');

// Bridge functions for backward compatibility (adapters)
// These verify that the Class implementation works with existing imports
export function addToCart(productId, quantity) {
    cart.addToCart(productId, quantity);
}

export function deleteFromCart(productId) {
    cart.deleteFromCart(productId);
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    cart.updateDeliveryOption(productId, deliveryOptionId);
}
export function resetCart() {
    cart.resetCart();
}