import { Component, OnInit, ViewChild } from '@angular/core';
import { FilSistemasComponent } from '../../filtros/fil-sistemas/fil-sistemas.component';
import { Sistemas } from 'src/app/modelos/index.models';
import { SistemasService } from 'src/app/services/index.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Utils } from 'src/app/utils/utils';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-lst-sistemas',
  templateUrl: './lst-sistemas.component.html',
  styleUrls: ['./lst-sistemas.component.scss']
})
export class LstSistemasComponent implements OnInit {

   @ViewChild(FilSistemasComponent, { static: false })
    fil!: FilSistemasComponent;
  
    item: Sistemas;
    items: Sistemas[];
  
    constructor(private wsdl: SistemasService, private route: Router) {
      this.item = new Sistemas();
      this.items = [];
    }
  
    ngOnInit(): void {}
  
    doFound(event: Sistemas[]) {
      //console.log('llegue');
      this.items = event;
    }
  
    linkear(id?: Number) {
      this.route.navigateByUrl('pages/abm_sistemas/' + id);
    }
  
    back() {
      this.route.navigate(['pages/lst_plataforma']);
    }
  
    agregarSistema(){
      
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
        
        const data = await firstValueFrom(this.wsdl.delete(plataforma, usuarioBaja));
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

    
  }
  
