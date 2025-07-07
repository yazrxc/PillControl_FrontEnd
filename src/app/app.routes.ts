import { Routes } from '@angular/router';
import { FarmaciaComponent } from './components/farmacia/farmacia.component';
import { InsertareditarfarmaciaComponent } from './components/farmacia/insertareditarfarmacia/insertareditarfarmacia.component';
import { EspecialistaComponent } from './components/especialista/especialista.component';
import { InsertareditarespecialistaComponent } from './components/especialista/insertareditarespecialista/insertareditarespecialista.component';
import { MedicamentoComponent } from './components/medicamento/medicamento.component';
import { InsertareditarmedicamentoComponent } from './components/medicamento/insertareditarmedicamento/insertareditarmedicamento.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditarrolusuarioComponent } from './components/rolusuario/insertareditarrolusuario/insertareditarrolusuario.component';
import { InsertareditarusuarioComponent } from './components/usuario/insertareditarusuario/insertareditarusuario.component';
import { RolusuarioComponent } from './components/rolusuario/rolusuario.component';
import { ContactoemergenciaComponent } from './components/contactoemergencia/contactoemergencia.component';
import { InsertareditarcontactoemergenciaComponent } from './components/contactoemergencia/insertareditarcontactoemergencia/insertareditarcontactoemergencia.component';
import { PerfilsaludComponent } from './components/perfilsalud/perfilsalud.component';
import { InsertareditarperfilsaludComponent } from './components/perfilsalud/insertareditarperfilsalud/insertareditarperfilsalud.component';
import { TratamientoComponent } from './components/tratamiento/tratamiento.component';
import { InsertareditartratamientoComponent } from './components/tratamiento/insertareditartratamiento/insertareditartratamiento.component';
import { DisgnosticoComponent } from './components/disgnostico/disgnostico.component';
import { InsertareditardiagnosticoComponent } from './components/disgnostico/insertareditardiagnostico/insertareditardiagnostico.component';
import { RecetaComponent } from './components/receta/receta.component';
import { InsertareditarrecetaComponent } from './components/receta/insertareditarreceta/insertareditarreceta.component';

import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportepacientesenriesgoComponent } from './components/reportes/reportepacientesenriesgo/reportepacientesenriesgo.component';
import { ReportefarmaciasabrentempranoComponent } from './components/reportes/reportefarmaciasabrentemprano/reportefarmaciasabrentemprano.component';
import { ReporteubicacionesfarmaciaasComponent } from './components/reportes/reporteubicacionesfarmacias/reporteubicacionesfarmacias.component';
import { ReportedonantespontencialesComponent } from './components/reportes/reportedonantespontenciales/reportedonantespontenciales.component';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistroComponent } from './components/landing-page/registro/registro.component';
import { LoginComponent } from './components/landing-page/login/login.component';
import { MedicamentofarmaciaComponent } from './components/medicamentofarmacia/medicamentofarmacia.component';
import { InsertareditarmedicamentofarmComponent } from './components/medicamentofarmacia/insertareditarmedicamentofarm/insertareditarmedicamentofarm.component';
import { seguridadGuard } from './guard/seguridad.guard';

import { DetallerecetaComponent } from './components/detallereceta/detallereceta.component';
import { InsertareditardetallerecetaComponent } from './components/detallereceta/insertareditardetallereceta/insertareditardetallereceta.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { InsertareditarnotificacionComponent } from './components/notificacion/insertareditarnotificacion/insertareditarnotificacion.component';

import { RecetasvencidasComponent } from './components/reportes/recetasvencidas/recetasvencidas.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingPageComponent,
    children: [
      {
        path: 'registro',
        component: RegistroComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'farmacias',
    component: FarmaciaComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarfarmaciaComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarfarmaciaComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'medicamentosfarmacia',
    component: MedicamentofarmaciaComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarmedicamentofarmComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarmedicamentofarmComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'especialistas',
    component: EspecialistaComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarespecialistaComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarespecialistaComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'medicamentos',
    component: MedicamentoComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarmedicamentoComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarmedicamentoComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarusuarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarusuarioComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'roles',
    component: RolusuarioComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarrolusuarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarrolusuarioComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'contactosemergencia',
    component: ContactoemergenciaComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarcontactoemergenciaComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarcontactoemergenciaComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'perfilessalud',
    component: PerfilsaludComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarperfilsaludComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarperfilsaludComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'diagnosticos',
    component: DisgnosticoComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditardiagnosticoComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditardiagnosticoComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'tratamientos',
    component: TratamientoComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditartratamientoComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditartratamientoComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'recetas',
    component: RecetaComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarrecetaComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarrecetaComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'detallesrecetas',
    component: DetallerecetaComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditardetallerecetaComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditardetallerecetaComponent,
      },
    ],
  },
  {
    path: 'notificaciones',
    component: NotificacionComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarnotificacionComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarnotificacionComponent,
      },
    ],
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    children: [
      {
        path: 'reportepacientesenriesgo',
        component: ReportepacientesenriesgoComponent,
      },
      {
        path: 'reportefarmaciasabrentemprano',
        component: ReportefarmaciasabrentempranoComponent,
      },
      {
        path: 'reporteubicacionesfarmacias',
        component: ReporteubicacionesfarmaciaasComponent,
      },
      {
        path: 'recetas-vencidas',
        component: RecetasvencidasComponent,
      },
    ],
  },
];
