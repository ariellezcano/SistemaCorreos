export class Licencias {
  idLicencia: number = 0;
  nroExpte: string | null = null;
  anio: number = 0;
  totalDias: number = 0;
  tipoLicencia: string | null = null;
  estado: string | null = null;
  personal: number | null = null;
  activo: boolean = true;

  diasUtilizados: number = 0;
  diasDisponibles: number = 0;

  // Datos del personal
  nombrePersonal: string | null = null;
  apellidoPersonal: string | null = null;
  dniPersonal: number | null = null;
}