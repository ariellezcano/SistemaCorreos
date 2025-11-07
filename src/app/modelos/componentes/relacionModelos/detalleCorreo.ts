export class DetalleCorreo {
  nombre!: string;
  apellido!: string;
  dni!: string;
  jerarquia!: string;
  unidad!: string;
  correoInstitucional!: string;
  tipoCorreo!: string;
  acta: boolean;

  constructor() {
    this.acta = false;
  }
}
