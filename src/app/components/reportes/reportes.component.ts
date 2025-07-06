import { Component } from '@angular/core';
import { ReportedonantespontencialesComponent } from "./reportedonantespontenciales/reportedonantespontenciales.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
  imports: [ReportedonantespontencialesComponent,RouterOutlet],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) { }
}
