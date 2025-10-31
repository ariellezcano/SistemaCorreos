import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LstUsuariosComponent } from './lst/lst-usuarios/lst-usuarios.component';
import { PagesComponent } from './pages.component';
import { BusquedaPersonaComponent } from './componentes/busqueda-persona/busqueda-persona.component';
import { PanelHabilitacionComponent } from './componentes/panel-habilitacion/panel-habilitacion.component';
import { LstUsuarioSolicitanteComponent } from './lst/lst-usuario-solicitante/lst-usuario-solicitante.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lst_usuario', component: LstUsuariosComponent },
      { path: 'habilitar_usuario', component: PanelHabilitacionComponent },
      { path: 'lst_usuario_solicitante', component: LstUsuarioSolicitanteComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // ✅ forChild, no forRoot
  exports: [RouterModule],
})
export class PagesRoutingModule {}