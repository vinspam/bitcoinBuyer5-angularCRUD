import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from './person.service';
import { Person } from '../models/person.model';

@Component({
  selector: 'tm-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  private _id: number;
  person: Person; 
  constructor(private _route: ActivatedRoute, 
              private _personService: PersonService,
              private _router: Router) { }

  ngOnInit() {
      this._route.paramMap.subscribe(params => {
      this._id = +params.get('id'); 
      this.person = this._personService.getPerson(this._id);
    }); // .snapshot.paramMap.get('id'); // deprecated < ng 4.3 params['id'];
  }
   
  viewNextPerson() {
    if(this._id < 3) {
      this._id = this._id + 1;
    } else { 
      this._id = 1;
    }
    this._router.navigate(['/persons', this._id])
  }
}
