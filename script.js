<script>
        const hamburgerBtn = document.getElementById("hamburger-btn");
        const mobileMenu = document.getElementById("mobile-menu");
        const closeMenuBtn = document.getElementById("close-menu-btn");
        const mobileMenuLinks = mobileMenu.querySelectorAll("a");
        const navLinks = document.querySelectorAll('header nav a');
        const sections = document.querySelectorAll('section');

        function toggleMobileMenu() {
            mobileMenu.classList.toggle("hidden");
        }

        hamburgerBtn.addEventListener("click", toggleMobileMenu);
        closeMenuBtn.addEventListener("click", toggleMobileMenu);
        mobileMenuLinks.forEach(link => {
            link.addEventListener("click", toggleMobileMenu);
        });

        document.addEventListener('click', (event) => {
            if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && event.target !== hamburgerBtn) {
                toggleMobileMenu();
            }
        });

        function updateActiveNavLink() {
            let currentSectionId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === currentSectionId) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNavLink);

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });


        function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSummary = document.getElementById('cart-summary');

    // Clear existing content
    cartItemsContainer.innerHTML = '';
    if (cartSummary) cartSummary.remove();

    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        document.getElementById('cart-counter').classList.add('hidden');
        return;
    }

    emptyCartMessage.classList.add('hidden');

    // Render each cart item with improved structure
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="flex items-center">
                <img src="${item.image}" alt="${item.name}" 
                    class="w-16 h-16 object-cover rounded-lg border border-gray-200">
                <div class="ml-4">
                    <h3 class="font-medium text-gray-800">${item.name}</h3>
                    <p class="text-sm text-gray-500 mt-1">${item.description}</p>
                    <p class="text-pink-600 font-medium mt-1">P${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="flex items-center justify-between md:justify-end">
                <div class="flex items-center mr-4">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" 
                        class="quantity-btn ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}" 
                        ${item.quantity <= 1 ? 'disabled' : ''}>
                        −
                    </button>
                    <span class="mx-3 w-8 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="quantity-btn">
                        +
                    </button>
                </div>
                <div class="font-medium text-gray-800 min-w-[80px] text-right">
                    P${(item.price * item.quantity).toFixed(2)}
                </div>
                <button onclick="removeItem(${item.id})" 
                    class="ml-4 text-red-500 hover:text-red-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Calculate cart totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    // Render enhanced cart summary
    const summaryDiv = document.createElement('div');
    summaryDiv.id = 'cart-summary';
    summaryDiv.className = 'mt-8 border-t border-gray-200 pt-6';
    summaryDiv.innerHTML = `
        <div class="space-y-3">
            <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">$${subtotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span class="font-medium">${shipping === 0 ? 'FREE' : '$'+shipping.toFixed(2)}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Tax (8%)</span>
                <span class="font-medium">$${tax.toFixed(2)}</span>
            </div>
            <div class="flex justify-between border-t border-gray-200 pt-3 mt-3">
                <span class="text-lg font-semibold">Total</span>
                <span class="text-lg font-semibold">$${total.toFixed(2)}</span>
            </div>
        </div>
        <div class="mt-6 space-y-3">
            <button onclick="checkout()" 
                class="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg transition-colors">
                Proceed to Checkout
            </button>
            <a href="#shop" 
                class="block text-center text-pink-600 hover:text-pink-700 font-medium py-2">
                Continue Shopping
            </a>
        </div>
    `;
    cartItemsContainer.after(summaryDiv);
}

// Enhanced Checkout Function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Create a modal for checkout confirmation
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full p-6 animate-pop-in">
            <h3 class="text-xl font-semibold mb-4">Confirm Checkout</h3>
            <p class="text-gray-600 mb-6">You're about to purchase ${cart.reduce((sum, item) => sum + item.quantity, 0)} 
                item(s) for a total of P${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</p>
            <div class="flex space-x-4">
                <button onclick="this.closest('div').remove()" 
                    class="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                    Cancel
                </button>
                <button onclick="processCheckout()" 
                    class="flex-1 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">
                    Confirm
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

    function processCheckout() {
    // In a real implementation, you would:
    // 1. Process payment
    // 2. Create an order
    // 3. Clear the cart
    // 4. Redirect to confirmation page
    
    // For demo purposes:
        showNotification('Order placed successfully!', 'success');
        cart = [];
        updateCartStorage();
        renderCart();
        updateCartCounter();
    
    // Remove modal
        document.querySelector('.fixed.inset-0').remove();
    
    // In real implementation:
    // window.location.href = '/order-confirmation?id=123';
}

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
        price: P2700,
        image: "WigImages/18-inch frontal wig.JPG",
        category: "Lace Front Wigs"
    },
    {
        id: 2, 
        name: "12-inch Curly Frontal Wig",
        description: "Bouncy curls, natural look",
        price: P2100,
        image: "WigImages/12-inch curly frontal wig.JPG",
        category: "Lace Front Wigs"
    },
    {
        id: 3,
        name: "24-inch Curly Frontal Wig",
        description: "Long curly hair with natural part",
        price: P2400,
        image: "WigImages/24-inch curly frontal wig.JPG",
        category: "Lace Front Wigs"
    },
    {
        id: 4,
        name: "4x4 Curly Lace Frontal Wig",
        description: "Medium length with lace closure",
        price: P2600,
        image: "WigImages/4x4 curly lace frontal wig.JPG",
        category: "Lace Front Wigs"
    },
    {
        id: 5,
        name: "13x4 Curly Full Lace Frontal Wig",
        description: "Full lace with deep curly pattern",
        price: P3500,
        image: "WigImages/13x4 Curly Full Lace Frontal Wig.JPG",
        category: "Full Lace Wigs"
    },
    {
        id: 6,
        name: "13x6 Curly Full Lace Frontal Wig",
        description: "Extra wide part with curly texture",
        price: P1900,
        image: "WigImages/13x6 Curly Full Lace Frontal Wig.JPG",
        category: "Full Lace Wigs"
    },
    {
        id: 7,
        name: "13x4 Straight Bob Lace Wig",
        description: "Sleek straight bob style",
        price: P3200,
        image: "WigImages/13x4 Straight Bob Lace Wig.JPG",
        category: "Full Lace Wigs"
    },
    {
        id: 8,
        name: "4x4 Straight Bob Lace Wig",
        description: "Short bob with lace closure",
        price: P2500,
        image: "WigImages/4x4 Straight Bob Lace Wig.JPG",
        category: "Full Lace Wigs"
    },
    {
        id: 9,
        name: "13x6 Straight Synthetic Lace Front Wig",
        description: "Affordable straight style",
        price: P2200,
        image: "WigImages/13x6 straight synthetic lace front wig.JPG",
        category: "Synthetic Wigs"
    },
    {
        id: 10,
        name: "24-inch Straight Lace Frontal Wig",
        description: "Long straight hair with natural part",
        price: P3000,
        image: "WigImages/24-inch straight lace frontal wig.JPG",
        category: "Synthetic Wigs"
    },
    {
        id: 11,
        name: "Curly Synthetic Frontal Wig",
        description: "Budget-friendly curly option",
        price: P2800,
        image: "WigImages/curly synthetic frontal wig.JPG",
        category: "Synthetic Wigs"
    },
    {
        id: 12,
        name: "4x4 Lace Closure Short Straight Bob",
        description: "Short bob with synthetic fibers",
        price: P2500,
        image: "WigImages/4x4 Lace Closure Short Straight Bob Lace Wig.JPG",
        category: "Synthetic Wigs"
    }
];
    // Cart functionality
        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    // Add to Cart Function with Enhanced Features
        function addToCart(productId) {
        const product = products.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found!', 'error');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartStorage();
    renderCart();
    showNotification(`${product.name} added to cart!`, 'success');
    updateCartCounter();
}

// Remove Item from Cart
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartStorage();
    renderCart();
    showNotification('Item removed from cart', 'info');
    updateCartCounter();
}

// Update Quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
        updateCartStorage();
        renderCart();
        updateCartCounter();
    }
}

// Helper Functions
function updateCartStorage() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

function showNotification(message, type = 'success') {
    const types = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    };
    
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${types[type]} text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('animate-fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function updateCartCounter() {
    const counter = document.getElementById('cart-counter');
    if (counter) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        counter.textContent = totalItems;
        counter.classList.toggle('hidden', totalItems === 0);
    }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    updateCartCounter();
    
    // Add animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-fade-out { animation: fadeOut 0.3s ease-in; }
    `;
    document.head.appendChild(style);
});
</script>
