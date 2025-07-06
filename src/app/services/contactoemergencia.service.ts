import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { ContactoEmergencia } from '../models/contactoemergencia';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AlertaSinContactoGravedadAltaDTO } from '../models/alertaSinContactoGravedadAltaDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ContactoemergenciaService {

  private url=`${base_url}/contactos`
  private listaCambio = new Subject<ContactoEmergencia[]>();
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<ContactoEmergencia[]>(`${this.url}`);
  }
  insert(c: ContactoEmergencia) {
    return this.http.post(this.url, c);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: ContactoEmergencia[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<ContactoEmergencia>(`${this.url}/${id}`)
  }
  update(c: ContactoEmergencia) {
    return this.http.put(this.url, c)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  searchname(nombre:string){
    const params={nombre:nombre}
    return this.http.get<ContactoEmergencia[]>(`${this.url}/busquedascontactos`,{params})
  }
  searchcorreo(correo:string){
    const params={correo:correo}
    return this.http.get<ContactoEmergencia[]>(`${this.url}/busquedascontactoscorreo`,{params})
  }
  getSinContacto(): Observable<AlertaSinContactoGravedadAltaDTO[]> {
      return this.http.get<AlertaSinContactoGravedadAltaDTO[]>(`${this.url}/riesgoaltasincontactos`);
  }
  
}
