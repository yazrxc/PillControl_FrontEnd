import { Component } from '@angular/core';
import { ListarcontactoemergenciaComponent } from "./listarcontactoemergencia/listarcontactoemergencia.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contactoemergencia',
  imports: [ListarcontactoemergenciaComponent,RouterOutlet],
  templateUrl: './contactoemergencia.component.html',
  styleUrl: './contactoemergencia.component.css'
})
export class ContactoemergenciaComponent {
  constructor(public route:ActivatedRoute){}
}
