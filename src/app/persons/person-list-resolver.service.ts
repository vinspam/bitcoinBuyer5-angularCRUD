// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Person } from '../models/person.model';
// import { Observable } from 'rxjs/Observable';
// import { PersonService } from './person.service';
// import { Injectable } from '@angular/core';

// @Injectable()
// export class PersonListResolverService implements Resolve<Person[]> {
//     constructor(private _personService: PersonService) {}

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Person[]> {
//         return this._personService.getPersons();
//     }
// }