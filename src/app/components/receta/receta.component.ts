import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrecetaComponent } from "./listarreceta/listarreceta.component";

@Component({
  selector: 'app-receta',
  imports: [RouterOutlet, ListarrecetaComponent],
  templateUrl: './receta.component.html',
  styleUrl: './receta.component.css'
})
export class RecetaComponent {
 constructor(public route: ActivatedRoute) { }
}
