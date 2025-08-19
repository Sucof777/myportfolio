import { Component } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component'; // putanja do tvoje komponente
import { CommonModule } from '@angular/common'; // obavezno za *ngFor i ostalo

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent], // ⚠ Dodaj ovdje
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent {
  projects = [
    {
      title: 'Car Quiz App',
      description: 'Web aplikacija za preporuku automobila bazirana na TypeScript, Angular i Node.js.',
      image: 'images/HomePage.png',
      link: 'https://frontend-l1sz-kfskjm73k-sucof777s-projects.vercel.app/'
    },
    {
      title: 'Projekat 2',
      description: 'Opis projekta 2',
      image: 'https://via.placeholder.com/300',
      link: '#'
    },
    {
      title: 'Projekat 3',
      description: 'Opis projekta 3',
      image: 'https://via.placeholder.com/300',
      link: '#'
    }
  ];
}
