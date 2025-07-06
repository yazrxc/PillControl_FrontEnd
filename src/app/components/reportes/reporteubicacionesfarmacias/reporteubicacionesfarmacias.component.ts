import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FarmaciaService } from '../../../services/farmacia.service';

@Component({
  selector: 'app-reporteubicacionesfarmacias',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './reporteubicacionesfarmacias.component.html',
  styleUrl: './reporteubicacionesfarmacias.component.css'
})
export class ReporteubicacionesfarmaciaasComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalRegistros: number = 0;
  notResults: boolean = false

  displayedColumns: string[] = ['c1', 'c2', 'c3']

  constructor(private fS: FarmaciaService) { }

  ngOnInit(): void {
    this.fS.ubicacionesFarmacias().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.totalRegistros = data.length;
        this.notResults = data.length === 0;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
