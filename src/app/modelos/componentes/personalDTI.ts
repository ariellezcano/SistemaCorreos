export class PersonalDTI {
  idPersonal!: number;
  nombre!: string;
  apellido!: string;
  dni!: number;
  fechaNacimiento!: Date | null;
  nroCred!: string;
  jerarquia!: string;
  plaza!: string;
  legajo!: string | null;
  fechaAltaUnidad!: Date | null;
  armamento!: string | null;
  calibre!: string | null;
  nroSerie!: string | null;
  fechaIngresoPol!: Date | null;
  instrumentoLegal!: string | null;
  domicilio!: string | null;
  telefonoCel!: string | null;
  fechaBaja!: Date | null;
  activo: boolean;

  constructor(){
    this.activo = true;
  }
}