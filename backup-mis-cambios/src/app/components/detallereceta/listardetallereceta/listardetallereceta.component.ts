import { Component, OnInit } from '@angular/core';
import { DetalleReceta } from '../../../models/detallereceta';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DetallerecetaService } from '../../../services/detallereceta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionDialogoComponent } from '../../confirmacion-dialogo/confirmacion-dialogo.component';

@Component({
  selector: 'app-listardetallereceta',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginator,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './listardetallereceta.component.html',
  styleUrl: './listardetallereceta.component.css'
})

export class ListardetallerecetaComponent implements OnInit {
  dataSource: MatTableDataSource<DetalleReceta> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private drS: DetallerecetaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.drS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: DetalleReceta, filter: string) => {
        return data.receta.usuario?.nombre?.toLowerCase().includes(filter);
      };
    });

    this.drS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

      this.dataSource.filterPredicate = (data: DetalleReceta, filter: string) => {
        return data.receta.usuario?.nombre?.toLowerCase().includes(filter);
      };
    });
  }

  applyFilter(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  eliminar(id: number) {
  const confirmar = confirm('Este detalle de receta tiene notificaciones asociadas. ¿Desea eliminar también las notificaciones?');

  if (!confirmar) {
    this.snackBar.open('Eliminación cancelada por el usuario', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    return;
  }

  this.drS.delete(id).subscribe({
    next: () => {
      this.drS.list().subscribe(data => {
        this.drS.setList(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.snackBar.open('Detalle de la receta eliminado con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      });
    },
    error: (err) => {
      console.error('Error al eliminar:', err);
      this.snackBar.open('Error al eliminar el detalle de la receta', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  });
}
}

