import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UsuarioSolicitante } from 'src/app/modelos/index.models';
import { UsuarioSolicitanteService } from 'src/app/services/index.service';

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

  guardar() {
    try {
    } catch (error) {}
  }

  cancelar() {
    this.route.navigate(['principal']);
  }
}
