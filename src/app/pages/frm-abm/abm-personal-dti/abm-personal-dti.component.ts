import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { PersonalDTI } from 'src/app/modelos/componentes/personalDTI';

import { PersonalDTIService } from 'src/app/services/componentes/personal-dti.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-personal-dti',
  templateUrl: './abm-personal-dti.component.html',
  styleUrls: ['./abm-personal-dti.component.scss'],
})
export class AbmPersonalDtiComponent implements OnInit {
  // ID recibido por parámetro
  id: number = 0;

  // Indica si estamos creando o modificando
  editando: boolean = false;

  // Modelo
  item: PersonalDTI = new PersonalDTI();

  constructor(
    private route: Router,
    private url: ActivatedRoute,
    private wsdl: PersonalDTIService,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.url.snapshot.params['id']) || 0;

    this.editando = this.id > 0;

    // Si viene ID buscamos el registro
    if (this.editando) {
      this.buscarPorId();
    }
  }

  /* =====================================================
     BUSCAR POR ID
  ===================================================== */

  async buscarPorId(): Promise<void> {
    try {
      const data: any = await firstValueFrom(this.wsdl.getId(this.id));

      if (data.code === '200') {
        this.item = data.data;

        // Adaptamos las fechas recibidas desde .NET
        // al formato requerido por input type="date".
        this.normalizarFechas();
      } else {
        Swal.fire('Atención', data.message, 'warning');
      }
    } catch (error) {
      console.error('Error buscarPorId():', error);

      Swal.fire({
        title: 'Error',
        text: 'No fue posible obtener los datos del personal.',
        icon: 'error',
      });
    }
  }

  /* =====================================================
     GUARDAR
  ===================================================== */

  async guardar(): Promise<void> {
    try {
      if (this.editando) {
        await this.actualizar();
      } else {
        await this.crear();
      }
    } catch (error) {
      console.error('Error guardar():', error);

      Swal.fire({
        title: 'Error al guardar',
        text: 'Verifique los datos e intente nuevamente.',
        icon: 'error',
      });
    }
  }

  /* =====================================================
     CREAR
  ===================================================== */

  private async crear(): Promise<void> {
    try {
      /*
       * Todo Personal DTI nuevo se registra ACTIVO.
       *
       * fechaBaja queda NULL porque estamos realizando
       * un alta.
       */
      this.item.activo = true;
      this.item.fechaBaja = null;

      const data: any = await firstValueFrom(this.wsdl.insert(this.item));

      if (data.code === '201' || data.code === '200') {
        await Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Personal registrado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });

        this.back();
      } else {
        Swal.fire('Atención', data.message, 'warning');
      }
    } catch (error) {
      console.error('Error crear():', error);

      Swal.fire({
        title: 'Error',
        text: 'No fue posible registrar el personal.',
        icon: 'error',
      });
    }
  }

  /* =====================================================
     ACTUALIZAR
  ===================================================== */

  private async actualizar(): Promise<void> {
    try {
      const data: any = await firstValueFrom(
        this.wsdl.update(this.item.idPersonal, this.item),
      );

      if (data.code === '200') {
        await Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Personal actualizado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });

        this.back();
      } else {
        Swal.fire('Atención', data.message, 'warning');
      }
    } catch (error) {
      console.error('Error actualizar():', error);

      Swal.fire({
        title: 'Error',
        text: 'No fue posible actualizar el personal.',
        icon: 'error',
      });
    }
  }

  /* =====================================================
     PERSONAL SELECCIONADO DESDE EL BUSCADOR
  ===================================================== */

  doFound(data: any): void {
    console.log('data recibida', data);
    if (data.code === '200') {
      this.item.apellido = data.data.apellido;

      this.item.nombre = data.data.nombre;

      this.item.dni = data.data.DNI;

      this.item.jerarquia = data.data.jerarquia;

      console.log('Personal seleccionado:', this.item);
    }
  }

  /* =====================================================
     NORMALIZAR FECHAS
  ===================================================== */

  private normalizarFechas(): void {
    this.item.fechaNacimiento = this.fechaInput(
      this.item.fechaNacimiento,
    ) as any;

    this.item.fechaAltaUnidad = this.fechaInput(
      this.item.fechaAltaUnidad,
    ) as any;

    this.item.fechaIngresoPol = this.fechaInput(
      this.item.fechaIngresoPol,
    ) as any;
  }

  /*
   * .NET puede devolver:
   *
   * 2026-09-14T00:00:00
   *
   * El input type="date" necesita:
   *
   * 2026-09-14
   */
  private fechaInput(fecha: any): string | null {
    if (!fecha) {
      return null;
    }

    return String(fecha).substring(0, 10);
  }

  /* =====================================================
     VOLVER
  ===================================================== */

  back(): void {
    this.route.navigate(['pages/lst_personal_dti']);
  }
}
