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

@NgModule({
  declarations: [
    LstUsuariosComponent,
    FilUsuariosComponent,
    PanelHabilitacionComponent,
    BusquedaPersonaComponent,
    ComboRolComponent,
    LstUsuarioSolicitanteComponent,
    FilUsuarioSolicitanteComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [PagesComponent]
})
export class PagesModule { }