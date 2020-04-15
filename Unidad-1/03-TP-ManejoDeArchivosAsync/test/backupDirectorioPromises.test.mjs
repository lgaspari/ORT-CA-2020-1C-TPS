import { realizarBackupDirectorioPromises } from '../src/backupDirectorioPromises.mjs';

// TODO: El destino deberia ser el mismo root
const rutaIn = './in/';
const rutaOut = './out/';
const extensiones = ['.docx', '.xlsx'];

(() => {
	console.time("[PROMISES] Realizar Backup");
	realizarBackupDirectorioPromises(rutaIn, rutaOut, extensiones)
		.then(() => {
			console.timeEnd("[PROMISES] Realizar Backup");
		});
})();
