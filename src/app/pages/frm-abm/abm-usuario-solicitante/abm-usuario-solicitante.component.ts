import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { firstValueFrom } from 'rxjs';
import {
  Persona,
  Unidad,
  UsuarioSolicitante,
} from 'src/app/modelos/index.models';
import { UsuarioSolicitanteService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-usuario-solicitante',
  templateUrl: './abm-usuario-solicitante.component.html',
  styleUrls: ['./abm-usuario-solicitante.component.scss'],
})
export class AbmUsuarioSolicitanteComponent implements OnInit {
  @ViewChild('closeUnidad') cerrarUnidad!: ElementRef;

  id?: number;
  modoEditar = false;
  private modalUnidad: bootstrap.Modal | null = null;
  editando: boolean = false;

  item: UsuarioSolicitante;

  constructor(
    private route: Router,
    private url: ActivatedRoute,
    private wsdl: UsuarioSolicitanteService
  ) {
    this.item = new UsuarioSolicitante();
  }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.modoEditar = !!this.id;
  }

  async guardar() {
  try {

    // Si no hay unidad → pedir carga
    if (!this.item?.unidadDpte || this.item.unidadDpte <= 0) {
      this.abrirModalUnidad();
      return;
    }

    const result = await Swal.fire({
      title: '¿El personal pertenece a esta unidad?',
      text: 'Por favor, confirme la unidad seleccionada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Sí, pertenece',
      cancelButtonText: 'No, modificar',
    });

    if (result.isConfirmed) {
      await this.procesarGuardado();
    } else {
      this.abrirModalUnidad();
    }

  } catch (error) {
    Swal.fire({
      title: 'Error al guardar el registro',
      text: 'Verifique los datos e intente nuevamente.',
      icon: 'error',
      confirmButtonColor: '#dc3545',
    });
  }
}


  // ✅ Abrir modal Bootstrap 5.1.3
  abrirModalUnidad() {
    const modalEl = document.getElementById('modalUnidad');
    if (modalEl) {
      this.modalUnidad =
        bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      this.modalUnidad.show();
    }
  }

  // ✅ Confirmar cambios desde el modal
  confirmarUnidad() {
    this.modalUnidad?.hide();
    this.modalUnidad = null;

    // Limpieza del backdrop (fondo negro)
    setTimeout(() => {
      document.querySelectorAll('.modal-backdrop').forEach((b) => b.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    }, 300);

    this.procesarGuardado();
  }

  private async procesarGuardado() {
    try {
      this.item.usuarioCrea = Number(Utils.getSession('user'));
      const data = await firstValueFrom(this.wsdl.insert(this.item));
      const result = JSON.parse(JSON.stringify(data));
      console.log("error1", result)
      if (result.code === '201') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro creado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.back();
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error) {
      console.log("error", error)
      Swal.fire({
        title: 'Error al crear registro, verifique!',
        icon: 'error',
      });
    }
  }

  back() {
    this.route.navigate(['pages/lst_usuario_solicitante']);
  }

  doFound(data: any) {
    //console.log('data', data);
    if (data.code === '200') {
      this.item.persona = data.data.id_persona;
      this.item.apellido = data.data.apellido;
      this.item.nombre = data.data.nombre;
      this.item.dni = data.data.DNI;
      this.item.jerarquia = data.data.jerarquia;
      this.item.unidadDpte = data.data.unidad_id;
      this.item.nombreUnidad = data.data.unidad;
      //console.log('resultado emitido:', this.item);
    }
  }

  unidadSeleccionada(event: Unidad | null) {
    if (event != undefined) {
      this.item.unidadDpte = event.id;
      this.item.nombreUnidad = event.nombre;

      //UturuncoUtils.setSession('unidad', JSON.stringify(event.id));
      //UturuncoUtils.setSession('nombreUnidad', JSON.stringify(event.nombre));
    }
    this.cerrarUnidad.nativeElement.click();
  }
}
