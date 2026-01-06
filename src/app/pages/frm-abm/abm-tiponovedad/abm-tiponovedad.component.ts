import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TipoNovedad } from 'src/app/modelos/index.models';
import { TipoNovedadService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-tiponovedad',
  templateUrl: './abm-tiponovedad.component.html',
  styleUrls: ['./abm-tiponovedad.component.scss']
})
export class AbmTiponovedadComponent implements OnInit {

  item: TipoNovedad;
    editando = false;
    id!: number;
  
    tiposNovedad: any[] = [];
  
    constructor(
      private wsdl: TipoNovedadService,
      private route: Router,
      private url: ActivatedRoute
    ) {
      this.item = new TipoNovedad();
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
        console.log("editando", data);
        const result = JSON.parse(JSON.stringify(data));
  
        if (result.code === '200') {
          Swal.fire('Novedad actualizada', '', 'success');
          this.back();
        }
      } catch {
        Swal.fire('Error', 'Error al actualizar la novedad', 'error');
      }
    }
  
    back() {
      this.route.navigate(['pages/lst_tipoNovedad']);
    }

}
