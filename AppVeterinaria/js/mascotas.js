const listaMascotas = document.getElementById(`lista-mascotas`);
const tipo = document.getElementById(`tipo`);
const nombre = document.getElementById(`nombre`);
const dueno = document.getElementById(`dueno`);
const form = document.getElementById(`form`);
const btnGuardar = document.getElementById(`btn-guardar`);
const indice = document.getElementById(`indice`);

//busca los elementos del html por el id
//el array guarda los datos de todas las mascotas, cada uno tiene 3 tipos de datos
let mascotas = [
    {
        tipo: "Gato",
        nombre: "Negra",
        dueno: "Nico"

    },
    {
        tipo: "Conejo",
        nombre: "Pepina",
        dueno: "Flor"

    }
];

function listarMascotas(){
    const htmlMascotas = mascotas.map((mascota, index) =>`<tr>
        <th scope="row">${index}</th>
        <td>${mascota.tipo}</td>
        <td>${mascota.nombre}</td>
        <td>${mascota.dueno}</td>
        <td>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
        </div>
        </td>
    </tr>`).join("");
    listaMascotas.innerHTML = htmlMascotas;
    Array.from(document.getElementsByClassName(`editar`)).forEach((botonEditar, index) => { botonEditar.onclick = editar(index) })//** no se puede hacer con un html colecction, solo con array
    //por cada boton de editar recorre el array pero no retorna el resultado, a diferencia de map que si lo hace
    Array.from(document.getElementsByClassName(`eliminar`)).forEach((botonEliminar, index) => { botonEliminar.onclick = eliminar(index) })
    //botonEliminar (array function) closure
}

function enviarDatos(e){
    e.preventDefault();
    const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        dueno: dueno.value
    };
    const accion = btnGuardar.innerHTML;
    //la variable accion llama a un switch que diferencia entre editar o crear
    switch(accion){
        case 'Editar'://si el caso es editar, inserta los datos en el numero de index indicado
            //editar
            mascotas[indice.value] = datos;//edita los datos segun su indice, asi detecta que animal estas editando
            break;
        default://si es el caso default (crear) 
            //crear
            mascotas.push(datos);//asigna los datos ingresados al array
            break;    
    }
    listarMascotas();//renderiza las nuevas mascotas agregadas
    resetModal();//cada vez que se envian datos al array, sea editar o crear se resetea el modal
}

function editar(index){    
    return function cuandoClikeo(){
        btnGuardar.innerHTML = 'Editar' //cambia el texto de guardar por editar
        $('#exampleModalCenter').modal('toggle');//abre el modal por js para editar el elemento
        const mascota = mascotas[index];
        nombre.value = mascota.nombre;
        tipo.value = mascota.tipo;
        dueno.value = mascota.dueno;
        indice.value = index;
    }//cambia los valores guardados en el array cuando se apreta el boton de editar
    
}//Closure guarda el estado de la variable indice dentro de este scope
//cuandoClikeo solo se llama cuando se da click
//botonEditar.onclick = editar (index)) llama a la funcion en el click del boton pasandole la var indice
//esta funcion se mantiene asi hasta que se vuelva a llamar

function resetModal(){
    nombre.value = '';
    tipo.value = '';
    dueno.value = '';
    indice.value = '';
    btnGuardar.innerHTML = 'Crear';
}

function eliminar (index){
    //event bubbling (agarro el index con un closure)
    return function clickEnEliminar(){
        mascotas = mascotas.filter((mascota, indiceMascota) =>  indiceMascota !== index);
        //recorre el array y devuelve todos los indices menos el que esta seleccionado
        listarMascotas();
    }
}
//deja los valores vacios cada vez que se resetea

listarMascotas();//muestra el listado de mascotas

form.onsubmit = enviarDatos;//llama a la funcion cuando el usuario dispara este evento
btnGuardar.onclick = enviarDatos;//haciendo click en el boton guardar llama a la funcion enviarDatos