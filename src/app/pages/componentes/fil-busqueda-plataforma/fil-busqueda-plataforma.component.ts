import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PlataformaReclamo } from 'src/app/modelos/componentes/relacionModelos/plataformaReclamo';
import { PlataformaService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fil-busqueda-plataforma',
  templateUrl: './fil-busqueda-plataforma.component.html',
  styleUrls: ['./fil-busqueda-plataforma.component.scss'],
})
export class FilBusquedaPlataformaComponent implements OnInit {
  @Output() emmit: EventEmitter<PlataformaReclamo> = new EventEmitter();

  dni!: number;

  item: PlataformaReclamo;

  constructor(private wsdl: PlataformaService) {
    this.item = new PlataformaReclamo();
  }

  ngOnInit(): void {}

  async buscar() {
    try {
      if (this.dni > 0 && this.dni !== undefined) {
        const data$ = this.wsdl.getPorDni(this.dni);
        const result = await firstValueFrom(data$);
        const Json = JSON.parse(JSON.stringify(result));
        if (Json.code === '200') {
          
          this.item = Json.dato;
          console.log("encontrado", this.item)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro encontrado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });

          this.emmit.emit(this.item);
        }
      } else {
        Swal.fire({
          title: 'Ingrese DNI válido!',
          icon: 'error',
          draggable: true,
        });
      }
    } catch (error: any) {
      if (error.code === '400') {
      } else {
      }
    }
  }
}
