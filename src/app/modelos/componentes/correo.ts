export class Correo {
  id!: number;
  usuarioSolicitante!: number;
  correoInstitucional!: string;
  contrasenia!: string;
  tipoCorreo!: string; //institucional personal o institucional unidad
  fechaHabilitacion: any;
  usuarioCrea!: number;
  fechaCreacion: any;
  usuarioBaja!: number;
  fechaBaja: any;
  activo: boolean;

  constructor() {
    this.activo = true;
  }
}
