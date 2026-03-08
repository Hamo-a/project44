
// products 
const productsContainer = document.getElementById("products-container");
const totalPriceEl = document.getElementById("total_price");

// No products
if (basket.length === 0) {
    alert("Your wishlist is empty");
    window.location = "index.html";
} else {
    renderAllProducts(basket);
}

function renderAllProducts(products) {

    let totalPrice = 0;

    productsContainer.innerHTML = products.map(product => {

        const itemTotal = product.price * product.quantity;
        totalPrice += itemTotal;

        return `
            <div class="col-12 col-md-6 col-lg-6">
                <div class="card plant-card d-flex flex-row justify-content-between " data-id="${product.id}">
                    <div class="card-img-container  h-100 p-2" style="width: 45%">
                        <img src="${product.img}" class="card-img object-fit-cover h-100 w-100">
                    </div>
                    <div class="card-body d-flex flex-column gap-1">
                        <h5>${product.title}</h5>
                        <p class="wishlist fw-bold">category: 
                        <span class="badge badge-${product.category.toLowerCase()}">${product.category}</span>
                        </p>
                        <p class="fw-bold">
                            product total: 
                            <span class="text-success">$${itemTotal}</span>
                        </p>
                        <div class="wishlist_btns mt-auto">
                            <div class="digital">
                                <button onclick="changeQuantity(this, -1)">-</button>
                                    <span class="digital-numder">${product.quantity}</span>
                                <button onclick="changeQuantity(this, 1)">+</button>
                            </div>
                            <button class="btn btn-success add-to-basket added " onclick="removeFromWishlist(this)">
                                <i class="fas fa-shopping-basket basket-icon"></i>
                                <span>Remove from Basket</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    totalPriceEl.textContent = `$${totalPrice}`;
}

function removeFromWishlist(btn) {
    btn.classList.add("added");

    const card = btn.closest("[data-id]");
    const id = Number(card.dataset.id);

    basket = basket.filter(p => p.id !== id);
    saveBasket();
    updateBasketCount();
    renderAllProducts(basket);
}

// favorites

const cards = [
    { id: 1, title: "Basil", category: "Aromatic", price: 10, img: "assets/imgs/plants/Aromatic/Basil.jpg" },
    { id: 2, title: "Aloe Vera", category: "Medicinal", price: 15, img: "assets/imgs/plants/Medicinal/Aloe Vera.jpg" },
    { id: 3, title: "Ficus", category: "Ornamental", price: 20, img: "assets/imgs/plants/Ornamental/Ficus.jpg" },
    { id: 4, title: "Mint", category: "Aromatic", price: 9, img: "assets/imgs/plants/Aromatic/Mint.jpg" },
    { id: 5, title: "Chamomile", category: "Medicinal", price: 13, img: "assets/imgs/plants/Medicinal/Chamomile.jpg" },
    { id: 6, title: "Monstera", category: "Ornamental", price: 22, img: "assets/imgs/plants/Ornamental/Monstera.jpg" },
    { id: 7, title: "Rosemary", category: "Aromatic", price: 11, img: "assets/imgs/plants/Aromatic/Rosemary.jpg" },
    { id: 8, title: "Ginger", category: "Medicinal", price: 12, img: "assets/imgs/plants/Medicinal/Ginger Leaves.jpg" },
    { id: 9, title: "Snake Plant", category: "Ornamental", price: 19, img: "assets/imgs/plants/Ornamental/Snake Plant.jpg" },
];
let favCon = document.querySelector("#favourite-container");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length === 0) {
    alert("Your wishlist is empty");
    window.location = "index.html";
} else {
    renderAllFavorites(favorites);
}

function renderAllFavorites(){
    let favproducts = cards.filter( card =>
        favorites.includes(card.id)
    );

    favCon.innerHTML = favproducts.map(product => `
        <div class="col-12 col-md-4 col-lg-3">
            <div class="card plant-card text-center h-100" data-id="${product.id}">
                <!-- Image -->
                <img src="${product.img}" 
                class="card-img-top object-fit-cover"
                style="height: 200px;">
                <!-- Body -->
                <div class="card-body d-flex flex-column">
                    <!-- Title -->
                    <h5 class="fw-bold">${product.title}</h5>
                    <!-- Category -->
                    <span class="badge badge-${product.category.toLowerCase()} mb-3">
                        ${product.category}
                    </span>
                    <!-- Heart Button -->
                    <button class="btn mt-auto remove-fav-btn"
                        onclick="removeFromFavorites(this)">
                        <i class="fa-solid fa-heart text-danger fs-5"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

function removeFromFavorites(btn) {
    const card = btn.closest("[data-id]");
    const id = Number(card.dataset.id);

    favorites = favorites.filter(p => p !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderAllFavorites();
}