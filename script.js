document.addEventListener("DOMContentLoaded", function () {
    const cartLink = document.getElementById("cart-link");
    const backToShopButton = document.getElementById("back-to-shop");
    const cartSection = document.getElementById("cart");
    const shopSections = document.querySelectorAll(".section:not(#cart)");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartButton = document.getElementById("clear-cart");
    const addToCartButtons = document.querySelectorAll(".card button");

    function showCart() {
        cartSection.style.display = "block";
        shopSections.forEach(section => section.style.display = "none");
        loadCart();
    }

    function hideCart() {
        cartSection.style.display = "none";
        shopSections.forEach(section => section.style.display = "block");
    }

    cartLink.addEventListener("click", function (e) {
        e.preventDefault();
        showCart();
    });

    backToShopButton.addEventListener("click", function () {
        hideCart();
    });

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");

                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px;">
                    <span>${item.name} - ${item.price}</span>
                    <button onclick="removeFromCart(${index})">Remove</button>
                `;

                cartItemsContainer.appendChild(cartItem);
                total += parseFloat(item.price.replace("P", ""));
            });
        }

        cartTotal.textContent = `Total: P${total}`;
    }

    window.removeFromCart = function (index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    };

    clearCartButton.addEventListener("click", function () {
        localStorage.removeItem("cart");
        loadCart();
    });

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productCard = this.parentElement;
            const productName = productCard.querySelector("h3").textContent;
            const productPrice = productCard.querySelector("p").textContent;
            const productImg = productCard.querySelector("img").src;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ name: productName, price: productPrice, image: productImg });
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${productName} added to your cart!`);
        });
    });
});
// Initialize cart section
document.addEventListener('DOMContentLoaded', function() {
    const cartSection = document.getElementById('cart');
    if (cartSection) {
        renderCart();
    }
});
