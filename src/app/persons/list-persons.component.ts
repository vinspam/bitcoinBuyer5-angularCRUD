import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person.model';
//import { PersonService } from '../services/person.service';
import { Router, ActivatedRoute } from '@angular/router';

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
 
  // personToDisplay: Person;
  // private arrayIndex = 1;

  constructor(    //private _personService: PersonService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.persons = this._route.snapshot.data['personList'];
    // OBSERVABLE way: 
    // this._route.queryParamMap.subscribe((queryParams) => {
    //   if (queryParams.has('searchTerm')) {
    //     this.searchTerm = queryParams.get('searchTerm');
    //   } 
    //   else {
    //     this.filteredPersons = this.persons;
    //   } 
    // });
    // SNAPSHOT WAY:
    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    }
    else if (this._route.snapshot.queryParamMap.has('emailSearch')) {
      this.emailSearch = this._route.snapshot.queryParamMap.get('emailSearch');
    }
    else if (this._route.snapshot.queryParamMap.has('findPhoto')) {
      this.findPhoto = this._route.snapshot.queryParamMap.get('findPhoto');
    } else {
      this.filteredPersons = this.persons;
    }
  }

  ngOnInit() {
    //this.personToDisplay = this.persons[0];
    this.inputEmailDisplaySearch = "";
    //this.persons = this._personService.getPersons();
    //this._personService.getPersons().subscribe(persList => this.persons = persList); 

    //this.filteredPersons = this.persons;  

    console.log(this._route.snapshot.queryParamMap.has('searchTerm' || 'emailSearch' || 'findPhoto')); //true if param
    // console.log(this._route.snapshot.queryParamMap.get('searchTerm')); // returns value, (if not: null)
    // console.log(this._route.snapshot.queryParamMap.getAll('searchTerm')); //string array of all values
    console.log(this._route.snapshot.queryParamMap.keys); //returns string of ALL parameters
    console.log(this._route.snapshot.paramMap.keys); // required/optional paramater properties
  }
  clearInput(): void {
    this.emailSearch = '';
    this.searchTerm = '';
    this.findPhoto = '';
    // !! TODO: when returning on 2nd + search...How to erase query parameters to refresh filter-search
    this.inputEmailDisplaySearch = '';
    // this.filteredPersons = [] ;
  } 
 
}
