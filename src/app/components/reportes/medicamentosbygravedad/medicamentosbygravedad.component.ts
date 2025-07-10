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
import { Usuario } from '../../../models/usuario';
import { DetallerecetaService } from '../../../services/detallereceta.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MedicamentoByGravedad } from '../../../models/medicamentobygravedad';

@Component({
  selector: 'app-medicamentosbygravedad',
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
  templateUrl: './medicamentosbygravedad.component.html',
  styleUrl: './medicamentosbygravedad.component.css',
})
export class MedicamentosbygravedadComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3'];

  dataSource: MatTableDataSource<MedicamentoByGravedad> =
    new MatTableDataSource();

  totalRegistros: number = 0;

  listaUsuarios: Usuario[] = [];

  filtroForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private drS: DetallerecetaService, private uS: UsuarioService) {
    this.filtroForm = new FormGroup({
      usuarioId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.buscarPorUsuario(0);

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
    this.drS.medicamentosByGravedad(id).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.totalRegistros = data.length;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
