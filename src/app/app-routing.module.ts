import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/users/profile/profile.component';
import { LoginComponent } from './components/users/login/login.component';
import { CreateUserComponent } from './components/users/register/create-user.component'; 
import { CoinsComponent } from './components/coins/coins.component';
import { MemberAltcoinsComponent } from './components/coins/member-altcoins.component';

import { UserDetailsComponent } from './components/users/user-details.component';
import { ListUsersComponent } from './components/users/list-users.component';
import { AnimationsComponent } from './animations/animations.component';
 
import { PageNotFoundComponent } from './shared/page-not-found.component';

import { AuthGuardService } from './services/auth.guard.service';
import { UserListResolverService } from './services/user-list-resolver.service';
import { CreateUserCanDeactivateGuardService } from './services/create-user-can-deactivate-guard.service';
import { UserDetailsGuardService } from './services/user-details-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/coins',
    pathMatch: 'full'
  },
  {
    path: 'coins',
    component: CoinsComponent
  },
  {
    path: 'member-altcoins',
    canActivate: [AuthGuardService],
    component: MemberAltcoinsComponent
  }, 
  {
    path: 'users', 
    component: ListUsersComponent,
    resolve: { userList: UserListResolverService }
  }, 
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    canActivate: [UserDetailsGuardService]
  }, 
  {
    path: 'coins',
    component: CoinsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: CreateUserComponent,
    canDeactivate: [CreateUserCanDeactivateGuardService]
  },  
  {
    path: 'edit/:id',
    component: CreateUserComponent,
    canDeactivate: [CreateUserCanDeactivateGuardService]
  }, 
  {
    path: 'list',
    component: ListUsersComponent,
    resolve: { userList: UserListResolverService }
  }, 
  {
    path: 'animations',
    component: AnimationsComponent
  },   
  { path: 'notfound', component: PageNotFoundComponent }, 
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
