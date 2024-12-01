import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsuarioComponent }  from './usuario.component';
import { FormsModule } from '@angular/forms';

import { InicioComponent } from './inicio.component';
import { AppRoutingModule } from './app-routing.module';

import { DocumentService } from './services/document.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegisterComponent } from './security/register/register.component';
import { LoginComponent } from './security/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { MenuListComponent } from './navigation/menu-list/menu-list.component';
import { SecurityService } from './security/security.service';

import { MAT_DATE_LOCALE } from '@angular/material/core'; //,{provide: MAT_DATE_LOCALE, useValue: 'es-ES'}

import { ColorsComponent } from './colors/colors.component';
import { NewColorComponent } from './colors/new-color.component';

import { HttpClientModule } from '@angular/common/http';

import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './products/new-product.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    InicioComponent,
    RegisterComponent,
    LoginComponent,
    ToolbarComponent,
    MenuListComponent,
    ColorsComponent,
    NewColorComponent,
    ProductsComponent,
    NewProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [DocumentService, SecurityService, {provide: MAT_DATE_LOCALE, useValue: 'es-ES'} ],
  bootstrap: [AppComponent],
  entryComponents: []
})

export class AppModule { }
