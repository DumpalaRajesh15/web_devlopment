import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  contactForm: any;

  constructor(private fb: FormBuilder) {

    this.contactForm = this.fb.group({
      name: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      mobile: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],

      message: ['', Validators.required]
    });
  }

  submit() {

    if (this.contactForm.valid) {

      alert('Form submitted successfully!');

      console.log(this.contactForm.value);

    } else {

      alert('Please fill all fields correctly.');

      this.contactForm.markAllAsTouched();

    }
  }
}