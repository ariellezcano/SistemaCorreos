export class UsuarioCorreoDto {
  idUsuario!: number;
  nombre!: string;
  apellido!: string;
  dni!: number;
  jerarquia!: string;
  unidad!: string;
  fechaSolicitud: any;
  idCorreo!: number;
  correoInstitucional!: string;
  contrasenia!: string;
  tipoCorreo!: string;
  fechaHabilitacion: any;
  fechaNotificacion: any;
  actaRecibida!: boolean;

  constructor(){

  }
}
