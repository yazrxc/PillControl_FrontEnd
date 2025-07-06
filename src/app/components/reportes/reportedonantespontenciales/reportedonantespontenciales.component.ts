import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PerfilTimeDTO } from '../../../models/perfiltimedto';
import { PerfilsaludService } from '../../../services/perfilsalud.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reportedonantespontenciales',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
    // Importing buscar
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './reportedonantespontenciales.component.html',
  styleUrl: './reportedonantespontenciales.component.css'
})
export class ReportedonantespontencialesComponent implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<PerfilTimeDTO> = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Correctamente asignamos el paginator
  notResults:boolean=false

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8']
  totalRegistros: number = 0;
  // Parametros mes y año
  mes: number = 0;
  anio: number = 0;

  constructor(private pS: PerfilsaludService) { }

  ngOnInit(): void {
    
    this.buscarPorMesYAnio();
  }

  buscarPorMesYAnio(): void {
    if (this.mes && this.anio) {
      this.pS.getPerfilTime(this.mes, this.anio).subscribe(data => {
        if (data && data.length > 0) {
          this.dataSource = new MatTableDataSource(data);
          this.totalRegistros = data.length;
          this.notResults = false;
        } else {
          this.notResults = true;
          this.totalRegistros = 0;
        }
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}
  eliminar(id:number){
    this.pS.deleteA(id).subscribe(data=>{
      this.pS.list().subscribe(data=>{
        this.pS.setList(data)
        this.totalRegistros = data.length;
        this.dataSource.paginator = this.paginator;
      })
    })
  }
}