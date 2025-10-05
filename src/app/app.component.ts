import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from './components/languague-switcher/languague-switcher.component';
import { FeatureTranslationLoaderService } from './i18n/feature-translation-loader.service';
import { LanguageService } from './services/languague.service';

type NavLink = {
  path: string;
  label: string;
  exact?: boolean;
};

type SocialLink = {
  icon: 'github' | 'linkedin' | 'mail';
  href: string;
  label: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    LanguageSwitcherComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly navLinks: readonly NavLink[] = [
    { path: '/portfolio', label: 'NAV.LINKS.HOME', exact: true },
    { path: '/about', label: 'NAV.LINKS.ABOUT' },
    { path: '/contact', label: 'NAV.LINKS.CONTACT' },
    { path: '/admin', label: 'NAV.LINKS.ADMIN' },
  ];

  readonly socialLinks: readonly SocialLink[] = [
    {
      icon: 'github',
      href: 'https://github.com/Sucof777',
      label: 'FOOTER.SOCIAL.GITHUB',
    },
    {
      icon: 'linkedin',
      href: 'https://linkedin.com/in/username',
      label: 'FOOTER.SOCIAL.LINKEDIN',
    },
    {
      icon: 'mail',
      href: 'mailto:ferizovicsuco3@gmail.com',
      label: 'FOOTER.SOCIAL.EMAIL',
    },
  ];

  readonly currentYear = new Date().getFullYear();

  constructor(
    private readonly featureTranslationLoader: FeatureTranslationLoaderService,
    private readonly languageService: LanguageService,
  ) {
    this.featureTranslationLoader.load();
    // ensure navigation/footer translations resolve using the persisted language
    this.languageService.current();
  }

  trackByNav(_: number, link: NavLink): string {
    return link.path;
  }

  trackBySocial(_: number, link: SocialLink): string {
    return link.href;
  }

}
