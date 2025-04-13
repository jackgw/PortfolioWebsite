import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-projects',
  imports: [
    NavbarComponent,
    SidebarComponent,
    CardModule,
    CommonModule,
    RouterModule,
    DrawerModule,
    ButtonModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  public currentWindowWidth: number | undefined;
  public mobileMenuVisible = false;

  ngOnInit() {
    this.currentWindowWidth = window.innerWidth;
  }

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth
  }
}
