//NO MODIFICAR EL TEST!
import ap from '../src/apareoConActualizacion.mjs'

const rutaDeudasOld = './in/deudasOLD.json'
const rutaPagos = './in/pagos.json'
const rutaDeudasNew = './out/deudasNEW.json'
const rutaLog = './out/notificaciones.log'

ap.actualizarArchivosDeudas(rutaDeudasOld, rutaPagos, rutaDeudasNew, rutaLog)
