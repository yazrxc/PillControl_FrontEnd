import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RecetaService } from '../../../services/receta.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Receta } from '../../../models/receta';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Usuario } from '../../../models/usuario';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-recetasvencidas',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: './recetasvencidas.component.html',
  styleUrl: './recetasvencidas.component.css',
})
export class RecetasvencidasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  dataSource: MatTableDataSource<Receta> = new MatTableDataSource();

  totalRegistros: number = 0;

  listaUsuarios: Usuario[] = [];

  filtroForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: RecetaService, private uS: UsuarioService) {
    this.filtroForm = new FormGroup({
      usuarioId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.buscarPorUsuario(0);

    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    // Escuchar cambios en filtros
    this.filtroForm.get('usuarioId')?.valueChanges.subscribe((id) => {
      if (id) this.buscarPorUsuario(id);
      else this.buscarPorUsuario(0);
    });
  }

  buscarPorUsuario(id: number) {
    this.rS.recetasVencidas(id).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.totalRegistros = data.length;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
