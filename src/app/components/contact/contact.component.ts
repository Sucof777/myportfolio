import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true, // ako koristiš standalone pristup
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly translate: TranslateService,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Contact form data:', this.contactForm.value);
      alert(this.translate.instant('CONTACT.FORM.ALERT.SUCCESS'));
      this.contactForm.reset();
    } else {
      alert(this.translate.instant('CONTACT.FORM.ALERT.ERROR'));
    }
  }
}
