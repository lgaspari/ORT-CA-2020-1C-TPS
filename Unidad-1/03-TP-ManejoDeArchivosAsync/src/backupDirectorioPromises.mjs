import path from "path";
import { copiarArchivoPromises, listarArchivosPromises } from "./utils/fileUtilsPromises.mjs";

/**
 * Realiza el resguardo de un directorio de origen en el directorio de 
 * destino según las extensiones pasadas por parámetro de forma asincrónica.
 * @param origen ruta del origen
 * @param destino ruta del destino
 * @param extensiones de archivos a resguardar
 * @returns {void}
 */
function realizarBackupDirectorioPromises(origen, destino, extensiones) {
	// Lista los archivos de un directorio
	return listarArchivosPromises(origen)
		.then(nombreArchivos => {
			// Filtro los documentos
			const documentos = nombreArchivos.filter(nombreArchivo => (
				extensiones.indexOf(
					path.extname(nombreArchivo)
				) != -1
			));
		
			// Copiar documentos
			return Promise.all(documentos.map(documento => {
				const archivoOrigen = path.join(origen, documento);
				const archivoDestino = path.join(destino, documento);
				
				return copiarArchivoPromises(archivoOrigen, archivoDestino)
					.catch(documento => {
						console.error(`No se pudo copiar el archivo "${documento}"`);
					});
			}));
		})
		.catch(err => {
			console.error(err);
		});
}

export {
	realizarBackupDirectorioPromises
};