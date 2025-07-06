import { Farmacia } from "./farmacia"
import { Medicamento } from "./medicamento"

export class MedicamentoFarmacia{
    idmedicamentoFarmacia:number=0
    cantidadMedicamentoFarmacia:number=0
    tipoVentaMedicamentoFarmacia:String=""
    precioMedicamentoFarmacia:number=0
    laboratorioMedicamentoFarmacia:String=""
    medicamento: Medicamento = new Medicamento();
    farmacia: Farmacia = new Farmacia();
}