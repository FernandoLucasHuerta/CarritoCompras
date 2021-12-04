const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener()
function cargarEventListener() {
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
            articulosCarrito = [];
            limpiarHTML();
    })
}


//funciones
function agregarCurso(e){
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

//eliminar un curso del carrito de compras 
function eliminarCurso(e) {
    console.log(e.target.classList);
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')
        //eliminar del arreglo
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        carritoHTML();
    }
}

function leerDatosCurso(curso) {
    //console.log(curso)
    
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

//revisar si un elemento ya existe en el carrito de ventas 
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        const cursos = articulosCarrito.map(curso =>{
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else{
                return curso;
            }
        });
        articulosCarrito = [...articulosCarrito, infoCursos]
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

        articulosCarrito = [...articulosCarrito, infoCurso]
        console.log(articulosCarrito)

    carritoHTML();
}

//Muestra carrito de compras en el html
function carritoHTML() {

    limpiarHTML();

        
    articulosCarrito.forEach(curso => {
            
            const {imagen, titulo, precio, cantidad,id } = curso 
            const row = document.createElement('tr');

            row.innerHTML = `
            <td>
            <img src="${imagen}" width ="180">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
            `;
            
            contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    //forma lenta de limpiar un html
//contenedorCarrito.innerHTML = '';
while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
}
}