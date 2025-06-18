import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Farmacia } from '../../../models/farmacia';
import { FarmaciaService } from '../../../services/farmacia.service';

@Component({
  selector: 'app-listarfarmacia',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule],
  templateUrl: './listarfarmacia.component.html',
  styleUrl: './listarfarmacia.component.css'
})
export class ListarfarmaciaComponent implements OnInit{
  dataSource: MatTableDataSource<Farmacia> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10']

  constructor(private fS: FarmaciaService) { }

  ngOnInit(): void {
    this.fS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.fS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    
  }
  eliminar(id:number){
    this.fS.deleteA(id).subscribe(data=>{
      this.fS.list().subscribe(data=>{
        this.fS.setList(data)
      })
    })
  }

}
