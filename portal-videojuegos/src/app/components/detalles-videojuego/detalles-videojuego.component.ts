import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { VideojuegoService } from 'src/app/services/videojuego.service';
import { Videojuego } from 'src/app/models/Videojuego';

@Component({
  selector: 'app-detalles-videojuego',
  templateUrl: './detalles-videojuego.component.html',
  styleUrls: ['./detalles-videojuego.component.css'],
  providers: [VideojuegoService]
})

export class DetallesVideojuegoComponent implements OnInit {
  videojuego: Videojuego | null = null;
  cargando: boolean = false;
  error: string = '';

  constructor(private videojuegoService: VideojuegoService, private router: Router, private route: ActivatedRoute) {}

  /* Nos aseguramos de que se haga la consulta a la API cuando
  se cargue la vista */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.cargarVideojuego(id)
  }

  /* Metodo para cargar los datos de un videojuego en especifico */
  cargarVideojuego(id: number): void {
    this.cargando = true;
    this.videojuegoService.getVideojuegoById(id).subscribe({
      next: (data) => {
        this.videojuego = data;
        this.cargando = false;
      },
      error: (error) => {
        this.error = "Error al cargar el videojuego";
        this.cargando = false;
        console.error(this.error, error);
      }
    });
  }

  /* Metodo que redirige al formulario de edicion del videojuego */
  editarVideojuego(): void {
    if (this.videojuego) {
      this.router.navigate(['/editar-videojuego', this.videojuego.getId()]);
    }
  }

  /* Metodo que permite eliminar un videojuego */
  eliminarVideojuego(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar el videojuego?')) {
      this.videojuegoService.deleteVideojuego(id).subscribe({
        next: () => {
          alert('Videojuego eliminado correctamente');
          this.router.navigate(['/videojuegos']);
        },
        error: (error) => {
          this.error = "Error al eliminar el videojuego";
          console.error(this.error, error);
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['/videojuegos']);
  }
}
