import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Persona, Usuarios } from 'src/app/modelos/index.models';
import { RegistroUsuarioService, UsuarioService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fil-busqueda-solicitante',
  templateUrl: './fil-busqueda-solicitante.component.html',
  styleUrls: ['./fil-busqueda-solicitante.component.scss']
})
export class FilBusquedaSolicitanteComponent implements OnInit {

   @Output()
    filter: EventEmitter<Persona> = new EventEmitter<Persona>();
  
    cargando: Boolean = false;
    procesando: Boolean;
    public search!: string;
    public crit = '';
    public id: any;
    public result: any;
    public rol: any;
  
    public nombre: string = 'Estadistísticas Policiales (SUED)';
    public url: string = 'https://10.125.31.214/sued/';
    public activoSistema: boolean = true;
  
    item: Usuarios;
  
    constructor(
      private wsdl: RegistroUsuarioService,
      private wsdlUsuario: UsuarioService
    ) {
      this.procesando = false;
      this.cargando = false;
      this.item = new Usuarios();
    }
  
    ngOnInit() {}
  
    public async buscar() {
      try {
        this.cargando = true;
        this.procesando = true;
        if (this.search != undefined || this.search != '') {
          this.crit = this.search;
        }
        let data = await this.wsdl.BusquedaPorDni(this.crit).then();
        console.log("data jefe", data)
        let result = JSON.parse(JSON.stringify(data));
        //console.log("result", data)
        if (result.code === '200') {
          
          // let data = result.data.id_persona;
          console.log("resultado de la busqueda", data)
          this.filter.emit(result);
          this.cargando = false;
          this.procesando = false;
          
        }
      } catch (error) {
        console.log("error", error);
        this.procesando = false;
        this.cargando = false;
        Utils.showToas('Error', 'error');
      } finally {
        this.procesando = false;
        this.cargando = false;
      }
    }
    // async verificarUsuario() {
    //     try {
    //       //console.log("persona", this.id);
    //       this.cargando = true;
    //     this.procesando = true;
    //     if (this.search != undefined || this.search != '') {
    //       this.crit = this.search;
    //     }
    //     let data = await this.wsdl.BusquedaPorDni(this.crit).then();
    //     this.result = JSON.parse(JSON.stringify(data));
    //       if (result1.code === '200') {
    //         this.item = result1.dato;
    //         //console.log('this.item', this.item);
    //         if (this.item.baja) {
    //           Swal.fire({
    //             title: 'El usuario se encuentra dado de baja',
    //             text: 'DESEA HABILITARLO!',
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonColor: '#3085d6',
    //             cancelButtonColor: '#d33',
    //             confirmButtonText: 'Si!',
    //             cancelButtonText: 'Cancelar',
    //           }).then((result) => {
    //             if (result.isConfirmed) {
    //               this.editBaja();
    //             }
    //           });
    //         } else {
    //           this.search = '';
    //           Swal.fire({
    //             title: 'El usuario ya se encuentra habilitado!',
    //             showClass: {
    //               popup: 'animate__animated animate__fadeInDown',
    //             },
    //             hideClass: {
    //               popup: 'animate__animated animate__fadeOutUp',
    //             },
    //           });
    //         }
    //       }
    //     } catch (error: any) {
    //       // Acá se atrapan los 404 o cualquier otro error HTTP
    //       if (error.status === 404) {
    //        // const result1 = error.error; // tu objeto JSON del backend
    //         //alert('AQUI ESTOY'); //ahora sí se va a mostrar
    //         this.filter.emit(this.result.data);
    //         this.cargando = false;
    //         this.procesando = false;
    //       } else {
    //         console.error('Error inesperado:', error);
    //       }
    //     }
    //   }

}
