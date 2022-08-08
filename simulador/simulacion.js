let variMonto = document.getElementById("monto")
variMonto.addEventListener("input", () =>{
    document.getElementById("inp-monto").value = variMonto.value
    mostrarPrestamo()
})

let variCuotas = document.getElementById("cuotas")
variCuotas.addEventListener("input", () =>{
    document.getElementById("inp-cuotas").value = variCuotas.value
    mostrarPrestamo()

})

export const presMonto = () => document.getElementById('monto').value
export const presCuotas = () => document.getElementById('cuotas').value
const presSueldo = () =>{
    if(document.getElementById('sueldo-si').checked){
        return 0.05
    }
    if(document.getElementById('sueldo-no').checked){
        return 0.057
    }
}
const cuotaConInteres = () => presSueldo()*presMonto()/(1-(Math.pow((1+presSueldo()),-presCuotas())))
const cuotaPura = () => presMonto()/presCuotas()
const iva = () => cuotaPura()*0.21
export const cuota = () => cuotaConInteres() + iva()

function mostrarPrestamo(){
    document.getElementById('cuo_pura').innerHTML ="$"+Math.trunc(cuotaPura())
    document.getElementById('iva').innerHTML = "$"+Math.trunc(iva())
    document.getElementById('int').innerHTML = "$"+Math.trunc(cuotaConInteres()-cuotaPura())
    document.getElementById('cuo_final').innerHTML = "$"+Math.trunc(cuota())
    document.getElementById('total_dev').innerHTML = "$"+Math.trunc(cuota()*presCuotas())
}

mostrarPrestamo()