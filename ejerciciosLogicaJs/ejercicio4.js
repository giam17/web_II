let numeros = [1,2,3,4,5,6,7,8,9,10,11,12,13]
let numerosPrimos = []
for(i = 0; i<= numeros.length; i++){
    if((numeros[i] == 2 || numeros[i] == 3) || (numeros[i] % 2 != 0 & numeros[i] % 3 != 0 )){
        numerosPrimos.push(numeros[i])
    }
}
console.log(numerosPrimos)