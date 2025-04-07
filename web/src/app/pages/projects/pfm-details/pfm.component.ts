import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-pfm',
  imports: [Message, CommonModule, Tag],
  templateUrl: './pfm.component.html',
  styleUrl: './pfm.component.css'
})
export class PfmDetailsComponent {

}
