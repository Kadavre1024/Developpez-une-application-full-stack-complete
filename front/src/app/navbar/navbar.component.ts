import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public smallScreen: boolean = false;
  public windowHeight: number = window.innerHeight;
  public sideNavOpened: boolean = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "user",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/user.svg")
    );
  }

  ngOnInit(): void {
    this.smallScreen = (window.innerWidth <= 600) ? true : false;
    this.windowHeight = window.innerHeight;
  }

  navBarOpened(event: any) {
    this.sideNavOpened = !this.sideNavOpened;
  }

  handleSize(event: any) {
    this.smallScreen = (window.innerWidth <= 600) ? true : false;
    this.windowHeight = window.innerHeight;
    if(this.sideNavOpened && !this.smallScreen){this.sidenav.close()}
  }

}
