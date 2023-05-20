//FUNCIONES PÁGINA HOME-INDEX
//Mostrar productos
async function mostrarProductos() {

    const productos = document.querySelector('#productos');
    productos.innerHTML = ``;
    const classProductosAgregar = ['text-center', 'fs-5', 'fst-italic'];
    const classProductosEliminar = ['row', 'd-flex', 'justify-content-evenly'];

    await fetch('json/tiposProductos.json')
        .then(async (response) => {
            if (response.ok) {
                arrayProductos = await response.json()

                tiposProductos = arrayProductos.map(prop => new Producto(prop.id, prop.nombre, prop.disponible));

                tiposProductos.forEach((producto) => {

                    productos.innerHTML += `
            
                    <div class="col-9 col-md-4 col-lg-3 mx-1 my-2 mb-lg-0 d-flex flex-column justify-content-evenly align-items-center cardProductos">
                        <p class="mb-0">${producto.nombre}</p>
                        <p class="mb-0">${producto.disponible}</p>
                    </div>
                    `;
                });
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        })
        .catch((error) => {
            classProductosAgregar.forEach(clase => { productos.classList.add(clase) });
            classProductosEliminar.forEach(clase => { productos.classList.remove(clase) });
            productos.innerHTML = `Lo sentimos, no pudimos acceder a los productos disponible. Por favor, recargue la página o consulte mas tarde.`;
        });
}

//Formato Fecha
function formatearFecha(fechaDato) {
    const fecha = new Date(fechaDato);

    const dia = fecha.getDate();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    let hora = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    let periodo = 'AM';

    if (hora >= 12) {
        periodo = 'PM';
        if (hora > 12) {
            hora -= 12;
        }
    }

    const fechaFormateada = `${dia}/${mes}/${anio} ${hora}:${minutos} ${periodo}`;

    return fechaFormateada;
}

//FUNCIONES PÁGINA PRESTAMO
// Mostrar detalle de prestamo
async function mostrarPrestamos() {

    const divPrestamo = document.querySelector('#prestamo');
    divPrestamo.innerHTML = ``;

    const classProductosAgregar = ['text-center', 'fs-5', 'fst-italic'];
    const classProductosEliminar = ['mx-4', 'row'];

    await fetch('../json/tiposPrestamos.json')
        .then(async (response) => {
            if (response.ok) {
                arrayPrestamos = await response.json();

                tiposPrestamos = arrayPrestamos.map(prop => new Prestamo(prop.id, prop.nombre, prop.edadMinima, prop.edadMaxima, prop.montoMinimo, prop.montoMaxino, prop.garantia, prop.tipoGarantia, prop.tasa, prop.seguro, prop.iva, prop.cuotasMinimo, prop.cuotasMaximo));

                tiposPrestamos.forEach((prestamo, index) => {

                    const id = `collapse${index}`;
                    divPrestamo.innerHTML += `
            
                    <div class="col-12 col-md-4 col-lg my-2 my-md-0 mx-lg-3 accordion" id="accordionExample">
                        <div class="accordion-item">
                            <p class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="true" aria-controls="${id}">
                                Linea de Préstamo: ${prestamo.nombre}
                                </button>
                            </p>
                            <div id="${id}" class="accordion-collapse collapse">
                                <div class="accordion-body">
                                    <p>Edad mínima: ${prestamo.edadMinima} años</p>
                                    ${prestamo.edadMaxima != 100 ? `<p>Edad límite: ${prestamo.edadMaxima} años</p>` : ''}
                                    <p>Monto máximo a solicitar: ${formatoPesos(prestamo.montoMaxino)}</p>
                                    <p>Requiere de garantía: ${prestamo.garantia}</p>
                                    ${prestamo.tipoGarantia != 'N/A' ? `<p>Tipo de garantía: ${prestamo.tipoGarantia}</p>` : ''}
                                    <p>Tasa: ${prestamo.tasa * 100}% TNA</p>
                                    <p>Seguro: ${prestamo.seguro * 100}% sobre el capital solicitado</p>
                                    <p>Mínimo de cuotas a solicitar: ${prestamo.cuotasMinimo} cuotas</p>
                                    <p>Máximo de cuotas a solicitar: ${prestamo.cuotasMaximo} cuotas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                });

            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        })
        .catch((error) => {
            classProductosAgregar.forEach(clase => { divPrestamo.classList.add(clase) });
            classProductosEliminar.forEach(clase => { divPrestamo.classList.remove(clase) });
            divPrestamo.innerHTML = `Lo sentimos, no pudimos acceder a los préstamos disponible. Por favor, recargue la página o consulte mas tarde.`;
        });
}

// Formato Dinero/Pesos
function formatoPesos(valor) {
    return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}

//Calcular la edad
function edad(valor) {
    let componentesFecha = valor.split("-");
    let fechaNacimiento = new Date(componentesFecha[0], componentesFecha[1] - 1, componentesFecha[2]);
    let diferenciaMilisegundos = new Date() - fechaNacimiento;
    let edad = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365));
    return edad;
}

//Elgir filtro según la edad
function selectorFiltro(funcionEdad) {
    let arraySeleccionado;

    if (funcionEdad >= 18 && funcionEdad <= 35) {
        arraySeleccionado = prestamoFiltro18a80;
    } else if (funcionEdad >= 65) {
        arraySeleccionado = prestamoFiltroMas80;
    } else {
        arraySeleccionado = prestamoFiltro35a80;
    }

    return arraySeleccionado;
}

//Mensaje de Tipos de Préstamos de acuerdo a la edad
function mensajePrestamoEdad(valor, filtro) {

    const mensajePrestamoEdad = document.querySelector('#mensajePrestamoEdad');
    mensajePrestamoEdad.innerHTML = `De acuerdo a su edad: ${edad(valor)} años, puede acceder a las siguentes opciones de préstamos:`;

    const mensajePrestamoEdadUl = document.querySelector('#mensajePrestamoEdadUl');
    mensajePrestamoEdadUl.innerHTML = ``;

    mensajePrestamoEdad.classList.add('mx-4');
    mensajePrestamoEdadUl.classList.add('mx-4');

    filtro.forEach((prestamo) => {
        mensajePrestamoEdadUl.innerHTML += `
        <li class="my-2">${prestamo.nombre}</li>
        `;
    });
}

//Listado de Tipos de Préstamos de acuerdo a la edad
function listadoPrestamos(filtro) {
    const listadoPrestamos = document.querySelector('#listadoPrestamos');
    listadoPrestamos.innerHTML = `<option></option>`;

    filtro.forEach((prestamo) => {
        listadoPrestamos.innerHTML += `
        <option>${prestamo.nombre}</option>
        `;
    });
}

//Buscar dentro de Objetos por Nombre
function buscarArraysPorNombre(array, valor) {
    selecion = array.find((objeto) => objeto.nombre == valor);
    return selecion;
}

//Consulta hitorial de simulaciones
function consultaHistorial() {
    historialSimulacionesGuardadas = JSON.parse(localStorage.getItem('historialSimulaciones')) || [];
}

//Crea copia de la simulcion realizada
function crearCopiaSimulacion(fechaNacimiento) {

    const nuevaSimulacion = new SimuladorHistorial();

    const fechaDia = new Date();
    const fechaDiaF = `${fechaDia.getDate()}/${fechaDia.getMonth() + 1}/${fechaDia.getFullYear()}`;


    nuevaSimulacion.id = Math.floor(Math.random() * 100000) + 1;
    nuevaSimulacion.fechaSimulacion = fechaDiaF;
    nuevaSimulacion.fechaNacimiento = fechaNacimiento;
    nuevaSimulacion.edad = edad(fechaN);
    nuevaSimulacion.lineaPrestamo = buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).nombre;
    nuevaSimulacion.nivelIngresos = formatoPesos(parseInt(nivelIngresos.value));
    nuevaSimulacion.montoPrestamo = formatoPesos(parseInt(montoPrestamo.value));
    nuevaSimulacion.tasaPrestamo = buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).tasa;
    nuevaSimulacion.cantidadCuotas = parseInt(cantidadCuotas.value);
    nuevaSimulacion.valorCuota = formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).valorCuota(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)));
    nuevaSimulacion.interes = formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoInteres(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)));
    nuevaSimulacion.seguro = formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoSeguro(montoPrestamo.value));
    nuevaSimulacion.iva = formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoIva(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)));
    nuevaSimulacion.importeTotal = formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).totalAPagar(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)));
    nuevaSimulacion.cft = buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cft(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value));
    nuevaSimulacion.buscador = nuevaSimulacion.buscadorF();

    historialSimulacionesGuardadas.push(nuevaSimulacion);

    localStorage.setItem('historialSimulaciones', JSON.stringify(historialSimulacionesGuardadas));
}

//FUNCIONES PÁGINA HISTORIAL PRESTAMO
//Consultar historial
function listadoHistorial(filtro) {
    const listadoHistorial = document.querySelector('#listadoHistorial');
    listadoHistorial.innerHTML = `<option></option>`;

    filtro.forEach((simulacion) => {
        listadoHistorial.innerHTML += `
        <option>Fecha: ${simulacion.fechaSimulacion} - Prestamo: ${simulacion.montoPrestamo}</option>
        `;
    });
}

//Buscar dentro de Objetos por BuscadoR
function buscarArraysPorBuscador(array, buscador) {
    selecion = array.find((objeto) => objeto.buscador == buscador);
    return selecion;
}