import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersServive } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private userService: UsersServive, private router: Router) {}
  canActivate() {
    if (this.userService.isUserLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
