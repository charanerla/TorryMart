import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/interfacesAndTypes';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServive } from 'src/app/services/users.service';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
})
export class ProfileComponent implements OnInit {
  myCartCount: number = 0;
  userDetails: UserDetails | null = { userName: '', password: '' };

  navItemsList = [
    {
      link: '/profile/orders',
      imgUrl:
        'https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png',
      heading: 'Your Orders',
      description: 'Track, return, or buy things again',
    },
    {
      link: '/profile/manage-account',
      imgUrl:
        'https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png',
      heading: 'Login & security',
      description: 'Edit login, name, and mobile number',
    },
    {
      link: '/profile/addresses',
      imgUrl:
        'https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png',
      heading: 'Your Addresses',
      description: 'Edit addresses for orders and gifts',
    },
    {
      link: '/profile/contact-us',
      imgUrl:
        'https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/contact_us._CB623781998_.png',
      heading: 'Contact Us',
      description: '',
    },
  ];

  constructor(
    private productsService: ProductsService,
    private usersService: UsersServive
  ) {}

  ngOnInit(): void {
    this.myCartCount = this.productsService.getcartCount();
    this.userDetails = this.usersService.loggedUserDetails();
    // console.log(this.userDetails);
  }
}
