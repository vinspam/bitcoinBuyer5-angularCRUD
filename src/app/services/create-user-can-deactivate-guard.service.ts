import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateUserComponent } from '../components/users/register/create-user.component';

@Injectable()
export class CreateUserCanDeactivateGuardService implements CanDeactivate<CreateUserComponent> {
    canDeactivate(component: CreateUserComponent):  boolean {
        if(component.createUserForm.dirty) {
            return confirm('are you sure you want to discard you changes? :-)'); 
        }
            return true;
    }
} 