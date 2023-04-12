import { Component, OnInit } from '@angular/core';
import { UsersServive } from 'src/app/services/users.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserDetails, Product, CartProduct } from '../../../interfacesAndTypes';
import { AppError } from 'src/app/common/app-error';
import { NetworkError } from 'src/app/common/network-error';
import { ServerError } from 'src/app/common/server-error';
import { BadRequestError } from 'src/app/common/badRequest-error';
import { NotFoundError } from 'src/app/common/notfound-error';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { ProductCardComponent } from '../../product-card/product-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProductCardComponent, FormsModule],
})
export class HomeComponent implements OnInit {
  myCartCount: number = 0;
  loginUser: UserDetails | null | undefined;
  categoriesList: string[] = [
    'smartphones',
    'home-decoration',
    'groceries',
    'fragrances',
    'laptops',
    'skincare',
  ];
  products: Product[] = [];
  isDataFetching: boolean = true;
  displayProductsList: Product[] = [];

  filters: { category: string; searchValue: string } = {
    category: 'selectCategory',
    searchValue: '',
  };

  constructor(
    private service: UsersServive,
    private productsService: ProductsService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginUser = this.service.loggedUserDetails();
    this.myCartCount = this.productsService.getcartCount();
    this.fetchProducts();
    // console.log(this.loginUser);
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

  private fetchProducts() {
    this.productsService.productsList.subscribe(
      (res: any) => {
        // console.log(res.products);
        this.isDataFetching = false;
        this.products = res.products;
        this.displayProductsList = res.products;
      },
      (error: AppError) => {
        this.isDataFetching = true;
        this.handleError(error);
      }
    );
  }

  // private fetchCategories() {
  //   this.productsService.categoriesList.subscribe((res: any) => {
  //     this.categoriesList = res;
  //     console.log(this.categoriesList);
  //   });
  // }

  cartCount() {
    this.myCartCount = this.productsService.getcartCount();
  }

  addToCart(obj: Product) {
    let newObj: CartProduct = { ...obj, quantity: 1 };
    this.productsService.cart = newObj;
    this.cartCount();
    this.toastr.success('Successfully added to cart');
    console.log(this.productsService.cart);
  }

  updateDisplayProductsList() {
    if (
      this.filters.category === 'selectCategory' &&
      this.filters.searchValue === ''
    ) {
      this.displayProductsList = [...this.products];
    } else if (
      this.filters.category !== 'selectCategory' &&
      this.filters.searchValue === ''
    ) {
      this.displayProductsList = this.products.filter(
        (obj) => obj.category === this.filters.category
      );
    } else if (
      this.filters.category !== 'selectCategory' &&
      this.filters.searchValue !== ''
    ) {
      this.displayProductsList = this.products.filter(
        (obj) =>
          obj.category === this.filters.category &&
          obj.title
            .toLowerCase()
            .includes(this.filters.searchValue.toLowerCase())
      );
    } else if (
      this.filters.category === 'selectCategory' &&
      this.filters.searchValue !== ''
    ) {
      this.displayProductsList = this.products.filter((obj) =>
        obj.title.toLowerCase().includes(this.filters.searchValue.toLowerCase())
      );
    }
  }

  onCategoryChange(e: any) {
    this.filters.category = e.target.value;
    this.updateDisplayProductsList();
  }

  onClickSearch() {
    this.updateDisplayProductsList();
  }

  resetFilters() {
    this.filters = { searchValue: '', category: 'selectCategory' };
    this.updateDisplayProductsList();
  }

  trackCategory(index: number, category: string) {
    return category ? category : undefined;
  }

  trackProduct(index: number, product: Product) {
    return product ? product.id : undefined;
  }
}
