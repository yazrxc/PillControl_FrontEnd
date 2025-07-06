import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Medicamento } from '../models/medicamento';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private url = `${base_url}/medicamentos`;
  private listaCambio = new Subject<Medicamento[]>();
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Medicamento[]>(this.url);
  }
  insert(m: Medicamento) {
    return this.http.post(this.url, m);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Medicamento[]) {
    this.listaCambio.next(listaNueva);
  }
  
  listId(id: number) {
    return this.http.get<Medicamento>(`${this.url}/${id}`)
  }
  update(m: Medicamento) {
    return this.http.put(this.url, m)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  // búsquedas
    searchname(nombre:string){
      const params={n:nombre} // en back : @RequestParam String n
      return this.http.get<Medicamento[]>(`${this.url}/busqueda-nombres`,{params})
    }
    searchpresentaciones(pres:string){
      const params={n:pres}
      return this.http.get<Medicamento[]>(`${this.url}/busquedas-presentaciones`,{params})
    }
}
