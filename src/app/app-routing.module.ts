import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { ProductsComponent } from './products/products.component';
import { ColorsComponent } from './colors/colors.component'
import { RegisterComponent } from './security/register/register.component';
import { LoginComponent } from './security/login/login.component';
import { SecurityRouter } from './security/security.router';

const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [SecurityRouter] },
  { path: 'products', component: ProductsComponent, canActivate: [SecurityRouter] },
  { path: 'colors', component: ColorsComponent, canActivate: [SecurityRouter] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SecurityRouter]
})

export class AppRoutingModule {

}



