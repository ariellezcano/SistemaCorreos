import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

import { Licencias } from 'src/app/modelos/componentes/licencias';
import { PersonalDTI } from 'src/app/modelos/componentes/personalDTI';
import { LicenciasService } from 'src/app/services/componentes/licencias.service';
import { PersonalDTIService } from 'src/app/services/componentes/personal-dti.service';

@Component({
  selector: 'app-abm-licencias',
  templateUrl: './abm-licencias.component.html',
  styleUrls: ['./abm-licencias.component.scss'],
})
export class AbmLicenciasComponent implements OnInit {
  personal: PersonalDTI | null = null;

  licencias: Licencias[] = [];

  idPersonal: number = 0;

  busqueda: string = '';

  pagina: number = 1;
  cantidad: number = 10;

  totalRegistros: number = 0;
  totalPaginas: number = 0;

  paginas: number[] = [];

  item: Licencias = new Licencias();

  editando: boolean = false;
  mostrarFormulario: boolean = false;

  constructor(
    private wsdl: LicenciasService,
    private personalService: PersonalDTIService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && Number(id) > 0) {
      this.idPersonal = Number(id);

      this.obtenerPersonal();
      this.listar();
    } else {
      Swal.fire('Atención', 'No se encontró el personal', 'warning');

      this.volver();
    }
  }

  // ==========================================
  // OBTENER PERSONAL
  // ==========================================

  async obtenerPersonal() {
    try {
      const re = await firstValueFrom(
        this.personalService.getId(this.idPersonal),
      );

      const result = JSON.parse(JSON.stringify(re));

      if (result.code === '200') {
        this.personal = result.dato;
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error) {
      console.error(error);

      Swal.fire('Error', 'No se pudo obtener el personal', 'error');
    }
  }

  // ==========================================
  // LISTAR LICENCIAS
  // ==========================================

  async listar() {
    try {
      const re = await firstValueFrom(
        this.wsdl.getList(
          this.idPersonal,
          this.pagina,
          this.cantidad,
          this.busqueda,
        ),
      );

      const result = JSON.parse(JSON.stringify(re));

      if (result.code === '200') {
        this.licencias = result.data ?? [];

        this.totalRegistros = result.totalRegistros ?? 0;

        this.totalPaginas = result.totalPaginas ?? 0;

        this.generarPaginas();
      } else {
        this.licencias = [];

        this.totalRegistros = 0;
        this.totalPaginas = 0;
        this.paginas = [];

        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error) {
      console.error(error);

      this.licencias = [];

      this.totalRegistros = 0;
      this.totalPaginas = 0;
      this.paginas = [];

      Swal.fire('Error', 'No se pudieron obtener las licencias', 'error');
    }
  }

  // ==========================================
  // BUSCAR
  // ==========================================

  buscar() {
    this.pagina = 1;

    this.listar();
  }

  // ==========================================
  // NUEVA LICENCIA
  // ==========================================

  nuevaLicencia() {
    this.editando = false;

    this.item = new Licencias();

    this.item.personal = this.idPersonal;
    this.item.anio = new Date().getFullYear();
    this.item.totalDias = 0;
    this.item.estado = 'ACTIVA';
    this.item.activo = true;

    this.mostrarFormulario = true;
  }

  async guardarLicencia() {
    if (!this.item.anio || this.item.anio <= 0) {
      Swal.fire('Atención', 'Debe ingresar el año', 'warning');
      return;
    }

    if (!this.item.totalDias || this.item.totalDias <= 0) {
      Swal.fire(
        'Atención',
        'Debe ingresar la cantidad total de días',
        'warning',
      );
      return;
    }

    try {
      this.item.personal = this.idPersonal;
      this.item.activo = true;

      const re = await firstValueFrom(this.wsdl.insert(this.item));

      const result = JSON.parse(JSON.stringify(re));

      if (result.code === '201') {
        await Swal.fire({
          icon: 'success',
          title: 'Licencia creada correctamente',
          timer: 1500,
          showConfirmButton: false,
        });

        this.mostrarFormulario = false;

        this.item = new Licencias();

        this.pagina = 1;

        await this.listar();
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error: any) {
      console.error(error);

      let mensaje = 'No se pudo crear la licencia';

      if (error?.error) {
        try {
          const resultado =
            typeof error.error === 'string'
              ? JSON.parse(error.error)
              : error.error;

          mensaje = resultado?.message ?? mensaje;
        } catch {
          // dejamos mensaje genérico
        }
      }

      Swal.fire('Error', mensaje, 'error');
    }
  }

  cancelarFormulario() {
    this.mostrarFormulario = false;
    this.item = new Licencias();
  }

  // ==========================================
  // EDITAR LICENCIA
  // ==========================================

  editarLicencia(licencia: Licencias) {
    /*
     * El mismo modal de Nueva Licencia
     * puede utilizarse para editar.
     */

    console.log('Editar licencia:', licencia);
  }

  // ==========================================
  // VER DETALLE
  // ==========================================

  verDetalle(licencia: Licencias) {
  this.router.navigate([
    'pages/abm_detalle_licencias',
    licencia.idLicencia
  ]);
}

  // ==========================================
  // ANULAR LICENCIA
  // ==========================================

  async anularLicencia(licencia: Licencias) {
    const confirmacion = await Swal.fire({
      title: '¿Anular licencia?',
      text: `Se anulará la licencia del año ${licencia.anio}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, anular',
      cancelButtonText: 'Cancelar',
    });

    if (!confirmacion.isConfirmed) {
      return;
    }

    try {
      const re = await firstValueFrom(this.wsdl.delete(licencia.idLicencia));

      const result = JSON.parse(JSON.stringify(re));

      if (result.code === '200') {
        Swal.fire({
          icon: 'success',
          title: 'Licencia anulada correctamente',
          timer: 1500,
          showConfirmButton: false,
        });

        if (this.licencias.length === 1 && this.pagina > 1) {
          this.pagina--;
        }

        await this.listar();
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error) {
      console.error(error);

      Swal.fire('Error', 'No se pudo anular la licencia', 'error');
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
    this.router.navigate(['pages/lst_personal_dti']);
  }
}
