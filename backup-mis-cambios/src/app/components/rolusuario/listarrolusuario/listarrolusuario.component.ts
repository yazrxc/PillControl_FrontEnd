import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RolUsuario } from '../../../models/rolusuario';
import { RolusuarioService } from '../../../services/rolusuario.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarrolusuario',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './listarrolusuario.component.html',
  styleUrl: './listarrolusuario.component.css'
})
export class ListarrolusuarioComponent implements OnInit {
  dataSource: MatTableDataSource<RolUsuario> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8']

  constructor(private rS: RolusuarioService) { }

  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    });
    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
  eliminar(id:number){
    this.rS.deleteA(id).subscribe(data=>{
      this.rS.list().subscribe(data=>{
        this.rS.setList(data)
      })
    })
  }
}

