import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MedicamentoFarmacia } from '../../../models/medicamentofarmcia';
import { MedicamentofarmaciaService } from '../../../services/medicamentofarmacia.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Medicamento } from '../../../models/medicamento';
import { Farmacia } from '../../../models/farmacia';
import { MedicamentoService } from '../../../services/medicamento.service';
import { FarmaciaService } from '../../../services/farmacia.service';

@Component({
  selector: 'app-insertareditarmedicamentofarm',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertareditarmedicamentofarm.component.html',
  styleUrl: './insertareditarmedicamentofarm.component.css',
})
export class InsertareditarmedicamentofarmComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  medicamentofarm: MedicamentoFarmacia = new MedicamentoFarmacia();
  estado: boolean = true;
  listaMedicamentos: Medicamento[] = [];
  listaFarmacias: Farmacia[] = [];

  constructor(
    private mS: MedicamentofarmaciaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private meS: MedicamentoService,
    private fS: FarmaciaService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idmedicamentoFarmacia: [''],
      cantidadMedicamentoFarmacia: ['', Validators.required],
      tipoVentaMedicamentoFarmacia: ['', Validators.required],
      laboratorioMedicamentoFarmacia: ['', Validators.required],
      precioMedicamentoFarmacia: ['', Validators.required],
      medicamento: ['', Validators.required],
      farmacia: ['', Validators.required],
    });
    this.meS.list().subscribe((data) => {
      this.listaMedicamentos = data;
    });
    this.fS.list().subscribe((data) => {
      this.listaFarmacias = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      const formValue = this.form.value;

      // Asegurar que los objetos anidados existan
      this.medicamentofarm = {
        idmedicamentoFarmacia: formValue.idmedicamentoFarmacia,
        cantidadMedicamentoFarmacia: formValue.cantidadMedicamentoFarmacia,
        tipoVentaMedicamentoFarmacia: formValue.tipoVentaMedicamentoFarmacia,
        laboratorioMedicamentoFarmacia:
          formValue.laboratorioMedicamentoFarmacia,
        precioMedicamentoFarmacia: formValue.precioMedicamentoFarmacia,
        medicamento: { id_medicamento: formValue.medicamento } as Medicamento,
        farmacia: { idFarmacia: formValue.farmacia } as Farmacia,
      };

      this.mS.insert(this.medicamentofarm).subscribe(() => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
        this.router.navigate(['medicamentosfarmacia']);
      });
    }
  }
}
