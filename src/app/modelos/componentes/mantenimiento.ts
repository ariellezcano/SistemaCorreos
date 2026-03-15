export class Mantenimiento {

    idMantenimiento!: number;
    sistema!: number;
    fechaTrabajo: any;
    detalleMantenimiento!: string;
    activo: boolean

    constructor(){
        this.activo = true;
    }
}