//import { Injectable } from '@angular/core';
import { DetalleReceta } from "./detallereceta";

export class Notificacion {
    idNotificacion: number = 0;
    estadoNotificacion: boolean = false;
    mensajeNotificacion: string = '';
    nombreUsuario: string = '';
    idDetalleReceta: number = 0;
    nombreMedicamento: string = '';

    // Llaves foraneas
    detallereceta: DetalleReceta = new DetalleReceta();
}
