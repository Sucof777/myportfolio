import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

type AboutHighlight = {
  icon: 'sparkles' | 'handshake' | 'trending-up';
  titleKey: string;
  descriptionKey: string;
};

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  readonly profileImage = 'images/ProfileImage.jpg';
  readonly descriptionKeys = [
    'ABOUT.DESCRIPTIONS.P1',
    'ABOUT.DESCRIPTIONS.P2',
    'ABOUT.DESCRIPTIONS.P3',
  ];
  readonly highlights: readonly AboutHighlight[] = [
    {
      icon: 'sparkles',
      titleKey: 'ABOUT.HIGHLIGHTS.EXPERIENCE.TITLE',
      descriptionKey: 'ABOUT.HIGHLIGHTS.EXPERIENCE.DESCRIPTION',
    },
    {
      icon: 'handshake',
      titleKey: 'ABOUT.HIGHLIGHTS.COLLABORATION.TITLE',
      descriptionKey: 'ABOUT.HIGHLIGHTS.COLLABORATION.DESCRIPTION',
    },
    {
      icon: 'trending-up',
      titleKey: 'ABOUT.HIGHLIGHTS.GROWTH.TITLE',
      descriptionKey: 'ABOUT.HIGHLIGHTS.GROWTH.DESCRIPTION',
    },
  ];

  trackByDescription(_: number, key: string): string {
    return key;
  }

  trackByHighlight(_: number, item: AboutHighlight): string {
    return item.titleKey;
  }
}
