import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { Plataforma } from 'src/app/modelos/index.models';
import { PlataformaService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-actualizacionplataforma',
  templateUrl: './abm-actualizacionplataforma.component.html',
  styleUrls: ['./abm-actualizacionplataforma.component.scss'],
})
export class AbmActualizacionplataformaComponent implements OnInit {
  item: Plataforma;
  editando = false;

  id: any;

  constructor(
    private wsdl: PlataformaService,
    private url: ActivatedRoute,
    private router: Router
  ) {
    this.item = new Plataforma();
  }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.ObtenerId();
    this.editando = true;

  }

  async ObtenerId() {
      try {
        const data = await firstValueFrom(this.wsdl.getId(Number(this.id)));
        const result = JSON.parse(JSON.stringify(data));
        //console.log('find id', result);
  
        if (result.code === '200') {
          this.item = result.dato;
  
          if (this.item.fechaAlta) {
            this.item.fechaAlta = moment(
              this.item.fechaAlta
            ).isValid()
              ? moment(this.item.fechaAlta).format('YYYY-MM-DD')
              : null;
          }
  
          if (this.item.fechaNotificacion) {
            this.item.fechaNotificacion = moment(
              this.item.fechaNotificacion
            ).isValid()
              ? moment(this.item.fechaNotificacion).format('YYYY-MM-DD')
              : null;
          }
          this.editando = true;
        }
      } catch (error: any) {
        if (error.status === 500) {
          Swal.fire({
            title: 'Error al obtener el registro',
            text: 'Ocurrió un error inesperado. Verifique!',
            icon: 'error',
          });
        }
      }
    }
  
    // async guardar() {
    //   if (Number(this.id) > 0 && this.editando) {
    //     this.editar();
    //   } else {
    //     this.crear();
    //   }
    // }
  
    async editar() {
      try {
        const data = await firstValueFrom(this.wsdl.patch(this.id, this.item.estado, this.item.fechaAlta, this.item.fechaNotificacion));
        const result = JSON.parse(JSON.stringify(data));
        //console.log("result", result);
        if (result.code === '200') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro actualizado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          this.back();
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
  
    // async crear() {
    //   try {
    //     const data = await firstValueFrom(this.wsdl.insert(this.item));
    //     const result = JSON.parse(JSON.stringify(data));
  
    //     if (result.code === '201') {
    //       Swal.fire({
    //         position: 'top-end',
    //         icon: 'success',
    //         title: 'Registro creado correctamente',
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       this.back();
    //     } else {
    //       Swal.fire('Atención', result.message, 'warning');
    //     }
    //   } catch (error) {
    //     Swal.fire({
    //       title: 'Error al crear registro, verifique!',
    //       icon: 'error',
    //     });
    //   }
    // }
  
    back() {
      this.router.navigate(['pages/lst_plataforma']);
    }
  
    cancelar() {
      //this.item = {};
      this.editando = false;
    }


}
