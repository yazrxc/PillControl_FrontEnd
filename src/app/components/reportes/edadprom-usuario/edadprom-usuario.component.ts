import { Component, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { Especialista } from '../../../models/especialista';
import { UsuarioService } from '../../../services/usuario.service';
import { EspecialistaService } from '../../../services/especialista.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edadprom-usuario',
  imports: [MatFormField, MatSelectModule, MatIconModule, CommonModule],
  templateUrl: './edadprom-usuario.component.html',
  styleUrl: './edadprom-usuario.component.css'
})
export class EdadpromUsuarioComponent implements OnInit {
  idEspecialista: number | null = null;
  edadPromedio: number | null = null;
  listaEspecialistas: Especialista[] = [];

  constructor(
    private uS: UsuarioService,
    private eS: EspecialistaService,
  ) {}

  ngOnInit(): void {
    this.cargarEspecialistas();
  }

  cargarEspecialistas(): void {
    this.eS.getList().subscribe({
      next: (data) => (this.listaEspecialistas = data),
      error: (err) => console.error('Error al cargar especialistas', err)
    });
  }

  obtenerEdadPromedio(): void {
    if (this.idEspecialista != null) {
      this.uS.edadpromedioporEspecialista(this.idEspecialista).subscribe({
        next: (edad) => (this.edadPromedio = edad),
        error: (err) => console.error('Error al obtener edad promedio', err)
      });
    }
  }
}
