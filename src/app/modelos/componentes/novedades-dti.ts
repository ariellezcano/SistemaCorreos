export class NovedadesDTI {
    idNovedad!: number;
    unidad: number | null = null;
    nombreUnidad: string | null = null;
    fechaNovedad!: any;
    tipoNovedad!: number;
    novedad!: string;
    activo: boolean;

    constructor(){
        this.activo = true;
    }
}
