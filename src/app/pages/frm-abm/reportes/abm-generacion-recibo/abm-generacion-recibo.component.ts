import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abm-generacion-recibo',
  templateUrl: './abm-generacion-recibo.component.html',
  styleUrls: ['./abm-generacion-recibo.component.scss'],
})
export class AbmGeneracionReciboComponent implements OnInit {

  fechaEntrega: any;
  unidad: number;
  nombreUnidad: string = '';

  constructor(private route: Router,) {
    this.unidad = 0
  }

  ngOnInit(): void {}

  unidadSeleccionada(unidad: any) {
    if (!unidad) return;

    this.unidad = unidad.id;

    this.nombreUnidad = unidad.nombre;

  }

  generarRecibo() {

  const filtro = {
    fechaEntrega: this.fechaEntrega,
    idUnidad: this.unidad
  };

  //this.reportesService.generarRecibo(filtro);
}


  back() {
    this.route.navigate(['pages/panel_reportes']);
  }

}
