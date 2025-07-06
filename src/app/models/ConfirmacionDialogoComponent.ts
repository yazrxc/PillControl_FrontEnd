import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmacionDialogoComponent } from '../components/confirmacion-dialogo/confirmacion-dialogo.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatDialogModule, ConfirmacionDialogoComponent, /* otros módulos */],
})
export class AppModule {}
