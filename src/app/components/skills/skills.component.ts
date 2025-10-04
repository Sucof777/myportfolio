import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
<<<<<<< HEAD
import { finalize } from 'rxjs';

type SkillCategory = {
  categoryKey: string;
  descriptionKey?: string;
=======

type SkillCategory = {
  category: string;
>>>>>>> main
  items: string[];
};

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  skills: SkillCategory[] = [];
<<<<<<< HEAD
  isLoading = true;
  hasError = false;
  readonly placeholders = [0, 1, 2, 3, 4, 5];
=======
>>>>>>> main

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<SkillCategory[]>('assets/data/skills.json')
<<<<<<< HEAD
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (skills) => {
          this.skills = skills;
          this.hasError = false;
        },
        error: () => {
          this.hasError = true;
        },
      });
  }

  trackByCategory(_: number, skill: SkillCategory): string {
    return skill.categoryKey;
  }

  trackByItem(_: number, item: string): string {
    return item;
=======
      .subscribe((skills) => (this.skills = skills));
>>>>>>> main
  }
}
