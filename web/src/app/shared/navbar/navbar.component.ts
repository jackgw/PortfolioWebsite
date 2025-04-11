import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { Router } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        Menubar,
        BadgeModule,
        AvatarModule,
        InputTextModule,
        Ripple,
        CommonModule,
        ButtonModule
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    @Input() customStyle = "plain";

    items: MenuItem[] | undefined;
    darkMode = false;

    // Custom Navbar Styling
    plain = {
        background: 'transparent',
        border: {
            radius: '0px',
            color: 'transparent'
        }
    };
    filled = {
        border: {
            radius: '0px',
            color: 'transparent'
        },
        colorScheme: {
            light: {
                background: 'color-mix(in srgb, {surface.50} 75%, transparent);',
            },
            dark: {
                background: 'color-mix(in srgb, {surface.900} 75%, transparent);',
            }
        }
    };

    constructor(
        private router: Router,
        public utilities: UtilitiesService
    ) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                command: () => { this.router.navigateByUrl('/') }
            },
            // {
            //     label: 'About',
            //     command: () => { this.router.navigateByUrl('/about') }
            // },
            {
                label: 'Portfolio',
                items: [
                    {
                        label: 'Social Valid',
                        command: () => { this.router.navigateByUrl('/projects/social-valid') }
                    },
                    {
                        label: 'SCALE Pathways',
                        command: () => { this.router.navigateByUrl('projects/pathways') }
                    },
                    {
                        label: 'Portfolio Website',
                        command: () => { this.router.navigateByUrl('projects/portfolio') }
                    },
                    {
                        label: 'General API Framework',
                        command: () => { this.router.navigateByUrl('projects/generalized-api') }
                    },
                ],
            },
        ];
    }
}
