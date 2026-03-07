// PRODUCTOS - Datos de la tienda
const products = [
    { id: 1, name: "Manzanas Rojas", category: "Frutas", price: 3.99, oldPrice: 5.99, img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop", offer: true },
    { id: 2, name: "Plátanos Orgánicos", category: "Frutas", price: 2.49, oldPrice: 3.49, img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&h=500&fit=crop", offer: true },
    { id: 3, name: "Fresas Frescas", category: "Frutas", price: 4.99, oldPrice: null, img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&h=500&fit=crop", offer: false },
    { id: 4, name: "Naranjas Dulces", category: "Frutas", price: 3.49, oldPrice: 4.99, img: "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop", offer: true },
    { id: 5, name: "Lechuga Romana", category: "Verduras", price: 1.99, oldPrice: null, img: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=500&h=500&fit=crop", offer: false },
    { id: 6, name: "Tomates Cherry", category: "Verduras", price: 3.99, oldPrice: null, img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&h=500&fit=crop", offer: false },
    { id: 7, name: "Zanahorias Baby", category: "Verduras", price: 2.99, oldPrice: 3.99, img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=500&fit=crop", offer: true },
    { id: 8, name: "Brócoli Fresco", category: "Verduras", price: 2.49, oldPrice: null, img: "https://images.unsplash.com/photo-1583663848883-29023c8a55a8?w=500&h=500&fit=crop", offer: false },
    { id: 9, name: "Pechuga de Pollo", category: "Carnes", price: 8.99, oldPrice: 11.99, img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&h=500&fit=crop", offer: true },
    { id: 10, name: "Salmón Fresco", category: "Pescados", price: 12.99, oldPrice: null, img: "https://images.unsplash.com/photo-1519708227418-c8fd9a3a27cc?w=500&h=500&fit=crop", offer: false },
    { id: 11, name: "Leche Entera", category: "Lácteos", price: 3.49, oldPrice: null, img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=500&fit=crop", offer: false },
    { id: 12, name: "Queso Cheddar", category: "Lácteos", price: 5.99, oldPrice: 7.99, img: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=500&h=500&fit=crop", offer: true }
];

// Estado de la aplicación
let cart = [];
let isLoggedIn = false;
let currentUser = "";

// Navegación entre secciones
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => {
        sec.classList.remove('active-section');
        sec.style.display = 'none';
    });
    
    const activeSec = document.getElementById(sectionId);
    activeSec.style.display = 'block';
    setTimeout(() => activeSec.classList.add('active-section'), 10);

    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    const activeLink = document.getElementById('nav-' + sectionId);
    if(activeLink) activeLink.classList.add('active');

    const titles = {
        'inicio': 'FreshMarket - Inicio',
        'ofertas': 'FreshMarket - Ofertas',
        'productos': 'FreshMarket - Productos',
        'carrito': 'FreshMarket - Carrito',
        'login': 'FreshMarket - Login',
        'registro': 'FreshMarket - Registro',
        'contacto': 'FreshMarket - Contacto'
    };
    document.title = titles[sectionId] || 'FreshMarket';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Renderizar productos
function renderProducts() {
    const container = document.getElementById('products-container');
    const offersContainer = document.getElementById('offers-container');
    
    const normalProducts = products.filter(p => !p.offer);
    const offerProducts = products.filter(p => p.offer);

    offersContainer.innerHTML = offerProducts.map(product => createProductCard(product, true)).join('');
    container.innerHTML = normalProducts.map(product => createProductCard(product, false)).join('');
}

// Crear tarjeta de producto
function createProductCard(product, isOffer) {
    const priceHTML = product.oldPrice 
        ? `<span class="current-price">$${product.price}</span><span class="old-price">$${product.oldPrice}</span>`
        : `<span class="current-price">$${product.price}</span>`;

    return `
        <div class="product-card">
            ${isOffer ? '<span class="product-badge"><i class="fas fa-tag"></i> OFERTA</span>' : ''}
            <img src="${product.img}" alt="${product.name}" class="product-img" onerror="this.src='https://via.placeholder.com/500x500/FF6B35/FFFFFF?text=${encodeURIComponent(product.name)}'">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${priceHTML}</div>
                <button class="btn-add" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Agregar al Carrito
                </button>
            </div>
        </div>
    `;
}

// Agregar al carrito
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--secondary);color:white;padding:15px 25px;border-radius:10px;z-index:3000;animation:slideIn 0.3s ease;';
    notif.innerHTML = `<i class="fas fa-check"></i> ${product.name} agregado`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// Eliminar del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Actualizar carrito UI
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: #999;"><i class="fas fa-shopping-basket" style="font-size:3rem;margin-bottom:1rem;display:block;"></i>Tu carrito está vacío. ¡Agrega algunos productos frescos!</p>';
        cartTotal.innerText = '0.00';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80/FF6B35/FFFFFF?text=${item.name.charAt(0)}'">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">$${item.price}</div>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none;border:none;color:var(--primary);cursor:pointer;font-size:1.2rem;">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    }).join('');

    cartTotal.innerText = total.toFixed(2);
}

// Login
function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('login-user').value;
    isLoggedIn = true;
    currentUser = user;
    updateAuthUI();
    
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;top:100px;right:20px;background:var(--secondary);color:white;padding:15px 25px;border-radius:10px;z-index:3000;animation:slideIn 0.3s ease;';
    notif.innerHTML = `<i class="fas fa-check-circle"></i> ¡Bienvenido, ${user}!`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
    
    showSection('inicio');
}

// Registro
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    isLoggedIn = true;
    currentUser = name;
    updateAuthUI();
    
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;top:100px;right:20px;background:var(--secondary);color:white;padding:15px 25px;border-radius:10px;z-index:3000;animation:slideIn 0.3s ease;';
    notif.innerHTML = `<i class="fas fa-check-circle"></i> ¡Cuenta creada, ${name}!`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
    
    showSection('inicio');
}

// Actualizar auth UI
function updateAuthUI() {
    const authBtn = document.getElementById('auth-btn');
    const userDisplay = document.getElementById('user-display');
    const usernameSpan = document.getElementById('username-span');

    if (isLoggedIn) {
        authBtn.style.display = 'none';
        userDisplay.style.display = 'flex';
        usernameSpan.innerText = currentUser;
    } else {
        authBtn.style.display = 'block';
        userDisplay.style.display = 'none';
    }
}

// Procesar pago
function processCheckout() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    if (!isLoggedIn) {
        alert("Debes iniciar sesión o registrarte para realizar una compra.");
        showSection('login');
        return;
    }

    const modal = document.getElementById('payment-modal');
    const loader = document.getElementById('modal-loader');
    const success = document.getElementById('modal-success');

    modal.style.display = 'flex';
    loader.style.display = 'block';
    success.style.display = 'none';

    setTimeout(() => {
        loader.style.display = 'none';
        success.style.display = 'block';
        cart = [];
        updateCartUI();
    }, 2500);
}

// Cerrar modal
function closeModal() {
    document.getElementById('payment-modal').style.display = 'none';
    showSection('inicio');
}

// Inicializar
window.onload = function() {
    renderProducts();
};