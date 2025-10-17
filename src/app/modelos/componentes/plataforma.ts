export class Plataforma {

    id!: number;
    correoInstitucional!: number;
    sifcop: boolean;
    miminseg: boolean;
    fechaSolicitud: any
    estado!: string;
    fechaAlta: any;
    fechaNotificacion: any;
    usuarioSolicita!: number;
    usuarioCrea!: number;
    fechaCreacion: any;
    usuarioBaja!: number;
    fechaBaja: any;
    activo: boolean;

    constructor(){
        this.sifcop = false;
        this.miminseg = false;
        this.activo = true;
    }
}