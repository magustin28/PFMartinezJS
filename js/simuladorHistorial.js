// Objeto Historial Simulador
class SimuladorHistorial {

    constructor(id, fechaSimulacion, fechaNacimiento, lineaPrestamo, edad, montoPrestamo, tasaPrestamo, cantidadCuotas, valorCuota, interes, seguro, iva, importeTotal, cft, buscador) {
        this.id = id;
        this.fechaSimulacion = fechaSimulacion;
        this.fechaNacimiento = fechaNacimiento;
        this.edad = edad;
        this.lineaPrestamo = lineaPrestamo;
        this.nivelIngresos = nivelIngresos;
        this.montoPrestamo = montoPrestamo;
        this.tasaPrestamo = tasaPrestamo;
        this.cantidadCuotas = cantidadCuotas;
        this.valorCuota = valorCuota;
        this.interes = interes;
        this.seguro = seguro;
        this.iva = iva;
        this.importeTotal = importeTotal;
        this.cft = cft;
        this.buscador = buscador;
    }

    //Buscador
    buscadorF = function () {
        let buscador = `Fecha: ${this.fechaSimulacion} - Prestamo: ${this.montoPrestamo}`;
        return buscador;
    }
}