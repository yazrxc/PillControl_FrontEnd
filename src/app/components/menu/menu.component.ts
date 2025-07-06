import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule,MatButtonModule,MatIconModule,RouterLink, MatSidenavModule, MatListModule, MatExpansionModule, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'

})
export class MenuComponent {
  mostrarMenuFlag = true;

  constructor() {
    // Aquí podrías agregar lógica para determinar si mostrar el menú o no
    // Por ejemplo, basándote en la ruta actual o en el estado de autenticación del usuario
  }

  mostrarMenu(): boolean {
    // Solo muestra el menú si NO estás en landing
    return this.mostrarMenuFlag;
  }

}
