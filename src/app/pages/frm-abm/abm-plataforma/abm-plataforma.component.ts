import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { Plataforma } from 'src/app/modelos/index.models';
import { PlataformaService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-plataforma',
  templateUrl: './abm-plataforma.component.html',
  styleUrls: ['./abm-plataforma.component.scss'],
})
export class AbmPlataformaComponent implements OnInit {
  editando = false;
  item: Plataforma;
  id!: number;

  constructor(
    private wsdl: PlataformaService,
    private route: Router,
    private url: ActivatedRoute
  ) {
    this.item = new Plataforma();
  }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.ObtenerId();
  }

  guardar() {
    if (Number(this.id) > 0 && this.editando) {
      this.editar();
    } else {
      this.crear();
    }
  }

  async ObtenerId() {
    try {
      const data = await firstValueFrom(this.wsdl.getId(Number(this.id)));
      //console.log("data")
      const result = JSON.parse(JSON.stringify(data));
      //console.log('find id', result);

      if (result.code === '200') {
        this.item = result.dato;

        if (this.item.fechaSolicitud !== undefined) {
          this.item.fechaSolicitud = moment(
            this.item.fechaSolicitud
          ).isValid()
            ? moment(this.item.fechaSolicitud).format('YYYY-MM-DD')
            : null;
        }

        if (this.item.fechaNotificacion !== undefined) {
          this.item.fechaNotificacion = moment(
            this.item.fechaNotificacion
          ).isValid()
            ? moment(this.item.fechaNotificacion).format('YYYY-MM-DD')
            : null;
        }

        if (this.item.fechaAlta !== undefined) {
          this.item.fechaAlta = moment(
            this.item.fechaAlta
          ).isValid()
            ? moment(this.item.fechaAlta).format('YYYY-MM-DD')
            : null;
        }

        this.editando = true;
      }
    } catch (error: any) {
      console.log("error", error)
      if (error.status === 500) {
        Swal.fire({
          title: 'Error al obtener el registro',
          text: 'Ocurrió un error inesperado. Verifique!',
          icon: 'error',
        });
      }
    }
  }

  async editar() {
      try {
        const data = await firstValueFrom(this.wsdl.update(this.item));
        const result = JSON.parse(JSON.stringify(data));
  
        if (result.code === '200') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro actualizado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          this.back();
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

  async crear() {
    this.item.correoInstitucional = Number(this.id);
    this.item.usuarioSolicita = 9;
    this.item.usuarioCrea = 9;
    try {
      const data = await firstValueFrom(this.wsdl.insert(this.item));
      const result = JSON.parse(JSON.stringify(data));
      
      if(result.code === '201'){
        Swal.fire({
          title: "FELICITACIONES!",
          text: "Registro creado correctamente!",
          icon: "success"
        });
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
    this.route.navigate(['pages/lst_correos_institucionales']);
  }
}
