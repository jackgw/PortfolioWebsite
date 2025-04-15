import { Component, HostListener } from '@angular/core';
import { ScrollVisibilityDirective } from 'src/app/directives/scroll-visibility.directive';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { ButtonModule } from 'primeng/button';
import { ContactComponent } from './contact/contact.component';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ImageModule } from 'primeng/image';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent, 
    FooterComponent, 
    ScrollVisibilityDirective, 
    AnimateOnScroll, 
    ButtonModule,
    ContactComponent,
    ImageModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  scrolled = false;
  pathwaysThumbSrc = `${environment.assetHost}/projects/pathways/pathways_thumbnail.png`
  svThumbSrc = `${environment.assetHost}/projects/social_valid/dashboard.png`
  apiThumbSrc = `${environment.assetHost}/projects/generalized_api/thumb.png`

  constructor(public utilities: UtilitiesService) {}

  @HostListener("window:scroll", [])
    onWindowScroll() {
        this.scrolled = window.scrollY > 0;
    }
}
