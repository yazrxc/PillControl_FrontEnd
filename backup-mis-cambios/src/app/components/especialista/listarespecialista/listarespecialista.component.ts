import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Especialista } from '../../../models/especialista';
import { EspecialistaService } from '../../../services/especialista.service';

@Component({
  selector: 'app-listarespecialista',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule],
  templateUrl: './listarespecialista.component.html',
  styleUrl: './listarespecialista.component.css'
})
export class ListarespecialistaComponent implements OnInit{
  dataSource: MatTableDataSource<Especialista> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8']

  constructor(private eS: EspecialistaService) { }

  ngOnInit(): void {
    this.eS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.eS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    
  }
  eliminar(id:number){
    this.eS.deleteA(id).subscribe(data=>{
      this.eS.list().subscribe(data=>{
        this.eS.setList(data)
      })
    })
  }

}
