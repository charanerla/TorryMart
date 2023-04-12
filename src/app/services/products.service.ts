import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails, Product, CartProduct } from '../interfacesAndTypes';
import { catchError, map, retry, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { ServerError } from '../common/server-error';
import { NetworkError } from '../common/network-error';
import { BadRequestError } from '../common/badRequest-error';
import { NotFoundError } from '../common/notfound-error';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _cart: CartProduct[] = [];
  myOrders: any[] = [];
  currentOrder = null;
  constructor(private http: HttpClient) {}

  private handleError(error: Response) {
    if (error.status === 404) {
      return throwError(() => new NotFoundError());
    } else if (error.status === 400) {
      return throwError(() => new BadRequestError());
    } else if (error.status === 0) {
      return throwError(new NetworkError());
    } else if (error.status >= 500 && error.status <= 599) {
      return throwError(new ServerError());
    } else {
      return throwError(new AppError(error));
    }
  }

  get productsList() {
    return this.http.get('https://dummyjson.com/products').pipe(
      map((response) => response),
      retry(2),
      catchError(this.handleError)
    );
  }

  getSpecificProduct(id: number) {
    return this.http.get(`https://dummyjson.com/products/${id}`).pipe(
      map((response) => response),
      retry(2),
      catchError(this.handleError)
    );
  }

  getSpecificCategoryProducts(category: string) {
    console.log(category);
    return this.http
      .get(`https://dummyjson.com/products/category/${category}`)
      .pipe(
        map((response: any) => response.products),
        retry(2),
        catchError(this.handleError)
      );
  }

  get cart(): any | CartProduct[] {
    return this._cart;
  }

  set cart(obj: CartProduct) {
    let cartProductsIds = this._cart.map((cartProd) => cartProd.id);

    if (cartProductsIds.includes(obj.id)) {
      let updatedCart = this._cart.map((prod) => {
        if (prod.id === obj.id) {
          let updatedProd = { ...prod, quantity: prod.quantity + 1 };
          return updatedProd;
        }
        return prod;
      });
      this._cart = updatedCart;
    } else {
      this._cart.push(obj);
    }
  }

  getcartCount(): number {
    if (this._cart.length == 0) {
      return 0;
    } else {
      let count = 0;
      this._cart.map((obj) => {
        count += obj.quantity;
      });
      return count;
    }
  }

  deleteCartItem(id: number): void {
    let filteredCart = this._cart.filter((obj) => obj.id !== id);
    this._cart = filteredCart;
  }

  decreaseQuantity(id: number): void {
    let filteredCart = this._cart.map((obj) => {
      if (obj.id === id) {
        return { ...obj, quantity: obj.quantity - 1 };
      }
      return obj;
    });
    this._cart = filteredCart;
  }

  incrementQuantity(id: number): void {
    let filteredCart = this._cart.map((obj) => {
      if (obj.id === id) {
        return { ...obj, quantity: obj.quantity + 1 };
      }
      return obj;
    });
    this._cart = filteredCart;
  }

  isProductInCart(id: number): boolean {
    let cartItemIds = this._cart.map((obj) => obj.id);
    if (cartItemIds.includes(id)) {
      return true;
    }
    return false;
  }

  setOrder(obj: any) {
    console.log('in products service in setorder');
    this.myOrders.push(obj);
  }

  // get categoriesList() {
  //   return this.http.get('https://dummyjson.com/products/categories');
  // }
}
