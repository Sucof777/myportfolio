import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loginForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  error = false;
  submitting = false;

  onSubmit(): void {
    if (this.submitting || this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.error = false;
    this.submitting = true;

    const { username, password } = this.loginForm.getRawValue();
    const authenticated = this.authService.login(username, password);

    this.submitting = false;

    if (authenticated) {
      this.router.navigate(['/admin']);
      return;
    }

    this.error = true;
  }

  get usernameControl() {
    return this.loginForm.get('username');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
}
