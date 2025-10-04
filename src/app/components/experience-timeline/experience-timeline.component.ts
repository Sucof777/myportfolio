import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

<<<<<<< HEAD
type ExperienceId = 'FREELANCE' | 'STARTUP' | 'AGENCY';

type ExperienceItem = {
  id: ExperienceId;
  icon: 'sparkles' | 'rocket' | 'puzzle';
  accent: string;
=======
type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  description: string;
>>>>>>> main
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
<<<<<<< HEAD
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
=======
      period: '2023 - Present',
      role: 'Frontend Developer',
      company: 'Freelance',
      description: 'Rad na modernim web aplikacijama fokusiranim na performanse i pristupačnost.',
    },
    {
      period: '2021 - 2023',
      role: 'Junior Developer',
      company: 'Tech Startup',
      description: 'Izgradnja end-to-end rješenja uz fokus na korisničko iskustvo i kvalitet koda.',
    },
    {
      period: '2019 - 2021',
      role: 'Intern Developer',
      company: 'Digital Agency',
      description: 'Učešće u razvoju projekata za klijente iz različitih industrija.',
    },
  ];
>>>>>>> main
}
