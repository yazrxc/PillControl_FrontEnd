import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Farmacia } from '../models/farmacia';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {
  private url = `${base_url}/farmacias`;
  private listaCambio = new Subject<Farmacia[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Farmacia[]>(this.url);
  }
  insert(f: Farmacia) {
    return this.http.post(this.url, f);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Farmacia[]) {
    this.listaCambio.next(listaNueva);
  }
  
  listId(id: number) {
    return this.http.get<Farmacia>(`${this.url}/${id}`)
  }
  update(f: Farmacia) {
    return this.http.put(this.url, f)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  // Queries del parcial
  farmaciasAbreTemprano(horaApertura: string) {
    return this.http.get<any[]>(`${this.url}/farmacias-abren-temprano?horaApertura=${horaApertura}`);
  }

  ubicacionesFarmacias() {
    return this.http.get<any[]>(`${this.url}/ubicaciones`);
  }

  // Métodos adicionales que tienes en el backend
  buscarPorNombre(nombre: string) {
    return this.http.get<Farmacia[]>(`${this.url}/buscar/${nombre}`);
  }

  verificarHorario(id: number) {
    return this.http.get<boolean>(`${this.url}/verificar-horario/${id}`);
  }
}
