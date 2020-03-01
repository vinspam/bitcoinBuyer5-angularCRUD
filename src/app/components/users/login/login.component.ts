import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm } from '@angular/forms';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
// import { AlertService } from '../../../services/alert.service';
// import { FooterComponent } from '../../layout/footer/footer.component';
import { first } from 'rxjs/operators';  


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}
panelTitle = "Login"
  constructor(private _auth: AuthenticationService,
              private _router: Router) { }

  ngOnInit() {
  }
  
  
  loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/member-altcoins'])
      },
      err => console.log(err)
    )
  }

}
