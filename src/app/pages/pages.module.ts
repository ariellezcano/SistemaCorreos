import { BrowserModule } from "@angular/platform-browser";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages.routing.module";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LstUsuariosComponent } from "./lst/lst-usuarios/lst-usuarios.component";
import { FilUsuariosComponent } from './filtros/fil-usuarios/fil-usuarios.component';
import { CommonModule } from "@angular/common";
import { PanelHabilitacionComponent } from './componentes/panel-habilitacion/panel-habilitacion.component';
import { BusquedaPersonaComponent } from './componentes/busqueda-persona/busqueda-persona.component';
import { ComboRolComponent } from './componentes/combo-rol/combo-rol.component';
import { NavbarComponent } from './compartido/navbar/navbar.component';
import { LstUsuarioSolicitanteComponent } from './lst/lst-usuario-solicitante/lst-usuario-solicitante.component';
import { FilUsuarioSolicitanteComponent } from './filtros/fil-usuario-solicitante/fil-usuario-solicitante.component';
import { AbmUsuarioSolicitanteComponent } from './frm-abm/abm-usuario-solicitante/abm-usuario-solicitante.component';
import { FilBusquedaSolicitanteComponent } from './componentes/fil-busqueda-solicitante/fil-busqueda-solicitante.component';
import { FilAutocompletadoUnidadComponent } from './componentes/fil-autocompletado-unidad/fil-autocompletado-unidad.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AbmCorreoInstitucionalComponent } from './frm-abm/abm-correo-institucional/abm-correo-institucional.component';
import { LstCorreoInstitucionalComponent } from './lst/lst-correo-institucional/lst-correo-institucional.component';
import { FilCorreosInstitucionalesComponent } from './filtros/fil-correos-institucionales/fil-correos-institucionales.component';
import { AbmPlataformaComponent } from './frm-abm/abm-plataforma/abm-plataforma.component';
import { FilPlataformasComponent } from './filtros/fil-plataformas/fil-plataformas.component';
import { LstPlataformasComponent } from './lst/lst-plataformas/lst-plataformas.component';
import { AbmActualizacionplataformaComponent } from './frm-abm/abm-actualizacionplataforma/abm-actualizacionplataforma.component';
import { AbmReclamosComponent } from './frm-abm/abm-reclamos/abm-reclamos.component';
import { LstReclamosComponent } from './lst/lst-reclamos/lst-reclamos.component';
import { FilReclamosComponent } from './filtros/fil-reclamos/fil-reclamos.component';
import { FooterComponent } from "./compartido/footer/footer.component";
import { FilBusquedaPlataformaComponent } from './componentes/fil-busqueda-plataforma/fil-busqueda-plataforma.component';
import { PanelSeleccionComponent } from './componentes/panel-seleccion/panel-seleccion.component';
import { FilSistemasComponent } from './filtros/fil-sistemas/fil-sistemas.component';
import { LstSistemasComponent } from './lst/lst-sistemas/lst-sistemas.component';
import { AbmSistemasComponent } from './frm-abm/abm-sistemas/abm-sistemas.component';
import { PanelEnDesarrolloComponent } from './componentes/panel-en-desarrollo/panel-en-desarrollo.component';
import { FilConexionesComponent } from './filtros/fil-conexiones/fil-conexiones.component';
import { LstConexionesComponent } from './lst/lst-conexiones/lst-conexiones.component';
import { AbmConexionesComponent } from './frm-abm/abm-conexiones/abm-conexiones.component';
import { FilSolicitudReclamoComponent } from './filtros/fil-solicitud-reclamo/fil-solicitud-reclamo.component';
import { AbmSolicitudReclamoComponent } from './frm-abm/abm-solicitud-reclamo/abm-solicitud-reclamo.component';
import { LstSolicitudReclamoComponent } from './lst/lst-solicitud-reclamo/lst-solicitud-reclamo.component';
import { LstNovedadesDTIComponent } from './lst/lst-novedades-dti/lst-novedades-dti.component';
import { LstTiponovedadComponent } from './lst/lst-tiponovedad/lst-tiponovedad.component';
import { AbmTiponovedadComponent } from './frm-abm/abm-tiponovedad/abm-tiponovedad.component';
import { AbmNovedadesDtiComponent } from './frm-abm/abm-novedades-dti/abm-novedades-dti.component';
import { FilNovedadesDtiComponent } from './filtros/fil-novedades-dti/fil-novedades-dti.component';
import { FilTipoNovedadComponent } from './filtros/fil-tipo-novedad/fil-tipo-novedad.component';

@NgModule({
  declarations: [
    PagesComponent,
    NavbarComponent,
    FooterComponent,
    LstUsuariosComponent,
    FilUsuariosComponent,
    PanelHabilitacionComponent,
    BusquedaPersonaComponent,
    ComboRolComponent,
    LstUsuarioSolicitanteComponent,
    FilUsuarioSolicitanteComponent,
    AbmUsuarioSolicitanteComponent,
    FilBusquedaSolicitanteComponent,
    FilAutocompletadoUnidadComponent,
    AbmCorreoInstitucionalComponent,
    LstCorreoInstitucionalComponent,
    FilCorreosInstitucionalesComponent,
    AbmPlataformaComponent,
    FilPlataformasComponent,
    LstPlataformasComponent,
    AbmActualizacionplataformaComponent,
    AbmReclamosComponent,
    LstReclamosComponent,
    FilReclamosComponent,
    FilBusquedaPlataformaComponent,
    PanelSeleccionComponent,
    FilSistemasComponent,
    LstSistemasComponent,
    AbmSistemasComponent,
    PanelEnDesarrolloComponent,
    FilConexionesComponent,
    LstConexionesComponent,
    AbmConexionesComponent,
    FilSolicitudReclamoComponent,
    AbmSolicitudReclamoComponent,
    LstSolicitudReclamoComponent,
    LstNovedadesDTIComponent,
    LstTiponovedadComponent,
    AbmTiponovedadComponent,
    AbmNovedadesDtiComponent,
    FilNovedadesDtiComponent,
    FilTipoNovedadComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutocompleteLibModule // 👈 acá
  ],
  providers: [],
  bootstrap: [PagesComponent]
})
export class PagesModule { }