import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DetalleEntrega, Unidad } from 'src/app/modelos/index.models';
import { DetalleEntregaService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-asignacion-equipo',
  templateUrl: './abm-asignacion-equipo.component.html',
  styleUrls: ['./abm-asignacion-equipo.component.scss'],
})
export class AbmAsignacionEquipoComponent implements OnInit {
  item: DetalleEntrega;

  editando = false;

  id!: number;

  constructor(
    private wsdl: DetalleEntregaService,
    private route: Router,
    private url: ActivatedRoute,
  ) {
    this.item = new DetalleEntrega();
  }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.ObtenerId();
  }

  guardar() {
    if (Number(this.id) > 0 && this.editando) {
      this.editar();
    } else {
      this.crear();
    }
  }

  async ObtenerId() {
    try {
      const data = await firstValueFrom(
        this.wsdl.obtenerPorId(Number(this.id)),
      );
      //console.log("data")
      const result = JSON.parse(JSON.stringify(data));
      //console.log('find id', result);

      if (result.code === '200') {
        this.item = result.dato;
        this.editando = true;
      }
    } catch (error: any) {
      //console.log("error", error)
      if (error.status === 500) {
        Swal.fire({
          title: 'Error al obtener el registro',
          text: 'Ocurrió un error inesperado. Verifique!',
          icon: 'error',
        });
      }
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
          title: 'Error al editar registro, verifique!',
          icon: 'error',
        });
      }
    }
  }

  async crear() {
    try {
      const data = await firstValueFrom(this.wsdl.insert(this.item));
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '201') {
        Swal.fire({
          title: 'FELICITACIONES!',
          text: 'Registro creado correctamente!',
          icon: 'success',
        });
      }

      this.back();
    } catch (error: any) {
      if (error.status === 500) {
        Swal.fire({
          title: 'Error al insertar el registro',
          text: 'Ocurrió un error inesperado. Verifique!',
          icon: 'error',
        });
      }
    }
  }

  unidadSeleccionada(unidad: Unidad | null) {
      if (!unidad) {
        this.item.destino = null;
        this.item.nombreDestino = null;
        return;
      }
  
      this.item.destino = unidad.id;
      this.item.nombreDestino = unidad.nombre;
    }

  back() {
    this.route.navigate(['pages/lst_equipamientos']);
  }
}
