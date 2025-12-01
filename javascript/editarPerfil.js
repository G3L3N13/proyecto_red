document.querySelectorAll('[id = "fotoPerfil"]').forEach(el => {
    el.src = usuario.foto;
});


document.getElementById("edadPerfil").textContent = "Edad: " + (usuario.edad || "") + " años";
document.getElementById("semestrePerfil").textContent = "Semestre: " + (usuario.semestre || "");
document.getElementById("carreraPerfil").textContent = "Carrera: " + (usuario.carrera || "");
document.getElementById("frasePerfil").textContent = usuario.frase;
document.querySelectorAll('[id="usuario"]').forEach(el => {el.textContent = usuario.usuario;});
document.getElementById("emailPerfil").textContent = usuario.email; 
document.getElementById("nombres").textContent = usuario.nombres;


document.getElementById("editFoto").addEventListener("change", (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    document.getElementById("previewFoto").src = URL.createObjectURL(archivo);
});


// 1. Abrir modal
document.getElementById("btnEditarPerfil").addEventListener("click", () => {
    document.getElementById("modalEditar").style.display = "flex";
    const usuario = JSON.parse(localStorage.getItem("datosUsuario"));
    document.getElementById("editNombres").value = usuario.nombres || "";
    document.getElementById("editNombre").value = usuario.usuario || "";
    document.getElementById("editFrase").value = usuario.frase || "";
    document.getElementById("editEdad").value = usuario.edad || "";
    document.getElementById("editCarrera").value = usuario.carrera || "";
    document.getElementById("editSemestre").value = usuario.semestre || "";
    document.getElementById("editEnseñar1").value = usuario.enseñar1 || "";
    document.getElementById("editEnseñar2").value = usuario.enseñar2 || "";
    document.getElementById("editAprender1").value = usuario.aprender1 || "";
    document.getElementById("editAprender2").value = usuario.aprender2 || "";
    document.getElementById("editProyecto1").value = usuario.proyecto1 || "";
    document.getElementById("editProyecto2").value = usuario.proyecto2 || "";
    document.getElementById("editProyecto3").value = usuario.proyecto3 || "";
    document.getElementById("editProyecto4").value = usuario.proyecto4 || "";
});

// 2. Cerrar modal
document.getElementById("cerrarModal").addEventListener("click", () => {
    document.getElementById("modalEditar").style.display = "none";
});

// 3. Guardar cambios
document.getElementById("guardarCambios").addEventListener("click", () => {
    const usuario = JSON.parse(localStorage.getItem("datosUsuario"));

    usuario.usuario = document.getElementById("editNombre").value;
    usuario.nombres = document.getElementById("editNombres").value;
    usuario.frase = document.getElementById("editFrase").value;
    usuario.edad = document.getElementById("editEdad").value;
    usuario.carrera = document.getElementById("editCarrera").value;
    usuario.semestre = document.getElementById("editSemestre").value;
    usuario.enseñar1 = document.getElementById("editEnseñar1").value;
    usuario.enseñar2 = document.getElementById("editEnseñar2").value;
    usuario.aprender1 = document.getElementById("editAprender1").value;
    usuario.aprender2 = document.getElementById("editAprender2").value;
    usuario.proyecto1 = document.getElementById("editProyecto1").value;
    usuario.proyecto2 = document.getElementById("editProyecto2").value;
    usuario.proyecto3 = document.getElementById("editProyecto3").value;
    usuario.proyecto4 = document.getElementById("editProyecto4").value; 

    const inputFoto = document.getElementById("editFoto");
    // Si el usuario subió una foto...
if (inputFoto.files && inputFoto.files[0]) {
    const reader = new FileReader();

    reader.onload = function(e) {
        usuario.foto = e.target.result; // Guardamos la imagen como Base64
        localStorage.setItem("datosUsuario", JSON.stringify(usuario));

        actualizarFotos(usuario.foto); // función para refrescar imágenes
    };

    reader.readAsDataURL(inputFoto.files[0]);
    
} else {
    // Si no subió nueva foto, solo actualizamos los textos
    localStorage.setItem("datosUsuario", JSON.stringify(usuario));
}





    // Guardar de nuevo
    localStorage.setItem("datosUsuario", JSON.stringify(usuario));

    // ACTUALIZAR VISUALMENTE (DOM)
    document.getElementById("nombres").textContent = usuario.nombres;
    document.querySelectorAll('[id="usuario"]').forEach(el => {el.textContent = usuario.usuario;});
    document.getElementById("frasePerfil").textContent = usuario.frase;
    document.getElementById("edadPerfil").textContent = "Edad: " + usuario.edad + " años";
    document.getElementById("semestrePerfil").textContent = "Semestre: " + usuario.semestre;
    document.getElementById("carreraPerfil").textContent = "Carrera: " + usuario.carrera;
    document.getElementById("enseñar1").textContent = usuario.enseñar1;
    document.getElementById("enseñar2").textContent = usuario.enseñar2;
    document.getElementById("aprender1").textContent = usuario.aprender1;
    document.getElementById("aprender2").textContent = usuario.aprender2;
    document.getElementById("proyecto1").textContent = usuario.proyecto1;
    document.getElementById("proyecto2").textContent = usuario.proyecto2;
    document.getElementById("proyecto3").textContent = usuario.proyecto3;
    document.getElementById("proyecto4").textContent = usuario.proyecto4;
    function actualizarFotos(fotoBase64) {
    // Actualizar foto grande
    document.getElementById("fotoPerfil").src = fotoBase64;

    // Actualizar todas las fotos pequeñas
    document.querySelectorAll('[id = "fotoPerfil"]').forEach(el => {
        el.src = fotoBase64;
    });
}



    // Cerrar modal
    document.getElementById("modalEditar").style.display = "none";

    // Mensaje de éxito
    Swal.fire({
        icon: "success",
        title: "Perfil actualizado",
        timer: 1000,
        showConfirmButton: false
    });

});

