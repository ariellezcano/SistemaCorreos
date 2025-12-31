import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { SolicitudReclamo, Unidad } from 'src/app/modelos/index.models';
import { SolicitudReclamoService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-solicitud-reclamo',
  templateUrl: './abm-solicitud-reclamo.component.html',
  styleUrls: ['./abm-solicitud-reclamo.component.scss'],
})
export class AbmSolicitudReclamoComponent implements OnInit {
  item: SolicitudReclamo;
  editando = false;
  id!: number;

  constructor(
    private wsdl: SolicitudReclamoService,
    private route: Router,
    private url: ActivatedRoute
  ) {
    this.item = new SolicitudReclamo();
  }

  ngOnInit(): void {
    this.id = Number(this.url.snapshot.params['id']);
    if (this.id > 0) {
      this.obtenerId();
    }
  }

  guardar() {
    if (this.id > 0 && this.editando) {
      this.editar();
    } else {
      this.crear();
    }
  }

  async obtenerId() {
    try {
      const data = await firstValueFrom(this.wsdl.getId(this.id));
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '200') {
        this.item = result.dato;

        if (this.item.fecha !== undefined) {
          this.item.fecha = moment(this.item.fecha).format('YYYY-MM-DD');
        }

        this.editando = true;
      }
    } catch {
      Swal.fire('Error', 'No se pudo obtener el registro', 'error');
    }
  }

  async crear() {
    this.item.usuarioReclamo = Number(Utils.getSession('user'));
    try {
      const data = await firstValueFrom(this.wsdl.insert(this.item));
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '201') {
        Swal.fire('Registro creado correctamente', '', 'success');
        this.back();
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch {
      Swal.fire('Error', 'Error al crear registro', 'error');
    }
  }

  async editar() {
    try {
      const data = await firstValueFrom(this.wsdl.update(this.id, this.item));
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '200') {
        Swal.fire('Registro actualizado', '', 'success');
        this.back();
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch {
      Swal.fire('Error', 'Error al actualizar registro', 'error');
    }
  }

  unidadSeleccionada(unidad: Unidad | null) {
    if (!unidad) {
      this.item.nombreUnidad = null;
      this.item.unidadReclamo = null;
      return;
    }

    this.item.nombreUnidad = unidad.nombre;
    this.item.unidadReclamo = unidad.id;
  }

  back() {
    this.route.navigate(['pages/lst_solicitudReclamo']);
  }
}
