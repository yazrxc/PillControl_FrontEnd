import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Medicamento } from '../../../models/medicamento';
import { MedicamentoService } from '../../../services/medicamento.service';

@Component({
  selector: 'app-listarmedicamento',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './listarmedicamento.component.html',
  styleUrl: './listarmedicamento.component.css'
})
export class ListarmedicamentoComponent implements OnInit{
  dataSource: MatTableDataSource<Medicamento> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8','c9','c10']

  constructor(private mS: MedicamentoService) { }

  ngOnInit(): void {
    this.mS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.mS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    
  }
  eliminar(id:number){
    this.mS.deleteA(id).subscribe(data=>{
      this.mS.list().subscribe(data=>{
        this.mS.setList(data)
      })
    })
  }

}
