import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LstUsuariosComponent } from './lst/lst-usuarios/lst-usuarios.component';
import { PagesComponent } from './pages.component';
import { BusquedaPersonaComponent } from './componentes/busqueda-persona/busqueda-persona.component';
import { PanelHabilitacionComponent } from './componentes/panel-habilitacion/panel-habilitacion.component';
import { LstUsuarioSolicitanteComponent } from './lst/lst-usuario-solicitante/lst-usuario-solicitante.component';
import { AbmUsuarioSolicitanteComponent } from './frm-abm/abm-usuario-solicitante/abm-usuario-solicitante.component';
import { AbmCorreoInstitucionalComponent } from './frm-abm/abm-correo-institucional/abm-correo-institucional.component';
import { LstCorreoInstitucionalComponent } from './lst/lst-correo-institucional/lst-correo-institucional.component';
import { AbmPlataformaComponent } from './frm-abm/abm-plataforma/abm-plataforma.component';
import { LstPlataformasComponent } from './lst/lst-plataformas/lst-plataformas.component';
import { AbmActualizacionplataformaComponent } from './frm-abm/abm-actualizacionplataforma/abm-actualizacionplataforma.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lst_usuario', component: LstUsuariosComponent },
      { path: 'habilitar_usuario', component: PanelHabilitacionComponent },
      { path: 'lst_usuario_solicitante', component: LstUsuarioSolicitanteComponent },
      { path: 'agregar_solicitante', component: AbmUsuarioSolicitanteComponent },
      { path: 'agregar_solicitante/:id', component: AbmUsuarioSolicitanteComponent },
      { path: 'agregar_correo/:id', component: AbmCorreoInstitucionalComponent },
      { path: 'lst_correos_institucionales', component: LstCorreoInstitucionalComponent },
      { path: 'plataformas/:id', component: AbmPlataformaComponent },
      { path: 'lst_plataforma', component: LstPlataformasComponent },
      { path: 'abm_plataforma/:id', component: AbmActualizacionplataformaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // ✅ forChild, no forRoot
  exports: [RouterModule],
})
export class PagesRoutingModule {}