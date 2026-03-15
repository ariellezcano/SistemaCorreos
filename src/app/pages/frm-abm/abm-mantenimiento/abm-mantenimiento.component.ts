import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { SistemaComboDTO } from 'src/app/modelos/componentes/relacionModelos/sistemaComboDTO';
import { Mantenimiento } from 'src/app/modelos/index.models';
import { MantenimientoService } from 'src/app/services/componentes/mantenimiento.service';
import { SistemasService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-mantenimiento',
  templateUrl: './abm-mantenimiento.component.html',
  styleUrls: ['./abm-mantenimiento.component.scss'],
})
export class AbmMantenimientoComponent implements OnInit {
  item: Mantenimiento;
  sistemas: SistemaComboDTO[];
  editando: boolean = false;

  constructor(
    private wsdl: MantenimientoService,
    private wsdlSistema: SistemasService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.item = new Mantenimiento();
    this.sistemas = [];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && Number(id) > 0) {
      this.editando = true;
      this.obtener(Number(id));
    } else {
      this.editando = false;
      this.item = new Mantenimiento(); // limpio para alta
    }

    this.getSistemas();
  }

  async obtener(id: number) {
    const re = await firstValueFrom(this.wsdl.getId(id));
    const result = JSON.parse(JSON.stringify(re));

    if (result.code === '200') {
      this.item = result.dato;
      if (this.item.fechaTrabajo !== undefined) {
        this.item.fechaTrabajo = moment(this.item.fechaTrabajo).isValid()
          ? moment(this.item.fechaTrabajo).format('YYYY-MM-DD')
          : null;
      }
      this.editando = true;
    }
  }

  async guardar() {
    try {
      // console.log('editando', this.editando);
      const re = this.editando
        ? await firstValueFrom(this.wsdl.update(this.item))
        : await firstValueFrom(this.wsdl.insert(this.item));

      const result = JSON.parse(JSON.stringify(re));
      console.log('rsultado', result);
      if (result.code === '201' || result.code === '200') {
        console.log('rsultado2', result);
        Swal.fire({
          icon: 'success',
          title:
            result.code === '201'
              ? 'Guardado correctamente'
              : 'Actualizado correctamente',
          timer: 1500,
          showConfirmButton: false,
        });

        this.back();
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar la marca', 'error');
    }
  }

  back() {
    this.router.navigate(['pages/lst_mantenimiento']);
  }

  async getSistemas() {
    const re = await firstValueFrom(this.wsdlSistema.combo());
    const result = JSON.parse(JSON.stringify(re));
    console.log('resulktado', result);
    if (result) {
      this.sistemas = result;
    }
  }
}
