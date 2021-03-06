# Angular Material Sidenav


Just a nice little sidenav that has a couple of nice functionalities baked in. I use it on a few
projects so i figured i would upload it to npm


## Installation
```
npm install responsive-angular-sidenav --save
```

## How to set up

Step 1:

import the ReactiveSidenavModule into either your AppModule or one of your 
shared modules (recommended). You will also need the MatSidenavModule and BrowserAnimationsModule from Angular Material.

```Typescript
import { ResponsiveSidenavModule } from 'responsive-angular-sidenav'
import { MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    ...
    imports: [
        ResponsiveSidenavModule,
		MatSidenavModule ,
		BrowserAnimationsModule
    ]
})
```

Step 2: configure the navigation tree. This is a typescript file that is custom to your project, just set it up 
with the structure below and import it into your app component to pass down to the sidenav as an input.

**label** is the label that will be displayed on the subnav to the user

**icon** leverages the Google Material Icons at https://material.io/tools/icons/?style=baseline

**path** is the attribute that will be used for routerLink navigation.

**module** refers to the top level navigation that the optional sublinks belong to.

**subnavExpanded** is the boolean that will be toggled when user clicks on subnav arrow

**subnavs** follow same structure as top level navs. icons on subnavs are optional.

```Typescript
export class SidenavRoutingTree{

public static navLinks = [
    {
      label: "Photos",
      path: "/driver",
      icon: "camera",
      module: "menuItem1",
    },
    {
      label: "Map",
      path: "/driver",
      icon: "language",
      module: "menuItem2",
      subnavExpanded: false,
        subnavState: 'collapsed',
        subnav: [{
            label: "Zone",
            path: "/zones",
            icon: "location_on"
          },{
            label: "City",
            path: "/city"
          }]
    },
    {
      label: "Travel",
      path: "/driver",
      icon: "work_outline",
      module: "menuItem3",
    }
  ]
}
```

Step 3:

update app.component to initialize sidenav service

add tag for sidenav component, this will be wrapped by the Angular Material <mat-sidenav></mat-sidenav> component
```html
<mat-sidenav  #sidenav [mode]="sidenavMode" opened="true" class="sidenav-background">
    	<sidenav [routingTree]="routingTree"></sidenav>
</mat-sidenav>
```

Configure the sidenav in app.component.ts
```Typescript
import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import {MatSidenav} from '@angular/material';
import { SidenavRoutingTree } from './routing-tree';
import { SidenavService } from 'responsive-angular-sidenav';

// Sidenav mode constants
export const SIDENAV_MODE_SIDE = "side";
export const SIDENAV_MODE_OVER = "over";
export const SIDENAV_MODE_PUSH = "push";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  // ViewChild decorator to access sidenav from component
  @ViewChild('sidenav') public matSideNav: MatSidenav;
  // sidenavMode string used to control the mode of sidenav
  sidenavMode: string;
  // routingTree will be used to build out navigation links on the sidenav
  routingTree = SidenavRoutingTree.navLinks;

  constructor(private sidenavService: SidenavService){

  }

  ngOnInit(){
    // set the sidenav, service can be used appwide to control sidenav
    this.sidenavService.setSidenav(this.matSideNav);

    // subscribe to mode changes
    this.sidenavService.getSidenavMode().subscribe( sidenavMode => {
      this.sidenavMode = sidenavMode;
    })
    // Set sidenav mode behaviors based on breakpoint, optional.
    this.sidenavService.observeBreakpointsForSidenavMode(SIDENAV_MODE_OVER, SIDENAV_MODE_SIDE)
  }

  // use the sidenav toggle method to completely hide sidenav if you desire
  toggle(){
    this.sidenavService.toggle();
  }
}
```

Step 4:

add theme file at the root of your application and import angular theming
and sidenav theme

```scss
@import '~@angular/material/theming';
@import 'responsive-angular-sidenav/_theme.scss';

// Define the default theme (same as the example above).
$app-primary: mat-palette($mat-blue, 700);
$app-accent: mat-palette($mat-teal, 500);
$app-warn: mat-palette($mat-red, 400);

$app-theme: mat-light-theme($app-primary, $app-accent, $app-warn);


// Include the default theme styles.
@include angular-material-theme($app-theme);

/**
* Theme for sidenav
*/
$sidenav-primary-color: mat-palette($mat-orange, 700);
$is-dark-theme:  false;
$theme: reactive-sidenav-theme($app-primary, $is-dark-theme);

@include sidenav-theme($theme);
```

## Sidenav Service API

**setSidenav(sidenav: MatSidenav)**

Method that is used to set your sidenav. Allows you to access the sidenav through the service
across the entire application.

**open(): Promise<MatDrawerToggleResult>**
	
Opens the sidenav drawer

**close(): Promise<MatDrawerToggleResult>**
	
Closes the sidenav drawer

**getSidenavMode(): Observable<string>**
	
Returns an observable that will emit sidenav mode changes to subscribers

**setSidenavMode(sidenavMode: "side" | "push" | "over")**

Allows you to set sidenav mode to either side, push, or over. Will emit value upon change.

**observeBreakpointsForSidenavMode(mobileMode: "side" | "push" | "over", desktopMode: "side" | "push" | "over")**

This method will use the breakpoint observer to trigger sidenavMode updates. When application hits 
Breakpoints.HandsetPortrait or Breakpoints.TabletPortrait it will update sidenav mode to value passed
through in **mobileMode**. If the viewport does not match these Breakpoints it will set sidenavMode to 
the value passed in through **desktopMode**. 

I generally find that "over" works well for mobile and desktop is just a matter of preference between "side" and "push"

**toggle(isOpen?: boolean): Promise<MatDrawerToggleResult>**
	
Will toggle the sidenav between open and closed.

**getSidenavStatus(): boolean**

Will return a boolean. If sidenav is opened it will return true, else false.

**getSidenavStatusAsString(): string**

Will return sidenav status as string. If sidenav is opened it will return 'opened',
else it will return 'closed'. Useful for animations.
