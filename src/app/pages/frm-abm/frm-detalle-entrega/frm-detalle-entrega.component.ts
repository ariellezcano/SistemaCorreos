import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DetalleEntregaDto } from 'src/app/modelos/componentes/relacionModelos/detalleEntregaDTO';
import { DetalleEntregaService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frm-detalle-entrega',
  templateUrl: './frm-detalle-entrega.component.html',
  styleUrls: ['./frm-detalle-entrega.component.scss'],
})
export class FrmDetalleEntregaComponent implements OnInit {
  detalle: DetalleEntregaDto;
  id!: number;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DetalleEntregaService,
  ) {
    this.detalle = new DetalleEntregaDto();
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerDetalle();
  }

  async obtenerDetalle() {
    this.loading = true;
    try {
      const data = await firstValueFrom(this.service.obtenerPorId(this.id));
      const result = JSON.parse(JSON.stringify(data));
      console.log('obtener detalle', result);
      if (result.code === '200') {
        this.detalle = result.dato;
        this.loading = false;
      }
    } catch {
      Swal.fire('Error', 'No se pudo obtener la novedad', 'error');
    }
  }

  volver() {
    this.router.navigate(['pages/lst_equipamientos']);
  }
}
