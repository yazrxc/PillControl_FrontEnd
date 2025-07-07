import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmacion-dialogo',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirmacion-dialogo.component.html'
})
export class ConfirmacionDialogoComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacionDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  aceptar(): void {
    this.dialogRef.close(true);
  }
}
