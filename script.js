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
const products = [
    {
        id: 1,
        name: "18-inch Frontal Wig",
        description: "Natural hairline, versatile styling",
        price: 89.99,
        image: "WigImages/18-inch frontal wig.JPG",
        category: "Lace Front Wigs"
    },
    {
        id: 2, 
        name: "12-inch Curly Frontal Wig",
        description: "Bouncy curls, natural look",
        price: 79.99,
        image: "WigImages/12-inch curly frontal wig.JPG",
        category: "Lace Front Wigs"
    },
    {
        id: 3,
        name: "24-inch Curly Frontal Wig",
        description: "Long curly hair with natural part",
        price: 99.99,
        image: "WigImages/24-inch curly frontal wig.JPG",
        category: "Lace Front Wigs"
    },
    {
        id: 4,
        name: "4x4 Curly Lace Frontal Wig",
        description: "Medium length with lace closure",
        price: 85.99,
        image: "WigImages/4x4 curly lace frontal wig.JPG",
        category: "Lace Front Wigs"
    },
    {
        id: 5,
        name: "13x4 Curly Full Lace Frontal Wig",
        description: "Full lace with deep curly pattern",
        price: 119.99,
        image: "WigImages/13x4 Curly Full Lace Frontal Wig.JPG",
        category: "Full Lace Wigs"
    },
    {
        id: 6,
        name: "13x6 Curly Full Lace Frontal Wig",
        description: "Extra wide part with curly texture",
        price: 129.99,
        image: "WigImages/13x6 Curly Full Lace Frontal Wig.JPG",
        category: "Full Lace Wigs"
    },
    {
        id: 7,
        name: "13x4 Straight Bob Lace Wig",
        description: "Sleek straight bob style",
        price: 109.99,
        image: "WigImages/13x4 Straight Bob Lace Wig.JPG",
        category: "Full Lace Wigs"
    },
    {
        id: 8,
        name: "4x4 Straight Bob Lace Wig",
        description: "Short bob with lace closure",
        price: 89.99,
        image: "WigImages/4x4 Straight Bob Lace Wig.JPG",
        category: "Full Lace Wigs"
    },
    {
        id: 9,
        name: "13x6 Straight Synthetic Lace Front Wig",
        description: "Affordable straight style",
        price: 69.99,
        image: "WigImages/13x6 straight synthetic lace front wig.JPG",
        category: "Synthetic Wigs"
    },
    {
        id: 10,
        name: "24-inch Straight Lace Frontal Wig",
        description: "Long straight hair with natural part",
        price: 89.99,
        image: "WigImages/24-inch straight lace frontal wig.JPG",
        category: "Synthetic Wigs"
    },
    {
        id: 11,
        name: "Curly Synthetic Frontal Wig",
        description: "Budget-friendly curly option",
        price: 59.99,
        image: "WigImages/curly synthetic frontal wig.JPG",
        category: "Synthetic Wigs"
    },
    {
        id: 12,
        name: "4x4 Lace Closure Short Straight Bob",
        description: "Short bob with synthetic fibers",
        price: 65.99,
        image: "WigImages/4x4 Lace Closure Short Straight Bob Lace Wig.JPG",
        category: "Synthetic Wigs"
    }
];
