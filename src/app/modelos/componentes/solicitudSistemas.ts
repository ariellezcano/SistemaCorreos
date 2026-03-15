export class SolicitudSistemas {
  idSolicitud!: number;
  nroNota!: string;
  unidadPol!: number;
  nombreUnidad!: string;
  detalleSol!: string;
  estado!: string;
  activo: boolean;

  constructor() {
    this.activo = true;
  }
}
