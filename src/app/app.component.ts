import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { routes } from './app.routes';
import { LanguageSwitcherComponent } from './components/languague-switcher/languague-switcher.component';
import { FeatureTranslationLoaderService } from './i18n/feature-translation-loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portfolio';
  readonly currentYear = new Date().getFullYear();

  constructor(
    private readonly featureTranslationLoader: FeatureTranslationLoaderService,
  ) {
    this.featureTranslationLoader.load();
  }
}
