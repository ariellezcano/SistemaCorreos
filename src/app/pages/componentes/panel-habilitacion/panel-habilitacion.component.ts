import { lastValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Usuario_repo } from 'src/app/modelos/componentes/usuario-repo';
import { Roles, Usuarios } from 'src/app/modelos/index.models';
import {
  RegistroUsuarioService,
  UsuarioService,
} from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel-habilitacion',
  templateUrl: './panel-habilitacion.component.html',
  styleUrls: ['./panel-habilitacion.component.scss'],
})
export class PanelHabilitacionComponent implements OnInit {
  form!: FormGroup;

  item: Usuario_repo;
  dtUsuario: Usuarios;
  proceso: Boolean;
  //tipoPersona: string;
  rol: boolean;

  public nombre: string = 'Sistema Correo (SCI)';
  public url: string = 'https://10.125.31.214/correo/';
  public activo: boolean = true;

  constructor(
    private route: Router,
    private wsdl: UsuarioService,
    private wsdlRegistro: RegistroUsuarioService
  ) {
    this.item = new Usuario_repo();
    this.dtUsuario = new Usuarios();
    //this.tipoPersona = '';
    this.proceso = false;
    this.rol = false;
  }

  ngOnInit(): void {}

  public async insert() {
    //this.dtUsuario.sistema = 1;
    this.dtUsuario.userCreaRepo = 1;
    //console.log('usuario a insertar', this.dtUsuario);
    //this.dtSued.userCreaRepo = UturuncoUtils.getSession('user');

    // this.dtUsuario.fechaAlta = moment(this.dtUsuario.fechaAlta).format(
    //   'YYYY-MM-DD'
    // );
    try {
      let data = await lastValueFrom(this.wsdl.insert(this.dtUsuario));
      let res = JSON.parse(JSON.stringify(data));
      
      if (res.code === '201') {
        //alert("usuario insertado")

        try {
          let data = await this.wsdlRegistro
            .patchSistemaHabilitados(
              this.dtUsuario.usuarioRepo,
              this.nombre,
              this.url,
              this.activo
            )
            .then();
        } catch (error) {}
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario habilitado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });

        this.back();
      } else {
      }
    } catch (error) {}
  }

  pregunta() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Usted está por habilitar un nuevo usuario!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.insert();
      } else if (result.dismiss === 'cancel') {
        Swal.fire({
          title: 'Cancelado',
          text: 'La operación no se realizó :)',
          icon: 'error',
        });
      }
    });
  }

  doFound(event: any) {
    console.log('Event', event);
    this.proceso = true;
    ////console.log('event', event);
    if (event != null) {
      ////console.log('Personal civil', event);

      this.dtUsuario.tipoPersona = true;
      this.dtUsuario.nombre = event.nombre;
      this.dtUsuario.apellido = event.apellido;
      this.dtUsuario.norDni = event.DNI;
      this.dtUsuario.usuarioRepo = event.persona;
      //this.dtUsuario.rol = event.rol;
      //this.dtUsuario.rolNombre = event.rol.nombre;
      this.dtUsuario.usuarioRepo = event.id_persona;
    }

    // if (event.persona != null) {
    //     this.dtUsuario.tipoPersona = true;
    //     this.dtUsuario.persona = event.persona.id;
    //     this.dtUsuario.nombre = event.persona.nombre;
    //     this.dtUsuario.apellido = event.persona.apellido;
    //     this.dtUsuario.norDni = event.persona.norDni;
    //     this.dtUsuario.usuarioRepo = event.id;
    //     this.dtUsuario.rol = event.rol.idRol;
    //     //this.dtUsuario.rolNombre = event.rol.nombre;
    //     //this.dtSued.userCreaRepo = event.id;
    // }
  }

  seleccionRol(event: Roles) {
    //console.log(event);
    if (event != undefined) {
      //console.log("evento seleccionado", event);
      this.dtUsuario.rol = event.id_rol;
      //console.log('Rol seleccionado', event);
      this.dtUsuario.rolSeleccionado = event.nombre;
    }
  }

  valor(item: any) {
    let dato: string = '';
    if (item) {
      dato = 'Personal Policial';
    } else {
      dato = 'Personal Administrativo';
    }
    return dato;
  }

  back() {
    this.route.navigate(['pages/lst_usuario']);
  }
}
