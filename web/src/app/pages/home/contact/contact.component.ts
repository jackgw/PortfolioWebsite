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
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
    Message,
    ToastModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone: true
})
export class ContactComponent {
    formError: string | undefined;
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private api: ApiService,
        private messageService: MessageService
    ) {}

    contactForm = this.fb.group({
        name: ['', Validators.required],
        company: [''],
        phone: [''],
        email: ['', Validators.email],
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
            // Send Email
            this.api.sendEmail(this.contactForm.value).subscribe((response: any) => {
                if (response && response.message === "Email sent successfully") {
                    this.messageService.add({ severity: 'success', summary: 'Message Sent!', detail: 'Thank you for reaching out! Your message has been recieved and I\'ll get back to you soon.', sticky: true });
                    this.submitted = true;
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Unable to send message.', detail: 'For some reason, your message wasn\'t able to go through. Please try again later or reach out via my email or one of my socials.', sticky: true });
                }
            })
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
