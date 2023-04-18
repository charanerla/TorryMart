import { Component, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersServive } from './services/users.service';
import { CategoriesService } from './services/categories.service';
import { HttpClientModule } from '@angular/common/http';

import { AppErrorHandler } from './common/app-error-handler';
import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';

import { DummyComponent } from './components/dummy/dummy.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { OrderSummaryAuthGuardService } from './services/order-summary-auth-guard.service';
import { LoginAndSecurityComponent } from './components/login-and-security/login-and-security.component';

@NgModule({
  declarations: [AppComponent, DummyComponent],
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
        path: 'profile/addresses',
        loadComponent: () =>
          import('./components/addresses/addresses.component').then(
            (component) => component.AddressesComponent
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'profile/contact-us',
        loadComponent: () =>
          import('./components/contact-us/contact-us.component').then(
            (component) => component.ContactUsComponent
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

      {
        path: 'page-not-found',
        loadComponent: () =>
          import('./components/not-found-page/not-found-page.component').then(
            (component) => component.NotFoundPageComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'page-not-found',
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
