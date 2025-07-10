import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule,MatButtonModule,MatIconModule,RouterLink, MatSidenavModule, MatListModule, MatExpansionModule,MatMenuModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'

})
export class MenuComponent implements OnInit {
  role: string = '';  // Almacena el rol del usuario
  mostrarMenuFlag = true;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.verificar();  // Llama a verificar cuando se inicializa el componente
  }

  // Método para verificar si el usuario está autenticado y obtener el rol
  verificar() {
    this.role = this.loginService.showRole();  // Obtén el rol desde el servicio
    return this.loginService.verificar();  // Verifica si el usuario está autenticado
  }

  // Método para verificar si el rol es ADMIN
  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  // Método para verificar si el rol es PACIENTE
  isPaciente(): boolean {
    return this.role === 'PACIENTE';
  }

  // Cerrar sesión y limpiar el sessionStorage
  cerrar() {
    sessionStorage.clear();
  }

  // Lógica para mostrar el menú solo si el usuario está autenticado
  mostrarMenu(): boolean {
    return this.verificar();
  }
  

}
