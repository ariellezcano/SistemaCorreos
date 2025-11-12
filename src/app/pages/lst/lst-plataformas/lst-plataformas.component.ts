import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PlataformaCorreoDto } from 'src/app/modelos/componentes/relacionModelos/plataformaCorreoDto';
import { Plataforma } from 'src/app/modelos/index.models';
import { PlataformaService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lst-plataformas',
  templateUrl: './lst-plataformas.component.html',
  styleUrls: ['./lst-plataformas.component.scss'],
})
export class LstPlataformasComponent implements OnInit {
  item: PlataformaCorreoDto;
  items: PlataformaCorreoDto[];

  constructor(private wsdl: PlataformaService, private route: Router) {
    this.item = new PlataformaCorreoDto();
    this.items = [];
  }

  ngOnInit(): void {}

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
}
