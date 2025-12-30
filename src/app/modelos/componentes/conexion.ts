export class Conexion {

    idConexion!: number;
    unidadPol: number | null = null;
    nombreUnidad: string | null = null;
    gateway!: string;
    localidad!: string;
    bajadaSubida!: string;
    medioConexion!: string;
    tipoConexion!: string;
    ipEcom!: string;
    ipLanCria!: string;
    interfaz!: string;
    codigoOficina!: string;
    observaciones!: string;
    activo: boolean;

    constructor(){
        this.activo = true;
    }
}