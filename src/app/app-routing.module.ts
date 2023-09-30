import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RecipesPageModule } from './recipes/recipes.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    children:[
      {
        path:'',
        loadChildren: () => import('./recipes/recipes.module').then( m => m.RecipesPageModule)
      },
      {
        path:':recipeId',
        loadChildren: () => import('./recipes/recipes-details/recipes-details.module').then( m => m.RecipesDetailsPageModule)
      }
    ]
    
  },
  {
  path: 'maps',
  loadChildren: () => import('./shared/shared.module').then( m => m.SharedModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
