import { PipeTransform, Pipe } from '@angular/core';
import { Person } from '../models/person.model';

@Pipe({
    name: 'personFilter',
    //pure: false // n. Bad news  - runs on every single change detection!!
})
export class PersonFilterPipe implements PipeTransform {
    private counter = 0;
    transform(persons: Person[], searchTerm: string): Person[] {
        this.counter++;
        //document.write('Filter pip executed count ' + this.counter);
        console.log('Filter pip executed count ' + this.counter);
        if (!persons || !searchTerm) {
            return persons;
        }
        return persons.filter(person => 
            person.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1); // look! don't touchc
    }
}


