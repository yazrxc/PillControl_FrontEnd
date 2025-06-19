import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrolusuarioComponent } from './listarrolusuario/listarrolusuario.component';

@Component({
  selector: 'app-rolusuario',
  imports: [RouterOutlet,ListarrolusuarioComponent],
  templateUrl: './rolusuario.component.html',
  styleUrl: './rolusuario.component.css'
})
export class RolusuarioComponent {
  constructor(public route:ActivatedRoute){}
}
