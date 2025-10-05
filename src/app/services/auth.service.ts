import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

const ADMIN_STORAGE_KEY = 'myportfolio.admin.isAuthenticated';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly isAdminSubject = new BehaviorSubject<boolean>(
    this.restoreSession(),
  );

  get isAdmin$(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  isAdmin(): boolean {
    return this.isAdminSubject.value;
  }

  login(username: string, password: string): boolean {
    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      this.isAdminSubject.next(true);
      this.persistSession(true);
      return true;
    }

    return false;
  }

  logout(): void {
    this.isAdminSubject.next(false);
    this.persistSession(false);
    this.router.navigate(['/admin/login']);
  }

  private restoreSession(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const stored = window.localStorage.getItem(ADMIN_STORAGE_KEY);
      return stored === 'true';
    } catch (error) {
      console.error('Failed to read admin session from storage', error);
      return false;
    }
  }

  private persistSession(isAuthenticated: boolean): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(
        ADMIN_STORAGE_KEY,
        isAuthenticated ? 'true' : 'false',
      );
    } catch (error) {
      console.error('Failed to persist admin session', error);
    }
  }
}
