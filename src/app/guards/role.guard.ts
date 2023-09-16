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
export class RoleGuard implements CanActivate {
  constructor(private Router: Router, private toastr: ToastrService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user = JSON.parse(sessionStorage.getItem('currentuser')!);
    const admin = user.isAdmin;
    if (admin) {
      // this.Router.navigate(['dashboard']);
      return true;
    } else {
      this.toastr.error('', 'Unauthorized Access!');
      this.Router.navigate(['home']);
      return false;
    }
  }
}
