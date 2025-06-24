import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tratamiento } from '../../../models/tratamiento';
import { TratamientoService } from '../../../services/tratamiento.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-listartratamiento',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './listartratamiento.component.html',
  styleUrl: './listartratamiento.component.css',
})
export class ListartratamientoComponent implements OnInit {
  dataSource: MatTableDataSource<Tratamiento> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private tS: TratamientoService) {}

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.tS.deleteA(id).subscribe((data) => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
      });
    });
  }
}
