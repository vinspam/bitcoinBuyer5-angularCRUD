import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Acquaintance } from '../models/acquaintance.model'; 
import { Person } from '../models/person.model';
import { PersonService } from './person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tm-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent implements OnInit {
  //contactType="email";
  //isActive=true
  previewPhoto = false;
  dateOfBirth: Date = new Date(2018,0,30)
  @ViewChild('personForm') public createPersonForm: NgForm;
  
  person: Person = {
    id: null,
    name: null, 
    email: '', 
    phone: null, 
    contactType: null, 
    acquaintance: null, 
    dateOfBirth: null, 
    isActive: null,
    photoPath: null

  }; 

  acquaintances: Acquaintance[] = [  
    {id:1, name: 'Pre College'},
    {id:2, name: 'College'},
    {id:3, name: 'Ed Work'},
    {id:4, name: 'Tech Work'},
    {id:5, name: 'Clubs &amp; Groups'},
    {id:6, name: 'Miscellaneous'} 
  ];
  constructor(private _personService: PersonService, private _router: Router) {
    // this.dataPickerConfig = Object.assign({}, 
    //   {
    //     containerClass: 'theme-dark-blue',
    //     showWeekNumbers: true,
    //     minDate: new Date(2018, 0,1),
    //     maxDate: new Date(2018, 11,31),
    //     dateInputFormat: 'DD/MM/YYYY'
    //   });
  }

  ngOnInit() {
  }
  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }
  savePerson(): void { 
    const newPerson: Person = Object.assign ({}, this.person);
    this._personService.save(newPerson); 
    this.createPersonForm.reset();
    this._router.navigate(['/']);
  }
}
