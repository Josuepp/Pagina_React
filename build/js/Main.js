
let computerList = [];
let carList = [];

let form = document.getElementById('formProduct')

if(!(localStorage.getItem('item'))){
    localStorage.setItem('item',JSON.stringify(computerList));
}
let dataStorageInfoParsed = JSON.parse(localStorage.getItem('item'));

function showInfo(datos){
    //var items = localStorage.getItem('item');
    //var datos = JSON.parse(items);

    let mostrar = document.querySelector(".show")
    mostrar.innerHTML = "";
    let show = datos.map((item) => {
    mostrar.innerHTML += 
        `
<center>
<section class="w-full pr-4  ">
    <div class="py-6 w-full btnComprar" id="${item.idProducto}">
    <div class=" md:flex sm:w-64 md:w-96 bg-white shadow-lg rounded-lg overflow-hidden ">
    <div class="w-1/3 lg:w-2/3 bg-cover"  style="background-image: url('${item.imagen}')">
    </div> 
    <div class="w-2/3 p-4">
        <p class=" md:invisible  w-32 "><img class="md:h-2" src="${item.imagen}" alt="img"></p>
        <h1 class="text-gray-900 font-bold text-2xl">${item.marca} ${item.modelo}</h1>
        <p class="mt-2 text-gray-600 text-sm">-Color: ${item.color}</p>
        <p class="mt-2 text-gray-600 text-sm">-Memoria Ram: ${item.ram}</p>
        <p class="mt-2 text-gray-600 text-sm">-Almacenamiento: ${item.almacenamiento}</p>
        <p class="mt-2 text-gray-600 text-sm">-Procesador: ${item.tipoProcesador} ${item.procesador}</p>
    <div class="flex item-center mt-2">
        
    </div>
    <div class="flex item-center justify-between mt-3">
        <h1 class="text-gray-700 font-bold text-xl">$${item.precio}</h1>
        <button class="ml-2 px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded " onclick="buy()"  >Comprar</button>
    </div>
    </div>
</div>
</section>
</center>

        `;   
    });
}

//Opteniendo los datos del input y agregando los productos al localStorage
form.addEventListener('submit', (e) => {
    let formData = new FormData(form);
    let computer = new Computer;
    let id = parseInt(new Date().getTime());
    e.preventDefault();
    computer.computer(formData.get('marca'),formData.get('modelo'),formData.get('color')
    ,formData.get('procesador'),formData.get('cpuType'),formData.get('ram'),formData.get('almacenamiento')
    ,formData.get('url'),formData.get('precio'),id);
    
    computerList = JSON.parse(localStorage.getItem('item'));
    computerList.unshift(computer);
    localStorage.setItem('item',JSON.stringify(computerList));
    showInfo(computerList);
    
})
showInfo(dataStorageInfoParsed);

//funcion para calcular el total a pagar
function totalPay(){
    let sum = 0;
    carList.map((item) => {
        let precio = parseInt(item.precio);
        sum = sum + precio;
        }
    );
    return sum; 
}

//funcion comprar para agregar producto al carrito de compras y mostrarlo
function buy(){
        let element = document.querySelector('.btnComprar').id;
        let computer = JSON.parse(localStorage.getItem('item'));
        computer.forEach((item) => {
            if(item.idProducto == element){
                carList.push(item);
            }
        });
    
        let showCar = document.querySelector('.showCar');
        let total = totalPay();
        showCar.innerHTML = `
        <div class=" flex flex-col justify-center text-center items-center bg-white rounded p-2">
            <p>N° de productos: ${carList.length}</p>
            <p>Total: $${total}</p>
            <button class="ml-2 px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded " onclick="pay()"  >Confirmar Compra</button>
        </div>
        `;     
       
}

//funcion para confirmar pago
function pay(){
    let showCar = document.querySelector('.showCar');
    let total = totalPay();
    showCar.innerHTML = `
    <div class="bg-white rounded p-2 text-center">
        <p>Total pagado: $${total}</p>
        <p>Gracias por su compra</p>
    </div>
    `;
    carList = [];
}

       










