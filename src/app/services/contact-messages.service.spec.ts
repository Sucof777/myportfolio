import { TestBed } from '@angular/core/testing';

import {
  ContactMessagesService,
  ContactMessage,
} from './contact-messages.service';

describe('ContactMessagesService', () => {
  let service: ContactMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store messages in reverse chronological order', () => {
    const captured: ContactMessage[][] = [];
    const subscription = service.messages$.subscribe((messages) => {
      captured.push(messages);
    });

    service.addMessage({
      name: 'First User',
      email: 'first@example.com',
      message: 'First message content that is sufficiently long.',
    });

    service.addMessage({
      name: 'Second User',
      email: 'second@example.com',
      message: 'Second message with enough characters to be valid.',
    });

    subscription.unsubscribe();

    const latest = captured[captured.length - 1];
    expect(latest.length).toBe(2);
    expect(latest[0].name).toBe('Second User');
    expect(latest[1].name).toBe('First User');
  });
});
