import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MedicamentoFarmacia } from '../../../models/medicamentofarmcia';
import { MedicamentofarmaciaService } from '../../../services/medicamentofarmacia.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
export class InsertareditarmedicamentofarmComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  medicamentofarm: MedicamentoFarmacia = new MedicamentoFarmacia();
  estado:boolean=true

  id:number = 0
  edicion:boolean=false

  constructor(
    private mS: MedicamentofarmaciaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null
    })
    this.form = this.formBuilder.group({
      id:[''],
      cantidad: ['', Validators.required],
      tipoVenta: ['', Validators.required],
      laboratorio: ['', Validators.required],
      precio: ['', Validators.required],
      medicamento: ['', Validators.required],
      farmacia: ['', Validators.required]
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.medicamentofarm.id= this.form.value.id;
      this.medicamentofarm.cantidad = this.form.value.cantidad;
      this.medicamentofarm.tipoVenta = this.form.value.tipoVenta;
      this.medicamentofarm.laboratorio = this.form.value.laboratorio;
      this.medicamentofarm.precio = this.form.value.precio;
      this.medicamentofarm.medicamento = this.form.value.medicamento;
      this.medicamentofarm.farmacia = this.form.value.farmacia;
      if (this.edicion){
        //actualizar
        this.mS.update(this.medicamentofarm).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }else{
        //insertar
        this.mS.insert(this.medicamentofarm).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      this.router.navigate(['medicamentosfarmacia']);
    }
  }
}
