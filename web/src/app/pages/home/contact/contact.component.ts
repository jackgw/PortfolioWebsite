import { Component } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { TextareaModule } from 'primeng/textarea';
import { InputMask } from 'primeng/inputmask';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contact',
  imports: [
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
    ButtonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone: true
})
export class ContactComponent {
  constructor(private fb: FormBuilder) {}

  contactForm = this.fb.group({
    name: ['', Validators.required],
    company: [''],
    phone: [''],
    email: [''],
    category: [null, Validators.required],
    message: ['', Validators.required]
  })

  categories = [
    'Personal Interest',
    'Project Inquiry',
    'Collaboration Request',
    'Other'
  ]
}
