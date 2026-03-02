export class DetalleEntregaDto {
  idDetalle!: number;
  equipamiento!: number;
  nroSerie!: string;
  nroInventario!: number;
  estado!: string;
  idModelo!: number;
  nombreModelo!: string;
  idMarca!: number;
  nombreMarca!: string;
  destino!: number;
  nombreDestino!: string;
  fechaEntrega: any;
  observaciones!: string;
  activo!: boolean;
}
