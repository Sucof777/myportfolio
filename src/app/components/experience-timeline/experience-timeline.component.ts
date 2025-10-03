import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  description: string;
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
}
