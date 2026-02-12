import { Component, OnInit, ViewChild } from '@angular/core';
import { FilProveedorComponent } from '../../filtros/fil-proveedor/fil-proveedor.component';
import { Proveedor } from 'src/app/modelos/index.models';
import { ProveedorService } from 'src/app/services/componentes/proveedor.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-lst-proveedor',
  templateUrl: './lst-proveedor.component.html',
  styleUrls: ['./lst-proveedor.component.scss'],
})
export class LstProveedorComponent implements OnInit {
  @ViewChild(FilProveedorComponent, { static: false })
  fil!: FilProveedorComponent;

  item: Proveedor;
  items: Proveedor[];

  constructor(
    private wsdl: ProveedorService,
    private route: Router,
  ) {
    this.item = new Proveedor();
    this.items = [];
  }

  ngOnInit(): void {}

  doFound(event: Proveedor[]) {
    this.items = event;
  }

  linkear(id?: Number) {
    this.route.navigateByUrl('pages/abm_proveedor/' + id);
  }

  back() {
    this.route.navigate(['pages/lst_proveedor']);
  }

  async eliminar(id: number) {
    Swal.fire({
      title: 'Estás seguro de eliminar?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminacion(id);
      } else if (result.isDenied) {
        Swal.fire('Operacion cancelada', '', 'info');
      }
    });
  }

  async eliminacion(id: number) {
    try {
      const data = await firstValueFrom(this.wsdl.delete(id));
      const result = JSON.parse(JSON.stringify(data));
      console.log('resultado', result);
      if (result.code === '200') {
        Swal.fire('Operación realizada...', '', 'success');
        this.back();
        this.fil.filter();
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error: any) {
      if (error.status == '500') {
        Swal.fire({
          title: 'Error al crear registro, verifique!',
          icon: 'error',
        });
      }
    }
  }
}
