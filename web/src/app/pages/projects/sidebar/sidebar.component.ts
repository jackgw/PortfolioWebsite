import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { IsActiveMatchOptions, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    standalone: true,
    imports: [PanelMenu, RouterModule, CommonModule, TagModule],
    providers: [MessageService]
})
export class SidebarComponent implements OnInit {
    @Input() showHeader = true;

    @Output() linkClicked = new EventEmitter()

    items: MenuItem[] = [];

    constructor(private router: Router) {}

    // Custom menu styling
    plain = {
        background: 'transparent',
        border: {
            radius: '0px',
            color: 'transparent'
        }
    };

    public linkActiveOptions: IsActiveMatchOptions = {
        matrixParams: 'exact',
        queryParams: 'exact',
        paths: 'exact',
        fragment: 'exact',
      };

    ngOnInit() {
        this.items = [
            {
                label: 'Social Valid',
                expanded: true,
                category: 'Professional',
                items: [
                    {
                        label: 'Overview',
                        route: '/projects/social-valid',
                        fragment: 'overview'
                    },
                    {
                        label: 'Responsibilities',
                        route: '/projects/social-valid',
                        fragment: 'roles'
                    },
                    {
                        label: 'Achievements',
                        route: '/projects/social-valid',
                        fragment: 'achievements'
                    },
                    {
                        label: 'Showcase: Homepage',
                        route: '/projects/social-valid',
                        fragment: 'homepage'
                    },
                    {
                        label: 'Showcase: User Page Types',
                        route: '/projects/social-valid',
                        fragment: 'pages'
                    },
                    {
                        label: 'Showcase: Theming',
                        route: '/projects/social-valid',
                        fragment: 'theming'
                    },
                    {
                        label: 'Showcase: Agencies',
                        route: '/projects/social-valid',
                        fragment: 'agencies'
                    },
                    {
                        label: 'Showcase: Ambassador Program',
                        route: '/projects/social-valid',
                        fragment: 'ambassadors'
                    },
                    {
                        label: 'Showcase: Admin Dashboard',
                        route: '/projects/social-valid',
                        fragment: 'backoffice'
                    },
                ]
            },
            // {
            //     label: 'Power Fusion Media',
            //     expanded: true,
            //     category: 'Professional',
            //     items: [
            //         {
            //             label: 'Overview',
            //             route: '/projects/pfm'
            //         },
            //     ]
            // },
            {
                label: 'SCALE Pathways',
                expanded: true,
                category: 'Project',
                items: [
                    {
                        label: 'Overview',
                        route: '/projects/pathways',
                        fragment: 'overview'
                    },
                    {
                        label: 'Responsibilities',
                        route: '/projects/pathways',
                        fragment: 'roles'
                    },
                    {
                        label: 'Contributions',
                        route: '/projects/pathways',
                        fragment: 'contributions'
                    },
                    {
                        label: 'Demo',
                        route: '/projects/pathways',
                        fragment: 'demo'
                    },
                ]
            },
            {
                label: 'Generalized SQL API',
                expanded: true,
                category: 'Project',
                items: [
                    {
                        label: 'Overview',
                        route: '/projects/generalized-api',
                        fragment: 'overview'
                    },
                    {
                        label: 'Highlights',
                        route: '/projects/generalized-api',
                        fragment: 'highlights'
                    },
                ]
            },
            {
                label: 'Portfolio Website',
                expanded: true,
                category: 'Project',
                items: [
                    {
                        label: 'Overview',
                        route: '/projects/portfolio',
                        fragment: 'overview'
                    },
                    {
                        label: 'Frontend',
                        route: '/projects/portfolio',
                        fragment: 'frontend'
                    },
                    {
                        label: 'Backend',
                        route: '/projects/portfolio',
                        fragment: 'api'
                    },
                    {
                        label: 'Deployment',
                        route: '/projects/portfolio',
                        fragment: 'deployment'
                    },
                ]
            },
        ];
    }

    getTagSeverity(category: string) {
        switch (category) {
            case 'Professional':
                return 'info';
            case 'Volunteer':
                return 'warn';
            default:
                return undefined;
        }
    }

    linkClick() {
        this.linkClicked.emit();
    }
}