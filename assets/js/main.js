// filtersearch
let inputSearch = document.querySelector("#search-input");
let filter = document.querySelector("#filter-type");

inputSearch.addEventListener("input",() => {
    let inputValue = inputSearch.value;
    inputValue = inputValue.trim().toLowerCase();

    if(inputValue === ""){
        renderProducts(cards);
        return;
    }

    let filterType = filter.value;

    let filterproducts = cards.filter( product => {
        if(filterType === "name"){
            return product.title.toLowerCase().includes(inputValue);
        } else if (filterType === "category"){
            return product.category.toLowerCase().includes(inputValue);
        }else if(filterType === "price"){
            const price = Number(inputValue);

            if(isNaN(price)){
                return false;
            }
            return product.price === price;
        }
    });

    renderProducts(filterproducts);
})
//    Slide Bar Toggle
const shopIcon = document.querySelector(".shopping-basket");
const showPlants = document.querySelector(".show_plants");

// toggle sidebar
shopIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    showPlants.classList.toggle("open");
});

// close عند الضغط خارج السلة
document.addEventListener("click", (e) => {

    if (!showPlants.contains(e.target) && !shopIcon.contains(e.target)) {
        showPlants.classList.remove("open");
    }

});

//    Products Data
const productsContainer = document.getElementById("products-container");

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

/* Render Products */
function renderProducts(products) {
    productsContainer.innerHTML = products.map(item => `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card plant-card shadow-sm text-center" data-id="${item.id}">
                <img src="${item.img}" class="card-img-top object-fit-cover">
                <div class="card-body d-flex flex-column gap-2">
                    <span class="badge badge-${item.category.toLowerCase()}">${item.category}</span>
                    <h5>${item.title}</h5>
                    <p>$${item.price}</p>
                    <div class="mt-auto d-flex justify-content-center gap-3">
                        <button class="btn  add-to-wishlist" onclick="favoriteWishlist(this)">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                        <button class="btn btn-success add-to-basket" onclick="toggleBasket(this)">
                            <i class="fas fa-shopping-basket basket-icon"></i>
                            <span>Add to Basket</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}
//   Basket Logic
const show = document.querySelector(".shadow_plants_list");
const numberProducts = document.querySelector(".number_plants");

/* Render products */
renderProducts(cards);

/* Render buttons with basket */
stylebtnwithbasket();

function stylebtnwithbasket() {
    basket.forEach(ele => {
        const card = document.querySelector(`.plant-card[data-id="${ele.id}"]`);
        if (!card) return;

        const btn = card.querySelector(".add-to-basket");
        const text = btn.querySelector("span");

        btn.classList.add("added");
        text.textContent = "Remove from Basket";
    });
}

//  Render basket on load 
basket.forEach(item => renderBasketItem(item));
updateBasketCount();

/* Toggle Add / Remove */
function toggleBasket(button) {
    if (
        !localStorage.getItem("fristName") ||
        !localStorage.getItem("lastName")
    ) {
        alert("Please log in first");
        window.location = "login.html";
        return;
    }

    const card = button.closest(".plant-card");
    const id = Number(card.dataset.id);
    const text = button.querySelector("span");

    const exist = basket.find(p => p.id === id);

    /* Remove */
    if (exist) {
        basket = basket.filter(p => p.id !== id);
        show.querySelector(`[data-id="${id}"]`)?.remove();
        button.classList.remove("added");
        text.textContent = "Add to Basket";
    }
    /* Add */
    else {
        const product = cards.find(p => p.id === id);
        basket.push({ ...product, quantity: 1 });
        renderBasketItem({ ...product, quantity: 1 });
        button.classList.add("added");
        text.textContent = "Remove from Basket";
    }

    saveBasket();
    updateBasketCount();
}

/* Render single basket item */
function renderBasketItem(item) {
    show.innerHTML += `
        <div class="plants_list" data-id="${item.id}">
            <div class="left">
                <h5>${item.title}</h5>
                <div class="digital">
                    <button onclick="changeQuantity(this, -1)">-</button>
                    <span class="digital-numder">${item.quantity}</span>
                    <button onclick="changeQuantity(this, 1)">+</button>
                </div>
            </div>
            <div class="right">
                <h5>Price For One</h5>
                <p>$${item.price}</p>
            </div>
        </div>
    `;
}

// save favorites
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function favoriteWishlist(button){
    const card = button.closest(".plant-card");
    const id = Number(card.dataset.id);

    const exist = favorites.includes(id);

    /* Add */
    if(!exist){
        favorites = [ ...favorites , id ];
        button.classList.add("active");
    }
    /* Remove */
    else{
        favorites = favorites.filter(p => p !== id);
        button.classList.remove("active");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

favorites.forEach( id => {
    const card =  document.querySelector(`.plant-card[data-id="${id}"]`);
    if(!card) return;

    const btn = card.querySelector(".add-to-wishlist");
    btn.classList.add("active");
})

// document.querySelectorAll(".number_plants").length