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
import { LstNovedadesDTIComponent } from './lst/lst-novedades-dti/lst-novedades-dti.component';
import { AbmNovedadesDtiComponent } from './frm-abm/abm-novedades-dti/abm-novedades-dti.component';
import { LstTiponovedadComponent } from './lst/lst-tiponovedad/lst-tiponovedad.component';
import { AbmTiponovedadComponent } from './frm-abm/abm-tiponovedad/abm-tiponovedad.component';
import { AbmCambioTitularComponent } from './frm-abm/abm-cambio-titular/abm-cambio-titular.component';
import { LstMarcaComponent } from './lst/lst-marca/lst-marca.component';
import { AbmMarcaComponent } from './frm-abm/abm-marca/abm-marca.component';
import { LstModeloComponent } from './lst/lst-modelo/lst-modelo.component';
import { AbmModeloComponent } from './frm-abm/abm-modelo/abm-modelo.component';
import { LstTipoEquipoComponent } from './lst/lst-tipo-equipo/lst-tipo-equipo.component';
import { AbmTipoEquipoComponent } from './frm-abm/abm-tipo-equipo/abm-tipo-equipo.component';
import { LstProveedorComponent } from './lst/lst-proveedor/lst-proveedor.component';
import { AbmProveedorComponent } from './frm-abm/abm-proveedor/abm-proveedor.component';
import { LstEquipamientosComponent } from './lst/lst-equipamientos/lst-equipamientos.component';
import { AbmEquipamientosComponent } from './frm-abm/abm-equipamientos/abm-equipamientos.component';
import { AbmAsignacionEquipoComponent } from './frm-abm/abm-asignacion-equipo/abm-asignacion-equipo.component';
import { FrmDetalleEntregaComponent } from './frm-abm/frm-detalle-entrega/frm-detalle-entrega.component';
import { AuthGuard } from './compartido/guards/auth.guard';
import { LstMantenimientoComponent } from './lst/lst-mantenimiento/lst-mantenimiento.component';
import { AbmMantenimientoComponent } from './frm-abm/abm-mantenimiento/abm-mantenimiento.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'principal', pathMatch: 'full' }, // Agregá esto
      { path: 'principal', component: PanelSeleccionComponent, canActivate: [AuthGuard] },
      { path: 'pagina_en_desarrollo', component: PanelEnDesarrolloComponent, canActivate: [AuthGuard] },
      { path: 'lst_usuario', component: LstUsuariosComponent, canActivate: [AuthGuard] },
      { path: 'habilitar_usuario', component: PanelHabilitacionComponent, canActivate: [AuthGuard] },
      { path: 'lst_usuario_solicitante', component: LstUsuarioSolicitanteComponent, canActivate: [AuthGuard] },
      { path: 'agregar_solicitante', component: AbmUsuarioSolicitanteComponent, canActivate: [AuthGuard] },
      { path: 'agregar_solicitante/:id', component: AbmUsuarioSolicitanteComponent, canActivate: [AuthGuard] },
      { path: 'agregar_correo/:id', component: AbmCorreoInstitucionalComponent, canActivate: [AuthGuard] },
      { path: 'lst_correos_institucionales', component: LstCorreoInstitucionalComponent, canActivate: [AuthGuard] },
      { path: 'plataformas/:id', component: AbmPlataformaComponent, canActivate: [AuthGuard] },
      { path: 'lst_plataforma', component: LstPlataformasComponent, canActivate: [AuthGuard] },
      { path: 'abm_plataforma/:id', component: AbmActualizacionplataformaComponent, canActivate: [AuthGuard] },
      { path: 'lst_reclamos', component: LstReclamosComponent, canActivate: [AuthGuard] },
      { path: 'abm_reclamos', component: AbmReclamosComponent, canActivate: [AuthGuard] },
      { path: 'lst_sistemas', component: LstSistemasComponent, canActivate: [AuthGuard] },
      { path: 'abm_sistemas/:id', component: AbmSistemasComponent, canActivate: [AuthGuard] },
      { path: 'lst_conexiones', component: LstConexionesComponent, canActivate: [AuthGuard] },
      { path: 'abm_conexiones/:id', component: AbmConexionesComponent, canActivate: [AuthGuard] },
      { path: 'lst_solicitudReclamo', component: LstSolicitudReclamoComponent, canActivate: [AuthGuard] },
      { path: 'abm_solicitudReclamo/:id', component: AbmSolicitudReclamoComponent, canActivate: [AuthGuard] },
      { path: 'lst_novedadesDTI', component: LstNovedadesDTIComponent, canActivate: [AuthGuard] },
      { path: 'abm_novedadesDTI/:id', component: AbmNovedadesDtiComponent, canActivate: [AuthGuard] },
      { path: 'lst_tipoNovedad', component: LstTiponovedadComponent, canActivate: [AuthGuard] },
      { path: 'abm_tipoNovedad/:id', component: AbmTiponovedadComponent, canActivate: [AuthGuard] },
      { path: 'abm_cambiarTitular/:id', component: AbmCambioTitularComponent, canActivate: [AuthGuard] },
      { path: 'lst_marcas', component: LstMarcaComponent, canActivate: [AuthGuard] },
      { path: 'abm_marcas/:id', component: AbmMarcaComponent, canActivate: [AuthGuard] },
      { path: 'lst_modelos', component: LstModeloComponent, canActivate: [AuthGuard] },
      { path: 'abm_modelos/:id', component: AbmModeloComponent, canActivate: [AuthGuard] },
      { path: 'lst_tipoEquipo', component: LstTipoEquipoComponent, canActivate: [AuthGuard] },
      { path: 'abm_tipoEquipo/:id', component: AbmTipoEquipoComponent, canActivate: [AuthGuard] },
      { path: 'lst_proveedor', component: LstProveedorComponent, canActivate: [AuthGuard] },
      { path: 'abm_proveedor/:id', component: AbmProveedorComponent, canActivate: [AuthGuard] },
      { path: 'lst_equipamientos', component: LstEquipamientosComponent, canActivate: [AuthGuard] },
      { path: 'abm_equipamiento/:id', component: AbmEquipamientosComponent, canActivate: [AuthGuard] },
      { path: 'abm_asignacion/:id', component: AbmAsignacionEquipoComponent, canActivate: [AuthGuard] },
      { path: 'detalle_entrega/:id', component: FrmDetalleEntregaComponent, canActivate: [AuthGuard] },
      { path: 'lst_mantenimiento', component: LstMantenimientoComponent, canActivate: [AuthGuard] },
      { path: 'abm_mantenimiento/:id', component: AbmMantenimientoComponent, canActivate: [AuthGuard] },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)], // ✅ forChild, no forRoot
  exports: [RouterModule],
})
export class PagesRoutingModule {}