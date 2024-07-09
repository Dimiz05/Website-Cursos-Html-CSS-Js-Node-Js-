document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const leccionId = urlParams.get('id');

    if (leccionId) {
        try {
            const response = await fetch(`/lecciones/${leccionId}`);
            const leccion = await response.json();

            document.getElementById('title').value = leccion.title;
            document.getElementById('description').value = leccion.description;
            document.getElementById('video').value = leccion.video;
        } catch (error) {
            console.error('Error fetching lección:', error);
        }
    }

    document.getElementById('updateForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Convertir FormData a x-www-form-urlencoded
        const formDataEncoded = new URLSearchParams(formData).toString();

        try {
            const response = await fetch(`/lecciones/${leccionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formDataEncoded,
            });

            if (response.ok) {
                alert('Lección actualizada con éxito');
                window.location.href = 'dashboard.html'; // Redirigir a la lista de lecciones
            } else {
                alert('Error al actualizar la lección');
            }
        } catch (error) {
            console.error('Error updating lección:', error);
        }
    });
});