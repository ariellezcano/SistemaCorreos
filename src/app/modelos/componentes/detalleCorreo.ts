export class DetalleCorreo{
    id!: number;
    correoInstitucional!: number;
    actaRecibida!: boolean;
    usuarioRecibe!: number;
    fechaRecepcion: any;
    activo: boolean; 

    constructor(){
        this.activo = true;
    }
}