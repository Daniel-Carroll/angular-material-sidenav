import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SidenavSublinkItemComponent } from '../sidenav/src/sidenav-sublink-item/sidenav-sublink-item.component';
import { SidenavItemComponent } from '../sidenav/src/sidenav-item/sidenav-item.component';
import { SidenavComponent } from '../sidenav/src/sidenav.component';
import { ResponsiveSidenavModule } from '../sidenav/src/sidenav.module';
import { MatCardModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  imports:      [
   RouterModule.forRoot([]), 
   BrowserModule, 
   BrowserAnimationsModule, 
   FormsModule, 
   MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule, ResponsiveSidenavModule, MatSidenavModule ],
  exports: [ResponsiveSidenavModule],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppModule { }
