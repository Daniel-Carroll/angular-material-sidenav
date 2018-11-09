import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewEncapsulation, } from '@angular/core';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { MatAccordion, MatExpansionPanelState, matExpansionAnimations } from '@angular/material';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { sidenavAnimations } from '../sidenav-animations';

@Component({
  selector: 'sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  animations: [
    sidenavAnimations.indicatorRotate,
    matExpansionAnimations.expansionHeaderHeight, 
    matExpansionAnimations.bodyExpansion
  ]
})
export class SidenavItemComponent extends CdkAccordionItem implements OnInit {
  accordion: MatAccordion;
  router: Router;
  @Input() activeModule: string;
  @Input() isExpanded;
  @Input() nav;
  @Output() activePathChange = new EventEmitter<any>();


  constructor(accordion: MatAccordion, 
    _changeDetectorRef: ChangeDetectorRef, 
    _uniqueSelectionDispatcher: UniqueSelectionDispatcher,
    router: Router) { 
    super(accordion, _changeDetectorRef, _uniqueSelectionDispatcher);
    this.accordion = accordion;
    this.router = router;
  }

  ngOnInit() {
    //allows for multiple navs to be expanded at once
    this.accordion.multi = true;
  }

  _navigateToPath(nav: any){
    this.router.navigateByUrl(nav.path)
    this.activePathChange.emit(nav);
  }

  /**
   * Wraps the accordion toggle
   * function
   * @param subnav 
   */
  _toggleSubnavExpansion(subnav: any){
    this.toggle()
  }

  getExpandedState(): MatExpansionPanelState {
    return this.expanded ? 'expanded' : 'collapsed';
  }

}