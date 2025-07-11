import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { PerfilSalud } from '../models/perfilsalud';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PerfilTimeDTO } from '../models/perfilTimeDTO';


const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PerfilsaludService {

  private url=`${base_url}/perfiles`
  private listaCambio = new Subject<PerfilSalud[]>();
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<PerfilSalud[]>(`${this.url}`);
  }
  insert(p: PerfilSalud) {
    return this.http.post(this.url, p);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: PerfilSalud[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<PerfilSalud>(`${this.url}/${id}`)
  }
  update(p: PerfilSalud) {
    return this.http.put(this.url, p)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  getPerfilTime(mes: number, anio: number): Observable<PerfilTimeDTO[]> {
    const params = { mes: mes, anio: anio };  // Mantenemos los parámetros como números
    return this.http.get<PerfilTimeDTO[]>(`${this.url}/timesperfiles`, { params });
  }
}
