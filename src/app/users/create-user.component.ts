import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Acquaintance } from '../models/acquaintance.model'; 
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tm-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  //contactType="email";
  //isActive=true
  datePickerConfig:any;
  previewPhoto = false;
  panelTitle:string;
  dateOfBirth: Date = new Date(2018,0,30)
  @ViewChild('userForm') public createUserForm: NgForm;
  
  user: User;

  acquaintances: Acquaintance[] = [  
    {id:1, name: 'Pre College'},
    {id:2, name: 'College'},
    {id:3, name: 'Ed Work'},
    {id:4, name: 'Tech Work'},
    {id:5, name: 'Clubs &amp; Groups'},
    {id:6, name: 'Miscellaneous'} 
  ];
  constructor(private _userService: UserService, 
              private _router: Router,
              private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({}, 
      {
        containerClass: 'theme-dark-blue',
        // showWeekNumbers: true,
        // minDate: new Date(2018, 0,1),
        // maxDate: new Date(2018, 11,31),
        dateInputFormat: 'yyyy-MM-dd'
      });
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getUser(id);
    })
  }

  private getUser(id) {
    if(id===0) {
      this.user  = {
        id: null,
        name: null, 
        email: '', 
        phone: null, 
        contactType: null, 
        acquaintance: null, // 'select'
        dateOfBirth: null, 
        isActive: null,
        photoPath: null 
      }; 
      this.panelTitle = 'Add New Contact';
      this.createUserForm.reset();
    } else {
      this.user = Object.assign({}, this._userService.getUser(id));
      this.panelTitle = 'Edit Contact';
    }
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }
  saveUser(): void { 
    const newUser: User = Object.assign ({}, this.user);
    this._userService.save(newUser); 
    this.createUserForm.reset();
    this._router.navigate(['/']);
  }
}
