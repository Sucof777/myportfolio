import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private readonly http: HttpClient) {}

  sendMessage(payload: ContactPayload): Observable<void> {
    return this.http.post<void>('/api/contact', payload);
  }
}
