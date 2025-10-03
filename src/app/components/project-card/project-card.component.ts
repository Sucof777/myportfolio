import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() image!: string;
  @Input() link: string | null = null;
  @Input() sourceCode: string | null = null;
  @Input() more: string | null = null;
  @Input() tags: readonly string[] = [];

  trackByTag(_: number, tag: string): string {
    return tag;
  }
}
