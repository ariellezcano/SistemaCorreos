import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Conexion, Unidad } from 'src/app/modelos/index.models';
import { ConexionesService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-conexiones',
  templateUrl: './abm-conexiones.component.html',
  styleUrls: ['./abm-conexiones.component.scss'],
})
export class AbmConexionesComponent implements OnInit {
  item: Conexion;
  editando = false;
  id!: number;

  constructor(
    private route: Router,
    private url: ActivatedRoute,
    private wsdl: ConexionesService
  ) {
    this.item = new Conexion();
  }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.ObtenerId();
  }

  localidadesChaco: string[] = [
    'Resistencia',
    'Barranqueras',
    'Puerto Vilelas',
    'Fontana',
    'Puerto Tirol',
    'Makallé',
    'Colonia Benítez',
    'Basail',
    'Charadai',
    'Cote Lai',
    'Lapachito',
    'La Verde',
    'La Eduvigis',
    'General San Martín',
    'Presidencia Roque Sáenz Peña',
    'Villa Ángela',
    'Charata',
    'Las Breñas',
    'Corzuela',
    'Pampa del Infierno',
    'Concepción del Bermejo',
    'Hermoso Campo',
    'Campo Largo',
    'Gancedo',
    'Avia Terai',
    'Tres Isletas',
    'Juan José Castelli',
    'Miraflores',
    'El Espinillo',
    'Fuerte Esperanza',
    'Misión Nueva Pompeya',
    'Colonia Elisa',
    'Colonia Popular',
    'General Vedia',
    'Isla del Cerrito',
    'La Leonesa',
    'Las Palmas',
    'Presidencia de la Plaza',
    'Quitilipi',
    'Villa Berthet',
    'San Bernardo',
    'Santa Sylvina',
    'Napenay',
    'Machagai',
    'Villa Río Bermejito',
    'Pampa Almirón',
  ];

  guardar() {
    if (Number(this.id) > 0 && this.editando) {
      this.editar();
    } else {
      this.crear();
    }
  }

  async ObtenerId() {
    try {
      const data = await firstValueFrom(this.wsdl.getId(Number(this.id)));
      //console.log("data")
      const result = JSON.parse(JSON.stringify(data));
      //console.log('find id', result);

      if (result.code === '200') {
        this.item = result.dato;

        // if (this.item.fechaDisposicion !== undefined) {
        //   this.item.fechaDisposicion = moment(this.item.fechaDisposicion).isValid()
        //     ? moment(this.item.fechaDisposicion).format('YYYY-MM-DD')
        //     : null;
        // }

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
      const data = await firstValueFrom(this.wsdl.update(this.id, this.item));
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
      this.item.unidadPol = null;
      this.item.nombreUnidad = null;
      return;
    }

    this.item.nombreUnidad = unidad.nombre;
    this.item.unidadPol = unidad.id;
  }

  back() {
    this.route.navigate(['pages/lst_conexiones']);
  }
}
