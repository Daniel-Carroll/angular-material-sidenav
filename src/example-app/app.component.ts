import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import {MatSidenav} from '@angular/material';
import { SidenavRoutingTree } from './routing-tree';
import { SidenavService } from '../sidenav/src/sidenav.service';

export const SIDENAV_MODE_SIDE = "side";
export const SIDENAV_MODE_OVER = "over";
export const SIDENAV_MODE_PUSH = "push";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  @ViewChild('sidenav') public matSideNav: MatSidenav;
  sidenavMode: string;

  routingTree = SidenavRoutingTree.navLinks;
  
  name = 'Angular';

  constructor(private sidenavService: SidenavService){

  }

  ngOnInit(){
    this.sidenavService.setSidenav(this.matSideNav);

    // subscribe to mode changes
    this.sidenavService.getSidenavMode().subscribe( sidenavMode => {
      this.sidenavMode = sidenavMode;
    })
    // Set set sidenav mode behaviors based on breakpoint, optional.
    this.sidenavService.observeBreakpointsForSidenavMode(SIDENAV_MODE_OVER, SIDENAV_MODE_SIDE)
  }

  toggle(){
    this.sidenavService.toggle();
  }
}
