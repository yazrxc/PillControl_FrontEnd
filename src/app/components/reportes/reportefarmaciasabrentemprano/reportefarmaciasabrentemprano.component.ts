import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FarmaciaService } from '../../../services/farmacia.service';

@Component({
  selector: 'app-reportefarmaciasabrentemprano',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reportefarmaciasabrentemprano.component.html',
  styleUrl: './reportefarmaciasabrentemprano.component.css'
})
export class ReportefarmaciasabrentempranoComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalRegistros: number = 0;
  notResults: boolean = false;
  form: FormGroup;

  displayedColumns: string[] = ['c1', 'c2', 'c3']

  constructor(
    private fS: FarmaciaService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      horaApertura: ['08:00', [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]]
    });
  }

  ngOnInit(): void {
    this.buscarFarmacias();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  buscarFarmacias(): void {
    if (this.form.valid) {
      const horaApertura = this.form.value.horaApertura;
      
      this.fS.farmaciasAbreTemprano(horaApertura).subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
          this.totalRegistros = data.length;
          this.notResults = data.length === 0;
          this.dataSource.paginator = this.paginator;
        }
      );
    }
  }
}
