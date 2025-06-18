import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Farmacia } from '../../../models/farmacia';
import { FarmaciaService } from '../../../services/farmacia.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-insertareditarfarmacia',
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
  templateUrl: './insertareditarfarmacia.component.html',
  styleUrl: './insertareditarfarmacia.component.css'
})
export class InsertareditarfarmaciaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  farmacia: Farmacia = new Farmacia();
  estado:boolean=true

  id:number = 0
  edicion:boolean=false

  constructor(
    private fS: FarmaciaService,
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
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      horaa: ['', Validators.required],
      horac: ['', Validators.required],
      longitud: ['', Validators.required],
      latitud: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.farmacia.idFarmacia= this.form.value.codigo;
      this.farmacia.nombreFarmacia = this.form.value.nombre;
      this.farmacia.direccionFarmacia = this.form.value.direccion;
      this.farmacia.telefonoFarmacia = this.form.value.telefono;
      this.farmacia.horarioAperturaFarmacia = this.form.value.horaa;
      this.farmacia.horarioCierreFarmacia = this.form.value.horac;
      this.farmacia.longitudFarmacia = this.form.value.longitud;
      this.farmacia.latitudFarmacia = this.form.value.latitud;
      if (this.edicion){
        //actualizar
        this.fS.update(this.farmacia).subscribe(() => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      }else{
        //insertar
        this.fS.insert(this.farmacia).subscribe(() => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      }
      this.router.navigate(['farmacias']);
    }
  }
  init(){
    if(this.edicion){
      this.fS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idFarmacia),
          nombre:new FormControl(data.nombreFarmacia),
          direccion:new FormControl(data.direccionFarmacia),
          telefono:new FormControl(data.telefonoFarmacia),
          horaa:new FormControl(data.horarioAperturaFarmacia),
          horac:new FormControl(data.horarioCierreFarmacia),
          longitud:new FormControl(data.longitudFarmacia),
          latitud:new FormControl(data.latitudFarmacia)
        })
      })
    }
  }

}
