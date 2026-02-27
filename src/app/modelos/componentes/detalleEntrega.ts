export class DetalleEntrega {
  idDetalle!: number;
  equipamiento!: number;
  destino: number | null = null;
  nombreDestino: string | null = null;
  fechaEntrega: any;
  observaciones!: string;
  activo: boolean;

  constructor() {
    this.activo = true;
  }
}
