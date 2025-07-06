import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MedicamentoFarmacia } from '../../../models/medicamentofarmcia';
import { MedicamentofarmaciaService } from '../../../services/medicamentofarmacia.service';

@Component({
  selector: 'app-listarmedicamentofarm',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './listarmedicamentofarm.component.html',
  styleUrl: './listarmedicamentofarm.component.css',
})
export class ListarmedicamentofarmComponent implements OnInit{
  dataSource: MatTableDataSource<MedicamentoFarmacia> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8']

  constructor(private mS: MedicamentofarmaciaService) { }

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

