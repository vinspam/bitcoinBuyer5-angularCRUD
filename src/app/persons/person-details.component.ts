import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../services/person.service';
import { Person } from '../models/person.model';

@Component({
  selector: 'tm-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  @Output() notify: EventEmitter<Person> = new EventEmitter<Person>();
  private _id: number;
  // personList: Person[];
  person: Person; 
  constructor(private _route: ActivatedRoute, 
              private _personService: PersonService,
              private _router: Router) { }

  ngOnInit() {
    // const id = +this._route.snapshot.paramMap.get('id'); // deprecated < ng 4.3 params['id'];
      this._route.paramMap.subscribe(params => {
          this._id = +params.get('id'); 
          this.person = this._personService.getPerson(this._id);
          // this.personList = this._personService.getPersons();
    }); 
  }
   
  handleClick() {
    this.notify.emit(this.person);
  }
  viewNextPerson() {
     if(this._id < 3) {
    // if(this._id < this.personList.length) {
      this._id = this._id + 1;
    } else { 
      this._id = 1;
    }
    this._router.navigate(['/persons', this._id], {
      queryParamsHandling: 'merge'
    })
  }
}


