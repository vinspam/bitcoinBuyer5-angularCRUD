import { Component, OnInit, Input  } from '@angular/core'; // , OnChanges, SimpleChanges
import { Person } from '../models/person.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tm-display-person',
  templateUrl: './display-person.component.html',
  styleUrls: ['./display-person.component.css']
})

export class DisplayPersonComponent implements OnInit {   //, OnChanges 
   private selectedPersonId: number;
  @Input() person: Person;

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

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedPersonId = +this._route.snapshot.paramMap.get('id');
  }
  getPersonNameAndEmail(): string {
    return this.person.name + ', Email:  ' + this.person.email ;
  }
}
