import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Receta } from '../../../models/receta';
import { RecetaService } from '../../../services/receta.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuarioService } from '../../../services/usuario.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-listarreceta',
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
  templateUrl: './listarreceta.component.html',
  styleUrl: './listarreceta.component.css',
})
export class ListarrecetaComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Receta> = new MatTableDataSource();

  totalRegistros: number = 0;

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  listaUsuarios: Usuario[] = [];

  filtroForm: FormGroup;

  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: RecetaService, private uS: UsuarioService) {
    this.filtroForm = new FormGroup({
      usuarioId: new FormControl(''),
      fechaInicio: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.obtenerRecetas();

    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    // Escuchar cambios en filtros
    this.filtroForm.get('usuarioId')?.valueChanges.subscribe((id) => {
      if (id) this.buscarPorUsuario(id);
      else this.obtenerRecetas();
    });

    this.filtroForm
      .get('fechaInicio')
      ?.valueChanges.subscribe((fecha: Date) => {
        if (fecha) {
          const isoFecha = fecha.toISOString().split('T')[0]; // yyyy-mm-dd
          this.buscarPorFechaInicio(isoFecha);
        } else {
          this.obtenerRecetas();
        }
      });
  }

  // sin esto no funciona el paginador
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerRecetas() {
    this.rS.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.totalRegistros = data.length;
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.rS.eliminar(id).subscribe((data) => {
      this.rS.listar().subscribe((data) => {
        this.rS.setList(data);
        this.totalRegistros = data.length;
        this.dataSource.paginator = this.paginator;
        this.openSnackBar('Receta eliminada correctamente', 'Cerrar');
      });
    });
  }

  buscarPorUsuario(id: number) {
    this.rS.buscarPorUsuario(id).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.totalRegistros = data.length;
      this.dataSource.paginator = this.paginator;
    });
  }

  buscarPorFechaInicio(fecha: string) {
    this.rS.buscarPorFechaInicio(fecha).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.totalRegistros = data.length;
      this.dataSource.paginator = this.paginator;
    });
  }
}
