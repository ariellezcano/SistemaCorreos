import { Component, OnInit, ViewChild } from '@angular/core';
import { FilUsuarioSolicitanteComponent } from '../../filtros/fil-usuario-solicitante/fil-usuario-solicitante.component';
import { UsuarioSolicitante } from 'src/app/modelos/index.models';
import { UsuarioSolicitanteService } from 'src/app/services/index.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-lst-usuario-solicitante',
  templateUrl: './lst-usuario-solicitante.component.html',
  styleUrls: ['./lst-usuario-solicitante.component.scss'],
})
export class LstUsuarioSolicitanteComponent implements OnInit {
  @ViewChild(FilUsuarioSolicitanteComponent, { static: false })
  fil!: FilUsuarioSolicitanteComponent;

  item: UsuarioSolicitante;
  items: UsuarioSolicitante[];

  jerarquiaNueva!: string;

  constructor(private wsdl: UsuarioSolicitanteService, private route: Router) {
    this.item = new UsuarioSolicitante();
    this.items = [];
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
          try {
            const res: any = await firstValueFrom(this.wsdl.delete(id, 1));
            const Json = JSON.parse(JSON.stringify(res));

            if (Json.code === '200') {
              this.fil.filter();

              swalWithBootstrapButtons.fire(
                'Eliminado exitosamente!',
                'Tu registro ya no existe.',
                'success'
              );
            }
          } catch (err) {
            console.error('Error al eliminar:', err);
            swalWithBootstrapButtons.fire(
              'Error',
              'No se pudo eliminar el registro.',
              'error'
            );
          }
        }
      });
  }

  async editar(item: any) {
    try {
      let data = await firstValueFrom(this.wsdl.update(item));
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '200') {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado correctamente',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Error al editar:', error);
      Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
    }
  }

  async actualizarJerarquia(id: number, nuevaJerarquia: string) {
    try {
      let data = await firstValueFrom(
        this.wsdl.patchJerarquia(id, nuevaJerarquia)
      );
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '200') {
        Swal.fire({
          icon: 'success',
          title: 'Jerarquía actualizada correctamente',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error) {
      console.error('Error al actualizar jerarquía:', error);
      Swal.fire('Error', 'No se pudo actualizar la jerarquía', 'error');
    }
  }

 

  doFound(event: UsuarioSolicitante[]) {
    //console.log('llegue');
    this.items = event;
  }

  // linkear(id?: Number) {
  //   this.route.navigateByUrl('lst-marcas/abm/' + id);
  // }

  back() {
    this.route.navigate(['principal']);
  }

  abmAgregarNuevo(id: number) {
    if (id > 0) {
      // Navega al modo editar
      this.route.navigate(['/pages/agregar_solicitante', id]);
    } else {
      // Navega al modo agregar
      this.route.navigate(['/pages/agregar_solicitante']);
    }
  }

  async confirmarJerarquia() {}
}
