export class UsuarioSolicitante {

    id!: number;
    nombre!: string;
    apellido!: string;
    dni!: number;
    jerarquia!: string;
    unidadDpte: number | null = null;
    nombreUnidad: string | null = null;;
    fechaSolEcom: any;
    persona!: number;
    usuarioCrea!: number;
    fechaCreacion: any;
    usuarioBaja!: number;
    fechaBaja: any;
    activo!: boolean;

    constructor(){

    }
}