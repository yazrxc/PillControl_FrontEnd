import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Diagnostico } from '../../../models/diagnostico';
import { Usuario } from '../../../models/usuario';
import { DisgnosticoService } from '../../../services/disgnostico.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarediagnostico',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './listarediagnostico.component.html',
  styleUrl: './listarediagnostico.component.css',
})
export class ListarediagnosticoComponent implements OnInit {
  dataSource: MatTableDataSource<Diagnostico> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private dS: DisgnosticoService) {}

  ngOnInit(): void {
    this.dS.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.dS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.dS.eliminar(id).subscribe((data) => {
      this.dS.listar().subscribe((data) => {
        this.dS.setList(data);
      });
    });
  }
}
