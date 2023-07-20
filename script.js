const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []


Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

function addToCarritoItem(e) {
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;

    const itemPrice = item.querySelector('.precio').textContent
    const itemImg = item.querySelector('.card-img-top').src;


    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem)

}

function addItemCarrito(newItem) {

    const InputElemento = tbody.getElementsByClassName('input__elemento')
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = InputElemento[i]
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    }

    carrito.push(newItem)
    renderCarrito()
}

function renderCarrito() {
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
        
        <th scope="row">1</th>
                        <td class="table__productos">
                            <img src=${item.img} alt="">
                            <h6 class="title">${item.title}</h6>
                        </td>
                        <td class="table__precio"><p>${item.precio}</p></td>
                        <td class="table__cantidad"><input type="number" min="1" value=${item.cantidad} class="input__elemento"> <button class="delete btn btn-danger"> x </button></td>
         `
        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)

        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)

    })
    CarritoTotal()
}

function CarritoTotal() {
    let Total = 0;
    const itemCarTotal = document.querySelector('.itemCarTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio * item.cantidad
    })

    itemCarTotal.innerHTML = `Totall $${Total}`
    addLocalStorage()
}

function removeItemCarrito(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }
    tr.remove()
    CarritoTotal()
}

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        //Operador Ternario -------------------------------------
        if (item.title.trim() === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()

        }
    })
}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito()
    }
}

const whatsapp = document.getElementById("whatsapp").addEventListener("click", function(event){
    event.preventDefault();
    var url = "https://api.whatsapp.com/send/?phone=5493512456325&text&type=phone_number&app_absent=0";
    window.open(url, "_blank");
})

//----- Probando Librerias JS -----

Swal.fire(
    '¡Advertencia!',
    'Esta web es un solo de muestra, realizada por Galota Fabrizio en curso JS.',
    'warning'
)

const btnSwal = document.getElementById('btnSwal');

btnSwal.onclick = () => {

    Swal.fire({
        title: 'Lo Siento',
        text: 'La web es solo muestra. No puedes pedir realmente..',
        imageUrl: 'https://tvazteca.brightspotcdn.com/dims4/default/806e8bc/2147483647/strip/true/crop/945x630+127+0/resize/968x645!/format/jpg/quality/90/?url=https%3A%2F%2Ftvazteca.brightspotcdn.com%2F7a%2F99%2Fab9adea04197af25a465eef3e581%2Ftiktok-shrek-gatito-2.jpg',
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'gatito',
    })
}