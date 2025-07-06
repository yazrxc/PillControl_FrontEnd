import { Medicamento } from "./medicamento";
import { Receta } from "./receta";

export class DetalleReceta {
    idDetalleReceta?: number = 0;
    dosisDetalleReceta?: number = 0;
    horaDetalleReceta?: string = '';
    intervaloDetalleReceta?: number = 0;
    frecuenciaDetalleReceta?: number = 0;

    // Llaves foraneas
    receta: Receta = new Receta();
    medicamento: Medicamento = new Medicamento();
}
