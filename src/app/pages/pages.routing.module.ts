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
import { LstReclamosComponent } from './lst/lst-reclamos/lst-reclamos.component';
import { AbmReclamosComponent } from './frm-abm/abm-reclamos/abm-reclamos.component';
import { PanelSeleccionComponent } from './componentes/panel-seleccion/panel-seleccion.component';
import { LstSistemasComponent } from './lst/lst-sistemas/lst-sistemas.component';
import { AbmSistemasComponent } from './frm-abm/abm-sistemas/abm-sistemas.component';
import { PanelEnDesarrolloComponent } from './componentes/panel-en-desarrollo/panel-en-desarrollo.component';
import { LstConexionesComponent } from './lst/lst-conexiones/lst-conexiones.component';
import { AbmConexionesComponent } from './frm-abm/abm-conexiones/abm-conexiones.component';
import { LstSolicitudReclamoComponent } from './lst/lst-solicitud-reclamo/lst-solicitud-reclamo.component';
import { AbmSolicitudReclamoComponent } from './frm-abm/abm-solicitud-reclamo/abm-solicitud-reclamo.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'principal', pathMatch: 'full' }, // Agregá esto
      { path: 'principal', component: PanelSeleccionComponent },
      { path: 'pagina_en_desarrollo', component: PanelEnDesarrolloComponent },
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
      { path: 'lst_reclamos', component: LstReclamosComponent },
      { path: 'abm_reclamos', component: AbmReclamosComponent },
      { path: 'lst_sistemas', component: LstSistemasComponent },
      { path: 'abm_sistemas/:id', component: AbmSistemasComponent },
      { path: 'lst_conexiones', component: LstConexionesComponent },
      { path: 'abm_conexiones/:id', component: AbmConexionesComponent },
      { path: 'lst_solicitudReclamo', component: LstSolicitudReclamoComponent },
      { path: 'abm_solicitudReclamo/:id', component: AbmSolicitudReclamoComponent },

    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)], // ✅ forChild, no forRoot
  exports: [RouterModule],
})
export class PagesRoutingModule {}