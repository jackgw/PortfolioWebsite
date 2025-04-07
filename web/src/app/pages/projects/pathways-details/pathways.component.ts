import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { Router } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-pathways',
  imports: [Message, CommonModule, Tag],
  templateUrl: './pathways.component.html',
  styleUrl: './pathways.component.css'
})
export class PathwaysDetailsComponent implements AfterViewInit {
    private observer!: IntersectionObserver;

    constructor(
        private router: Router,
        private utilities: UtilitiesService,
    ) {}

    ngAfterViewInit() {
        const sections = document.querySelectorAll('.section');

        const options: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px 0px -50% 0px',
            threshold: 0.5,
        };
    
        this.observer = new IntersectionObserver(
            (entries) => {
                console.log(this.utilities.blockNavigateOnScroll)
                if (!this.utilities.blockNavigateOnScroll) {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const id = entry.target.getAttribute('id');
                            if (id) {
                                this.utilities.skipFragmentScroll = true;
                                this.router.navigate([], { fragment: id, replaceUrl: false,  });
                            }
                        }
                    });
                }
            },
            options
        );
    
        sections.forEach((section) => this.observer.observe(section));
    }
}
