export class Proveedor {
  idProveedor!: number;
  nombre!: string;
  activo: boolean;

  constructor() {
    this.activo = true;
  }
}
