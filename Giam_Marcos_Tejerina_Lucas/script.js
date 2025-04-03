document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector('[data-button]');
    const input = document.querySelector('[placeholder]');
    const taskList = document.querySelector('[data-task]');

    addBtn.addEventListener("click", () => {
        const text = input.value.trim();
        if (text !== "") {
            const newItem = document.createElement("li");
            newItem.classList.add("item");
            newItem.textContent = text;

            newItem.dataset.descripcion = text;
            
            newItem.addEventListener("click", () => {
                newItem.classList.toggle("relleno");
            });

            newItem.addEventListener("dblclick", () => {
                newItem.remove();
            });

            taskList.appendChild(newItem);
            input.value = "";
            taskList.appendChild(newItem);
            
            input.value = "";
        }
        if (text ==""){
            alert("Los valores no pueden estar vacios.")
        }
    });
});

toggleBtn.addEventListener("click", () => {
    const items = document.querySelectorAll("#taskList .item");
    if (items.length > 0) {
        const lastItem = items[items.length - 1];
        lastItem.classList.toggle("tachado");
    } else {
        alert("No hay tareas para tachar.");
    }
});

countBtn.addEventListener("click", () => {
    const items = document.querySelectorAll("#taskList .item");
    output.textContent = `Cantidad de tareas: ${items.length}`;
});

