export class Reclamos {

    id!: number;
    correoInstitucional!: number;
    fechaReclamo: any;
    estado!: string;
    fechaSolucion: any;
    observacion!: string;
    usuarioCrea!: number;
    fechaCreacion: any;
    activo: boolean;
    
    constructor(){
        this.activo = true;
    }
}