import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlataformaCorreoDto } from 'src/app/modelos/componentes/relacionModelos/plataformaCorreoDto';
import { PlataformaReclamo } from 'src/app/modelos/componentes/relacionModelos/plataformaReclamo';
import { Reclamos } from 'src/app/modelos/index.models';
import { PlataformaService, ReclamoService } from 'src/app/services/index.service';

@Component({
  selector: 'app-abm-reclamos',
  templateUrl: './abm-reclamos.component.html',
  styleUrls: ['./abm-reclamos.component.scss'],
})
export class AbmReclamosComponent implements OnInit {
  editando: boolean = false;

  itemPlataforma: PlataformaReclamo;
  item: Reclamos;

  constructor(private route: Router, private wsdl: ReclamoService) {
    this.item = new Reclamos();
    this.itemPlataforma = new PlataformaReclamo();
  }

  ngOnInit(): void {}

  doFound(item: PlataformaReclamo) {
    this.itemPlataforma = item;
  }

  back() {
    this.route.navigate(['pages/lst_reclamos']);
  }

  guardar() {}
}
