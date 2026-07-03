import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PlataformaCorreoDto } from 'src/app/modelos/componentes/relacionModelos/plataformaCorreoDto';
import { Plataforma } from 'src/app/modelos/index.models';
import { PlataformaService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilPlataformasComponent } from '../../filtros/fil-plataformas/fil-plataformas.component';
import { Utils } from 'src/app/utils/utils';
import { ReportesService } from 'src/app/services/componentes/reportes.service';

@Component({
  selector: 'app-lst-plataformas',
  templateUrl: './lst-plataformas.component.html',
  styleUrls: ['./lst-plataformas.component.scss'],
})
export class LstPlataformasComponent implements OnInit {
  @ViewChild(FilPlataformasComponent, { static: false })
  fil!: FilPlataformasComponent;
  cargandoPdf: boolean = false;
  item: PlataformaCorreoDto;
  items: PlataformaCorreoDto[];
  rol: string = '';

  constructor(
    private wsdl: PlataformaService,
    private route: Router,
    private reportesService: ReportesService,
  ) {
    this.item = new PlataformaCorreoDto();
    this.items = [];
  }

  ngOnInit(): void {
    const personal = Utils.getSession('personal');

    if (personal) {
      try {
        const obj = JSON.parse(personal);
        this.rol = obj.rol || '';
      } catch {
        this.rol = '';
      }
    }
  }

  doFound(event: PlataformaCorreoDto[]) {
    //console.log('llegue');
    this.items = event;
  }

  linkear(id?: Number) {
    this.route.navigateByUrl('pages/abm_plataforma/' + id);
  }

  back() {
    this.route.navigate(['pages/lst_plataforma']);
  }

  async eliminar(plataforma: number) {
    Swal.fire({
      title: 'Estás seguro de eliminar?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminacion(plataforma);
      } else if (result.isDenied) {
        Swal.fire('Operacion cancelada', '', 'info');
      }
    });
  }

  async eliminacion(plataforma: number) {
    try {
      // capturar el idUsuarioBaja
      let usuarioBaja = Number(Utils.getSession('user'));

      const data = await firstValueFrom(
        this.wsdl.delete(plataforma, usuarioBaja),
      );
      const result = JSON.parse(JSON.stringify(data));

      if (result.code === '200') {
        Swal.fire('Operación realizada...', '', 'success');
        this.back();
        this.fil.filter();
      } else {
        Swal.fire('Atención', result.message, 'warning');
      }
    } catch (error: any) {
      if (error.status == '500') {
        Swal.fire({
          title: 'Error al crear registro, verifique!',
          icon: 'error',
        });
      }
    }
  }

  imprimirActa(idPlataforma: number) {
  this.cargandoPdf = true;

  this.reportesService.imprimirActa(idPlataforma).subscribe({
    next: (pdf: Blob) => {
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `Acta_${idPlataforma}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);

      this.cargandoPdf = false;
    },
    error: () => {
      this.cargandoPdf = false;
      alert('Error al generar el acta');
    },
  });
}

  puedeOperar(): boolean {
    return (
      this.rol === 'MANAGER' ||
      this.rol === 'DEVELOPER' ||
      this.rol === 'ADMINISTRADOR'
    );
  }

  puedeEliminar(): boolean {
    return this.rol === 'MANAGER' || this.rol === 'DEVELOPER';
  }
}
