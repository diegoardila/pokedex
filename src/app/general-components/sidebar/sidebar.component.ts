import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  vista=localStorage.getItem('tabActive');
  constructor(
  ) { }

  ngOnInit(): void {
  }
  changeTab(tab){
    localStorage.setItem("tabActive",tab);
  }
}
