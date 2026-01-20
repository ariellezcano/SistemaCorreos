import { Correo } from "../correo";
import { UsuarioSolicitante } from "../usuario_solicitante";

export class CorreoSolicitanteDTO {
  correo: Correo;
  solicitante: UsuarioSolicitante;

  constructor() {
    this.correo = new Correo();
    this.solicitante = new UsuarioSolicitante();
  }
}
