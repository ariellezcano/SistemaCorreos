import { ActivatedRoute, Router } from '@angular/router';
import { TipoEquipo } from './../../../modelos/componentes/tipoEquipo';
import { Component, OnInit } from '@angular/core';
import { Equipamiento, Proveedor } from 'src/app/modelos/index.models';
import { EquipamientoService } from 'src/app/services/componentes/equipamiento.service';
import { ModeloService, TipoEquipoService } from 'src/app/services/index.service';
import { Modelo } from 'src/app/modelos/componentes/modelo';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { MarcaModeloDTO } from 'src/app/modelos/componentes/relacionModelos/marcaModeloDTO';
import { ProveedorService } from 'src/app/services/componentes/proveedor.service';

@Component({
  selector: 'app-abm-equipamientos',
  templateUrl: './abm-equipamientos.component.html',
  styleUrls: ['./abm-equipamientos.component.scss']
})
export class AbmEquipamientosComponent implements OnInit {

      item: Equipamiento;
      modelo: MarcaModeloDTO[];
      tipoEquipo: TipoEquipo[];
      proveedor: Proveedor[];

      editando = false;

      id!: number;
    
      constructor(
        private wsdl: EquipamientoService,
        private wsdlModelo: ModeloService,
        private wsdlTipoEquipo: TipoEquipoService,
        private wsdlProveedor: ProveedorService,
        private route: Router,
        private url: ActivatedRoute
      ) {
        this.item = new Equipamiento();
        this.modelo = [];
        this.tipoEquipo = [];
        this.proveedor = [];
        
      }
    
      ngOnInit(): void {
        this.id = this.url.snapshot.params['id'];
        this.ObtenerId();
        this.cargarComboModelos();
        this.cargarComboTipoEquipo();
        this.cargarComboProveedor();
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
          const data = await firstValueFrom(this.wsdl.obtenerPorId(Number(this.id)));
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
          const data = await firstValueFrom(this.wsdl.editar(this.item));
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
          const data = await firstValueFrom(this.wsdl.crear(this.item));
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
  
      cargarComboModelos(): void {
        this.wsdlModelo.combo().subscribe({
          next: (resp) => {
            this.modelo = resp;
            console.log("consola", this.modelo)
          },
          error: (error) => {
            console.error('Error al cargar combo de marcas', error);
          }
        });
      }

      cargarComboTipoEquipo(): void {
        this.wsdlTipoEquipo.combo().subscribe({
          next: (resp) => {
            this.tipoEquipo = resp;
          },
          error: (error) => {
            console.error('Error al cargar combo de marcas', error);
          }
        });
      }

       cargarComboProveedor(): void {
        this.wsdlProveedor.combo().subscribe({
          next: (resp) => {
            this.proveedor = resp;
          },
          error: (error) => {
            console.error('Error al cargar combo de marcas', error);
          }
        });
      }
    
      modeloSeleccionado(generico: MarcaModeloDTO| null) {
        if (!generico) {
          this.item.modelo = null;
          return;
        }
    
        this.item.modelo = generico.idModelo;
        //this.item.nombreMarca = generico.nombre;
      }
    
      back() {
        this.route.navigate(['pages/lst_equipamientos']);
      }

}
