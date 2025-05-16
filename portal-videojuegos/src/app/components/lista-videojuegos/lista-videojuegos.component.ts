import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VideojuegoService } from 'src/app/services/videojuego.service';
import { Videojuego } from 'src/app/models/Videojuego';

@Component({
  selector: 'app-lista-videojuegos',
  templateUrl: './lista-videojuegos.component.html',
  styleUrls: ['./lista-videojuegos.component.css'],
  providers: [VideojuegoService]
})

export class ListaVideojuegosComponent implements OnInit {
  videojuegos: Videojuego[] = [];
  cargando: boolean = false;
  error: string = '';

  constructor(private videojuegoService: VideojuegoService, private router: Router) {}

  /* Nos aseguramos de que se haga la consulta a la API cuando
  se cargue la vista */
  ngOnInit(): void {
    this.cargarVideojuegos();
  }

  /* Metodo para cargar los datos de todos los videojuegos */
  cargarVideojuegos(): void {
    this.cargando = true;
    this.videojuegoService.getAllVideojuegos().subscribe({
      next: (data) => {
        this.videojuegos = data;
        this.cargando = false;
      },
      error: (error) => {
        this.error = "Error al cargar la lista de videojuegos";
        this.cargando = false;
        console.error(this.error, error);
      }
    });
  }

  /* Metodo que redirige a la vista de detalles de un videojuego */
  verDetalles(id: number): void {
    this.router.navigate(['/videojuegos', id]);
  }

  /* Metodo que redirige al formulario de edicion del videojuego */
  editarVideojuego(id: number): void {
    this.router.navigate(['/editar-videojuego', id]);
  }

  /* Metodo que permite eliminar un videojuego */
  eliminarVideojuego(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar el videojuego?')) {
      this.videojuegoService.deleteVideojuego(id).subscribe({
        next: () => {
          alert('Videojuego eliminado correctamente');
          this.cargarVideojuegos();
        },
        error: (error) => {
          this.error = "Error al eliminar el videojuego";
          console.error(this.error, error);
        }
      });
    }
  }
}
