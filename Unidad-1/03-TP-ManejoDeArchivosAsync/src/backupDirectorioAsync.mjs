import path from "path";
import { copiarArchivoAsync, listarArchivosAsync } from "./utils/fileUtilsAsync.mjs";

/**
 * Realiza el resguardo de un directorio de origen en el directorio de 
 * destino según las extensiones pasadas por parámetro de forma asincrónica.
 * @param origen ruta del origen
 * @param destino ruta del destino
 * @param extensiones de archivos a resguardar
 * @returns {void}
 */
async function realizarBackupDirectorioAsync(origen, destino, extensiones) {
	// Lista los archivos de un directorio
	const nombreArchivos = await listarArchivosAsync(origen);

	// Filtro los documentos
	const documentos = nombreArchivos.filter(nombreArchivo => (
		extensiones.indexOf(
			path.extname(nombreArchivo)
		) != -1
	));

	// Copiar documentos
	await Promise.all(documentos.map(async documento => {
		const archivoOrigen = path.join(origen, documento);
		const archivoDestino = path.join(destino, documento);
		
		try {
			await copiarArchivoAsync(archivoOrigen, archivoDestino);
		} catch (err) {
			console.error(`No se pudo copiar el archivo "${documento}"`);
		}
	}));
}

export {
	realizarBackupDirectorioAsync
};