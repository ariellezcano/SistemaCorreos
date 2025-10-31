import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Roles } from 'src/app/modelos/index.models';
import { RolService } from 'src/app/services/componentes/rol.service';

@Component({
  selector: 'app-combo-rol',
  templateUrl: './combo-rol.component.html',
  styleUrls: ['./combo-rol.component.scss'],
})
export class ComboRolComponent implements OnInit {
  @Input()
  set dibujar(item: any) {
    this.item = item;
  }

  @Output()
  emitir: EventEmitter<Roles> = new EventEmitter<Roles>();

  item: Roles;
  items: Roles[];
  //itemss: Roles[];

  constructor(private wsdl: RolService) {
    this.item = new Roles();
    this.items = [];
    //this.itemss = [];
    this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }

  //captura el dato del combo
  capturar(event: Roles) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: Roles, c2: Roles): boolean {
    return c1 && c2 ? c1.id_rol === c2.id_rol : c1 === c2;
  }

  // async listar() {
  //   let data = await lastValueFrom(this.wsdl.getList());
  //   //console.log("resultado combo", data);
  //   const Json = JSON.parse(JSON.stringify(data));
  //   //console.log("resultado combo", Json);
  //   if (Json.code === '200') {
  //     //console.log("resultado combo 200", Json);
  //     this.items = Json.data;
  //     this.items.sort((x: any, y: any) => {
  //       if (x.nombre > y.nombre) {
  //         return 1;
  //       }
  //       if (x.nombre < y.nombre) {
  //         return -1;
  //       }
  //       return 0;
  //     });
  //   }
  // }

  async listar() {
    try {
      const data = await lastValueFrom(this.wsdl.getList());
      const json = JSON.parse(JSON.stringify(data));

      if (json.code === '200') {
        // Filtra y ordena en un solo paso
        this.items = json.data
          .filter((x: any) => x.id_rol !== 4)
          .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
      }
    } catch (error) {
      console.error('Error al listar:', error);
    }
  }

  // for (var i = 0; i < this.itemss.length; i++) {
  //   const element = this.itemss[i];
  //   if (element.nombre != 'SUPERMANAGER' && element.nombre != 'DESARROLLADOR') {
  //   var igual = false;
  //   for (var j = 0; j < this.items.length && !igual; j++) {
  //     if (this.itemss[i]['id'] == this.items[j]['id']) {
  //       igual = true;
  //     }
  //   }
  //   if (!igual) {
  //       this.items.push(this.itemss[i]);
  //     }
  //   }
  // }

  // this.itemss.splice(element.id, 1);
}
