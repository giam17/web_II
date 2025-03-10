let numeros = [1,2,3,4,5,6,7,8,9,10]
let pares = []
let impares = []
let conPar = 0
let contImpar = 0
for(i = 0; i<= numeros.length; i++){
    if(numeros[i] %2 ==0){
        conPar ++
        pares.push(numeros[i])
    }
    else{
        impares.push(numeros[i])
        contImpar++
    }
}
console.log("La cantidad de numeros pares es: ",conPar ,". Y los numeros pares son: ", pares)
console.log("La cantidad de numeros Impares es: ",contImpar, ". Y Los numeros impares son: ", impares)