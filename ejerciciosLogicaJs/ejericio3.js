function invertido(num){ 
    let numStr = num.toString();
    let numInvertidoStr = numStr.split('').reverse().join('');
    let numInvertido = parseInt(numInvertidoStr);
    return numInvertido;
}
let resultado = invertido(1234)
console.log(resultado)