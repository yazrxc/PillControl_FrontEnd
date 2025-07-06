import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/usuario';
import { PerfilSalud } from '../../../models/perfilsalud';
import { PerfilsaludService } from '../../../services/perfilsalud.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-insertareditarperfilsalud',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertareditarperfilsalud.component.html',
  styleUrl: './insertareditarperfilsalud.component.css'
})
export class InsertareditarperfilsaludComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaUsuario:Usuario[]=[]
  perfil:PerfilSalud=new PerfilSalud()

  id:number = 0
  edicion:boolean=false;

  constructor(
    private pS: PerfilsaludService,
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
      codigo:['',Validators.required],
      peso:['',Validators.required],
      altura:['',Validators.required],
      grupo:['',Validators.required],
      alergia:['',Validators.required],
      condiciones:['',Validators.required],
      user:['',Validators.required]
    })

    //data del otro componente
    this.uS.list().subscribe(data=>{
      this.listaUsuario=data
    })

  }

  aceptar(){
    if (this.form.valid){
      this.perfil.idPerfilSalud=this.form.value.codigo
      this.perfil.peso=this.form.value.peso
      this.perfil.altura=this.form.value.altura
      this.perfil.gruposanguineo=this.form.value.grupo
      this.perfil.alergias=this.form.value.alergia
      this.perfil.condiciones=this.form.value.condiciones
      this.perfil.usuario.idUsuario=this.form.value.user
      if (this.edicion){
        //actualizar
        this.pS.update(this.perfil).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }else{
        //insertar
        this.pS.insert(this.perfil).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      this.router.navigate(['perfilessalud']);
    }
  }

  init(){
    if(this.edicion){
      this.pS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idPerfilSalud),
          peso:new FormControl(data.peso),
          altura:new FormControl(data.altura),
          grupo:new FormControl(data.gruposanguineo),
          alergia:new FormControl(data.alergias),
          condiciones:new FormControl(data.condiciones),
          user:new FormControl(data.usuario.nombre)
        })
      })
    }
  }

}
