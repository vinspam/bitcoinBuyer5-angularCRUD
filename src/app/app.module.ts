import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
// import { PersonFilterPipe } from './shared/person-filter.pipe';
import { PageNotFoundComponent } from './shared/page-not-found.component';

import { PersonService } from './services/person.service';
import { PersonListResolverService } from './services/person-list-resolver.service';
import { CreatePersonCanDeactivateGuardService } from './services/create-person-can-deactivate-guard.service';
import { PersonDetailsGuardService } from './services/person-details-guard.service';
import { SidebarService } from './layout/sidebar.service';

import { AppComponent } from './app.component';
import { ListPersonsComponent } from './persons/list-persons.component';
import { CreatePersonComponent } from './persons/create-person.component';
import { DisplayPersonComponent } from './persons/display-person.component';
import { PersonDetailsComponent } from './persons/person-details.component';

import { AnimationsComponent } from './animations/animations.component';
import { ArraymakerComponent } from './arraymaker/arraymaker.component';
import { TestingBtnComponent } from './testing-btn/testing-btn.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarToggleComponent } from './layout/sidebar-toggle.component';
import { DetailbarToggleComponent } from './layout/detailbar-toggle.component';
import { DetailbarComponent } from './layout/detailbar.component';


const tmRoutes: Routes = [
  {
    path: '',
    component: ListPersonsComponent,
    resolve: { personList: PersonListResolverService }
  },

  {
    path: 'list',
    component: ListPersonsComponent,
    resolve: { personList: PersonListResolverService }
  },

  {
    path: 'create',
    component: CreatePersonComponent,
    canDeactivate: [CreatePersonCanDeactivateGuardService]
  },

  {
    path: 'persons/:id',
    component: PersonDetailsComponent,
    canActivate: [PersonDetailsGuardService] 
  },

  {
    path: 'animations',
    component: AnimationsComponent
  },

  {
    path: 'data',
    component: ArraymakerComponent
  },

  { path: 'notfound', component: PageNotFoundComponent },

  { path: '**', redirectTo: '/', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    ListPersonsComponent,
    CreatePersonComponent,
    DisplayPersonComponent,
    PersonDetailsComponent,
    PageNotFoundComponent,
    //PersonFilterPipe,
    SelectRequiredValidatorDirective,
    AnimationsComponent,
    ArraymakerComponent,
    TestingBtnComponent,
    SidebarComponent,
    SidebarToggleComponent,
    DetailbarToggleComponent,
    DetailbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(tmRoutes, { enableTracing: false })
  ],
  providers: [PersonService,
    SidebarService,
    CreatePersonCanDeactivateGuardService,
    PersonDetailsGuardService,
    PersonListResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
