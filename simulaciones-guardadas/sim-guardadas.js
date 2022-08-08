import { presCuotas, presMonto, cuota } from "../simulador/simulacion.js";
import { clientes, saveStorage } from "../usuarios/users.js";

class Prestamo {
  constructor(cant_cuotas, monto, cuota_final) {
    this.cant_cuotas = cant_cuotas;
    this.monto = monto;
    this.cuota_final = cuota_final;
  }
}

const cliAct = JSON.parse(sessionStorage.getItem("cliente-actual"));

document.getElementById("save_sim").addEventListener("click", () => {
  location.reload();
  clientes.forEach((element) => {
    if (element.dni === cliAct.dni) {
      element.prestamos.push(new Prestamo(presCuotas(), presMonto(), cuota()));
      sessionStorage.setItem("cliente-actual", JSON.stringify(element));
      simCargadas(element.prestamos.length);
    }
  });
  localStorage.setItem("clientes", JSON.stringify(clientes));
});

const simCargadas = (cant) => {
  document.getElementById("cant_sim").innerHTML = cant;
};
simCargadas(cliAct.prestamos.length);

document.getElementById("sim_guardadas").addEventListener("click", () => {
  document
    .getElementById("center_sim_cargados")
    .setAttribute("style", "transform: translate(100vw)");
});
document.getElementById("close_sim").addEventListener("click", () => {
  document
    .getElementById("center_sim_cargados")
    .setAttribute("style", "transform: translate(-100vw)");
});

cliAct.prestamos.forEach((element, index) => {
  let div = document.createElement("div");
  div.innerHTML = `
            <div class='box_prestamos'>
                <div>
                    <h3>Monto</h3>
                    <p>${element.monto}</p>
                </div>
                <div>
                    <h3>Cant. cuotas</h3>
                    <p>${element.cant_cuotas}</p>
                </div>
                <div>
                    <h3>Monto Final</h3>
                    <p>${element.monto + element.cant_cuotas}</p>
                 </div>
                <div>
                    <h3>Cuota Final</h3>
                    <p>${Math.trunc(element.cuota_final)}</p>
                </div>
                
            </div>
            <button id='btn_borrar_prest' class='btn_borrar_prest' value=${index}>Borrar</button>
        `;
  document.getElementById("cont_sim").appendChild(div);
});

const AccionBtnBorrar = function () {
  Swal.fire({
    title: "¿Seguro quiere eliminar esta simulación?",
    text: "Una vez borrado no podrá revertirlo",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borrar",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(clientes);
      clientes.forEach((element) => {
        if (element.dni === cliAct.dni) {
            Swal.fire(
                'Borrado!',
                'La simulación fue borrada con exito',
                'success'
              )
          element.prestamos.splice(this.value, 1);
          sessionStorage.setItem("cliente-actual", JSON.stringify(element));
        }
      });
      saveStorage(clientes);
      setTimeout((function() {
        window.location.reload();
      }), 1000);
    }
  });
};
const botones = document.querySelectorAll("#btn_borrar_prest");

botones.forEach((boton) => {
  boton.addEventListener("click", AccionBtnBorrar);
});
