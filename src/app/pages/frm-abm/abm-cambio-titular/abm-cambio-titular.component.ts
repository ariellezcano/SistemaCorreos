import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { CorreoBasicoDTO } from 'src/app/modelos/componentes/relacionModelos/correoBasicoDTO';
import { CorreoSolicitanteDTO } from 'src/app/modelos/componentes/relacionModelos/correoSolicitanteDTO';
import { UsuarioCorreoDto } from 'src/app/modelos/componentes/relacionModelos/usuarioCorreoDto';
import { Correo, Persona, UsuarioSolicitante } from 'src/app/modelos/index.models';
import { CorreoInstitucionalService } from 'src/app/services/componentes/correo-institucional.service';
import { UsuarioSolicitanteService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-abm-cambio-titular',
  templateUrl: './abm-cambio-titular.component.html',
  styleUrls: ['./abm-cambio-titular.component.scss'],
})
export class AbmCambioTitularComponent implements OnInit {
  id?: number;
  modoEditar = false;

  itemCorreoSolicitante: CorreoSolicitanteDTO;
  
  itemCorreo: CorreoBasicoDTO;
  titularNuevo: UsuarioSolicitante;

  constructor(
    private route: Router,
    private url: ActivatedRoute,
    private wsdl: CorreoInstitucionalService,
  ) {
    this.itemCorreo = new CorreoBasicoDTO();
    this.titularNuevo = new UsuarioSolicitante();
    this.itemCorreoSolicitante = new CorreoSolicitanteDTO();
  }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.modoEditar = !!this.id;

    this.obtenerCorreoPorId();
  }

  async obtenerCorreoPorId() {
    try {
      //console.log("id",this.id)
      let consulta = await firstValueFrom(
        this.wsdl.getIdCorreo(Number(this.id)),
      );
      const result = JSON.parse(JSON.stringify(consulta));
      if (result.code == '200') {
        console.log('resultado correo', result.dato);
        this.itemCorreo = result.dato;
        //this.editando = true;
      }
    } catch (error) {}
  }

  titularSeleccionado(data: any) {
    //console.log('data', data);
    if (data.code === '200') {
      this.titularNuevo.persona = data.data.id_persona;
      this.titularNuevo.apellido = data.data.apellido;
      this.titularNuevo.nombre = data.data.nombre;
      this.titularNuevo.dni = data.data.DNI;
      this.titularNuevo.jerarquia = data.data.jerarquia;
      this.titularNuevo.unidadDpte = data.data.unidad_id;
      this.titularNuevo.nombreUnidad = data.data.unidad;
      //console.log('resultado emitido:', this.item);
    }
  }


  guardarCambio() {

  const correo = new Correo();

  correo.id = Number(this.id);
  correo.correoInstitucional = this.itemCorreo.correoInstitucional;
  correo.tipoCorreo = this.itemCorreo.tipoCorreo;

  // ⛔ NO seteamos fechas acá
  correo.fechaHabilitacion = null as any;
  correo.fechaNotificacion = null as any;

  correo.usuarioCrea = Number(Utils.getSession('user'));
  correo.activo = true;

  this.itemCorreoSolicitante.correo = correo;
  this.itemCorreoSolicitante.solicitante = this.titularNuevo;

  this.wsdl.updateCorreoSolicitante(this.itemCorreoSolicitante)
    .subscribe({
      next: res => {
        console.log('Actualizado correctamente', res);
        this.back();
      },
      error: err => console.error(err)
    });
}




  back() {
    this.route.navigate(['pages/lst_correos_institucionales']);
  }
}
