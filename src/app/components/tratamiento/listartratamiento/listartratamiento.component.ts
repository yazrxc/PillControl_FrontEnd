import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tratamiento } from '../../../models/tratamiento';
import { TratamientoService } from '../../../services/tratamiento.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listartratamiento',
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
  templateUrl: './listartratamiento.component.html',
  styleUrl: './listartratamiento.component.css',
})
export class ListartratamientoComponent implements OnInit {
  dataSource: MatTableDataSource<Tratamiento> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private tS: TratamientoService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filtro: string = '';
  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.tS.deleteA(id).subscribe((data) => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
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
