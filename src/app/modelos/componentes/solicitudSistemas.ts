export class SolicitudSistemas {
  idSolicitud!: number;
  fechaSolicitud: any;
  nroNota!: string;
  unidadPol: number | null = null;
  nombreUnidad: string | null = null;
  detalleSol!: string;
  estado!: string;
  activo: boolean;

  constructor() {
    this.activo = true;
  }
}
