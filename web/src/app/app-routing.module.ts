import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SocialValidDetailsComponent } from './pages/projects/social-valid-details/social-valid.component';
import { PfmDetailsComponent } from './pages/projects/pfm-details/pfm.component';
import { PathwaysDetailsComponent } from './pages/projects/pathways-details/pathways.component';
import { PortfolioDetailsComponent } from './pages/projects/portfolio-details/portfolio.component';
import { GeneralizedApiDetailsComponent } from './pages/projects/generalized-api-details/generalized-api.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "projects",
    component: ProjectsComponent,
    children: [
      { path: 'social-valid', component: SocialValidDetailsComponent },
      { path: 'pfm', component: PfmDetailsComponent },
      { path: 'pathways', component: PathwaysDetailsComponent },
      { path: 'portfolio', component: PortfolioDetailsComponent },
      { path: 'generalized-api', component: GeneralizedApiDetailsComponent },
      { path: '', redirectTo: 'social-valid', pathMatch: 'full' } // Default subroute
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
