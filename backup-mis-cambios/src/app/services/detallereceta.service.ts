import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DetalleReceta } from '../models/detallereceta';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DetallerecetaService {
  private url=`${base_url}/detallesrecetas`
  private listaCambio = new Subject<DetalleReceta[]>();
  constructor(private http:HttpClient) { }

  list(){
      return this.http.get<DetalleReceta[]>(`${this.url}`);
    }
    insert(dr: DetalleReceta) {
      return this.http.post(this.url, dr);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva: DetalleReceta[]) {
      this.listaCambio.next(listaNueva);
    }
    listId(id: number) {
      return this.http.get<DetalleReceta>(`${this.url}/${id}`)
    }
    update(dr: DetalleReceta) {
      return this.http.put(this.url, dr)
    }
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.url}/${id}`);
      }
}
