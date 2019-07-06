import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreatePersonComponent } from './create-person.component';

@Injectable()
export class CreatePersonCanDeactivateGuardService implements CanDeactivate<CreatePersonComponent> {
    canDeactivate(component: CreatePersonComponent):  boolean {
        if(component.createPersonForm.dirty) {
            return confirm('are you sure you want to discard you changes? :-)'); 
        }
            return true;
    }
} 