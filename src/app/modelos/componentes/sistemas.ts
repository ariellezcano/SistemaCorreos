export class Sistemas {
    idSistemas!: number;
    nombreSistema!: string;
    anioImplementacion!: number;
    unidadPol: number | null = null;
    nombreUnidad: string | null = null;;
    disposicion!: string;
    fechaDisposicion: any;
    linkAcceso!: string;
    estado!: string; //en desarrollo / desarrollado
    observaciones!: string;
    activo: boolean;

    constructor(){
        this.activo = true;
    }
}