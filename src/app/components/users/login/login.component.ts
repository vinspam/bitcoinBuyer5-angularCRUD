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
    selector: 'tm-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    // loginUserData = {}

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private _router: Router,
        private _auth: AuthenticationService,
        // private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this._auth.currentUserValue) {
            this._router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    // onSubmit() {
    //     this.submitted = true;

    //     // reset alerts on submit
    //     // this.alertService.clear();

    //     // stop here if form is invalid
    //     if (this.loginForm.invalid) {
    //         return;
    //     }

    //     this.loading = true;

    //     this._auth.login(this.f.username.value, this.f.password.value)
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this._router.navigate([this.returnUrl]);
    //             },
    //             error => {
    //                 // this.alertService.error(error);
    //                 this.loading = false;
    //             });
    // }

    // loginUser() {
    onSubmit() {  
    if(this.loginForm.invalid) {
        return;
    }

        this.loading = true;

this.submitted = true;
this._auth.loginUser(this.loginForm.controls) //(this.loginUserData)
    .subscribe(
        res => {
            this.loading = false;
            localStorage.setItem('token', res.token)
            this._router.navigate(['/member-altcoins'])
        },
        err => console.log(err)
    )
    }
}
