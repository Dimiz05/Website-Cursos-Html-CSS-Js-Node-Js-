document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get('id');

    if (cursoId) {
        try {
            const response = await fetch(`/cursos/${cursoId}`);
            const { curso } = await response.json();

            document.getElementById('title').value = curso.title;
            document.getElementById('description').value = curso.description;

            // Cargar categorías disponibles
            const categoriasResponse = await fetch('/categorias');
            const categorias = await categoriasResponse.json();
            const categoriaSelect = document.getElementById('categoria');
            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.nombre;
                if (categoria.id === curso.categoria_id) {
                    option.selected = true;
                }
                categoriaSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching curso:', error);
        }
    }

    document.getElementById('updateForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Convertir FormData a x-www-form-urlencoded
        const formDataEncoded = new URLSearchParams(formData).toString();

        try {
            const response = await fetch(`/cursos/${cursoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formDataEncoded,
            });

            if (response.ok) {
                alert('Curso actualizado con éxito');
                window.location.href = 'dashboard.html'; // Redirigir a la lista de cursos
            } else {
                alert('Error al actualizar el curso');
            }
        } catch (error) {
            console.error('Error updating curso:', error);
        }
    });
});