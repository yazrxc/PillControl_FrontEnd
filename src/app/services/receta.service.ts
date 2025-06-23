import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
import { Receta } from '../models/receta';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  private url = `${base_url}/recetas`;

  private listaCambio = new Subject<Receta[]>();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Receta[]>(this.url);
  }

  insertar(r: Receta) {
    return this.http.post(this.url, r);
  }

  getList() {
    // para actualizar automático (looks like)
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Receta[]) {
    this.listaCambio.next(listaNueva);
  }

  listarID(id: number) {
    return this.http.get<Receta>(`${this.url}/${id}`);
  }

  modificar(r: Receta) {
    return this.http.put(this.url, r);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
