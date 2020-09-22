const listaVeterinarias = document.getElementById(`lista-veterinarias`);
const pais = document.getElementById(`pais`);
const nombre = document.getElementById(`nombre`);
const apellido = document.getElementById(`apellido`);
const identificacion = document.getElementById(`identificacion`);
const form = document.getElementById(`form`);
const btnGuardar = document.getElementById(`btn-guardar`);
const indice = document.getElementById(`indice`);


let veterinarias = [
    {
        nombre: "Fulanito",
        apellido: "Sanchez",
        pais: "Argentina",
        identificacion: "123456789"

    },
    {
        nombre: "Pepe",
        apellido: "Gonzales",
        pais: "Chile",
        identificacion: "123456798"
    }
];

function listarVeterinarias(){
    const htmlVeterinarias = veterinarias.map((veterinaria, index) =>`<tr>
        <th scope="row">${index}</th>
        <td>${veterinaria.identificacion}</td>
        <td>${veterinaria.pais}</td>
        <td>${veterinaria.nombre}</td>
        <td>${veterinaria.apellido}</td>
        <td>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
        </div>
        </td>
    </tr>`).join("");
    listaVeterinarias.innerHTML = htmlVeterinarias;
    Array.from(document.getElementsByClassName(`editar`)).forEach((botonEditar, index) => { botonEditar.onclick = editar(index) })
   
    Array.from(document.getElementsByClassName(`eliminar`)).forEach((botonEliminar, index) => { botonEliminar.onclick = eliminar(index) })

}

function enviarDatos(e){
    e.preventDefault();
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value,
        identificacion: identificacion.value
    };
    const accion = btnGuardar.innerHTML;
    
    switch(accion){
        case 'Editar':
           
            veterinarias[indice.value] = datos;
            break;
        default:

            veterinarias.push(datos);
            break;    
    }
    listarVeterinarias();
    resetModal();
}

function editar(index){    
    return function cuandoClikeo(){
        btnGuardar.innerHTML = 'Editar' 
        $('#exampleModalCenter').modal('toggle');
        const veterinaria = veterinarias[index];
        indice.value = index;
        nombre.value = veterinaria.nombre;
        apellido.value = veterinaria.apellido;
        pais.value = veterinaria.pais;
        identificacion.value = veterinaria.identificacion;
    }
    
}

function resetModal(){
    indice.value = '';
    nombre.value = '';
    apellido.value = '';
    pais.value = '';
    identificacion.value = '';
    btnGuardar.innerHTML = 'Crear';
}

function eliminar (index){
    
    return function clickEnEliminar(){
        veterinarias = veterinarias.filter((veterinaria, indiceVeterinaria) => indiceVeterinaria !== index );
        
        listarVeterinarias();
    }
}


listarVeterinarias();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;