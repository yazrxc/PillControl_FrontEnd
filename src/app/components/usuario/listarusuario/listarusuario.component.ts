import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarusuario',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    
  ],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5']

  constructor(private uS: UsuarioService) { }

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    });
    this.uS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
  eliminar(id:number){
    this.uS.deleteA(id).subscribe(data=>{
      this.uS.list().subscribe(data=>{
        this.uS.setList(data)
      })
    })
  }
}


