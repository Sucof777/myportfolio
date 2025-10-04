import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';

import { ContactService } from '../../services/contact.service';

type ContactInfo = {
  icon: 'mail' | 'location' | 'calendar';
  labelKey: string;
  valueKey: string;
  href?: string;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  readonly nameMinLength = 3;
  readonly messageMinLength = 20;
  readonly contactForm: FormGroup;
  status: 'success' | 'error' | null = null;
  submitting = false;

  readonly contactInfo: readonly ContactInfo[] = [
    {
      icon: 'mail',
      labelKey: 'CONTACT.INFO.EMAIL.LABEL',
      valueKey: 'CONTACT.INFO.EMAIL.VALUE',
      href: 'mailto:ferizovicsuco3@gmail.com',
    },
    {
      icon: 'location',
      labelKey: 'CONTACT.INFO.LOCATION.LABEL',
      valueKey: 'CONTACT.INFO.LOCATION.VALUE',
    },
    {
      icon: 'calendar',
      labelKey: 'CONTACT.INFO.AVAILABILITY.LABEL',
      valueKey: 'CONTACT.INFO.AVAILABILITY.VALUE',
    },
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly contactService: ContactService,
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(this.messageMinLength)]],
    });
  }

  get nameControl() {
    return this.contactForm.get('name');
  }

  get emailControl() {
    return this.contactForm.get('email');
  }

  get messageControl() {
    return this.contactForm.get('message');
  }

  trackByInfo(_: number, info: ContactInfo): string {
    return info.labelKey;
  }

  onSubmit(): void {
    if (this.submitting) {
      return;
    }

    if (this.contactForm.invalid) {
      this.status = 'error';
      this.contactForm.markAllAsTouched();
      return;
    }

    this.status = null;
    this.submitting = true;

    const { name, email, message } = this.contactForm.getRawValue();

    this.contactService
      .sendMessage({
        name,
        email,
        message,
      })
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: () => {
          this.status = 'success';
          this.contactForm.reset();
        },
        error: () => {
          this.status = 'error';
        },
      });
  }
}
