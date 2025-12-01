document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('buscador_id');

    if (buscador) {
        buscador.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            const posts = document.querySelectorAll('.documentos .post');
            
            posts.forEach(post => {
                const postDescription = post.querySelector('.publicacion p').textContent.toLowerCase();
                
                if (postDescription.includes(query) || query.length === 0) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    const formPublicacion = document.querySelector('.cargar form');
    if (formPublicacion) {
        formPublicacion.addEventListener('submit', manejarPublicacionDOM);
    }
});

function crearNuevoPostDOM(descripcion, nombreArchivo, usuario, fotoPerfil) {
    const nuevoPostHTML = `
        <article class="post">
            <div class="encabezado">
                <div class="info_usuario">
                    <img id="fotoPerfil" src= ${fotoPerfil} class="perfil-foto-mini">
                    <p id = "usuario">${usuario}</p>
                    <p>${new Date().toLocaleDateString('es-ES')}</p>
                </div>
                <div class="btn_publicacion">
                    <button> ... </button>
                </div>
            </div>
            <div class="publicacion">
                <p>${descripcion}</p>
                <small>Archivo: ${nombreArchivo}</small>
            </div>
            <div class="acciones">
                <button><i class="fa-solid fa-download"></i></button>
                <button><i class="fa-solid fa-bookmark"></i></button>
            </div>
        </article>
    `;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = nuevoPostHTML.trim();
    return tempDiv.firstChild;
}

function manejarPublicacionDOM(event) {
    event.preventDefault(); 

    const mensaje = document.getElementById('mensaje').value.trim();
    const archivoInput = document.getElementById('archivo-post');
    const archivo = archivoInput.files[0];
    const contenedorDocumentos = document.querySelector('.documentos');

    if (mensaje.length < 10) {
        Swal.fire({
            icon: 'error',
            title: 'Error de Publicación',
            text: 'La descripción debe tener al menos 10 caracteres.',
            timer: 1000,
            showConfirmButton: false
        });
        return;
    }

    if (!archivo) {
        Swal.fire({
            icon: 'error',
            title: 'Error de Publicación',
            text: 'Debes adjuntar un archivo para publicar.',
            timer: 1000,
            showConfirmButton: false
        });
        return;
    }

    const nuevoPostElemento = crearNuevoPostDOM(mensaje, archivo.name, usuario.usuario, usuario.foto);
    
    const primerPostExistente = contenedorDocumentos.querySelector('.post:first-of-type');

    if (primerPostExistente) {
        contenedorDocumentos.insertBefore(nuevoPostElemento, primerPostExistente);
    } else {
        const buscador = document.getElementById('buscador_id');
        buscador.after(nuevoPostElemento); 
    }
    
    Swal.fire({
        icon: 'success',
        title: '¡Publicación Exitosa!',
        text: 'Tu contenido ha sido añadido a la página (visible localmente).',
        timer: 1000,
        showConfirmButton: false
    });
    event.target.reset();
        //NOTIFICAR
    notificar("Has añadido material en tu página");
    event.target.reset();
}

document.getElementById("usuario").textContent = usuario.usuario || "Nombre Usuario";
document.querySelectorAll('[id = "fotoPerfil"]').forEach(el => {
    el.src = usuario.foto;
});


