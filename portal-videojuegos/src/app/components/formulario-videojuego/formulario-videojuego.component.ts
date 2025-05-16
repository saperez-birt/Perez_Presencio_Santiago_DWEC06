import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { VideojuegoService } from 'src/app/services/videojuego.service';
import { Videojuego } from 'src/app/models/Videojuego';

@Component({
  selector: 'app-formulario-videojuego',
  templateUrl: './formulario-videojuego.component.html',
  styleUrls: ['./formulario-videojuego.component.css'],
  providers: [VideojuegoService]
})

export class FormularioVideojuegoComponent implements OnInit {
  videojuegoForm!: FormGroup;
  isEditMode: boolean = false;
  cargando: boolean = false;
  error: string = '';
  submitted: boolean = false;
  videojuegoId: number | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private videojuegoService: VideojuegoService) {}

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.videojuegoId = Number(id);
      this.cargarVideojuego(this.videojuegoId);
    }
  }


  initForm(): void {
    this.videojuegoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      imagen: ['', [Validators.required]],
      plataforma: ['', [Validators.required]],
      estudio: ['', [Validators.required]]
    });
  }

  cargarVideojuego(id: number): void {
    this.cargando = true;
    this.videojuegoService.getVideojuegoById(id).subscribe({
      next: (videojuego) => {
        this.videojuegoForm.patchValue({
          nombre: videojuego.getNombre(),
          descripcion: videojuego.getDescripcion(),
          precio: videojuego.getPrecio(),
          imagen: videojuego.getImagen(),
          plataforma: videojuego.getPlataforma(),
          estudio: videojuego.getEstudio()
        });
        this.cargando = false;
      },
      error: (error) => {
        this.error = "Error al cargar el videojuego";
        this.cargando = false;
        console.error(this.error, error);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.videojuegoForm.invalid) {
      return;
    }

    const formValues = this.videojuegoForm.value;
    let videojuego: Videojuego;

    if (this.isEditMode && this.videojuegoId) {
      videojuego = new Videojuego(
        this.videojuegoId,
        formValues.nombre,
        formValues.descripcion,
        formValues.precio,
        formValues.imagen,
        formValues.plataforma,
        formValues.estudio
      );

      this.cargando = true;
      this.videojuegoService.updateVideojuego(videojuego).subscribe({
        next: (updatedVideojuego) => {
          this.cargando = false;
          this.router.navigate(['/videojuegos', updatedVideojuego.getId()]);
        },
        error: (error) => {
          this.error = "Error al actualizar el videojuego";
          this.cargando = false;
          console.error(this.error, error);
        }
      });
    } else {
      videojuego = new Videojuego(
        0,
        formValues.nombre,
        formValues.descripcion,
        formValues.precio,
        formValues.imagen,
        formValues.plataforma,
        formValues.estudio
      );

      this.cargando = true;
      this.videojuegoService.createVideojuego(videojuego).subscribe({
        next: (createdVideojuego) => {
          this.router.navigate(['/videojuegos', createdVideojuego.getId()]);
        },
        error: (error) => {
          this.error = "Error al crear el videojuego";
          this.cargando = false;
          console.error(this.error, error);
        }
      });
    }
  }

  get f() { return this.videojuegoForm.controls; }
}
