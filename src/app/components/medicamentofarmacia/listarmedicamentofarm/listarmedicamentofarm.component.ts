import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MedicamentoFarmacia } from '../../../models/medicamentofarmcia';
import { MedicamentofarmaciaService } from '../../../services/medicamentofarmacia.service';

@Component({
  selector: 'app-listarmedicamentofarm',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarmedicamentofarm.component.html',
  styleUrl: './listarmedicamentofarm.component.css',
})
export class ListarmedicamentofarmComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<MedicamentoFarmacia> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8'];

  constructor(private mS: MedicamentofarmaciaService) { }

  ngOnInit(): void {
    this.mS.list().subscribe(data => {
      console.log('Datos recibidos del backend:', data);
      this.dataSource.data = data;
    })
    this.mS.getList().subscribe(data => {
      console.log('Datos del observable:', data);
      this.dataSource.data = data;
    })
    
  }
  eliminar(id:number){
    this.mS.deleteA(id).subscribe(data=>{
      this.mS.list().subscribe(data=>{
        this.mS.setList(data)
      })
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}

