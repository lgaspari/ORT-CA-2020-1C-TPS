import fs from "fs";

/**
 * Copia un archivo del origen al destino. Llama al callback al terminar la lectura del archivo.
 * @param origen ruta de origen
 * @param destino ruta de destino
 * @param callback callback
 * @returns {void}
 */
function copiarArchivoCallback(origen, destino, callback) {
	fs.exists(origen, exists => {
		if (!exists) {
			return callback("El directorio no existe");
		}

		fs.copyFile(origen, destino, callback);
	});
}

/**
 * Lista los archivos de un directorio especificado. Llama al callback al terminar de listar los archivos.
 * @param ruta del directorio
 * @param callback callback
 * @returns {string[]} Devuelve una lista de archivos
 */
function listarArchivosCallback(ruta, callback) {
	fs.exists(ruta, exists => {
		if (!exists) {
			return callback("El directorio no existe");
		}

		fs.readdir(ruta, callback);
	});
}

// exportar ambas funciones
export {
	copiarArchivoCallback,
	listarArchivosCallback
};