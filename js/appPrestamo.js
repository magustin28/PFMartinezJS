mostrarPrestamos();
consultaHistorial();

const mainPrestamo = document.querySelector('#mainPrestamo');
const consultarEdad = document.querySelector('#consultarEdad');

consultarEdad.addEventListener('click', async function () {
    fechaN = document.querySelector('#fechaN').value;

    prestamoFiltro18a80 = tiposPrestamos.filter((prestamo) => prestamo.edadMinima == 18 && prestamo.edadMaxima <= 65);
    prestamoFiltro35a80 = tiposPrestamos.filter((prestamo) => prestamo.edadMaxima > 35 && prestamo.edadMaxima <= 65);
    prestamoFiltroMas80 = tiposPrestamos.filter((prestamo) => prestamo.edadMinima == 65);

    const divSimulador = document.createElement('div');
    divSimulador.id = "simulador";
    mainPrestamo.appendChild(divSimulador);

    const simulador = document.querySelector('#simulador');

    simulador.innerHTML = `
        <p class="" id="mensajePrestamoEdad"></p>
        <ul class="" id="mensajePrestamoEdadUl"></ul>
        <div class="mx-4 my-3 row d-flex align-items-center justify-content-evenly">
            <p class="col-12 col-md-5 col-lg-4 me-md-3 my-2 text-center">Seleccione una de las opciones</p>
            <select class="col-9 col-sm-4 col-md-3 my-2" id="listadoPrestamos"></select>
            <button class="col-4 col-md-2 my-2 btn btn-secondary" type="button" id="seleccionarPrestamo">Elegir</button>
        </div>
    `;

    mensajePrestamoEdad(fechaN, selectorFiltro(edad(fechaN)));

    listadoPrestamos(selectorFiltro(edad(fechaN)));

    const seleccionarPrestamo = document.querySelector('#seleccionarPrestamo');
    const prestamoSelecionadoClass = ['mx-2', 'fw-bold', 'text-danger', 'text-center'];

    if (seleccionarPrestamo) {
        seleccionarPrestamo.addEventListener('click', function () {

            const pPrestamoSelecionado = document.createElement('p');
            pPrestamoSelecionado.id = "prestamoSelecionado";
            simulador.appendChild(pPrestamoSelecionado);

            const divSimuladorDatos = document.createElement('div');
            divSimuladorDatos.id = "simuladorDatos";
            simulador.appendChild(divSimuladorDatos);

            const prestamoSelecionado = document.querySelector('#prestamoSelecionado');
            const simuladorDatos = document.querySelector('#simuladorDatos');

            if (document.querySelector('#listadoPrestamos').value == 0) {
                prestamoSelecionado.innerHTML = `Seleccione una de las opciones de la lista`;
                prestamoSelecionadoClass.forEach(clase => { prestamoSelecionado.classList.add(clase) })

            } else {

                prestamoSelecionado.innerHTML = `Usted a seleccionado ${document.querySelector('#listadoPrestamos').value}<br>Para simular su préstamo vamos a necesitar que nos indique los siguientes datos:`;

                prestamoSelecionadoClass.forEach(clase => { prestamoSelecionado.classList.remove(clase) })
                prestamoSelecionado.classList.add('m-3','m-md-4');

                simuladorDatos.innerHTML = `
                    <div class="m-3 m-md-4 row d-flex align-items-center justify-content-center justify-content-md-start">
                        <p class="col-11 col-md-4 mb-3 my-md-0 me-md-4 mb-0 text-center">Nivel de Ingresos</p>
                        <input class="col-9 col-md-3" type="number" name="nivelIngresos" id="nivelIngresos">
                    </div>
                    <div class="m-3 m-md-4 row d-flex align-items-center justify-content-center justify-content-md-start">
                        <p class="col-11 col-md-4 mb-3 my-md-0 me-md-4 mb-0 text-center">Monto del préstamo a solicitar</p>
                        <input class="col-9 col-md-3 mb-3 my-md-0 me-md-4" type="number" name="montoPrestamo" id="montoPrestamo">
                        <p class="col-9 col-md-4 mb-0 text-center text-md-start" id="montoMaximo">a</p>
                    </div>
                    <div class="m-3 m-md-4 row d-flex align-items-center justify-content-center justify-content-md-start">
                        <p class="col-11 col-md-4 mb-3 my-md-0 me-md-4 mb-0 text-center">Cantidad de cuotas a solicitar</p>
                        <input class="col-9 col-md-3 mb-3 my-md-0 me-md-4" type="number" name="cantidadCuotas" id="cantidadCuotas">
                        <p class="col-9 col-md-4 mb-0 text-center text-md-start" id="cuotasMaximas">a</p>
                    </div>
                    <div class="m-3 m-md-4 d-flex justify-content-center">
                        <button class="col-md-3 btn btn-success" type="button" id="btnSimular">Calcular</button>
                    </div>
                `;

                const montoMaximo = document.querySelector('#montoMaximo');
                const cuotasMaximas = document.querySelector('#cuotasMaximas');

                const nivelIngresos = document.querySelector('#nivelIngresos');
                const montoPrestamo = document.querySelector('#montoPrestamo');
                const cantidadCuotas = document.querySelector('#cantidadCuotas');

                montoMaximo.innerHTML = `Monto máximo a solicitar: ${formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).montoMaxino)}`;

                cuotasMaximas.innerHTML = `Cantidad máxima de cuotas a solicitar: ${buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cuotasMaximo} cuotas`;

                montoPrestamo.dispatchEvent(new Event('change'));

                cantidadCuotas.dispatchEvent(new Event('change'));

                const successClass = ['border', 'border-success', 'border-3'];
                const dangerClass = ['border', 'border-danger', 'border-3'];

                montoPrestamo.addEventListener('change', function () {
                    if (montoPrestamo.value > buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).montoMaxino) {
                        successClass.forEach(clase => { montoPrestamo.classList.remove(clase) })
                        dangerClass.forEach(clase => { montoPrestamo.classList.add(clase) })
                    } else if (montoPrestamo.value != 0) {
                        dangerClass.forEach(clase => { montoPrestamo.classList.remove(clase) })
                        successClass.forEach(clase => { montoPrestamo.classList.add(clase) })
                    }
                });

                cantidadCuotas.addEventListener('change', function () {
                    if (cantidadCuotas.value > buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cuotasMaximo) {
                        successClass.forEach(clase => { cantidadCuotas.classList.remove(clase) })
                        dangerClass.forEach(clase => { cantidadCuotas.classList.add(clase) })
                    } else if (cantidadCuotas.value != 0) {
                        dangerClass.forEach(clase => { cantidadCuotas.classList.remove(clase) })
                        successClass.forEach(clase => { cantidadCuotas.classList.add(clase) })
                    }
                });

                const btnSimular = document.querySelector('#btnSimular');

                btnSimular.addEventListener('click', function () {

                    const divResultadoSimulador = document.createElement('p');
                    divResultadoSimulador.id = "resultadoSimulador";
                    simuladorDatos.appendChild(divResultadoSimulador);

                    const resultadoSimulador = document.querySelector('#resultadoSimulador');

                    if ((montoPrestamo.value <= buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).montoMaxino) && (montoPrestamo.value >= buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).montoMinimo) && (cantidadCuotas.value <= buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cuotasMaximo) && (cantidadCuotas.value >= buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cuotasMinimo) && (montoPrestamo.value !== 0) && (cantidadCuotas.value !== 0)) {

                        let componentesFecha = fechaN.split("-");
                        let nacimientoFecha = `${componentesFecha[2]}/${componentesFecha[1]}/${componentesFecha[0]}`;

                        resultadoSimulador.innerHTML = `
                            <p class="mx-4 my-3">Le detallamos la simulación de su préstamo:</p>
                            <div class="row d-flex justify-content-center justify-content-md-evenly p-3 border border-secondary header-card">
                                <div class="col- col-md-5 mb-3 mb-md-0">
                                    <p class="mb-2">* Fecha de Nacimiento: ${nacimientoFecha}</p>
                                    <p class="mb-2">* Edad: ${edad(fechaN)} años</p>
                                    <p class="mb-2">* Línea: ${buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).nombre}</p>
                                    <p class="mb-2">* Nivel de Ingreso: ${formatoPesos(parseInt(nivelIngresos.value))}</p>
                                    <p class="mb-2">* Monto del préstamo a solicitar: ${formatoPesos(parseInt(montoPrestamo.value))}</p>
                                    <p class="mb-2">* Tasa: ${buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).tasa * 100}% TNA</p>
                                    <p class="mb-2">* Tiene que ingresar ${cantidadCuotas.value} cuotas de ${formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).valorCuota(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)))}</p>
                                </div>
                                <table class="col-10 col-md-5">
                                    <tr>
                                        <td class="col-5 text-start">Capital:</td>
                                        <td class="col-3 text-center">${formatoPesos(parseInt(montoPrestamo.value))}</td>
                                    </tr>
                                    <tr>
                                        <td class="col-5 text-start">Interes:</td>
                                        <td class="col-3 text-center">${formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoInteres(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)))}</td>
                                    </tr>
                                    <tr>
                                        <td class="col-5 text-start">Seguro:</td>
                                        <td class="col-3 text-center">${formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoSeguro(montoPrestamo.value))}</td>
                                    </tr>
                                    <tr>
                                        <td class="col-5 text-start">IVA (sobre Int. y Seg.):</td>
                                        <td class="col-3 text-center">${formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoIva(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)))}</td>
                                    </tr>
                                    <tr>
                                        <td class="col-2 text-start">Importe total:</td>
                                        <td class="col-3 text-center">${formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).totalAPagar(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)))}</td>
                                    </tr>
                                    <tr>
                                        <td class="col-2 text-start">CFT:</td>
                                        <td class="col-3 text-center">${buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cft(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value))}%</td>
                                    </tr>
                              </table>
                            </div>
                            <div>
                                <p class="mt-4 text-center">¿Quiere guardar la simulación calculada?</p>
                                <div class="my-4 row d-flex justify-content-around">
                                    <button class="col-3 mx-auto btn btn-success" type="button" id="guardarSimulacion">Si</button>
                                    <button class="col-3 mx-auto btn btn-danger" type="button" id="reinicar">No</button>
                                </div>
                            </div>
                        `;


                        const guardarSimulacion = document.querySelector('#guardarSimulacion');
                        const reinicar = document.querySelector('#reinicar');

                        guardarSimulacion.addEventListener('click', function () {

                            Swal.fire({
                                title: '¿Confirma que quiere guardar la simulación?',
                                showDenyButton: true,
                                showCancelButton: true,
                                confirmButtonText: 'Guardar',
                                denyButtonText: `No guardar`,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    crearCopiaSimulacion(nacimientoFecha);
                                    Swal.fire('Se guardo una copia de su simulación', 'Gracias por visitarnos. Esperamos que vuelta pronto!', 'success').then(() => {
                                        simulador.innerHTML = ``;
                                        document.querySelector('#fechaN').value = '';
                                    })
                                } else if (result.isDenied) {
                                    Swal.fire('No se guardo su simulación', '', 'info').then(() => {
                                        simulador.innerHTML = ``;
                                        document.querySelector('#fechaN').value = '';
                                    })
                                }
                            })
                        });

                        reinicar.addEventListener('click', function () {
                            simulador.innerHTML = ``;
                            document.querySelector('#fechaN').value = '';
                        });

                    } else {
                        resultadoSimulador.innerHTML = `
                        <p class="mx-2 fw-bold text-danger text-center">Ingrese los parámetros correctos</p>
                        `;
                    }
                });
            }

        });
    }
});