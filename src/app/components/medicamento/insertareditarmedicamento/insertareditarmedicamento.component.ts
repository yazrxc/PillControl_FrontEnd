import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Medicamento } from '../../../models/medicamento';
import { MedicamentoService } from '../../../services/medicamento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insertareditarmedicamento',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertareditarmedicamento.component.html',
  styleUrl: './insertareditarmedicamento.component.css'
})
export class InsertareditarmedicamentoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  medicamento: Medicamento = new Medicamento();
  estado:boolean=true

  id:number = 0
  edicion:boolean=false

  constructor(
    private mS: MedicamentoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null
      //actualizar
      this.init()
    })
    this.form = this.formBuilder.group({
      codigo:[''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      dosis: ['', Validators.required],
      unidad: ['', Validators.required],
      tipo: ['', Validators.required],
      presentacion: ['', Validators.required],
      contenido: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.medicamento.id_medicamento= this.form.value.codigo;
      this.medicamento.nombre = this.form.value.nombre;
      this.medicamento.descripcion = this.form.value.descripcion;
      this.medicamento.dosis = this.form.value.dosis;
      this.medicamento.unidad_medida = this.form.value.unidad;
      this.medicamento.tipo_medicamento = this.form.value.tipo;
      this.medicamento.presentacion = this.form.value.presentacion;
      this.medicamento.contenido = this.form.value.contenido;
      if (this.edicion){
        //actualizar
        this.mS.update(this.medicamento).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }else{
        //insertar
        this.mS.insert(this.medicamento).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      this.router.navigate(['medicamentos']);
    }
  }
  init(){
    if(this.edicion){
      this.mS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.id_medicamento),
          nombre:new FormControl(data.nombre),
          descripcion:new FormControl(data.descripcion),
          dosis:new FormControl(data.dosis),
          unidad:new FormControl(data.unidad_medida),
          tipo:new FormControl(data.tipo_medicamento),
          presentacion:new FormControl(data.presentacion),
          contenido:new FormControl(data.contenido)
        })
      })
    }
  }
}
