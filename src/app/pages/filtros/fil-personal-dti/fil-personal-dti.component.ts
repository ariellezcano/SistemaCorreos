import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import { PersonalDTI } from 'src/app/modelos/componentes/personalDTI';
import { PersonalDTIService } from 'src/app/services/componentes/personal-dti.service';

@Component({
  selector: 'app-fil-personal-dti',
  templateUrl: './fil-personal-dti.component.html',
  styleUrls: ['./fil-personal-dti.component.scss'],
})
export class FilPersonalDtiComponent implements OnInit {
  @Output()
  emmit: EventEmitter<PersonalDTI[]> = new EventEmitter<PersonalDTI[]>();

  busqueda: string = '';

  items: PersonalDTI[] = [];

  paginaActual: number = 1;

  totalRegistros: number = 0;

  totalPaginas: number = 1;

  limit: number = 10;

  limits: number[] = [10, 20, 30];

  constructor(private wsdl: PersonalDTIService) {}

  ngOnInit(): void {
    this.filter();
  }

  buscar(): void {
    this.paginaActual = 1;
    this.filter();
  }

  cambiarLimite(): void {
    this.paginaActual = 1;
    this.filter();
  }

  setPage(estado: 'anterior' | 'siguiente'): void {
    if (estado === 'siguiente' && this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }

    if (estado === 'anterior' && this.paginaActual > 1) {
      this.paginaActual--;
    }

    this.filter();
  }

  async filter(): Promise<void> {
    try {
      const tieneBusqueda = this.busqueda && this.busqueda.trim() !== '';

      const data$ = this.wsdl.getList(
        this.paginaActual,
        this.limit,
        tieneBusqueda ? this.busqueda.trim() : undefined,
      );

      const result: any = await lastValueFrom(data$);

      if (result.code === '200') {
        this.items = result.data ?? [];

        this.totalRegistros = result.totalRegistros ?? 0;

        this.totalPaginas = result.totalPaginas ?? 1;
      } else if (result.code === '204') {
        this.items = [];

        this.totalRegistros = 0;

        this.totalPaginas = 1;
      }

      this.emmit.emit(this.items);
    } catch (error) {
      console.error('Error al obtener personal DTI:', error);

      this.items = [];

      this.totalRegistros = 0;

      this.totalPaginas = 1;

      this.emmit.emit(this.items);
    }
  }
}
