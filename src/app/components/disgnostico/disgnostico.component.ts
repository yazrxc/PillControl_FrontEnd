import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarediagnosticoComponent } from "./listarediagnostico/listarediagnostico.component";


@Component({
  selector: 'app-disgnostico',
  imports: [RouterOutlet, ListarediagnosticoComponent],
  templateUrl: './disgnostico.component.html',
  styleUrl: './disgnostico.component.css'
})

export class DisgnosticoComponent {
  constructor(public route: ActivatedRoute) { }


}
