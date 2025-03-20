import { Component } from '@angular/core';
import { ScrollVisibilityDirective } from 'src/app/directives/scroll-visibility.directive';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, FooterComponent, ScrollVisibilityDirective, AnimateOnScroll, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
