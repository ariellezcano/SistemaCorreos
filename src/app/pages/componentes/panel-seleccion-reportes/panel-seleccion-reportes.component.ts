import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-seleccion-reportes',
  templateUrl: './panel-seleccion-reportes.component.html',
  styleUrls: ['./panel-seleccion-reportes.component.scss'],
})
export class PanelSeleccionReportesComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  reportePorPeriodo() {}

  irARecibos() {
    this.router.navigate(['/pages/panel_recibo']);
  }
}
