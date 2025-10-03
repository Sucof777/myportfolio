import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { featureTranslationsEn, featureTranslationsSr } from './feature-translations';

@Injectable({ providedIn: 'root' })
export class FeatureTranslationLoaderService {
  private loaded = false;

  constructor(private readonly translate: TranslateService) {}

  load(): void {
    if (this.loaded) {
      return;
    }

    this.loaded = true;

    const apply = () => {
      this.translate.setTranslation('en', featureTranslationsEn, true);
      this.translate.setTranslation('sr', featureTranslationsSr, true);
    };

    apply();
    queueMicrotask(apply);
    setTimeout(apply, 0);

    this.translate.onLangChange.subscribe(apply);
    this.translate.onDefaultLangChange.subscribe(apply);
  }
}
