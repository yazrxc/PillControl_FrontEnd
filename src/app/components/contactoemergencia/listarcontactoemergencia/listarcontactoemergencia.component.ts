import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ContactoEmergencia } from '../../../models/contactoemergencia';
import { ContactoemergenciaService } from '../../../services/contactoemergencia.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarcontactoemergencia',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './listarcontactoemergencia.component.html',
  styleUrl: './listarcontactoemergencia.component.css'
})
export class ListarcontactoemergenciaComponent implements OnInit , AfterViewInit{
  dataSource: MatTableDataSource<ContactoEmergencia> = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Correctamente asignamos el paginator
  totalRegistros: number = 0;

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8']

  constructor(private cS: ContactoemergenciaService) { }

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.totalRegistros = data.length;
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
  ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  }
  eliminar(id:number){
    this.cS.deleteA(id).subscribe(data=>{
      this.cS.list().subscribe(data=>{
        this.cS.setList(data)
        this.totalRegistros = data.length;
        this.dataSource.paginator = this.paginator;
      })
    })
  }
}
