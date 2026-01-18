import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CorreoBasicoDTO } from 'src/app/modelos/componentes/relacionModelos/correoBasicoDTO';
import { Persona, UsuarioSolicitante } from 'src/app/modelos/index.models';
import { CorreoInstitucionalService } from 'src/app/services/componentes/correo-institucional.service';

@Component({
  selector: 'app-abm-cambio-titular',
  templateUrl: './abm-cambio-titular.component.html',
  styleUrls: ['./abm-cambio-titular.component.scss'],
})
export class AbmCambioTitularComponent implements OnInit {
  id?: number;
  modoEditar = false;

  itemCorreo: CorreoBasicoDTO;
  titularNuevo: UsuarioSolicitante;

  constructor(
    private route: Router,
    private url: ActivatedRoute,
    private wsdl: CorreoInstitucionalService,
  ) {
    this.itemCorreo = new CorreoBasicoDTO();
    this.titularNuevo = new UsuarioSolicitante();
  }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.modoEditar = !!this.id;

    this.obtenerCorreoPorId();
  }

  async obtenerCorreoPorId() {
    try {
      console.log("id",this.id)
      let consulta = await firstValueFrom(
        this.wsdl.getIdCorreo(Number(this.id)),
      );
      const result = JSON.parse(JSON.stringify(consulta));
      if (result.code == '200') {
        console.log('resultado', result.dato);
        this.itemCorreo = result.dato;
        //this.editando = true;
      }
    } catch (error) {}
  }


  titularSeleccionado(data: any) {
    //console.log('data', data);
    if (data.code === '200') {
      this.titularNuevo.persona = data.data.id_persona;
      this.titularNuevo.apellido = data.data.apellido;
      this.titularNuevo.nombre = data.data.nombre;
      this.titularNuevo.dni = data.data.DNI;
      this.titularNuevo.jerarquia = data.data.jerarquia;
      this.titularNuevo.unidadDpte = data.data.unidad_id;
      this.titularNuevo.nombreUnidad = data.data.unidad;
      //console.log('resultado emitido:', this.item);
    }
  }

  guardarCambio() {}

  back() {
    this.route.navigate(['pages/lst_correos_institucionales']);
  }
}
