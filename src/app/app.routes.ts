import { Routes } from '@angular/router';
import { PortfolioListComponent } from './components/portfolio-list/portfolio-list.component'; // putanja do tvoje komponente
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: '/portfolio', pathMatch: 'full' }, // opcionalno: da default ide na portfolio
  { path: 'portfolio', component: PortfolioListComponent },
   { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
  // ovdje možeš dodati i druge rute, npr. about, contact
];
