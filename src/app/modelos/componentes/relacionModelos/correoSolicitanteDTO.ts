import { Correo } from '../correo';
import { UsuarioSolicitante } from './../usuario_solicitante';
export class CorreoSolicitanteDTO {
  Correo: Correo;
  UsuarioSolicitante: UsuarioSolicitante;

  constructor() {
    this.Correo = new Correo();
    this.UsuarioSolicitante = new UsuarioSolicitante();
  }
}
