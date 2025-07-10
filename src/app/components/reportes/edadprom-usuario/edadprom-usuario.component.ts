import { Component, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Especialista } from '../../../models/especialista';
import { UsuarioService } from '../../../services/usuario.service';
import { EspecialistaService } from '../../../services/especialista.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-edadprom-usuario',
  imports: [
    MatFormField,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    FormsModule,
    NgChartsModule,
  ],
  templateUrl: './edadprom-usuario.component.html',
  styleUrl: './edadprom-usuario.component.css',
})
export class EdadpromUsuarioComponent implements OnInit{
  listaEspecialistas: Especialista[] = [];
  id: number = 0;
  edadPromedio: number | null = null;

  chartLabels: string[] = ['Edad Promedio'];
  chartData: number[] = [];

  constructor(private uS: UsuarioService, private eS: EspecialistaService) {}

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.listaEspecialistas = data;
    });
  }
  obtenerEdadPromedio(): void {
    this.uS
      .edadpromedioporEspecialista(this.id)
      .subscribe((resp) => {
        this.edadPromedio = resp;
        this.chartData = [resp];
      });
  }
}
