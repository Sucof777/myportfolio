import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
    this.messagesSubject.next([message, ...currentMessages]);
  }
}
