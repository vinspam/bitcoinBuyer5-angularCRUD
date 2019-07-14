import { Component, OnInit, HostBinding } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'tm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @HostBinding('class.is-open')
  isOpen = false;
  
  constructor(
    private sidebarService: SidebarService
  ) { 
  }

  ngOnInit() {
    this.sidebarService.change.subscribe(isOpen => {
      this.isOpen = isOpen
    })
  }

}
