import path from "path";
import { copiarArchivoCallback, listarArchivosCallback } from "./utils/fileUtilsCallback.mjs";

/**
 * Realiza el resguardo de un directorio de origen en el directorio de 
 * destino según las extensiones pasadas por parámetro.
 * @param origen ruta del origen
 * @param destino ruta del destino
 * @param extensiones de archivos a resguardar
 * @returns {void}
 */
function realizarBackupDirectorioCallback(origen, destino, extensiones, callback) {
	// Lista los archivos de un directorio
	listarArchivosCallback(origen, (err, nombreArchivos) => {
		if (err) {
			return callback(err);
		}

		// Filtro los documentos
		const documentos = nombreArchivos.filter(nombreArchivo => (
			extensiones.indexOf(
				path.extname(nombreArchivo)
			) != -1
		));
	
		// Copiar documentos
		documentos.forEach((documento, index) => {
			const archivoOrigen = path.join(origen, documento);
			const archivoDestino = path.join(destino, documento);
			
			copiarArchivoCallback(archivoOrigen, archivoDestino, err => {
				if (err) {
					console.error(err);
				}

				if (index === documentos.length - 1) {
					callback();
				}
			});
		});
		
	});
}

export {
	realizarBackupDirectorioCallback
};