import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

type ExperienceId = 'FREELANCE' | 'STARTUP' | 'AGENCY';

type ExperienceItem = {
  id: ExperienceId;
  icon: 'sparkles' | 'rocket' | 'puzzle';
  accent: string;
};

@Component({
  selector: 'app-experience-timeline',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './experience-timeline.component.html',
  styleUrls: ['./experience-timeline.component.css'],
})
export class ExperienceTimelineComponent {
  readonly experiences: ExperienceItem[] = [
    {
      id: 'FREELANCE',
      icon: 'sparkles',
      accent: 'from-blue-500 via-indigo-500 to-purple-500',
    },
    {
      id: 'STARTUP',
      icon: 'rocket',
      accent: 'from-emerald-500 via-teal-500 to-cyan-500',
    },
    {
      id: 'AGENCY',
      icon: 'puzzle',
      accent: 'from-amber-500 via-orange-500 to-rose-500',
    },
  ];

  trackByExperience(_: number, item: ExperienceItem): ExperienceId {
    return item.id;
  }
}
