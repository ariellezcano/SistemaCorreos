import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Conexion } from 'src/app/modelos/index.models';
import { ConexionesService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilConexionesComponent } from '../../filtros/fil-conexiones/fil-conexiones.component';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-lst-conexiones',
  templateUrl: './lst-conexiones.component.html',
  styleUrls: ['./lst-conexiones.component.scss'],
})
export class LstConexionesComponent implements OnInit {
  @ViewChild(FilConexionesComponent, { static: false })
  fil!: FilConexionesComponent;

  item: Conexion;
  items: Conexion[];
  rol: string = '';
  constructor(
    private wsdl: ConexionesService,
    private route: Router,
  ) {
    this.item = new Conexion();
    this.items = [];
  }

  ngOnInit(): void {
    const personal = Utils.getSession('personal');

    if (personal) {
      try {
        const obj = JSON.parse(personal);
        this.rol = obj.rol || '';
      } catch {
        this.rol = '';
      }
    }
  }

  doFound(event: Conexion[]) {
    //console.log('llegue', event);
    this.items = event;
  }

  linkear(id?: Number) {
    this.route.navigateByUrl('pages/abm_conexiones/' + id);
  }

  back() {
    this.route.navigate(['pages/lst_conexiones']);
  }

  async eliminar(registro: number) {
    Swal.fire({
      title: 'Estás seguro de eliminar?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminacion(registro);
      } else if (result.isDenied) {
        Swal.fire('Operacion cancelada', '', 'info');
      }
    });
  }

  async eliminacion(registro: number) {
    try {
      const data = await firstValueFrom(this.wsdl.delete(registro));
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '200') {
        Swal.fire('Operación realizada...', '', 'success');
        this.back();
        this.fil.filter();
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

  async consultarConexion(ip: string) {
    try {
      Swal.fire({
        title: 'Consultando conexión...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const data = await firstValueFrom(this.wsdl.obtenerEstadoRouter(ip));

      const result = JSON.parse(JSON.stringify(data));
      console.log(result)

      Swal.fire({
        icon: result.estado === 'ONLINE' ? 'success' : 'error',
        title:
          result.estado === 'ONLINE' ? 'Conexión Activa' : 'Conexión Inactiva',
        html: `
        <div style="text-align:left">
          <p><strong>IP:</strong> ${result.ip}</p>
          <p><strong>Estado:</strong> ${result.estado}</p>
          <p><strong>Latencia:</strong> ${result.latencia} ms</p>
          <p><strong>Fecha:</strong> ${new Date(
            result.fechaConsulta,
          ).toLocaleString('es-AR')}</p>
        </div>
      `,
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No fue posible consultar el estado de la conexión.',
        confirmButtonText: 'Aceptar',
      });

      console.error(error);
    }
  }

  /* =========================
   PERMISOS
========================= */

  puedeOperar(): boolean {
    return (
      this.rol === 'MANAGER' ||
      this.rol === 'DEVELOPER' ||
      this.rol === 'ADMINISTRADOR'
    );
  }

  puedeEliminar(): boolean {
    return this.rol === 'MANAGER' || this.rol === 'DEVELOPER';
  }
}
