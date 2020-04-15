import { realizarBackupDirectorioSync } from '../src/backupDirectorioSync.mjs';

// TODO: El destino deberia ser el mismo root
const rutaIn = './in/';
const rutaOut = './out/';
const extensiones = ['.docx', '.xlsx'];

(() => {
	console.time("[SYNC] Realizar Backup");
	realizarBackupDirectorioSync(rutaIn, rutaOut, extensiones);
	console.timeEnd("[SYNC] Realizar Backup");
})();