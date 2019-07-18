import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page.DetailsComponent } from './page.details.component';

describe('Page.DetailsComponent', () => {
  let component: Page.DetailsComponent;
  let fixture: ComponentFixture<Page.DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page.DetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page.DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
