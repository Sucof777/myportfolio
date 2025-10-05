import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const STORAGE_KEY = 'myportfolio.contact.messages';

export type ContactMessage = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly message: string;
  readonly createdAt: Date;
};

export type ContactMessageInput = {
  readonly name: string;
  readonly email: string;
  readonly message: string;
};

@Injectable({ providedIn: 'root' })
export class ContactMessagesService {
  private readonly messagesSubject = new BehaviorSubject<ContactMessage[]>([]);
  private nextId = 1;

  constructor() {
    const storedMessages = this.restoreMessages();
    if (storedMessages.length) {
      this.messagesSubject.next(storedMessages);
      this.nextId = storedMessages.reduce(
        (highestId, message) => Math.max(highestId, message.id),
        0,
      ) + 1;
    }
  }

  get messages$(): Observable<ContactMessage[]> {
    return this.messagesSubject.asObservable();
  }

  addMessage(input: ContactMessageInput): void {
    const message: ContactMessage = {
      id: this.nextId++,
      name: input.name.trim(),
      email: input.email.trim(),
      message: input.message.trim(),
      createdAt: new Date(),
    };

    const currentMessages = this.messagesSubject.value;
    const updatedMessages = [message, ...currentMessages];
    this.messagesSubject.next(updatedMessages);
    this.persistMessages(updatedMessages);
  }

  private restoreMessages(): ContactMessage[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.map((item: ContactMessage) => ({
        ...item,
        createdAt: new Date(item.createdAt),
      }));
    } catch (error) {
      console.error('Failed to restore contact messages from storage', error);
      return [];
    }
  }

  private persistMessages(messages: ContactMessage[]): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const serializable = messages.map((message) => ({
        ...message,
        createdAt: message.createdAt.toISOString(),
      }));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
    } catch (error) {
      console.error('Failed to persist contact messages', error);
    }
  }
}
