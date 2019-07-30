import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/delay';


//import { HttpClient } from '@angular/common/http'; 

@Injectable()
export class UserService {
  //constructor(private httpClient: HttpClient) {}

  private listUsers: User[] = [
    {
      id: 1,
      name: 'Tom',
      email: 'thomasm1.maestas@gmail.com',
      phone: 5055087707,
      contactType: 'email',
      acquaintance: '5',
      dateOfBirth: new Date('2020-09-03'),
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
      dateOfBirth: new Date('1976-09-03'),
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
      dateOfBirth: new Date('1818-09-03'),
      isActive: false,
      photoPath: 'assets/images/s.png'
    }
  ];

  // getUsers(): Observable<User[]> {
  //   return this.httpClient.get<User[]>('http://localhost:3000/users')
  // }
  //getUsers(): User[] {
  // return this.listUsers;
  getUsers(): Observable<User[]> {
    return Observable.of(this.listUsers);
  }
  getUser(id: number): User {
    return this.listUsers.find(u => u.id === id)
  }
 
  save(user: User) {
    if (user.id === null) {
      const maxId = this.listUsers.reduce(function (u1, u2) {
        return (u1.id > u2.id) ? u1 : u2;
      }).id
      user.id = maxId + 1;
      this.listUsers.push(user);
    } else {
      const foundIdx = this.listUsers.findIndex(u => u.id === user.id);
      this.listUsers[foundIdx] = user;
    } 
  }
  
  deleteUser(id: number) {
    const i = this.listUsers.findIndex(u => u.id === id);
    if (i !== -1) {
      this.listUsers.splice(i, 1);
    }
  }
}