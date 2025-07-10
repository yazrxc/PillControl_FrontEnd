import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatInput,
  MatInputModule,
} from '@angular/material/input';
import { Tratamiento } from '../../../models/tratamiento';
import { TratamientoService } from '../../../services/tratamiento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Diagnostico } from '../../../models/diagnostico';
import { DisgnosticoService } from '../../../services/disgnostico.service';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-insertareditartratamiento',
  imports: [
    MatInputModule,
    MatInput,
    CommonModule,
    MatFormField,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './insertareditartratamiento.component.html',
  styleUrl: './insertareditartratamiento.component.css',
})
export class InsertareditartratamientoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tratamiento: Tratamiento = new Tratamiento();
  listaDiagnosticos: Diagnostico[] = [];
  listaUsuarios: Usuario[]= [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private tS: TratamientoService,
    private router: Router,
    private route: ActivatedRoute,
    private dS: DisgnosticoService,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      indicaciones: ['', Validators.required],
      objetivo: ['', Validators.required],
      estado: ['', Validators.required],
      diagnostico: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.dS.listar().subscribe((data) => {
      this.listaDiagnosticos = data;
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.tratamiento.idtratamiento = this.form.value.codigo;
      this.tratamiento.indicacionesTratamiento = this.form.value.indicaciones;
      this.tratamiento.objetivoTratamiento = this.form.value.objetivo;
      this.tratamiento.estadoTratamiento = this.form.value.estado;
      this.tratamiento.diagnostico.idDiagnostico = this.form.value.diagnostico;
      this.tratamiento.usuario.idUsuario = this.form.value.usuario;
      if (this.edicion) {
        this.tS.update(this.tratamiento).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
            console.log('Tratamiento actualizado correctamente');
          });
        });
      } else {
        this.tS.insert(this.tratamiento).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
            console.log('Tratamiento registrado correctamente');
          });
        });
      }
      this.router.navigate(['tratamientos']);
    }
  }

  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.tratamiento = data;
        this.form = new FormGroup({
          codigo: new FormControl(data.idtratamiento),
          indicaciones: new FormControl(data.indicacionesTratamiento),
          objetivo: new FormControl(data.objetivoTratamiento),
          estado: new FormControl(data.estadoTratamiento),
          diagnostico: new FormControl(data.diagnostico.idDiagnostico),
          usuario: new FormControl(data.usuario?.idUsuario),
        });
      });
    }
  }
}
