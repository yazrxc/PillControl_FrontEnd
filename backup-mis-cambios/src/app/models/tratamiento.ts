import { Diagnostico } from "./diagnostico";
import { Usuario } from "./usuario";

export class Tratamiento {
    idtratamiento: number = 0;
    indicacionesTratamiento: string = '';
    objetivoTratamiento: string = '';
    estadoTratamiento: string = '';
    usuario: Usuario = new Usuario();
    diagnostico: Diagnostico = new Diagnostico();
}