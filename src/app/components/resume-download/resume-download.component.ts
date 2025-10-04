import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-resume-download',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './resume-download.component.html',
  styleUrls: ['./resume-download.component.css'],
})
export class ResumeDownloadComponent {
  readonly resumeUrl = '/cv.pdf';
}
