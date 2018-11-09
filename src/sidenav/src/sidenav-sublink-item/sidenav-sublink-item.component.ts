import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { sidenavAnimations } from '../sidenav-animations';
import { CdkAccordion } from '@angular/cdk/accordion';
import { Router } from '@angular/router';

@Component({
  selector: 'sidenav-sublink-item',
  templateUrl: './sidenav-sublink-item.component.html',
  styleUrls: ['./sidenav-sublink-item.component.scss'],
  animations: [
    sidenavAnimations.bodyExpansion,
    sidenavAnimations.indicatorRotate,
    sidenavAnimations.expansionHeaderHeight
  ]
})
export class SidenavSublinkItemComponent implements OnInit {

  @Input() subnavLinks;
  @Input() expanded;
  @Input() parentModule;
  @Input() activeModule;
  @Output() activePathChanges = new EventEmitter<any>();
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {
    console.log(this.subnavLinks)
  }

  _navigateToPath(nav: any){
    this.activePathChanges.emit(nav.path);
  }

}