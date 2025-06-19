import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { RolUsuario } from '../models/rolusuario';
import { Subject } from 'rxjs';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RolusuarioService {
  private url=`${base_url}/roles`
  private listaCambio = new Subject<RolUsuario[]>();
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<RolUsuario[]>(`${this.url}`);
  }
  insert(r: RolUsuario) {
    return this.http.post(this.url, r);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: RolUsuario[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<RolUsuario>(`${this.url}/${id}`)
  }
  update(r: RolUsuario) {
    return this.http.put(this.url, r)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  } 
  
}
