import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersServive } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
  constructor(private router: Router, private usersService: UsersServive) {}
  canActivate() {
    if (this.usersService.isUserLoggedIn()) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
