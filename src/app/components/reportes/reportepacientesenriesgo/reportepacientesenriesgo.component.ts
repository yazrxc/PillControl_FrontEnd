import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { AlertaSinContactoGravedadAltaDTO } from '../../../models/alertaSinContactoGravedadAltaDTO';
import { ContactoemergenciaService } from '../../../services/contactoemergencia.service';

@Component({
  selector: 'app-reportepacientesenriesgo',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './reportepacientesenriesgo.component.html',
  styleUrl: './reportepacientesenriesgo.component.css'
})
export class ReportepacientesenriesgoComponent implements OnInit , AfterViewInit{
  dataSource: MatTableDataSource<AlertaSinContactoGravedadAltaDTO> = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Correctamente asignamos el paginator
  totalRegistros: number = 0;
  notResults:boolean=false

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8','c9']

 constructor(private cS: ContactoemergenciaService) { }

  ngOnInit(): void {
    
    this.cS.getSinContacto().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.totalRegistros = data.length;
      this.dataSource.paginator = this.paginator;
    });
  } 
  ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  }
}

