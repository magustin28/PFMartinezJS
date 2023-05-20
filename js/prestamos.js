// Objeto Préstamo
class Prestamo {

    constructor(id, nombre, edadMinima, edadMaxima, montoMinimo, montoMaxino, garantia, tipoGarantia, tasa, seguro, iva, cuotasMinimo, cuotasMaximo) {
        this.id = id;
        this.nombre = nombre;
        this.edadMinima = edadMinima;
        this.edadMaxima = edadMaxima;
        this.montoMinimo = montoMinimo;
        this.montoMaxino = montoMaxino;
        this.garantia = garantia;
        this.tipoGarantia = tipoGarantia;
        this.tasa = tasa;
        this.seguro = seguro;
        this.iva = iva;
        this.cuotasMinimo = cuotasMinimo;
        this.cuotasMaximo = cuotasMaximo;
    }

    //Cálculo Interes
    calculoInteres = function (montoPrestamo, cantidadCuotas) {
        let interes = montoPrestamo * this.tasa / 12 * cantidadCuotas;
        return interes;
    }

    //Cálculo Seguro
    calculoSeguro = function (montoPrestamo) {
        let seguro = montoPrestamo * this.seguro;
        return seguro;
    }

    //Cálculo IVA
    calculoIva = function (montoPrestamo, cantidadCuotas) {
        let iva = (this.calculoInteres(montoPrestamo, cantidadCuotas) + this.calculoSeguro(montoPrestamo)) * this.iva;
        return iva;
    }

    //Cálculo Total a Pagar
    totalAPagar = function (montoPrestamo, cantidadCuotas) {
        let totalAPagar = montoPrestamo + this.calculoInteres(montoPrestamo, cantidadCuotas) + this.calculoSeguro(montoPrestamo) + this.calculoIva(montoPrestamo, cantidadCuotas);
        return totalAPagar;
    }

    //Cálculo Valor de la Cuota
    valorCuota = function (montoPrestamo, cantidadCuotas) {
        let valorCuota = this.totalAPagar(montoPrestamo, cantidadCuotas) / cantidadCuotas;
        return valorCuota;
    }

    //Cálculo CFT
    cft = function (montoPrestamo, cantidadCuotas) {
        let cft = (((this.totalAPagar(montoPrestamo, cantidadCuotas) / montoPrestamo) - 1) / cantidadCuotas * 12 * 100).toFixed(2);
        return cft;
    }
}