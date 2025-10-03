import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PortfolioListComponent } from '../portfolio-list/portfolio-list.component';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceTimelineComponent } from '../experience-timeline/experience-timeline.component';
import { ResumeDownloadComponent } from '../resume-download/resume-download.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    PortfolioListComponent,
    SkillsComponent,
    ExperienceTimelineComponent,
    ResumeDownloadComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
