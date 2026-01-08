import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { NovedadesDTI, TipoNovedad, Unidad } from 'src/app/modelos/index.models';
import { NovedadesDtiService, TipoNovedadService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-novedades-dti',
  templateUrl: './abm-novedades-dti.component.html',
  styleUrls: ['./abm-novedades-dti.component.scss']
})
export class AbmNovedadesDtiComponent implements OnInit {

 item: NovedadesDTI;
  editando = false;
  id!: number;

  tiposNovedad: TipoNovedad[] = [];
  tipoNov: TipoNovedad;

  constructor(
    private wsdl: NovedadesDtiService,
    private tiposSrv: TipoNovedadService,
    private route: Router,
    private url: ActivatedRoute
  ) {
    this.item = new NovedadesDTI();
    this.tipoNov = new TipoNovedad();
  }

  ngOnInit(): void {
    this.id = Number(this.url.snapshot.params['id']);
    this.cargarTipos();

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

  async cargarTipos() {
    const data = await firstValueFrom(this.tiposSrv.getList(1,30));
    const result = JSON.parse(JSON.stringify(data));
    //console.log("tipos", result)
    this.tiposNovedad = result.data;
  }

  async obtenerId() {
    try {
      const data = await firstValueFrom(this.wsdl.getId(this.id));
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '200') {
        this.item = result.dato;
        this.item.fechaNovedad = moment(this.item.fechaNovedad).format('YYYY-MM-DD');
        this.editando = true;
      }
    } catch {
      Swal.fire('Error', 'No se pudo obtener la novedad', 'error');
    }
  }

  async crear() {
    try {
      const data = await firstValueFrom(this.wsdl.insert(this.item));
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '201') {
        Swal.fire('Novedad creada correctamente', '', 'success');
        this.back();
      }
    } catch {
      Swal.fire('Error', 'Error al crear la novedad', 'error');
    }
  }

  async editar() {
    try {
      const data = await firstValueFrom(this.wsdl.update(this.id, this.item));
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '200') {
        Swal.fire('Novedad actualizada', '', 'success');
        this.back();
      }
    } catch {
      Swal.fire('Error', 'Error al actualizar la novedad', 'error');
    }
  }

  unidadSeleccionada(unidad: Unidad | null) {
    if (!unidad) {
      this.item.unidad = null;
      this.item.nombreUnidad = null;
      return;
    }

    this.item.unidad = unidad.id;
    this.item.nombreUnidad = unidad.nombre;
  }

  back() {
    this.route.navigate(['pages/lst_novedadesDTI']);
  }

}
