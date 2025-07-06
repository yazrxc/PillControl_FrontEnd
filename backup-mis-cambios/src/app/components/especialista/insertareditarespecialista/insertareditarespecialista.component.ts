import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { Especialista } from '../../../models/especialista';
import { EspecialistaService } from '../../../services/especialista.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-insertareditarespecialista',
  providers: [],
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
  templateUrl: './insertareditarespecialista.component.html',
  styleUrl: './insertareditarespecialista.component.css'
})
export class InsertareditarespecialistaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  especialista: Especialista = new Especialista();
  estado:boolean=true

  id:number = 0
  edicion:boolean=false

  constructor(
    private eS: EspecialistaService,
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
      especialidad: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      institucion: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.especialista.idEspecialista= this.form.value.codigo;
      this.especialista.nombreEspecialista = this.form.value.nombre;
      this.especialista.especialidadEspecialista = this.form.value.especialidad;
      this.especialista.telefonoEspecialista = this.form.value.telefono;
      this.especialista.correoEspecialista = this.form.value.correo;
      this.especialista.institucionEspecialista = this.form.value.institucion;
      if (this.edicion){
        //actualizar
        this.eS.update(this.especialista).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }else{
        //insertar
        this.eS.insert(this.especialista).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }
      this.router.navigate(['especialistas']);
    }
  }
  init(){
    if(this.edicion){
      this.eS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idEspecialista),
          nombre:new FormControl(data.nombreEspecialista),
          especialidad:new FormControl(data.especialidadEspecialista),
          telefono:new FormControl(data.telefonoEspecialista),
          correo:new FormControl(data.correoEspecialista),
          institucion:new FormControl(data.institucionEspecialista)
        })
      })
    }
  }

}

