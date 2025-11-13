export class UsuarioReclamoDTO{
    idReclamo!: number;
    nombre!: string;
    apellido!: string;
    dni!: number;
    jerarquia!: string;
    unidad!: string;
    correoInstitucional!: string;
    tipoCorreo!: string;
    sifcop!: boolean;
    miminseg!: boolean;
    fechaReclamo: any;
    estadoReclamo!: string;
    fechaSolucion: any;
    observacion!: string;

    constructor(){

    }
}