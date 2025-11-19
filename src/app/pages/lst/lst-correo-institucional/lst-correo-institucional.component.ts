import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsuarioCorreoDto } from 'src/app/modelos/componentes/relacionModelos/usuarioCorreoDto';
import { FilCorreosInstitucionalesComponent } from '../../filtros/fil-correos-institucionales/fil-correos-institucionales.component';
import { CorreoInstitucionalService } from 'src/app/services/componentes/correo-institucional.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import * as bootstrap from 'bootstrap';
import { DetalleCorreoService } from 'src/app/services/index.service';
import { DetalleCorreo } from 'src/app/modelos/index.models';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-lst-correo-institucional',
  templateUrl: './lst-correo-institucional.component.html',
  styleUrls: ['./lst-correo-institucional.component.scss'],
})
export class LstCorreoInstitucionalComponent implements OnInit {
  @ViewChild('closeUnidad') cerrarUnidad!: ElementRef;

  @ViewChild(FilCorreosInstitucionalesComponent, { static: false })
  fil!: FilCorreosInstitucionalesComponent;

  item: UsuarioCorreoDto;
  items: UsuarioCorreoDto[];

  correoSeleccionado: any;

  itemDetalle: DetalleCorreo;
  usuarioSeleccionado: any = {};
  idSeleccionado!: number;

  constructor(
    private wsdl: CorreoInstitucionalService,
    private wsdlDetalle: DetalleCorreoService,
    private route: Router
  ) {
    this.item = new UsuarioCorreoDto();
    this.items = [];
    this.itemDetalle = new DetalleCorreo();
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
          title: 'Detalle creado correctamente',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Error al editar:', error);
      Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
    }
  }

  abrirModalDetalle(item: any) {
    this.correoSeleccionado = item;
    //console.log('modal detalle', this.correoSeleccionado);
    //this.itemDetalle = {}; // Limpia detalle previo
    const modal = new bootstrap.Modal(document.getElementById('modalDetalle')!);
    modal.show();
  }

  async crearDetalle() {
    if (!this.itemDetalle.actaRecibida || !this.itemDetalle.fechaRecepcion)
      return;

    this.itemDetalle.correoInstitucional = Number(
      this.correoSeleccionado.idCorreo
    );
    this.itemDetalle.usuarioRecibe = Number(Utils.getSession('user'));;
    this.itemDetalle.activo = true;

    try {
      let data = await firstValueFrom(
        this.wsdlDetalle.insert(this.itemDetalle)
      );
      const result = JSON.parse(JSON.stringify(data));
      //console.log("resultado", result)
      if (result.code === '201') {
        Swal.fire({
          icon: 'success',
          title: 'Detalle creado correctamente',
          timer: 1500,
          showConfirmButton: false,
        });
      }
      this.fil.filter();
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
    }

    const modalEl = document.getElementById('modalDetalle')!;
    const modal = bootstrap.Modal.getInstance(modalEl)!;
    modal.hide();
  }

  doFound(event: UsuarioCorreoDto[]) {
    // console.log('llegue');
    this.items = event;
  }

  linkear(id?: Number) {
    this.route.navigateByUrl('pages/plataformas/' + id);
  }

  back() {
    this.route.navigate(['principal']);
  }

  setUsuarioSeleccionado(item: any) {
    this.usuarioSeleccionado = { ...item }; // Clonamos el usuario seleccionado
    //console.log(this.usuarioSeleccionado);
  }

  //  async actualizarJerarquia() {
  //    const id = this.usuarioSeleccionado?.id;
  //    const nuevaJerarquia = this.usuarioSeleccionado?.jerarquia;
  //    //const unidad = this.usuarioSeleccionado?.unidadDpte;
  //    //const nombreUnidad = this.usuarioSeleccionado?.nombreUnidad;

  //    if (!id || !nuevaJerarquia) {
  //      Swal.fire('Atención', 'Debe seleccionar una jerarquía válida', 'warning');
  //      return;
  //    }

  //    try {
  //      const data = await firstValueFrom();
  //      const result = JSON.parse(JSON.stringify(data));

  //      if (result.code === '200') {
  //        Swal.fire({
  //          icon: 'success',
  //          title: 'Datos actualizados correctamente',
  //          timer: 1500,
  //          showConfirmButton: false,
  //        });

  //        this.cerrarModalJerarquia();

  //        // Si querés refrescar lista después

  //        this.fil.filter();
  //      } else {
  //        Swal.fire('Atención', result.message, 'warning');
  //      }
  //    } catch (error) {
  //      console.error('Error al actualizar datos:', error);
  //      Swal.fire('Error', 'No se pudo actualizar los datos', 'error');
  //    }
  //  }

  // cerrarModalJerarquia() {
  //   const modalElement = document.getElementById('modalJerarquia');

  //   if (modalElement) {
  //     const modal =
  //       bootstrap.Modal.getInstance(modalElement) ||
  //       new bootstrap.Modal(modalElement);
  //     modal.hide();

  //     // 🔧 Esperar un poco y limpiar el backdrop manualmente si quedó alguno
  //     setTimeout(() => {
  //       const backdrops = document.querySelectorAll('.modal-backdrop');
  //       backdrops.forEach((b) => b.remove());
  //       document.body.classList.remove('modal-open');
  //       document.body.style.removeProperty('overflow');
  //       document.body.style.removeProperty('padding-right');
  //     }, 300);
  //   }
  // }

  abmCorreo(id: number) {
    this.route.navigate(['pages/agregar_correo/' + id]);
  }
}
