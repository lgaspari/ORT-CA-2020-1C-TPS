import fs from "fs";
import util from "util";

const _copyFile = util.promisify(fs.copyFile);
const _exists = util.promisify(fs.exists);
const _readdir = util.promisify(fs.readdir);

/**
 * Copia un archivo del origen al destino de forma asincrónica
 * @param origen ruta de origen
 * @param destino ruta de destino
 * @returns {void}
 */
async function copiarArchivoAsync(origen, destino) {
	const exists = await _exists(origen);

  if (!exists) {
		throw new Error("El directorio no existe");
  }

	await _copyFile(origen, destino);
}

/**
 * Lista los archivos de un directorio especificado de forma asincrónica
 * @param ruta del directorio
 * @returns {string[]} Devuelve una lista de archivos
 */
async function listarArchivosAsync(ruta) {
	const exists = await _exists(ruta);

  if (!exists) {
		throw new Error("El directorio no existe");
  }

	return _readdir(ruta);
}

// exportar ambas funciones
export {
	copiarArchivoAsync,
	listarArchivosAsync
};