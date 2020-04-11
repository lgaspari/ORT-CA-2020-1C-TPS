import * as fileUtils from "../src/utils/fileUtils.mjs";
import * as transformUtils from "../src/utils/transformUtils.mjs";
import * as apareo from "../src/apareo.mjs";

function contruirRutaIn(ruta) {
  return `${process.cwd()}/in/${ruta}.in`;
}

function contruirRutaOut(ruta) {
  return `${process.cwd()}/out/${ruta}.out`;
}

function leerArchivoYTransformar(ruta) {
  return (
    transformUtils.transformarStringEnArrayDeNumeros(
      fileUtils.leerArchivoComoString(ruta),
      ","
    )
  )
}

// leo los 4 archivosIn a memoria
// preparo los 4 arrays a partir de los ruta leidos
const archivosIn = [
  contruirRutaIn("10NumerosOrdenadosEntre1y50(setA)"),
  contruirRutaIn("10NumerosOrdenadosEntre1y50(setB)"),
  contruirRutaIn("imparesOrdenadosEntre1y999"),
  contruirRutaIn("paresOrdenadosEntre2y1000")
];
const arrays = archivosIn.map(ruta => leerArchivoYTransformar(ruta));

// combino los primeros dos arrays
const combinado = apareo.combinarDosArrays(arrays[0], arrays[1]);

// combino los cuatro arrays
const combinado2 = apareo.combinarNArrays(arrays);

// guardo los combinados
fileUtils.escribirTextoEnArchivo(contruirRutaOut("combinado"), combinado, true);
fileUtils.escribirTextoEnArchivo(contruirRutaOut("combinado2"), combinado2, true);