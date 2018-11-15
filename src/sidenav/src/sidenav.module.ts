import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SidenavComponent } from "./sidenav.component";
import { SidenavSublinkItemComponent } from './sidenav-sublink-item/sidenav-sublink-item.component';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { MatIconModule, MatListModule, MatAccordion, MatButtonModule } from "@angular/material";

@NgModule({
    imports: [CommonModule, MatIconModule, MatListModule, MatButtonModule],
    exports: [SidenavComponent, SidenavSublinkItemComponent, SidenavItemComponent],
    declarations: [SidenavComponent, SidenavSublinkItemComponent, SidenavItemComponent],
    providers: [MatAccordion]
})
export class ResponsiveSidenavModule {}