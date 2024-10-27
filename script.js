const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
];

let cart = {};

function renderProducts() {
    const productBox = document.getElementById('productBox');
    productBox.innerHTML = '<h2>Products</h2>';
    Products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <span class="product-name">${product.name}</span>
            <span class="product-price">${product.price}</span>
            <div>
                <button onclick="addToCart(${product.id})">+</button>
                <span>${cart[product.id] || 0}</span>
                <button onclick="removeFromCart(${product.id})">-</button>
            </div>
        `;
        productBox.appendChild(productDiv);
    });
}

function renderCart() {
    const cartBox = document.getElementById('cartBox');
    cartBox.innerHTML = '<h2>Cart</h2>';
    
    if (Object.keys(cart).length === 0) {
        cartBox.innerHTML += '<p>No Product Added to the cart</p>';
        return;
    }

    let total = 0;
    for (const id in cart) {
        const product = Products.find(p => p.id == id);
        const quantity = cart[id];
        total += product.price * quantity;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <span class="cart-item-name">${product.name}</span>
            <span class="cart-item-price">${product.price} x ${quantity}</span>
        `;
        cartBox.appendChild(cartItemDiv);
    }
    cartBox.innerHTML += `<div class="cart-total">Total: ${total}</div>`;
}

function addToCart(productId) {
    if (!cart[productId]) {
        cart[productId] = 0;
    }
    cart[productId]++;
    renderCart();
}

function removeFromCart(productId) {
    if (cart[productId] && cart[productId] > 0) {
        cart[productId]--;
        if (cart[productId] === 0) {
            delete cart[productId];
        }
    }
    renderCart();
}


renderProducts();
renderCart();