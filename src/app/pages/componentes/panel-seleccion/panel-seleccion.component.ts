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

  volverAlPanel() {
    this.navbarService.setModo('principal');
    this.router.navigate(['/pages/principal']);
  }

  
}
