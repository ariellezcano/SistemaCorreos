import { Component, OnInit, ViewChild } from '@angular/core';
import { FilEquipamientosComponent } from '../../filtros/fil-equipamientos/fil-equipamientos.component';
import { EquipamientoDTO } from 'src/app/modelos/componentes/relacionModelos/equipamientoDTO';
import { EquipamientoService } from 'src/app/services/componentes/equipamiento.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-lst-equipamientos',
  templateUrl: './lst-equipamientos.component.html',
  styleUrls: ['./lst-equipamientos.component.scss'],
})
export class LstEquipamientosComponent implements OnInit {
  @ViewChild(FilEquipamientosComponent, { static: false })
  fil!: FilEquipamientosComponent;

  item: EquipamientoDTO;
  items: EquipamientoDTO[];
  rol: string = '';

  constructor(
    private wsdl: EquipamientoService,
    private route: Router,
  ) {
    this.item = new EquipamientoDTO();
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

  doFound(event: EquipamientoDTO[]) {
    //console.log('llegue', event);
    this.items = event;
  }

  linkear(id?: Number) {
    this.route.navigateByUrl('pages/abm_equipamiento/' + id);
  }

  linkearAsignacion(id: Number) {
    this.route.navigateByUrl('pages/abm_asignacion/' + id);
  }

  verDetalle(idEquipo: number) {
    this.route.navigateByUrl('pages/detalle_entrega/' + idEquipo);
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
      const data = await firstValueFrom(this.wsdl.eliminar(registro));
      const result = JSON.parse(JSON.stringify(data));

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

  async desvincular(idEquipo: number) {
    if (!confirm('¿Desea desvincular este equipamiento?')) {
      return;
    }

    const data = await firstValueFrom(this.wsdl.desvincular(idEquipo));
    const result = JSON.parse(JSON.stringify(data));
    console.log('desvincular', result);
    if (result.code === '200') {
      this.fil.filter();
    } else {
      alert(result.message);
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

  puedeAsignar(): boolean {
    return this.puedeCrear();
  }

  puedeVerDetalle(): boolean {
    return this.puedeCrear();
  }

  puedeEditar(): boolean {
    return this.puedeCrear();
  }

  puedeEliminar(): boolean {
    return this.rol === 'MANAGER' || this.rol === 'DEVELOPER';
  }

  puedeDesvincular(): boolean {
    return this.rol === 'MANAGER' || this.rol === 'DEVELOPER';
  }
}
