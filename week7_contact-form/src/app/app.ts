
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
        <h1>Contact Us</h1>
        <p>We would love to hear from you!</p>

        <label>Name</label>
        <input formControlName="name" placeholder="Enter your name">
        <small *ngIf="contactForm.get('name')?.touched &&
                      contactForm.get('name')?.invalid">
          Name is required.
        </small>

        <label>Email</label>
        <input type="email" formControlName="email"
               placeholder="Enter your email">
        <small *ngIf="contactForm.get('email')?.touched &&
                      contactForm.get('email')?.invalid">
          Enter a valid email.
        </small>

        <label>Phone</label>
        <input formControlName="phone" placeholder="10-digit phone number">
        <small *ngIf="contactForm.get('phone')?.touched &&
                      contactForm.get('phone')?.invalid">
          Enter a valid 10-digit phone number.
        </small>

        <label>Message</label>
        <textarea formControlName="message"
                  placeholder="Write your message"></textarea>
        <small *ngIf="contactForm.get('message')?.touched &&
                      contactForm.get('message')?.invalid">
          Message must contain at least 10 characters.
        </small>

        <button type="submit">Send Message</button>
      </form>
    </div>
  `,
  styles: [`
    * { box-sizing: border-box; }
    .container {
      min-height: 100vh; display: flex; justify-content: center;
      align-items: center; padding: 20px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      font-family: Arial, sans-serif;
    }
    form {
      width: 100%; max-width: 430px; padding: 30px;
      background: white; border-radius: 18px;
      box-shadow: 0 10px 30px #0003;
    }
    h1 { text-align: center; color: #6655dd; }
    p { text-align: center; color: #777; }
    label { display: block; margin: 14px 0 6px; font-weight: bold; }
    input, textarea {
      width: 100%; padding: 12px; border: 1px solid #ccc;
      border-radius: 8px; font-size: 14px;
    }
    textarea { height: 90px; resize: vertical; }
    small { display: block; color: red; margin-top: 5px; }
    button {
      width: 100%; margin-top: 22px; padding: 13px;
      background: #6655dd; color: white; border: none;
      border-radius: 8px; cursor: pointer;
    }
  `]
})
export class App {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      alert('Contact form submitted successfully!');
      console.log(this.contactForm.value);
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
