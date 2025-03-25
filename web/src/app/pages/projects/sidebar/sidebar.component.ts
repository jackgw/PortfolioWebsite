import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    standalone: true,
    imports: [PanelMenu, RouterModule, CommonModule],
    providers: [MessageService]
})
export class SidebarComponent {
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

    ngOnInit() {
        this.items = [
            {
                label: 'Professional',
                expanded: true,
                // icon: 'pi pi-briefcase',
                items: [
                    {
                        label: 'Social Valid',
                        route: '/projects/social-valid'
                    },
                    {
                        label: 'Power Fusion Media',
                        route: '/projects/pfm'
                    }
                ]
            },
            {
                label: 'Projects',
                expanded: true,
                // icon: 'pi pi-palette',
                items: [
                    {
                        label: 'SCALE Pathways',
                        route: '/projects/pathways'
                    },
                    {
                        label: 'General API Framework',
                        route: '/projects/generalized-api'
                    },
                ]
            },
            {
                label: 'Portfolio Website',
                expanded: true,
                // icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Overview',
                        route: '/projects/portfolio',
                        params: {section: 'overview'}
                    },
                    {
                        label: 'Deployment',
                        route: '/projects/portfolio',
                        params: {section: 'deployment'}
                    },
                    {
                        label: 'Frontend',
                        route: '/projects/portfolio',
                        params: {section: 'frontend'}
                    },
                    {
                        label: 'API',
                        route: '/projects/portfolio',
                        params: {section: 'api'}
                    },
                ]
            },
        ];
    }

}