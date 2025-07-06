import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Receta } from '../../../models/receta';
import { Usuario } from '../../../models/usuario';
import { Diagnostico } from '../../../models/diagnostico';
import { DisgnosticoService } from '../../../services/disgnostico.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { RecetaService } from '../../../services/receta.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertareditarreceta',
    providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule, // para el FormGroup
    MatInputModule,
    MatFormFieldModule,
    CommonModule, // para ngIf, ngForm y ngModule
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertareditarreceta.component.html',
  styleUrl: './insertareditarreceta.component.css',
})
export class InsertareditarrecetaComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  receta: Receta = new Receta();

  edicion: boolean = false;

  id: number = 0;

  estado: boolean = true;

  listaUsuarios: Usuario[] = [];
  listaDiagnosticos: Diagnostico[] = [];

  constructor(
    private rS: RecetaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private dS: DisgnosticoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;

      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      fechainic: ['', Validators.required],
      fechafin: ['', Validators.required],
      observ: ['', Validators.required],
      usua: ['', Validators.required],
      diagn: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      //
      this.listaUsuarios = data;
    });

    this.dS.listar().subscribe((data) => {
      //
      this.listaDiagnosticos = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.receta.idReceta = this.form.value.id;
      this.receta.fechaInicioReceta = this.form.value.fechainic;
      this.receta.fechaFinReceta = this.form.value.observ;
      this.receta.observacionesReceta = this.form.value.observ;
      this.receta.usuario = this.form.value.usua;
      this.receta.diagnostico = this.form.value.diagn;

      if (this.edicion) {
        this.rS.modificar(this.receta).subscribe(() => {
          this.rS.listar().subscribe((data) => {
            this.rS.setList(data);
          });
        });
        this.router.navigate(['recetas']);
      } else {
        this.rS.insertar(this.receta).subscribe(() => {
          this.rS.listar().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['recetas']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listarID(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.idReceta),
          fechainic: new FormControl(data.fechaInicioReceta),
          fechafin: new FormControl(data.fechaFinReceta),
          observ: new FormControl(data.observacionesReceta),
          usua: new FormControl(data.usuario),
          diagn: new FormControl(data.diagnostico),
        });
      });
    }
  }
}
