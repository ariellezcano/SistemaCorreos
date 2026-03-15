import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SolicitudSistemas } from 'src/app/modelos/componentes/solicitudSistemas';
import { SolicitudesService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilSolicitudesComponent } from '../../filtros/fil-solicitudes/fil-solicitudes.component';

@Component({
  selector: 'app-lst-solicitudes',
  templateUrl: './lst-solicitudes.component.html',
  styleUrls: ['./lst-solicitudes.component.scss'],
})
export class LstSolicitudesComponent implements OnInit {
  @ViewChild(FilSolicitudesComponent, { static: false })
  fil!: FilSolicitudesComponent;

  item: SolicitudSistemas;
  items: SolicitudSistemas[];

  rol: string = '';

  constructor(
    private wsdl: SolicitudesService,
    private route: Router,
  ) {
    this.item = new SolicitudSistemas();
    this.items = [];
  }

  ngOnInit(): void {
    const personalString = Utils.getSession('personal');

    if (personalString) {
      const personal = JSON.parse(personalString);
      this.rol = personal.rol;
    }
  }

  doFound(event: SolicitudSistemas[]) {
    //console.log('llegue', event);
    this.items = event;
  }

  linkear(id?: Number) {
    this.route.navigateByUrl('pages/abm_solicitudes/' + id);
  }

  back() {
    this.route.navigate(['pages/lst_solicitudes']);
  }

  async eliminar(plataforma: number) {
    Swal.fire({
      title: 'Estás seguro de eliminar?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminacion(plataforma);
      } else if (result.isDenied) {
        Swal.fire('Operacion cancelada', '', 'info');
      }
    });
  }

  async eliminacion(plataforma: number) {
    try {
      const data = await firstValueFrom(this.wsdl.delete(plataforma));
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

  /* =========================
   PERMISOS
========================= */

  puedeCrear(): boolean {
    return (
      this.rol === 'ADMINISTRADOR' ||
      this.rol === 'MANAGER' ||
      this.rol === 'DEVELOPER'
    );
  }

  puedeEditar(): boolean {
    return this.puedeCrear();
  }

  puedeEliminar(): boolean {
    return this.rol === 'MANAGER' || this.rol === 'DEVELOPER';
  }
}
