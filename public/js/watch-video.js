document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const leccionId = urlParams.get('id');

    if (leccionId) {
       fetch(`http://localhost:3000/lecciones/${leccionId}`)
          .then(response => response.json())
          .then(data => {
             document.getElementById('leccionTitle').innerText = data.title || 'Título de la Lección';
             document.getElementById('leccionDescription').innerText = data.description || 'Descripción de la Lección';

             const videoUrl = data.video;
             if (videoUrl) {
                const videoId = getYouTubeVideoId(videoUrl);
                if (videoId) {
                   const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                   document.getElementById('videoPlayer').src = embedUrl;
                } else {
                   document.getElementById('videoPlayer').style.display = 'none';
                   document.querySelector('.video').innerHTML = '<p>No hay video disponible para esta lección.</p>';
                }
             } else {
                document.getElementById('videoPlayer').style.display = 'none';
                document.querySelector('.video').innerHTML = '<p>No hay video disponible para esta lección.</p>';
             }
          })
          .catch(error => {
             console.error('Error fetching lesson details:', error);
             alert('Hubo un problema al cargar los detalles de la lección');
          });
    } else {
       alert('No se proporcionó un ID de lección');
    }
 });

 // Función para obtener el ID del video de YouTube desde la URL
 function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
 }