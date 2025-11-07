import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Correo } from 'src/app/modelos/index.models';
import { CorreoInstitucionalService } from 'src/app/services/componentes/correo-institucional.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-correo-institucional',
  templateUrl: './abm-correo-institucional.component.html',
  styleUrls: ['./abm-correo-institucional.component.scss'],
})
export class AbmCorreoInstitucionalComponent implements OnInit {
  item: Correo;
  editando = false;
  mostrarPass = false;
  id: any;

  constructor(private wsdl: CorreoInstitucionalService, private route: Router, private url: ActivatedRoute,) {
    this.item = new Correo();
  }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
  }

  async guardar() {
    try {
          this.item.usuarioCrea = 7;
          this.item.usuarioSolicitante = this.id;
          const data = await firstValueFrom(this.wsdl.insert(this.item));
          const result = JSON.parse(JSON.stringify(data));
    
          if (result.code === '201') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Registro creado correctamente',
              showConfirmButton: false,
              timer: 1500,
            });
            this.back();
          } else {
            Swal.fire('Atención', result.message, 'warning');
          }
        } catch (error) {
          Swal.fire({
            title: 'Error al crear registro, verifique!',
            icon: 'error',
          });
        }
  }

  back() {
    this.route.navigate(['pages/lst_usuario_solicitante']);
  }

  cancelar() {
  //this.item = {};
  this.editando = false;
}
}
