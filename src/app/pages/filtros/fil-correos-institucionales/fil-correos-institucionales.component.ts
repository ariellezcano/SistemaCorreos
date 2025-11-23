import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UsuarioCorreoDto } from 'src/app/modelos/componentes/relacionModelos/usuarioCorreoDto';
import { CorreoInstitucionalService } from 'src/app/services/componentes/correo-institucional.service';

@Component({
  selector: 'app-fil-correos-institucionales',
  templateUrl: './fil-correos-institucionales.component.html',
  styleUrls: ['./fil-correos-institucionales.component.scss'],
})
export class FilCorreosInstitucionalesComponent implements OnInit {
  @Output() emmit: EventEmitter<UsuarioCorreoDto[]> = new EventEmitter();

  busqueda: any;
  items: UsuarioCorreoDto[];

  fechaDesde: string | null = null;
  fechaHasta: string | null = null;
chkPersonal = false;
chkDependencia = false;

  paginaAnterior!: number;
  anterior: boolean;
  paginaActual: number;
  siguiente: boolean;
  paginaSiguiente!: number;
  totalRegistros!: number;
  totalPaginas!: number;
  public limit: any;
  public limits: Number[] = [10, 20, 30];

  constructor(private wsdl: CorreoInstitucionalService) {
    this.busqueda = '';
    this.items = [];

    this.limit = 10;
    this.paginaActual = 1;
    this.siguiente = false;
    this.anterior = false;
  }

  ngOnInit(): void {
    this.filter();
  }

  setPage(page: any, estado: any) {
    this.paginaActual = page;
    if (estado == 'siguiente') {
      this.paginaSiguiente = this.paginaActual + 1;
      this.paginaActual = this.paginaSiguiente;
    }
    if (estado == 'anterior') {
      this.paginaAnterior = this.paginaActual - 1;
      this.paginaActual = this.paginaAnterior;
    }
    this.filter();
  }

  async filter() {
  try {
    const tipoCorreo =
      this.chkPersonal && !this.chkDependencia ? 'Personal Institucional' :
      this.chkDependencia && !this.chkPersonal ? 'Institucional Dependencia' :
      undefined; // Ambos seleccionados -> no filtra

    const fechaDesdeStr = this.fechaDesde ? this.fechaDesde : undefined;
    const fechaHastaStr = this.fechaHasta ? this.fechaHasta : undefined;

    const data$ = this.wsdl.getList(
      this.paginaActual,
      this.limit,
      this.busqueda ?? undefined,
      fechaDesdeStr,
      fechaHastaStr,
      tipoCorreo
    );

    const result = await lastValueFrom(data$);
    const Json = JSON.parse(JSON.stringify(result));
      console.log(Json);
    if (Json.code === '200') {
      this.items = Json.data ?? [];
      this.totalRegistros = Json.totalRegistros;
      this.totalPaginas = Json.totalPaginas;
    } else {
      this.items = [];
      this.totalRegistros = 0;
      this.totalPaginas = 1;
    }

   this.emmit.emit(this.items);
  } catch (error) {
    console.error('Error en filter():', error);
  }
}



//   async filter() {
//   try {
//     const tipoCorreo =
//       this.chkPersonal && !this.chkDependencia ? 'Personal Institucional' :
//       this.chkDependencia && !this.chkPersonal ? 'Institucional Dependencia' :
//       ''; // Ambos seleccionados -> no filtra

//       console.log(this.fechaDesde, this.fechaHasta)
//     const data$ = this.wsdl.getList(
//       this.paginaActual,
//       this.limit,
//       this.busqueda ?? '',
//       this.fechaDesde ?? '',
//       this.fechaHasta ?? '',
//       tipoCorreo
//     );

//     const result = await lastValueFrom(data$);
//     const Json = JSON.parse(JSON.stringify(result));

//     if (Json.code === '200') {
//       this.items = Json.data ?? [];
//       this.totalRegistros = Json.totalRegistros;
//       this.totalPaginas = Json.totalPaginas;
//     } else {
//       this.items = [];
//       this.totalRegistros = 0;
//       this.totalPaginas = 1;
//     }

//     this.emmit.emit(this.items);
//   } catch (error) {
//     console.error('Error en filter():', error);
//   }
// }

}
