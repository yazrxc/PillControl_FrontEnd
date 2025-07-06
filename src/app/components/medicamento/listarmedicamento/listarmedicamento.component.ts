import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Medicamento } from '../../../models/medicamento';
import { MedicamentoService } from '../../../services/medicamento.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarmedicamento',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
    // Importar buscar
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './listarmedicamento.component.html',
  styleUrl: './listarmedicamento.component.css',
})
export class ListarmedicamentoComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Medicamento> = new MatTableDataSource();

  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'c9',
    'c10',
  ];

  totalRegistros: number = 0;

  notResults: boolean = false;

  private _snackBar = inject(MatSnackBar);

  form: FormGroup;

  nombreBusqueda: string = '';

  presentacionBusqueda: string = '';

  listaOG: Medicamento[] = [];

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  // para paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mS: MedicamentoService, private fb: FormBuilder) {
    this.form = fb.group({
      nombreBusqueda: [''],
      presentacionBusqueda: [''],
    });
  }

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.listaOG = data;
      this.dataSource = new MatTableDataSource(data);
      this.totalRegistros = data.length;
      this.dataSource.paginator = this.paginator;
    });
    
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    // Suscripción a los cambios en nombreBusqueda
    this.form.get('nombreBusqueda')?.valueChanges.subscribe((value) => {
      this.nombreBusqueda = value;
      this.aplicarFiltros();
    });

    // Suscripción a los cambios en presentacionBusqueda
    this.form.get('presentacionBusqueda')?.valueChanges.subscribe((value) => {
      this.presentacionBusqueda = value;
      this.aplicarFiltros();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Aplicamos ambos filtros
  aplicarFiltros() {
    let resultadosFiltrados = [...this.listaOG]; // Hacemos una copia para evitar la modificación directa

    // Filtrar por nombre (insensible a mayúsculas/minúsculas)
    if (this.nombreBusqueda.trim()) {
      const nombreLower = this.nombreBusqueda.trim().toLowerCase();
      resultadosFiltrados = resultadosFiltrados.filter((item) =>
        item.nombre ? item.nombre.toLowerCase().includes(nombreLower) : false
      );
    }

    // Filtrar por presentacion (insensible a mayúsculas/minúsculas)
    if (this.presentacionBusqueda.trim()) {
      const presentacionLower = this.presentacionBusqueda.trim().toLowerCase();
      resultadosFiltrados = resultadosFiltrados.filter((item) =>
        item.presentacion
          ? item.presentacion.toLowerCase().includes(presentacionLower)
          : false
      );
    }

    // Actualizamos la fuente de datos con los resultados filtrados
    this.dataSource = new MatTableDataSource(resultadosFiltrados);
    this.totalRegistros = resultadosFiltrados.length;
    this.notResults = resultadosFiltrados.length === 0;

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.mS.deleteA(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
        this.totalRegistros = data.length;
        this.dataSource.paginator = this.paginator;
        this.openSnackBar('Medicamento eliminado correctamente', 'Cerrar');
      });
    });
  }
}
