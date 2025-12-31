export class SolicitudReclamo{

    idSolicitud!: number;
    fecha: any;
    nroTicket!: string;
    unidadReclamo: number | null = null;
    nombreUnidad: string | null = null;
    pedido!: string;
    estado!: string; //cumplido / pendiente
    anchoBandaSol!: string;
    usuarioReclamo!: number;
    observaciones!: string;
    activo!: boolean;

    constructor(){

    }
}