import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
import { Especialista } from '../models/especialista';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {
  private url = `${base_url}/especialistas`;
  private listaCambio = new Subject<Especialista[]>();
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Especialista[]>(this.url);
  }

  insert(e: Especialista) {
    return this.http.post(this.url, e);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Especialista[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<Especialista>(`${this.url}/${id}`)
  }
  update(e: Especialista) {
    return this.http.put(this.url, e)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

}
