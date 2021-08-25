const socket = io()
/* Referencias html */
const statusOnline = document.querySelector('#statusOnline');
const statusOfline = document.querySelector('#statusOfline');
const inputMensaje = document.querySelector('#inputMensaje');
const btnMensaje   = document.querySelector('#btnMensaje');
const mensajesContainer = document.querySelector('#mensajesContainer');

statusOfline.style.display = "none"
statusOnline.style.display = "none"

socket.on('connect', () => {
	console.log('Conectado');
	statusOfline.style.display = "none"
	statusOnline.style.display = "inline"
}); 

socket.on('disconnect', () => {
	console.log('Desconectado del servidor');
	statusOfline.style.display = "inline"
	statusOnline.style.display = "none"
});

socket.on('mensaje-enviado', payload => {
	mensajesContainer.innerHTML += `<p class="theMensaje">${payload.mensaje}</p>`
	console.log(payload);
});

btnMensaje.addEventListener('click', (e) => {
	
	if (inputMensaje.value) {
		const payload = {
			mensaje: inputMensaje.value,
			date: new Date().getTime(),
			id: "asdb21234"
		}

		socket.emit('mensaje-enviado', payload)
		mensajesContainer.innerHTML += `<p class="meMensaje">${payload.mensaje}</p>`
	}

});
