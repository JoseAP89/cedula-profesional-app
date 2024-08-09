import { Routes } from '@angular/router';
import { RegistrationComponent } from './modules/home/components/registration/registration.component';
import { RecordsComponent } from './modules/records/records/records.component';

export const routes: Routes = [
    {path: '', component: RegistrationComponent},
    {path: 'records', component: RecordsComponent},
];
