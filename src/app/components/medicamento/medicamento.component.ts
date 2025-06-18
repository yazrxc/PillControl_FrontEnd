import { Component } from '@angular/core';
import { ListarmedicamentoComponent } from "./listarmedicamento/listarmedicamento.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-medicamento',
  imports: [ListarmedicamentoComponent,RouterOutlet],
  templateUrl: './medicamento.component.html',
  styleUrl: './medicamento.component.css'
})
export class MedicamentoComponent {
  constructor(public route:ActivatedRoute){}

}
