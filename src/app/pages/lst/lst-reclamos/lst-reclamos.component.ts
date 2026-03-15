import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { firstValueFrom } from 'rxjs';
import { UsuarioReclamoDTO } from 'src/app/modelos/componentes/relacionModelos/usuarioReclamoDto';
import { Reclamos } from 'src/app/modelos/index.models';
import {
  PlataformaService,
  ReclamoService,
} from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilReclamosComponent } from '../../filtros/fil-reclamos/fil-reclamos.component';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-lst-reclamos',
  templateUrl: './lst-reclamos.component.html',
  styleUrls: ['./lst-reclamos.component.scss'],
})
export class LstReclamosComponent implements OnInit {
  @ViewChild(FilReclamosComponent, { static: false })
  fil!: FilReclamosComponent;

  items: UsuarioReclamoDTO[];
  item: Reclamos;

  modalRef: any;

  idPlataformaSeleccionada!: number;
  idReclamoSeleccionado!: number;
  rol: string = '';

  constructor(
    private wsdl: ReclamoService,
    private wsdlPlataforma: PlataformaService,
    private route: Router,
  ) {
    this.item = new Reclamos();
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

  doFound(data: UsuarioReclamoDTO[]) {
    this.items = data;
  }

  abrirModal(idReclamo: number, idPlataforma: number) {
    this.idReclamoSeleccionado = idReclamo;
    this.idPlataformaSeleccionada = idPlataforma;

    const modalEl = document.getElementById('modalReclamo')!;
    this.modalRef = new bootstrap.Modal(modalEl); // GUARDAMOS REFERENCIA
    this.modalRef.show();
  }

  async actualizar() {
    this.item.activo = false;
    //alert(this.idReclamoSeleccionado);
    try {
      const data = await firstValueFrom(
        this.wsdl.patchReclamo(
          this.idReclamoSeleccionado,
          this.item.estado,
          this.item.fechaSolucion,
          this.item.observacion,
          this.item.activo,
        ),
      );
      const result = JSON.parse(JSON.stringify(data));

      if (result?.code === '200') {
        await this.editarPlataforma();
        this.fil.filter();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error al modificar el dato',
        text: 'Ocurrió un error inesperado',
        icon: 'error',
      });
    }
  }

  async editarPlataforma() {
    this.item.estado = 'Alta';

    try {
      const data = await firstValueFrom(
        this.wsdlPlataforma.patchEstado(
          this.idPlataformaSeleccionada,
          this.item.estado,
        ),
      );
      const result = JSON.parse(JSON.stringify(data));

      if (result?.code === '200') {
        // 🔴 CERRAR MODAL
        if (this.modalRef) {
          this.modalRef.hide();
        }

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Modificación realizada',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error al modificar la plataforma',
        text: 'Ocurrió un error inesperado',
        icon: 'error',
      });
    }
  }

  nuevoReclamo() {
    this.route.navigate(['/pages/abm_reclamos']);
  }

  /* =========================
   PERMISOS POR ROL
========================= */

  puedeOperar(): boolean {
    return (
      this.rol === 'MANAGER' ||
      this.rol === 'DEVELOPER' ||
      this.rol === 'ADMINISTRADOR'
    );
  }

  puedeEditarReclamo(): boolean {
    return (
      this.rol === 'MANAGER' ||
      this.rol === 'DEVELOPER' ||
      this.rol === 'ADMINISTRADOR'
    );
  }
}
