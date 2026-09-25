export class DetalleLicencia {
  idDetLicencia!: number;
  licencia!: number | null;
  fechaNotificacion: string | null = null;
  diasSacados!: number;
  fechaFinalizacion: string | null = null;

  diasViaje!: number;
  estado!: string | null;
  activo!: boolean;
}
