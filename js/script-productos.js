const buttons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product-card");

// Configuración de paginación
const itemsPerPage = 8; // Productos por página
let currentPage = 1;

// Función para obtener productos visibles (después de filtrar)
function getVisibleProducts() {
    const activeFilter = document.querySelector('.filter-btn.active');
    const category = activeFilter ? activeFilter.dataset.category : 'all';
    
    return Array.from(products).filter(product => {
        return category === "all" || product.dataset.category === category;
    });
}

// Función para mostrar productos de la página actual
function displayPage(page) {
    const allProducts = Array.from(products);
    
    // Primero aplicar el filtro activo
    const activeFilter = document.querySelector('.filter-btn.active');
    const category = activeFilter ? activeFilter.dataset.category : 'all';
    
    // Filtrar productos según categoría
    allProducts.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.setAttribute('data-filtered', 'true');
        } else {
            product.setAttribute('data-filtered', 'false');
            product.style.display = 'none';
        }
    });
    
    // Obtener solo los productos filtrados
    const visibleProducts = allProducts.filter(p => p.getAttribute('data-filtered') === 'true');
    
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    
    // Mostrar solo los productos de la página actual
    visibleProducts.forEach((product, index) => {
        if (index >= start && index < end) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    
    updatePagination(visibleProducts.length);
}

// Función para crear botones de paginación
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationEl = document.getElementById('pagination');
    
    if (!paginationEl) return;
    
    paginationEl.innerHTML = '';
    
    // Si solo hay 1 página o menos, no mostrar paginación
    if (totalPages <= 1) {
        return;
    }
    
    // Botón Anterior
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" data-page="${currentPage - 1}">◀</a>`;
    paginationEl.appendChild(prevLi);
    
    // Botones de números
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
        paginationEl.appendChild(li);
    }
    
    // Botón Siguiente
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" data-page="${currentPage + 1}">▶</a>`;
    paginationEl.appendChild(nextLi);
    
    // Event listeners para los botones
    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = parseInt(this.getAttribute('data-page'));
            if (page > 0 && page <= totalPages) {
                currentPage = page;
                displayPage(currentPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// FILTROS - Integrado con paginación
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Reiniciar a página 1 después de filtrar
        currentPage = 1;
        displayPage(1);
    });
});

// Selección de colores
document.querySelectorAll('.color-option').forEach(color => {
    color.addEventListener('click', () => {
        const parent = color.closest('.colors');
        parent.querySelectorAll('.color-option').forEach(c => c.classList.remove('active'));
        color.classList.add('active');
    });
});

// Selección de talles
document.querySelectorAll('.size-option').forEach(size => {
    size.addEventListener('click', () => {
        const parent = size.closest('.sizes');
        parent.querySelectorAll('.size-option').forEach(s => s.classList.remove('active'));
        size.classList.add('active');
    });
});

// Botón de pedido por WhatsApp
document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        const name = card.dataset.name;
        const image = card.dataset.image;
        const price = card.querySelector('.price').innerText;

        const colorEl = card.querySelector('.color-option.active');
        const sizeEl = card.querySelector('.size-option.active');

        // Solo verificar que el talle esté seleccionado
        if (!sizeEl) {
            alert("Seleccioná el talle");
            return;
        }

        const confirmPersonalizado = confirm(
            "⚠️ Importante:\n\n" +
            "Las remeras y hoodies son personalizables.\n" +
            "No necesariamente deben ser iguales a la imagen.\n\n" +
            "¿Deseás continuar con el pedido?"
        );

        if (!confirmPersonalizado) return;

        // Si hay color seleccionado, incluirlo, si no, no
        const color = colorEl ? colorEl.dataset.color : 'A consultar';
        const size = sizeEl.innerText;

        const message = `
Hola, quiero pedir este producto:

Producto: ${name}
Color: ${color}
Talle: ${size}
Precio: ${price}

Imagen de referencia:
${image}
        `;

        const phone = "595981044294"; // Reemplazar con el número de teléfono deseado
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
});

// Inicializar paginación al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    displayPage(1);
});