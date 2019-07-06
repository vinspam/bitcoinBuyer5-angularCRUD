import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; // , OnChanges, SimpleChanges
import { Person } from '../models/person.model';

@Component({
  selector: 'tm-display-person',
  templateUrl: './display-person.component.html',
  styleUrls: ['./display-person.component.css']
})

export class DisplayPersonComponent implements OnInit {   //, OnChanges 
  @Input() person: Person;
  @Output() notify: EventEmitter<Person> = new EventEmitter<Person>();

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

  constructor() { }

  ngOnInit() {
  }
  getPersonNameAndEmail(): string {
    return this.person.name + ', Email:  ' + this.person.email ;
  }
  handleClick() {
    this.notify.emit(this.person);
  }
}
