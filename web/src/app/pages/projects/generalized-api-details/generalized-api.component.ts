import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-generalized-api',
  imports: [Message, CommonModule, Tag, ImageModule],
  templateUrl: './generalized-api.component.html',
  styleUrl: './generalized-api.component.css',
  standalone: true
})
export class GeneralizedApiDetailsComponent {

}
