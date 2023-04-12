import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

import { compareAsc, format } from 'date-fns';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent],
})
export class OrdersComponent implements OnInit {
  myCartCount: number = 0;
  myOrders: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.myOrders = this.productsService.myOrders;
    console.log(this.myOrders);
    this.myCartCount = this.productsService.getcartCount();
  }
}
