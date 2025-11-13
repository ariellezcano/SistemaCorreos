import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlataformaReclamo } from 'src/app/modelos/componentes/relacionModelos/plataformaReclamo';
import { PlataformaService } from 'src/app/services/index.service';

@Component({
  selector: 'app-fil-busqueda-plataforma',
  templateUrl: './fil-busqueda-plataforma.component.html',
  styleUrls: ['./fil-busqueda-plataforma.component.scss']
})
export class FilBusquedaPlataformaComponent implements OnInit {

  @Output() emmit: EventEmitter<PlataformaReclamo> = new EventEmitter();

    dni!: number;
  constructor(private wsdl: PlataformaService) { 
  
  }

  ngOnInit(): void {
  }

buscar(){}


}
