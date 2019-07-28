import { Component, OnInit, Input  } from '@angular/core'; // , OnChanges, SimpleChanges
import { Person } from '../models/person.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tm-display-person',
  templateUrl: './display-person.component.html',
  styleUrls: ['./display-person.component.css']
})

export class DisplayPersonComponent implements OnInit {   //, OnChanges 
   private selectedPersonId: number;
  @Input() person: Person;
  @Input() searchTerm: string;
  @Input() emailSearch: string;
  @Input() findPhoto: string;

   // //cards scroll-through design below- (other parts in list-person.comp)

  // @Input() personId: number;
  // private _person: Person; 
  
  // @Input()
  // set person(val: Person) {
  //   console.log('Previous : ' + (this._person ? this._person.name : 'NULL'));
  //   console.log('Current : ' + (val.name));
  //   this._person = val;
  // }
  // get person(): Person {
  //   return this._person;
  // }
  
  // ngOnChanges(changes: SimpleChanges) {
  //   for (const propName of Object.keys(changes)) {
  //     console.log(propName); // output is ... person
  //     const change = changes[propName];
  //     const from = JSON.stringify(change.previousValue);
  //     const to = JSON.stringify(change.currentValue);
  //     console.log(propName + ' changed from ' + from + 'to' + to)
  //   }
  // }

  constructor(private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this.selectedPersonId = +this._route.snapshot.paramMap.get('id');
  }
  viewPerson() {
    this._router.navigate(['/persons', this.person.id], {
      queryParams: { 'searchTerm': this.searchTerm, 'emailSearch': this.emailSearch, 'findPhoto': this.findPhoto } 
  // parameters on route optional, retain across multip.e rtes, NOT part of rte ptrn matching 
    })
  }
  editPerson() {
    this._router.navigate(['/edit', this.person.id]); 
  }

}
