import fs from "fs";
import util from "util";

const _copyFile = util.promisify(fs.copyFile);
const _exists = util.promisify(fs.exists);
const _readdir = util.promisify(fs.readdir);

/**
 * Copia un archivo del origen al destino usando promesas
 * @param origen ruta de origen
 * @param destino ruta de destino
 * @returns {void}
 */
function copiarArchivoPromises(origen, destino) {
	return _exists(origen)
		.then(exists => {
			if (!exists) {
				throw new Error("El directorio no existe");
			}

			return _copyFile(origen, destino);
		});
}

/**
 * Lista los archivos de un directorio especificado usando promesas
 * @param ruta del directorio
 * @returns {string[]} Devuelve una lista de archivos
 */
function listarArchivosPromises(ruta) {
	return _exists(ruta)
		.then(exists => {
			if (!exists) {
				throw new Error("El directorio no existe");
			}

			return _readdir(ruta);
		});
}

// exportar ambas funciones
export {
	copiarArchivoPromises,
	listarArchivosPromises
};