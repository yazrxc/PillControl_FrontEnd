import { Component } from '@angular/core';
import { ListarespecialistaComponent } from "./listarespecialista/listarespecialista.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-especialista',
  imports: [ListarespecialistaComponent,RouterOutlet],
  templateUrl: './especialista.component.html',
  styleUrl: './especialista.component.css'
})
export class EspecialistaComponent {
  constructor(public route:ActivatedRoute){}
}
