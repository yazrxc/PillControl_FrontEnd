import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tratamiento } from '../../../models/tratamiento';
import { Usuario } from '../../../models/usuario';
import { RecetaService } from '../../../services/receta.service';
import { UsuarioService } from '../../../services/usuario.service';
import { TratamientoService } from '../../../services/tratamiento.service';

@Component({
  selector: 'app-tratamiento-usuario',
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
  templateUrl: './tratamiento-usuario.component.html',
  styleUrl: './tratamiento-usuario.component.css',
})
export class TratamientoUsuarioComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  dataSource: MatTableDataSource<Tratamiento> = new MatTableDataSource();

  listaUsuarios: Usuario[] = [];

  filtroForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tS: TratamientoService, private uS: UsuarioService) {
    this.filtroForm = new FormGroup({
      usuarioId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.buscarPorUsuario(0);

    this.tS.list().subscribe((data) => {
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
    this.tS.tratamientosPorUsuario(id).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
