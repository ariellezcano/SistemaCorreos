import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudReclamo } from 'src/app/modelos/index.models';
import { FilSolicitudReclamoComponent } from '../../filtros/fil-solicitud-reclamo/fil-solicitud-reclamo.component';
import { SolicitudReclamoService } from 'src/app/services/index.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-lst-solicitud-reclamo',
  templateUrl: './lst-solicitud-reclamo.component.html',
  styleUrls: ['./lst-solicitud-reclamo.component.scss']
})
export class LstSolicitudReclamoComponent implements OnInit {

  @ViewChild(FilSolicitudReclamoComponent, { static: false })
fil!: FilSolicitudReclamoComponent;

  ngOnInit(): void {
  }



item: SolicitudReclamo;
items: SolicitudReclamo[];

constructor(
  private wsdl: SolicitudReclamoService,
  private route: Router
) {
  this.item = new SolicitudReclamo();
  this.items = [];
}


doFound(event: SolicitudReclamo[]) {
  console.log('resultados', event);
  this.items = event;
}

linkear(id?: number) {
  this.route.navigateByUrl('pages/abm_solicitudReclamo/' + id);
}

back() {
  this.route.navigate(['pages/lst_solicitudes']);
}

async eliminar(id: number) {
  Swal.fire({
    title: '¿Eliminar solicitud?',
    showDenyButton: true,
    confirmButtonText: 'Eliminar',
    denyButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.eliminacion(id);
    } else if (result.isDenied) {
      Swal.fire('Operación cancelada', '', 'info');
    }
  });
}

async eliminacion(id: number) {
  try {
    const data = await firstValueFrom(this.wsdl.delete(id));
    const result = JSON.parse(JSON.stringify(data));

    if (result.code === '200') {
      Swal.fire('Solicitud eliminada', '', 'success');
      this.fil.filter();
    } else {
      Swal.fire('Atención', result.message, 'warning');
    }
  } catch (error: any) {
    Swal.fire('Error al eliminar registro', '', 'error');
  }
}


}
