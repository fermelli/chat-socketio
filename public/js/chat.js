(function () {
    const socket = io();

    const usuarioActual = prompt('¿Cuál es tu nombre?').toUpperCase();

    const formulario = document.getElementById('formulario');
    const textarea = document.getElementById('textarea');
    const chat = document.getElementById('chat');

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const mensaje = textarea.value.trim()

        if (mensaje) {
            socket.emit('chat', { usuario: usuarioActual, mensaje });

            textarea.value = '';
        }
    });

    textarea.addEventListener('keyup', (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();

            formulario.dispatchEvent(new Event('submit'));
        }
    });

    socket.on('chat', ({ usuario, mensaje }) => {
        const burbuja = /*html*/ `
            <div class="chat__fila ${usuario == usuarioActual ? 'chat__fila--izquierda' : 'chat__fila--derecha'}">
                <div class="burbuja">
                    <span class="burbuja__usuario">${usuario}</span>
                    <p class="burbuja__texto">
                        ${mensaje}
                    </p>
                </div>
            </div>`

        chat.insertAdjacentHTML('beforeend', burbuja);
        chat.scrollTop = chat.scrollHeight;
    });
})()