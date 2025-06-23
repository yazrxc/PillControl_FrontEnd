import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisgnosticoService } from '../../../services/disgnostico.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Diagnostico } from '../../../models/diagnostico';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-insertareditardiagnostico',
    providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule, // para el FormGroup
    MatInputModule,
    MatFormFieldModule,
    CommonModule, // para ngIf, ngForm y ngModule
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertareditardiagnostico.component.html',
  styleUrl: './insertareditardiagnostico.component.css',
})
export class InsertareditardiagnosticoComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  diagnostico: Diagnostico = new Diagnostico();

  edicion: boolean = false;

  id: number = 0;

  estado: boolean = true

    listaUsuarios: Usuario[] = [];

  nivel: { value: string; viewValue: string }[] = [
    { value: "Alta", viewValue: "Alta" },  
    { value: "Moderada", viewValue: "Moderada" },
    { value: "Leve", viewValue: "Leve" }
  ]

  constructor(
    private dS: DisgnosticoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS : UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']; 
      this.edicion = data['id'] != null; 
      
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      grav: ['', Validators.required],
      fechaEm: ['', Validators.required],
      descrip: ['', Validators.required],
      u: ['', Validators.required],
    });

        this.uS.list().subscribe(data => { // 
      this.listaUsuarios = data;
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.diagnostico.idDiagnostico = this.form.value.codigo;
      this.diagnostico.nombre = this.form.value.name; 
      this.diagnostico.gravedad = this.form.value.grav;
      this.diagnostico.fechaEmision = this.form.value.fechaEm;
      this.diagnostico.descripcion = this.form.value.descrip;
      this.diagnostico.usuario = this.form.value.u;

      if (this.edicion) {
        this.dS.modificar(this.diagnostico).subscribe(() => {
          this.dS.listar().subscribe((data) => {
            this.dS.setList(data);
          });
        });
        this.router.navigate(['diagnosticos']);
      }
      else {
        this.dS.insertar(this.diagnostico).subscribe(() => {
          this.dS.listar().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      }
      this.router.navigate(['diagnosticos']);
    }
  }

  init() { 
    if (this.edicion) { 
      this.dS.listarID(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.idDiagnostico),
          name: new FormControl(data.nombre),
          grav: new FormControl(data.gravedad),
          fechaEm: new FormControl(data.fechaEmision),
          descrip: new FormControl(data.descripcion),
          u: new FormControl(data.usuario)
        })
      })
    }
  }
}
