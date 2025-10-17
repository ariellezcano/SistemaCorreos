import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/modelos/index.models';
import { UsuarioService } from 'src/app/services/componentes/usuario.service';
import Swal from 'sweetalert2';
import { FilUsuariosComponent } from '../../filtros/fil-usuarios/fil-usuarios.component';

@Component({
  selector: 'app-lst-usuarios',
  templateUrl: './lst-usuarios.component.html',
  styleUrls: ['./lst-usuarios.component.scss'],
})
export class LstUsuariosComponent implements OnInit {
  @ViewChild(FilUsuariosComponent, { static: false })
  fil!: FilUsuariosComponent;

  item: Usuarios;
  items: Usuarios[];
  rol: string;
  constructor(private wsdl: UsuarioService, private router: Router) {
    this.item = new Usuarios();
    this.items = [];
    this.rol = '';
  }

  ngOnInit(): void {
    //this.rol = JSON.parse(''+ Utils.getSession('personal')).rol;
  }

  async eliminar(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Estás seguro?',
        text: 'El registro no se podra recuperar!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar!',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          let data = await this.wsdl.delete(id);
          const result = JSON.parse(JSON.stringify(data));
          if (result.code == 200) {
            this.fil.filter();
            swalWithBootstrapButtons.fire(
              'Eliminado exitosamente!',
              'Tu registro ya no existe.',
              'success'
            );
          }
        // } else if (result.dismiss === Swal.DismissReason.cancel) {
        //   swalWithBootstrapButtons.fire(
        //     'Cancelado',
        //     'Su registro está seguro :)',
        //     'error'
        //   );
        }
      });
  }

  doFound(event: Usuarios[]) {
    console.log("llegue")
    this.items = event;
  }

  linkear(id?: Number) {
    this.router.navigateByUrl('lst-marcas/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }
}
