import { Component, OnInit, ViewChild } from '@angular/core';
import { FilModeloComponent } from '../../filtros/fil-modelo/fil-modelo.component';
import { MarcaModeloDTO } from 'src/app/modelos/componentes/relacionModelos/marcaModeloDTO';
import { ModeloService } from 'src/app/services/index.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-lst-modelo',
  templateUrl: './lst-modelo.component.html',
  styleUrls: ['./lst-modelo.component.scss']
})
export class LstModeloComponent implements OnInit {

 @ViewChild(FilModeloComponent, { static: false })
   fil!: FilModeloComponent;
 
   item: MarcaModeloDTO;
   items: MarcaModeloDTO[];
 
   constructor(
     private wsdl: ModeloService,
     private route: Router,
   ) {
     this.item = new MarcaModeloDTO();
     this.items = [];
   }
 
   ngOnInit(): void {}
 
   doFound(event: MarcaModeloDTO[]) {
     this.items = event;
   }
 
   linkear(id?: Number) {
     this.route.navigateByUrl('pages/abm_modelos/' + id);
   }
 
   back() {
     this.route.navigate(['pages/lst_modelos']);
   }
 
   async eliminar(id: number) {
     Swal.fire({
       title: 'Estás seguro de eliminar?',
       showDenyButton: true,
       // showCancelButton: true,
       confirmButtonText: 'Eliminar',
       denyButtonText: `Cancelar`,
     }).then((result) => {
       /* Read more about isConfirmed, isDenied below */
       if (result.isConfirmed) {
         this.eliminacion(id);
       } else if (result.isDenied) {
         Swal.fire('Operacion cancelada', '', 'info');
       }
     });
   }
 
   async eliminacion(id: number) {
     try {
       const data = await firstValueFrom(this.wsdl.delete(id));
       const result = JSON.parse(JSON.stringify(data));
       console.log("resultado", result)
       if (result.code === "200") {
         Swal.fire('Operación realizada...', '', 'success');
         this.back();
         this.fil.filter();
       } else {
         Swal.fire('Atención', result.message, 'warning');
       }
     } catch (error: any) {
       if (error.status == '500') {
         Swal.fire({
           title: 'Error al crear registro, verifique!',
           icon: 'error',
         });
       }
     }
   }
}
