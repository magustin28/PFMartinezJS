consultaHistorial();

const verHistorial = document.querySelector('#verHistorial');
const verSimulacion = document.querySelector('#verSimulacion');

if (historialSimulacionesGuardadas.length == 0) {
    verHistorial.innerHTML = `
        <p class="col- col-md-8 col-lg-9 mb-4 mb-md-0 me-2 text-center fs-5">No tiene historial para revisar</p>
        <a class="col-6 col-md-3 col-lg-2 btn btn-outline-info" href="prestamo.html">Regresar a Préstamos</a>
        `;
} else {
    verHistorial.innerHTML = `
        <p class="col- col-md-5 col-lg-4 text-center text-md-start mb-3 mb-lg-0 ">Seleccione una de las opciones</p>
        <select class="col-7 col-md-4 col-lg-3 mb-3 mb-lg-0" id="listadoHistorial"></select>
        <div class="col- col-mb-5 col-lg-5 row d-flex align-items-center justify-content-evenly gap-0 column-gap-3">
            <button class="col-4 col-md-3 my-2 btn btn-outline-success" type="button" id="seleccionarHistorial">Consultar</button>
            <button class="col-4 col-md-3 my-2 btn btn-outline-danger" type="button" id="borrarSimulacion">Eliminar</button>
            <button class="col-4 col-md-3 my-2 btn btn-outline-secondary" type="button" id="limpiarConsulta">Limpiar</button>
            <button class="col-5 col-md-3 col-lg-4 my-2 btn btn-danger" type="button" id="borrarHistorial">Eliminar Todo</button>
            <a class="col-8 col-md-4 col-lg-6 my-2 btn btn-outline-info" href="prestamo.html">Regresar a Préstamos</a>
        </div>
    `;

    listadoHistorial(historialSimulacionesGuardadas);

    const seleccionarHistorial = document.querySelector('#seleccionarHistorial');
    const borrarSimulacion = document.querySelector('#borrarSimulacion');
    const limpiarConsulta = document.querySelector('#limpiarConsulta');
    const borrarHistorial = document.querySelector('#borrarHistorial');

    seleccionarHistorial.addEventListener('click', function () {

        verSimulacion.innerHTML = `
            <p class="mx-4 my-3"">Detalles de la simulación guardada:</p>
            <div class="row d-flex justify-content-center justify-content-md-evenly p-3 border border-secondary header-card">
                <div class="col- col-md-5 mb-3 mb-md-0">
                    <p class="mb-2">* Fecha de Simulacion: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).fechaSimulacion}</p>
                    <p class="mb-2">* Fecha de Nacimiento: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).fechaNacimiento}</p>
                    <p class="mb-2">* Edad: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).edad} años</p>
                    <p class="mb-2">* Línea: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).lineaPrestamo}</p>
                    <p class="mb-2">* Nivel de Ingreso: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).nivelIngresos}</p>
                    <p class="mb-2">* Monto del préstamo a solicitar: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).montoPrestamo}</p>
                    <p class="mb-2">* Tasa: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).tasaPrestamo * 100}% TNA</p>
                    <p class="mb-2">* Tiene que ingresar ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).cantidadCuotas} cuotas de ${formatoPesos(buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).valorCuota)}</p>
                </div>
                <table class="col-10 col-md-5">
                    <tr>
                        <td class="col-5 text-start">Capital:</td>
                        <td class="col-3 text-center">${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).montoPrestamo}</td>
                    </tr>
                    <tr>
                        <td class="col-5 text-start">Interes:</td>
                        <td class="col-3 text-center">${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).interes}</td>
                    </tr>
                    <tr>
                        <td class="col-5 text-start">Seguro:</td>
                        <td class="col-3 text-center">${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).seguro}</td>
                    </tr>
                    <tr>
                        <td class="col-5 text-start">IVA (sobre Int. y Seg.):</td>
                        <td class="col-3 text-center">${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).iva}</td>
                    </tr>
                    <tr>
                        <td class="col-5 text-start">Importe total:</td>
                        <td class="col-3 text-center">${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).importeTotal}</td>
                    </tr>
                    <tr>
                        <td class="col-5 text-start"">CFT:</td>
                        <td class="col-3 text-center">${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).cft}%</td>
                    </tr>
              </table>
        `;
    });

    borrarSimulacion.addEventListener('click', function () {

        Swal.fire({
            title: '¿Confirma que quiere borrar la simulación?',
            text: `Fecha: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).fechaSimulacion} - Prestamo: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).montoPrestamo}`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            denyButtonText: `No borrar`,
        }).then((result) => {
            if (result.isConfirmed) {
                const simulacionABorrar = buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value));
                const indiceABorrar = historialSimulacionesGuardadas.indexOf(simulacionABorrar);
                historialSimulacionesGuardadas.splice(indiceABorrar, 1);
                localStorage.setItem('historialSimulaciones', JSON.stringify(historialSimulacionesGuardadas));
                Swal.fire('Se ha borrado su simulación', '', 'success').then(() => {

                    if (historialSimulacionesGuardadas.length == 0) {
                        verSimulacion.innerHTML = ``;
                        verHistorial.innerHTML = `
                            <p class="col- col-md-8 col-lg-9 mb-4 mb-md-0 me-2 text-center fs-5">No tiene historial para revisar</p>
                            <a class="col-6 col-md-3 col-lg-2 btn btn-outline-info" href="prestamo.html">Regresar a Préstamos</a>
                            `;
                    } else {
                    verSimulacion.innerHTML = ``;
                    listadoHistorial(historialSimulacionesGuardadas);
                    }
                })
            } else if (result.isDenied) {
                Swal.fire('No se ha borrado su simulación', `Fecha: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).fechaSimulacion} - Prestamo: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).montoPrestamo}`, 'info').then(() => {
                    verSimulacion.innerHTML = ``;
                    listadoHistorial(historialSimulacionesGuardadas);
                })
            }
        })
    });

    limpiarConsulta.addEventListener('click', function () {

        verSimulacion.innerHTML = ``;
        listadoHistorial(historialSimulacionesGuardadas);
    });

    borrarHistorial.addEventListener('click', function () {

        Swal.fire({
            title: 'Se borrara el historial completo. ¿Confirma operación?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            denyButtonText: `No borrar`,
        }).then((result) => {
            if (result.isConfirmed) {
                historialSimulacionesGuardadas.splice(0);
                localStorage.clear();

                Swal.fire('Se elimino su historial de simulaciones', 'Gracias por visitarnos. Esperamos que vuelta pronto!', 'success').then(() => {
                    verSimulacion.innerHTML = ``;
                    verHistorial.innerHTML = `
                    <p class="col-9 mb-0 me-2 text-center fs-5">No tiene historial para revisar</p>
                    <a class="col-2 btn btn-outline-info" href="prestamo.html">Regresar a Préstamos</a>
                    `;
                })
            } else if (result.isDenied) {
                Swal.fire('No se ha borrado su historial de simulaciones', '', 'info').then(() => {
                    verSimulacion.innerHTML = ``;
                    listadoHistorial(historialSimulacionesGuardadas);
                })
            }
        })
    })
}