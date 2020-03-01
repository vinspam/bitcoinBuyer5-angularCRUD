import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { UserFilterPipe } from './shared/user-filter.pipe';
import { PageNotFoundComponent } from './shared/page-not-found.component';

import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
// import { FooterComponent } from '../../layout/footer/footer.component';
import { UserService } from './services/user.service';
import { UserListResolverService } from './services/user-list-resolver.service';
import { CreateUserCanDeactivateGuardService } from './services/create-user-can-deactivate-guard.service';
import { UserDetailsGuardService } from './services/user-details-guard.service';
import { SidebarService } from './components/layout/sidebar.service';
import { CoinService } from './services/coin.service';

import { AppComponent } from './app.component';
import { ListUsersComponent } from './components/users/list-users.component';
import { CreateUserComponent } from './components/users/register/create-user.component';
import { DisplayUserComponent } from './components/users/display-user.component';
import { UserDetailsComponent } from './components/users/user-details.component';

import { AnimationsComponent } from './animations/animations.component';
 
import { TestingBtnComponent } from './shared/testing-btn/testing-btn.component';
import { SidebarComponent } from './components/layout/sidebar.component';
import { SidebarToggleComponent } from './components/layout/sidebar-toggle.component';
import { DetailbarToggleComponent } from './components/layout/detailbar-toggle.component';
import { DetailbarComponent } from './components/layout/detailbar.component';
import { AccordionComponent } from './components/layout/accordion.component';
import { LoginComponent } from './components/users/login/login.component';
import { CoinsComponent } from './components/coins/coins.component';
import { MemberAltcoinsComponent } from './components/coins/member-altcoins.component';
import { ProfileComponent } from './components/users/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    CreateUserComponent,
    DisplayUserComponent,
    UserDetailsComponent,
    PageNotFoundComponent,
    UserFilterPipe,
    SelectRequiredValidatorDirective,
    AnimationsComponent, 
    TestingBtnComponent,
    SidebarComponent,
    SidebarToggleComponent,
    DetailbarToggleComponent,
    DetailbarComponent,
    AccordionComponent,
    LoginComponent,
    CoinsComponent,
    MemberAltcoinsComponent,
    ProfileComponent
  ],
  imports: [ 
    BrowserModule, 
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    AppRoutingModule
    // RouterModule.forRoot(tmRoutes, { enableTracing: false })
  ],
  providers: [
    UserService,
    CoinService,
    AuthenticationService,
    AlertService,
    SidebarService,
    CreateUserCanDeactivateGuardService,
    UserDetailsGuardService,
    UserListResolverService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
