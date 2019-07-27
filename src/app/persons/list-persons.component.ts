import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person.model';
import { PersonService } from './person.service';
import { Router, } from '@angular/router'; 

@Component({
  // selector: 'tm-list-persons',
  templateUrl: './list-persons.component.html',
  styleUrls: ['./list-persons.component.css']
})
export class ListPersonsComponent implements OnInit {
  inputEmailDisplaySearch: string;
  persons: Person[];
  filteredPersons: Person[]; //muyimprtante - no need to query webserver for each filter; returns full list without roundtrip


  private _searchTerm: string;
  private _emailSearch: string;
  private _findPhoto: string;

  get searchTerm(): string {
    return this._searchTerm;
  }  
  get emailSearch(): string {
    return this._emailSearch;
  }
  get findPhoto(): string {
    return this._findPhoto;
  }  

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredPersons = this.nameFilterPersons(value);
  }
  set emailSearch(value: string) {
    this._emailSearch = value;
    this.filteredPersons = this.emailfilterPersons(value);
  }
  set findPhoto(value: string) {
    this._findPhoto = value;
    this.filteredPersons = this.photoFilterPersons(value);
  }

  nameFilterPersons(searchString: string) {
    return this.persons.filter(person => person.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  emailfilterPersons(searchString: string) {
    return this.persons.filter(person => person.email.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  photoFilterPersons(searchString: string) {
    return this.persons.filter(person => person.photoPath.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  //searchTerm: string;

  dataFromChild: Person;
  // personToDisplay: Person;
  // private arrayIndex = 1;
  
  constructor(private _personService: PersonService, 
              private _router: Router) { }

  ngOnInit() {
    this.inputEmailDisplaySearch = "";
    this.persons = this._personService.getPersons();
    this.filteredPersons = this.persons; 
    //this.personToDisplay = this.persons[0];
  }
  clearInput():void {
    this.emailSearch = '';
    this.searchTerm = '';
    this.findPhoto = '';

    this.inputEmailDisplaySearch = '';
    // this.filteredPersons = [] ;
  }
  handleNotify(eventData: Person) {
    this.dataFromChild = eventData;
  }
  onClick(personId: number) {
    this._router.navigate(['/persons', personId], {  queryParams: { 'searchTerm':this.searchTerm, 'emailSearch':this.emailSearch, 'findPhoto':this.findPhoto }
    })
  }

// Query paramets when want parameters on route to be optional and to retain across multip.e routes, NOT part of route pattern matchaing



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
