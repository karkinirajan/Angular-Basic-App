import { Routes } from '@angular/router';
import { Gpa } from './gpa/gpa';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home, title: 'Advisees' },
  { path: 'gpa', component: Gpa, title: 'Grade Point Averages' },
  { path: '**', redirectTo: '' },
];
