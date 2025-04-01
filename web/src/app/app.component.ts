import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UtilitiesService } from './services/utilities.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'app';

  // Smoothly scroll route fragments into view when the route changes.
  constructor(
    private router: Router,
    private utilities: UtilitiesService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (!utilities.skipFragmentScroll) {
        this.utilities.scrollToRouteFragment(this.router.url)
      } else {
        // Only skip scrolling for one route change at a time.
        this.utilities.skipFragmentScroll = false;
      }
    });
  }
}
