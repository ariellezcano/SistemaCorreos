import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NovedadesDTO } from 'src/app/modelos/componentes/relacionModelos/novedades-dto';
import { NovedadesDtiService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilNovedadesDtiComponent } from '../../filtros/fil-novedades-dti/fil-novedades-dti.component';

@Component({
  selector: 'app-lst-novedades-dti',
  templateUrl: './lst-novedades-dti.component.html',
  styleUrls: ['./lst-novedades-dti.component.scss'],
})
export class LstNovedadesDTIComponent implements OnInit {
  @ViewChild(FilNovedadesDtiComponent, { static: false })
  fil!: FilNovedadesDtiComponent;

  ngOnInit() {}

  items: NovedadesDTO[];
  item: NovedadesDTO;

  constructor(private wsdl: NovedadesDtiService, private route: Router) {
    this.item = new NovedadesDTO();
    this.items = [];
  }

  doFound(event: NovedadesDTO[]) {
    this.items = event;
  }

  linkear(id?: number) {
    this.route.navigateByUrl('pages/abm_novedadesDTI/' + id);
  }

  async eliminar(idRegistro: number) {
    Swal.fire({
      title: 'Estás seguro de eliminar?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminacion(idRegistro);
      } else if (result.isDenied) {
        Swal.fire('Operacion cancelada', '', 'info');
      }
    });
  }

  async eliminacion(idRegistro: number) {
    try {
      const data = await firstValueFrom(this.wsdl.delete(idRegistro));
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '200') {
        Swal.fire('Operación realizada...', '', 'success');
        //this.back();
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
