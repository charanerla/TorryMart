import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServive } from 'src/app/services/users.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class OrderSummaryComponent implements OnInit {
  isOrderPlaced: boolean = false;
  deliveryBy: string = '';
  currentOrderObject: any;
  address = {
    name: 'Torry',
    building: 'Sona Towers, No 71',
    street: 'Millers Rd',
    area: 'Vasanth Nagar',
    city: 'Bangaluru',
    state: 'Karnataka',
    pincode: 560052,
  };

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.currentOrderObject = this.productsService.currentOrder;
    console.log(this.currentOrderObject);
  }

  onChangeQuantity(event: any) {
    console.log(event.target.value);
    this.currentOrderObject.quantity = parseInt(event.target.value);
  }

  onClickPlaceOrder() {
    let date = new Date();
    let deliveryDate = new Date(date.setDate(date.getDate() + 5));
    this.deliveryBy = `${deliveryDate.getDate()}/${deliveryDate.getMonth()}/${deliveryDate.getFullYear()}`;

    let order = {
      ...this.currentOrderObject,
      order_date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      expected_delivery_date: `${deliveryDate.getDate()}/${deliveryDate.getMonth()}/${deliveryDate.getFullYear()}`,
      totalPrice:
        this.currentOrderObject.price * this.currentOrderObject.quantity,
      deliveryAddress: this.address,
    };

    this.isOrderPlaced = true;
    this.productsService.setOrder(order);

    this.productsService.currentOrder = null;
    if (this.productsService.isProductInCart(order.id)) {
      this.productsService.deleteCartItem(order.id);
    }
    // console.log(this.currentOrderObject);
    // console.log(order);
  }
}
