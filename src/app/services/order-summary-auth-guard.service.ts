import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class OrderSummaryAuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  canActivate() {
    if (this.productsService.currentOrder !== null) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
