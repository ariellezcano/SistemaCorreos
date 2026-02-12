import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Proveedor } from 'src/app/modelos/index.models';
import { ProveedorService } from 'src/app/services/componentes/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-proveedor',
  templateUrl: './abm-proveedor.component.html',
  styleUrls: ['./abm-proveedor.component.scss'],
})
export class AbmProveedorComponent implements OnInit {
  item: Proveedor;
  editando = false;
  id!: number;

  constructor(
    private wsdl: ProveedorService,
    private route: Router,
    private url: ActivatedRoute,
  ) {
    this.item = new Proveedor();
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
      // console.log("resultado", result)
      if (result.code === '200') {
        this.item = result.dato;
        this.editando = true;
      }
    } catch {
      Swal.fire('Error', 'No se pudo obtener los datos', 'error');
    }
  }

  async crear() {
    try {
      const data = await firstValueFrom(this.wsdl.insert(this.item));
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '201') {
        Swal.fire('Creado correctamente', '', 'success');
        this.back();
      }
    } catch {
      Swal.fire('Error', 'Error al crear', 'error');
    }
  }

  async editar() {
    try {
      const data = await firstValueFrom(this.wsdl.update(this.item));
      //console.log('editando', data);
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '200') {
        Swal.fire('Actualizado correctamente!!', '', 'success');
        this.back();
      }
    } catch {
      Swal.fire('Error', 'Error al actualizar', 'error');
    }
  }

  back() {
    this.route.navigate(['pages/lst_proveedor']);
  }
}
