import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/* Utilizamos map de rxjs para poder mapear los datos que nos
devuelve la api y utilizarlos para instanciar un objeto Videojuego */
import { Observable, map } from 'rxjs';
import { Videojuego } from '../models/Videojuego';

@Injectable()
export class VideojuegoService {
	/* Url para conectarnos con la API simulada de beeceptor */
	private apiUrl = 'https://saperez-dwec06-1.free.beeceptor.com';
	private apiUrl2 = 'https://saperez-dwec06-2.free.beeceptor.com';

	constructor(private _http: HttpClient) { }

	/* Metodo para instanciar un Videojuego en funcion de los
	datos pasados como parametro */
	private mapToVideojuego(data: any): Videojuego {
		return new Videojuego (
			data.id,
			data.nombre,
			data.descripcion,
			data.precio,
			data.imagen,
			data.plataforma,
			data.estudio
		)
	}

	/* Consigue e instancia todos los Videojuegos de la API */
	getAllVideojuegos(): Observable<Videojuego[]> {
		return this._http.get<any>(this.apiUrl + '/videojuegos').pipe(
			map(response => {
				const videojuegosArray = response.videojuegos || [];
				return videojuegosArray.map((item: any) => this.mapToVideojuego(item));
			})
		);
	}

	/* Consigue e instancia un Videojuego de la API */
	getVideojuegoById(id: number): Observable<Videojuego> {
		let apiDin = '';
		if (id == 1) {
			apiDin = this.apiUrl;
		} else {
			apiDin = this.apiUrl2;
		}
		return this._http.get<Videojuego>(apiDin + '/videojuegos/' + id).pipe(
			map(data => this.mapToVideojuego(data))
		);
	}

	/* Actualiza un videojuego existente */
	updateVideojuego(videojuego: Videojuego): Observable<Videojuego> {
	return this._http.put<any>(`${this.apiUrl}/videojuegos/${videojuego.getId()}`, videojuego).pipe(
		map(response => {
			const videojuegoData = response.videojuego || response;
			return this.mapToVideojuego(videojuegoData);
			})
		);
	}

	/* Crea un nuevo videojuego */
	createVideojuego(videojuego: Videojuego): Observable<Videojuego> {
		return this._http.post<any>(this.apiUrl2 + '/videojuegos', videojuego).pipe(
			map(response => {
				const videojuegoData = response.videojuego || response;
				return this.mapToVideojuego(videojuegoData);
			})
		);
	}

	/* Elimina un videojuego existente */
	deleteVideojuego(id: number): Observable<void> {
		return this._http.delete<void>(this.apiUrl2 + '/videojuegos/' + id);
	}
}
