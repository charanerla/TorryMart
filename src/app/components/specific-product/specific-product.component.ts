import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppError } from 'src/app/common/app-error';
import { BadRequestError } from 'src/app/common/badRequest-error';
import { NetworkError } from 'src/app/common/network-error';
import { NotFoundError } from 'src/app/common/notfound-error';
import { ServerError } from 'src/app/common/server-error';
import { ProductsService } from 'src/app/services/products.service';
import { CartProduct, Product } from '../../interfacesAndTypes';

import { switchMap, map, combineLatest } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-specific-product',
  templateUrl: './specific-product.component.html',
  styleUrls: ['./specific-product.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProductCardComponent, RouterModule],
})
export class SpecificProductComponent implements OnInit {
  myCartCount: number = 0;
  productDetails: any = {};
  similarProducts: any[] = [];
  isSpcificProductInCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id: number;
    this.myCartCount = this.productsService.getcartCount();
    this.route.paramMap
      .pipe(
        switchMap((param) => {
          let strId: any = param.get('id');
          let category: any = param.get('category');
          id = parseInt(strId);
          return combineLatest([
            this.productsService.getSpecificProduct(id),
            this.productsService.getSpecificCategoryProducts(category),
          ]);
        })
      )
      .subscribe({
        next: (combined) => {
          this.productDetails = combined[0];
          // console.log(combine[0]);
          this.isSpcificProductInCart = this.productsService.isProductInCart(
            this.productDetails.id
          );
          this.similarProducts = combined[1].filter(
            (obj: any) => obj.id !== id
          );
          // console.log(this.similarProducts);
        },
        error: (error) => {
          this.handleError(error);
        },
      });
  }

  private handleError(error: AppError) {
    if (error instanceof NetworkError) {
      this.toastr.error('Network Error plz check url');
    } else if (error instanceof ServerError) {
      this.toastr.error('Server is not working, plz check with backend');
    } else if (error instanceof BadRequestError) {
      this.toastr.error('Bad input');
    } else if (error instanceof NotFoundError) {
      this.toastr.error('The request you did is not found');
    } else {
      throw error;
    }
  }

  cartCount() {
    this.myCartCount = this.productsService.getcartCount();
  }

  addToCart(obj: Product) {
    let newObj: CartProduct = { ...obj, quantity: 1 };
    this.isSpcificProductInCart = true;
    this.productsService.cart = newObj;
    this.cartCount();
    this.toastr.success('Successfully added to cart');
    console.log(this.productsService.cart);
  }

  onClickBuyNow() {
    let product = { ...this.productDetails, quantity: 1 };
    this.productsService.currentOrder = product;
    this.router.navigate(['/order-summary']);
  }
}
