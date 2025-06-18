import { Component } from '@angular/core';
import { ListarfarmaciaComponent } from "./listarfarmacia/listarfarmacia.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-farmacia',
  imports: [ListarfarmaciaComponent,RouterOutlet],
  templateUrl: './farmacia.component.html',
  styleUrl: './farmacia.component.css'
})
export class FarmaciaComponent {
  constructor(public route:ActivatedRoute){}
}
