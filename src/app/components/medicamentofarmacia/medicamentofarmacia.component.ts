import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmedicamentofarmComponent } from './listarmedicamentofarm/listarmedicamentofarm.component';

@Component({
  selector: 'app-medicamentofarmacia',
  imports: [ListarmedicamentofarmComponent, RouterOutlet],
  templateUrl: './medicamentofarmacia.component.html',
  styleUrl: './medicamentofarmacia.component.css'
})
export class MedicamentofarmaciaComponent {
  constructor( public route:ActivatedRoute){}
}
