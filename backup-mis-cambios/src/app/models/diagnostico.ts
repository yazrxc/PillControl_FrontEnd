import { Usuario } from "./usuario";

export class Diagnostico {
  idDiagnostico: number = 0;
  nombre: string = '';
  gravedad: string = '';
  fechaEmision: Date = new Date();
  descripcion: string = '';
  usuario : Usuario = new Usuario();
}