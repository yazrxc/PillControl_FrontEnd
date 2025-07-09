import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-detalleusuario',
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './detalleusuario.component.html',
  styleUrl: './detalleusuario.component.css',
})
export class DetalleusuarioComponent {
  usuario?: Usuario;

  constructor(
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.uS.listId(id).subscribe((u) => (this.usuario = u));
  }

  obtenerImagenProducto(): string {
    const id = this.usuario?.idUsuario;
    return id ? `assets/users/${id}.jpg` : 'assets/img/default.jpg';
  }

  volver() {
    this.router.navigate(['/usuarios']);
  }
}
