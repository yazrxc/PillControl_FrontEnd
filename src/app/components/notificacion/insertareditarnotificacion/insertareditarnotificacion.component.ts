import { Component, OnInit } from '@angular/core';
import { Notificacion } from '../../../models/notificacion';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DetalleReceta } from '../../../models/detallereceta';
import { NotificacionService } from '../../../services/notificacion.service';
import { DetallerecetaService } from '../../../services/detallereceta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditarnotificacion',
  imports: [
    ReactiveFormsModule, // para el FormGroup
    MatInputModule,
    MatFormFieldModule,
    CommonModule, // para ngIf, ngForm y ngModule
    MatRadioModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertareditarnotificacion.component.html',
  styleUrl: './insertareditarnotificacion.component.css'
})
export class InsertareditarnotificacionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  notificacion: Notificacion = new Notificacion();
  estadoNotificacion: boolean = true;

  edicion: boolean = false;
  id: number = 0;
  listaDetalleReceta: DetalleReceta[] = [];

  constructor(
    private nS: NotificacionService,
    private drS: DetallerecetaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.drS.list().subscribe(data => {
      // Solo detalles con receta válida
      this.listaDetalleReceta = data.filter(dr => dr.receta?.idReceta);
    });
  }

  init() {
    if (this.edicion) {
      this.nS.listId(this.id).subscribe(data => {
        console.log('Datos cargados para edición:', data);

        if (!data || !data.idNotificacion) {
          console.warn("No se pudo cargar la notificación correctamente.");
          return;
        }

        // Creamos el formulario con los datos cargados
        this.form = this.formBuilder.group({
          codigo: [data.idNotificacion, [Validators.required]],
          estado: [data.estadoNotificacion, [Validators.required]],
          mensaje: [data.mensajeNotificacion, [Validators.required]],
          detallereceta: [data.idDetalleReceta ?? null, [Validators.required]]
        });
      });
    } else {
      // Crear formulario vacío si es nuevo
      this.form = this.formBuilder.group({
        codigo: [''],  // vacío, no requerido en modo inserción
        estado: ['', [Validators.required]],
        mensaje: ['', [Validators.required]],
        detallereceta: ['', [Validators.required]]
      });
    }
  }

  aceptar() {
    if (this.form.valid) {
      const id = Number(this.form.value.codigo);
      console.log("Valor del campo código:", id);

      // Validación para modo edición
      if (this.edicion && (!id || isNaN(id) || id <= 0)) {
        console.warn('ID de notificación inválido en modo edición');
        return;
      }

      // Construimos el objeto notificación común para ambos casos
      this.notificacion.idNotificacion = this.edicion ? id : 0;
      this.notificacion.estadoNotificacion = this.form.value.estado;
      this.notificacion.mensajeNotificacion = this.form.value.mensaje;

      const idDR = this.form.value.detallereceta;
      if (!idDR) {
        console.warn("No se ha seleccionado un detalle de receta");
        return;
      }

      this.notificacion.idDetalleReceta = idDR;
      this.notificacion.detallereceta = { idDetalleReceta: idDR } as DetalleReceta;

      console.log('Notificación a enviar:', this.notificacion);

      if (this.edicion) {
        console.log("🔧 Enviando actualización con ID:", this.notificacion.idNotificacion);
        this.nS.update(this.notificacion).subscribe(() => {
          this.nS.list().subscribe(data => {
            this.nS.setList(data);
          });
          this.router.navigate(['notificaciones']);
        });
      }else {
        // Asegurar que la horaDetalleReceta sea enviada en formato correcto si existe
        //const horaDR = this.notificacion.detallereceta?.horaDetalleReceta;
          //if (horaDR && Object.prototype.toString.call(horaDR) === '[object Date]') {
            //(this.notificacion.detallereceta as any).horaDetalleReceta = (horaDR as Date).toTimeString().split(' ')[0];
        //}

        this.nS.insert(this.notificacion).subscribe(() => {
          this.nS.list().subscribe(data => {
            this.nS.setList(data);
          });
          this.router.navigate(['notificaciones']);
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['notificaciones']);
  }
}
