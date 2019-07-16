import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';  
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppComponent } from './app.component';
import { ListPersonsComponent } from './persons/list-persons.component';
import { CreatePersonComponent } from './persons/create-person.component';
import { PersonService } from './persons/person.service';

import { DisplayPersonComponent } from './persons/display-person.component';
import { CreatePersonCanDeactivateGuardService } from './persons/create-person-can-deactivate-guard.service';
import { PersonDetailsComponent } from './persons/person-details.component';
import { PersonFilterPipe } from './persons/person-filter.pipe';
import { AnimationsComponent } from './animations/animations.component';
import { ArraymakerComponent } from './arraymaker/arraymaker.component';
import { TestingBtnComponent } from './testing-btn/testing-btn.component';

import { SidebarComponent } from './layout/sidebar.component';
import { SidebarService } from './layout/sidebar.service';
import { SidebarToggleComponent } from './layout/sidebar-toggle.component';
import { DetailbarToggleComponent } from './layout/detailbar-toggle.component';
import { DetailbarComponent } from './layout/detailbar.component'; 

const tmRoutes: Routes = [
  { path: '', component: ListPersonsComponent},

  { path: 'create', 
  component: CreatePersonComponent,
  canDeactivate: [CreatePersonCanDeactivateGuardService]},

  { path: 'persons/:id', 
  component: PersonDetailsComponent},

  { path: 'animations', 
  component: AnimationsComponent},
  
  { path: 'data', 
  component: ArraymakerComponent},
  

  { path: '', redirectTo: '/', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent, 
    ListPersonsComponent,
    CreatePersonComponent,
    DisplayPersonComponent,
    PersonDetailsComponent,
    PersonFilterPipe,
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
    RouterModule.forRoot(tmRoutes)
  ],
  providers: [PersonService, SidebarService, CreatePersonCanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
