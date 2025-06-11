// --- REFERENCIAS A ELEMENTOS DEL DOM ---
const openMenuButton = document.getElementById('openMenuButton');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const fabContainer = document.getElementById('fabContainer');
const mainFabButton = document.getElementById('mainFabButton');

// --- LÓGICA DEL MENÚ LATERAL ---
const toggleMenu = () => {
    sideMenu.classList.toggle('open');
    menuOverlay.classList.toggle('active');
};
openMenuButton.addEventListener('click', toggleMenu);
sideMenu.querySelector('.close-menu').addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById(item.dataset.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        toggleMenu();
    });
});

// --- LÓGICA DE SNACKBAR Y DIÁLOGO ---
const snackbar = document.getElementById('snackbar');
const dialogOverlay = document.getElementById('dialogOverlay');
let dialogConfirmCallback = null;

const showSnackbar = (message) => {
    snackbar.textContent = message;
    snackbar.classList.add('show');
    setTimeout(() => snackbar.classList.remove('show'), 3000);
};

const showDialog = (title, message, onConfirm) => {
    dialogOverlay.querySelector('#dialogTitle').textContent = title;
    dialogOverlay.querySelector('#dialogMessage').textContent = message;
    dialogConfirmCallback = onConfirm;
    dialogOverlay.classList.add('active');
};

const hideDialog = () => { dialogOverlay.classList.remove('active'); dialogConfirmCallback = null; };
dialogOverlay.querySelector('#dialogConfirm').addEventListener('click', () => { if (dialogConfirmCallback) dialogConfirmCallback(); hideDialog(); });
dialogOverlay.querySelector('#dialogCancel').addEventListener('click', hideDialog);

// --- LÓGICA DEL MODO OSCURO ---
const applyTheme = (theme) => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
};
applyTheme(localStorage.getItem('theme') || 'light');

// --- LÓGICA DEL BOTÓN FLOTANTE (SPEED DIAL) ---
mainFabButton.addEventListener('click', () => {
    fabContainer.classList.toggle('open');
});

document.getElementById('fabDarkModeButton').addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(newTheme);
    showSnackbar(`Tema ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`);
    fabContainer.classList.remove('open');
});

document.getElementById('fabAddUserButton').addEventListener('click', () => {
    document.getElementById('registro').scrollIntoView({ behavior: 'smooth', block: 'center' });
    showSnackbar('Listo para añadir un nuevo usuario.');
    fabContainer.classList.remove('open');
});

// --- LÓGICA DEL FORMULARIO DE REGISTRO ---
const regNombre = document.getElementById('regNombre');
const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');

document.getElementById('btnRegistrar').addEventListener('click', () => {
    let isValid = true;
    [regNombre, regEmail, regPassword].forEach(f => { f.error = false; f.errorText = ''; });
    if (!regNombre.value) { isValid = false; regNombre.error = true; regNombre.errorText = 'El nombre es obligatorio'; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.value)) { isValid = false; regEmail.error = true; regEmail.errorText = 'Introduce un email válido'; }
    if (regPassword.value.length < 8) { isValid = false; regPassword.error = true; regPassword.errorText = 'La contraseña debe tener al menos 8 caracteres'; }
    if (isValid) {
        showSnackbar(`¡Registro exitoso para ${regNombre.value}!`);
        [regNombre, regEmail, regPassword].forEach(f => { f.value = ''; });
    } else {
        showSnackbar('Por favor, corrige los errores en el formulario.');
    }
});

document.getElementById('btnCancelar').addEventListener('click', () => {
    showDialog('Cancelar Registro', '¿Estás seguro de que quieres borrar los datos?', () => {
        [regNombre, regEmail, regPassword].forEach(f => { f.value = ''; f.error = false; f.errorText = ''; });
        showSnackbar('Registro cancelado.');
    });
});

// --- LÓGICA DEL GRÁFICO (Chart.js) ---
const ctx = document.getElementById('performanceChart').getContext('2d');
new Chart(ctx, { type: 'doughnut', data: { labels: ['Óptimo', 'Mejorable', 'Inactivo'], datasets: [{ data: [85, 10, 5], backgroundColor: ['#6750A4', '#E8DEF8', '#CAC4D0'], borderColor: 'rgba(0,0,0,0)', hoverOffset: 8 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom', labels: { color: 'var(--md-sys-color-on-surface-variant)' } } } } });

// --- LÓGICA DE NOTIFICACIONES Y OTROS BOTONES ---
const renderNotifications = (notifications) => {
    const list = document.getElementById('notificationsList');
    const empty = document.getElementById('notificationsEmpty');
    if (!notifications?.length) { empty.style.display = 'block'; list.innerHTML = ''; } 
    else { empty.style.display = 'none'; list.innerHTML = notifications.map(n => `<div class="notification-item"><strong>${n.title}</strong><br><span>${n.body}</span></div>`).join(''); }
};
renderNotifications([{ title: 'Nueva funcionalidad', body: 'El botón flotante ahora es un menú de acciones.' }, { title: 'Backup completado', body: 'Todos tus datos fueron respaldados.' }]);
document.getElementById('btnVerReportes').addEventListener('click', () => showSnackbar('Abriendo reportes detallados...'));
document.getElementById('btnConfigDashboard').addEventListener('click', () => showSnackbar('Abriendo configuración del dashboard...'));

console.log('Panel de Administración Final cargado exitosamente.');
