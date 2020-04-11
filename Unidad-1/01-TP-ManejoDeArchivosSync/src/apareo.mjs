/**
 * toma dos arrays de números ordenados y en forma eficiente los combina en uno solo, aún ordenado
 * @param {number[]} arrA un array de números ordenados
 * @param {number[]} arrB otro array de números ordenados
 * @returns {number[]} un nuevo array de números ordenados
 */
function combinarDosArrays(arrA, arrB) {
  let a = 0;
  let b = 0;
  let indexA = 0;
  let indexB = 0;
  const lengthA = arrA.length;
  const lengthB = arrB.length;
  const arraysCombinados = [];

  while (indexA < lengthA || indexB < lengthB) {
    a = arrA[indexA];
    b = arrB[indexB];

    if (indexA >= lengthA) {
      arraysCombinados.push(b);
      indexB++;
    }
    else if (indexB >= lengthB) {
      arraysCombinados.push(a);
      indexA++;
    }
    else if (a < b) {
      arraysCombinados.push(a);
      indexA++;
    }
    else if (b < a) {
      arraysCombinados.push(b);
      indexB++;
    }
    else {
      arraysCombinados.push(a);
      indexA++;
      indexB++;
    }
  }

  return arraysCombinados;
}

/**
 * toma un array de muchos arrays de números ordenados y los combina en uno solo, aún ordenado
 * @param {number[][]} arrs el array de arrays de números que quiero combinar
 * @returns {nuber[]} el nuevo array de números ordenados
 */
function combinarNArrays(arrs) {
  return arrs.reduce((acc, a) => combinarDosArrays(acc, a));
}

// exportar ambas funciones
export {
  combinarDosArrays,
  combinarNArrays
};