import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'addproduct/:for',
    loadChildren: () => import('./add-edit-product/addproduct/addproduct.module').then(m => m.AddproductPageModule)
  },
  {
    path: 'editproduct/:id',
    loadChildren: () => import('./add-edit-product/editproduct/editproduct.module').then(m => m.EditproductPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackPageModule)
  },
  {
    path: 'productdetails/:id',
    loadChildren: () => import('./home/productdetails/productdetails.module').then(m => m.ProductdetailsPageModule)
  },
  {
    path: 'shoppingcart',
    loadChildren: () => import('./shoppingcart/shoppingcart.module').then(m => m.ShoppingcartPageModule)
  },
  {
    path: 'usercredentials/:for',
    loadChildren: () => import('./usercredentials/usercredentials.module').then( m => m.UsercredentialsPageModule)
  },
  {
    path: 'business-signup',
    loadChildren: () => import('./usercredentials/business-signup/business-signup.module').then( m => m.BusinessSignupPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
