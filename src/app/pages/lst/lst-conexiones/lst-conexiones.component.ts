import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Conexion } from 'src/app/modelos/index.models';
import { ConexionesService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilConexionesComponent } from '../../filtros/fil-conexiones/fil-conexiones.component';

@Component({
  selector: 'app-lst-conexiones',
  templateUrl: './lst-conexiones.component.html',
  styleUrls: ['./lst-conexiones.component.scss']
})
export class LstConexionesComponent implements OnInit {

    @ViewChild(FilConexionesComponent, { static: false })
     fil!: FilConexionesComponent;
   
     item: Conexion;
     items: Conexion[];
   
     constructor(private wsdl: ConexionesService, private route: Router) {
       this.item = new Conexion();
       this.items = [];
     }
   
     ngOnInit(): void {}
   
     doFound(event: Conexion[]) {
       //console.log('llegue', event);
       this.items = event;
     }
   
     linkear(id?: Number) {
       this.route.navigateByUrl('pages/abm_conexiones/' + id);
     }
   
     back() {
       this.route.navigate(['pages/lst_conexiones']);
     }
   
     async eliminar(registro: number) {
       Swal.fire({
         title: 'Estás seguro de eliminar?',
         showDenyButton: true,
         // showCancelButton: true,
         confirmButtonText: 'Eliminar',
         denyButtonText: `Cancelar`,
       }).then((result) => {
         /* Read more about isConfirmed, isDenied below */
         if (result.isConfirmed) {
           this.eliminacion(registro);
         } else if (result.isDenied) {
           Swal.fire('Operacion cancelada', '', 'info');
         }
       });
     }
   
     async eliminacion(registro: number) {
       try {
   
         const data = await firstValueFrom(
           this.wsdl.delete(registro)
         );
         const result = JSON.parse(JSON.stringify(data));
   
         if (result.code === '200') {
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
