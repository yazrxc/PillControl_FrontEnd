import { Component } from '@angular/core';
import { ListarperfilsaludComponent } from "./listarperfilsalud/listarperfilsalud.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-perfilsalud',
  imports: [ListarperfilsaludComponent,RouterOutlet],
  templateUrl: './perfilsalud.component.html',
  styleUrl: './perfilsalud.component.css'
})
export class PerfilsaludComponent {
  constructor(public route:ActivatedRoute){}
}
