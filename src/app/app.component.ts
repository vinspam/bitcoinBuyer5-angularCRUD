import { Component } from '@angular/core';
import 'lodash';

declare var _: any;

@Component({
  selector: 'tm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tm';

  constructor() {
    const array = [1,2,3];
    console.log(_.shuffle(array)); 
  }
}
