import { cart, addToCart } from "../data/cart.js";
import { loadProductsFetch, products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


document.querySelector('.js-products-grid').innerHTML = '<h2>Loading products...</h2>';

loadProductsFetch().then(() => {
    renderProductsGrid();
});

function renderProductsGrid() {
    let productsHTML = '';

    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');

    let filteredProducts = products;
    if (search) {
        filteredProducts = products.filter((product) => {
            // Case insensitive search
            let matchingKeyword = false;
            product.keywords.forEach((keyword) => {
                if (keyword.toLowerCase().includes(search.toLowerCase())) {
                    matchingKeyword = true;
                }
            })
            return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
        });
    }

    filteredProducts.forEach((product) => {

        productsHTML += `<div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src=${product.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
    ${product.name}          
    </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
                <select class="js-product-quantity" >
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}" >
                Add to Cart
            </button>
            </div>`
    })

    document.querySelector('.js-products-grid').innerHTML = productsHTML


    function updateCartQuantity() {
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;
    }

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const { productId } = button.dataset;
            const container = button.closest('.product-container');
            const quantitySelector = container.querySelector('.js-product-quantity');
            const quantity = Number(quantitySelector.value);

            addToCart(productId, quantity);
            updateCartQuantity();
        })
    })

    updateCartQuantity();
}

document.querySelector('.search-button').addEventListener('click', () => {
    const search = document.querySelector('.search-bar').value;
    window.location.href = `index.html?search=${search}`;
});

// Allow pressing "Enter" in the search bar
document.querySelector('.search-bar').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const search = document.querySelector('.search-bar').value;
        window.location.href = `index.html?search=${search}`;
    }
});