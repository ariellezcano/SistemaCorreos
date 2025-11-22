import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UsuarioReclamoDTO } from 'src/app/modelos/componentes/relacionModelos/usuarioReclamoDto';
import { ReclamoService } from 'src/app/services/index.service';

@Component({
  selector: 'app-fil-reclamos',
  templateUrl: './fil-reclamos.component.html',
  styleUrls: ['./fil-reclamos.component.scss']
})
export class FilReclamosComponent implements OnInit {

 @Output() emmit: EventEmitter<UsuarioReclamoDTO[]> = new EventEmitter();
 
   busqueda: any;
   items: UsuarioReclamoDTO[];
 
   paginaAnterior!: number;
   anterior: boolean;
   paginaActual: number;
   siguiente: boolean;
   paginaSiguiente!: number;
   totalRegistros!: number;
   totalPaginas!: number;

   incluirInactivos: boolean = false;
   public limit: any;
   public limits: Number[] = [10, 20, 30];
 
   constructor(private wsdl: ReclamoService) {
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

    const data$ = this.wsdl.getList(
      this.paginaActual,
      this.limit,
      tieneBusqueda ? this.busqueda : undefined,
      this.incluirInactivos   // <---- NUEVO
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


}
