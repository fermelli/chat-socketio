(function () {
    const socket = io();

    const formulario = document.getElementById('formulario');
    const textarea = document.getElementById('textarea');
    const chat = document.getElementById('chat');
    const modal = document.getElementById('modal');
    const formularioLogin = document.getElementById('formulario-login');
    const usuario = document.getElementById('usuario');
    const color = document.getElementById('color');

    let usuarioActual = {
        nombre: '',
        color: ''
    }

    formularioLogin.addEventListener('submit', (event) => {
        event.preventDefault();

        usuarioActual.nombre = usuario.value.trim();
        usuarioActual.color = color.value.trim();

        if (usuarioActual) {
            modal.classList.add('modal--oculto');

            textarea.focus();
        }
    });

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const mensaje = textarea.value.trim()

        if (mensaje) {
            socket.emit('chat', { usuario: usuarioActual, mensaje: mensaje.replace(/\r?\n/g, '<br>') });

            textarea.value = '';
        }
    });

    textarea.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            formulario.dispatchEvent(new Event('submit'));
        }
    });

    socket.on('chat', ({ usuario, mensaje }) => {
        const colorBorde = usuario.color ? `border-color: ${usuario.color}` : '';

        const burbuja = /*html*/ `
            <div class="chat__fila ${usuario.nombre == usuarioActual.nombre ? 'chat__fila--izquierda' : 'chat__fila--derecha'}">
                <div class="burbuja" style="${colorBorde}">
                    <span class="burbuja__usuario">${usuario.nombre}</span>
                    <p class="burbuja__texto">
                        ${mensaje}
                    </p>
                </div>
            </div>`

        chat.insertAdjacentHTML('beforeend', burbuja);
        chat.scrollTop = chat.scrollHeight;
    });
})()