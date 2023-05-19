import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMainComponent } from './layout-main.component';

describe('LayoutMainComponent', () => {
  let component: LayoutMainComponent;
  let fixture: ComponentFixture<LayoutMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutMainComponent]
    });
    fixture = TestBed.createComponent(LayoutMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
