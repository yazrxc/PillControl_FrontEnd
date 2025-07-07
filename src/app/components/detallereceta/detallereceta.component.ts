import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardetallerecetaComponent } from './listardetallereceta/listardetallereceta.component';

@Component({
  selector: 'app-detallereceta',
  imports: [ListardetallerecetaComponent, RouterOutlet],
  templateUrl: './detallereceta.component.html',
  styleUrl: './detallereceta.component.css'
})

export class DetallerecetaComponent {
constructor(public route:ActivatedRoute) {}
}
