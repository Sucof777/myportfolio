import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface AboutData {
  readonly image: string;
  readonly imageAltKey: string;
  readonly nameKey: string;
  readonly roleKey: string;
  readonly descriptionKeys: readonly string[];
}

@Component({
  selector: 'app-about',
  standalone: true, // ako koristiš standalone pristup
  imports: [CommonModule, TranslateModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  about: AboutData = {
    image: 'images/ProfileImage.jpg',
    imageAltKey: 'ABOUT.IMAGE_ALT',
    nameKey: 'ABOUT.NAME',
    roleKey: 'ABOUT.ROLE',
    descriptionKeys: [
      'ABOUT.DESCRIPTION.PARAGRAPH_1',
      'ABOUT.DESCRIPTION.PARAGRAPH_2',
      'ABOUT.DESCRIPTION.PARAGRAPH_3',
      'ABOUT.DESCRIPTION.PARAGRAPH_4',
      'ABOUT.DESCRIPTION.PARAGRAPH_5',
    ],
  };
}
