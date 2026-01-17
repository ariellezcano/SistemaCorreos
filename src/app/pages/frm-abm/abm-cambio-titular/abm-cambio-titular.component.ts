import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorreoInstitucionalService } from 'src/app/services/componentes/correo-institucional.service';

@Component({
  selector: 'app-abm-cambio-titular',
  templateUrl: './abm-cambio-titular.component.html',
  styleUrls: ['./abm-cambio-titular.component.scss'],
})
export class AbmCambioTitularComponent implements OnInit {
  id?: number;
  modoEditar = false;

  constructor(
    private route: Router,
    private url: ActivatedRoute,
    private wsdl: CorreoInstitucionalService,
  ) {}

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.modoEditar = !!this.id;
  }

  back() {
    this.route.navigate(['pages/lst_correoInstitucional']);
  }
}
