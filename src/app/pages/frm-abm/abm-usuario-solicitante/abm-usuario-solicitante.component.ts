import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Persona, UsuarioSolicitante } from 'src/app/modelos/index.models';
import { UsuarioSolicitanteService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-usuario-solicitante',
  templateUrl: './abm-usuario-solicitante.component.html',
  styleUrls: ['./abm-usuario-solicitante.component.scss'],
})
export class AbmUsuarioSolicitanteComponent implements OnInit {
  id?: number;
  modoEditar = false;

  editando: boolean = false;

  item: UsuarioSolicitante;

  constructor(
    private route: Router,
    private url: ActivatedRoute,
    private wsdl: UsuarioSolicitanteService
  ) {
    this.item = new UsuarioSolicitante();
  }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.modoEditar = !!this.id;
  }

  async guardar() {
    try {
      this.item.usuarioCrea = 9;
      this.item.unidadDpte = 1;
      this.item.nombreUnidad = 'Div. Tecnologias de la Información';

      let data = await firstValueFrom(this.wsdl.insert(this.item));
      const result = JSON.parse(JSON.stringify(data));
      console.log('resultado al guardar', result);
      if (result.code === '201') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro creado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.back();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error al crear registro, verifique!',
        icon: 'error',
        draggable: true,
      });
    }
  }

  back() {
    this.route.navigate(['pages/lst_usuario_solicitante']);
  }

  doFound(data: any) {
    //console.log("data", data)
    if (data.code === '200') {
      this.item.persona = data.data.id_persona;
      this.item.apellido = data.data.apellido;
      this.item.nombre = data.data.nombre;
      this.item.dni = data.data.DNI;
      this.item.jerarquia = data.data.jerarquia;
      //console.log('resultado emitido:', this.item);
    }
  }
}
