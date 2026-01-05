export class NovedadesDTI {
    idNovedad!: number;
    unidad!: number;
    nombreUnidad!: string;
    fechaNovedad!: any;
    tipoNovedad!: number;
    novedad!: string;
    activo: boolean;

    constructor(){
        this.activo = true;
    }
}
