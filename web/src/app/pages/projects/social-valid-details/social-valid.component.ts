import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { GalleriaModule } from 'primeng/galleria';
import { Router } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-social-valid',
  imports: [Message, CommonModule, Tag, GalleriaModule],
  templateUrl: './social-valid.component.html',
  styleUrl: './social-valid.component.css',
  standalone: true
})
export class SocialValidDetailsComponent implements AfterViewInit {
    pages_showcase_gallery = [
        {
            name: "Passport",
            src: "assets/projects/social_valid/passport_view.mp4",
            thumb: "assets/projects/social_valid/passport_view_thumb.png",
            description: "The passport page displays the user's verified identify info, and allows the user to customize how much information is shown to different types of users visiting their page."
        },
        {
            name: "Portfolio",
            src: "assets/projects/social_valid/portfolio_full.mp4",
            thumb: "assets/projects/social_valid/portfolio_full_thumb.png",
            description: "The portfolio page is aimed at creators and influencers, and provides a grid of widgets that users can use to showcase their information, partnerships, and past work. The portfolio also includes in-depth theming options for users to personalize the look of their page."
        },
        {
            name: "Bio",
            src: "assets/projects/social_valid/bio_customize.mp4",
            thumb: "assets/projects/social_valid/bio_customize_thumb.png",
            description: "The bio page allows users to display their socials or any other links they have on a single homepage, similar to a service like Linktree. Unique to Social Valid, the bio page provided built-in verification for social links using OAuth, and powerful theme customization options."
        }
    ];

    themes_showcase_gallery = [
        {
            name: "Portfolio Templates",
            src: "assets/projects/social_valid/portfolio_templates.mp4",
            thumb: "assets/projects/social_valid/passport_view_thumb.png",
            description: "The passport page displays the user's verified identify info, and allows the user to customize how much information is shown to different types of users visiting their page."
        },
        {
            name: "Alternate Portfolio Layouts",
            src: "assets/projects/social_valid/alternate_portfolios.mp4",
            thumb: "assets/projects/social_valid/portfolio_full_thumb.png",
            description: "The portfolio page is aimed at creators and influencers, and provides a grid of widgets that users can use to showcase their information, partnerships, and past work. The portfolio also includes in-depth theming options for users to personalize the look of their page."
        },
        {
            name: "Light/Dark Mode",
            src: "assets/projects/social_valid/light_dark.mp4",
            thumb: "assets/projects/social_valid/bio_customize_thumb.png",
            description: "The bio page allows users to display their socials or any other links they have on a single homepage, similar to a service like Linktree. Unique to Social Valid, the bio page provided built-in verification for social links using OAuth, and powerful theme customization options."
        }
    ];

    agencies_showcase_gallery = [
        {
            name: "Public Agency Roster List",
            src: "assets/projects/social_valid/agency_featured.mp4",
            thumb: "assets/projects/social_valid/portfolio_full_thumb.png",
            description: "The portfolio page is aimed at creators and influencers, and provides a grid of widgets that users can use to showcase their information, partnerships, and past work. The portfolio also includes in-depth theming options for users to personalize the look of their page."
        },
        {
            name: "Agency User Management",
            src: "assets/projects/social_valid/roster_list.mp4",
            thumb: "assets/projects/social_valid/passport_view_thumb.png",
            description: "The passport page displays the user's verified identify info, and allows the user to customize how much information is shown to different types of users visiting their page."
        },
    ];

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
