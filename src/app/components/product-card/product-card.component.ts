import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SummaryPipe } from 'src/app/customPipes/summary.pipe';
import { Product } from 'src/app/interfacesAndTypes';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, SummaryPipe],
})
export class ProductCardComponent implements OnInit {
  @Input('productDetails') productDetails: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    thumbnail: '',
    images: [],
    category: '',
  };
  @Output() change = new EventEmitter();

  isContentHidden: boolean = true;
  isProductAvailableInCart: boolean = false;

  constructor(private productService: ProductsService) {}
  ngOnInit(): void {
    this.isProductAvailableInCart = this.productService.isProductInCart(
      this.productDetails.id
    );
  }

  onClickAddToCart() {
    console.log(this.productDetails);
    this.isProductAvailableInCart = true;
    this.change.emit(this.productDetails);
  }
}
