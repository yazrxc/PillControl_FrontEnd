import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PerfilSalud } from '../../../models/perfilsalud';
import { PerfilsaludService } from '../../../services/perfilsalud.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarperfilsalud',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './listarperfilsalud.component.html',
  styleUrl: './listarperfilsalud.component.css'
})
export class ListarperfilsaludComponent implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<PerfilSalud> = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Correctamente asignamos el paginator
  notResults:boolean=false

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8','c9']
  totalRegistros: number = 0;

  constructor(private pS: PerfilsaludService) { }

  ngOnInit(): void {
    this.pS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.totalRegistros = data.length;
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
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