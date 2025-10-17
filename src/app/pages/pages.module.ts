import { BrowserModule } from "@angular/platform-browser";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages.routing.module";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LstUsuariosComponent } from "./lst/lst-usuarios/lst-usuarios.component";
import { FilUsuariosComponent } from './filtros/fil-usuarios/fil-usuarios.component';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    LstUsuariosComponent,
    FilUsuariosComponent,

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