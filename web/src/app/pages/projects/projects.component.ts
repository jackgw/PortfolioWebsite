import { Component } from '@angular/core';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [NavbarComponent, SidebarComponent, CardModule, CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

}
