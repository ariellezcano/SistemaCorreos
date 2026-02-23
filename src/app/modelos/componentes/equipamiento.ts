export class Equipamiento {

    idEquipo!: number;
    modelo!: number;
    nroSerie!: string;
    tipoEquipo!: number;
    proveedor!: number;
    id!: string;
    estado!: string; //entregado / en stock
    nroInventario!: number;
    ordenCompra!: string;
    activo: boolean;

    constructor(){
        this.activo = true;
    }
}