// ELEMENTOS
const btnCampana = document.getElementById("btnNotificaciones");
const badge = document.getElementById("badgeNoti");
const lista = document.getElementById("listaNotificaciones");

// GUARDAR NOTIFICACIÓN
function guardarNotificacion(mensaje, tipo = "info") {
    let notificaciones = JSON.parse(localStorage.getItem("notificaciones")) || [];

    notificaciones.push({
        id: Date.now(),
        mensaje,
        tipo,
        leida: false,
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem("notificaciones", JSON.stringify(notificaciones));
}

// MOSTRAR EN DOM
function mostrarNotificacion(n) {
    const item = document.createElement("div");
    item.className = `notificacion-item ${n.tipo}`;
    item.textContent = `${n.mensaje} — ${n.fecha}`;
    lista.prepend(item);
}

// CARGAR TODAS
function cargarNotificaciones() {
    lista.innerHTML = "";
    let notificaciones = JSON.parse(localStorage.getItem("notificaciones")) || [];
    notificaciones.forEach(mostrarNotificacion);
}

// BADGE
function actualizarBadge() {
    let notificaciones = JSON.parse(localStorage.getItem("notificaciones")) || [];
    const noLeidas = notificaciones.filter(n => !n.leida).length;
    badge.textContent = noLeidas;
}

// FUNCION PUBLICA
function notificar(mensaje, tipo = "info") {
    guardarNotificacion(mensaje, tipo);
    mostrarNotificacion({ mensaje, tipo, fecha: new Date().toLocaleString() });
    actualizarBadge();
}

// CLICK CAMPANA
btnCampana.addEventListener("click", () => {
    lista.classList.toggle("lista-oculta");

    if (!lista.classList.contains("lista-oculta")) {
        cargarNotificaciones();

        let notificaciones = JSON.parse(localStorage.getItem("notificaciones")) || [];
        notificaciones = notificaciones.map(n => ({ ...n, leida: true }));
        localStorage.setItem("notificaciones", JSON.stringify(notificaciones));

        actualizarBadge();
    }
});

actualizarBadge();
