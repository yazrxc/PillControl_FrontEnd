import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Especialista } from '../../../models/especialista';
import { EspecialistaService } from '../../../services/especialista.service';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listarespecialista',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatFormField,
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
  ],
  templateUrl: './listarespecialista.component.html',
  styleUrl: './listarespecialista.component.css',
})
export class ListarespecialistaComponent implements OnInit {
  dataSource: MatTableDataSource<Especialista> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private eS: EspecialistaService) {}
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filtro: string = '';

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.eS.deleteA(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  modoVisualizacion: 'lista' | 'tarjeta' = 'lista';

  cambiarVista() {
    this.modoVisualizacion =
      this.modoVisualizacion === 'lista' ? 'tarjeta' : 'lista';
  }

  aplicarFiltro() {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }
}
