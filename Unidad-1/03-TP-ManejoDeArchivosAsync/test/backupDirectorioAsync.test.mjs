import { realizarBackupDirectorioAsync } from '../src/backupDirectorioAsync.mjs';

// TODO: El destino deberia ser el mismo root
const rutaIn = './in/';
const rutaOut = './out/';
const extensiones = ['.docx', '.xlsx'];

(async () => {
	console.time("[ASYNC] Realizar Backup");
	await realizarBackupDirectorioAsync(rutaIn, rutaOut, extensiones);
	console.timeEnd("[ASYNC] Realizar Backup");
})();