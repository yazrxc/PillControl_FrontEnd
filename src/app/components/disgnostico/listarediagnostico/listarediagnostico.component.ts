import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Diagnostico } from '../../../models/diagnostico';
import { DisgnosticoService } from '../../../services/disgnostico.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listarediagnostico',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: './listarediagnostico.component.html',
  styleUrl: './listarediagnostico.component.css',
})
export class ListarediagnosticoComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Diagnostico> = new MatTableDataSource();

  totalRegistros: number = 0;

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  listaUsuarios: Usuario[] = []; // lista para el <mat-select>

  filtroForm: FormGroup;

  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dS: DisgnosticoService,
    private uS: UsuarioService,
    private fb: FormBuilder
  ) {
    this.filtroForm = this.fb.group({
      usuario: [0],
      fechaInicio: [null],
    });
  }

  ngOnInit(): void {
    this.cargarDiagnosticos();

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  // sin esto no funciona el paginador
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarDiagnosticos(): void {
    this.dS.listar().subscribe((data) => {
      this.dataSource.data = data;
      this.totalRegistros = data.length;
      this.dataSource.paginator = this.paginator;
      // paginator, length, etc.
    });
  }

  eliminar(id: number) {
    this.dS.eliminar(id).subscribe((data) => {
      this.dS.listar().subscribe((data) => {
        this.dS.setList(data);
        this.totalRegistros = data.length;
        this.dataSource.paginator = this.paginator;
        this.openSnackBar('Diagnóstico eliminado correctamente', 'Cerrar');
      });
    });
  }

  aplicarFiltros() {
    const { usuario, fechaInicio } = this.filtroForm.value;

    if (usuario && usuario !== 0) {
      this.dS.buscarPorUsuario(usuario).subscribe((data) => {
        this.dataSource.data = data;
      });
    } else if (fechaInicio) {
      this.dS.buscarPorFecha(fechaInicio).subscribe((data) => {
        this.dataSource.data = data;
      });
    } else {
      this.cargarDiagnosticos(); // sin filtros
    }
  }

  limpiarFiltros() {
    this.filtroForm.reset({
      usuario: 0,
      fechaInicio: null,
    });
    this.cargarDiagnosticos();
  }
}
