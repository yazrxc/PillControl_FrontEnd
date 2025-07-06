import { Usuario } from "./usuario";

export class PerfilSalud {
    idPerfilSalud: number = 0;
    peso: number = 0;
    altura: number = 0;
    gruposanguineo: string = '';
    alergias: string = '';
    condiciones: string = '';
    // Relación uno a uno con Usuario
    usuario: Usuario = new Usuario(); 
}