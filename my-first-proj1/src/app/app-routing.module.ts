import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BindingsComponent } from './_components/bindings/bindings.component';
import { ProductsListComponent } from './_components/products-list/products-list.component';
import { ProductDetailComponent } from './_components/product-detail/product-detail.component';
import { LoginFormComponent } from './_components/login-form/login-form.component';


const routes: Routes = [
  {
     path: '',  redirectTo: '/bindings', pathMatch: 'full' 
  },
  { path: 'bindings', component: BindingsComponent}, 
  { path: 'products', component:ProductsListComponent} ,
  {path: 'product-detail/:id', component:ProductDetailComponent},
  {path: 'product-detail', component:ProductDetailComponent},
  {path: 'login-form', component:LoginFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
