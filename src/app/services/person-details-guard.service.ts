import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonService } from './person.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PersonDetailsGuardService implements CanActivate {
    constructor(private _personService:PersonService,
        private _router:Router) {

        }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const personFound = !!this._personService.getPerson(+route.paramMap.get('id'));

        if (personFound) {
            return true;
        } else {
            this._router.navigate(['notfound']);
            return false;
        }
    }
}