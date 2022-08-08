class Cliente{
    constructor(dni,nombre,apellido,password,prestamos){
        this.dni=dni
        this.nombre = nombre
        this.apellido = apellido
        this.password = password
        this.prestamos = prestamos
    }
}
export const clientes =[]

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })

document.getElementById('btnSign').addEventListener('click', () => {
    Swal.fire({
        title: 'Registro',
        html: `<input type="number" id="dni" class="swal2-input" placeholder="DNI">
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
        <input type="text" id="apellido" class="swal2-input" placeholder="Apellido">
        <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: 'Registrarse',
        focusConfirm: false,
        preConfirm: () => {
          const dni = Swal.getPopup().querySelector('#dni').value
          const nombre = Swal.getPopup().querySelector('#nombre').value
          const apellido = Swal.getPopup().querySelector('#apellido').value
          const password = Swal.getPopup().querySelector('#password').value
          if (!dni|| !nombre|| !apellido || !password) {
            Swal.showValidationMessage(`Campos incompletos`)
          }
          return { dni: dni,nombre: nombre, apellido: apellido, password: password }
        }
      }).then((result) => {
        clientes.push(new Cliente(result.value.dni,result.value.nombre,result.value.apellido,result.value.password,[]));
        saveStorage(clientes);
        Toast.fire({
            icon: 'success',
            title: 'Registro Exitoso'
        })      
      })
})

export function saveStorage(cli){
    localStorage.setItem("clientes",JSON.stringify(cli))
}

document.getElementById('btnLog').addEventListener('click', () => {
    let logDni = document.getElementById('logDni').value
    let logPass = document.getElementById('logPass').value
    const cliente = clientes.find(element => element.dni == logDni)
    if(cliente){
        if(cliente.password === logPass){
            Toast.fire({
                icon: 'success',
                title: 'Inicio de Sesion exitoso'
            })
            sessionStorage.setItem("cliente-actual",JSON.stringify(cliente))
            inicioSesion()
            location.reload()
        }
        else{
            Toast.fire({
                icon: 'error',
                title: 'Contraseña denegada'
            })
        }
    }
    else{
        Toast.fire({
            icon: 'error',
            title: 'No esta registrado'
        })
    }
})
function inicioSesion(){
    let cliAct = JSON.parse(sessionStorage.getItem('cliente-actual'))
    if(cliAct){
        
        let head = document.getElementById('header')
        let newDiv = document.createElement('div')
        newDiv.innerHTML = `
        <div class='box-log'>
            <p>${cliAct.nombre} ${cliAct.apellido}</p>
            <button id='cerrar_sesion'>Cerrar Sesión</button>
        </div>
        `
        head.appendChild(newDiv)
        document.getElementById('log').innerHTML=`
            <h3>Simulaciones guardadas</h3>
            <h2 id='cant_sim'>0</h2>
            <button id='sim_guardadas'>Ver</button>
            <hr>
            <button id="save_sim">Guardar Simulación</button>
        `
    }
}

let memo = JSON.parse(localStorage.getItem('clientes'))
if(memo){
    memo.forEach(element => {
        clientes.push(new Cliente(element.dni,element.nombre,element.apellido,element.password,element.prestamos))
    });
}
inicioSesion();

document.getElementById('cerrar_sesion').addEventListener('click',() =>{
    sessionStorage.clear();
    location.reload()
})