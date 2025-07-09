import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { MedicamentoFarmacia } from '../models/medicamentofarmcia';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class MedicamentofarmaciaService {
  private url = `${base_url}/medicamentosfarmacias`;
  private listaCambio = new Subject<MedicamentoFarmacia[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<MedicamentoFarmacia[]>(`${this.url}/Listar`);
  }
  insert(mf: MedicamentoFarmacia) {
    return this.http.post(this.url, mf);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: MedicamentoFarmacia[]) {
    this.listaCambio.next(listaNueva);
  }
  update(mf: MedicamentoFarmacia) {
    return this.http.put(this.url, mf);
  }
  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<MedicamentoFarmacia>(`${this.url}/${id}`);
  }

  cantidadPorTipoVenta() {
    return this.http.get<any[]>(`${this.url}/cantidad-tipo-venta`);
  }

  medicamentosPorFarmacia() {
    return this.http.get<any[]>(`${this.url}/medicamento-farmacia`);
  }

  stockEconomico(minCantidad: number, maxPrecio: number) {
    return this.http.get<MedicamentoFarmacia[]>(
      `${this.url}/economico?minCantidad=${minCantidad}&maxPrecio=${maxPrecio}`
    );
  }
}
