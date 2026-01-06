import { Component, OnInit, ViewChild } from '@angular/core';
import { FilTipoNovedadComponent } from '../../filtros/fil-tipo-novedad/fil-tipo-novedad.component';
import { TipoNovedad } from 'src/app/modelos/index.models';
import { TipoNovedadService } from 'src/app/services/index.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-lst-tiponovedad',
  templateUrl: './lst-tiponovedad.component.html',
  styleUrls: ['./lst-tiponovedad.component.scss'],
})
export class LstTiponovedadComponent implements OnInit {
  @ViewChild(FilTipoNovedadComponent, { static: false })
  fil!: FilTipoNovedadComponent;

  item: TipoNovedad;
  items: TipoNovedad[];

  constructor(private wsdl: TipoNovedadService, private route: Router) {
    this.item = new TipoNovedad();
    this.items = [];
  }

  ngOnInit(): void {}

  doFound(event: TipoNovedad[]) {
    //console.log('llegue', event);
    this.items = event;
  }

  linkear(id?: Number) {
    this.route.navigateByUrl('pages/abm_tipoNovedad/' + id);
  }

  back() {
    this.route.navigate(['pages/lst_tipoNovedad']);
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
      const data = await firstValueFrom(this.wsdl.delete(registro));
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
