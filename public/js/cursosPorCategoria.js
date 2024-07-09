document.addEventListener('DOMContentLoaded', () => {
   const urlParams = new URLSearchParams(window.location.search);
   const categoriaId = urlParams.get('categoria');

   if (!categoriaId) {
       alert('No se proporcionó una categoría válida');
       return;
   }

   // Obtener el nombre de la categoría desde el backend
   fetch(`http://localhost:3000/categorias/${categoriaId}`)
       .then(response => response.json())
       .then(data => {
           document.getElementById('categoriaTitulo').textContent = data.nombre; // Mostrar el título de la categoría
       })
       .catch(error => {
           console.error('Error fetching category name:', error);
           alert('Hubo un problema al cargar el nombre de la categoría');
       });

   // Obtener los cursos por categoría desde el backend
   fetch(`http://localhost:3000/cursos/categoria?categoria=${categoriaId}`)
       .then(response => response.json())
       .then(data => {
           const coursesContainer = document.getElementById('coursesContainer');
           coursesContainer.innerHTML = ''; // Limpiar el contenedor

           if (data.length > 0) {
               data.forEach(curso => {
                   const cursoElement = document.createElement('div');
                   cursoElement.classList.add('box');
                   cursoElement.innerHTML = `
                       <div class="thumb">
                           <img src="${curso.thumb}" alt="">
                       </div>
                       <h3 class="title">${curso.title}</h3>
                       <a href="./playlist.html?id=${curso.id}" class="inline-btn">Ver Curso</a>
                   `;
                   coursesContainer.appendChild(cursoElement);
               });
           } else {
               coursesContainer.innerHTML = '<p>No se encontraron cursos para esta categoría.</p>';
           }
       })
       .catch(error => {
           console.error('Error fetching cursos:', error);
           alert('Hubo un problema al cargar los cursos');
       });
});
