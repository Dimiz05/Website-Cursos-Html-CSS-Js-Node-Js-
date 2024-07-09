document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/categorias')
        .then(response => response.json())
        .then(categories => {
            const categoriasContainer = document.querySelector('.categorias .box-container');
            categoriasContainer.innerHTML = ''; // Limpiar el contenedor
            categories.forEach(category => {
                const categoryBox = document.createElement('div');
                categoryBox.classList.add('box');
                categoryBox.innerHTML = `<a href="./categorias.html?categoria=${category.id}" class="inline-btn">${category.nombre}</a>`;
                categoriasContainer.appendChild(categoryBox);
            });
        })
        .catch(error => {
            console.error('Error al cargar las categorías:', error);
        });
 });