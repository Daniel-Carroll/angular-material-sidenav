import { Injectable } from '@angular/core';
import { MatSidenav, MatDrawerToggleResult, MatDrawer } from '@angular/material';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

export const SIDENAV_MODE_SIDE = "side";
export const SIDENAV_MODE_OVER = "over";
export const SIDENAV_MODE_PUSH = "push";

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenav: MatSidenav;

  private sidenavModeSubject = new BehaviorSubject(SIDENAV_MODE_SIDE);

  constructor(private bo: BreakpointObserver){

  }

  /**
   * Setter for sidenav.
   *
   * @param {MatSidenav} sidenav
   */
  public setSidenav(sidenav: MatSidenav) {
    
    console.log(sidenav)
    this.sidenav = sidenav;
  }

  /**
   * Open this sidenav, and return a Promise that will resolve when it's fully opened (or get rejected if it didn't).
   *
   * @returns Promise<MatSidenavToggleResult>
   */
  public open(): Promise<MatDrawerToggleResult> {
    return this.sidenav.open();
  }

  /**
   * Close this sidenav, and return a Promise that will resolve when it's fully closed (or get rejected if it didn't).
   *
   * @returns Promise<MatSidenavToggleResult>
   */
  public close(): Promise<MatDrawerToggleResult> {
    return this.sidenav.close();
  }

  /**
   * Will return sidenav mode observable 
   * that will emit values on change
   * 
   * @returns {Observable<string>} 
   */
  public getSidenavMode(): Observable<string> {
    return this.sidenavModeSubject.asObservable();
  }

  public setSidenavMode(sidenavMode: "side" | "over" | "push"){
    this.sidenavModeSubject.next(sidenavMode);
  }

  /**
   * Will toggle between specified modes 
   * when breakpoint changes between mobile and desktop
   * breakpoints. 
   * 
   * @param {"side" | "over" | "push"} smallScreenMode 
   * @param {"side" | "over" | "push"} largeScreenMode
   */
  public observeBreakpointsForSidenavMode(mobileMode: "side" | "over" | "push",
                                          desktopMode: "side" | "over" | "push"){
    this.bo.observe(([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ])).subscribe(result => {
      if(result.matches){
        this.sidenavModeSubject.next(mobileMode);
        this.sidenav.mode = mobileMode;
      }else{
        this.sidenavModeSubject.next(desktopMode);
        this.sidenav.mode = desktopMode;
      }
    })
  }

  /**
   * Toggle this sidenav. This is equivalent to calling open() when it's already opened, or close() when it's closed.
   *
   * @param {boolean} isOpen  Whether the sidenav should be open.
   *
   * @returns {Promise<MatSidenavToggleResult>}
   */
  public toggle(isOpen?: boolean): Promise<MatDrawerToggleResult> {
    return this.sidenav.toggle(isOpen);
  }

  getSidenavStatus() { return this.sidenav.opened }

  getSidenavStatusAsString(){
      if(this.sidenav.opened){
          return 'opened'
      }else{
          return 'closed'
      }
  }
}