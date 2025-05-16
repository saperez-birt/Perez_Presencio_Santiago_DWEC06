import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ListaVideojuegosComponent } from './components/lista-videojuegos/lista-videojuegos.component';
import { FormularioVideojuegoComponent } from './components/formulario-videojuego/formulario-videojuego.component';
import { DetallesVideojuegoComponent } from './components/detalles-videojuego/detalles-videojuego.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ListaVideojuegosComponent,
    FormularioVideojuegoComponent,
    DetallesVideojuegoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
