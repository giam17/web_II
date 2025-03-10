let frase = "La computadora es demasiado pesada para una mesa"
let palabras = frase.split(" ")
let palabraMasLarga = ""
for (let i = 0; i < palabras.length; i++) {
    if (palabras[i].length > palabraMasLarga.length) {
        palabraMasLarga = palabras[i]
    }
}
console.log("La palabra más larga es: ", palabraMasLarga)