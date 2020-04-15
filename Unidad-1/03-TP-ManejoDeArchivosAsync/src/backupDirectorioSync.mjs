import path from "path";
import { copiarArchivoSync, listarArchivosSync } from "./utils/fileUtilsSync.mjs";

/**
 * Realiza el resguardo de un directorio de origen en el directorio de 
 * destino según las extensiones pasadas por parámetro.
 * @param origen ruta del origen
 * @param destino ruta del destino
 * @param extensiones de archivos a resguardar
 * @returns {void}
 */
function realizarBackupDirectorioSync(origen, destino, extensiones) {
	// Lista los archivos de un directorio
	const nombreArchivos = listarArchivosSync(origen);

	// Filtro los documentos
	const documentos = nombreArchivos.filter(nombreArchivo => (
		extensiones.indexOf(
			path.extname(nombreArchivo)
		) != -1
	));

	// Copiar documentos
	documentos.forEach(documento => {
		const archivoOrigen = path.join(origen, documento);
		const archivoDestino = path.join(destino, documento);
		
		try {
			copiarArchivoSync(archivoOrigen, archivoDestino);
		} catch (err) {
			console.error(`No se pudo copiar el archivo "${documento}"`);
		}
	});
}

export {
	realizarBackupDirectorioSync
};