import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public tab = localStorage.getItem("tabActive");
  constructor(
  ) { }
  ngOnInit(): void {
  }
  hideSideBar(){
    $("#content").toggleClass("col-lg-10");
    $("#content").toggleClass("col-lg-12");
    
    $("#sidebarContent").toggleClass('hide');
  }
}
