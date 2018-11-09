import { Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter, 
  Inject, 
  SkipSelf, 
  Optional, 
  InjectionToken, 
  ChangeDetectorRef,
  ViewEncapsulation } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { SidenavService } from './sidenav.service';
import { Location } from '@angular/common';
import { AnimationEvent, trigger, transition, style, animate } from '@angular/animations';
import { sidenavAnimations } from './sidenav-animations';
import { CdkAccordionItem, CdkAccordion } from '@angular/cdk/accordion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { MatExpansionPanelState } from '@angular/material';
import { Router } from '@angular/router';

@Component({ 
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    sidenavAnimations.bodyExpansion,
    sidenavAnimations.indicatorRotate,
    sidenavAnimations.expansionHeaderHeight
  ],
  providers: [Location],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit{

  activePath: string;
  activeModule: string;
  isExpanded = false;
  handsetMode = false;
  @Input() routingTree;
  @Output() expansionToggle: EventEmitter<boolean> = new EventEmitter();

  constructor(
              private breakpointObserver: BreakpointObserver, 
              private sidenavService: SidenavService,
              private location: Location,
              private router: Router){
    this.activePath = location.path();
    this.activeModule = "";
  }

  ngOnInit(){
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).subscribe(result => {
      if(result.matches){
        this.isExpanded = true;
        this.handsetMode = true;
        this.sidenavService.close()
      }else{
        this.handsetMode = false;
        this.sidenavService.open()
      }
    })
    console.log(this)
  }

  _toggleSidenavExpansion(){
    this.expansionToggle.emit(this.isExpanded)
    return this.isExpanded = !this.isExpanded
  }

  _toggleSidenavOpenClose(){
    this.sidenavService.toggle();
  }

  updateActivePath(nav:any){
    this.activeModule = nav.module;
  }
}