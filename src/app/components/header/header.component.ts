import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';
import { UsersServive } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule],
})
export class HeaderComponent implements OnInit {
  @Input('myCartCount') myCartCount: number = 0;
  userName: string | undefined = '';

  constructor(private _route: Router, private userService: UsersServive) {}

  ngOnInit(): void {
    this.userName = this.userService.loggedUserDetails()?.userName;
  }

  logout() {
    localStorage.removeItem('user_details');
    this._route.navigate(['']);
  }
}
