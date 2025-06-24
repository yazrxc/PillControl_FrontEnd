import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ContactoEmergencia } from '../../../models/contactoemergencia';
import { ContactoemergenciaService } from '../../../services/contactoemergencia.service';
import { MatPaginatorModule } from '@angular/material/paginator';

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
export class ListarcontactoemergenciaComponent implements OnInit {
  dataSource: MatTableDataSource<ContactoEmergencia> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8']

  constructor(private cS: ContactoemergenciaService) { }

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    });
    this.cS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
  eliminar(id:number){
    this.cS.deleteA(id).subscribe(data=>{
      this.cS.list().subscribe(data=>{
        this.cS.setList(data)
      })
    })
  }
}
