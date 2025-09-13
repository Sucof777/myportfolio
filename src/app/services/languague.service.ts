// src/app/services/language.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

const KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private isBrowser: boolean;

  constructor(
    private t: TranslateService,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // default i fallback
    this.t.setDefaultLang('sr');

    // server nema localStorage – koristi 'sr'
    if (!this.isBrowser) {
      this.t.use('sr');
      return;
    }

    // browser – čitaj/snimi u localStorage
    try {
      const saved = localStorage.getItem(KEY);
      const browser = this.t.getBrowserLang() || 'sr';
      const init = (saved ?? (browser?.startsWith('en') ? 'en' : 'sr')) as
        | 'sr'
        | 'en';
      this.t.use(init);
    } catch {
      this.t.use('sr');
    }
  }

  set(lang: 'sr' | 'en') {
    this.t.use(lang);
    if (this.isBrowser) {
      try {
        localStorage.setItem(KEY, lang);
      } catch {}
    }
  }

  current(): 'sr' | 'en' {
    return (this.t.currentLang as 'sr' | 'en') || 'sr';
  }
}
