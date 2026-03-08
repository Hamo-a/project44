// Read basket
let basket = JSON.parse(localStorage.getItem("basket")) || [];

// Save basket
function saveBasket() {
    localStorage.setItem("basket", JSON.stringify(basket));
}

// Update counter safely
function updateBasketCount() {
    const numberProducts = document.querySelector(".number_plants");
    if (!numberProducts) return; // مهم جدًا

    const total = basket.reduce((sum, item) => sum + item.quantity, 0);

    if (total > 0) {
        numberProducts.textContent = total;
        numberProducts.style.display = "block";
    } else {
        numberProducts.style.display = "none";
    }
}

// Generic quantity change
function changeQuantity(btn, step) {

    const card = btn.closest("[data-id]");
    if (!card) return;

    const id = Number(card.dataset.id);
    const product = basket.find(p => p.id === id);
    if (!product) return;

    product.quantity += step;

    if (product.quantity < 1) {
        const index = basket.findIndex(p => p.id === id);
        if (index !== -1) basket.splice(index, 1);
        card.remove();
    } else {
        const quantitySpan = card.querySelector(".digital-numder");
        if (quantitySpan) {
            quantitySpan.textContent = product.quantity;
        }
    }

    saveBasket();
    updateBasketCount();

    // renderAllProducts(basket);

}
// شغل العداد أول ما الصفحة تفتح
updateBasketCount();