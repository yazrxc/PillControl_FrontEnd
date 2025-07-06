import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PerfilSalud } from '../../../models/perfilsalud';
import { PerfilsaludService } from '../../../services/perfilsalud.service';
import { MatPaginatorModule } from '@angular/material/paginator';

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
export class ListarperfilsaludComponent implements OnInit {
  dataSource: MatTableDataSource<PerfilSalud> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8','c9']

  constructor(private pS: PerfilsaludService) { }

  ngOnInit(): void {
    this.pS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    });
    this.pS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
  eliminar(id:number){
    this.pS.deleteA(id).subscribe(data=>{
      this.pS.list().subscribe(data=>{
        this.pS.setList(data)
      })
    })
  }
}