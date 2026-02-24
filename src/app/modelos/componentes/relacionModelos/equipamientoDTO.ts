export class EquipamientoDTO {
    idEquipo!: number;
    marca!: string;
    modelo!: number;
    nombreModelo!: string;
    nroSerie!: string;
    tipoEquipo!: number;
    nombreTipoEquipo!: string;
    proveedor!: number;
    nombreProveedor!: string;
    id!: string;
    estado!: string; //entregado / en stock
    nroInventario!: number;
    ordenCompra!: string;
    activo: boolean;

    constructor(){
        this.activo = true;
    }
}