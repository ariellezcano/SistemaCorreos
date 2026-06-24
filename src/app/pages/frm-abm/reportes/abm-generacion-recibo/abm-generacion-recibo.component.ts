import { ReportesService } from 'src/app/services/componentes/reportes.service';
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

  constructor(
    private route: Router,
    private reportesService: ReportesService,
  ) {
    this.unidad = 0;
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
      unidad: this.nombreUnidad,
    };

    this.reportesService.generarRecibo(filtro).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);

        window.open(url, '_blank');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  back() {
    this.route.navigate(['pages/panel_reportes']);
  }
  
}
