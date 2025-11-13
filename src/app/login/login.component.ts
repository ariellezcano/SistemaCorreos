import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 anioActual = new Date().getFullYear();

  form = this.fb.group({
    usuario: ['', Validators.required],
    contrasenia: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login() {
    if (this.form.invalid) return;

    const { usuario, contrasenia } = this.form.value;

    // Simulación simple (luego podés conectar con tu API)
    if (usuario === 'policia' && contrasenia === 'policia') {
      this.router.navigate(['/pages']);
    } else {
      alert('Credenciales incorrectas. Intente nuevamente.');
    }
  }

}
