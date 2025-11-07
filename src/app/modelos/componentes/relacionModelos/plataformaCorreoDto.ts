export class PlataformaCorreoDto {
  nombre!: string;
  apellido!: string;
  dni!: number;
  jerarquia!: string;
  unidad!: string;
  correoInstitucional!: string;
  tipoCorreo!: string;
  miminseg: boolean;
  sifcop: boolean;
  fechaSolicitud: any;
  estadoSolicitud!: string;
  fechaNotif: any;

  constructor() {
    this.sifcop = false;
    this.miminseg = false;
  }
}
