export class UsuarioReclamoDTO{
    nombre!: string;
    apellido!: string;
    dni!: number;
    jerarquia!: string;
    unidad!: string;
    correoInstitucional!: string;
    tipoCorreo!: string;
    fechaReclamo: any;
    estadoReclamo!: string;
    observacion!: string;

    constructor(){

    }
}