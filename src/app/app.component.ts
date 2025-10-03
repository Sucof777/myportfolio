import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { LanguageSwitcherComponent } from './components/languague-switcher/languague-switcher.component';
import { FeatureTranslationLoaderService } from './i18n/feature-translation-loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, LanguageSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portfolio';

  constructor(
    private readonly featureTranslationLoader: FeatureTranslationLoaderService,
  ) {
    this.featureTranslationLoader.load();
  }
}
