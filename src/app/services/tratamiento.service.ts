import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Tratamiento } from '../models/tratamiento';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class TratamientoService {
  private url = `${base_url}/tratamientos`;
  private listaCambio = new Subject<Tratamiento[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Tratamiento[]>(`${this.url}`);
  }
  insert(t: Tratamiento) {
    return this.http.post(this.url, t);
  }
  getList() {
    return this.listaCambio.asObservable(); //patron
  }
  setList(listaNueva: Tratamiento[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<Tratamiento>(`${this.url}/${id}`);
  }
  update(t: Tratamiento) {
    return this.http.put(this.url, t);
  }
  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  tratamientosPorUsuario(id: number) {
    return this.http.get<Tratamiento[]>(`${this.url}/tratamientosusuario?idUsuario=${id}`);
  }
}
