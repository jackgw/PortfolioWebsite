import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appScrollVisibility]'
})
export class ScrollVisibilityDirective {
  @Input() scrollThreshold = 100;

  private isNavbarHidden = true;

  constructor() { }

  @HostBinding('class.hidden') get hidden() {
    return this.isNavbarHidden;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > this.scrollThreshold) {
      // User is scrolling down
      this.isNavbarHidden = false;
    } else {
      // User is scrolling up
      this.isNavbarHidden = true;
    }
  }
}
