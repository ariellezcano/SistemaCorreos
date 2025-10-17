export class DetalleCorreo{
    id!: number;
    fechaNotificacion: any;
    actaRecibida!: boolean;
    usuarioRecibe!: number;
    fechaRecepcion: any;
    activo: boolean; 

    constructor(){
        this.activo = true;
    }
}