import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { Especialista } from '../../../models/especialista';
import { EspecialistaService } from '../../../services/especialista.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertareditarusuario',
  providers: [provideNativeDateAdapter()],
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
  templateUrl: './insertareditarusuario.component.html',
  styleUrl: './insertareditarusuario.component.css',
})
export class InsertareditarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  listaEspecialistas: Especialista[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private eS: EspecialistaService
  ) {}

  id: number = 0;
  edicion: boolean = false;
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      user: ['', Validators.required],
      contraseña: ['', Validators.required],
      nombre: ['', Validators.required],
      estado: ['', Validators.required],
      edad: ['', Validators.required],
      correo: ['', Validators.required],
      genero: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      fecha: ['', Validators.required],
      especialista: ['', Validators.required],
    });
    this.eS.list().subscribe((data) => {
      this.listaEspecialistas = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.codigo;
      this.usuario.username = this.form.value.user;
      this.usuario.password = this.form.value.contraseña;
      this.usuario.enabled = this.form.value.estado;
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.edadUsuario = this.form.value.edad;
      this.usuario.correoUsuario = this.form.value.correo;
      this.usuario.generoUsuario = this.form.value.genero;
      this.usuario.telefonoUsuario = this.form.value.telefono;
      this.usuario.direccionUsuario = this.form.value.direccion;
      this.usuario.fechaRegistroUsuario = this.form.value.fecha;
      this.usuario.especialista = this.form.value.especialista;
      if (this.edicion) {
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
            console.log('Usuario actualizado correctamente');
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
            console.log('Usuario registrado correctamente');
          });
        });
      }
      this.router.navigate(['usuarios']);
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.usuario = data;
        this.form = new FormGroup({
          nombre: new FormControl(data.nombre),
          user: new FormControl(data.username),
          contraseña: new FormControl(data.password),
          estado: new FormControl(data.enabled),
          edad: new FormControl(data.edadUsuario),
          correo: new FormControl(data.correoUsuario),
          genero: new FormControl(data.generoUsuario),
          telefono: new FormControl(data.telefonoUsuario),
          direccion: new FormControl(data.direccionUsuario),
          fecha: new FormControl(data.fechaRegistroUsuario),
          especialista: new FormControl(data.especialista),
        });
      });
    }
  }
}
