import { Component, OnInit } from '@angular/core';
import { DetalleReceta } from '../../../models/detallereceta';
import { DetallerecetaService } from '../../../services/detallereceta.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RecetaService } from '../../../services/receta.service';
import { MedicamentoService } from '../../../services/medicamento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Medicamento } from '../../../models/medicamento';
import { Receta } from '../../../models/receta';

@Component({
  selector: 'app-insertareditardetallereceta',
  imports: [
    ReactiveFormsModule, // para el FormGroup
    MatInputModule,
    MatFormFieldModule,
    CommonModule, // para ngIf, ngForm y ngModule
    MatRadioModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertareditardetallereceta.component.html',
  styleUrl: './insertareditardetallereceta.component.css'
})
export class InsertareditardetallerecetaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;

  listaMedicamento: Medicamento[] = [];
  listaReceta: Receta[] = [];

  constructor(
    private drS: DetallerecetaService,
    private rS: RecetaService,
    private mS: MedicamentoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  this.form = this.formBuilder.group({
    codigo: [''],
    dosis: ['', Validators.required],
    hora: ['', Validators.required],
    intervalo: ['', Validators.required],
    frecuencia: ['', Validators.required],
    medicamento: ['', Validators.required],
    receta: ['', Validators.required]
  });

  this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.edicion = this.id != null;
    if (this.edicion) {
      this.init(); // <<--- Aquí es donde realmente debe ir
    }
  });

  this.mS.list().subscribe(data => {
    this.listaMedicamento = data;
  });

  this.rS.listar().subscribe(data => {
    this.listaReceta = data;
  });
}

  aceptar() {
    if (this.form.valid) {
      const detalle = new DetalleReceta();
      detalle.idDetalleReceta = this.edicion ? this.id : 0;
      detalle.dosisDetalleReceta = this.form.value.dosis;
      detalle.intervaloDetalleReceta = this.form.value.intervalo;
      detalle.frecuenciaDetalleReceta = this.form.value.frecuencia;
      const horaString = this.form.value.hora;
        if (!horaString || typeof horaString !== 'string' || !/^\d{2}:\d{2}$/.test(horaString)) {
            console.warn("Hora inválida o no seleccionada");
            return;
        }

        // Convertimos de "HH:mm" a "HH:mm:ss"
        const horaConSegundos = horaString + ':00';
        detalle.horaDetalleReceta = horaConSegundos as any;

      // Asignar receta
      const receta = new Receta();
      receta.idReceta = this.form.value.receta;
      detalle.receta = receta;

      // Asignar medicamento
      const medicamento = new Medicamento();
      medicamento.id_medicamento = this.form.value.medicamento;
      detalle.medicamento = medicamento;

      console.log('Enviando detalle al backend:', detalle);

      if (this.edicion) {
        this.drS.update(detalle).subscribe(() => {
          this.drS.list().subscribe((data) => this.drS.setList(data));
        });
      } else {
        this.drS.insert(detalle).subscribe(() => {
          this.drS.list().subscribe((data) => this.drS.setList(data));
        });
      }

      this.router.navigate(['detallesrecetas']);
    }
  }

  init() {
  if (this.edicion) {
    this.drS.listId(this.id).subscribe(data => {
      this.form.patchValue({
        codigo: data.idDetalleReceta,
        dosis: data.dosisDetalleReceta,
        hora: data.horaDetalleReceta?.substring(0, 5), // convertir HH:mm:ss a HH:mm
        intervalo: data.intervaloDetalleReceta,
        frecuencia: data.frecuenciaDetalleReceta,
        medicamento: data.medicamento?.id_medicamento,
        receta: data.receta?.idReceta
      });
    });
  }
}
}
