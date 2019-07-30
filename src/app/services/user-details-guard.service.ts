import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserDetailsGuardService implements CanActivate {
    constructor(private _userService:UserService,
        private _router:Router) {

        }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const userFound = !!this._userService.getUser(+route.paramMap.get('id'));

        if (userFound) {
            return true;
        } else {
            this._router.navigate(['notfound']);
            return false;
        }
    }
}