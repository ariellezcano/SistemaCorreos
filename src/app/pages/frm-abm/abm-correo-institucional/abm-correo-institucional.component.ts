import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { Correo } from 'src/app/modelos/index.models';
import { CorreoInstitucionalService } from 'src/app/services/componentes/correo-institucional.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-correo-institucional',
  templateUrl: './abm-correo-institucional.component.html',
  styleUrls: ['./abm-correo-institucional.component.scss'],
})
export class AbmCorreoInstitucionalComponent implements OnInit {
  item: Correo;
  editando = false;
  mostrarPass = false;
  id: any;
  rol!: string;

  dominios = ['@chaco.gov.ar', '@chaco.gob.ar'];
  mostrarSugerencias = false;
  seleccionadoIndex = -1;

  constructor(
    private wsdl: CorreoInstitucionalService,
    private route: Router,
    private url: ActivatedRoute
  ) {
    this.item = new Correo();
  }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.ObtenerId();
    //this.rol = Utils.getSession('personal')?.rol || '';

    //capturo el rol
    const personalJson = Utils.getSession('personal');
    const personal = personalJson ? JSON.parse(personalJson) : null;

    this.rol = personal?.rol || '';
  }

  async ObtenerId() {
    try {
      const data = await firstValueFrom(this.wsdl.getId(Number(this.id)));
      const result = JSON.parse(JSON.stringify(data));
      //console.log('find id', result);

      if (result.code === '200') {
        this.item = result.dato;

        if (this.item.fechaHabilitacion) {
          this.item.fechaHabilitacion = moment(
            this.item.fechaHabilitacion
          ).isValid()
            ? moment(this.item.fechaHabilitacion).format('YYYY-MM-DD')
            : null;
        }

        if (this.item.fechaNotificacion) {
          this.item.fechaNotificacion = moment(
            this.item.fechaNotificacion
          ).isValid()
            ? moment(this.item.fechaNotificacion).format('YYYY-MM-DD')
            : null;
        }
        this.editando = true;
      }
    } catch (error: any) {
      if (error.status === 500) {
        Swal.fire({
          title: 'Error al obtener el registro',
          text: 'Ocurrió un error inesperado. Verifique!',
          icon: 'error',
        });
      }
    }
  }

  async guardar() {
    if (Number(this.id) > 0 && this.editando) {
      this.editar();
    } else {
      this.crear();
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
    try {
      this.item.usuarioCrea = Number(Utils.getSession('user'));
      this.item.usuarioSolicitante = Number(this.id);
      const data = await firstValueFrom(this.wsdl.insert(this.item));
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '201') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro creado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.back();
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error al crear registro, verifique!',
        icon: 'error',
      });
    }
  }

  back() {
    this.route.navigate(['pages/lst_usuario_solicitante']);
  }

  cancelar() {
    //this.item = {};
    this.editando = false;
  }

  onCorreoInput() {
    const value = this.item.correoInstitucional || '';

    if (value.includes('@') && !value.includes('.')) {
      this.mostrarSugerencias = true;
    } else {
      this.mostrarSugerencias = false;
      this.seleccionadoIndex = -1;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.mostrarSugerencias) return;

    const total = this.dominios.length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.seleccionadoIndex = (this.seleccionadoIndex + 1) % total;
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.seleccionadoIndex = (this.seleccionadoIndex - 1 + total) % total;
        break;

      case 'Enter':
        event.preventDefault();
        if (this.seleccionadoIndex >= 0) {
          this.seleccionarDominio(this.dominios[this.seleccionadoIndex]);
        }
        break;

      case 'Escape':
        this.mostrarSugerencias = false;
        this.seleccionadoIndex = -1;
        break;
    }
  }

  seleccionarDominio(dominio: string) {
    const correo = this.item.correoInstitucional;
    const usuario = correo.split('@')[0];

    this.item.correoInstitucional = usuario + dominio;

    this.mostrarSugerencias = false;
    this.seleccionadoIndex = -1;
  }
}
