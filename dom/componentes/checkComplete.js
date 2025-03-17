    const checkComplete=()=>{
        const i =document.createElement('i')// creacion de un icono 
        i.classList.add("far","fa-check-square","icon")//dando estilos al icono
        i.addEventListener("click",toggleCheck)
        return i;
    }
    

    const toggleCheck = (evento) => {
        const element = evento.target;
        element.classList.toggle('fas'); 
        element.classList.toggle('completeIcon'); 
        element.classList.toggle('far'); 
    };
    export default checkComplete;