import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ContactoEmergencia } from '../../../models/contactoemergencia';
import { ContactoemergenciaService } from '../../../services/contactoemergencia.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarcontactoemergencia',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
    // Importing buscar
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './listarcontactoemergencia.component.html',
  styleUrl: './listarcontactoemergencia.component.css'
})
export class ListarcontactoemergenciaComponent implements OnInit , AfterViewInit{
  dataSource: MatTableDataSource<ContactoEmergencia> = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Correctamente asignamos el paginator
  totalRegistros: number = 0;
  private _snackBar = inject(MatSnackBar);
  notResults:boolean=false
  form:FormGroup
  nombreBusqueda:string=""
  correoBusqueda: string = "";
  contactosOriginales: ContactoEmergencia[] = [];  // Guardamos los contactos originales

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8']
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  constructor(private cS: ContactoemergenciaService, private fb:FormBuilder) {
    this.form=fb.group({
      nombreBusqueda: [''],
      correoBusqueda: ['']
    })
   }

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.contactosOriginales = data;
      this.dataSource = new MatTableDataSource(data)
      this.totalRegistros = data.length;
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    // Suscripción a los cambios en nombreBusqueda
    this.form.get('nombreBusqueda')?.valueChanges.subscribe(value => {
      this.nombreBusqueda = value;
      this.aplicarFiltros();
    });

    // Suscripción a los cambios en correoBusqueda
    this.form.get('correoBusqueda')?.valueChanges.subscribe(value => {
      this.correoBusqueda = value;
      this.aplicarFiltros();
    });
  }
  ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  }

     // Aplicamos ambos filtros (por nombre y por correo)
  aplicarFiltros() {
    let resultadosFiltrados = [...this.contactosOriginales]; // Hacemos una copia para evitar la modificación directa

    // Filtrar por nombre (insensible a mayúsculas/minúsculas)
    if (this.nombreBusqueda.trim()) {
      const nombreLower = this.nombreBusqueda.trim().toLowerCase();
      resultadosFiltrados = resultadosFiltrados.filter((item) =>
        item.nombre ? item.nombre.toLowerCase().includes(nombreLower) : false
      );
    }

    // Filtrar por correo (insensible a mayúsculas/minúsculas)
    if (this.correoBusqueda.trim()) {
      const correoLower = this.correoBusqueda.trim().toLowerCase();
      resultadosFiltrados = resultadosFiltrados.filter((item) =>
        item.correo ? item.correo.toLowerCase().includes(correoLower) : false
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
  eliminar(id:number){
    this.cS.deleteA(id).subscribe(data=>{
      this.cS.list().subscribe(data=>{
        this.cS.setList(data)
        this.totalRegistros = data.length;
        this.dataSource.paginator = this.paginator;
        this.openSnackBar('Amigo Imaginario eliminado correctamente', 'Cerrar')
      })
    })
  }
}
