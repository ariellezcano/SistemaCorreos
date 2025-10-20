import { lastValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Usuario_repo } from 'src/app/modelos/componentes/usuario-repo';
import { Roles, Usuarios } from 'src/app/modelos/index.models';
import { RegistroUsuarioService, UsuarioService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel-habilitacion',
  templateUrl: './panel-habilitacion.component.html',
  styleUrls: ['./panel-habilitacion.component.scss']
})
export class PanelHabilitacionComponent implements OnInit {

 form!: FormGroup;

  item: Usuario_repo;
  dtUsuario: Usuarios;
  proceso: Boolean;
  //tipoPersona: string;
  rol: boolean;

  public nombre: string = "Sistema Correo (SCI)";
  public url: string = "https://10.125.31.214/correo/"
  public activo: boolean = true;


  constructor(private route: Router, private wsdl: UsuarioService, private wsdlRegistro: RegistroUsuarioService) {
    this.item = new Usuario_repo();
    this.dtUsuario = new Usuarios();
    //this.tipoPersona = '';
    this.proceso = false;
    this.rol = false;
  }

  ngOnInit(): void {}

  public async insert() {
    //this.dtUsuario.sistema = 1;
    this.dtUsuario.userCreaRepo = 1
    //this.dtSued.userCreaRepo = UturuncoUtils.getSession('user');
   
    this.dtUsuario.fechaAlta = moment(this.dtUsuario.fechaAlta).format('YYYY-MM-DD');
    try {
      let data = await lastValueFrom(this.wsdl.insert(this.dtUsuario));
      //console.log("data", data)
      let res = JSON.parse(JSON.stringify(data));
      //console.log("res", res)
      if (res.code == 200) {
        try {
          let data = await this.wsdlRegistro.patchSistemaHabilitados(this.dtUsuario.usuarioRepo, this.nombre, this.url, this.activo).then();
        } catch (error) {
        }
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
      title: 'Estás seguro?',
      text: 'Usted está por habilitar un nuevo usuario!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.insert();
      }
    });
  }

  doFound(event: Usuario_repo) {
    //console.log('Event', event);
    this.proceso = true;
    ////console.log('event', event);
    if (event.civil != null) {
      ////console.log('Personal civil', event);
        this.dtUsuario.tipoPersona = false;
        this.dtUsuario.civil = event.civil.id;
        this.dtUsuario.nombre = event.civil.nombre;
        this.dtUsuario.apellido = event.civil.apellido;
        this.dtUsuario.norDni = event.civil.norDni;
        this.dtUsuario.usuarioRepo = event.id;
        this.dtUsuario.rol = event.rol.idRol;
        //this.dtUsuario.rolNombre = event.rol.nombre;
        //this.dtSued.usuarioRepo = event.id;
    }

    if (event.persona != null) {
        this.dtUsuario.tipoPersona = true;
        this.dtUsuario.persona = event.persona.id;
        this.dtUsuario.nombre = event.persona.nombre;
        this.dtUsuario.apellido = event.persona.apellido;
        this.dtUsuario.norDni = event.persona.norDni;
        this.dtUsuario.usuarioRepo = event.id;
        this.dtUsuario.rol = event.rol.idRol;
        //this.dtUsuario.rolNombre = event.rol.nombre;
        //this.dtSued.userCreaRepo = event.id;
    }
  }

  seleccionRol(event: Roles) {
    if (event != undefined) {
      this.dtUsuario.rol = event.idRol;
    }
  }

  valor(item: any){
    let dato: string = '';
    if(item){
      dato = 'Personal Policial';
    }else{
      dato = 'Personal Administrativo';
    }
    return dato;
  }

  back() {
    this.route.navigate(['lst-usuarios']);
  }

}
