
/* Flower Shop Product Data */
const flowers = [
    {
        id: 1,
        name: "Pink Rose Bouquet",
        category: "roses",
        price: 799,
        description: "Beautiful pink roses for special moments.",
        image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Red Rose Bouquet",
        category: "roses",
        price: 999,
        description: "Classic red roses filled with love.",
        image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Pink Tulip Bouquet",
        category: "tulips",
        price: 699,
        description: "Elegant tulips for a lovely surprise.",
        image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "White Lily Bouquet",
        category: "lilies",
        price: 899,
        description: "Graceful lilies for every occasion.",
        image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Garden Flower Mix",
        category: "mixed",
        price: 1099,
        description: "A colorful mix of seasonal flowers.",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Sunny Yellow Flowers",
        category: "mixed",
        price: 749,
        description: "Bright flowers to spread happiness.",
        image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Purple Tulip Bouquet",
        category: "tulips",
        price: 849,
        description: "Charming blooms with a lovely touch.",
        image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Elegant Lily Bouquet",
        category: "lilies",
        price: 1199,
        description: "A thoughtful gift for someone special.",
        image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80"
    }
];

// Shopping Cart
let cart = [];

// HTML Elements
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const emptyMessage = document.getElementById("emptyMessage");

// Format prices in Indian Rupees
function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

// Display Products
function displayProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredFlowers = flowers.filter(function (flower) {
        const matchesName = flower.name.toLowerCase().includes(searchText);
        const matchesCategory =
            selectedCategory === "all" ||
            flower.category === selectedCategory;

        return matchesName && matchesCategory;
    });

    productGrid.innerHTML = "";

    emptyMessage.hidden = filteredFlowers.length !== 0;

    filteredFlowers.forEach(function (flower) {
        const card = document.createElement("article");
        card.className = "product-card";

        const image = document.createElement("img");
        image.src = flower.image;
        image.alt = flower.name;
        image.loading = "lazy";

        // Show a placeholder if an image cannot load
        image.onerror = function () {
            image.onerror = null;
            image.removeAttribute("src");
            image.alt = flower.name + " image unavailable";
        };

        const info = document.createElement("div");
        info.className = "product-info";

        const title = document.createElement("h3");
        title.textContent = flower.name;

        const description = document.createElement("p");
        description.textContent = flower.description;

        const bottom = document.createElement("div");
        bottom.className = "product-bottom";

        const price = document.createElement("span");
        price.className = "price";
        price.textContent = formatPrice(flower.price);

        const button = document.createElement("button");
        button.className = "add-btn";
        button.textContent = "Add to Cart +";
        button.addEventListener("click", function () {
            addToCart(flower.id);
        });

        bottom.append(price, button);
        info.append(title, description, bottom);
        card.append(image, info);
        productGrid.appendChild(card);
    });
}

// Add Flower to Cart
function addToCart(flowerId) {
    const flower = flowers.find(function (item) {
        return item.id === flowerId;
    });

    const existingItem = cart.find(function (item) {
        return item.id === flowerId;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: flower.id,
            name: flower.name,
            price: flower.price,
            quantity: 1
        });
    }

    updateCart();
}

// Remove One Flower from Cart
function removeFromCart(flowerId) {
    const item = cart.find(function (product) {
        return product.id === flowerId;
    });

    if (item) {
        item.quantity--;

        if (item.quantity <= 0) {
            cart = cart.filter(function (product) {
                return product.id !== flowerId;
            });
        }
    }

    updateCart();
}

// Update Cart Display and Total
function updateCart() {
    cartItems.innerHTML = "";

    const totalQuantity = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    const totalPrice = cart.reduce(function (total, item) {
        return total + item.price * item.quantity;
    }, 0);

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = formatPrice(totalPrice);

    if (cart.length === 0) {
        cartItems.textContent =
            "Your cart is empty. Add some beautiful flowers!";
        return;
    }

    cart.forEach(function (item) {
        const row = document.createElement("div");
        row.className = "cart-row";

        const details = document.createElement("div");

        const name = document.createElement("strong");
        name.textContent = item.name;

        const quantity = document.createElement("p");
        quantity.textContent =
            "Quantity: " + item.quantity +
            " × " + formatPrice(item.price);

        details.append(name, quantity);

        const subtotal = document.createElement("strong");
        subtotal.textContent =
            formatPrice(item.price * item.quantity);

        const removeButton = document.createElement("button");
        removeButton.textContent = "− Remove";
        removeButton.setAttribute(
            "aria-label",
            "Remove one " + item.name
        );

        removeButton.addEventListener("click", function () {
            removeFromCart(item.id);
        });

        row.append(details, subtotal, removeButton);
        cartItems.appendChild(row);
    });
}

// Search Flowers
searchInput.addEventListener("input", displayProducts);

// Filter by Category
categoryFilter.addEventListener("change", displayProducts);

// Open Shopping Cart
document.getElementById("cartButton").addEventListener("click", function () {
    document.getElementById("cart").scrollIntoView({
        behavior: "smooth"
    });
});

// Checkout Demo
document.getElementById("checkoutButton").addEventListener(
    "click",
    function () {
        if (cart.length === 0) {
            alert("Your cart is empty! Please add flowers first.");
            return;
        }

        const total = cart.reduce(function (sum, item) {
            return sum + item.price * item.quantity;
        }, 0);

        alert(
            "Thank you for shopping with Bloom & Blossom! 🌸\n\n" +
            "Your order total is " + formatPrice(total) +
            ".\n\nThis is a university project demo. " +
            "No real order or payment has been processed."
        );
    }
);

// Initial Display
displayProducts();
updateCart();
