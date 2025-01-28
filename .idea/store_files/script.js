
const searchInput = document.getElementById('search');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const applyFiltersButton = document.getElementById('apply-filters');
const productsSection = document.getElementById('products');

const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 800, image: 'laptop.jpg' },
    { id: 2, name: 'T-Shirt', category: 'clothing', price: 20, image: 'tshirt.jpg' },
    { id: 3, name: 'Coffee Maker', category: 'home', price: 100, image: 'coffeemaker.jpg' },
    { id: 4, name: 'Smartphone', category: 'electronics', price: 600, image: 'smartphone.jpg' },
    { id: 5, name: 'Jeans', category: 'clothing', price: 50, image: 'jeans.jpg' },
];

function displayProducts(filteredProducts) {
    productsSection.innerHTML = '';
    if (filteredProducts.length === 0) {
        productsSection.innerHTML = '<p>No products found.</p>';
        return;
    }
    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product__image">
            <h3 class="product__title">${product.name}</h3>
            <p class="product__price">$${product.price}</p>
        `;
        productsSection.appendChild(productDiv);
    });
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = document.getElementById('category').value;
    const maxPrice = parseInt(priceRange.value);

    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesPrice = product.price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    displayProducts(filtered);
}

searchInput.addEventListener('input', filterProducts);
priceRange.addEventListener('input', () => {
    priceValue.textContent = `$0 - $${priceRange.value}`;
    filterProducts();
});
applyFiltersButton.addEventListener('click', filterProducts);


displayProducts(products);
