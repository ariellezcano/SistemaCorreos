import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import Swal from 'sweetalert2';

import { Utils } from 'src/app/utils/utils';

import { FilPersonalDtiComponent } from '../../filtros/fil-personal-dti/fil-personal-dti.component';
import { PersonalDTI } from 'src/app/modelos/componentes/personalDTI';
import { PersonalDTIService } from 'src/app/services/componentes/personal-dti.service';

@Component({
  selector: 'app-lst-personal-dti',
  templateUrl: './lst-personal-dti.component.html',
  styleUrls: ['./lst-personal-dti.component.scss'],
})
export class LstPersonalDtiComponent implements OnInit {
  @ViewChild(FilPersonalDtiComponent, { static: false })
  fil!: FilPersonalDtiComponent;

  items: PersonalDTI[] = [];

  rol: string = '';

  constructor(
    private wsdl: PersonalDTIService,
    private route: Router,
  ) {}

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

  doFound(event: PersonalDTI[]): void {
    this.items = event;
  }

  linkear(id: number = 0): void {
    this.route.navigateByUrl('pages/abm_personal_dti/' + id);
  }

  back(): void {
    this.route.navigate(['pages/lst_personal_dti']);
  }

  async eliminar(id: number): Promise<void> {
    const confirmacion = await Swal.fire({
      title: '¿Está seguro de eliminar?',

      text: 'Esta acción eliminará el registro seleccionado.',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Eliminar',

      cancelButtonText: 'Cancelar',

      confirmButtonColor: '#dc3545',

      cancelButtonColor: '#6c757d',
    });

    if (!confirmacion.isConfirmed) {
      return;
    }

    await this.eliminacion(id);
  }

  async eliminacion(id: number): Promise<void> {
    try {
      const data = await firstValueFrom(this.wsdl.delete(id));

      const result: any = data;

      if (result.code === '200') {
        await Swal.fire(
          'Operación realizada',
          result.message || 'Registro eliminado correctamente.',
          'success',
        );

        this.fil.filter();
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error: any) {
      console.error(error);

      Swal.fire({
        title: 'Error al eliminar el registro',
        text: error?.error?.message || 'Verifique e intente nuevamente.',
        icon: 'error',
      });
    }
  }

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
