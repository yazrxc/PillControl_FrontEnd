import { Routes } from '@angular/router';
import { FarmaciaComponent } from './components/farmacia/farmacia.component';
import { InsertareditarfarmaciaComponent } from './components/farmacia/insertareditarfarmacia/insertareditarfarmacia.component';
import { EspecialistaComponent } from './components/especialista/especialista.component';
import { InsertareditarespecialistaComponent } from './components/especialista/insertareditarespecialista/insertareditarespecialista.component';
import { MedicamentoComponent } from './components/medicamento/medicamento.component';
import { InsertareditarmedicamentoComponent } from './components/medicamento/insertareditarmedicamento/insertareditarmedicamento.component';

export const routes: Routes = [
    {
        path:'',redirectTo:'farmacias',pathMatch:'full'
    },
    {
        path:'farmacias',component:FarmaciaComponent,
        children:[
            {
                path:'nuevo',component:InsertareditarfarmaciaComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarfarmaciaComponent
            }
        ]
    },
    {
        path:'especialistas',component:EspecialistaComponent,
        children:[
            {
                path:'nuevo',component:InsertareditarespecialistaComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarespecialistaComponent
            }
        ]
    },
    {
        path:'medicamentos',component:MedicamentoComponent,
        children:[
            {
                path:'nuevo',component:InsertareditarmedicamentoComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarmedicamentoComponent
            }
        ]
    }
];
