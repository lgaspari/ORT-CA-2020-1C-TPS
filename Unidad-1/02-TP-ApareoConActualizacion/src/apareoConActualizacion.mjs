// importar lo que sea necesario
import fileUtils from "./utils/fileUtils.mjs";
import util from "util";

/**
 * ordena (in place) una coleccion de datos segun las claves provistas.
 * @param {Object[]} coleccion el array que quiero ordenar
 * @param {string[]} claves las claves por las que quiero ordenar, por orden de importancia
 */
function ordenar(coleccion, claves) {
  coleccion.sort((a, b) => {
    let i = 0;
    let resultado = 0;

    while (i < claves.length && resultado === 0) {
      const clave = claves[i];

      if (a[clave] < b[clave]) {
        resultado = -1;
      }
      else if (a[clave] > b[clave]) {
        resultado = 1;
      }

      i++;
    }

    return resultado;
  });
}

/**
 * recibe las rutas del archivo de deudas original, archivo de pagos, archivo de deudas con las actualizaciones, y archivo de error para registrar errores o advertencias.
 * @param {string} rutaDeudasOld
 * @param {string} rutaPagos
 * @param {string} rutaDeudasNew
 * @param {string} rutaLog
 */
function actualizarArchivosDeudas(rutaDeudasOld, rutaPagos, rutaDeudasNew, rutaLog) {
  // Leo el archivo de deudas y lo parseo
  const deudas = JSON.parse(
    fileUtils.leerArchivoComoString(rutaDeudasOld)
  );

  // Leo el archivo de pagos y lo parseo
  const pagos = JSON.parse(
    fileUtils.leerArchivoComoString(rutaPagos)
  );

  // Defino el logger
	const loggerCallback = error => fileUtils.agregarTextoEnArchivo(rutaLog, error, true);
	
  // Ordeno las deudas y pagos
  ordenar(deudas, ["dni", "nombre", "apellido"]);
  ordenar(pagos, ["dni", "nombre", "apellido", "fecha"]);

  // Actualizo las deudas
  const deudasActualizadas = actualizarDeudas(deudas, pagos, loggerCallback);

  // Las guardo en el nuevo archivo
  fileUtils.escribirTextoEnArchivo(
    rutaDeudasNew,
    JSON.stringify(deudasActualizadas, null, 4),
    true
  );
}

/**
 * @callback loggerCallback
 * @param {string} error error message to display
 */

/**
 * realiza el apareo con actualizacion entre deudas y pagos, y loguea algunos eventos relevantes.
 * @param {Object[]} deudas las deudas originales
 * @param {Object[]} pagos los pagos a aplicar
 * @param {loggerCallback} logger funcion a la cual llamar en caso de necesitar loguear un evento
 * @returns {Object[]} las deudas actualizadas
 */
function actualizarDeudas(deudas, pagos, logger) {
  // Realizo un apareo entre ambas listas
  let deuda = 0;
  let pago = 0;
  let indexDeuda = 0;
  let indexPago = 0;
  const lengthDeuda = deudas.length;
  const lengthPago = pagos.length;
  const deudasActualizadas = [];

  while (indexDeuda < lengthDeuda || indexPago < lengthPago) {
    deuda = deudas[indexDeuda];
    pago = pagos[indexPago];

    // Sobraron pagos
    if (indexDeuda >= lengthDeuda) {
      logger(armarMsgPagoSinDeudaAsociada(pago));
      indexPago++;
    }
    // Sobraron deudas
    else if (indexPago >= lengthPago) {
      deudasActualizadas.push(deuda);
      indexDeuda++;
    }
    // Deuda DNI menor
    else if (deuda.dni < pago.dni) {
      // Si luego de aplicar todos los pagos correspondientes a una deuda, ésta queda en cero o
      // menos, la misma no debe agregarse al archivo de deudas actualizado.
      if (deuda.debe <= 0) {
        // En particular, si la deuda queda en negativo (por debajo de cero), se deben loguear los
        // datos del cliente y cuánto saldo a favor tiene.
        if (deuda.debe < 0) {
          logger(armarMsgPagoDeMas(deuda));
        }
      }
      // Si luego de aplicar todos los pagos correspondientes a una deuda, ésta queda aun
      // queda en positivo, se agrega al archivo actualizado con el nuevo importe.
      else {
        deudasActualizadas.push(deuda);
      }

      indexDeuda++;
    }
    // Pago DNI menor
    else if (pago.dni < deuda.dni) {
      logger(armarMsgPagoSinDeudaAsociada(pago));
      indexPago++;
    }
    // Iguales
    else {
      // Si aparece un registro de pago que coincide con una deuda en su dni pero no en su
      // apellido, el mismo no se procesa, y se deben loguear ambos, la deuda y el pago.
      if (deuda.apellido !== pago.apellido) {
        logger(armarMsgPagoConDatosErroneos(deuda, pago));
      }
      else {
        // Actualizo el balance
        deuda.debe -= pago.pago;
      }

      indexPago++;
    }
  }

  return deudasActualizadas;
}

/**
 * arma un mensaje informando los detalles de un pago que no corresponde a ninguna deuda
 * @param {Object} pago el pago sin deuda correspondiente
 * @returns {string} el mensaje a logguear
 */
function armarMsgPagoSinDeudaAsociada(pago) {
    const logMsg = `
el siguiente pago no corresponde a ninguna deuda:
${util.inspect(pago)}

=================================
`
    return logMsg
}

/**
 * arma un mensaje indicando el dni del sujeto que pagó de más, y cuanto dinero quedó a su favor
 * @param {Object} deuda la deuda con excedente de pago
 * @returns {string} el mensaje a logguear
 */
function armarMsgPagoDeMas(deuda) {
    const logMsg = `
dni: ${deuda.dni} posee $${Math.abs(deuda.debe)} a su favor

=================================
`
    return logMsg
}

/**
 * arma un mensaje mostrando la deuda, y el pago que no se pudo concretar, y notifica que el registro permanece sin cambios.
 * @param {Object} deuda
 * @param {Object} pago
 * @returns {string} el mensaje a logguear
 */
function armarMsgPagoConDatosErroneos(deuda, pago) {
    const logMsg = `
error al querer actualizar esta deuda:
${util.inspect(deuda)}
con este pago:
${util.inspect(pago)}

se mantiene el registro original sin cambios

=================================
`
    return logMsg
}

// no modificar la interfaz pública!
export default {
    actualizarArchivosDeudas
}
