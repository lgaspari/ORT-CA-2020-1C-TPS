import { realizarBackupDirectorioCallback } from '../src/backupDirectorioCallback.mjs';

// TODO: El destino deberia ser el mismo root
const rutaIn = './in/';
const rutaOut = './out/';
const extensiones = ['.docx', '.xlsx'];

(() => {
	console.time("[CALLBACK] Realizar Backup");
	realizarBackupDirectorioCallback(rutaIn, rutaOut, extensiones, () => {
		console.timeEnd("[CALLBACK] Realizar Backup");
	});
})();