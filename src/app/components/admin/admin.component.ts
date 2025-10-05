import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import {
  ContactMessage,
  ContactMessagesService,
} from '../../services/contact-messages.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  private readonly contactMessagesService = inject(ContactMessagesService);
  readonly messages$ = this.contactMessagesService.messages$;

  trackByMessage(_: number, message: ContactMessage): number {
    return message.id;
  }
}
