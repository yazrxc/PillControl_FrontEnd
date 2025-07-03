import { Farmacia } from "./farmacia"
import { Medicamento } from "./medicamento"

export class MedicamentoFarmacia{
    id:number=0
    cantidad:number=0
    tipoVenta:String=""
    laboratorio:String=""
    precio:Number=0
    medicamento: Medicamento = new Medicamento();
    farmacia: Farmacia = new Farmacia();
}