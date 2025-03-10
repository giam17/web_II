const datos =[
    {
        'materia': 'Programacion web II',
        'calificacion': 70
    },
    {
        'materia': 'Base de datos II',
        'calificacion': 80
    },
    {
        'materia': 'Robotica',
        'calificacion': 56
    },
    {
        'materia': 'Ingles II',
        'calificacion': 77
    },
    {
        'materia': 'Programacion III',
        'calificacion': 87
    },
    {
        'materia': 'Base de datos II',
        'calificacion': 67
    },
    {
        'materia': 'Programacion I',
        'calificacion': 87
    },
    {
        'materia': 'Base de datos I',
        'calificacion': 90
    },
    {
        'materia': 'Animacion digital',
        'calificacion': 65
    },
    {
        'materia': 'Ingles I',
        'calificacion': 55
    }
]
let materiaSeleccionada = ''
const NotaAprobacion = 51;
for( let i = 0; i< datos.length && NotaAprobacion == ''; i++){
    if(datos[i].calificacion <= NotaAprobacion){
        materiaSeleccionada = datos[i].materia
    }
}
if(materiaSeleccionada == ""){
    console.log("ewd")
} else{
    console.log("wefw")
}
