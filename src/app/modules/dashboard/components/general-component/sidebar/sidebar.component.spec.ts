import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponentDashboard } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponentDashboard;
  let fixture: ComponentFixture<SidebarComponentDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponentDashboard ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponentDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
