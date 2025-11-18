import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  usuario!: {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    const personal = JSON.parse(Utils.getSession('personal') || '{}');
    //this.rol = personal.rol || '';
    this.usuario = `${personal.apellido || ''} ${personal.nombre || ''}`;
  }

  logout() {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Deberá volver a iniciar sesión!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cerrar();
      }
    });
  }

  cerrar(): void {
    
    Utils.clearSession();
        this.router.navigate(['/login']);
  }
}
