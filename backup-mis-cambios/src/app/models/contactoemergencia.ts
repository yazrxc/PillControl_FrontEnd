import { Usuario } from "./usuario";

export class ContactoEmergencia {
    idContactoEmergencia: number = 0;
    nombre: string = '';
    parentesco: string = '';
    telefono: string = '';
    correo: string = '';
    // Relación muchos a uno con Usuario
    usuario: Usuario = new Usuario();  // Un contacto de emergencia pertenece a un usuario
}