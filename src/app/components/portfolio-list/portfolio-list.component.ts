import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // obavezno za *ngFor i ostalo
import { ProjectCardComponent } from '../project-card/project-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceTimelineComponent } from '../experience-timeline/experience-timeline.component';
import { ResumeDownloadComponent } from '../resume-download/resume-download.component';
@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [
    CommonModule,
    ProjectCardComponent,
    TranslateModule,
    SkillsComponent,
    ExperienceTimelineComponent,
    ResumeDownloadComponent,
  ], // ⚠ Dodaj ovdje
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css'],
})
export class PortfolioListComponent {
  projects = [
    {
      title: 'Car Quiz App',
      description:
        'Web aplikacija za preporuku automobila bazirana na TypeScript, Angular i Node.js.',
      image: 'images/HomePage.png',
      link: 'https://frontend-l1sz-kfskjm73k-sucof777s-projects.vercel.app/',
      sourceCode: 'https://github.com/Sucof777/frontend',
      more: '#',
    },
    {
      title: 'Weather App',
      description:
        'Weather App je moderna web aplikacija razvijena u Angularu koja omogućava korisnicima da brzo i jednostavno provjere vremensku prognozu za svoj grad',
      image: 'images/whomepage.png',
      link: 'https://weather-app-wheat-xi-38.vercel.app/weather',
      sourceCode: 'https://github.com/Sucof777/weather-app',
      more: '#',
    },
    {
      title: 'Projekat 3',
      description: 'Opis projekta 3',
      image: 'https://via.placeholder.com/300',
      link: '#',
      sourceCode: '#',
      more: '#',
    },
  ];
}
