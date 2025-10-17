import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Usuarios } from 'src/app/modelos/index.models';
import { UsuarioService } from 'src/app/services/index.service';

@Component({
  selector: 'app-fil-usuarios',
  templateUrl: './fil-usuarios.component.html',
  styleUrls: ['./fil-usuarios.component.scss'],
})
export class FilUsuariosComponent implements OnInit {
  @Output() emmit: EventEmitter<Usuarios[]> = new EventEmitter();

  busqueda: any;
  items: Usuarios[];

  paginaAnterior!: number;
  anterior: boolean;
  paginaActual: number;
  siguiente: boolean;
  paginaSiguiente!: number;
  totalRegistros!: number;
  totalPaginas!: number;
  public limit: any;
  public limits: Number[] = [10, 20, 30];

  constructor(private wsdl: UsuarioService) {
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

  // async filter() {
  //   try {
  //     const tieneBusqueda = this.busqueda && this.busqueda.trim() !== '';

  //     const data$ = this.wsdl.getList(
  //       this.paginaActual,
  //       this.limit,
  //       tieneBusqueda ? this.busqueda : undefined
  //     );
  //     console.log('DATA:', data$);
  //     const result = await lastValueFrom(data$); // ya devuelve el objeto listo
  //     console.log('Resultado:', result);
  //     const Json = JSON.parse(JSON.stringify(result));

  //     if (Json.code === "200") {
  //       console.log("aca estoysssss")
  //       this.items = Json.data;
  //       this.totalRegistros = Json.totalRegistros;
  //       this.totalPaginas = Json.totalPaginas;
  //     } else if (Json.code === "204") {
  //       console.log("aca estoyss")
  //       this.items = [];
  //       this.totalRegistros = 0;
  //       this.totalPaginas = 1;
  //     }

  //     //this.emmit.emit(this.items);
  //   } catch (error) {
  //     console.error('Error en filter():', error);
  //   }
  // }

  async filter() {
    try {
      const tieneBusqueda = this.busqueda && this.busqueda.trim() !== '';

      // No loguees el Observable, loguea el resultado después de esperar
      const data$ = this.wsdl.getList(
        this.paginaActual,
        this.limit,
        tieneBusqueda ? this.busqueda : undefined
      );

      // Espera a que el Observable emita
      const result = await lastValueFrom(data$);
      console.log('Resultado real:', result); // ✅ Aquí vas a ver code, data, etc.

      if (result.code === '200') {
        console.log('aca estoysssss');
        this.items = result.data ?? [];
        this.totalRegistros = result.totalRegistros;
        this.totalPaginas = result.totalPaginas;
      } else if (result.code === '204') {
        console.log('aca estoyss');
        this.items = [];
        this.totalRegistros = 0;
        this.totalPaginas = 1;
      }

      //this.emmit.emit(this.items);
    } catch (error) {
      console.error('Error en filter():', error);
    }
  }
}
