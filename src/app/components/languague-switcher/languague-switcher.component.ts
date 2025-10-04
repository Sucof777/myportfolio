import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/languague.service';

@Component({
  selector: 'app-lang',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div
      class="flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-1.5 py-1 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur transition-colors dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-200"
      role="group"
      [attr.aria-label]="'NAV.ARIA.LANGUAGE' | translate"
    >
      <button
        type="button"
        (click)="switch('sr')"
        class="rounded-full px-2.5 py-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-white"
        [class.bg-slate-900]="current === 'sr'"
        [class.text-white]="current === 'sr'"
        [class.bg-transparent]="current !== 'sr'"
        [class.text-slate-700]="current !== 'sr'"
        [class.dark:text-slate-200]="current !== 'sr'"
        [attr.aria-pressed]="current === 'sr'"
        [attr.aria-label]="'NAV.ARIA.LANGUAGE_SR' | translate"
      >
        SR
      </button>

      <span class="h-4 w-px bg-slate-200/80 dark:bg-slate-700/80" aria-hidden="true"></span>

      <button
        type="button"
        (click)="switch('en')"
        class="rounded-full px-2.5 py-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-white"
        [class.bg-slate-900]="current === 'en'"
        [class.text-white]="current === 'en'"
        [class.bg-transparent]="current !== 'en'"
        [class.text-slate-700]="current !== 'en'"
        [class.dark:text-slate-200]="current !== 'en'"
        [attr.aria-pressed]="current === 'en'"
        [attr.aria-label]="'NAV.ARIA.LANGUAGE_EN' | translate"
      >
        EN
      </button>
    </div>
  `,
})
export class LanguageSwitcherComponent {
  current: 'sr' | 'en';

  constructor(private readonly languageService: LanguageService) {
    this.current = this.languageService.current();
  }

  switch(lang: 'sr' | 'en') {
    if (this.current === lang) {
      return;
    }

    this.languageService.set(lang);
    this.current = lang;
  }
}
