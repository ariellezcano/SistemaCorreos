export class Licencias {
  idLicencia!: number;
  nroExpte!: string | null;
  anio!: number;
  totalDias!: number;
  estado!: string | null;
  personal!: number | null;
  activo!: boolean;

  // Calculados en backend
  diasUtilizados?: number;
  diasDisponibles?: number;

  constructor() {}
}
