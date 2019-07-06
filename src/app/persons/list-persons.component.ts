import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person.model';
import { PersonService } from './person.service';
import { Router } from '@angular/router'; 

@Component({
  // selector: 'tm-list-persons',
  templateUrl: './list-persons.component.html',
  styleUrls: ['./list-persons.component.css']
})
export class ListPersonsComponent implements OnInit {
  emailSearch: string;
  persons: Person[];
  filteredPersons: Person[]; //muyimprtante - no need to query webserver for each filter; returns full list without roundtrip

  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }  

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredPersons = this.filterePersons(value);
  }
  filterePersons(searchString: string) {
    return this.persons.filter(person => person.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  //searchTerm: string;

  dataFromChild: Person;
  // personToDisplay: Person;
  // private arrayIndex = 1;
  
  constructor(private _personService: PersonService, 
              private _router: Router) { }

  ngOnInit() {
    this.emailSearch = "";
    this.persons = this._personService.getPersons();
    this.filteredPersons = this.persons;
    //this.personToDisplay = this.persons[0];
  }
  handleNotify(eventData: Person) {
    this.dataFromChild = eventData;
  }
  onClick(personId: number) {
    this._router.navigate(['/persons', personId])
  }
  // //cards scroll-through design below-  (other parts in display-person.comp)
  // nextPerson(): void {
  //   if(this.arrayIndex <= 2) {
  //     this.personToDisplay = this.persons[this.arrayIndex];
  //     this.arrayIndex++; 
  //   } else {
  //     this.personToDisplay = this.persons[0];
  //     this.arrayIndex = 1;
  //   }
  // }
}
