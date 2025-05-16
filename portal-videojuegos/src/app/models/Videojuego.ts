export class Videojuego {
    public id : number;
    public nombre : string;
    public descripcion : string;
    public precio : number;
    public imagen : string;
    public plataforma : string;
    public estudio : string;

    /* Constructor */
    constructor(id : number, nombre : string, descripcion : string, precio : number, imagen : string, plataforma : string, estudio : string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.plataforma = plataforma;
        this.estudio = estudio;
    }

    /* Getters y Setters */
    public getId() : number {
        return this.id;
    }

    public setId(id : number) : void {
        this.id = id;
    }

    public getNombre() : string {
        return this.nombre;
    }

    public setNombre(nombre : string) : void {
        this.nombre = nombre;
    }

    public getDescripcion() : string {
        return this.descripcion;
    }

    public setDescripcion(descripcion : string) : void {
        this.descripcion = descripcion;
    }

    public getPrecio() : number {
        return this.precio;
    }

    public setPrecio(precio : number) : void {
        this.precio = precio;
    }

    public getImagen() : string {
        return this.imagen;
    }

    public setImagen(imagen : string) : void {
        this.imagen = imagen;
    }

    public getPlataforma() : string {
        return this.plataforma;
    }

    public setPlataforma(plataforma : string) : void {
        this.plataforma = plataforma;
    }

    public getEstudio() : string {
        return this.estudio;
    }

    public setEstudio(estudio : string) : void {
        this.estudio = estudio;
    }
}