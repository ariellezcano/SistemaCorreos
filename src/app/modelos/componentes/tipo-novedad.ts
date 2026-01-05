export class TipoNovedad {
    idTipoNovedad!: number;
    nombre!: string;
    activo: boolean;
    
    constructor(){
        this.activo = true;
    }
}
