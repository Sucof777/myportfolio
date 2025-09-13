import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/languague.service';

@Component({
  selector: 'app-lang',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1 shadow-sm bg-white dark:bg-gray-800"
    >
      <button
        (click)="switch('sr')"
        class="flex items-center gap-1 text-sm px-2 py-1 rounded-full transition-colors"
        [class.bg-orange-500]="current === 'sr'"
        [class.text-white]="current === 'sr'"
        [class.text-gray-800]="current !== 'sr'"
        [class.dark:text-gray-200]="current !== 'sr'"
      >
        SR
      </button>

      <button
        (click)="switch('en')"
        class="flex items-center gap-1 text-sm px-2 py-1 rounded-full transition-colors"
        [class.bg-orange-500]="current === 'en'"
        [class.text-white]="current === 'en'"
        [class.text-gray-800]="current !== 'en'"
        [class.dark:text-gray-200]="current !== 'en'"
      >
        EN
      </button>
    </div>
  `,
})
export class LanguageSwitcherComponent {
  current: 'sr' | 'en';
  constructor(private lang: LanguageService) {
    this.current = this.lang.current();
  }
  switch(l: 'sr' | 'en') {
    this.lang.set(l);
    this.current = l;
  }
}
