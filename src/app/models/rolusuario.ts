import { Usuario } from "./usuario";

export class RolUsuario {
    idrol: number = 0;
    tiporol: string = '';
    descripcion: string = '';
    user?: Usuario;
}