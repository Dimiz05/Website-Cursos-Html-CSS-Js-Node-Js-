async function fetchCursos() {
    try {
        const response = await fetch('/cursos');
        const cursos = await response.json();

        const coursesContainer = document.getElementById('coursesContainer');
        coursesContainer.innerHTML = '';

        // Limitar el número de cursos a 3
        const limitedCursos = cursos.slice(0, 3);

        limitedCursos.forEach(curso => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('box');
            courseElement.innerHTML = `
                <div class="thumb">
                    <img src="${curso.thumb}" alt="${curso.title}">
                </div>
                <h2>${curso.tutor_name}</h2>
                <h3 class="title">${curso.title}</h3>
                <a href="playlist.html?id=${curso.id}" class="inline-btn">Mirar Curso</a>
            `;
            coursesContainer.appendChild(courseElement);
        });
    } catch (error) {
        console.error('Error fetching cursos:', error);
        alert('Hubo un problema al cargar la lista de cursos');
    }
}

window.onload = () => {
    fetchCursos();
};