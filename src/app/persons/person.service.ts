import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { e } from '@angular/core/src/render3';
//import { Observable } from 'rxjs/Observable';
//import { HttpClient } from '@angular/common/http'; 

@Injectable()
export class PersonService {
  //constructor(private httpClient: HttpClient) {}

  private listPersons: Person[] = [
    {
      id: 1,
      name: 'Tom', 
      email: 'thomasm1.maestas@gmail.com',
      phone: 5055087707, 
      contactType: 'email',
      acquaintance: '5',
      dateOfBirth: new Date('9/3/2020'), 
      isActive: true,
      photoPath: 'assets/images/a.png'
    },
    {
      id: 2,
      name: 'Thomas', 
      email: 'thomas@gmail.com',
      phone: 5055087707, 
      contactType: 'phone',
      acquaintance: '2',
      dateOfBirth: new Date('9/3/1976'), 
      isActive: true,
      photoPath: 'assets/images/d.png'
    },
    {
      id: 3,
      name: 'Milton', 
      email: 'milton@gmail.com',
      phone: 5055087707, 
      contactType: 'email',
      acquaintance: '3',
      dateOfBirth: new Date('9/3/2000'), 
      isActive: false,
      photoPath: 'assets/images/s.png'
    }
  ];

    // getPersons(): Observable<Person[]> {
    //   return this.httpClient.get<Person[]>('http://localhost:3000/persons')
    // }
  getPersons(): Person[] {
    return this.listPersons;
  }
  getPerson(id: number): Person {
    return this.listPersons.find(e => e.id === id)
  }
  save(person: Person) {
    this.listPersons.push(person);
  }
 

}
