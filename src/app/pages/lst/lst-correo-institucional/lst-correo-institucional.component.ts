import { Component, OnInit } from '@angular/core';
import { UsuarioCorreoDto } from 'src/app/modelos/componentes/relacionModelos/usuarioCorreoDto';

@Component({
  selector: 'app-lst-correo-institucional',
  templateUrl: './lst-correo-institucional.component.html',
  styleUrls: ['./lst-correo-institucional.component.scss']
})
export class LstCorreoInstitucionalComponent implements OnInit {

  item: UsuarioCorreoDto;
  items: UsuarioCorreoDto[];

  constructor() { 
    this.item = new UsuarioCorreoDto();
    this.items = [];
  }

  ngOnInit(): void {
  }

}
