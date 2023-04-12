import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UserDetails, Product, CartProduct } from '../../interfacesAndTypes';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { SummaryPipe } from 'src/app/customPipes/summary.pipe';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FormsModule,
    RouterModule,
    SummaryPipe,
  ],
})
export class CartComponent implements OnInit {
  myCart: CartProduct[] = [];
  cartCount: number = 0;
  constructor(
    private service: ProductsService,
    private toastr: ToastrService,
    private productsService: ProductsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.myCart = this.service.cart;
    this.cartCount = this.service.getcartCount();
  }

  onClickTrash(id: number) {
    this.service.deleteCartItem(id);
    this.myCart = this.service.cart;
    this.cartCount = this.service.getcartCount();
    this.toastr.success('Deleted successfully');
  }

  onClickDecrement(id: number) {
    this.service.decreaseQuantity(id);
    this.myCart = this.service.cart;
    this.cartCount = this.service.getcartCount();
  }

  onClickIncrement(id: number) {
    this.service.incrementQuantity(id);
    this.myCart = this.service.cart;
    this.cartCount = this.service.getcartCount();
  }

  onClickBuyNow(id: number) {
    let buyNowProduct: any = {
      ...this.myCart.filter((obj) => obj.id === id)[0],
    };
    // console.log(buyNowProduct);
    // let product = { ...this.productDetails, quantity: 1 };
    this.productsService.currentOrder = buyNowProduct;
    this.router.navigate(['/order-summary']);
  }
}
