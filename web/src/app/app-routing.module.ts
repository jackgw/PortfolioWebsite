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
    component: HomeComponent,
    data: {
      meta: {
        title: 'Jack Wharton | Home', 
        description: 'Full-stack web developer from the Seattle area who specializes in creating efficient, functional, and elegant applications to solve real world problems.',
        keywords: ['jack wharton', 'jack', 'wharton', 'full stack developer', 'web developer']
      }
    }
  },
  {
    path: "projects",
    component: ProjectsComponent,
    children: [
      { 
        path: 'social-valid', 
        component: SocialValidDetailsComponent,
        data: {
          meta: {
            title: 'Jack Wharton | Social Valid', 
            description: 'Learn about my previous work at Social Valid.',
            keywords: ['jack wharton', 'social valid', 'socialvalid']
          }
        }
      },
      // {
      //   path: 'pfm',
      //   component: PfmDetailsComponent,
      //   data: {
      //     meta: {
      //       title: 'Jack Wharton | Power Fusion Media', 
      //       description: 'Learn about my previous work at Power Fusion Media.',
      //       keywords: ['jack wharton', 'power fusion media']
      //     }
      //   }
      // },
      {
        path: 'pathways',
        component: PathwaysDetailsComponent,
        data: {
          meta: {
            title: 'Jack Wharton | SCALE Pathways', 
            description: 'Learn about my work on SCALE Pathways.',
            keywords: ['jack wharton', 'pathways', 'scale pathways']
          }
        }
      },
      {
        path: 'portfolio',
        component: PortfolioDetailsComponent,
        data: {
          meta: {
            title: 'Jack Wharton | Portfolio Website', 
            description: 'Learn about my personal portfolio project.',
            keywords: ['jack wharton', 'portfolio']
          }
        }
      },
      {
        path: 'generalized-api',
        component: GeneralizedApiDetailsComponent,
        data: {
          meta: {
            title: 'Jack Wharton | General SQL API', 
            description: 'Learn about my generalized api project.',
            keywords: ['jack wharton', 'generalized sql api']
          }
        }
      },
      { path: '', redirectTo: 'social-valid', pathMatch: 'full' } // Default subroute
    ],
    data: {
      meta: {
        title: 'Jack Wharton | Portfolio', 
        description: 'Learn about my past work and projects.',
        keywords: ['jack wharton', 'projects', 'my work']
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64] // [x, y]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
