import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-footer',
  imports: [ButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(public utilities: UtilitiesService) {}
}
