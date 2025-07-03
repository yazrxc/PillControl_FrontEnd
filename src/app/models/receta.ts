import { Diagnostico } from './diagnostico';
import { Usuario } from './usuario';

export class Receta {
  idReceta: number = 0;
  fechaInicioReceta: Date = new Date();
  fechaFinReceta: Date = new Date();
  observacionesReceta: string = '';

  // fks
  usuario: Usuario = new Usuario();
  diagnostico: Diagnostico = new Diagnostico();
}
