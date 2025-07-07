import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Notificacion } from '../models/notificacion';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private url = `${base_url}/notificaciones`;
  private listaCambio = new Subject<Notificacion[]>();
  constructor(private http:HttpClient) { }

  list(){
      return this.http.get<Notificacion[]>(`${this.url}`);
    }
    insert(n: Notificacion) {
      return this.http.post(this.url, n);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva: Notificacion[]) {
      this.listaCambio.next(listaNueva);
    }
    listId(id: number) {
      return this.http.get<Notificacion>(`${this.url}/${id}`)
    }
    update(n: Notificacion) {
      return this.http.put(`${this.url}/${n.idNotificacion}`, n);
    }
    delete(id:number){
      return this.http.delete(`${this.url}/${id}`)
    }
    getUrl(): string {
      return this.url;
    }
    getResumenEstados() {
      return this.http.get<{ cumplidas: number; noCumplidas: number }>(
      `${this.url}/notificaciones/estado`
      );
    }
}
