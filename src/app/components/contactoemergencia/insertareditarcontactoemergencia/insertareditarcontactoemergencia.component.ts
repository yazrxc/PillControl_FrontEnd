import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../../../models/usuario';
import { ContactoEmergencia } from '../../../models/contactoemergencia';
import { ContactoemergenciaService } from '../../../services/contactoemergencia.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insertareditarcontactoemergencia',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertareditarcontactoemergencia.component.html',
  styleUrl: './insertareditarcontactoemergencia.component.css'
})
export class InsertareditarcontactoemergenciaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaUsuario:Usuario[]=[]
  contacto:ContactoEmergencia=new ContactoEmergencia()

  id:number = 0
  edicion:boolean=false;

  constructor(
    private cS: ContactoemergenciaService,
    private uS:UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null
      //actualizar
      this.init()
    })
    
    this.form = this.formBuilder.group({
      codigo:[''],
      nombre:['',Validators.required],
      parentesco:['',Validators.required],
      telefono:['',Validators.required],
      correo:['',Validators.required],
      user:['',Validators.required]
    })

    //data del otro componente
    this.uS.list().subscribe(data=>{
      this.listaUsuario=data
    })

  }

  aceptar(){
    if (this.form.valid){
      this.contacto.idContactoEmergencia=this.form.value.codigo
      this.contacto.nombre=this.form.value.nombre
      this.contacto.parentesco=this.form.value.parentesco
      this.contacto.telefono=this.form.value.telefono
      this.contacto.correo=this.form.value.correo
      this.contacto.usuario.idUsuario=this.form.value.user
      if (this.edicion){
        //actualizar
        this.cS.update(this.contacto).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }else{
        //insertar
        this.cS.insert(this.contacto).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
        this.router.navigate(['contactosemergencia']);
      }
      this.router.navigate(['contactosemergencia']);
    }
  }

  init(){
    if(this.edicion){
      this.cS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idContactoEmergencia),
          nombre:new FormControl(data.nombre),
          parentesco:new FormControl(data.parentesco),
          telefono:new FormControl(data.telefono),
          correo:new FormControl(data.correo),
          user:new FormControl(data.usuario.idUsuario)
        })
      })
    }
  }

}