import { Component, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { FilMantenimientoComponent } from '../../filtros/fil-mantenimiento/fil-mantenimiento.component';
import { MantenimientoDTO } from 'src/app/modelos/componentes/relacionModelos/mantenimientoDTO';
import { MantenimientoService } from 'src/app/services/componentes/mantenimiento.service';
import { Router } from '@angular/router';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-lst-mantenimiento',
  templateUrl: './lst-mantenimiento.component.html',
  styleUrls: ['./lst-mantenimiento.component.scss'],
})
export class LstMantenimientoComponent implements OnInit {
  @ViewChild(FilMantenimientoComponent, { static: false })
  fil!: FilMantenimientoComponent;

  items: MantenimientoDTO[];

  rol: string = '';

  constructor(
    private wsdl: MantenimientoService,
    private route: Router,
  ) {
    // this.item = new Marca();
    this.items = [];
  }

  ngOnInit(): void {
    const personal = Utils.getSession('personal');

    if (personal) {
      try {
        const obj = JSON.parse(personal);
        this.rol = obj.rol || '';
      } catch {
        this.rol = '';
      }
    }
  }

  doFound(event: MantenimientoDTO[]) {
    this.items = event;
  }

  linkear(id?: Number) {
    this.route.navigateByUrl('pages/abm_mantenimiento/' + id);
  }

  //  back() {
  //    this.route.navigate(['pages/lst_marcas']);
  //  }

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
      console.log('resultado', result);
      if (result.code === '200') {
        Swal.fire('Operación realizada...', '', 'success');
        //this.back();
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

  puedeOperar(): boolean {
    return (
      this.rol === 'MANAGER' ||
      this.rol === 'DEVELOPER' ||
      this.rol === 'ADMINISTRADOR'
    );
  }

  puedeEliminar(): boolean {
    return this.rol === 'MANAGER' || this.rol === 'DEVELOPER';
  }
}
