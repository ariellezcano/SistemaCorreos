import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PlataformaCorreoDto } from 'src/app/modelos/componentes/relacionModelos/plataformaCorreoDto';
import { Plataforma } from 'src/app/modelos/index.models';
import { PlataformaService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilPlataformasComponent } from '../../filtros/fil-plataformas/fil-plataformas.component';

@Component({
  selector: 'app-lst-plataformas',
  templateUrl: './lst-plataformas.component.html',
  styleUrls: ['./lst-plataformas.component.scss'],
})
export class LstPlataformasComponent implements OnInit {
  @ViewChild(FilPlataformasComponent, { static: false })
  fil!: FilPlataformasComponent;

  item: PlataformaCorreoDto;
  items: PlataformaCorreoDto[];

  constructor(private wsdl: PlataformaService, private route: Router) {
    this.item = new PlataformaCorreoDto();
    this.items = [];
  }

  ngOnInit(): void {}

  doFound(event: PlataformaCorreoDto[]) {
    //console.log('llegue');
    this.items = event;
  }

  linkear(id?: Number) {
    this.route.navigateByUrl('pages/abm_plataforma/' + id);
  }

  back() {
    this.route.navigate(['pages/lst_plataforma']);
  }

  async eliminar(plataforma: number) {
    Swal.fire({
      title: 'Estás seguro de eliminar?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminacion(plataforma);
      } else if (result.isDenied) {
        Swal.fire('Operacion cancelada', '', 'info');
      }
    });
  }

  async eliminacion(plataforma: number) {
    try {
      // capturar el idUsuarioBaja
      const data = await firstValueFrom(this.wsdl.delete(plataforma, 8));
      const result = JSON.parse(JSON.stringify(data));

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
