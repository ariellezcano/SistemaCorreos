import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

import { DetalleLicencia } from 'src/app/modelos/componentes/detalleLicencia';
import { Licencias } from 'src/app/modelos/componentes/licencias';
import { DetalleLicenciaService } from 'src/app/services/componentes/detalle-licencia.service';
import { LicenciasService } from 'src/app/services/componentes/licencias.service';

@Component({
  selector: 'app-abm-detalle-licencias',
  templateUrl: './abm-detalle-licencias.component.html',
  styleUrls: ['./abm-detalle-licencias.component.scss'],
})
export class AbmDetalleLicenciasComponent implements OnInit {
  // ==========================================
  // LICENCIA
  // ==========================================

  idLicencia: number = 0;

  licencia: Licencias | null = null;

  // ==========================================
  // DETALLE
  // ==========================================

  detalles: DetalleLicencia[] = [];

  item: DetalleLicencia = new DetalleLicencia();

  // ==========================================
  // FORMULARIO
  // ==========================================

  mostrarFormulario: boolean = false;

  editando: boolean = false;

  // ==========================================
  // PAGINACION
  // ==========================================

  pagina: number = 1;

  cantidad: number = 10;

  totalRegistros: number = 0;

  totalPaginas: number = 0;

  paginas: number[] = [];

  constructor(
    private wsdl: DetalleLicenciaService,
    private licenciaService: LicenciasService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && Number(id) > 0) {
      this.idLicencia = Number(id);

      this.obtenerLicencia();

      this.listar();
    } else {
      Swal.fire('Atención', 'No se encontró la licencia', 'warning');

      this.volver();
    }
  }

  // ==========================================
  // OBTENER LICENCIA
  // ==========================================

  async obtenerLicencia() {
    try {
      const re = await firstValueFrom(
        this.licenciaService.getId(this.idLicencia),
      );

      const result = JSON.parse(JSON.stringify(re));

      if (result.code === '200') {
        this.licencia = result.dato;
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error) {
      console.error(error);

      Swal.fire('Error', 'No se pudo obtener la licencia', 'error');
    }
  }

  // ==========================================
  // LISTAR DETALLES
  // ==========================================

  async listar() {
    try {
      const re = await firstValueFrom(
        this.wsdl.getList(this.idLicencia, this.pagina, this.cantidad),
      );

      const result = JSON.parse(JSON.stringify(re));
      console.log('resultado', result);
      
      if (result.code === '200') {
        this.detalles = result.data ?? [];

        this.totalRegistros = result.totalRegistros ?? 0;

        this.totalPaginas = result.totalPaginas ?? 0;

        this.generarPaginas();
      } else {
        this.detalles = [];

        this.totalRegistros = 0;

        this.totalPaginas = 0;

        this.paginas = [];
      }
    } catch (error) {
      console.error(error);

      this.detalles = [];

      this.totalRegistros = 0;

      this.totalPaginas = 0;

      this.paginas = [];

      Swal.fire(
        'Error',
        'No se pudieron obtener los fraccionamientos',
        'error',
      );
    }
  }

  // ==========================================
  // NUEVO
  // ==========================================

  nuevo() {
    if (
      this.licencia &&
      this.licencia.diasDisponibles !== undefined &&
      this.licencia.diasDisponibles <= 0
    ) {
      Swal.fire('Atención', 'La licencia no tiene días disponibles', 'warning');

      return;
    }

    this.editando = false;

    this.item = new DetalleLicencia();

    this.item.licencia = this.idLicencia;

    this.item.diasSacados = 0;

    this.item.diasViaje = 0;

    this.item.estado = 'ACTIVA';

    this.item.activo = true;

    this.mostrarFormulario = true;
  }

  // ==========================================
  // EDITAR
  // ==========================================

  async editar(detalle: DetalleLicencia) {
    try {
      const re = await firstValueFrom(this.wsdl.getId(detalle.idDetLicencia));

      const result = JSON.parse(JSON.stringify(re));

      if (result.code === '200') {
        this.item = result.dato;

        this.editando = true;

        this.mostrarFormulario = true;
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error) {
      console.error(error);

      Swal.fire('Error', 'No se pudo obtener el detalle', 'error');
    }
  }

  // ==========================================
  // GUARDAR
  // ==========================================

  async guardar() {
    if (!this.item.diasSacados || this.item.diasSacados <= 0) {
      Swal.fire('Atención', 'Debe ingresar la cantidad de días', 'warning');

      return;
    }

    if (this.item.diasViaje < 0 || this.item.diasViaje > 2) {
      Swal.fire(
        'Atención',
        'Los días de viaje deben estar entre 0 y 2',
        'warning',
      );

      return;
    }

    if (!this.item.fechaNotificacion) {
      Swal.fire(
        'Atención',
        'Debe ingresar la fecha de notificación',
        'warning',
      );

      return;
    }

    try {
      this.item.licencia = this.idLicencia;

      const re = this.editando
        ? await firstValueFrom(
            this.wsdl.update(this.item.idDetLicencia, this.item),
          )
        : await firstValueFrom(this.wsdl.insert(this.item));

      const result = JSON.parse(JSON.stringify(re));

      if (result.code === '201' || result.code === '200') {
        await Swal.fire({
          icon: 'success',

          title: this.editando
            ? 'Fraccionamiento actualizado correctamente'
            : 'Fraccionamiento guardado correctamente',

          timer: 1500,

          showConfirmButton: false,
        });

        this.cancelar();

        /*
         * Actualizamos tanto la licencia
         * como el listado.
         *
         * Esto es importante porque cambian
         * diasUtilizados y diasDisponibles.
         */

        await this.obtenerLicencia();

        await this.listar();
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error: any) {
      console.error(error);

      let mensaje = 'No se pudo guardar el fraccionamiento';

      if (error?.error) {
        try {
          const result =
            typeof error.error === 'string'
              ? JSON.parse(error.error)
              : error.error;

          if (result?.message) {
            mensaje = result.message;
          }
        } catch {}
      }

      Swal.fire('Error', mensaje, 'error');
    }
  }

  // ==========================================
  // CANCELAR
  // ==========================================

  cancelar() {
    this.item = new DetalleLicencia();

    this.editando = false;

    this.mostrarFormulario = false;
  }

  // ==========================================
  // ANULAR
  // ==========================================

  async anular(detalle: DetalleLicencia) {
    const confirmacion = await Swal.fire({
      title: '¿Anular fraccionamiento?',

      text: `Se anulará el registro de ${detalle.diasSacados} días.`,

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Sí, anular',

      cancelButtonText: 'Cancelar',
    });

    if (!confirmacion.isConfirmed) {
      return;
    }

    try {
      const re = await firstValueFrom(this.wsdl.delete(detalle.idDetLicencia));

      const result = JSON.parse(JSON.stringify(re));

      if (result.code === '200') {
        await Swal.fire({
          icon: 'success',

          title: 'Fraccionamiento anulado correctamente',

          timer: 1500,

          showConfirmButton: false,
        });

        if (this.detalles.length === 1 && this.pagina > 1) {
          this.pagina--;
        }

        await this.obtenerLicencia();

        await this.listar();
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error) {
      console.error(error);

      Swal.fire('Error', 'No se pudo anular el fraccionamiento', 'error');
    }
  }

  // ==========================================
  // PAGINACION
  // ==========================================

  cambiarPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas || pagina === this.pagina) {
      return;
    }

    this.pagina = pagina;

    this.listar();
  }

  generarPaginas() {
    this.paginas = [];

    for (let i = 1; i <= this.totalPaginas; i++) {
      this.paginas.push(i);
    }
  }

  // ==========================================
  // VOLVER
  // ==========================================

  volver() {
    if (this.licencia?.personal) {
      this.router.navigate(['pages/abm_licencias', this.licencia.personal]);
    } else {
      this.router.navigate(['pages/lst_personal']);
    }
  }
}
