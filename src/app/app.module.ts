import { Component, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home/home.component';
import { RouterModule } from '@angular/router';
import { UsersServive } from './services/users.service';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesService } from './services/categories.service';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SummaryPipe } from './customPipes/summary.pipe';
import { SpecificProductComponent } from './components/specific-product/specific-product.component';
import { AppErrorHandler } from './common/app-error-handler';
import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { OrderSummaryAuthGuardService } from './services/order-summary-auth-guard.service';
import { LoginAndSecurityComponent } from './components/login-and-security/login-and-security.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressesComponent,
    DummyComponent,
    LoginAndSecurityComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 2000,
    }),
    RouterModule.forRoot([
      {
        path: '',
        loadComponent: () =>
          import('./components/auth/login/login-form.component').then(
            (component) => component.LoginComponent
          ),
        canActivate: [LoginGuardService],
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/auth/login/login-form.component').then(
            (component) => component.LoginComponent
          ),
        canActivate: [LoginGuardService],
      },
      {
        path: 'product/:category/:title/:id',
        loadComponent: () =>
          import(
            './components/specific-product/specific-product.component'
          ).then((component) => component.SpecificProductComponent),
        canActivate: [AuthGuardService],
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home/home.component').then(
            (component) => component.HomeComponent
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (component) => component.CartComponent
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'profile/manage-account',
        component: LoginAndSecurityComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'profile/orders',
        loadComponent: () =>
          import('./components/orders/orders.component').then(
            (component) => component.OrdersComponent
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./components/profile/profile.component').then(
            (component) => component.ProfileComponent
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'order-summary',
        loadComponent: () =>
          import('./components/order-summary/order-summary.component').then(
            (component) => component.OrderSummaryComponent
          ),
        canActivate: [AuthGuardService, OrderSummaryAuthGuardService],
      },
    ]),
  ],
  providers: [
    UsersServive,
    CategoriesService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
