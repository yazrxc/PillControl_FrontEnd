import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Receta } from '../../../models/receta';
import { RecetaService } from '../../../services/receta.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarreceta',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './listarreceta.component.html',
  styleUrl: './listarreceta.component.css'
})
export class ListarrecetaComponent implements OnInit {
  dataSource: MatTableDataSource<Receta> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private rS: RecetaService) {}

  ngOnInit(): void {
    this.rS.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.rS.eliminar(id).subscribe((data) => {
      this.rS.listar().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}