import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { NovedadesDTO } from 'src/app/modelos/componentes/relacionModelos/novedades-dto';
import { NovedadesDTI } from 'src/app/modelos/index.models';
import { NovedadesDtiService } from 'src/app/services/index.service';

@Component({
  selector: 'app-fil-novedades-dti',
  templateUrl: './fil-novedades-dti.component.html',
  styleUrls: ['./fil-novedades-dti.component.scss'],
})
export class FilNovedadesDtiComponent implements OnInit {
  @Output() emmit: EventEmitter<NovedadesDTO[]> = new EventEmitter();

  busqueda: any;
  items: NovedadesDTO[];

  fechaDesde: string | null = null;
  fechaHasta: string | null = null;

  paginaAnterior!: number;
  anterior: boolean;
  paginaActual: number;
  siguiente: boolean;
  paginaSiguiente!: number;
  totalRegistros!: number;
  totalPaginas!: number;
  public limit: any;
  public limits: Number[] = [10, 20, 30];

  constructor(private wsdl: NovedadesDtiService) {
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
      const tieneBusqueda = this.busqueda && this.busqueda.trim() !== '';

      // Fechas (solo se envían si están cargadas)
      const fechaDesdeStr = this.fechaDesde ? this.fechaDesde : undefined;

      const fechaHastaStr = this.fechaHasta ? this.fechaHasta : undefined;

      const data$ = this.wsdl.getList(
        this.paginaActual,
        this.limit,
        tieneBusqueda ? this.busqueda : undefined,
        fechaDesdeStr,
        fechaHastaStr
      );

      const result = await lastValueFrom(data$);
      const Json = JSON.parse(JSON.stringify(result));

      if (Json.code === '200') {
        this.items = Json.data ?? [];
        this.totalRegistros = Json.totalRegistros;
        this.totalPaginas = Json.totalPaginas;
      } else if (Json.code === '204') {
        this.items = [];
        this.totalRegistros = 0;
        this.totalPaginas = 1;
      }

      this.emmit.emit(this.items);
    } catch (error) {
      console.error('Error en filter():', error);
    }
  }

  limpiarFiltros() {
    this.busqueda = '';
    this.fechaDesde = null;
    this.fechaHasta = null;

    this.paginaActual = 1;

    this.filter();
  }
}
