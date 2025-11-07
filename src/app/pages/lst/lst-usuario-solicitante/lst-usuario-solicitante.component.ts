import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FilUsuarioSolicitanteComponent } from '../../filtros/fil-usuario-solicitante/fil-usuario-solicitante.component';
import { Unidad, UsuarioSolicitante } from 'src/app/modelos/index.models';
import { UsuarioSolicitanteService } from 'src/app/services/index.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-lst-usuario-solicitante',
  templateUrl: './lst-usuario-solicitante.component.html',
  styleUrls: ['./lst-usuario-solicitante.component.scss'],
})
export class LstUsuarioSolicitanteComponent implements OnInit {

 @ViewChild('closeUnidad') cerrarUnidad!: ElementRef;

  @ViewChild(FilUsuarioSolicitanteComponent, { static: false })
  fil!: FilUsuarioSolicitanteComponent;

  item: UsuarioSolicitante;
  items: UsuarioSolicitante[];
  usuarioSeleccionado: any = {};
  idSeleccionado!: number;

  constructor(private wsdl: UsuarioSolicitanteService, private route: Router) {
    this.item = new UsuarioSolicitante();
    this.items = [];
  }

  ngOnInit(): void {
    //this.rol = JSON.parse(''+ Utils.getSession('personal')).rol;
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
            const res: any = await firstValueFrom(this.wsdl.delete(id, 7));
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

  // async actualizarJerarquia(id: number, nuevaJerarquia: string) {
  //   try {
  //     let data = await firstValueFrom(
  //       this.wsdl.patchJerarquia(id, nuevaJerarquia)
  //     );
  //     const result = JSON.parse(JSON.stringify(data));

  //     if (result.code === '200') {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Jerarquía actualizada correctamente',
  //         timer: 1500,
  //         showConfirmButton: false,
  //       });
  //     } else {
  //       Swal.fire('Atención', result.message, 'warning');
  //     }
  //   } catch (error) {
  //     console.error('Error al actualizar jerarquía:', error);
  //     Swal.fire('Error', 'No se pudo actualizar la jerarquía', 'error');
  //   }
  // }

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

  setUsuarioSeleccionado(item: any) {
    this.usuarioSeleccionado = { ...item }; // Clonamos el usuario seleccionado
    this.item.nombreUnidad = item.nombreUnidad;
    //console.log(this.usuarioSeleccionado);
  }

  async actualizarJerarquia() {
    const id = this.usuarioSeleccionado?.id;
    const nuevaJerarquia = this.usuarioSeleccionado?.jerarquia;
    //const unidad = this.usuarioSeleccionado?.unidadDpte;
    //const nombreUnidad = this.usuarioSeleccionado?.nombreUnidad;

    if (!id || !nuevaJerarquia) {
      Swal.fire('Atención', 'Debe seleccionar una jerarquía válida', 'warning');
      return;
    }

    try {
      const data = await firstValueFrom(
        this.wsdl.patchJerarquia(id, nuevaJerarquia, this.item.unidadDpte, this.item.nombreUnidad)
      );
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '200') {
        Swal.fire({
          icon: 'success',
          title: 'Datos actualizados correctamente',
          timer: 1500,
          showConfirmButton: false,
        });

        this.cerrarModalJerarquia();

        // Si querés refrescar lista después

        this.fil.filter();
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      Swal.fire('Error', 'No se pudo actualizar los datos', 'error');
    }
  }

  cerrarModalJerarquia() {
    const modalElement = document.getElementById('modalJerarquia');

    if (modalElement) {
      const modal =
        bootstrap.Modal.getInstance(modalElement) ||
        new bootstrap.Modal(modalElement);
      modal.hide();

      // 🔧 Esperar un poco y limpiar el backdrop manualmente si quedó alguno
      setTimeout(() => {
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach((b) => b.remove());
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
      }, 300);
    }
  }

unidadSeleccionada(event: Unidad) {
    if (event != undefined) {
      console.log(event);
      this.item.unidadDpte = event.id;
      this.item.nombreUnidad = event.nombre;

      //UturuncoUtils.setSession('unidad', JSON.stringify(event.id));
      //UturuncoUtils.setSession('nombreUnidad', JSON.stringify(event.nombre));
    }
    this.cerrarUnidad.nativeElement.click();
  }

  abmCorreo(id: number){
    this.route.navigate(['pages/agregar_correo/'+ id]);
  }

}
