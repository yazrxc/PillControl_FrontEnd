import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Diagnostico } from '../models/diagnostico';


// url base
const url_base = environment.base

@Injectable({
  providedIn: 'root'
})

export class DisgnosticoService {
  private url = `${url_base}/diagnosticos`

  constructor(private h: HttpClient) { }

  listar(){
    return this.h.get<Diagnostico[]>(this.url);
  }

  insertar(d: Diagnostico){
    return this.h.post(this.url, d);
  }

  
}
