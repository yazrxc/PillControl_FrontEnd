import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
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
export class InsertareditarfarmaciaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  farmacia: Farmacia = new Farmacia();
  estado: boolean = true;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private fS: FarmaciaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern('.*\\S.*')
        ]
      ],
      direccion: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.pattern('.*\\S.*')
        ]
      ],
      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{9}$')
        ]
      ],
      horaa: ['', Validators.required],
      horac: ['', Validators.required],
      longitud: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[-+]?(1[0-7][0-9]|[1-9]?[0-9]|180)(\.[0-9]+)?$/),
          Validators.min(-180),
          Validators.max(180)
        ]
      ],
      latitud: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[-+]?[0-9]{1,2}(\.[0-9]+)?$/),
          Validators.min(-90),
          Validators.max(90)
        ]
      ]
    });
  }

  aceptar() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.farmacia.idFarmacia = this.form.value.codigo;
    this.farmacia.nombreFarmacia = this.form.value.nombre;
    this.farmacia.direccionFarmacia = this.form.value.direccion;
    this.farmacia.telefonoFarmacia = this.form.value.telefono;
    this.farmacia.horarioAperturaFarmacia = this.form.value.horaa;
    this.farmacia.horarioCierreFarmacia = this.form.value.horac;
    this.farmacia.longitudFarmacia = this.form.value.longitud;
    this.farmacia.latitudFarmacia = this.form.value.latitud;

    if (this.edicion) {
      this.fS.update(this.farmacia).subscribe(() => {
        this.fS.list().subscribe((data) => {
          this.fS.setList(data);
        });
      });
    } else {
      this.fS.insert(this.farmacia).subscribe(() => {
        this.fS.list().subscribe((data) => {
          this.fS.setList(data);
        });
      });
    }
    this.router.navigate(['farmacias']);
  }

  init() {
    if (this.edicion) {
      this.fS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: [data.idFarmacia],
          nombre: [
            data.nombreFarmacia,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(50),
              Validators.pattern('.*\\S.*')
            ]
          ],
          direccion: [
            data.direccionFarmacia,
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(100),
              Validators.pattern('.*\\S.*')
            ]
          ],
          telefono: [
            data.telefonoFarmacia,
            [
              Validators.required,
              Validators.pattern('^[0-9]{9}$')
            ]
          ],
          horaa: [data.horarioAperturaFarmacia, Validators.required],
          horac: [data.horarioCierreFarmacia, Validators.required],
          longitud: [
            data.longitudFarmacia,
            [
              Validators.required,
              Validators.pattern(/^[-+]?(1[0-7][0-9]|[1-9]?[0-9]|180)(\.[0-9]+)?$/),
              Validators.min(-180),
              Validators.max(180)
            ]
          ],
          latitud: [
            data.latitudFarmacia,
            [
              Validators.required,
              Validators.pattern(/^[-+]?[0-9]{1,2}(\.[0-9]+)?$/),
              Validators.min(-90),
              Validators.max(90)
            ]
          ]
        });
      });
    }
  }
}