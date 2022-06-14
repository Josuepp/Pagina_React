//Función para buscar datos especificos
function searchFilter(orderBy, type){
    let globalData = JSON.parse(localStorage.getItem('item'));
    let dataFiltered;
    if (orderBy == "" || orderBy == " ") {
        dataFiltered = globalData;
    }else if(type == "ram"){
        dataFiltered = globalData.filter(computer => {
            return computer.ram.toLowerCase() == orderBy.toLowerCase();
        });
    }else if(type == "procesador"){
        dataFiltered = globalData.filter(computer => {
            return computer.tipoProcesador.toLowerCase() == orderBy.toLowerCase();
        });
    }else if(type == "marca") {
        dataFiltered = globalData.filter(computer => {
            return computer.marca.toLowerCase() == orderBy.toLowerCase();
        })
    }else if(type == "color"){
        dataFiltered = globalData.filter(computer => {
            return computer.color.toLowerCase() == orderBy.toLowerCase();
        })
    }else{
        dataFiltered = [];
    }
    //Mostrar si se encuentran o no resultados
    if(dataFiltered.length == 0){
        let mostrar = document.querySelector(".show");
        mostrar.innerHTML = `
            <h1>No se han encontrado resultados</h1>
        `
    }else{
        showInfo(dataFiltered);
    }
    console.log(dataFiltered);
}

function searchMessage(type2){
    let message = "";
    switch (type2) {
        case "ram":
            message = "Escriba la cantidad de memoria seguida de 'GB', puede escribirlo con mayuscula o minúscila, ej: 5gb, 4GB.";
            break;
        case "procesador":
            message = "Escriba el tipo de procesador, ej: Intel, AMD.";
            break;
        case "marca":
            message = "Escriba la marca de la computadora, ej: HP, Dell.";
            break;
        case "color":
            message = "Escriba el color de la computadora de la siguiente manera, rojo, verde, amarillo, etc.";
        default:
            break;
    }
    document.getElementById("messages").innerHTML = message + " (Si ya no va a buscar nada, limpie la barra de búsqueda y presione 'Buscar')";
}
searchMessage();


//Agregando función al formulario para que muestre la info
let searchForm = document.getElementById("searchForm");
searchForm.addEventListener('submit', (e) => {
    let formSearchData = new FormData(searchForm);
    e.preventDefault();
    searchFilter(formSearchData.get('search'), formSearchData.get('filter'));
});

//Mostrando mensaje de sugerencias
const showMessage = () => {
    let filter = new FormData(searchForm);
    console.log(filter.get("filter"));
    searchMessage(filter.get("filter"));
 }
