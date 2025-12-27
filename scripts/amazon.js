import { cart, addToCart } from "../data/cart.js";
import { loadProductsFetch, products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { renderProductCard } from "./view/productView.js";


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

        productsHTML += renderProductCard(product);
    })

    document.querySelector('.js-products-grid').innerHTML = productsHTML


    function updateCartQuantity() {
        const totalQuantity = cart.getQuantity();
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