import { Especialista } from "./especialista";
import { RolUsuario } from "./rolusuario";

export class Usuario {
    idUsuario: number = 0;
    username: string = '';
    password: string = '';
    enabled: boolean = false;
    nombre: string = '';
    edadUsuario: number = 0;
    correoUsuario: string = '';
    generoUsuario: string = '';
    telefonoUsuario: string = '';
    direccionUsuario: string = '';
    fechaRegistroUsuario: Date = new Date();
    especialista: Especialista = new Especialista();
}