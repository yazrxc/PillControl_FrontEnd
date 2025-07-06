import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Diagnostico } from '../models/diagnostico';
import { Subject } from 'rxjs';

// url base
const url_base = environment.base;

@Injectable({
  providedIn: 'root',
})
export class DisgnosticoService {
  private url = `${url_base}/diagnosticos`;

  private listaCambio = new Subject<Diagnostico[]>();

  constructor(private h: HttpClient) {}

  listar() {
    return this.h.get<Diagnostico[]>(this.url);
  }

  insertar(d: Diagnostico) {
    return this.h.post(this.url, d);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Diagnostico[]) {
    this.listaCambio.next(listaNueva);
  }

  listarID(id: number) {
    return this.h.get<Diagnostico>(`${this.url}/${id}`);
  }

  modificar(a: Diagnostico) {
    return this.h.put(this.url, a);
  }

  eliminar(id: number) {
    return this.h.delete(`${this.url}/${id}`);
  }

  buscarPorUsuario(idUsuario: number) {
    return this.h.get<Diagnostico[]>(`${this.url}/busquedas`, {
      params: { idUsuario },
    });
  }

  buscarPorFecha(fecha: string) {
    return this.h.get<Diagnostico[]>(`${this.url}/fechas`, {
      params: { fecha },
    });
  }
}
