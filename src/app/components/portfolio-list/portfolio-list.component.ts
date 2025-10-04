import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  readonly projects: readonly Project[] = [
    {
      titleKey: 'PROJECTS.CAR_QUIZ.TITLE',
      descriptionKey: 'PROJECTS.CAR_QUIZ.DESCRIPTION',
      image: 'images/HomePage.png',
      link: 'https://frontend-l1sz-kfskjm73k-sucof777s-projects.vercel.app/',
      sourceCode: 'https://github.com/Sucof777/frontend',
      more: 'https://github.com/Sucof777/frontend#readme',
      tags: [
        'SKILLS.ITEMS.ANGULAR',
        'SKILLS.ITEMS.TYPESCRIPT',
        'SKILLS.ITEMS.NODE',
      ],
    },
    {
      titleKey: 'PROJECTS.WEATHER_APP.TITLE',
      descriptionKey: 'PROJECTS.WEATHER_APP.DESCRIPTION',
      image: 'images/whomepage.png',
      link: 'https://weather-app-wheat-xi-38.vercel.app/weather',
      sourceCode: 'https://github.com/Sucof777/weather-app',
      more: 'https://github.com/Sucof777/weather-app#readme',
      tags: [
        'SKILLS.ITEMS.ANGULAR',
        'SKILLS.ITEMS.TYPESCRIPT',
        'SKILLS.ITEMS.TAILWIND',
      ],
    },
    {
      titleKey: 'PROJECTS.PORTFOLIO.TITLE',
      descriptionKey: 'PROJECTS.PORTFOLIO.DESCRIPTION',
      image: 'images/ProfileImage.jpg',
      link: 'https://sucof777-portfolio.vercel.app/',
      sourceCode: 'https://github.com/Sucof777/myportfolio',
      more: null,
      tags: [
        'SKILLS.ITEMS.ANGULAR',
        'SKILLS.ITEMS.TAILWIND',
        'SKILLS.ITEMS.GITHUB',
      ],
    },
  ];
}
