import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private Router: Router, private toastr: ToastrService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // let user = JSON.parse(sessionStorage.getItem('currentuser')!)
    // const admin = user.isAdmin
    if (sessionStorage.getItem('currentuser')) {
      return true;
    } else {
      this.toastr.error('', "You haven't logged in");
      this.Router.navigate(['/login']);
      return false;
    }
  }
}
