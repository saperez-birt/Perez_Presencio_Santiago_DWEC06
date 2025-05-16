import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ListaVideojuegosComponent } from './components/lista-videojuegos/lista-videojuegos.component';
import { DetallesVideojuegoComponent } from './components/detalles-videojuego/detalles-videojuego.component';
import { FormularioVideojuegoComponent } from './components/formulario-videojuego/formulario-videojuego.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'videojuegos', component: ListaVideojuegosComponent },
  { path: 'videojuegos/:id', component: DetallesVideojuegoComponent },
  { path: 'nuevo-videojuego', component: FormularioVideojuegoComponent },
  { path: 'editar-videojuego/:id', component: FormularioVideojuegoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
