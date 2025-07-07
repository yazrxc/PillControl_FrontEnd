import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Notificacion } from '../../../models/notificacion';
import { MatTableDataSource } from '@angular/material/table';
import { NotificacionService } from '../../../services/notificacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarnotificacion',
  imports: [
    CommonModule,
    MatPaginator,
    MatCardModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './listarnotificacion.component.html',
  styleUrl: './listarnotificacion.component.css'
})
export class ListarnotificacionComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();
  pagedData: Notificacion[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private nS: NotificacionService,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.nS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: Notificacion, filter: string) =>
        data.nombreUsuario?.toLowerCase().includes(filter);
    });
  }

  ngAfterViewInit(): void {
  if (this.paginator) {
     // Asegura que paginator se asigne correctamente después del render
  setTimeout(() => {
    this.dataSource.paginator = this.paginator;

    // Llama después de asignar el paginador
    this.updatePagedData();

    // Suscripción a cambios de página
    this.paginator.page.subscribe(() => this.updatePagedData());
    });
  }
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.paginator.firstPage();
    this.updatePagedData();
  }

  updatePagedData() {
    if (!this.paginator || !this.dataSource?.filteredData) return;
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedData = this.dataSource.filteredData.slice(startIndex, endIndex);
  }

  eliminar(id: number) {
    this.nS.delete(id).subscribe({
      next: () => {
        this.nS.list().subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.updatePagedData();
        });
        this.snackBar.open('Notificación eliminada con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      error: () => {
        this.snackBar.open('Error al eliminar la notificación', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }
}
