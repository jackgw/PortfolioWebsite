import { Component } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { TextareaModule } from 'primeng/textarea';
import { InputMask } from 'primeng/inputmask';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputMask,
    CardModule,
    TextareaModule,
    FloatLabelModule,
    ButtonModule,
    Message
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone: true
})
export class ContactComponent {
  formError: string | undefined;

  constructor(private fb: FormBuilder) {}

  contactForm = this.fb.group({
    name: ['', Validators.required],
    company: [''],
    phone: [''],
    email: [''],
    subject: [null, Validators.required],
    message: ['', Validators.required]
  })

  categories = [
    'Personal Interest',
    'Project Inquiry',
    'Collaboration Request',
    'Other'
  ]

  submitForm() {
    if (this.contactForm.valid) {
      alert("SUBMITTED (TODO")
    } else {
      // Display error
      const errorFields = [];

      for (const field in this.contactForm.controls) {
        const control = this.contactForm.get(field);
        control?.markAsDirty();
        if (!control?.valid) {
          errorFields.push(field);
        }
      }

      const lf = new Intl.ListFormat('en'); // Praise the Oxford comma
      this.formError = `${lf.format(errorFields)} ${errorFields.length > 1 ? 'are' : 'is'} required.`;
    }
  }
}
