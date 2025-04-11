import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { UtilitiesService } from './services/utilities.service';
import { SeoService } from './services/seo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'app';

  // Smoothly scroll route fragments into view when the route changes.
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilities: UtilitiesService,
    private seo: SeoService
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

  // Set up SEO meta tag tracking
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map((route) => {
        while (route.firstChild) route = route.firstChild
        return route
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    ).subscribe((event) => {
      const {
        meta: {
          title,
          description,
          keywords
        }
      } = event

      if (title) { this.seo.updateTitle(title) }
      if (description) { this.seo.updateDescription(description) }
      if (keywords) { this.seo.updateKeywords(keywords) }
    })
  }
}
