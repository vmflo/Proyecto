function toggleMenu() {
    document.getElementById('sideMenu').classList.toggle('open');
    document.querySelector('.menu-overlay').classList.toggle('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    toggleMenu();
}

// --- LÓGICA DEL MODO OSCURO (BÁSICO) ---
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// --- FUNCIONES CON ALERT() PARA COMPARACIÓN ---
function registrarUsuario() {
    const nombre = document.getElementById('nombre').value;
    if (nombre) {
        alert('¡Registro exitoso para ' + nombre + '!');
    } else {
        alert('Por favor, completa todos los campos.');
    }
}
function cancelarRegistro() {
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    alert('Registro cancelado.');
}

console.log('Panel de Administración Clásico cargado.');
