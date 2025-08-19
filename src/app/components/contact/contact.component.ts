import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true, // ako koristiš standalone pristup
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
     name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

    onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Contact form data:', this.contactForm.value);
      alert('Thank you! Your message has been submitted.');
      this.contactForm.reset();
    } else {
      alert('Please fill all fields correctly.');
    }
  }
}
