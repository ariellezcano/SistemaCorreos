import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LstUsuariosComponent } from './lst/lst-usuarios/lst-usuarios.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LstUsuariosComponent },
      //{ path: ':id', component: ReportesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // ✅ forChild, no forRoot
  exports: [RouterModule],
})
export class PagesRoutingModule {}