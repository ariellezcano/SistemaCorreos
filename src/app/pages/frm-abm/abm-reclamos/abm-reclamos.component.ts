import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PlataformaCorreoDto } from 'src/app/modelos/componentes/relacionModelos/plataformaCorreoDto';
import { PlataformaReclamo } from 'src/app/modelos/componentes/relacionModelos/plataformaReclamo';
import { Reclamos } from 'src/app/modelos/index.models';
import {
  PlataformaService,
  ReclamoService,
} from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-reclamos',
  templateUrl: './abm-reclamos.component.html',
  styleUrls: ['./abm-reclamos.component.scss'],
})
export class AbmReclamosComponent implements OnInit {
  editando: boolean = false;

  itemPlataforma: PlataformaReclamo;
  item: Reclamos;

  constructor(
    private route: Router,
    private wsdl: ReclamoService,
    private wsdlPlataforma: PlataformaService
  ) {
    this.item = new Reclamos();
    this.itemPlataforma = new PlataformaReclamo();
  }

  ngOnInit(): void {}

  doFound(item: PlataformaReclamo) {
    this.itemPlataforma = item;
  }

  async guardar() {
    try {
      this.item.plataforma = this.itemPlataforma.idPlataforma;
      this.item.usuarioCrea = 8;

      //console.log("items reclamo", this.item);
      const data = await firstValueFrom(this.wsdl.insert(this.item));
      const result = JSON.parse(JSON.stringify(data));
      if (result.code === '201') {
        try {
          const data = await firstValueFrom(
            this.wsdlPlataforma.patchEstado(
              this.itemPlataforma.idPlataforma,
              this.item.estado
            )
          );
          const result = JSON.parse(JSON.stringify(data));

          if (result.code === '200') {
            Swal.fire({
              title: 'FELICITACIONES!',
              text: 'Registro creado correctamente!',
              icon: 'success',
            });
          }
        } catch (error) {
          Swal.fire({
            title: 'Error al modificar el estado',
            text: 'Ocurrió un error inesperado',
            icon: 'error',
          });
        }
      }

      this.back();
    } catch (error: any) {
      if (error.status === 500) {
        Swal.fire({
          title: 'Error al insertar el registro',
          text: 'Ocurrió un error inesperado. Verifique!',
          icon: 'error',
        });
      }
    }
  }

  back() {
    this.route.navigate(['pages/lst_reclamos']);
  }
}
