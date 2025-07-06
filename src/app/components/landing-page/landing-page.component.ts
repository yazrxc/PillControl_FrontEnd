import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule, CommonModule, LoginComponent, RegistroComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(private route: ActivatedRoute) {}

  modal: 'login' | 'registro' | null = null;

  abrirModal(tipo: 'login' | 'registro') {
    this.modal = tipo;
  }

  cerrarModal() {
    this.modal = null;
  }
}
