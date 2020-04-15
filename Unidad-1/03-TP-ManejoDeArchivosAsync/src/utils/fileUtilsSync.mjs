import fs from "fs";

/**
 * Copia un archivo del origen al destino de forma sincrónica
 * @param origen ruta de origen
 * @param destino ruta de destino
 * @returns {void}
 */
function copiarArchivoSync(origen, destino) {
  if (!fs.existsSync(origen)) {
		throw new Error("El directorio no existe");
  }

	fs.copyFileSync(origen, destino);
}

/**
 * Lista los archivos de un directorio especificado de forma sincrónica
 * @param ruta del directorio
 * @returns {string[]} Devuelve una lista de archivos
 */
function listarArchivosSync(ruta) {
  if (!fs.existsSync(ruta)) {
		throw new Error("El directorio no existe");
  }

	return fs.readdirSync(ruta);
}

// exportar ambas funciones
export {
	copiarArchivoSync,
	listarArchivosSync
};