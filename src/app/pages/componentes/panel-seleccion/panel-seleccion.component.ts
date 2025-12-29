import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-panel-seleccion',
  templateUrl: './panel-seleccion.component.html',
  styleUrls: ['./panel-seleccion.component.scss'],
})
export class PanelSeleccionComponent implements OnInit {
  constructor(private router: Router, private navbarService: NavbarService) {}

  ngOnInit(): void {}

  IrACorreos() {
    this.navbarService.setModo('correos');
    this.router.navigate(['/pages/lst_usuario']);
  }

  irASistemas() {
    this.navbarService.setModo('sistemas');
    this.router.navigate(['/pages/lst_sistemas']);
  }

  volverAlPanel() {
    this.navbarService.setModo('principal');
    this.router.navigate(['/pages/principal']);
  }

  irAConexiones() {
    this.navbarService.setModo('conexiones');
    this.router.navigate(['/pages/lst_conexiones']);
  }

  irAInsumos() {
    this.navbarService.setModo('insumos');
    this.router.navigate(['/pages/pagina_en_desarrollo']);
  }

  irANovedades() {
    this.navbarService.setModo('novedades');
    this.router.navigate(['/pages/pagina_en_desarrollo']);
  }
}
