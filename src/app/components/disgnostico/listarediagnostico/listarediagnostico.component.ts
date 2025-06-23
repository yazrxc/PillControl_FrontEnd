import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Diagnostico } from '../../../models/diagnostico';
import { DisgnosticoService } from '../../../services/disgnostico.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listarediagnostico',
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './listarediagnostico.component.html',
  styleUrl: './listarediagnostico.component.css',
})
export class ListarediagnosticoComponent implements OnInit {
  dataSource : MatTableDataSource<Diagnostico> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private dS: DisgnosticoService) { }

  ngOnInit(): void {
    this.dS.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

        this.dS.listar().subscribe(data => { 
      this.dataSource = new MatTableDataSource(data)
    })
  }
}
