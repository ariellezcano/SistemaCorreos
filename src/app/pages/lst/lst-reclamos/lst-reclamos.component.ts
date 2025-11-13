import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioReclamoDTO } from 'src/app/modelos/componentes/relacionModelos/usuarioReclamoDto';
import { Reclamos } from 'src/app/modelos/index.models';
import { ReclamoService } from 'src/app/services/index.service';

@Component({
  selector: 'app-lst-reclamos',
  templateUrl: './lst-reclamos.component.html',
  styleUrls: ['./lst-reclamos.component.scss']
})
export class LstReclamosComponent implements OnInit {

  items: UsuarioReclamoDTO[];

  constructor(private wsdl: ReclamoService, private route: Router) { 
    this.items = [];
  }

  ngOnInit(): void {
  }

  nuevoReclamo() {
    this.route.navigate(['/pages/abm_reclamos']);
  }

  editar(item: Reclamos) {
    console.log('Editar:', item);
  }

  doFound(data: UsuarioReclamoDTO[]){
    this.items = data;
  }

  eliminar(item: Reclamos) {
    console.log('Eliminar:', item);
  }

}
